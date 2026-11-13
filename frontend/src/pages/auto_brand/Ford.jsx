import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import FacebookPage from '../../components/FacebookPage'

/* Ford photos: put them in src/assets/ford/ (found by file name only, capital letters don't matter) */
const fordImages = import.meta.glob('../../assets/ford/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const fordByFile = Object.fromEntries(
  Object.entries(fordImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getFordImg = (name) => (name ? fordByFile[name.toLowerCase()] : undefined)

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
const brandByFile = Object.fromEntries(
  Object.entries(brandImages).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getBrandLogo = (name) => brandByFile[name.toLowerCase()]

/* ---------- DATA ---------- */
const brand = {
  name: 'Ford',
  logo: 'ford.png',
  website: { label: 'www.lausfordgroup.com.ph', href: 'https://www.lausfordgroup.com.ph/' },
  inquireHref: '#',
  privacyHref: '#',
  categories: ['Sports Coupe', 'Pick-up', 'Compact SUV', 'Midsize SUV', 'Full size SUV'],
  // add slug: 'ranger' to a model once its detail page and data file exist
  models: [
    { name: 'Ford Shelby Mustang', slug: 'shelby-mustang', category: 'Sports Coupe', image: 'Ford_Shelby_Thumbnail.jpg' },
    { name: 'Ford Mustang', slug: 'mustang', category: 'Sports Coupe', image: 'Ford_Mustang_Thumbnail.jpg' },
    { name: 'Ford Territory', slug: 'territory', category: 'Compact SUV', image: 'Ford_Territory_Thumbnail.jpg' },
    { name: 'Ford Ranger', slug: 'ranger', category: 'Pick-up', image: 'Ford_NextGen-Ranger_Thumbnail.jpg' },
    { name: 'Ford Expedition', slug: 'expedition', category: 'Full size SUV', image: 'Ford_Expedition_Thumbnail.jpg' },
    { name: 'Ford NextGen Everest', slug: 'nextgen-everest', category: 'Midsize SUV', image: 'Ford_NextGen-Everest_Thumbnail.jpg' },
    { name: 'Ford Transit', slug: 'transit', category: 'Full size SUV', image: 'Ford_Transit_Thumbnail.jpg' },
    { name: 'Ford Explorer', slug: 'explorer', category: 'Midsize SUV', image: 'Ford_Explorer_Thumbnail.jpg' },
  ],
  /* facebook: live Facebook page URL and exact rendered height (130px for classic header, 330px for full card) */
  dealers: [
    {
      name: 'Ford Cabanatuan',
      address: ['Maharlika Highway, Sumacab Este,', 'Cabanatuan City, 3100, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2222'] },
        { label: 'Trunk Line:', numbers: ['+63 44 464 0111'] },
        { label: 'Service:', numbers: ['+63 918 854 2986'] },
      ],
      facebook: 'https://www.facebook.com/fordcabanatuanofficial/',
      fbHeight: 190,
    },
    {
      name: 'Ford Clark',
      address: ['LGC Automotive Services Bldg., M.A.', 'Roxas Highway, Clark Freeport Zone 2009'],
      phones: [{ label: 'Sales:', numbers: ['+63 998 590 0383'] }],
      facebook: 'https://www.facebook.com/FordClarkOfficial/',
      fbHeight: 330,
    },
    {
      name: 'Ford Dagupan',
      address: ['Lucao District, Dagupan City, 2400,', 'Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2948'] },
        { label: 'Trunk Line:', numbers: ['+63 75 522 2222'] },
        { label: 'Service:', numbers: ['+63 918 854 2145', '+63 918 854 2165'] },
      ],
      facebook: 'https://www.facebook.com/FordDagupanPage/',
      fbHeight: 330,
    },
    {
      name: 'Ford Ilocos Norte',
      address: ['San Marcos, San Nicolas, Ilocos Norte,', '2901, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2300'] },
        { label: 'Trunk Line:', numbers: ['+63 77 617 1063'] },
        { label: 'Service:', numbers: ['+63 918 854 2275'] },
      ],
      facebook: 'https://www.facebook.com/fordilocosnorte/',
      fbHeight: 330,
    },
    {
      name: 'Ford Isabela',
      address: ['National Highway, Batal, Santiago City,', 'Isabela 3311, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 928 550 0803', '+63 918 854 2374'] },
        { label: 'Service:', numbers: ['+63 918 854 2398'] },
      ],
      facebook: 'https://www.facebook.com/FordIsabelaPage/',
      fbHeight: 190,
    },
    {
      name: 'Ford Libis',
      address: ['186 E. Rodriguez Jr. Ave., Bagumbayan,', 'Quezon City, 1110, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 998 954 2814'] },
        { label: 'Tel Number:', numbers: ['02 – 86372044'] },
        { label: 'Service:', numbers: ['+63 998 587 8331'] },
        { label: 'Parts:', numbers: ['+63 918 8542 239'] },
      ],
      facebook: 'https://www.facebook.com/OfficialFordLibisPage/',
      fbHeight: 190,
    },
    {
      name: 'Ford Metro Baguio',
      address: ['Marcos Highway, Tuba, Benguet', 'Philippines 2603'],
      phones: [
        { label: 'Trunk Line:', numbers: ['+63 74 423 1641 to 42'] },
        { label: 'Tel Number:', numbers: ['02 – 86372044'] },
        { label: 'Sales:', numbers: ['+63 918 854 2453'] },
        { label: 'Service:', numbers: ['+63 918 854 2213'] },
      ],
      facebook: 'https://www.facebook.com/fordmetrobaguio/',
      fbHeight: 190,
    },
    {
      name: 'Ford Pampanga',
      address: ['Jose Abad Santos Avenue, City of San', 'Fernando, Pampanga, 2000, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 998 954 2814', '+63 918 854 2251', '+63 917 569 9876'] },
        { label: 'Trunk Line:', numbers: ['+63 45 961 5888', '+63 45 961 2888'] },
        { label: 'Service:', numbers: ['0918 854 2947', '0918 854 2402', '0918 854 2767'] },
      ],
      facebook: 'https://www.facebook.com/fordpampangalausgroup/',
      fbHeight: 190,
    },
    {
      name: 'Ford Subic',
      address: ['Lot C-2, Subic Bay Gateway Park, Phase', '1, Commercial Area, Subic Bay Freeport', 'Zone, 2209, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2421', '+63 917 818 5100'] },
        { label: 'Trunk Line:', numbers: ['+63 47 250 3673'] },
        { label: 'Service:', numbers: ['+63 918 854 2271', '+63 998 587 8211'] },
      ],
      facebook: 'https://www.facebook.com/FordSubicPage/',
      fbHeight: 190,
    },
    {
      name: 'Ford Tarlac',
      address: ['McArthur Highway, San Nicolas, Tarlac', 'City, Tarlac, 2300, Philippines'],
      phones: [
        { label: 'Sales:', numbers: ['+63 918 854 2322'] },
        { label: 'Fax:', numbers: ['+63 45 491 3904'] },
        { label: 'Service:', numbers: ['+63 918 854 2452', '+63 918 854 2362'] },
      ],
      facebook: 'https://www.facebook.com/FordTarlacPage/',
      fbHeight: 330,
    },
  ],
}

const ALL = 'All Models'
const telHref = (n) => `tel:${n.replace(/[^+\d]/g, '')}`

/* ---------- MODEL CARD ---------- */
function ModelCard({ model, to }) {
  const src = getFordImg(model.image)

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
  return (
    <div className={first ? '' : 'mt-8 border-t border-neutral-200 pt-8'}>
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

      {/* real live facebook page embed */}
      <Reveal direction="up" delay={150}>
        <div className="mt-5 overflow-hidden rounded-xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] hover:ring-lag-red/40">
          <FacebookPage
            href={dealer.facebook}
            title={`${dealer.name} Facebook Page`}
            height={dealer.fbHeight || 190}
            hideCover={dealer.hideCover}
          />
        </div>
      </Reveal>
    </div>
  )
}

/* ---------- THE PAGE ---------- */
export default function Ford() {
  const [active, setActive] = useState(ALL)
  const logo = getBanner(brand.logo) || getBrandLogo(brand.logo)

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
                    className="w-32 max-w-full object-contain md:w-44"
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
                          className={`flex w-full cursor-pointer items-center justify-between gap-3 border-b border-l-4 border-b-white/20 px-5 py-4 text-left text-sm whitespace-nowrap transition-all duration-300 md:whitespace-normal ${active === c
                            ? 'border-l-lag-red bg-lag-red text-white'
                            : 'border-l-transparent bg-[#2b2b2b] text-white hover:border-l-lag-red hover:bg-neutral-700 hover:pl-7'
                            }`}
                        >
                          <span>{c}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] ${active === c ? 'bg-white/25' : 'bg-white/10 text-neutral-300'
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
                            to={m.slug ? `/brands/ford/${m.slug}` : null}
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

          {/* ================= SIDEBAR: 10 DEALERS (scrolls inside itself) ================= */}
          <aside className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-4">
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-x-hidden lg:overflow-y-auto lg:p-2 [scrollbar-color:#b5b5b5_#e5e5e5] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-neutral-400 [&::-webkit-scrollbar-thumb:hover]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-neutral-200">
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