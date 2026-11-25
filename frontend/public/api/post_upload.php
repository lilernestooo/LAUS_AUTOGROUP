<?php
// POST /post_upload.php  (multipart, field "image")  -> {"url":"/uploads/2026/11/xxxx.jpg"}
require_once __DIR__ . '/mysqli_connect.php';
require_method('POST');
require_auth($conn); // only logged-in admins can upload

$file = $_FILES['image'] ?? null;
if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    $tooBig = $file && in_array($file['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true);
    fail($tooBig ? 'Image is too large.' : 'Upload failed.');
}
if ($file['size'] > 5 * 1024 * 1024) fail('Image must be 5 MB or smaller.');

// check the real file type, not the name the browser sends
$allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
$mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
if (!isset($allowed[$mime]) || !@getimagesize($file['tmp_name'])) {
    fail('Only JPG, PNG, WEBP or GIF images are allowed.');
}

$sub = date('Y/m');
$dir = dirname(__DIR__) . '/uploads/' . $sub;   // public/uploads/2026/11
if (!is_dir($dir) && !mkdir($dir, 0755, true)) fail('Could not create the upload folder.', 500);

$name = bin2hex(random_bytes(12)) . '.' . $allowed[$mime];   // random name, safe extension
if (!move_uploaded_file($file['tmp_name'], "$dir/$name")) fail('Could not save the image.', 500);

respond(['success' => true, 'url' => "/uploads/$sub/$name"]);