import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'

/* Finds images by file name only (assets/banners or assets/brand), capital letters don't matter */
const images = import.meta.glob(
  [
    '../../assets/carmix/*.{jpg,jpeg,png,webp}',
    '../../assets/banners/*.{jpg,jpeg,png,webp}',
    '../../assets/brand/*.{jpg,jpeg,png,webp}',
  ],
  { eager: true, import: 'default' }
)
const byFile = Object.fromEntries(
  Object.entries(images).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
)
const getImg = (name) => byFile[name.toLowerCase()]

/* ---------- DATA ---------- */
const carmix = {
  title: 'Visit Carmix',
  dealer: 'CarmixPampanga',
  address: 'Jose, Abad Santos Avenue, City of San Fernando, Pampanga, 2000, Philippines',
  phoneGroups: [
    { label: 'Trunk Line:', numbers: ['+63 45 861 4775', '+63 45 961 7746'] },
    { label: 'Ext Lines-Fax:', numbers: ['+63 45 963 9622', '+63 45 961 3937'] },
  ],
  inquireHref: '#', // replace with a mailto: or a link
  privacyHref: '#', // replace with the real Data Privacy Notice link
  facebook: {
    name: 'Carmix Pampanga',
    followers: '13,611',
    logo: 'fb-carmix.jpg', 
    href: 'https://www.facebook.com/carmixpampangaofficial/?ref=embed_page#',
  },
  banner: {
    image: 'carmix-pampanga-lag.jpg', // big photo (the text is already printed on it)
    title: 'Carmix Pampanga',
  },
}

export default function Carmix() {
  const banner = getImg(carmix.banner.image)
  const fbLogo = getImg(carmix.facebook.logo)

  return (
    <main className="overflow-x-clip">
      <section className="relative bg-[#fcfcfc] py-10 md:py-16">
        {/* soft decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-lag-dark/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-0">
          {/* ================= MAIN COLUMN ================= */}
          <div className="min-w-0 lg:col-span-9 lg:pr-10">
            {/* title + inquire now */}
            <Reveal direction="down">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-3xl font-normal text-[#222] md:text-4xl">{carmix.title}</h2>
                <a
                  href={carmix.inquireHref}
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
              <div className="mt-4 h-1 w-16 rounded bg-lag-red" />
            </Reveal>

            {/* banner photo with the text on top */}
            <Reveal direction="up" delay={100}>
              <div className="group relative mt-10 overflow-hidden bg-neutral-200 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
                {banner ? (
                  <img
                    src={banner}
                    alt={carmix.banner.title}
                    className="w-full transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[851/373] w-full items-center justify-center px-4 text-center text-sm text-neutral-500">
                    Add the photo: src/assets/carmix/{carmix.banner.image}
                  </div>
                )}
              </div>
            </Reveal>

            {/* footer note */}
            <Reveal direction="up">
              <p className="mt-10 text-[15px]">
                <a
                  href={carmix.privacyHref}
                  className="text-lag-red underline-offset-4 hover:underline"
                >
                  Data Privacy Notice
                </a>
              </p>
            </Reveal>
          </div>

          {/* ================= SIDEBAR ================= */}
          <aside className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-8">
            <div className="lg:sticky lg:top-28">
              <Reveal direction="right">
                <h1 className="text-2xl leading-9 font-normal text-[#222] md:text-3xl">
                  {carmix.dealer}
                </h1>
                <div className="mt-4 mb-6 h-1 w-16 rounded bg-lag-red" />
              </Reveal>

              <Reveal direction="right" delay={100}>
                <div className="space-y-5 text-[15px] leading-7 text-[#666]">
                  <p>{carmix.address}</p>
                  {carmix.phoneGroups.map((g) => (
                    <p key={g.label}>
                      {g.label}
                      {g.numbers.map((n) => (
                        <a
                          key={n}
                          href={`tel:${n.replace(/\s/g, '')}`}
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
                      <img
                        src={fbLogo}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-base leading-5 font-medium text-[#365899]">
                        {carmix.facebook.name}
                      </p>
                      <p className="text-xs text-[#555]">{carmix.facebook.followers} followers</p>
                    </div>
                  </div>
                  <div className="border-t border-neutral-200 bg-[#f2f3f5] px-3 py-3">
                    <a
                      href={carmix.facebook.href}
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
          </aside>
        </div>
      </section>
    </main>
  )
}