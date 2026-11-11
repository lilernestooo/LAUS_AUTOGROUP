import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'

/* Chevrolet photos: put them in src/assets/chevrolet/ (found by file name only, capital letters don't matter) */
const chevImages = import.meta.glob('../../assets/chevrolet/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const chevByFile = Object.fromEntries(
  Object.entries(chevImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getChevImg = (name) => (name ? chevByFile[name.toLowerCase()] : undefined)

/* big dealer logo: lives in assets/banners (found by file name only) */
const bannerImages = import.meta.glob('../../assets/banners/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const bannerByFile = Object.fromEntries(
  Object.entries(bannerImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getBanner = (name) => bannerByFile[name.toLowerCase()]

const brandImages = import.meta.glob('../../assets/brand/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const getBrandLogo = (name) => brandImages[`../../assets/brand/${name}`]

/* ---------- DATA ---------- */
const brand = {
  name: 'Chevrolet',
  logo: 'chevrolet.png', // from assets/banners/, falls back to assets/brand/chevrolet.png
  website: { label: 'chevrolet.com.ph', href: 'https://www.chevrolet.com.ph' },
  inquireHref: '#', // replace with the real inquire link
  privacyHref: '#', // replace with the real Data Privacy Notice link
  categories: ['Suvs and Trucks'],
  // add slug: 'tracker' to a model once its detail page and data file exist
  models: [
    { name: 'Tracker', category: 'Suvs and Trucks', slug: 'tracker', image: 'Chevrolet_Tracker_Thumbnail.jpg' },
    { name: 'Corvette Stingray', category: 'Suvs and Trucks', slug: 'corvette-stingray', image: 'Chevrolet_Corvette-Stingray_Thumbnail.jpg' },
    { name: 'Suburban', category: 'Suvs and Trucks', slug: 'suburban', image: 'Chevrolet_Suburvan_Thumbnail.jpg' },
    { name: 'Trailblazer', category: 'Suvs and Trucks', slug: 'trailblazer', image: 'Chevrolet_Trailblazer_Thumbnail.jpg' },
    { name: 'Spark', category: 'Suvs and Trucks', slug: 'spark', image: 'Chevrolet_Spark_Thumbnail.jpg' },
    { name: 'Camaro', category: 'Suvs and Trucks', slug: 'camaro', image: 'Chevrolet_Camaro_Thumbnail.jpg' },
    { name: 'Tahoe', category: 'Suvs and Trucks', slug: 'tahoe', image: 'Chevrolet_Tahoe_Thumbnail.jpg' },
    { name: 'Spark EUV', category: 'Suvs and Trucks', slug: 'spark-euv', image: 'SPARK-EUV.jpg' },
    { name: 'Captiva EV', category: 'Suvs and Trucks', slug: 'captiva-ev', image: 'CAPTIVA-EV.jpg' },
    { name: 'Captiva PHEV', category: 'Suvs and Trucks', slug: 'captiva-phev', image: 'Captiva-PHEV.jpg' },
  ],
  dealers: [
    {
      name: 'Chevrolet Baguio',
      address: ['125 Marcos Highway Sto. Tomas Proper,', 'Baguio City'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2708'] },
        { label: 'Ext Lines-Fax:', numbers: ['+63 45 963 9622', '+63 45 961 3937'] },
      ],
      facebook: {
        name: 'Chevrolet Baguio',
        followers: '2,665',
        href: 'https://www.facebook.com/ChevroletBaguio/?ref=embed_page',
        logo: 'fb-baguio.jpg',
      },
    },
    {
      name: 'Chevrolet Dagupan',
      address: ['Dagupan-Binmaley Road, Dagupan,', 'Pangasinan, Philippines, 2400'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918-854-2423'] },
        { label: 'Trunk Line:', numbers: ['+63 75 523 7777', '+63 75 515 5577'] },
        { label: 'Fax:', numbers: ['+63 45 860 2000'] },
        { label: 'Service:', numbers: ['+63 918 854 2309'] },
      ],
      facebook: {
        name: 'Chevrolet Dagupan',
        followers: '5,246',
        href: 'https://www.facebook.com/ChevroletDagupanOfficial/?ref=embed_page',
        logo: 'fb-dagupan.jpg',
      },
    },
    {
      name: 'Chevrolet Ilocos Norte',
      address: ['San Marcos, San Nicolas, Ilocos Norte,', 'Philippines 2901'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2991'] },
        { label: 'Trunk Line:', numbers: ['+63 77 677-1951', '+63 77 677-1952'] },
        { label: 'Fax:', numbers: ['+63 45 860 2000'] },
        { label: 'Service:', numbers: ['+63 918 854 2125'] },
      ],
      facebook: {
        name: 'Chevrolet Ilocos Norte',
        followers: '3,562',
        href: 'https://www.facebook.com/chevroletilocosnorte/?ref=embed_page',
        logo: 'fb-ilocos.jpg',
      },
    },
    {
      name: 'Chevrolet Pampanga',
      address: ['Jose Abad Santos Avenue, San Fernando', 'City, Pampanga, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2221'] },
        { label: 'Trunk Line:', numbers: ['+63 45 963 3333'] },
        { label: 'Fax:', numbers: ['+63 45 860 2000'] },
        { label: 'Service:', numbers: ['+63 918 854 2487'] },
      ],
      facebook: {
        name: 'Chevrolet Pampanga',
        followers: '5,225',
        href: 'https://www.facebook.com/chevroletpampanga/?ref=embed_page',
        logo: 'fb-pampanga.jpg',
      },
    },
  ],
}

const ALL = 'All Models'
const telHref = (n) => `tel:${n.replace(/[^+\d]/g, '')}`

/* ---------- MODEL CARD ---------- */
function ModelCard({ model, to }) {
  const src = getChevImg(model.image)

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
          <div className="flex aspect-[16/10] w-full items-center justify-center bg-neutral-200 px-2 text-center text-xs text-neutral-500">
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

/* ---------- ONE DEALER IN THE SIDEBAR ---------- */
function DealerBlock({ dealer, first }) {
  const fbLogo = getChevImg(dealer.facebook.logo)

  return (
    <div className={first ? '' : 'mt-10 border-t border-neutral-200 pt-10'}>
      <Reveal direction="right">
        <h2 className="text-2xl leading-9 font-normal text-[#222] md:text-3xl">{dealer.name}</h2>
        <div className="mt-4 mb-6 h-1 w-16 rounded bg-lag-red" />
      </Reveal>

      <Reveal direction="right" delay={100}>
        <div className="space-y-5 text-[15px] leading-7 text-[#666]">
          <p>
            {dealer.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          {dealer.phones.map((group) => (
            <p key={group.label}>
              {group.label}
              {group.numbers.map((n) => (
                <a
                  key={n}
                  href={telHref(n)}
                  className="block transition-colors hover:text-lag-red"
                >
                  {n}
                </a>
              ))}
            </p>
          ))}
        </div>
      </Reveal>

      {/* facebook card */}
      <Reveal direction="up" delay={150}>
        <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 p-3">
            {fbLogo && (
              <img src={fbLogo} alt="" className="h-12 w-12 shrink-0 rounded object-cover" />
            )}
            <div className="min-w-0">
              <p className="truncate text-base leading-5 font-medium text-[#365899]">
                {dealer.facebook.name}
              </p>
              <p className="text-xs text-[#555]">{dealer.facebook.followers} followers</p>
            </div>
          </div>
          <div className="border-t border-neutral-200 bg-[#f2f3f5] px-3 py-3">
            <a
              href={dealer.facebook.href}
              target="_blank"
              rel="noreferrer"
              className="group/fb inline-flex items-center gap-2 rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#333] transition duration-300 hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#1877f2] transition-colors duration-300 group-hover/fb:bg-white">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  className="fill-white transition-colors duration-300 group-hover/fb:fill-[#1877f2]"
                >
                  <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.7c0-.9.3-1.5 1.6-1.5h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.5V21h3z" />
                </svg>
              </span>
              Follow Page
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

/* ---------- THE PAGE ---------- */
export default function Chevrolet() {
  const [active, setActive] = useState(ALL)
  const logo = getBanner(brand.logo) || getBrandLogo('chevrolet.png')

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
            {/* brand logo */}
            <Reveal direction="zoom">
              <div className="flex h-44 items-center justify-center border-2 border-neutral-300 bg-[#fcfcfc] md:h-56">
                {logo ? (
                  <img
                    src={logo}
                    alt={brand.name}
                    className="w-15 max-w-full object-contain md:w-30"
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
                  href={brand.inquireHref}
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
                    <p className="py-16 text-center text-[#888]">No models in this category yet.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10 xl:grid-cols-3">
                      {shown.map((m, i) => (
                        <Reveal key={m.name} direction="zoom" delay={(i % 3) * 100}>
                          <ModelCard
                            model={m}
                            to={m.slug ? `/brands/chevrolet/${m.slug}` : null}
                          />
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
                  Visit Us:{' '}
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

          {/* ================= SIDEBAR: 4 DEALERS ================= */}
        <aside className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-8">
        <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-x-hidden lg:overflow-y-auto lg:py-1 lg:pr-3 [scrollbar-color:#b5b5b5_#e5e5e5] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-neutral-200">
            {brand.dealers.map((d, i) => (
            <DealerBlock key={d.name} dealer={d} first={i === 0} />
            ))}
        </div>
        </aside>
        </div>
      </section>
    </main>
  )
}