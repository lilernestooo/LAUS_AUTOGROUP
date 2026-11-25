<?php
// POST /post_posting.php   (admin token required; "action" = create | update | delete)
//
// create: {"action":"create","post_title":"...", + optional post_id (auto if omitted), post_date, post_content,
//          post_excerpt, post_status, comment_status, post_name, post_category, hero_image_link}
// update: {"action":"update","post_id":1002, + any fields to change}
// delete: {"action":"delete","post_id":1002}   (gallery rows are removed by ON DELETE CASCADE)
require_once __DIR__ . '/mysqli_connect.php';
require_method('POST');
require_auth($conn);

$in     = get_input();
$action = (string)($in['action'] ?? 'create');

switch ($action) {

    case 'create':
        if (empty($in['post_title'])) fail('post_title is required.');

        if (!empty($in['post_id'])) {
            $post_id = (int)$in['post_id'];
        } else { // auto-number: highest post_id + 1
            $post_id = (int)$conn->query("SELECT COALESCE(MAX(post_id), 0) + 1 FROM lgcautoposting")->fetch_row()[0];
        }

        $post_title     = trim((string)$in['post_title']);
        $post_name      = !empty($in['post_name']) ? $in['post_name'] : strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $post_title), '-'));
        $post_date      = !empty($in['post_date']) ? $in['post_date'] : date('Y-m-d H:i:s');
        $post_content   = $in['post_content']    ?? null;
        $post_excerpt   = $in['post_excerpt']    ?? null;
        $post_category  = $in['post_category']   ?? null;
        $post_status    = $in['post_status']     ?? 'draft';
        $comment_status = $in['comment_status']  ?? 'open';
        $hero_image     = $in['hero_image_link'] ?? null;
        if ($hero_image !== null && $hero_image !== '' && !preg_match('~^(https?://|/uploads/)~i', $hero_image)) {
            fail('Hero image must start with https:// or /uploads/.');
        }

        try {
            $stmt = $conn->prepare(
                "INSERT INTO lgcautoposting
                 (post_id, post_date, post_content, post_title, post_excerpt, post_status, comment_status, post_name, post_category, hero_image_link)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $stmt->bind_param('isssssssss', $post_id, $post_date, $post_content, $post_title, $post_excerpt,
                              $post_status, $comment_status, $post_name, $post_category, $hero_image);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1062) fail('post_id already exists.', 409);
            throw $e;
        }
        respond(['success' => true, 'message' => 'Post created.', 'rec_id' => $conn->insert_id, 'post_id' => $post_id], 201);

    case 'update':
        if (empty($in['post_id'])) fail('post_id is required.');
        $post_id = (int)$in['post_id'];
        $allowed = ['post_date', 'post_content', 'post_title', 'post_excerpt', 'post_status',
                    'comment_status', 'post_name', 'post_category', 'hero_image_link'];
        $sets = []; $values = [];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $in)) { $sets[] = "$field = ?"; $values[] = $in[$field]; }
        }
        if (!$sets) fail('No fields to update.');

        $types    = str_repeat('s', count($values)) . 'i';
        $values[] = $post_id;

        $stmt = $conn->prepare("UPDATE lgcautoposting SET " . implode(', ', $sets) . " WHERE post_id = ?");
        $stmt->bind_param($types, ...$values);
        $stmt->execute();

        $check = $conn->prepare("SELECT 1 FROM lgcautoposting WHERE post_id = ?");
        $check->bind_param('i', $post_id);
        $check->execute();
        if (!$check->get_result()->fetch_row()) fail('Post not found.', 404);
        respond(['success' => true, 'message' => 'Post updated.', 'post_id' => $post_id]);

    case 'delete':
        if (empty($in['post_id'])) fail('post_id is required.');
        $post_id = (int)$in['post_id'];
        $stmt = $conn->prepare("DELETE FROM lgcautoposting WHERE post_id = ?");
        $stmt->bind_param('i', $post_id);
        $stmt->execute();
        if ($stmt->affected_rows === 0) fail('Post not found.', 404);
        respond(['success' => true, 'message' => 'Post deleted.', 'post_id' => $post_id]);

    default:
        fail("Unknown action '$action'. Use create, update or delete.");
}