import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo/LAG_WhiteRed_Logo.png'
import logoColor from '../assets/logo/LAG_Color_Logo.png'
import mitsubishi from '../assets/brand/mitsubishi.png'
import suzuki from '../assets/brand/suzuki.png'
import chevrolet from '../assets/brand/chevrolet.png'
import ford from '../assets/brand/ford.png'
import foton from '../assets/brand/foton.png'
import chery from '../assets/brand/Chery-260x139.png'
import hyundai from '../assets/brand/hyundai.png'
import kia from '../assets/brand/kia.png'
import mazda from '../assets/brand/mazda.png'
import bmw from '../assets/brand/bmw.png'
import changhe from '../assets/brand/changhe.png'
import jetour from '../assets/brand/jetour-home.png'
import fuso from '../assets/brand/fuso.png'
import haima from '../assets/brand/haima.png'
import jeep from '../assets/brand/jeep.png'
import mini from '../assets/brand/mini.png'
import peugeot from '../assets/brand/peugeot.png'
import Lynk from '../assets/brand/Lynk.png'
import volkswagen from '../assets/brand/volkswagen.png'
import geely from '../assets/brand/Geely.png'
import harley from '../assets/brand/HarleyDavidson.png'
import bmw_motorrad from '../assets/brand/BMW_Motorrad.png'
import vespa from '../assets/brand/Vespa.png'
import triumph from '../assets/brand/triumph.png'
import aprilia from '../assets/brand/a-m.png'
import peugeot_motor from '../assets/brand/peugeot-motor.png'
import cf_moto from '../assets/brand/cf-moto.png'
import ape from '../assets/brand/piaggio.png'

import carmix from '../assets/partners/carmix.png'
import cg_partners from '../assets/partners/cg-partners.jpg'
import las_partners from '../assets/partners/las-partners.png'
import bg_partners from '../assets/partners/cw-service-auto-partners-bg-1.jpg'

import banner1 from '../assets/banners/45thAnniversary_Banner1902x609_1-min.jpg'
import banner2 from '../assets/banners/CW_Banner.jpg'
import banner3 from '../assets/banners/Geely.jpg'
import banner4 from '../assets/banners/MAZDA.jpg'
import banner5 from '../assets/banners/LAUSFORD.jpg'
import banner6 from '../assets/banners/JETOUR.jpg'
import banner7 from '../assets/banners/chev.jpg'
import banner8 from '../assets/banners/1-Suzuki.jpg'
import banner9 from '../assets/banners/Carworld.jpg'
import banner10 from '../assets/banners/MOTORRAD_WEBSITE_BANNER.jpg'
import banner11 from '../assets/banners/Harley-D.jpg'
import banner12 from '../assets/banners/Triumph-Banner.jpg'
import Reveal from '../components/Reveal'
import DpoCarousel from '../components/DpoCarousel'

/* ---------- PHOTO PLACEHOLDER ---------- */
function Photo({ src, alt = '', label = 'Photo', size, className = '', fit = 'cover', children }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      />
    )
  }
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-neutral-400 bg-neutral-300/70 p-1 text-center text-neutral-500 ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M21 16l-5-5-8 9" />
      </svg>
      <span className="text-[11px] leading-tight font-semibold">{label}</span>
      {size && <span className="text-[10px] leading-tight opacity-70">{size}</span>}
      {children}
    </div>
  )
}

/* ---------- BANNERS: the carousel shows them in this order ---------- */
const banners = [
  banner1, banner2, banner3, banner4, banner5, banner6,
  banner7, banner8, banner9, banner10, banner11, banner12,
]

const cars = [
  { name: 'Mitsubishi Motors', src: mitsubishi }, { name: 'Suzuki', src: suzuki }, { name: 'Chevrolet', src: chevrolet },
  { name: 'Ford', src: ford }, { name: 'Foton', src: foton },
  { name: 'Chery', src: chery }, { name: 'Hyundai', src: hyundai }, { name: 'Kia', src: kia },
  { name: 'Mazda', src: mazda }, { name: 'BMW', src: bmw }, { name: 'Changhe', src: changhe },
  { name: 'Jetour', src: jetour }, { name: 'Fuso', src: fuso }, { name: 'Haima', src: haima },
  { name: 'Jeep', src: jeep }, { name: 'MINI', src: mini }, { name: 'Peugeot', src: peugeot },
  { name: 'Lynk & Co', src: Lynk }, { name: 'Volkswagen', src: volkswagen }, { name: 'Geely', src: geely },
]

const bikes = [
  { name: 'Harley-Davidson', src: harley }, { name: 'BMW Motorrad', src: bmw_motorrad }, { name: 'Vespa', src: vespa },
  { name: 'Triumph', src: triumph }, { name: 'Aprilia / Moto Guzzi', src: aprilia },
  { name: 'Peugeot Motocycles', src: peugeot_motor }, { name: 'CFMOTO', src: cf_moto }, { name: 'Piaggio Ape', src: ape },
]

const news = [
  { title: 'The Drive that Haunts your Dreams', date: 'October 9, 2026', src: null, text: 'Ready to chase the thrill of your next drive? Make every journey unforgettable with Mitsubishi Carworld’s exciting lineup with exclusive deals to make your next […]' },
  { title: 'Build Your Way Up. Drive Suzuki All the Way', date: 'October 9, 2026', src: null, text: 'Low payout, big way out! Make every journey more exciting with Suzuki’s incredible deals designed to help you achieve your driving goals without breaking the […]' },
  { title: 'Spooktacular Deals. Bigger Savings in Your Sight.', date: 'October 8, 2026', src: null, text: 'No tricks, just massive treats! Get ready for a thrilling driving experience with Haima’s great cash discounts on the Haima V70 and S7 MT! Whether […]' },
]

const offerImage = null // e.g. offer1
const videoImage = null // e.g. videoThumb
const partnersBackground = bg_partners // e.g. a garage photo

const partners = [
  { name: 'Carmix', src: carmix, text: 'Check out affordable pre-owned vehicles', cta: 'VISIT CARMIX' },
  { name: 'Corporate Guarantee', src: cg_partners, text: 'Provides non-life insurance such as motor, fire, personal accident, casualty, marine and bond requirements', cta: 'VISIT CGIC' },
  { name: 'Laus Auto Services', src: las_partners, text: 'We offer quality parts and comprehensive service for your satisfaction.', cta: 'VISIT LausAutoServices' },
]

const container = 'mx-auto w-[92%] max-w-[1180px]'

/* ---------- HERO / BANNER CAROUSEL ----------
   - Slides move side by side (true carousel, infinite loop)
   - Autoplay every 5s, pauses on hover / while dragging / when tab is hidden
   - Swipe or mouse-drag to change slides
   - Arrow keys work when the carousel is focused
   - Arrows, thumbnails (md+) and dots (mobile)
   - Respects "reduce motion"
*/
const AUTOPLAY_MS = 5000
const SLIDE_MS = 700

function Hero() {
  const total = banners.length

  // track has a clone of the last slide in front and the first slide at the end
  // so wrapping around slides smoothly instead of rewinding.
  // position 1 = first real slide.
  const [pos, setPos] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)

  const startX = useRef(0)
  const width = useRef(1)
  const wrapRef = useRef(null)
  const locked = useRef(false)

  const slides = [banners[total - 1], ...banners, banners[0]]
  const active = (pos - 1 + total) % total // real index 0..total-1

  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const duration = reduceMotion ? 0 : SLIDE_MS

  const move = (d) => {
    if (locked.current) return
    locked.current = true
    setAnimate(true)
    setPos((p) => p + d)
    setTimeout(() => (locked.current = false), duration || 0)
  }

  const goTo = (idx) => {
    if (locked.current || idx === active) return
    locked.current = true
    setAnimate(true)
    setPos(idx + 1)
    setTimeout(() => (locked.current = false), duration || 0)
  }

  // after sliding onto a clone, jump (without animation) to the real slide
  const onTransitionEnd = () => {
    if (pos === 0) {
      setAnimate(false)
      setPos(total)
    } else if (pos === total + 1) {
      setAnimate(false)
      setPos(1)
    }
  }

  // re-enable animation right after an instant jump
  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(id)
  }, [animate])

  // reduced motion has no transitionend, so handle the jump directly
  useEffect(() => {
    if (duration === 0) onTransitionEnd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos])

  // autoplay
  useEffect(() => {
    if (paused || dragging || total < 2) return
    const t = setInterval(() => move(1), AUTOPLAY_MS)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, dragging, total])

  // pause when the browser tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  /* ----- swipe / drag ----- */
  const onPointerDown = (e) => {
    if (e.target.closest('button')) return
    startX.current = e.clientX
    width.current = wrapRef.current?.offsetWidth || 1
    setDragging(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!dragging) return
    setDragX(e.clientX - startX.current)
  }
  const endDrag = () => {
    if (!dragging) return
    const threshold = width.current * 0.15
    const dx = dragX
    setDragging(false)
    setDragX(0)
    if (dx > threshold) move(-1)
    else if (dx < -threshold) move(1)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') move(-1)
    if (e.key === 'ArrowRight') move(1)
  }

  const dragPercent = dragging ? (dragX / width.current) * 100 : 0

  return (
    <section
      ref={wrapRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured banners"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative aspect-[1351/433] max-h-[520px] w-full touch-pan-y overflow-hidden bg-neutral-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-lag-red"
    >
      {/* sliding track */}
      <div
        onTransitionEnd={onTransitionEnd}
        className={`flex h-full ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          transform: `translateX(calc(${-pos * 100}% + ${dragPercent}%))`,
          transition: animate && !dragging && duration ? `transform ${duration}ms cubic-bezier(.65,0,.35,1)` : 'none',
        }}
      >
        {slides.map((src, idx) => {
          const realIdx = (idx - 1 + total) % total
          const isClone = idx === 0 || idx === slides.length - 1
          return (
            <div
              key={`${idx}-${src}`}
              className="h-full w-full shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${realIdx + 1} of ${total}`}
              aria-hidden={isClone || realIdx !== active}
            >
              <img
                src={src}
                alt={isClone ? '' : `Banner ${realIdx + 1}`}
                loading={realIdx === 0 && !isClone ? 'eager' : 'lazy'}
                draggable="false"
                className="h-full w-full object-cover"
              />
            </div>
          )
        })}
      </div>

      {/* arrows */}
      {total > 1 && (
        <>
          <button
            onClick={() => move(-1)}
            aria-label="Previous banner"
            className="absolute top-1/2 left-3 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/30 text-xl text-white backdrop-blur-sm transition hover:scale-110 hover:bg-lag-red"
          >
            ❮
          </button>
          <button
            onClick={() => move(1)}
            aria-label="Next banner"
            className="absolute top-1/2 right-3 z-10 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/30 text-xl text-white backdrop-blur-sm transition hover:scale-110 hover:bg-lag-red"
          >
            ❯
          </button>
        </>
      )}

      {/* thumbnails (tablet and desktop) */}
      <div className="absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 gap-1 md:flex">
        {banners.map((src, idx) => (
          <button
            key={src}
            onClick={() => goTo(idx)}
            aria-label={`Go to banner ${idx + 1}`}
            aria-current={idx === active}
            className={`h-12 w-[52px] cursor-pointer overflow-hidden border-2 transition duration-200 hover:-translate-y-1 hover:opacity-100 ${
              idx === active ? '-translate-y-1 border-white opacity-100' : 'border-neutral-500 opacity-70'
            }`}
          >
            <img src={src} alt="" draggable="false" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* dots (mobile) */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:hidden">
        {banners.map((src, idx) => (
          <button
            key={src}
            onClick={() => goTo(idx)}
            aria-label={`Go to banner ${idx + 1}`}
            aria-current={idx === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === active ? 'w-5 bg-lag-red' : 'w-1.5 bg-white/70'}`}
          />
        ))}
      </div>

      {/* progress bar for the autoplay timer */}
      {total > 1 && !reduceMotion && (
        <div className="absolute top-0 left-0 z-10 h-[3px] w-full bg-black/10">
          <div
            key={`${pos}-${paused}`}
            className="h-full bg-lag-red"
            style={{
              width: paused ? '0%' : '100%',
              transition: paused ? 'none' : `width ${AUTOPLAY_MS}ms linear`,
              animation: paused ? 'none' : undefined,
            }}
            ref={(el) => {
              if (!el || paused) return
              el.style.width = '0%'
              requestAnimationFrame(() => requestAnimationFrame(() => (el.style.width = '100%')))
            }}
          />
        </div>
      )}
    </section>
  )
}

function BrandGrid({ items, cols }) {
  return (
    <div className={`mx-auto mb-[50px] grid items-center justify-items-center gap-4 last:mb-0 max-md:mb-8 ${cols}`}>
      {items.map((b, idx) => (
        <Reveal key={b.name} direction="zoom" delay={idx * 70} className="flex w-full justify-center">
          <a
            href="#"
            className={`block transition duration-300 hover:scale-110 ${
              b.dark
                ? 'h-[110px] w-[110px] rounded-full bg-black p-1.5 md:h-[125px] md:w-[125px]'
                : 'h-[90px] w-full max-w-[160px] md:h-[120px] md:max-w-[200px]'
            }`}
          >
            <Photo src={b.src} alt={b.name} label={`LOGO – ${b.name}`} fit="contain" />
          </a>
        </Reveal>
      ))}
    </div>
  )
}

function Brands() {
  return (
    <section className="bg-lag-gray pt-10 pb-[60px]">
      <div className={container}>
        <BrandGrid items={cars.slice(0, 5)} cols="grid-cols-3 md:grid-cols-5" />
        <BrandGrid items={cars.slice(5, 11)} cols="grid-cols-3 md:grid-cols-6" />
        <BrandGrid items={cars.slice(11, 17)} cols="grid-cols-3 md:grid-cols-6" />
        <BrandGrid items={cars.slice(17)} cols="grid-cols-3 md:w-3/5" />
        <BrandGrid items={bikes.slice(0, 5)} cols="grid-cols-3 md:grid-cols-5" />
        <BrandGrid items={bikes.slice(5)} cols="grid-cols-3 md:w-3/5" />
      </div>
    </section>
  )
}

/* ---------- NEWS / OFFERS / VIDEOS ---------- */
const heading = 'mb-3.5 text-[26px] font-normal text-lag-title'
const lead = 'mb-5 text-sm [&>a]:text-lag-red'

function Highlights() {
  return (
    <section className={`${container} grid items-start gap-10 pt-[60px] pb-[70px] lg:grid-cols-3`}>
      {/* NEWS */}
      <div>
        <p className={lead}>Check out the latest news. <a href="#">View More</a></p>
        <h2 className={heading}>NEWS</h2>
        {news.map((n, idx) => (
          <Reveal as="article" key={n.title} direction="right" delay={idx * 150} className="mb-[30px] grid grid-cols-[115px_1fr] gap-3">
            <div className="h-[85px] overflow-hidden border-r-[3px] border-lag-red">
              <Photo src={n.src} label={`NEWS ${idx + 1}`} size="230 x 170" />
            </div>
            <div>
              <h4 className="cursor-pointer border-b border-neutral-200 pb-2 text-base leading-normal font-bold text-neutral-900 transition-colors hover:text-lag-red">
                {n.title}
              </h4>
              <div className="my-2 text-[13px] text-neutral-400">
                ◔ {n.date} &nbsp; ◌ <span className="text-lag-red">0</span>
              </div>
              <p className="text-sm leading-[1.8] text-neutral-500">{n.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* OFFERS */}
      <Reveal direction="up" delay={150}>
        <h2 className={heading}>SPECIAL OFFERS</h2>
        <p className={lead}>
          Check out new car deals and special offers at a dealer near you. <a href="#">View More</a>
        </p>
        <div className="h-[252px] cursor-pointer overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <Photo src={offerImage} label="SPECIAL OFFER BANNER" size="380 x 252 px" />
        </div>
      </Reveal>

      {/* VIDEOS */}
      <Reveal direction="left" delay={300}>
        <h2 className={heading}>VIDEOS</h2>
        <p className={lead}>Watch all our videos and tvc’s by clicking. <a href="#">View More</a></p>
        <a href="#" className="group relative block h-[210px] overflow-hidden rounded">
          <Photo src={videoImage} label="VIDEO THUMBNAIL" size="372 x 210 px" />
          <div className="absolute top-1/2 left-1/2 h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-red-600 transition group-hover:scale-115">
            <div className="absolute top-3.5 left-[27px] h-0 w-0 border-y-[10px] border-l-[18px] border-y-transparent border-l-white" />
          </div>
        </a>
      </Reveal>
    </section>
  )
}

/* ---------- AUTO PARTNERS ---------- */
function Partners() {
  return (
    <section
      className="bg-neutral-700 bg-cover bg-fixed bg-center"
      style={partnersBackground ? { backgroundImage: `url(${partnersBackground})` } : undefined}
    >
      <div className="bg-black/60 pt-10 pb-[60px] text-center text-white">
        <div className={container}>
          <Reveal>
            <h2 className="mb-10 text-[26px] font-normal">Auto Partners</h2>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-3">
            {partners.map((p, idx) => (
              <Reveal key={p.name} delay={idx * 150} className="group">
                <div className="h-[100px] overflow-hidden bg-white transition-transform duration-300 group-hover:-translate-y-1.5">
                  <Photo src={p.src} alt={p.name} label={`PARTNER LOGO – ${p.name}`} size="290 x 100 px" fit="contain" />
                </div>
                <p className="mt-[70px] text-sm">{p.text}</p>
                <a href="#" className="text-sm text-lag-red transition-colors hover:text-white">
                  {p.cta}
                </a>
              </Reveal>
            ))}
          </div>

          <button className="group relative mt-12 cursor-pointer overflow-hidden bg-neutral-200 px-[34px] py-3.5 text-sm text-neutral-600 transition-colors duration-300 hover:text-white">
            <span className="absolute inset-0 -translate-x-full bg-lag-red transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">VIEW MORE</span>
          </button>

          {!partnersBackground && (
            <p className="mt-6 text-xs text-white/50">[ Section background photo goes here: garage / service center ]</p>
          )}
        </div>
      </div>
    </section>
  )
}

/* number that counts up the first time it scrolls into view */
function CountUp({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function About() {
  const stats = [
    { to: 38, suffix: '+', label: 'Years of service' },
    { to: 40, suffix: '', label: 'Dealerships' },
    { to: cars.length + bikes.length, suffix: '', label: 'Auto brands' },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* background decoration */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-neutral-300/40 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:22px_22px]"
      />

      <div className={`${container} relative grid grid-cols-1 gap-10 pt-[70px] pb-[90px] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.8fr)]`}>
        {/* ---------- COLUMN 1: text + stats ---------- */}
        <Reveal direction="right" className="group min-w-0">

          <h2 className="relative mb-7 block w-fit text-[34px] leading-tight font-normal text-black">
            The LausAutoGroup
            <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left scale-x-[.25] bg-lag-red transition-transform duration-500 group-hover:scale-x-100" />
          </h2>

          <p className="mb-4 text-lg leading-snug font-medium text-neutral-800">
            The largest and fastest growing multi-brand automotive network in the country today.
          </p>

          <div className="space-y-2.5 border-l-2 border-lag-red/60 pl-4 text-sm leading-[1.9] text-neutral-600">
            <p>
              We are a highly respected name in providing customer care and satisfaction. We have established this
              strong reputation in the last 38 years by doing business that gives first-class sales and after-sales
              service to customers.
            </p>
            <p>
              Our 40 dealerships offer the widest selection of vehicles that suits your needs; be it for personal,
              family or business use.
            </p>
            <p>
              Choose what suits you, because at LausAutoGroup,
              <br />
              we have the right car for you!
            </p>
          </div>

          <a
            href="#"
            className="group/btn relative mt-6 inline-flex overflow-hidden border border-lag-red px-7 py-3 text-sm font-semibold tracking-wide text-lag-red transition-colors duration-300 hover:text-white"
          >
            <span className="absolute inset-0 -translate-x-full bg-lag-red transition-transform duration-500 ease-out group-hover/btn:translate-x-0" />
            <span className="relative">READ MORE</span>
          </a>
        </Reveal>

        {/* ---------- COLUMN 2: DPO/DPS card ---------- */}
        <Reveal direction="up" delay={150} className="min-w-0">
          <div className="border-t-4 border-lag-red bg-white p-5 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="mb-1.5 text-2xl font-normal text-black">DPO/DPS</h3>
            <p className="mb-4 text-[13px] leading-relaxed text-neutral-500">
              DATA PROTECTION OFFICER AND DATA PROCESSING SYSTEM
            </p>
            <DpoCarousel />
          </div>
        </Reveal>

        {/* ---------- COLUMN 3: hoverable logo ---------- */}
        <Reveal direction="left" delay={300} className="flex min-w-0 flex-col items-center gap-8">
          <a href="#" className="group/logo relative mx-auto block w-full max-w-[300px]">
            {/* red glow that fades in on hover */}
            <span aria-hidden className="absolute inset-4 rounded-full bg-lag-red/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover/logo:opacity-100" />
            <img
              src={logoColor}
              alt="LausAutoGroup"
              className="relative w-full drop-shadow-md transition duration-500 ease-out group-hover/logo:-translate-y-2 group-hover/logo:scale-110 group-hover/logo:-rotate-2 group-hover/logo:drop-shadow-2xl"
            />
            {/* shadow underneath that shrinks as the logo lifts */}
            <span aria-hidden className="mx-auto mt-3 block h-3 w-3/4 rounded-full bg-black/10 blur-md transition-all duration-500 group-hover/logo:w-1/2 group-hover/logo:opacity-60" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Brands />
      <Highlights />
      <Partners />
      <About />
    </main>
  )
}