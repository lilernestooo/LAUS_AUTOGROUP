import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* Loads EVERY image inside src/assets/dpo/ automatically (png, jpg, jpeg, webp).
   Sorted by file name with numbers in order: 1.jpg, 2.jpg ... 10.jpg, 11.jpg */
const modules = import.meta.glob('../assets/dpo/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const images = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src)

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/* ---------- ZOOM + PAN LOGIC (shared by the carousel and the fullscreen viewer) ----------
   - drag to pan when zoomed in
   - pinch with two fingers (touch screens)
   - double-click / double-tap toggles zoom */
function useZoomPan({ max = 4 } = {}) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const box = useRef(null)
  const pointers = useRef(new Map())
  const pinch = useRef(null)
  const scaleRef = useRef(1)
  scaleRef.current = scale

  const zoomBy = useCallback((d) => setScale((s) => clamp(+(s + d).toFixed(2), 1, max)), [max])
  const zoomIn = useCallback(() => zoomBy(0.5), [zoomBy])
  const zoomOut = useCallback(() => zoomBy(-0.5), [zoomBy])
  const reset = useCallback(() => {
    setScale(1)
    setPos({ x: 0, y: 0 })
  }, [])

  // keep the picture inside the box whenever the zoom level changes
  useEffect(() => {
    if (scale <= 1) {
      setPos({ x: 0, y: 0 })
      return
    }
    const el = box.current
    if (!el) return
    const mx = (el.clientWidth * (scale - 1)) / 2
    const my = (el.clientHeight * (scale - 1)) / 2
    setPos((p) => ({ x: clamp(p.x, -mx, mx), y: clamp(p.y, -my, my) }))
  }, [scale])

  const onPointerDown = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    e.currentTarget.setPointerCapture?.(e.pointerId)
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: scaleRef.current }
    }
    setDragging(true)
  }

  const onPointerMove = (e) => {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    const cur = { x: e.clientX, y: e.clientY }
    pointers.current.set(e.pointerId, cur)

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      setScale(clamp(pinch.current.scale * (dist / pinch.current.dist), 1, max))
    } else if (scaleRef.current > 1 && box.current) {
      const mx = (box.current.clientWidth * (scaleRef.current - 1)) / 2
      const my = (box.current.clientHeight * (scaleRef.current - 1)) / 2
      setPos((p) => ({
        x: clamp(p.x + cur.x - prev.x, -mx, mx),
        y: clamp(p.y + cur.y - prev.y, -my, my),
      }))
    }
  }

  const onPointerEnd = (e) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0) setDragging(false)
  }

  const onDoubleClick = () => setScale((s) => (s > 1 ? 1 : 2.5))

  return {
    scale,
    pos,
    dragging,
    box,
    zoomBy,
    zoomIn,
    zoomOut,
    reset,
    bind: { onPointerDown, onPointerMove, onPointerUp: onPointerEnd, onPointerCancel: onPointerEnd, onDoubleClick },
  }
}

const zoomStyle = (z) => ({
  transform: `translate(${z.pos.x}px, ${z.pos.y}px) scale(${z.scale})`,
  transition: z.dragging ? 'none' : 'transform 0.25s ease-out',
})

/* ---------- SMALL UI PIECES ---------- */
const icons = {
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  reset: <path d="M4 12a8 8 0 1 0 3-6.2M4 4v5h5" />,
}

function Icon({ name, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

function Btn({ label, onClick, disabled, dark, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition hover:bg-lag-red hover:text-white disabled:pointer-events-none disabled:opacity-40 ${
        dark ? 'bg-white/10 text-white' : 'bg-white/90 text-neutral-700 shadow'
      }`}
    >
      {children}
    </button>
  )
}

/* ---------- FULLSCREEN VIEWER ---------- */
function Lightbox({ start, onClose }) {
  const [index, setIndex] = useState(start)
  const z = useZoomPan({ max: 5 })
  const { reset, zoomIn, zoomOut, zoomBy } = z
  const total = images.length

  const go = useCallback(
    (d) => {
      setIndex((i) => (i + d + total) % total)
      reset()
    },
    [total, reset]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose(index)
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === '+' || e.key === '=') zoomIn()
      else if (e.key === '-') zoomOut()
      else if (e.key === '0') reset()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // lock page scroll (also lets the wheel zoom)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [index, onClose, go, zoomIn, zoomOut, reset])

  // rendered in <body> so it is not affected by the Reveal animation wrappers
  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="DPO/DPS certificates">
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
        <span className="text-sm text-white/70">
          {index + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <Btn dark label="Zoom out (-)" onClick={() => zoomOut()} disabled={z.scale <= 1}>
            <Icon name="minus" />
          </Btn>
          <span className="w-12 text-center text-sm tabular-nums">{Math.round(z.scale * 100)}%</span>
          <Btn dark label="Zoom in (+)" onClick={() => zoomIn()} disabled={z.scale >= 5}>
            <Icon name="plus" />
          </Btn>
          <Btn dark label="Reset zoom (0)" onClick={reset} disabled={z.scale === 1}>
            <Icon name="reset" />
          </Btn>
          <Btn dark label="Close (Esc)" onClick={() => onClose(index)}>
            <Icon name="close" />
          </Btn>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={z.box}
          {...z.bind}
          onWheel={(e) => zoomBy(e.deltaY < 0 ? 0.25 : -0.25)}
          style={{ touchAction: 'none' }}
          className={`absolute inset-0 overflow-hidden ${
            z.scale > 1 ? (z.dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
        >
          <img
            key={index}
            src={images[index]}
            alt={`DPO/DPS certificate ${index + 1}`}
            draggable="false"
            style={zoomStyle(z)}
            className="h-full w-full select-none object-contain p-4"
          />
        </div>

        {total > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous" className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-xl text-white transition hover:bg-lag-red">
              ❮
            </button>
            <button onClick={() => go(1)} aria-label="Next" className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-xl text-white transition hover:bg-lag-red">
              ❯
            </button>
          </>
        )}
      </div>

      <p className="py-2 text-center text-xs text-white/50">Scroll or pinch to zoom · drag to move · double-click to toggle · ← → to browse</p>
    </div>,
    document.body
  )
}

/* ---------- CAROUSEL ---------- */
export default function DpoCarousel({ interval = 3500 }) {
  const total = images.length
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const touchX = useRef(null)
  const z = useZoomPan({ max: 4 })
  const { reset } = z

  const go = useCallback((dir) => setIndex((i) => (i + dir + total) % total), [total])

  const close = useCallback((i) => {
    setIndex(i)
    setOpen(false)
  }, [])

  // every new slide starts un-zoomed
  useEffect(() => {
    reset()
  }, [index, reset])

  // autoplay: pauses on hover/touch, while zoomed in, and while the fullscreen viewer is open
  const paused = hover || open || z.scale > 1
  useEffect(() => {
    if (paused || total < 2) return
    const t = setInterval(() => go(1), interval)
    return () => clearInterval(t)
  }, [paused, total, interval, go])

  /* nothing in the folder yet */
  if (total === 0) {
    return (
      <div className="flex h-[275px] flex-col items-center justify-center gap-1 border-2 border-dashed border-neutral-400 bg-neutral-300/70 p-3 text-center text-neutral-500">
        <span className="text-[11px] font-semibold">DPO / DPS CAROUSEL</span>
        <span className="text-[10px] opacity-70">Add images to src/assets/dpo/</span>
      </div>
    )
  }

  const onTouchStart = (e) => {
    setHover(true)
    if (z.scale === 1 && e.touches.length === 1) touchX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    setHover(false)
    if (touchX.current === null) return
    const diff = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1) // swipe left = next
    touchX.current = null
  }

  return (
    <>
      <div
        className="group/dpo relative h-[275px] w-full max-w-full min-w-0 overflow-hidden bg-white"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* sliding track (this layer handles zoom, drag and swipe) */}
        <div
          ref={z.box}
          {...z.bind}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: z.scale > 1 ? 'none' : 'pan-y' }}
          className={`absolute inset-0 ${z.scale > 1 ? (z.dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
        >
          <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((src, i) => (
              <div key={src} className="h-full w-full shrink-0 basis-full overflow-hidden px-9 py-3">
                <img
                  src={src}
                  alt={`DPO/DPS certificate ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  style={i === index ? zoomStyle(z) : undefined}
                  className="h-full w-full select-none object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* zoom toolbar */}
        <div className="absolute top-2 right-2 z-10 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover/dpo:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100">
          <Btn label="Zoom out" onClick={() => z.zoomOut()} disabled={z.scale <= 1}>
            <Icon name="minus" />
          </Btn>
          <Btn label="Zoom in" onClick={() => z.zoomIn()} disabled={z.scale >= 4}>
            <Icon name="plus" />
          </Btn>
          <Btn label="Fullscreen" onClick={() => setOpen(true)}>
            <Icon name="expand" />
          </Btn>
        </div>

        {z.scale > 1 && (
          <button onClick={reset} className="absolute top-2 left-2 z-10 cursor-pointer rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 shadow transition hover:bg-lag-red hover:text-white">
            {Math.round(z.scale * 100)}% · Reset
          </button>
        )}

        {/* arrows */}
        {total > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous" className="absolute top-1/2 left-1 z-10 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-lg text-pink-400 transition hover:bg-black/5 hover:text-lag-red">
              ❮
            </button>
            <button onClick={() => go(1)} aria-label="Next" className="absolute top-1/2 right-1 z-10 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-lg text-pink-400 transition hover:bg-black/5 hover:text-lag-red">
              ❯
            </button>
          </>
        )}

        {/* counter + progress bar */}
        <span className="pointer-events-none absolute right-2 bottom-1.5 z-10 text-[11px] text-neutral-400">
          {index + 1} / {total}
        </span>
        <div className="absolute bottom-0 left-0 z-10 h-[3px] bg-lag-red transition-all duration-500" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {open && <Lightbox start={index} onClose={close} />}
    </>
  )
}