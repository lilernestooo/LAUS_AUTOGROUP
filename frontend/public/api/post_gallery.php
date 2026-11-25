<?php
// POST /post_gallery.php   (admin token required; JSON body, "action" = add | delete)
//
// add:    {"action":"add","post_id":1001,"image_link_1":"https://..."}
// delete: {"action":"delete","gallery_id":5}
require_once __DIR__ . '/mysqli_connect.php';
require_method('POST');
require_auth($conn);

$in     = get_input();
$action = (string)($in['action'] ?? 'add');

switch ($action) {

    case 'add':
        if (empty($in['post_id']) || empty($in['image_link_1'])) fail('post_id and image_link_1 are required.');
        $post_id      = (int)$in['post_id'];
                $image_link_1 = (string)$in['image_link_1'];
        if (!preg_match('~^(https?://|/uploads/)~i', $image_link_1)) fail('Image link must start with https:// or /uploads/.');
        try {
            $stmt = $conn->prepare("INSERT INTO lgcautogalery (post_id, image_link_1) VALUES (?, ?)");
            $stmt->bind_param('is', $post_id, $image_link_1);
            $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1452) fail('Post not found for that post_id.', 404);
            throw $e;
        }
        respond(['success' => true, 'message' => 'Gallery image added.', 'gallery_id' => $conn->insert_id, 'post_id' => $post_id], 201);

    case 'delete':
        if (empty($in['gallery_id'])) fail('gallery_id is required.');
        $gallery_id = (int)$in['gallery_id'];
        $stmt = $conn->prepare("DELETE FROM lgcautogalery WHERE gallery_id = ?");
        $stmt->bind_param('i', $gallery_id);
        $stmt->execute();
        if ($stmt->affected_rows === 0) fail('Gallery image not found.', 404);
        respond(['success' => true, 'message' => 'Gallery image deleted.', 'gallery_id' => $gallery_id]);

    default:
        fail("Unknown action '$action'. Use add or delete.");
}