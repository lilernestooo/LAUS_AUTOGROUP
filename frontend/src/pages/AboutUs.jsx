import Reveal from '../components/Reveal'
import brandsImg from '../assets/about/LAG-LOGO.png'
import dealerMap from '../assets/about/Dealership-Map-5-19-2026.jpg'

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-10 text-center">
      <Reveal direction="up">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-lag-red">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-3xl font-bold text-lag-dark md:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-lag-red" />
      </Reveal>
    </div>
  )
}

export default function AboutUs() {
  return (
    <main className="overflow-x-clip">
      {/* ---------- Intro ---------- */}
      <section className="relative bg-[#fcfcfc] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Title + date */}
          <Reveal direction="down">
            <h1 className="text-3xl font-normal text-[#222] md:text-4xl">
              LausAutoGroup
            </h1>
            <p className="mt-4 text-sm text-[#666]">August 2022</p>
            <div className="mt-5 mb-10 h-1 w-16 rounded bg-lag-red" />
          </Reveal>

          {/* Text */}
          <Reveal direction="right" delay={150}>
            <div className="border-l-4 border-lag-red pl-6 text-[15px] leading-8 text-[#666] md:text-base md:leading-8">
              <p>
                <strong className="text-lag-dark">The LausAutoGroup</strong> is
                the largest and fastest growing multi-brand automotive network
                in the country today. We are a highly respected name in
                providing customer care and satisfaction. We have established
                this strong reputation in the last 45 years by doing business
                that gives first-class sales and after-sales service to
                customers. Our dealerships offer the widest selection of
                vehicles that suit your needs; be it for personal, family or
                business use. Choose what suits you, because at LausAutoGroup,
              </p>
              <p className="my-4 text-xl font-bold text-lag-title md:text-2xl">
                We have the right car for you!
              </p>
              <p>
                Over nearly four decades, the LausAutoGroup has steadily grown
                into more than 60 branches spanning three regions — Metro
                Manila, Central and Northern Luzon — making it the nation’s
                leading automotive powerhouse thus far. The LausAutoGroup
                currently has 20 of the world’s best automobile brands, namely
                Mitsubishi, Ford, FUSO, Hyundai, Chevrolet, BMW, Volkswagen,
                Kia, Suzuki, Mazda, Peugeot, Jeep, Foton, MINI, Geely, MG,
                Haima and Changhe. It also caters to motorcycle enthusiasts
                with the best motorbike brands in the world such as BMW
                Motorrad, Harley-Davidson, Vespa, Piaggio APE, Moto Guzzi,
                Aprilia and Triumph. The LausAutoGroup is also a highly
                respected name in the local market for quality second hand
                cars, a reputation developed for 38 years now through Carmix —
                featuring all car brands with affordable prices including
                trade in options.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Brands ---------- */}
      <section className="relative bg-white py-12 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lag-gray to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle eyebrow="What we offer" title="Our Brands" />
            <Reveal direction="up" delay={100}>
            <div className="rounded-2xl bg-white p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] ring-1 ring-black/5 transition duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] md:p-4">
                <div className="aspect-[2/1] w-full overflow-hidden md:aspect-[7/2]">
                <img
                    src={brandsImg}
                    alt="LausAutoGroup car and motorcycle brands"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                />
                </div>
            </div>
            </Reveal>
        </div>
      </section>

      {/* ---------- Dealer network (big image, lots of room) ---------- */}
      <section className="relative bg-[#fcfcfc] pt-16 pb-32 md:pt-24 md:pb-48">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lag-gray to-transparent" />
        <div className="mx-auto max-w-5xl px-6">
          <SectionTitle eyebrow="Where to find us" title="Dealer Network" />
          <Reveal direction="up" delay={100}>
            <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] md:p-5">
                <img
                src={dealerMap}
                alt="LausGroup Dealer Network map"
                className="h-auto w-full rounded-lg"
                loading="lazy"
                />
            </div>
            </Reveal>
        </div>
      </section>
    </main>
  )
}