<?php
// POST /post_logout.php  (token header) -> invalidates the current token
require_once __DIR__ . '/mysqli_connect.php';
require_method('POST');

$token = auth_token();
if ($token !== '') {
    $hash = hash('sha256', $token);
    $stmt = $conn->prepare("DELETE FROM lgcautotokens WHERE token_hash = ?");
    $stmt->bind_param('s', $hash);
    $stmt->execute();
}
respond(['success' => true, 'message' => 'Logged out.']);