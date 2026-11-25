<?php
// POST /post_login.php  {"username":"admin","password":"..."}  -> {"token":"...","admin":{...},"expires_in":28800}
require_once __DIR__ . '/mysqli_connect.php';
require_method('POST');

$in       = get_input();
$username = trim((string)($in['username'] ?? ''));
$password = (string)($in['password'] ?? '');
if ($username === '' || $password === '') fail('Username and password are required.');

$stmt = $conn->prepare(
    "SELECT admin_id, username, display_name, password_hash,
            (locked_until IS NOT NULL AND locked_until > NOW()) AS is_locked
     FROM lgcautoadmins WHERE username = ? AND is_active = 1 LIMIT 1"
);
$stmt->bind_param('s', $username);
$stmt->execute();
$admin = $stmt->get_result()->fetch_assoc();

if ($admin && $admin['is_locked']) fail('Too many failed attempts. Try again in 15 minutes.', 429);

if ($admin) {
    $aid = (int)$admin['admin_id'];
    $conn->query("UPDATE lgcautoadmins SET failed_attempts = 0, locked_until = NULL WHERE admin_id = $aid AND locked_until IS NOT NULL");
}

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    if ($admin) { // 5 failures -> lock for 15 minutes
        $stmt = $conn->prepare(
            "UPDATE lgcautoadmins
             SET locked_until = IF(failed_attempts + 1 >= 5, DATE_ADD(NOW(), INTERVAL 15 MINUTE), locked_until),
                 failed_attempts = failed_attempts + 1
             WHERE admin_id = ?"
        );
        $stmt->bind_param('i', $admin['admin_id']);
        $stmt->execute();
    }
    fail('Invalid username or password.', 401);
}

// Success: reset counters, clean expired tokens, issue a new token
$id = (int)$admin['admin_id'];
$stmt = $conn->prepare("UPDATE lgcautoadmins SET failed_attempts = 0, locked_until = NULL, last_login = NOW() WHERE admin_id = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$conn->query("DELETE FROM lgcautotokens WHERE expires_at < NOW()");

$token = bin2hex(random_bytes(32));
$hash  = hash('sha256', $token);
$stmt = $conn->prepare("INSERT INTO lgcautotokens (admin_id, token_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 8 HOUR))");
$stmt->bind_param('is', $id, $hash);
$stmt->execute();

respond([
    'success'    => true,
    'token'      => $token,
    'expires_in' => 8 * 3600,
    'admin'      => ['admin_id' => $id, 'username' => $admin['username'], 'display_name' => $admin['display_name']],
]);