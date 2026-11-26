// dev: call the PHP server directly (CORS is already allowed), build: same-origin /api
const BASE = (import.meta.env.VITE_API_BASE || (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api')).replace(/\/$/, '');
const TOKEN_KEY = 'lgc_admin_token';
const ADMIN_KEY = 'lgc_admin_user';

// Login session lives in sessionStorage (cleared when the tab closes)
export const getToken = () => sessionStorage.getItem(TOKEN_KEY) || '';
export const getAdmin = () => {
    try { return JSON.parse(sessionStorage.getItem(ADMIN_KEY)); } catch { return null; }
};
export const saveSession = (token, admin) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};
export const clearSession = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_KEY);
};

export const CATEGORIES = [
    'APRILIA', 'BAIC', 'BMW', 'BMW Motorrad', 'CARMIX', 'CFMOTO', 'CHANGHE', 'CHERY', 'CHEVROLET', 'FORD',
    'FOTON', 'FUSO', 'GEELY', 'HAIMA', 'HARLEY', 'HUPER OPTIK', 'HYUNDAI', 'JEEP', 'JETOUR', 'KIA',
    'LausAutoServices', 'LYNK AND CO', 'MAZDA', 'MINI', 'MITSUBISHI CARWORLD', 'MOTORBIKES', 'News',
    'OMODA & JAECO', 'Peugeot', 'SUZUKI', 'TIRECITY', 'TRIUMPH', 'Uncategorized', 'VESPA', 'VOLKSWAGEN',
];

async function request(file, { method = 'GET', params, body, auth = false } = {}) {
    const url = new URL(`${BASE}/${file}`, window.location.origin);
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
        });
    }
    const headers = {};
    if (body) headers['Content-Type'] = 'application/json';
    if (auth && getToken()) headers['X-Auth-Token'] = getToken();

    // cache: 'no-store' so a post you just published shows up on the next visit
    const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store',
    });
    let data = null;
    try { data = await res.json(); } catch { /* non-JSON response */ }
    if (!res.ok) {
        const err = new Error((data && data.error) || `Request failed (${res.status})`);
        err.status = res.status;
        throw err;
    }
    return data;
}

/* ---------- Public ---------- */
export const fetchPosts = (params, auth = false) => request('get_posting.php', { params, auth });
export const fetchPost = (post_id, auth = false) => request('get_posting.php', { params: { post_id }, auth });
export const fetchGallery = (post_id, auth = false) => request('get_gallery.php', { params: { post_id }, auth });

/* ---------- Comments ---------- */
export const fetchComments = (post_id) => request('get_comments.php', { params: { post_id } });
export const addComment = (post_id, f) =>
    request('post_comments.php', { method: 'POST', body: { action: 'add', post_id: Number(post_id), author_name: f.name, author_email: f.email, author_url: f.url, comment_text: f.text, website: f.trap } });
export const fetchPendingComments = (status = 'pending') => request('get_comments.php', { params: { status }, auth: true });
export const approveComment = (post_id, comment_id) => request('post_comments.php', { method: 'POST', auth: true, body: { action: 'approve', post_id, comment_id } });
export const deleteComment = (post_id, comment_id) => request('post_comments.php', { method: 'POST', auth: true, body: { action: 'delete', post_id, comment_id } });
/* ---------- Auth ---------- */
export const login = (username, password) => request('post_login.php', { method: 'POST', body: { username, password } });
export const logout = () => request('post_logout.php', { method: 'POST', auth: true });
export const changePassword = (current_password, new_password) =>
    request('post_admin.php', { method: 'POST', auth: true, body: { action: 'change_password', current_password, new_password } });

/* ---------- Admin writes ---------- */
export const createPost = (data) => request('post_posting.php', { method: 'POST', auth: true, body: { action: 'create', ...data } });
export const updatePost = (data) => request('post_posting.php', { method: 'POST', auth: true, body: { action: 'update', ...data } });
export const deletePost = (post_id) => request('post_posting.php', { method: 'POST', auth: true, body: { action: 'delete', post_id } });
export const addGalleryImage = (post_id, image_link_1) =>
    request('post_gallery.php', { method: 'POST', auth: true, body: { action: 'add', post_id, image_link_1 } });
export const deleteGalleryImage = (gallery_id) =>
    request('post_gallery.php', { method: 'POST', auth: true, body: { action: 'delete', gallery_id } });

/* ---------- Image upload (drag and drop) ---------- */
export const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append('image', file);
    const res = await fetch(`${BASE}/post_upload.php`, {
        method: 'POST',
        headers: { 'X-Auth-Token': getToken() }, // no Content-Type: the browser sets it for FormData
        body: fd,
    });
    let data = null;
    try { data = await res.json(); } catch { /* non-JSON response */ }
    if (!res.ok) {
        const err = new Error((data && data.error) || `Upload failed (${res.status})`);
        err.status = res.status;
        throw err;
    }
    return data.url;
};