import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'

/* Loads every image under assets/awards. A missing file never breaks the build. */
const images = import.meta.glob('../assets/awards/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const getImg = (name) => images[`../assets/awards/${name}`]

/* ---------- DATA ----------
   To add 2020 later, add a "2020: [ ... ]" block below with the same fields.
   The year tabs are created automatically from the keys. */
const awardsByYear = {
  2021: [
    {
      date: 'December 27, 2021',
      title: 'Panalo ang ASTiG: HARI recognizes the CV Dealer Champions',
      image: '2021/astig.jpg',
      caption: 'Hyundai Trucks & Buses ASTiG Dealer Awards',
    },
    {
      date: 'December 20, 2021',
      title:
        'HARI Media Dashboard: The Year of the Resilient: Hyundai PH honors the New Normal Champions of the PC Dealership Network',
      image: '2021/resiliency.png',
      caption: 'Hyundai Dealer Resiliency Awards For Passenger Cars',
    },
    {
      date: 'May 2021',
      title:
        'Ford Philippines Dealer Principal Lisset Laus-Velasco is 2021 Ford Salute to Dealers Honoree',
      image: '2021/ford-salute.jpg',
      caption:
        'Laus Group of Companies Chairman and CEO and Ford Philippines dealer principal Lisset Laus-Velasco has been named as 2021 Ford Salute to Dealers Honoree.',
    },
  ],
    2020: [
    {
      date: 'January 30, 2020',
      title: 'Tire City Dau: 30th Anniversary Celebration',
      image: '2020/tire-city-dau.jpg',
      caption: '30th Anniversary Celebration',
    },
  ],
 2019: [
    {
      date: 'October 24, 2019',
      title: 'Hyundai La Union DTI 2019 Consumer Choice Award',
      image: '2019/HLU-2019-DTI-AWARD.jpg',
      caption:
        'Hyundai La Union garnered the the DTI 2019 Consumer Choice Award for Provincial in Silver Category last October 24, 2019.',
    },
    {
      date: 'October 11, 2019',
      title: 'Ford Tarlac Gold Bagwis Plaque Award',
      image: '2019/FORD-TARLAC-GOLD-BAGWIS-AWARD-1024x768-1.jpg',
      caption:
        'The Gold Bagwis Plaque is given this day of October 11, 2019 at City Mall, Tarlac City headed by Ms. Flor Balilo of DTI Tarlac.\nThe DTI-Bagwis Program gives due recognition to establishments that uphold the rights of consumers while practicing responsible business where consumers get the best value for money.',
    },
  ],
 2017: [
    {
      caption:
        'Overall Champion on Service Skills Competition\nParts Manager, Champion, Ford Dagupan\nService Advisor, Champion, Ford Cabanatuan\nTechnician, Champion, Ford Ilocos Norte\nPlatinum Certified, Sales Manager, Ford Cabanatuan\nGold Certified, Sales Manager, Ford Metro Baguio',
    },
    {
      caption:
        'Carworld Marilao garnered the distinction of being in the Mitsubishi Customer Service Excellence Elite Circle 2016. This is in recognition for the dedication and commitment towards customer service and most especially for attaining superior customer satisfaction amongst all dealer network nationwide.',
    },
  ],
  2016: [
    {
      date: 'November 29, 2016',
      title: 'HAIMA V70 NAMED BEST MPV OF THE YEAR',
      image: '2016/haima-award.jpg',
      caption:
        'Fresh from its Philippine debut at the LausGroup Centre recently, the all new Haima V70 was named Best MPV of 2016 by the Car Awards Group, Inc. (CAGI), the country’s automotive award giving body.',
    },
    {
      date: 'November 26, 2016',
      title: 'Laus Mazda Group bags Overall Championship for MazTech 2016',
      image: '2016/Congratulatory-Post-1024x768-1.jpg',
      caption:
        'For 2016, Laus Mazda Group was awarded overall champion after besting out technicians from 12 Mazda dealers nationwide. After hours of tests and technical evaluation involving practical problem solving and troubleshooting participated by Mazda Cabanatuan and Mazda Dagupan’s',
    },
  ],
  2015: [
    {
      date: 'May 2015',
      title: 'MITSUBISHI CARWORLD AWARDS 2015',
      image: '2015/Pl345m_1455587684.jpg',
      caption:
        'MITSUBISHI CARWORLD AWARDS 2015 18th Mitsubishi Skills Olympics Cagayan De Oro May 15, 2015 First runner-up for Service Technician Category Second Runner-up for Service Adviser Category Fourth place for Fuso Truck Sales Category Sixth place for Sales Hotshot Category',
    },
    {
      date: 'May 15, 2015',
      title: '18th Mitsubishi Skills Olympics',
      image: '2015/IdzdFe_1400213431.jpg',
      caption:
        'Cagayan De Oro First runner-up for Service Technician Category, Second Runner-up for Service Adviser Category, Fourth place for Fuso Truck Sales Category Sixth place for Sales Hotshot Category',
    },
        {
      date: 'February 12, 2015',
      title: '17th Mitsubishi Skills Olympics',
      image: '2015/VeF3Uf_1424499613.jpg',
      caption:
        'MMPC Awards Night\nSMX Convention Center\nBonifacio Global City\nCarworld Malolos Dealer of the Year 2014\nCarworld Subic Best Dealer Outlet in Customer Satisfaction Evaluation (DOCE)',
    },
        {
      date: 'February 10, 2015',
      title: '2015 KIA Dealer Awards',
      image: '2015/I8Jeix_1423703779.jpg',
      caption:
        'Night Valkyrie at the Palace, Uptown Bonifacio, The Fort -Platinum Prestige Dealer Dashboard Award (SilverTurtleship) -Best in Service Operations and Best in Parts Operations Award -Best in Events Marketing Award -Best in Sales Executive Luzon Region –',
    },
     ],
      2014: [
    {
      date: '2014',
      title: "HARI's 2014 Dealer of the Year Awards (DOYA)",
      image: '2014/v8gZZq_1427856100.jpg',
      caption:
        'Award of Excellence in Aftersales Operations (Tier 3) – Hyundai Baliwag',
    },
    {
      date: 'November 8, 2014',
      title: "HARI's 2014 Dealer of the Year Awards (DOYA)",
      image: '2014/XezBXo_1427087903.jpg',
      caption:
        'Ford Laus Group 2014 Overall Service Skills Competition Champion Technical Team Champion Ford Libis DCRC Manager / Supervisor Runner Up Service Manager Champion Technician Runner Up Ford Pampanga Parts Supervisor Champion',
    },
    {
      date: 'February 12, 2015',
      title: '2014 Kia Global Awardee',
      caption:
        'Dealer of the Year 2014',
    },
    ],
     2013: [
    {
      date: '2013',
      title: 'The 2013 Grand Masters Award (Dealer conference) of Chevrolet Philippines',
      image: '2013/ffwTZJ_1328932927.jpg',
      caption:
        'SMX Convention Center SM Aura Premier 2nd Runner up, Parts Consultant of the Year 1st Runner up, Service Technician of the Year Recognition of Excellence, General Sales Manager of the Year Champion, Service Advisor of the Year',
    },
  ],
       2012: [
    {
      date: '2012',
      title: 'The 2013 Grand Masters Award (Dealer conference) of Chevrolet Philippines',
      caption:
        '9-time Overall Champion\n1st Runner Up Service Technician\n2nd Runner Up Sales Hotshots\n2nd Runner Up Sales Adviser\n1st Runner Up Parts Specialist',
    },
    {
      date: '2012',
      title: 'Hyundai Awards of Excellence',
      caption:
        'Champion for CRM Operations',
    },
  ],
    2011: [
    {
      date: '2011',
      title: 'Ford Dealer Conference',
      caption: `Top Ford Dealer Retail Sales – Main Provincial
        Top Sales Consultant – Provincial
        Best Service Advisor
        Best Sales Manager – Satellite Provincial
        Elite Sales Consultants
        Runner-up Parts Manager(Skills Olympics)
        Champion – Service Manager Category
        Champion – Individual Technician Category
        Champion – Team Technician Category
        First Runner-up – Service Advisor Category
        Service Team of the Year
        Service Manager of the Year
        Warranty Processor of the Year
        Elite Sales Consultant
        Best Sales Manager – Satellite Provincial`,
    },
    {
       date: '2011',
      title: 'Chevrolet Dealers’ Night',
      caption: `Best in Customer Satisfaction in Vehicle Sales
        Best in Customer Satisfaction in After-Sales
        Best in Dealer Facility`,
    },
        {
      date: '2011',
      title: 'Skills Olympics',
      caption: `Individual Technician Category, Winner
        Service Advisor Category, Winner
        Warranty Processor Category, Runner-Up
        DCRC Manager Category, Runner-Up
        Best in Customer Viewpoint-Service(Provincial)
        Best in Parts and Accessories Wholesale Performance(Satellite)
        Service Advisor of theYear(Satellite Dealer)
        Rookie of the Year-Branch Head
        Best in Customer Viewpoint-Sales(Provincial)
        Top Selling Dealer-Tier 5(Provincial)
        Special Recognition-Outstanding Retail Excellence Perfect 12`,
    },
        {
      date: '2011',
      title: 'Hyundai Dealer of the Year Awards',
      caption: `EQUUS Award for Excellence
        Genesis Award for Dealer Excellence
        Most Improved Dealer Award 1st Place
        Award of Excellence in Customer Relations Management Champion
        Award of Excellence in Service Operations 2nd Runner-up
        Award of Excellence in Parts Operations 2nd Runner-up`,
    },
  ],
  2010: [
    {
      date: '2010',
      title: '4th Hyundai National Skills Olympics',
      caption:
        'CHAMPION ( Automatic Transmission Category)\nCHAMPION (Electronics Category)',
    },
    {
      date: '2010',
      title: '14th Mitsubishi Skills Olympics',
      caption: `2010 National Overall Champion
        Best Service Technician – Mitsubishi Carworld Head Office
        Best Sales Executive ( Passanger Cars) – Mitsubishi Carworld Head Office
        Best Sales Executive (Truck Division) – Mitsubishi Carworld Head Office
        2nd Place Best Service Advisor – Mitsubishi Carworld Malolos
        2010 Mitsubishi Motors Philippines Corporation Dealer Conference
        3rd Place – Dealer of the Year Award
        Mitsubishi Carworld Head Office
        Best Parts and Service Awards in Luzon Area
        Mitsubishi Carworld Head Office
        Mitsubishi Carworld Tarlac`,
    },
  ],
}

const years = Object.keys(awardsByYear).sort((a, b) => b - a)

/* ---------- ONE AWARD CARD ---------- */
function AwardCard({ item, side }) {
  const src = getImg(item.image)
  const arrow = side === 'left' ? '-right-1.5' : '-left-1.5'

  return (
    <div className="group relative rounded-sm bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)]">
      {/* little arrow pointing at the line */}
      <span className={`absolute top-6 hidden h-3 w-3 rotate-45 bg-white md:block ${arrow}`} />

      {item.title && (
        <div className={item.image ? 'px-5 py-5' : 'px-5 pt-6 pb-1'}>
          <h3
            className={`text-left text-lg leading-8 text-[#222] md:text-xl ${
              item.image ? '' : 'font-bold'
            }`}
          >
            {item.title}
          </h3>
          {!item.image && (
            <div className="mt-2 h-1 w-10 rounded bg-lag-red transition-all duration-500 group-hover:w-20" />
          )}
        </div>
      )}

      {item.image && (
        <div className="overflow-hidden">
          {src ? (
            <img
              src={src}
              alt={item.caption}
              loading="lazy"
              className="h-auto w-full transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-neutral-200 text-sm text-neutral-500">
              {item.image}
            </div>
          )}
        </div>
      )}

      <p
        className={`border-b-2 border-lag-red/0 px-5 text-left leading-7 whitespace-pre-line text-[#666] transition-colors duration-500 group-hover:border-lag-red ${
          item.image ? 'py-3 text-[15px]' : 'pt-3 pb-6 text-base font-medium md:text-lg'
        }`}
      >
        {item.caption}
      </p>
    </div>
  )
}

/* ---------- TIMELINE ---------- */
function Timeline({ items }) {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)

  // the red part of the center line grows while you scroll
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight * 0.65 - r.top) / r.height
      setFill(Math.min(1, Math.max(0, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl">
      {/* base line + red progress line */}
      <div className="absolute top-0 bottom-6 left-4 w-1 -translate-x-1/2 rounded bg-[#d5e3ec] md:left-1/2" />
      <div
        className="absolute top-0 left-4 w-1 -translate-x-1/2 rounded bg-lag-title md:left-1/2"
        style={{ height: `${fill * 100}%` }}
      />

      {items.map((item, i) => {
        const side = i % 2 === 0 ? 'left' : 'right'
        const isLeft = side === 'left'

        return (
          <div
            key={i}
            className="relative pb-14 pl-12 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0"
          >
            {/* dot */}
            <Reveal
              direction="zoom"
              className="absolute top-[22px] left-4 z-10 -translate-x-1/2 md:left-1/2"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute inset-0 animate-ping rounded-full bg-lag-title/40" />
                <span className="relative block h-4 w-4 rounded-full bg-lag-title ring-4 ring-white" />
              </span>
            </Reveal>

            {/* date (only if the item has one) */}
            {item.date && (
              <Reveal
                direction="up"
                delay={100}
                className={`mb-3 pt-3 text-lg font-bold text-lag-title md:mb-0 md:row-start-1 ${
                  isLeft ? 'md:col-start-2 md:text-left' : 'md:col-start-1 md:text-right'
                }`}
              >
                {item.date}
              </Reveal>
            )}

            {/* card: left cards slide in from the left, right cards from the right */}
            <Reveal
              direction={isLeft ? 'right' : 'left'}
              delay={150}
              className={`md:row-start-1 ${isLeft ? 'md:col-start-1' : 'md:col-start-2'}`}
            >
              <AwardCard item={item} side={side} />
            </Reveal>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- PAGE ---------- */
export default function Awards() {
  const [year, setYear] = useState(years[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const listRef = useRef(null)
  const items = awardsByYear[year]

  // close on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // when opened, scroll the list so the selected year is visible
  useEffect(() => {
    if (!menuOpen) return
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [menuOpen])

  return (
    <main className="overflow-x-clip">
      <section className="relative bg-[#fcfcfc] pt-12 pb-32 md:pt-20 md:pb-48">
        {/* soft decoration */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lag-red/5 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-lag-dark/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6">
          {/* page title */}
          <Reveal direction="down">
            <div className="text-center">
              <span className="text-xs font-bold tracking-[0.3em] text-lag-red uppercase">
                About Us
              </span>
              <h1 className="mt-2 text-3xl font-normal text-[#222] md:text-5xl">
                Awards &amp; Recognitions
              </h1>
              <div className="mx-auto mt-4 h-1 w-16 rounded bg-lag-red" />
            </div>
          </Reveal>

          {/* everything below re-animates when the year changes */}
          <div key={year}>
            <Reveal direction="zoom" className="relative z-20">
              <div className="mt-14 mb-14 text-center md:mt-20 md:mb-20">
                {/* the year label is the dropdown */}
                <div ref={menuRef} className="relative inline-block">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={menuOpen}
                    aria-label="Select year"
                    className="group inline-flex cursor-pointer items-center gap-3 text-4xl font-light text-lag-title transition-all duration-300 hover:opacity-80 md:text-5xl"
                  >
                    {year}
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 group-hover:translate-y-0.5 ${
                        menuOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <ul
                    ref={listRef}
                    role="listbox"
                    aria-label="Select year"
                    className={`absolute top-full left-1/2 mt-3 max-h-64 w-44 origin-top -translate-x-1/2 overflow-y-auto rounded-xl border border-neutral-200 bg-white py-1 text-left shadow-xl shadow-black/15 transition-all duration-200 [scrollbar-color:#e00000_#f3f3f3] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-lag-red [&::-webkit-scrollbar-track]:bg-neutral-100 ${
                      menuOpen
                        ? 'visible scale-100 opacity-100'
                        : 'invisible scale-95 opacity-0'
                    }`}
                  >
                    {years.map((y) => (
                      <li
                        key={y}
                        role="option"
                        aria-selected={year === y}
                        onClick={() => {
                          setYear(y)
                          setMenuOpen(false)
                        }}
                        className={`cursor-pointer border-l-4 px-6 py-2.5 text-lg transition-all duration-150 ${
                          year === y
                            ? 'border-lag-red bg-lag-red font-semibold text-white'
                            : 'border-transparent text-[#444] hover:border-lag-red hover:bg-red-50 hover:pl-7 hover:text-lag-red'
                        }`}
                      >
                        {y}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-3 text-sm text-[#888]">
                  {items.length} award{items.length > 1 ? 's' : ''} &amp; recognitions
                </p>
              </div>
            </Reveal>

            <Timeline items={items} />
          </div>
        </div>
      </section>
    </main>
  )
}