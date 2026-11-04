import { useEffect, useState } from 'react'
import logo from '../assets/logo/LAG_WhiteRed_Logo.png'
import mitsubishi from '../assets/brand/mitsubishi.png'
import suzuki from '../assets/brand/suzuki.png'
import chevrolet from '../assets/brand/chevrolet.png'
import ford from '../assets/brand/ford.png'
import foton from '../assets/brand/foton.png'
import chery from '../assets/brand/Chery-260x139.png'
import hyundai from '../assets/brand/hyundai.png'
import kia from '../assets/brand/kia.png'
import mazda from '../assets/brand/mazda.png'
import Reveal from '../components/Reveal'

/* =====================================================================
   HOW TO ADD YOUR PHOTOS
   1. Put the image in src/assets/ (for example src/assets/brands/bmw.png)
   2. Import it here:      import bmw from '../assets/brands/bmw.png'
   3. Replace `src: null`  with  `src: bmw`   in the data below
   Any `src: null` shows a gray placeholder box with a label.
   ===================================================================== */

/* ---------- IMPORTS (uncomment as you add photos) ---------- */
// import slide1 from '../assets/hero/slide-1.jpg'
// import bmw from '../assets/brands/bmw.png'
// import news1 from '../assets/news/news-1.jpg'
// import offer1 from '../assets/offers/offer-1.jpg'
// import videoThumb from '../assets/videos/video-1.jpg'
// import carmix from '../assets/partners/carmix.png'
// import dpoSeal from '../assets/dpo-seal.png'

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

/* ---------- DATA ---------- */
const slides = [
  { brand: 'BMW', left: 'PAMPANGA PREMIER MOTORRAD', title: 'THE HOME OF LEGENDS AND ADVENTURERS', sub: 'OPENING SOON PAMPANGA PREMIER MOTORRAD', right: 'MAKE LIFE A RIDE', src: null },
  { brand: 'Ford', left: 'FORD PAMPANGA', title: 'NEXT-GEN REVEAL', sub: 'TOUGHER THAN IT SEEMS', right: 'BUILT TOUGH', src: null },
  { brand: 'Mitsubishi', left: 'MITSUBISHI CARWORLD', title: 'LIFE MADE BETTER', sub: 'ALL-IN DOWN PAYMENT', right: 'DRIVE YOUR DREAMS', src: null },
  { brand: 'Suzuki', left: 'SUZUKI', title: 'BUILD YOUR WAY UP', sub: 'DRIVE SUZUKI ALL THE WAY', right: 'WAY OF LIFE', src: null },
]

const cars = [
  { name: 'Mitsubishi Motors', src: mitsubishi }, { name: 'Suzuki', src: suzuki }, { name: 'Chevrolet', src: chevrolet },
  { name: 'Ford', src: ford }, { name: 'Foton', src: foton },
  { name: 'Chery', src: chery }, { name: 'Hyundai', src: hyundai }, { name: 'Kia', src: kia },
  { name: 'Mazda', src: mazda }, { name: 'BMW', src: null }, { name: 'Changhe', src: null },
  { name: 'Jetour', src: null }, { name: 'Fuso', src: null }, { name: 'Haima', src: null },
  { name: 'Jeep', src: null }, { name: 'MINI', src: null }, { name: 'Peugeot', src: null },
  { name: 'Lynk & Co', src: null }, { name: 'Volkswagen', src: null }, { name: 'Geely', src: null },
]

const bikes = [
  { name: 'Harley-Davidson', src: null }, { name: 'BMW Motorrad', src: null }, { name: 'Vespa', src: null },
  { name: 'Triumph', src: null }, { name: 'Aprilia / Moto Guzzi', src: null },
  { name: 'Peugeot Motocycles', src: null }, { name: 'CFMOTO', src: null }, { name: 'Piaggio Ape', src: null },
]

const news = [
  { title: 'The Drive that Haunts your Dreams', date: 'October 9, 2026', src: null, text: 'Ready to chase the thrill of your next drive? Make every journey unforgettable with Mitsubishi Carworld’s exciting lineup with exclusive deals to make your next […]' },
  { title: 'Build Your Way Up. Drive Suzuki All the Way', date: 'October 9, 2026', src: null, text: 'Low payout, big way out! Make every journey more exciting with Suzuki’s incredible deals designed to help you achieve your driving goals without breaking the […]' },
  { title: 'Spooktacular Deals. Bigger Savings in Your Sight.', date: 'October 8, 2026', src: null, text: 'No tricks, just massive treats! Get ready for a thrilling driving experience with Haima’s great cash discounts on the Haima V70 and S7 MT! Whether […]' },
]

const offerImage = null // e.g. offer1
const videoImage = null // e.g. videoThumb
const partnersBackground = null // e.g. a garage photo
const dpoImage = null // e.g. dpoSeal

const partners = [
  { name: 'Carmix', src: null, text: 'Check out affordable pre-owned vehicles', cta: 'VISIT CARMIX' },
  { name: 'Corporate Guarantee', src: null, text: 'Provides non-life insurance such as motor, fire, personal accident, casualty, marine and bond requirements', cta: 'VISIT CGIC' },
  { name: 'Laus Auto Services', src: null, text: 'We offer quality parts and comprehensive service for your satisfaction.', cta: 'VISIT LausAutoServices' },
]

const container = 'mx-auto w-[92%] max-w-[1180px]'

/* ---------- HERO ---------- */
function Hero() {
  const [i, setI] = useState(0)
  const [offset, setOffset] = useState(0)

  // parallax: hero content moves slower than the page
  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 600))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const s = slides[i]

  return (
    <section className="relative h-[360px] overflow-hidden bg-white lg:h-[433px]">
      <div
        key={i}
        style={{ transform: `translateY(${offset * 0.25}px)` }}
        className="grid h-full animate-slide-in grid-cols-2 will-change-transform lg:grid-cols-[20%_33%_23%_24%]"
      >
        {/* left text */}
        <div className="hidden items-center gap-3.5 pl-2.5 text-neutral-900 lg:flex">
          <div className="grid h-[70px] w-[70px] flex-none place-items-center overflow-hidden rounded-full border-[3px] border-neutral-900 text-center text-[11px] font-bold">
            {s.brand}
          </div>
          <h3 className="text-2xl leading-[1.05] font-extrabold">{s.left}</h3>
        </div>

        {/* center photo */}
        <div className="lg:-ml-[4%] lg:w-[108%] lg:[clip-path:polygon(0_0,100%_0,96%_100%,0_100%)]">
          <Photo src={s.src} label={`HERO PHOTO – ${s.brand} (main)`} size="1200 x 433 px" />
        </div>

        {/* middle text */}
        <div className="hidden flex-col justify-center pr-5 pl-8 text-neutral-900 lg:flex">
          <h2 className="text-2xl leading-[1.1] font-extrabold">{s.title}</h2>
          <h4 className="mt-4 text-lg leading-[1.15] font-extrabold">{s.sub}</h4>
        </div>

        {/* right photo + text */}
        <div className="relative flex items-center lg:-ml-[6%] lg:[clip-path:polygon(6%_0,100%_0,100%_100%,0_100%)]">
          <div className="absolute inset-0">
            <Photo src={s.src} label={`HERO PHOTO – ${s.brand} (side)`} size="600 x 433 px" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/35" />
          <h1 className="relative pl-6 text-4xl leading-[0.95] font-black text-neutral-800 lg:pl-[18%] lg:text-[44px]">
            {s.right}
          </h1>
        </div>
      </div>

      {/* arrow */}
      <button
        onClick={() => setI((i + 1) % slides.length)}
        aria-label="Next"
        className="absolute top-1/2 right-12 -translate-y-1/2 cursor-pointer text-3xl text-white transition hover:scale-125"
      >
        ❯
      </button>

      {/* thumbnails */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-1 lg:-translate-x-[70%]">
        {slides.map((sl, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-12 w-[46px] cursor-pointer overflow-hidden border-2 transition hover:-translate-y-1 hover:opacity-100 ${
              idx === i ? '-translate-y-1 border-white opacity-100' : 'border-neutral-500 opacity-70'
            }`}
          >
            <Photo src={sl.src} label={`${idx + 1}`} className="border-0" />
          </button>
        ))}
      </div>
    </section>
  )
}

/* ---------- BRANDS ---------- */
function BrandGrid({ items, cols }) {
  return (
    <div className={`mx-auto mb-[70px] grid items-center justify-items-center gap-3 last:mb-0 max-md:mb-8 ${cols}`}>
      {items.map((b, idx) => (
        <Reveal key={b.name} direction="zoom" delay={idx * 70} className="flex w-full justify-center">
        <a
          href="#"
          className="block h-[90px] w-full max-w-[150px] transition duration-300 hover:scale-110"
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

          <button className="mt-12 cursor-pointer bg-neutral-200 px-[34px] py-3.5 text-sm text-neutral-600 transition hover:bg-lag-red hover:text-white">
            VIEW MORE
          </button>

          {!partnersBackground && (
            <p className="mt-6 text-xs text-white/50">[ Section background photo goes here: garage / service center ]</p>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- ABOUT + DPO ---------- */
function About() {
  return (
    <section className={`${container} grid gap-10 pt-[60px] pb-[90px] lg:grid-cols-[1.7fr_1fr_0.8fr]`}>
      <Reveal direction="right">
        <h2 className="mb-3.5 text-[32px] font-normal text-black">The LausAutoGroup</h2>
        <p className="text-sm leading-[1.8] [&>a]:text-lag-red">
          The largest and fastest growing multi-brand automotive network in the country today.<br />
          We are a highly respected name in providing customer care and satisfaction. We have established this
          strong reputation in the last 38 years by doing business that gives first-class sales and after-sales
          service to customers.<br />
          Our 40 dealerships offer the widest selection of vehicles that suits your needs; be it for personal,
          family or business use.<br />
          Choose what suits you, because at LausAutoGroup,<br />
          we have the right car for you! <a href="#">Read More…</a>
        </p>
      </Reveal>

      <Reveal direction="up" delay={150}>
        <h3 className="mb-3.5 text-2xl font-normal text-black">DPO/DPS</h3>
        <p className="text-sm leading-[1.8]">DATA PROTECTION OFFICER AND DATA PROCESSING SYSTEM</p>
        <div className="relative mt-[30px] h-[275px] bg-white">
          <Photo src={dpoImage} label="DPO / DPS SEAL" size="275 x 275 px" fit="contain" />
          <span className="absolute top-1/2 left-2.5 -translate-y-1/2 cursor-pointer text-pink-400">❮</span>
          <span className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-pink-400">❯</span>
        </div>
      </Reveal>

      <Reveal direction="left" delay={300}>
        <img src={logo} alt="LausAutoGroup" className="w-full invert-[.55]" />
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Highlights />
      <Partners />
      <About />
    </main>
  )
}