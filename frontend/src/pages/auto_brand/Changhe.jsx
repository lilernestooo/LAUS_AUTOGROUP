import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'

/* Finds images by file name only (assets/changhe, banners or brand), capital letters don't matter */
const images = import.meta.glob(
  [
    '../../assets/changhe/*.{jpg,jpeg,png,webp}',
    '../../assets/banners/*.{jpg,jpeg,png,webp}',
    '../../assets/brand/*.{jpg,jpeg,png,webp}',
  ],
  { eager: true, import: 'default' }
)
const byFile = Object.fromEntries(
  Object.entries(images).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getImg = (name) => name && byFile[name.toLowerCase()]

/* ---------- DATA ---------- */
const changhe = {
  name: 'Changhe',
  logo: 'changhe.png', // wide logo in the banner box
  inquireHref: '#', // replace with a mailto: or a link
  privacyHref: '#', // replace with the real Data Privacy Notice link
  categories: ['SUV', 'Cabin'],
  models: [
    { name: 'M60', category: 'SUV', slug: 'm60', image: 'Changhe_M60_Thumbnail.jpg' },
    { name: 'M50', category: 'SUV', slug: 'm50', image: 'Changhe_M50_Thumbnail.jpg' },
    { name: 'Work Buddy K22', category: 'Cabin', slug: 'work-buddy-k22', image: 'Changhe_Work-Buddy-K22_Thumbnail-300x169.jpg' },
    { name: 'Freedom', category: 'Cabin', slug: 'freedom', image: 'Changhe_Freedom_Thumbnail.jpg' },
  ],
  dealers: [
    {
      name: 'Changhe Automobile La Union',
      address: ['National Highway, Tabtabungao Rosario,', 'La Union'],
      phoneGroups: [
        { label: 'Sales:', numbers: ['0918-854-2640', '(072) 619-4493'] },
        { label: 'Service:', numbers: ['0919-065-4359', '0917-500-6461'] },
      ],
      facebook: {
        name: 'Changhe Automobile La Union',
        followers: '1,086',
        logo: 'fb-changhe.jpg', // small square logo
        href: 'https://www.facebook.com/ChangheAutomobileLaUnion/?ref=embed_page#',
      },
    },
    {
      name: 'Changhe Automobile Pampanga',
      address: ['Jose Abad Santos Avenue Macabacle,', 'Bacolor, Pampanga'],
      phoneGroups: [{ label: 'Sales:', numbers: ['(045) 981 4411', '0918-854-2256'] }],
    },
  ],
}

const ALL = 'All Models'

function ModelCard({ model }) {
  const src = getImg(model.image)

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
  return model.slug ? (
    <Link
      to={`/brands/changhe/${model.slug}`}
      className="block outline-none focus-visible:ring-2 focus-visible:ring-lag-red"
    >
      {card}
    </Link>
  ) : (
    card
  )
}

function FacebookCard({ fb }) {
  const logo = getImg(fb.logo)

  return (
    <div className="mt-8 overflow-hidden rounded-lg bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3 p-3">
        {logo && <img src={logo} alt="" className="h-12 w-12 shrink-0 rounded object-cover" />}
        <div className="min-w-0">
          <p className="truncate text-base leading-5 font-medium text-[#365899]">{fb.name}</p>
          <p className="text-xs text-[#555]">{fb.followers} followers</p>
        </div>
      </div>
      <div className="border-t border-neutral-200 bg-[#f2f3f5] px-3 py-3">
        <a
          href={fb.href}
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
  )
}

export default function Changhe() {
  const [active, setActive] = useState(ALL)
  const logo = getImg(changhe.logo)

  const shown =
    active === ALL ? changhe.models : changhe.models.filter((m) => m.category === active)
  const countOf = (c) =>
    c === ALL ? changhe.models.length : changhe.models.filter((m) => m.category === c).length

  return (
    <main className="overflow-x-clip">
      <section className="relative bg-[#fcfcfc] py-10 md:py-16">
        {/* soft decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-lag-dark/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-0">
          {/* ================= MAIN COLUMN ================= */}
          <div className="min-w-0 lg:col-span-9 lg:pr-10">
            {/* logo banner */}
            <Reveal direction="zoom">
              <div className="flex h-44 items-center justify-center border-2 border-neutral-300 bg-[#fcfcfc] md:h-56">
                {logo ? (
                  <img
                    src={logo}
                    alt={changhe.name}
                    className="h-24 max-w-full object-contain md:h-32"
                  />
                ) : (
                  <span className="text-4xl font-bold text-lag-dark">{changhe.name}</span>
                )}
              </div>
            </Reveal>

            {/* inquire now */}
            <Reveal direction="left" delay={100}>
              <div className="mt-6 flex justify-end">
                <a
                  href={changhe.inquireHref}
                  className="group relative inline-flex items-center gap-2 overflow-hidden border border-lag-red bg-white px-8 py-3 text-base font-bold tracking-wide text-lag-red uppercase transition-colors duration-500 hover:text-white"
                >
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
                <div>
                  <div className="flex items-center gap-3 px-5 py-4 text-sm text-[#555]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    All Models
                  </div>
                  <ul className="flex overflow-x-auto md:block md:overflow-visible">
                    {[ALL, ...changhe.categories].map((c) => (
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
                          <ModelCard model={m} />
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
                  Actual unit may vary from photo. Specifications &amp; colors are subject to
                  change without prior notice.
                </p>
                <p>
                  <a
                    href={changhe.privacyHref}
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
            <div className="space-y-10 lg:sticky lg:top-28">
              {changhe.dealers.map((d, i) => (
                <div key={d.name} className={i > 0 ? 'border-t border-neutral-200 pt-10' : ''}>
                  <Reveal direction="right" delay={i * 100}>
                    <h1 className="text-2xl leading-9 font-normal text-[#222] md:text-3xl">
                      {d.name}
                    </h1>
                    <div className="mt-4 mb-6 h-1 w-16 rounded bg-lag-red" />
                  </Reveal>

                  <Reveal direction="right" delay={100 + i * 100}>
                    <div className="space-y-5 text-[15px] leading-7 text-[#666]">
                      <p>
                        {d.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                      {d.phoneGroups.map((g) => (
                        <p key={g.label}>
                          {g.label}
                          {g.numbers.map((n) => (
                            <a
                              key={n}
                              href={`tel:${n.replace(/[^\d+]/g, '')}`}
                              className="block transition-colors hover:text-lag-red"
                            >
                              {n}
                            </a>
                          ))}
                        </p>
                      ))}
                    </div>
                  </Reveal>

                  {d.facebook && (
                    <Reveal direction="up" delay={150}>
                      <FacebookCard fb={d.facebook} />
                    </Reveal>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}