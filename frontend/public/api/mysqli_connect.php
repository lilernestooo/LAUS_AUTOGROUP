<?php
if (realpath(__FILE__) === realpath($_SERVER['SCRIPT_FILENAME'] ?? '')) {
    http_response_code(403);
    header('Content-Type: application/json; charset=utf-8');
    exit(json_encode(['error' => 'Direct access forbidden']));
}

/* ---------- Response headers / CORS ---------- */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }

/* ---------- Database credentials ---------- */
define("DB_SERVER", "127.0.0.1");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "Laus_Group@022704");
define("DB_DATABASE", "db_lgcauto");

/* ---------- JSON helpers ---------- */
function respond($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $code = 400): void {
    respond(['error' => $message], $code);
}

function require_method(string $method): void {
    if ($_SERVER['REQUEST_METHOD'] !== $method) fail("Method not allowed. Use $method.", 405);
}

// JSON body first, falls back to form data
function get_input(): array {
    $json = json_decode(file_get_contents('php://input'), true);
    return is_array($json) ? $json : $_POST;
}

set_exception_handler(function ($e) {
    error_log('API error: ' . $e->getMessage());
    respond(['error' => 'Server error'], 500);
});

/* ---------- MySQLi connection ($conn) ---------- */
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
    $conn = mysqli_init();
    $conn->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, 1);
    $conn->real_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    $conn->set_charset('utf8mb4');
} catch (mysqli_sql_exception $e) {
    error_log('DB connection failed: ' . $e->getMessage());
    respond(['error' => 'Database connection failed'], 500);
}

/* ---------- Auth helpers (token sent in X-Auth-Token or Authorization: Bearer) ---------- */
function auth_token(): string {
    $t = $_SERVER['HTTP_X_AUTH_TOKEN'] ?? '';
    if ($t === '') {
        $a = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
        if (stripos($a, 'Bearer ') === 0) $t = substr($a, 7);
    }
    return trim($t);
}

// Returns the logged-in admin row, or null
function auth_admin(mysqli $conn): ?array {
    $token = auth_token();
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) return null;
    $hash = hash('sha256', $token);
    $stmt = $conn->prepare(
        "SELECT a.admin_id, a.username, a.display_name
         FROM lgcautotokens t JOIN lgcautoadmins a ON a.admin_id = t.admin_id
         WHERE t.token_hash = ? AND t.expires_at > NOW() AND a.is_active = 1 LIMIT 1"
    );
    $stmt->bind_param('s', $hash);
    $stmt->execute();
    return $stmt->get_result()->fetch_assoc() ?: null;
}

function require_auth(mysqli $conn): array {
    $admin = auth_admin($conn);
    if (!$admin) fail('Unauthorized. Please log in.', 401);
    return $admin;
}