import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../../components/Reveal'

/* Loads images. A missing file never breaks the build. */
const modelImages = import.meta.glob(
  ['../../assets/models/**/*.{jpg,jpeg,png,webp}', '../../assets/bmw/*.{jpg,jpeg,png,webp}'],
  { eager: true, import: 'default' }
)

// index by file name only (lowercase), so the folder and capital letters don't matter
const modelByFile = Object.fromEntries(
  Object.entries(modelImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getModelImg = (name) => modelByFile[name.split('/').pop().toLowerCase()]
const logoImages = import.meta.glob('../../assets/brand/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const getLogo = (name) => logoImages[`../../assets/brand/${name}`]

/* big dealer logo: lives in assets/banners (found by file name only) */
const bannerImages = import.meta.glob('../../assets/banners/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const bannerByFile = Object.fromEntries(
  Object.entries(bannerImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getBanner = (name) => bannerByFile[name.toLowerCase()]

/* ---------- DATA ----------
   One block per brand. The key is the address: /brands/bmw
   Model photos live in src/assets/models/<brand>/ and the image value starts with that folder.
   Categories of the models are my guess, change them if the original differs. */
const brands = {
  bmw: {
    name: 'BMW',
    logo: 'BMW.png',
    fbLogo: 'FB-BMW.jpg', // small square logo for the Facebook card
    dealer: 'Premier Cars BMW – Pampanga',
    address: [
      'Ground Floor, CGIC Bldg. Jose Abad Santos Avenue,',
      'City of San Fernando, Pampanga 2000, Philippines',
    ],
    phoneLabel: 'Sales: +63 918 854 2431',
    phoneHref: 'tel:+639188542431',
    email: 'customercare@premiercarsbmw.com.ph',
    facebook: {
      name: 'Premier Cars BMW',
      followers: '7,539',
      href: 'https://www.facebook.com/401168446670079?ref=embed_pagez',
    },
    website: { label: 'bethefirst.bmw.com.ph', href: 'https://bethefirst.bmw.com.ph' },
    privacyHref: '#', // replace with the real Data Privacy Notice link
    categories: [
      'Sedan',
      'Hatch',
      'Coupé',
      'Tourer',
      'Gran Turismo',
      'Gran Coupé',
      'Sports Activity Coupé',
      'Sports Activity Vehicle',
    ],
    models: [
      { name: 'BMW 5 Series Sedan', category: 'Sedan', slug: '5-series-sedan', image: 'BMW-5-Series-Sedan.jpg' },
      { name: 'BMW 3 Series Sedan', category: 'Sedan', slug: '3-series-sedan', image: 'BMW-3-Series-Sedan_Thumbnail-260x146.jpg' },
      { name: 'BMW 4 Series Gran Coupe', category: 'Gran Coupé', slug: '4-series-gran-coupe', image: 'BMW-4-series-gran-coupe_Thumbnail-260x146.jpg' },
      { name: 'BMW X1', category: 'Sports Activity Vehicle', slug: 'x1', image: 'BMW-X1_Thumbnail.jpg' },
      { name: 'BMW X5', category: 'Sports Activity Vehicle', slug: 'x5', image: 'BMW-X5-XDrive40i_Thumbnail-260x146.jpg' },
      { name: 'BMW 7 Series Sedan', category: 'Sedan', slug: '7-series-sedan', image: 'BMW-7-Series-Sedan_Thumbnail-260x146.jpg' },
      { name: 'BMW X6', category: 'Sports Activity Coupé', slug: 'x6', image: 'BMW-X6_Thumbnail-260x146.jpg' },
      { name: 'BMW M2 Coupe', category: 'Coupé', slug: 'm2-coupe', image: 'BMW-M2-Coupe_Thumbnail-260x146.jpg' },
      { name: 'BMW X3', category: 'Sports Activity Vehicle', slug: 'x3', image: 'BMW-X3_Thumbnail-260x146.jpg' },
      { name: 'BMW M4 Coupe', category: 'Coupé', slug: 'm4-coupe', image: 'BMW-M4-Coupe_Thumbnail-260x146.jpg' },
      { name: 'BMW M3 Sedan', category: 'Sedan', slug: 'm3-sedan', image: 'BMW-M3-Sedan_Thumbnail-260x146.jpg' },
      { name: 'BMW X5m', category: 'Sports Activity Vehicle', slug: 'x5m', image: 'BMW-51_Thumbnail-260x146.jpg'},
    ],
  },
}

const ALL = 'All Models'

function ModelCard({ model, to }) {
  const src = getModelImg(model.image)

  const card = (
    <div className="group">
      <div className="relative overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]">
        {src ? (
          <img
            src={src}
            alt={model.name}
            loading="lazy"
            className="aspect-[16/10] w-full object-contain transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-neutral-200 px-2 text-center text-xs text-neutral-500">
            {model.image}
          </div>
        )}
        {/* red line that grows on hover */}
        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-lag-red transition-transform duration-500 group-hover:scale-x-100" />
      </div>
      <p className="mt-3 text-sm font-medium text-[#555] transition-colors duration-300 group-hover:text-lag-red md:text-base">
        {model.name}
      </p>
    </div>
  )

  // only models that have a detail page are links
  return to ? (
    <Link to={to} className="block outline-none focus-visible:ring-2 focus-visible:ring-lag-red">
      {card}
    </Link>
  ) : (
    card
  )
}

/* ---------- THE PAGE FOR ONE BRAND ---------- */
function BrandPage({ brand, slug }) {
  const [active, setActive] = useState(ALL)
  const logo = getBanner(brand.logo) || getLogo(brand.logo)
  const fbLogo =
  
  getLogo(brand.fbLogo || brand.logo) || getBanner(brand.fbLogo || brand.logo)

  const shown = active === ALL ? brand.models : brand.models.filter((m) => m.category === active)
  const countOf = (c) =>
    c === ALL ? brand.models.length : brand.models.filter((m) => m.category === c).length

  return (
    <main className="overflow-x-clip">
      <section className="relative bg-[#fcfcfc] py-10 md:py-16">
        {/* soft decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-lag-dark/5 blur-3xl" />

       <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-0">
          {/* ================= MAIN COLUMN ================= */}
          <div className="min-w-0 lg:col-span-9 lg:pr-10">
            {/* brand logo: floats, with a shadow */}
            <Reveal direction="zoom">
              <div className="flex h-44 items-center justify-center border-2 border-neutral-300 bg-[#fcfcfc] md:h-56">
                {logo ? (
                  <img
                    src={logo}
                    alt={brand.name}
                    className="w-64 max-w-full object-contain md:w-[26rem]"
                  />
                ) : (
                  <span className="text-4xl font-bold text-lag-dark">{brand.name}</span>
                )}
              </div>
            </Reveal>

            {/* inquire now */}
            <Reveal direction="left" delay={100}>
              <div className="mt-6 flex justify-end">
                <a
                  href={`mailto:${brand.email}`}
                  className="group relative inline-flex items-center gap-2 overflow-hidden border border-lag-red bg-white px-8 py-3 text-base font-bold tracking-wide text-lag-red uppercase transition-colors duration-500 hover:text-white"
                >
                  {/* red fill that slides in from the left */}
                  <span className="absolute inset-0 -translate-x-full bg-lag-red transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">Inquire Now</span>
                  <svg
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </Reveal>

            {/* models panel */}
            <Reveal direction="up" delay={100}>
              <div className="mt-10 overflow-hidden border border-neutral-200 bg-[#f8f8f8] md:mt-14 md:grid md:grid-cols-[190px_1fr]">
                {/* categories */}
                <div className="md:bg-transparent">
                  <div className="flex items-center gap-3 px-5 py-4 text-sm text-[#555]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    All Models
                  </div>
                  <ul className="flex overflow-x-auto md:block md:overflow-visible">
                    {[ALL, ...brand.categories].map((c) => (
                      <li key={c} className="shrink-0 md:shrink">
                        <button
                          type="button"
                          onClick={() => setActive(c)}
                          aria-pressed={active === c}
                          className={`flex w-full cursor-pointer items-center justify-between gap-3 border-b border-l-4 border-b-white/20 px-5 py-4 text-left text-sm whitespace-nowrap transition-all duration-300 md:whitespace-normal ${
                            active === c
                              ? 'border-l-lag-red bg-lag-red text-white'
                              : 'border-l-transparent bg-[#2b2b2b] text-white hover:border-l-lag-red hover:bg-neutral-700 hover:pl-7'
                          }`}
                        >
                          <span>{c}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] ${
                              active === c ? 'bg-white/25' : 'bg-white/10 text-neutral-300'
                            }`}
                          >
                            {countOf(c)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* model grid: replays the reveal when the category changes */}
                <div key={active} className="min-h-[300px] p-3 md:p-4">
                  {shown.length === 0 ? (
                    <p className="py-16 text-center text-[#888]">
                      No models in this category yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 xl:grid-cols-3">
                      {shown.map((m, i) => (
                        <Reveal key={m.name} direction="zoom" delay={(i % 3) * 100}>
                          <ModelCard model={m} to={m.slug ? `/brands/${slug}/${m.slug}` : null} />
                        </Reveal>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            {/* footer notes */}
            <Reveal direction="up">
              <div className="mt-10 space-y-2 text-[15px] text-[#888]">
                <p>
                  Visit{' '}
                  <a
                    href={brand.website.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lag-red underline-offset-4 hover:underline"
                  >
                    {brand.website.label}
                  </a>
                </p>
                <p>
                  Actual unit may vary from photo. Specifications &amp; colors are subject to
                  change without prior notice.
                </p>
                <p>
                  <a
                    href={brand.privacyHref}
                    className="text-lag-red underline-offset-4 hover:underline"
                  >
                    Data Privacy Notice
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-8">
            <div className="lg:sticky lg:top-28">
              <Reveal direction="right">
                <h1 className="text-2xl leading-9 font-normal text-[#222] md:text-3xl">
                  {brand.dealer}
                </h1>
                <div className="mt-4 mb-6 h-1 w-16 rounded bg-lag-red" />
              </Reveal>

              <Reveal direction="right" delay={100}>
                <div className="space-y-5 text-[15px] leading-7 text-[#666]">
                  <p>
                    {brand.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a
                      href={brand.phoneHref}
                      className="block transition-colors hover:text-lag-red"
                    >
                      {brand.phoneLabel}
                    </a>
                  </p>
                  <p>
                    e-Mail Address:
                    <a
                      href={`mailto:${brand.email}`}
                      className="block break-all transition-colors hover:text-lag-red"
                    >
                      {brand.email}
                    </a>
                  </p>
                </div>
              </Reveal>

              {/* facebook card */}
              <Reveal direction="up" delay={150}>
                <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center gap-3 p-3">
                    {fbLogo && (
                      <img
                        src={fbLogo}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-base leading-5 font-medium text-[#365899]">
                        {brand.facebook.name}
                      </p>
                      <p className="text-xs text-[#555]">{brand.facebook.followers} followers</p>
                    </div>
                  </div>
                  <div className="border-t border-neutral-200 bg-[#f2f3f5] px-3 py-3">
                    <a
                      href={brand.facebook.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold text-[#333] transition duration-300 hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#3b5998] text-[10px] font-bold text-white">
                        f
                      </span>
                      Follow Page
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

/* ---------- ROUTE ENTRY: picks the brand from the address ---------- */
export default function Brand() {
  const { slug } = useParams()
  const brand = brands[slug]

  if (!brand) {
    return (
      <main className="bg-[#fcfcfc] py-32 text-center">
        <h1 className="text-3xl font-normal text-[#222]">Brand not found</h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-lag-red" />
        <Link to="/" className="mt-8 inline-block text-lag-red hover:underline">
          Back to Home
        </Link>
      </main>
    )
  }

  // key resets the selected category when you move to another brand
  return <BrandPage key={slug} brand={brand} slug={slug} />
}