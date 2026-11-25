<?php
// GET /get_gallery.php?post_id=1001  -> gallery images (images of unpublished posts need the admin token)
require_once __DIR__ . '/mysqli_connect.php';
require_method('GET');

if (empty($_GET['post_id'])) fail('post_id is required.');
$post_id  = (int)$_GET['post_id'];
$is_admin = auth_admin($conn) ? 1 : 0;

$stmt = $conn->prepare(
    "SELECT g.gallery_id, g.post_id, g.image_link_1, g.date_created
     FROM lgcautogalery g JOIN lgcautoposting p ON p.post_id = g.post_id
     WHERE g.post_id = ? AND (p.post_status = 'publish' OR ? = 1)
     ORDER BY g.gallery_id"
);
$stmt->bind_param('ii', $post_id, $is_admin);
$stmt->execute();

respond(['success' => true, 'data' => $stmt->get_result()->fetch_all(MYSQLI_ASSOC)]);