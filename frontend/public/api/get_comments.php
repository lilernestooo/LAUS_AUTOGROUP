<?php
// GET /get_comments.php?post_id=1        -> approved comments of one post (public)
// GET /get_comments.php?status=pending   -> admin: comments of all posts, status = pending | approved | all
require_once __DIR__ . '/mysqli_connect.php';
require_method('GET');

$admin = auth_admin($conn);

function decode_comments($raw) {
    $list = $raw ? json_decode($raw, true) : [];
    return is_array($list) ? $list : [];
}

// public: approved comments of one published post (the IP is never sent)
if (!empty($_GET['post_id'])) {
    $post_id = (int)$_GET['post_id'];
    $stmt = $conn->prepare("SELECT post_status, post_comments FROM lgcautoposting WHERE post_id = ?");
    $stmt->bind_param('i', $post_id);
    $stmt->execute();
    $post = $stmt->get_result()->fetch_assoc();
    if (!$post || ($post['post_status'] !== 'publish' && !$admin)) fail('Post not found.', 404);

    $out = [];
    foreach (decode_comments($post['post_comments']) as $c) {
        if (($c['status'] ?? '') !== 'approved') continue;
        $out[] = [
            'comment_id'   => $c['id'],
            'post_id'      => $post_id,
            'author_name'  => $c['name'],
            'comment_text' => $c['text'],
            'created_date' => $c['date'],
        ];
    }
    respond(['success' => true, 'data' => $out]);
}

// admin: comments of every post
if (!$admin) fail('Unauthorized. Please log in.', 401);

$status = (string)($_GET['status'] ?? 'pending');
if (!in_array($status, ['pending', 'approved', 'all'], true)) $status = 'pending';

$res = $conn->query("SELECT post_id, post_title, post_comments FROM lgcautoposting WHERE post_comments IS NOT NULL AND post_comments <> ''");
$out = [];
while ($row = $res->fetch_assoc()) {
    foreach (decode_comments($row['post_comments']) as $c) {
        if ($status !== 'all' && ($c['status'] ?? '') !== $status) continue;
        $out[] = [
            'comment_id'   => $c['id'],
            'post_id'      => (int)$row['post_id'],
            'post_title'   => $row['post_title'],
            'author_name'  => $c['name'],
            'comment_text' => $c['text'],
            'status'       => $c['status'],
            'created_date' => $c['date'],
        ];
    }
}
usort($out, fn($a, $b) => strcmp($b['created_date'], $a['created_date']));
respond(['success' => true, 'data' => array_slice($out, 0, 100)]);