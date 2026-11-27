import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Reveal from '../components/Reveal';
import useAutoRefresh from '../hooks/useAutoRefresh';
import { CATEGORIES, addComment, fetchComments, fetchGallery, fetchPost, fetchPosts } from '../api/newsApi';

const PAGE_SIZE = 5;

const formatDate = (s) =>
    s ? new Date(s.replace(' ', 'T')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

// Plain text (used for the list excerpts)
const plain = (s) => (s || '').replace(/<[^>]*>/g, '');

// Post content may contain HTML (bold, links, paragraphs). It is cleaned before it is shown.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
    }
});
const hasHtml = (s) => /<\/?[a-z][\s\S]*>/i.test(s || '');
const clean = (s) => DOMPurify.sanitize(s || '', { USE_PROFILES: { html: true } });

const btn =
    'cursor-pointer border-2 border-[#c00] bg-white bg-[linear-gradient(#c00,#c00)] bg-[length:0%_100%] bg-left bg-no-repeat ' +
    'px-5 py-3.5 text-sm font-medium text-[#c00] transition-[background-size,color] duration-500 ease-out ' +
    'hover:bg-[length:100%_100%] hover:text-white';
// one title style for the open post, the post list and the related cards
const title = 'font-semibold tracking-tight text-[#111]';

// styles for the HTML inside a post (Tailwind resets them, so they are added back here)
const richText =
    'text-[15px] leading-[1.8] [&_a]:text-[#c00] [&_a]:underline [&_b]:font-bold [&_strong]:font-bold ' +
    '[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 ' +
    '[&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_h2]:mb-3 [&_h2]:text-xl [&_h3]:mb-3 [&_h3]:text-lg';

/* ---------- Shine: a glare that sweeps across an image on hover (the parent needs "group relative overflow-hidden") ---------- */
function Shine() {
    return (
        <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-none group-hover:translate-x-[400%] group-hover:transition-transform group-hover:duration-1000 group-hover:ease-out motion-reduce:hidden"
        />
    );
}

/* ---------- Zoomable thumbnail: red bar with a magnifier slides up on hover ---------- */
function Zoomable({ onClick, className = 'block w-full', children }) {
    return (
        <button type="button" onClick={onClick} aria-label="Zoom image" className={`group relative cursor-zoom-in overflow-hidden ${className}`}>
            {children}
            <Shine />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex h-14 translate-y-full items-center justify-center bg-[#c00]/90 text-white transition-transform duration-300 ease-out group-hover:translate-y-0">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                </svg>
            </span>
        </button>
    );
}

/* ---------- Full-screen viewer: zoom (wheel, buttons, click, pinch), drag to move, arrows, swipe, thumbnails ---------- */
function Lightbox({ images, start = 0, onClose }) {
    const MAX = 5;
    const total = images.length;
    const [i, setI] = useState(start);
    const [scale, setScale] = useState(1);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [drag, setDrag] = useState(false);
    const [shown, setShown] = useState(false);
    const pointers = useRef(new Map());
    const pinch = useRef(0);
    const press = useRef({ x: 0, y: 0, moved: 0 });

    const clamp = (s) => Math.min(MAX, Math.max(1, s));
    const reset = useCallback(() => { setScale(1); setPos({ x: 0, y: 0 }); }, []);
    const go = useCallback((d) => { setI((p) => (p + d + total) % total); reset(); }, [total, reset]);

    // back to the middle whenever the zoom returns to 100%
    useEffect(() => { if (scale === 1) setPos({ x: 0, y: 0 }); }, [scale]);

    // fade in, Escape / arrow keys, page scroll locked while open
    useEffect(() => {
        const id = requestAnimationFrame(() => setShown(true));
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight' && total > 1) go(1);
            else if (e.key === 'ArrowLeft' && total > 1) go(-1);
            else if (e.key === '+' || e.key === '=') setScale((s) => clamp(s + 0.5));
            else if (e.key === '-') setScale((s) => clamp(s - 0.5));
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            cancelAnimationFrame(id);
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose, go, total]);

    const onWheel = (e) => setScale((s) => clamp(s * (e.deltaY < 0 ? 1.15 : 1 / 1.15)));

    const onPointerDown = (e) => {
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        press.current = { x: e.clientX, y: e.clientY, moved: 0 };
        if (pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];
            pinch.current = Math.hypot(a.x - b.x, a.y - b.y);
        }
        setDrag(true);
    };

    const onPointerMove = (e) => {
        const prev = pointers.current.get(e.pointerId);
        if (!prev) return;
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        press.current.moved += Math.abs(e.clientX - prev.x) + Math.abs(e.clientY - prev.y);

        if (pointers.current.size === 2) {
            // two fingers: pinch to zoom
            const [a, b] = [...pointers.current.values()];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (pinch.current) setScale((s) => clamp((s * d) / pinch.current));
            pinch.current = d;
        } else if (scale > 1) {
            // one finger / mouse: move the zoomed photo
            setPos((p) => ({ x: p.x + e.clientX - prev.x, y: p.y + e.clientY - prev.y }));
        }
    };

    const onPointerUp = (e) => {
        const single = pointers.current.size === 1;
        pointers.current.delete(e.pointerId);
        pinch.current = 0;
        if (pointers.current.size === 0) setDrag(false);
        if (!single || e.type === 'pointercancel') return;

        const dx = e.clientX - press.current.x;
        if (press.current.moved < 6) {
            // a tap: dark area closes, photo toggles zoom
            if (e.target === e.currentTarget) onClose();
            else if (scale > 1) reset();
            else setScale(2.5);
        } else if (scale === 1 && Math.abs(dx) > 60 && total > 1) {
            go(dx < 0 ? 1 : -1); // swipe to the next / previous photo
        }
    };

    const round = 'grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#c00] disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white/10';

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className={`fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* stage: photo, drag, pinch, wheel */}
            <div
                className="absolute inset-0 flex touch-none items-center justify-center overflow-hidden px-4 pt-16 pb-28 select-none"
                onWheel={onWheel}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                <img
                    key={i}
                    src={images[i]}
                    alt=""
                    draggable={false}
                    className={`max-h-full max-w-full object-contain shadow-2xl ${scale > 1 ? (drag ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
                    style={{
                        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                        transition: drag ? 'none' : 'transform 200ms ease-out',
                    }}
                />
            </div>

            {/* top bar */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 md:p-4">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">{i + 1} / {total}</span>
                <div className="flex items-center gap-2">
                    <button type="button" className={round} aria-label="Zoom out" disabled={scale <= 1} onClick={() => setScale((s) => clamp(s - 0.5))}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
                    </button>
                    <button type="button" className="hidden h-10 min-w-[3.5rem] cursor-pointer rounded-full bg-white/10 px-3 text-sm text-white hover:bg-[#c00] sm:block" onClick={reset} aria-label="Reset zoom">
                        {Math.round(scale * 100)}%
                    </button>
                    <button type="button" className={round} aria-label="Zoom in" disabled={scale >= MAX} onClick={() => setScale((s) => clamp(s + 0.5))}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </button>
                    <button type="button" className={`${round} ml-2 text-2xl leading-none`} aria-label="Close" onClick={onClose}>×</button>
                </div>
            </div>

            {/* previous / next */}
            {total > 1 && (
                <>
                    <button type="button" className={`${round} absolute top-1/2 left-3 z-10 -translate-y-1/2 md:left-5`} aria-label="Previous image" onClick={() => go(-1)}>❮</button>
                    <button type="button" className={`${round} absolute top-1/2 right-3 z-10 -translate-y-1/2 md:right-5`} aria-label="Next image" onClick={() => go(1)}>❯</button>
                </>
            )}

            {/* thumbnails */}
            {total > 1 && (
                <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2 overflow-x-auto p-3">
                    {images.map((src, idx) => (
                        <button
                            key={`${idx}-${src}`}
                            type="button"
                            onClick={() => { setI(idx); reset(); }}
                            aria-label={`Show image ${idx + 1}`}
                            aria-current={idx === i}
                            className={`h-14 w-20 shrink-0 cursor-pointer overflow-hidden border-2 transition ${idx === i ? 'border-[#c00] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>,
        document.body
    );
}

/* ---------- Related posts: same category only, shown as cards ---------- */
function RelatedPosts({ post, onOpen }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let alive = true;
        setItems([]);

        // posts without a category have nothing to be related to
        if (!post.post_category) return;

        // same category only, and never the post that is open
        fetchPosts({ page: 1, limit: 4, category: post.post_category })
            .then((r) => {
                const same = r.data.filter((p) => String(p.post_id) !== String(post.post_id));
                if (alive) setItems(same.slice(0, 3));
            })
            .catch(() => { /* related posts are optional */ });

        return () => { alive = false; };
    }, [post.post_id, post.post_category]);

    if (items.length === 0) return null;

    return (
        <section className="mt-14 border-t border-neutral-200 pt-8">
            <Reveal direction="right">
                <h2 className={`${title} text-2xl`}>Related posts</h2>
                <div className="mt-3 mb-8 h-1 w-16 rounded bg-[#c00]" />
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {items.map((p, i) => (
                    <Reveal key={p.post_id} direction="up" delay={i * 120} className="h-full">
                        <article className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]">
                            {/* photo */}
                            <button
                                type="button"
                                onClick={() => onOpen(p)}
                                aria-label={p.post_title}
                                className="relative block w-full cursor-pointer overflow-hidden bg-gray-200"
                            >
                                {p.hero_image_link ? (
                                    <img
                                        className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                                        src={p.hero_image_link}
                                        alt={p.post_title}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="aspect-[16/10] w-full bg-gray-200" />
                                )}
                                <Shine />
                                {post.post_category && (
                                    <span className="absolute top-3 left-3 z-10 bg-[#c00] px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-white uppercase">
                                        {post.post_category}
                                    </span>
                                )}
                                {/* red line that grows on hover */}
                                <span className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left scale-x-0 bg-[#c00] transition-transform duration-500 group-hover:scale-x-100" />
                            </button>

                            {/* text */}
                            <div className="flex flex-1 flex-col p-5">
                                <div className="flex items-center gap-1.5 text-xs text-[#888]">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 7v5l3 2" />
                                    </svg>
                                    {formatDate(p.post_date)}
                                </div>

                                <h3 className={`${title} mt-2 line-clamp-2 text-lg leading-snug transition-colors duration-300 group-hover:text-[#c00]`}>
                                    {p.post_title}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() => onOpen(p)}
                                    className="mt-auto inline-flex cursor-pointer items-center gap-2 pt-5 text-sm font-medium text-[#c00]"
                                >
                                    <span className="relative">
                                        Read more
                                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#c00] transition-transform duration-300 group-hover:scale-x-100" />
                                    </span>
                                    <svg className="transition-transform duration-300 group-hover:translate-x-1.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

const SAVED = 'lgc_comment_author';

function CommentSection({ postId }) {
    const [list, setList] = useState([]);
    const saved = (() => { try { return JSON.parse(localStorage.getItem(SAVED)) || {}; } catch { return {}; } })();
    const [f, setF] = useState({ name: saved.n || '', email: saved.e || '', url: saved.u || '', text: '', trap: '' });
    const [remember, setRemember] = useState(!!saved.n);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState(null);
    const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

    useEffect(() => {
        let alive = true;
        fetchComments(postId)
            .then((r) => alive && setList(r.data))
            .catch(() => { /* comments are optional */ });
        return () => { alive = false; };
    }, [postId]);

    // newly approved comments appear without reloading (what the visitor is typing is not touched)
    useAutoRefresh(() => fetchComments(postId).then((r) => setList(r.data)).catch(() => {}));

    const submit = async (e) => {
        e.preventDefault();
        setMsg(null);
        setBusy(true);
        try {
            const r = await addComment(postId, { ...f, name: f.name.trim(), email: f.email.trim(), url: f.url.trim(), text: f.text.trim() });
            try {
                if (remember) localStorage.setItem(SAVED, JSON.stringify({ n: f.name, e: f.email, u: f.url }));
                else localStorage.removeItem(SAVED);
            } catch { /* storage blocked */ }
            setMsg({ ok: true, text: r.message });
            setF((x) => ({ ...x, text: '' }));
        } catch (err) {
            setMsg({ ok: false, text: err.message });
        } finally {
            setBusy(false);
        }
    };

    const input = 'w-full border border-[#e5e5e5] bg-white px-3 py-2.5 text-sm text-[#444] focus:border-[#c00] focus:outline-none';
    const lab = 'mb-1 block text-sm font-bold text-[#555]';

    return (
        <section className="mt-12 border-t border-neutral-200 pt-8">
            {list.length > 0 && (
                <Reveal direction="up">
                    <h2 className={`${title} text-2xl`}>
                        {list.length} {list.length === 1 ? 'Comment' : 'Comments'}
                    </h2>
                    <div className="mt-3 mb-6 h-1 w-16 rounded bg-[#c00]" />
                    <ul className="mb-10 space-y-5">
                        {list.map((c) => (
                            <li key={c.comment_id} className="border-l-4 border-[#c00] bg-white p-4 shadow-sm">
                                <div className="mb-1 text-sm">
                                    <span className="font-bold text-[#111]">
                                        {c.author_url
                                            ? <a href={c.author_url} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-[#c00]">{c.author_name}</a>
                                            : c.author_name}
                                    </span>
                                    <span className="ml-3 text-[#888]">{formatDate(c.created_date)}</span>
                                </div>
                                <p className="text-[15px] leading-[1.7] whitespace-pre-line">{c.comment_text}</p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}

            <Reveal direction="up">
                <h2 className={`${title} text-2xl`}>Leave a Reply</h2>
                <div className="mt-3 mb-4 h-1 w-16 rounded bg-[#c00]" />
                <p className="mb-5 text-sm text-[#555]">Your email address will not be published. Required fields are marked *</p>
                {msg && (
                    <div className={`mb-4 px-3.5 py-2.5 text-sm ${msg.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {msg.text}
                    </div>
                )}
                <form onSubmit={submit}>
                    <label className={lab}>Comment *</label>
                    <textarea className={`${input} mb-5`} rows="6" required maxLength={2000} value={f.text} onChange={set('text')} />

                    <div className="grid gap-5 md:grid-cols-3">
                        <div>
                            <label className={lab}>Name *</label>
                            <input className={input} required maxLength={80} value={f.name} onChange={set('name')} autoComplete="name" />
                        </div>
                        <div>
                            <label className={lab}>Email *</label>
                            <input className={input} type="email" required maxLength={150} value={f.email} onChange={set('email')} autoComplete="email" />
                        </div>
                        <div>
                            <label className={lab}>Website</label>
                            <input className={input} maxLength={200} value={f.url} onChange={set('url')} placeholder="https://" autoComplete="url" />
                        </div>
                    </div>

                    {/* hidden trap field for bots */}
                    <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.trap} onChange={set('trap')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                    <label className="mt-5 flex items-center gap-2 text-sm font-bold text-[#555]">
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                        Save my name, email, and website in this browser for the next time I comment.
                    </label>

                    <div className="mt-5 text-right">
                        <button className={`${btn} disabled:opacity-50`} disabled={busy}>
                            {busy ? 'Sending…' : 'Post Comment'}
                        </button>
                    </div>
                </form>
            </Reveal>
        </section>
    );
}

export default function NewsPage() {
    const [category, setCategory] = useState('');
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [detail, setDetail] = useState(null); // { post, gallery, loading, error }
    const reqId = useRef(0);
    const [zoom, setZoom] = useState(null); // index of the photo open in the viewer, null = closed

    // the open post lives in the address bar: /news?post=12 (so the Back button and Home links work)
    const [params, setParams] = useSearchParams();
    const postId = params.get('post');

    const load = useCallback(async (p, cat, append) => {
        const id = ++reqId.current;
        setLoading(true);
        setError('');
        try {
            const res = await fetchPosts({ page: p, limit: PAGE_SIZE, category: cat });
            if (id !== reqId.current) return; // a newer request replaced this one
            setPosts((prev) => (append ? [...prev, ...res.data] : res.data));
            setPage(res.page);
            setTotalPages(res.total_pages);
        } catch (e) {
            if (id === reqId.current) setError(e.message);
        } finally {
            if (id === reqId.current) setLoading(false);
        }
    }, []);

    useEffect(() => { load(1, category, false); }, [category, load]);

    // load the single post whenever ?post= changes
    useEffect(() => {
        if (!postId) {
            setDetail(null);
            return;
        }
        let alive = true;
        setDetail({ post: {}, gallery: [], loading: true, error: '' });
        window.scrollTo({ top: 0 });
        Promise.all([fetchPost(postId), fetchGallery(postId)])
            .then(([d, g]) => alive && setDetail({ post: d.data, gallery: g.data, loading: false, error: '' }))
            .catch((e) => alive && setDetail({ post: {}, gallery: [], loading: false, error: e.message }));
        return () => {
            alive = false;
        };
    }, [postId]);

    const openPost = (p) => setParams({ post: p.post_id });
    const closePost = () => setParams({});

    // quiet refresh: no "Loading…", keeps the posts already loaded with "Load more"
    const refreshList = () => {
        if (loading) return;
        fetchPosts({ page: 1, limit: Math.min(50, page * PAGE_SIZE), category })
            .then((res) => {
                setPosts(res.data);
                setTotalPages(Math.ceil(res.total / PAGE_SIZE));
            })
            .catch(() => { /* try again next time */ });
    };

    const refreshDetail = () =>
        Promise.all([fetchPost(postId), fetchGallery(postId)])
            .then(([d, g]) => setDetail((cur) => (cur && !cur.loading ? { ...cur, post: d.data, gallery: g.data } : cur)))
            .catch(() => { /* try again next time */ });

    useAutoRefresh(() => (postId ? refreshDetail() : refreshList()));

    /* ---------- Single post view ---------- */
    if (detail) {
        const { post, gallery } = detail;
        // the hero photo first, then every gallery photo
        const heroCount = post.hero_image_link ? 1 : 0;
        const zoomImages = [post.hero_image_link, ...gallery.map((g) => g.image_link_1)].filter(Boolean);
        return (
            <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-6 text-[#444]">
                <button
                    type="button"
                    onClick={closePost}
                    className="group relative mb-8 inline-flex cursor-pointer items-center gap-2 overflow-hidden border-2 border-[#222] bg-white px-5 py-2.5 text-sm font-medium text-[#222] transition-colors duration-500 hover:text-white"
                >
                    <span className="absolute inset-0 -translate-x-full bg-[#222] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    <svg className="relative transition-transform duration-300 group-hover:-translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M11 6l-6 6 6 6" />
                    </svg>
                    <span className="relative">Back to news</span>
                </button>

                {detail.loading && <p>Loading…</p>}
                {detail.error && <p className="py-8 text-center text-red-700">{detail.error}</p>}

                {zoom !== null && <Lightbox images={zoomImages} start={zoom} onClose={() => setZoom(null)} />}

                {post.post_title && (
                    // key: the reveal effects replay when you open a different post
                    <div key={postId}>
                        <Reveal direction="down">
                            <header className="mb-6 border-b border-neutral-200 pb-5">
                                {/* category and date on one line */}
                                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    {post.post_category && (
                                        <span className="inline-block bg-[#c00] px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                                            {post.post_category}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1.5 text-sm text-[#777]">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 2" />
                                        </svg>
                                        <time dateTime={(post.post_date || '').slice(0, 10)}>{formatDate(post.post_date)}</time>
                                    </div>
                                </div>

                                <h1 className={`${title} text-2xl leading-snug md:text-[34px] md:leading-[1.25]`}>
                                    {post.post_title}
                                </h1>

                                <div className="mt-4 h-[3px] w-14 rounded bg-[#c00]" />
                            </header>
                        </Reveal>

                        {post.hero_image_link && (
                            <Reveal direction="zoom" delay={100}>
                                <Zoomable onClick={() => setZoom(0)} className="mb-6 block w-fit max-w-full">
                                    <img className="block h-auto max-w-full" src={post.hero_image_link} alt={post.post_title} />
                                </Zoomable>
                            </Reveal>
                        )}

                        {post.post_content && (
                            <Reveal direction="up">
                                {hasHtml(post.post_content) ? (
                                    <div className={richText} dangerouslySetInnerHTML={{ __html: clean(post.post_content) }} />
                                ) : (
                                    <div className="whitespace-pre-line text-[15px] leading-[1.8]">{post.post_content}</div>
                                )}
                            </Reveal>
                        )}

                        {gallery.length > 0 && (
                            <div className="mt-7 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                                {gallery.map((g, i) => (
                                    <Reveal key={g.gallery_id} direction="zoom" delay={(i % 4) * 80}>
                                        <Zoomable onClick={() => setZoom(heroCount + i)}>
                                            <img className="block w-full" src={g.image_link_1} alt="" loading="lazy" />
                                        </Zoomable>
                                    </Reveal>
                                ))}
                            </div>
                        )}

                        <RelatedPosts post={post} onOpen={openPost} />

                        {post.comment_status === 'open' && <CommentSection postId={post.post_id} />}
                    </div>
                )}
            </div>
        );
    }

    /* ---------- List view ---------- */
    return (
        <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-6 text-[#444]">
            <Reveal direction="down">
                <h1 className={`${title} border-b border-[#111] pb-3.5 text-[26px] md:text-[32px]`}>
                    Latest News and Events
                </h1>
            </Reveal>

            <Reveal direction="up" delay={100}>
                <div className="my-7 flex flex-wrap justify-center gap-2">
                    {['', ...CATEGORIES].map((c) => (
                        <button
                            key={c || 'all'}
                            type="button"
                            onClick={() => setCategory(c)}
                            aria-pressed={category === c}
                            className={`cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-300 ${category === c
                                ? 'border-[#c00] bg-[#c00] text-white shadow-md shadow-[#c00]/30'
                                : 'border-neutral-300 bg-white text-[#6b7c88] hover:border-[#c00] hover:text-[#c00]'
                                }`}
                        >
                            {c || 'All'}
                        </button>
                    ))}
                </div>
            </Reveal>

            {error && <p className="py-8 text-center text-red-700">{error}</p>}
            {!loading && !error && posts.length === 0 && <p className="py-8 text-center">No posts found.</p>}

            {posts.map((p, i) => (
                <Reveal
                    as="article"
                    key={p.post_id}
                    direction={i % 2 === 0 ? 'right' : 'left'}
                    className="mb-12 grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-2.5"
                >
                    {p.hero_image_link
                        ? (
                            // full height, so the contact strip at the bottom of the banners is not cropped
                            <div className="group relative overflow-hidden">
                                <img
                                    className="block h-auto w-full cursor-pointer bg-gray-200"
                                    src={p.hero_image_link}
                                    alt={p.post_title}
                                    loading="lazy"
                                    onClick={() => openPost(p)}
                                />
                                <Shine />
                            </div>
                        )
                        : <div className="aspect-video w-full bg-gray-200" />}
                    <div>
                        <h2 className={`${title} mb-[18px] text-[22px] leading-snug`}>{p.post_title}</h2>
                        <div className="mb-[18px] text-sm text-[#555]">{formatDate(p.post_date)}</div>
                        <p className="mb-[18px] text-sm leading-[1.8]">{plain(p.post_excerpt)}</p>
                        <button className={btn} onClick={() => openPost(p)}>View More</button>
                    </div>
                </Reveal>
            ))}

            {loading && <p className="py-8 text-center">Loading…</p>}

            {!loading && page < totalPages && (
                <div className="mb-10 mt-16 text-center">
                    <button className={btn} onClick={() => load(page + 1, category, true)}>Load more</button>
                </div>
            )}
            <div className="border-t border-[#111]" />
        </div>
    );
}