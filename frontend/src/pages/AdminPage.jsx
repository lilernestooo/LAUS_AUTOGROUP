import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as api from '../api/newsApi';

const EMPTY = {
    post_id: '', post_title: '', post_name: '', post_category: '', post_status: 'draft', comment_status: 'open',
    post_date: '', hero_image_link: '', post_excerpt: '', post_content: '',
};
const toInput = (s) => (s ? s.replace(' ', 'T').slice(0, 16) : '');   // DB -> <input type="datetime-local">
const toDb = (s) => (s ? `${s.replace('T', ' ')}:00` : undefined);      // <input> -> DB

// Shared Tailwind class strings
const ui = {
    card: 'mb-5 rounded-md border border-gray-300 bg-white p-5',
    h2: 'mb-4 text-lg font-semibold',
    label: 'flex flex-col gap-1.5 text-[13px] text-gray-600',
    input: 'rounded border border-gray-300 bg-white px-2.5 py-2 text-sm text-gray-900 focus:border-[#c00] focus:outline-none focus:ring-2 focus:ring-[#c00]/20',
    btn: 'cursor-pointer rounded bg-[#c00] px-[18px] py-2.5 text-sm text-white hover:bg-[#a00] disabled:cursor-default disabled:opacity-50',
    ghost: 'cursor-pointer rounded border border-gray-300 bg-white px-[18px] py-2.5 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-default disabled:opacity-50',
    link: 'cursor-pointer px-2 text-sm text-blue-700 hover:underline',
    ok: 'mb-4 rounded bg-green-100 px-3.5 py-2.5 text-sm text-green-800',
    err: 'mb-4 rounded bg-red-100 px-3.5 py-2.5 text-sm text-red-800',
    grid: 'grid grid-cols-1 gap-3.5 sm:grid-cols-2',
};
const pill = { publish: 'bg-green-100 text-green-800', draft: 'bg-yellow-100 text-yellow-800' };

/* ================= Page ================= */
export default function AdminPage() {
    // Session is kept in sessionStorage; an expired token is caught by the first request (401)
    const [admin, setAdmin] = useState(() => (api.getToken() ? api.getAdmin() : null));

    if (!admin) return <Login onLogin={setAdmin} />;
    return <Dashboard admin={admin} onLogout={() => setAdmin(null)} />;
}

/* ================= Login ================= */
function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true); setError('');
        try {
            const r = await api.login(username, password);
            api.saveSession(r.token, r.admin);
            onLogin(r.admin);
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <form className={`${ui.card} flex w-[340px] max-w-full flex-col gap-3.5`} onSubmit={submit}>
                <h1 className="text-[22px] font-semibold">Admin Login</h1>
                {error && <div className={ui.err}>{error}</div>}
                <label className={ui.label}>Username
                    <input className={ui.input} value={username} onChange={(e) => setUsername(e.target.value)} autoFocus autoComplete="username" />
                </label>
                <label className={ui.label}>Password
                    <input className={ui.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                </label>
                <button className={ui.btn} disabled={busy || !username || !password}>{busy ? 'Signing in…' : 'Sign in'}</button>
            </form>
        </div>
    );
}

/* ================= Dashboard ================= */
function Dashboard({ admin, onLogout }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [form, setForm] = useState(EMPTY);
    const [gallery, setGallery] = useState([]);
    const [newImg, setNewImg] = useState('');
    const [msg, setMsg] = useState(null);
    const [busy, setBusy] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [uploading, setUploading] = useState(false);

    const uploadHero = async ([file]) => {
        setUploading(true); setMsg(null);
        try {
            const url = await api.uploadImage(file);
            setForm((f) => ({ ...f, hero_image_link: url })); // saved with the post when you click Save
        } catch (e) { handle(e); } finally { setUploading(false); }
    };

    const uploadGallery = async (files) => {
        setUploading(true); setMsg(null);
        try {
            for (const f of files) {
                const url = await api.uploadImage(f);
                await api.addGalleryImage(Number(form.post_id), url);
            }
            setGallery((await api.fetchGallery(form.post_id, true)).data);
        } catch (e) { handle(e); } finally { setUploading(false); }
    };

    const handle = useCallback((e) => {
        if (e.status === 401) { api.clearSession(); onLogout(); }   // token expired or invalid
        else setMsg({ type: 'error', text: e.message });
    }, [onLogout]);

    const loadPosts = useCallback(async (p = 1) => {
        try {
            const r = await api.fetchPosts({ page: p, limit: 10, status: 'all' }, true);
            setPosts(r.data); setPage(r.page); setTotalPages(r.total_pages);
        } catch (e) { handle(e); }
    }, [handle]);

    useEffect(() => { loadPosts(1); }, [loadPosts]);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const edit = async (post_id) => {
        setMsg(null);
        try {
            const [d, g] = await Promise.all([api.fetchPost(post_id, true), api.fetchGallery(post_id, true)]);
            const f = Object.fromEntries(Object.keys(EMPTY).map((k) => [k, d.data[k] ?? '']));
            setForm({ ...f, post_date: toInput(d.data.post_date) });
            setGallery(g.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) { handle(e); }
    };

    const reset = () => { setForm(EMPTY); setGallery([]); setNewImg(''); setMsg(null); };

    const save = async (e) => {
        e.preventDefault();
        if (!form.post_title.trim()) return setMsg({ type: 'error', text: 'Title is required.' });
        setBusy(true); setMsg(null);
        const payload = {
            post_title: form.post_title.trim(),
            post_name: form.post_name || undefined,
            post_category: form.post_category,
            post_status: form.post_status,
            comment_status: form.comment_status,
            post_date: toDb(form.post_date),
            hero_image_link: form.hero_image_link,
            post_excerpt: form.post_excerpt,
            post_content: form.post_content,
        };
        try {
            if (form.post_id) {
                await api.updatePost({ post_id: Number(form.post_id), ...payload });
                await edit(form.post_id);
                setMsg({ type: 'ok', text: 'Post updated.' });
            } else {
                const r = await api.createPost(payload);
                await edit(r.post_id);
                setMsg({ type: 'ok', text: `Post created (ID ${r.post_id}). You can add gallery images now.` });
            }
            loadPosts(page);
        } catch (err) { handle(err); } finally { setBusy(false); }
    };

    const remove = async (p) => {
        if (!window.confirm(`Delete "${p.post_title}" and its gallery images?`)) return;
        try {
            await api.deletePost(p.post_id);
            if (String(form.post_id) === String(p.post_id)) reset();
            setMsg({ type: 'ok', text: 'Post deleted.' });
            loadPosts(page);
        } catch (e) { handle(e); }
    };

    const addImage = async () => {
        if (!newImg.trim()) return;
        try {
            await api.addGalleryImage(Number(form.post_id), newImg.trim());
            setNewImg('');
            setGallery((await api.fetchGallery(form.post_id, true)).data);
        } catch (e) { handle(e); }
    };

    const removeImage = async (id) => {
        try {
            await api.deleteGalleryImage(id);
            setGallery((g) => g.filter((x) => x.gallery_id !== id));
        } catch (e) { handle(e); }
    };

    const signOut = async () => {
        try { await api.logout(); } catch { /* ignore */ }
        api.clearSession();
        onLogout();
    };

    return (
        <div className="mx-auto max-w-[1100px] p-5 text-gray-900">
            <header className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
                <h1 className="text-2xl font-semibold">News Admin</h1>
                <div className="flex items-center gap-2">
                    <span className="mr-1.5 text-sm text-gray-500">{admin.display_name || admin.username}</span>
                    <button className={ui.ghost} onClick={() => setShowPw((s) => !s)}>Change password</button>
                    <button className={ui.ghost} onClick={signOut}>Log out</button>
                </div>
            </header>

            {showPw && <ChangePassword onDone={(t) => { setShowPw(false); setMsg({ type: 'ok', text: t }); }} handle={handle} />}
            <Toast msg={msg} onClose={() => setMsg(null)} />

            {/* ---------- Editor ---------- */}
            <form className={ui.card} onSubmit={save}>
                <h2 className={ui.h2}>{form.post_id ? `Edit post #${form.post_id}` : 'New post'}</h2>
                <div className={ui.grid}>
                    <label className={`${ui.label} sm:col-span-2`}>Title *
                        <input className={ui.input} value={form.post_title} onChange={set('post_title')} />
                    </label>
                    <label className={ui.label}>Slug (auto if empty)
                        <input className={ui.input} value={form.post_name} onChange={set('post_name')} />
                    </label>
                    <label className={ui.label}>Category
                        <select className={ui.input} value={form.post_category} onChange={set('post_category')}>
                            <option value="">— none —</option>
                            {api.CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                    </label>
                    <label className={ui.label}>Status
                        <select className={ui.input} value={form.post_status} onChange={set('post_status')}>
                            <option value="draft">draft</option>
                            <option value="publish">publish</option>
                        </select>
                    </label>
                    <label className={ui.label}>Comments
                        <select className={ui.input} value={form.comment_status} onChange={set('comment_status')}>
                            <option value="open">open</option>
                            <option value="closed">closed</option>
                        </select>
                    </label>
                    <label className={ui.label}>Post date
                        <input className={ui.input} type="datetime-local" value={form.post_date} onChange={set('post_date')} />
                    </label>
                    <div className={`${ui.label} sm:col-span-2`}>
                        Hero image
                        <DropZone onFiles={uploadHero} busy={uploading}>
                            Drag and drop a photo here, or click to choose
                        </DropZone>
                        {form.hero_image_link && (
                            <img className="mt-1 max-h-40 w-auto self-start border border-gray-300" src={form.hero_image_link} alt="" />
                        )}
                        <input className={ui.input} value={form.hero_image_link} onChange={set('hero_image_link')} placeholder="…or paste an image link https://…" />
                    </div>
                    <label className={`${ui.label} sm:col-span-2`}>Excerpt
                        <textarea className={ui.input} rows="3" value={form.post_excerpt} onChange={set('post_excerpt')} />
                    </label>
                    <label className={`${ui.label} sm:col-span-2`}>Content
                        <textarea className={ui.input} rows="8" value={form.post_content} onChange={set('post_content')} />
                    </label>
                </div>
                <div className="mt-4 flex gap-2">
                    <button className={ui.btn} disabled={busy}>{busy ? 'Saving…' : form.post_id ? 'Save changes' : 'Create post'}</button>
                    {form.post_id && <button type="button" className={ui.ghost} onClick={reset}>+ New post</button>}
                </div>
            </form>

            {/* ---------- Gallery (existing posts only) ---------- */}
            {form.post_id && (
                <div className={ui.card}>
                    <h2 className={ui.h2}>Gallery</h2>
                    <div className="mb-3.5 flex flex-wrap gap-3">
                        {gallery.map((g) => (
                            <div className="w-[150px]" key={g.gallery_id}>
                                <img className="block h-[100px] w-full border border-gray-300 object-cover" src={g.image_link_1} alt="" />
                                <button type="button" className="mt-1 w-full cursor-pointer border border-gray-300 bg-white p-1 text-sm text-red-700 hover:bg-red-50" onClick={() => removeImage(g.gallery_id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                        {gallery.length === 0 && <p className="text-sm text-gray-500">No gallery images yet.</p>}
                    </div>

                    <div className="mb-3">
                        <DropZone onFiles={uploadGallery} multiple busy={uploading}>
                            Drag and drop photos here (you can drop several), or click to choose
                        </DropZone>
                    </div>

                    <div className="flex gap-2">
                        <input className={`${ui.input} flex-1`} value={newImg} onChange={(e) => setNewImg(e.target.value)} placeholder="Image link https://…" />
                        <button type="button" className={ui.btn} onClick={addImage}>Add image</button>
                    </div>
                </div>
            )}

            {/* ---------- Comments moderation ---------- */}
            <CommentsModeration handle={handle} />

            {/* ---------- Posts table ---------- */}
            <div className={ui.card}>
                <h2 className={ui.h2}>All posts</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="text-left text-xs uppercase text-gray-500">
                                <th className="border-b border-gray-200 p-2">ID</th>
                                <th className="border-b border-gray-200 p-2">Title</th>
                                <th className="border-b border-gray-200 p-2">Category</th>
                                <th className="border-b border-gray-200 p-2">Status</th>
                                <th className="border-b border-gray-200 p-2">Date</th>
                                <th className="border-b border-gray-200 p-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((p) => (
                                <tr key={p.post_id}>
                                    <td className="border-b border-gray-100 p-2">{p.post_id}</td>
                                    <td className="border-b border-gray-100 p-2">{p.post_title}</td>
                                    <td className="border-b border-gray-100 p-2">{p.post_category}</td>
                                    <td className="border-b border-gray-100 p-2">
                                        <span className={`rounded-full px-2 py-0.5 text-xs ${pill[p.post_status] || 'bg-gray-100'}`}>{p.post_status}</span>
                                    </td>
                                    <td className="border-b border-gray-100 p-2">{(p.post_date || '').slice(0, 10)}</td>
                                    <td className="whitespace-nowrap border-b border-gray-100 p-2">
                                        <button className={ui.link} onClick={() => edit(p.post_id)}>Edit</button>
                                        <button className={`${ui.link} !text-red-700`} onClick={() => remove(p)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && <tr><td colSpan="6" className="p-3 text-gray-500">No posts yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3.5 flex items-center justify-center gap-3 text-sm">
                    <button className={ui.ghost} disabled={page <= 1} onClick={() => loadPosts(page - 1)}>← Prev</button>
                    <span>Page {page} of {totalPages}</span>
                    <button className={ui.ghost} disabled={page >= totalPages} onClick={() => loadPosts(page + 1)}>Next →</button>
                </div>
            </div>
        </div>
    );
}

/* ================= Comments moderation ================= */
function CommentsModeration({ handle }) {
    const [status, setStatus] = useState('pending');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try { setItems((await api.fetchPendingComments(status)).data); }
        catch (e) { handle(e); }
        finally { setLoading(false); }
    }, [status, handle]);

    useEffect(() => { load(); }, [load]);

    const approve = async (c) => {
        try { await api.approveComment(c.post_id, c.comment_id); load(); } catch (e) { handle(e); }
    };
    const remove = async (c) => {
        if (!window.confirm('Delete this comment?')) return;
        try { await api.deleteComment(c.post_id, c.comment_id); load(); } catch (e) { handle(e); }
    };

    return (
        <div className={ui.card}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Comments</h2>
                <div className="flex gap-1.5">
                    {['pending', 'approved', 'all'].map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => setStatus(s)}
                            className={`cursor-pointer rounded-full px-3 py-1 text-sm ${status === s ? 'bg-[#c00] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {loading && <p className="text-sm text-gray-500">Loading…</p>}
            {!loading && items.length === 0 && <p className="text-sm text-gray-500">No {status === 'all' ? '' : status} comments.</p>}

            <ul className="space-y-3">
                {items.map((c) => (
                    <li key={`${c.post_id}-${c.comment_id}`} className="rounded border border-gray-200 p-3 text-sm">
                        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span className="font-semibold text-gray-800">{c.author_name}</span>
                            {c.author_email && <span>({c.author_email})</span>}
                            <span>on “{c.post_title || `post #${c.post_id}`}”</span>
                            <span>{c.created_date}</span>
                            <span className={`rounded-full px-2 py-0.5 ${c.status === 'approved' ? pill.publish : pill.draft}`}>{c.status}</span>
                        </div>
                        <p className="mb-2 whitespace-pre-line text-gray-800">{c.comment_text}</p>
                        <div>
                            {c.status === 'pending' && (
                                <button type="button" className={ui.link} onClick={() => approve(c)}>Approve</button>
                            )}
                            <button type="button" className={`${ui.link} !text-red-700`} onClick={() => remove(c)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ================= Pop-up message (toast) ================= */
function Toast({ msg, onClose }) {
    const [shown, setShown] = useState(false);

    // slide in, then close by itself (a new message restarts the timer)
    useEffect(() => {
        if (!msg) return;
        setShown(false);
        const raf = requestAnimationFrame(() => setShown(true));
        const timer = setTimeout(onClose, msg.type === 'ok' ? 4000 : 6000);
        return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg]);

    if (!msg) return null;
    const ok = msg.type === 'ok';

    return createPortal(
        <div
            role="status"
            aria-live="polite"
            className={`fixed top-5 right-5 z-[400] flex w-[360px] max-w-[calc(100vw-2.5rem)] items-start gap-3 rounded-md border-l-4 bg-white p-4 shadow-2xl ring-1 ring-black/5 transition-all duration-300 ${ok ? 'border-green-600' : 'border-[#c00]'} ${shown ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
        >
            <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${ok ? 'bg-green-600' : 'bg-[#c00]'}`}>
                {ok ? '✓' : '!'}
            </span>
            <p className="flex-1 text-sm leading-snug text-gray-800">{msg.text}</p>
            <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer text-xl leading-none text-gray-400 hover:text-gray-700">×</button>
        </div>,
        document.body
    );
}

/* ================= Drag and drop zone ================= */
function DropZone({ onFiles, multiple = false, busy, children }) {
    const [over, setOver] = useState(false);
    const pick = (list) => {
        const files = [...list].filter((f) => f.type.startsWith('image/'));
        if (files.length) onFiles(multiple ? files : files.slice(0, 1));
    };
    return (
        <label
            onDragOver={(e) => { e.preventDefault(); setOver(true); }}
            onDragLeave={() => setOver(false)}
            onDrop={(e) => { e.preventDefault(); setOver(false); pick(e.dataTransfer.files); }}
            className={`flex cursor-pointer items-center justify-center rounded border-2 border-dashed px-4 py-6 text-center text-sm transition-colors ${over ? 'border-[#c00] bg-red-50 text-[#c00]' : 'border-gray-300 bg-gray-50 text-gray-500 hover:border-gray-400'}`}
        >
            <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple={multiple}
                className="hidden"
                onChange={(e) => { pick(e.target.files); e.target.value = ''; }}
            />
            {busy ? 'Uploading…' : children}
        </label>
    );
}

/* ================= Change password ================= */
function ChangePassword({ onDone, handle }) {
    const [cur, setCur] = useState('');
    const [next, setNext] = useState('');
    const [again, setAgain] = useState('');
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (next.length < 8) return setError('New password must be at least 8 characters.');
        if (next !== again) return setError('New passwords do not match.');
        try {
            await api.changePassword(cur, next);
            onDone('Password changed. Other devices were signed out.');
        } catch (err) {
            if (err.status === 401) handle(err); else setError(err.message);
        }
    };

    return (
        <form className={ui.card} onSubmit={submit}>
            <h2 className={ui.h2}>Change password</h2>
            {error && <div className={ui.err}>{error}</div>}
            <div className={ui.grid}>
                <label className={`${ui.label} sm:col-span-2`}>Current password
                    <input className={ui.input} type="password" value={cur} onChange={(e) => setCur(e.target.value)} autoComplete="current-password" />
                </label>
                <label className={ui.label}>New password
                    <input className={ui.input} type="password" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" />
                </label>
                <label className={ui.label}>Repeat new password
                    <input className={ui.input} type="password" value={again} onChange={(e) => setAgain(e.target.value)} autoComplete="new-password" />
                </label>
            </div>
            <div className="mt-4"><button className={ui.btn}>Update password</button></div>
        </form>
    );
}