<?php
// POST /post_comments.php
//   add (public):    {"action":"add","post_id":1,"author_name":"...","comment_text":"...","website":""}
//   approve (admin): {"action":"approve","post_id":1,"comment_id":3}
//   delete (admin):  {"action":"delete","post_id":1,"comment_id":3}
// Comments are stored as a JSON list in lgcautoposting.post_comments
require_once __DIR__ . '/mysqli_connect.php';
require_method('POST');

$in     = get_input();
$action = (string)($in['action'] ?? 'add');

function decode_comments($raw) {
    $list = $raw ? json_decode($raw, true) : [];
    return is_array($list) ? $list : [];
}

function lock_post($conn, $post_id) {
    $stmt = $conn->prepare("SELECT post_status, comment_status, post_comments FROM lgcautoposting WHERE post_id = ? FOR UPDATE");
    $stmt->bind_param('i', $post_id);
    $stmt->execute();
    return $stmt->get_result()->fetch_assoc();
}

function save_comments($conn, $post_id, $list) {
    $json = $list ? json_encode(array_values($list), JSON_UNESCAPED_UNICODE) : null;
    $stmt = $conn->prepare("UPDATE lgcautoposting SET post_comments = ? WHERE post_id = ?");
    $stmt->bind_param('si', $json, $post_id);
    $stmt->execute();
}

switch ($action) {

    case 'add':
        if (!empty($in['website'])) respond(['success' => true, 'message' => 'Comment received.'], 201);

        $post_id = (int)($in['post_id'] ?? 0);
        $name    = trim((string)($in['author_name'] ?? ''));
        $text    = trim((string)($in['comment_text'] ?? ''));

        if ($post_id <= 0)                           fail('post_id is required.');
        if ($name === '' || mb_strlen($name) > 80)   fail('Please enter your name (up to 80 characters).');
        if ($text === '' || mb_strlen($text) > 2000) fail('Please enter a comment (up to 2000 characters).');

        $ip = substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);

        // spam limit: 3 comments per 10 minutes per IP
        $recent = 0;
        $cut    = time() - 600;
        $like   = '%"ip":"' . $ip . '"%';
        $stmt   = $conn->prepare("SELECT post_comments FROM lgcautoposting WHERE post_comments LIKE ?");
        $stmt->bind_param('s', $like);
        $stmt->execute();
        $res = $stmt->get_result();
        while ($row = $res->fetch_assoc()) {
            foreach (decode_comments($row['post_comments']) as $c) {
                if (($c['ip'] ?? '') === $ip && strtotime($c['date'] ?? '') > $cut) $recent++;
            }
        }
        if ($recent >= 3) fail('Too many comments. Please try again later.', 429);

        $conn->begin_transaction();
        $post = lock_post($conn, $post_id);
        if (!$post || $post['post_status'] !== 'publish') fail('Post not found.', 404);
        if ($post['comment_status'] !== 'open')           fail('Comments are closed for this post.', 403);

        $list = decode_comments($post['post_comments']);
        if (count($list) >= 500) fail('This post has too many comments.', 403);
        $next = 1;
        foreach ($list as $c) $next = max($next, (int)$c['id'] + 1);

        $list[] = [
            'id'     => $next,
            'name'   => $name,
            'text'   => $text,
            'status' => 'pending',
            'ip'     => $ip,
            'date'   => date('Y-m-d H:i:s'),
        ];
        save_comments($conn, $post_id, $list);
        $conn->commit();
        respond(['success' => true, 'message' => 'Thank you! Your comment is waiting for approval.'], 201);

    case 'approve':
    case 'delete':
        require_auth($conn);
        $post_id = (int)($in['post_id'] ?? 0);
        $id      = (int)($in['comment_id'] ?? 0);
        if ($post_id <= 0 || $id <= 0) fail('post_id and comment_id are required.');

        $conn->begin_transaction();
        $post = lock_post($conn, $post_id);
        if (!$post) fail('Post not found.', 404);

        $list  = decode_comments($post['post_comments']);
        $found = false;
        foreach ($list as $i => $c) {
            if ((int)$c['id'] !== $id) continue;
            $found = true;
            if ($action === 'approve') $list[$i]['status'] = 'approved';
            else unset($list[$i]);
            break;
        }
        if (!$found) fail('Comment not found.', 404);

        save_comments($conn, $post_id, $list);
        $conn->commit();
        respond(['success' => true, 'message' => $action === 'approve' ? 'Comment approved.' : 'Comment deleted.', 'comment_id' => $id]);

    default:
        fail("Unknown action '$action'. Use add, approve or delete.");
}