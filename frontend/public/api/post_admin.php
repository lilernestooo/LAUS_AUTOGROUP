<?php
// POST /post_admin.php (token header)
// {"action":"change_password","current_password":"...","new_password":"... (min 8 chars)"}
require_once __DIR__ . '/mysqli_connect.php';
require_method('POST');

$admin  = require_auth($conn);
$in     = get_input();
$action = (string)($in['action'] ?? '');

if ($action !== 'change_password') fail("Unknown action '$action'. Use change_password.");

$current = (string)($in['current_password'] ?? '');
$new     = (string)($in['new_password'] ?? '');
if ($current === '' || $new === '') fail('current_password and new_password are required.');
if (strlen($new) < 8) fail('New password must be at least 8 characters.');

$id = (int)$admin['admin_id'];
$stmt = $conn->prepare("SELECT password_hash FROM lgcautoadmins WHERE admin_id = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$row = $stmt->get_result()->fetch_assoc();
if (!$row || !password_verify($current, $row['password_hash'])) fail('Current password is incorrect.', 403);

$newHash = password_hash($new, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE lgcautoadmins SET password_hash = ? WHERE admin_id = ?");
$stmt->bind_param('si', $newHash, $id);
$stmt->execute();

// Log out every other session of this admin
$current_hash = hash('sha256', auth_token());
$stmt = $conn->prepare("DELETE FROM lgcautotokens WHERE admin_id = ? AND token_hash <> ?");
$stmt->bind_param('is', $id, $current_hash);
$stmt->execute();

respond(['success' => true, 'message' => 'Password changed.']);