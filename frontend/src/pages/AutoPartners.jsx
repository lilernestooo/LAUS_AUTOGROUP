import { useState } from 'react'
import Reveal from '../components/Reveal'

/* Loads every image under assets/autopartners. A missing file never breaks the build. */
const images = import.meta.glob('../assets/autopartners/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const getImg = (name) => images[`../assets/autopartners/${name}`]

/* ---------- DATA ----------
   href is optional. Without it the logo is a plain, non-clickable image. */
const partners = [
  { name: 'Corporate Guarantee', image: 'cg-front.jpg', href: 'https://corporateguarantee.com.ph/' },
  { name: 'Laus Auto Finance', image: 'LAUS-AUTO-FINANCE.png', href: 'https://lausgroup.com.ph/laus-auto-finance/' },
  {
    name: 'Tire City Goodyear Autocare',
    image: 'tire-city-Goodyear.png',
    href: 'https://www.lausgroup.com.ph/tirecity',
  },
  { name: 'Carworld Caltex, Inc.', image: 'caltex.png', href: 'https://lausgroup.com.ph/caltex' },
  { name: 'Yokohama', image: 'Yokohama-vector-logo.png', href: 'https://lausgroup.com.ph/tirecity' },
  { name: 'Voltronic Motor Oil & Lubricants', image: 'voltonic.jpg', href: 'https://lausgroup.com.ph/voltronic/' },
  { name: 'Hüper Optik', image: 'HUPER-OPTIK-SLIDER.jpg', href: 'https://lausgroup.com.ph/huper-optik/' },
  { name: 'Laus Auto Services', image: 'las-websticky-logo.jpg', href: 'https://www.lausautoservices.com.ph/' },
]

/* ---------- ONE PARTNER LOGO ---------- */
function PartnerCard({ partner }) {
  const src = getImg(partner.image)

  const inner = (
    <div className="group relative flex h-24 items-center justify-center px-2 transition duration-500 hover:-translate-y-1.5 md:h-28">
      {src ? (
        <img
          src={src}
          alt={partner.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110"
        />
      ) : (
        <span className="text-center text-sm text-neutral-400">{partner.image}</span>
      )}

      {/* small red line that grows under the logo on hover */}
      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-lag-red transition-all duration-500 group-hover:w-2/3" />
    </div>
  )

  return partner.href ? (
    <a
      href={partner.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit ${partner.name}`}
      title={partner.name}
      className="block cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-lag-red"
    >
      {inner}
    </a>
  ) : (
    inner
  )
}

export default function AutoPartners() {
  const [cardHover, setCardHover] = useState(false)

  return (
    <main className="overflow-x-clip">
      {/* ---------- Title + partner logos ---------- */}
      <section className="relative bg-[#fcfcfc] py-12 md:py-20">
        {/* soft decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-lag-dark/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal direction="down">
            <h1 className="text-3xl font-normal text-[#222] md:text-4xl">Auto Partners</h1>
            {/* red bar: stretches while the card below is hovered */}
            <div
              className={`mt-5 mb-12 h-1 rounded bg-lag-red transition-all duration-700 ease-out md:mb-16 ${
                cardHover ? 'w-48 shadow-[0_0_14px_rgba(224,0,0,0.6)]' : 'w-16'
              }`}
            />
          </Reveal>

          <Reveal direction="up">
            <div
              onMouseEnter={() => setCardHover(true)}
              onMouseLeave={() => setCardHover(false)}
              className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5 transition duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] md:p-12"
            >
              <div className="grid grid-cols-2 items-center gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14 lg:grid-cols-4">
                {partners.map((p, i) => (
                  <Reveal key={p.name} direction="zoom" delay={(i % 4) * 100}>
                    <PartnerCard partner={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- The LausGroup of Companies ---------- */}
      <section className="relative bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lag-gray to-transparent" />

        <div className="mx-auto max-w-6xl px-6">
          <Reveal direction="right">
            <h2 className="text-3xl font-normal text-lag-title md:text-4xl">
              The LausGroup of Companies
            </h2>
            <div className="mt-4 mb-8 h-1 w-16 rounded bg-lag-red" />
          </Reveal>

          <Reveal direction="right" delay={100}>
            <p className="border-l-4 border-lag-red pl-6 text-[15px] leading-8 text-[#666] md:text-base">
              a diversified conglomerate with automotive dealership as its core business, was
              founded in 1978 by its Chairman and CEO, Liberato “Levy” P. Laus, a multi-awarded
              Filipino entrepreneur from the City of San Fernando, Pampanga. Carworld,
              Incorporated, its flagship company, began as a small allied sub-dealer in then
              countryside environment.
            </p>
          </Reveal>

          {/* quote */}
          <Reveal direction="zoom">
            <div className="my-12 flex items-center justify-center gap-4 md:my-16">
              <span className="hidden h-px w-16 bg-lag-red/40 sm:block" />
              <h3 className="text-center text-xl font-bold text-lag-dark md:text-2xl">
                “A Passion for Cars and Customer Care”
              </h3>
              <span className="hidden h-px w-16 bg-lag-red/40 sm:block" />
            </div>
          </Reveal>

          <div className="space-y-5 text-[15px] leading-8 text-[#666] md:text-base">
            <Reveal direction="up">
              <p>
                Is the group’s guiding philosophy that continues to transform the way every
                dealership conduct business. The dealerships have garnered the special
                distinction both in the sales and aftersales categories as a testament to their
                commitment and dedication to excellence, innovation and customer satisfaction.
              </p>
            </Reveal>
            <Reveal direction="up">
              <p>
                Through the years, capitalizing on its core values and pursuit of excellence,
                the LausGroup successfully expanded with other ancillary business units
                complementing the dynamic growth of its auto dealership. These include CGIC, a
                non-life insurance company with ISO 9001: 2008 certification, auto financing,
                Huper-Optik nano-ceramic films, Voltronic motor oil, Carworld Caltex, Goodyear
                Tire City and Yokohama Pampanga.
              </p>
            </Reveal>
            <Reveal direction="up">
              <p>
                The LausGroup has invested in local media through RWFM radio station, CLTV
                station and Sunstar Pampanga, in line with his vision of boosting growth and
                development in the countryside. Other businesses include Max’s restaurants,
                Familyville real estate and the newest addition the corporate family, the Laus
                Group Event Centre. The highly dynamic and competitive business organization, is
                composed of approximately 1,600 employees in more than 60 business units.
              </p>
            </Reveal>
            <Reveal direction="up">
              <p>
                The LausGroup soars even higher today as it continues to venture into new
                horizons, equipped with precise vision and unwavering commitment.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}