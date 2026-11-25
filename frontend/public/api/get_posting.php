<?php
// GET /get_posting.php                          -> list: page, limit, status (publish default), category
// GET /get_posting.php?post_id=1001             -> single post
// GET /get_posting.php?post_name=test-post      -> single post
// Public sees only status=publish. Drafts / status=all need the admin token.
require_once __DIR__ . '/mysqli_connect.php';
require_method('GET');

$admin = auth_admin($conn);

// Single post
if (!empty($_GET['post_id']) || !empty($_GET['post_name'])) {
    if (!empty($_GET['post_id'])) {
        $stmt = $conn->prepare("SELECT * FROM lgcautoposting WHERE post_id = ?");
        $post_id = (int)$_GET['post_id'];
        $stmt->bind_param('i', $post_id);
    } else {
        $stmt = $conn->prepare("SELECT * FROM lgcautoposting WHERE post_name = ? LIMIT 1");
        $post_name = (string)$_GET['post_name'];
        $stmt->bind_param('s', $post_name);
    }
    $stmt->execute();
    $post = $stmt->get_result()->fetch_assoc();
    if (!$post || ($post['post_status'] !== 'publish' && !$admin)) fail('Post not found.', 404);
    unset($post['post_comments']); // comments are served only by get_comments.php (approved ones only)
    unset($post['post_comments']); // comments are served only by get_comments.php (approved ones only)
    respond(['success' => true, 'data' => $post]);
}

// List
$page     = max(1, (int)($_GET['page'] ?? 1));
$limit    = min(50, max(1, (int)($_GET['limit'] ?? 10)));
$offset   = ($page - 1) * $limit;
$status   = (string)($_GET['status'] ?? 'publish');
$category = trim((string)($_GET['category'] ?? ''));

if ($status !== 'publish' && !$admin) fail('Unauthorized. Please log in.', 401);

$where = "(? = 'all' OR post_status = ?) AND (? = '' OR post_category = ?)";

$stmt = $conn->prepare("SELECT COUNT(*) FROM lgcautoposting WHERE $where");
$stmt->bind_param('ssss', $status, $status, $category, $category);
$stmt->execute();
$total = (int)$stmt->get_result()->fetch_row()[0];

$stmt = $conn->prepare(
    "SELECT rec_id, post_id, post_title, post_name, post_category, post_excerpt, post_status,
            comment_status, post_date, updated_date, hero_image_link
     FROM lgcautoposting
     WHERE $where
     ORDER BY post_date DESC, rec_id DESC
     LIMIT ? OFFSET ?"
);
$stmt->bind_param('ssssii', $status, $status, $category, $category, $limit, $offset);
$stmt->execute();

respond([
    'success'     => true,
    'page'        => $page,
    'limit'       => $limit,
    'total'       => $total,
    'total_pages' => (int)ceil($total / $limit),
    'data'        => $stmt->get_result()->fetch_all(MYSQLI_ASSOC),
]);