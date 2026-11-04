import { useEffect, useState } from 'react'
import logo from '../assets/logo/LAG_WhiteRed_Logo.png'

const links = [
  { label: 'Home', active: true },
  { label: 'About Us', sub: ['Company Profile', 'Mission & Vision', 'Careers'] },
  { label: 'Auto Brand', sub: ['Cars', 'Motorcycles', 'Commercial'] },
  { label: 'Auto Partners' },
  { label: 'News and Events', sub: ['News', 'Events', 'Videos'] },
  { label: 'Contact Us', sub: ['Dealer Locations', 'Inquiry'] },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-black transition-all duration-300 ${
        scrolled ? 'h-[64px] shadow-lg shadow-black/40' : 'h-[86px]'
      }`}
    >
      <div className="mx-auto flex h-full w-[94%] max-w-[1280px] items-center justify-between">
        <a href="#">
          <img
            src={logo}
            alt="LausAutoGroup"
            className={`block transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'}`}
          />
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="cursor-pointer text-3xl text-white lg:hidden"
        >
          ☰
        </button>

        <nav
          className={`absolute top-full right-0 left-0 bg-black lg:static lg:block ${
            open ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-0.5">
            {links.map((l) => (
              <li key={l.label} className="group relative">
                <a
                  href="#"
                  className={`flex h-10 items-center gap-2 px-3.5 text-[15px] text-white transition-colors ${
                    l.active ? 'bg-lag-red' : 'hover:bg-neutral-800'
                  }`}
                >
                  {l.label}
                  {l.sub && <span className="text-[10px]">▾</span>}
                </a>

                {l.sub && (
                  <ul className="invisible translate-y-2.5 bg-neutral-900 opacity-0 transition duration-300 lg:absolute lg:top-full lg:left-0 lg:min-w-[190px] lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    {l.sub.map((s) => (
                      <li key={s}>
                        <a
                          href="#"
                          className="block border-b border-neutral-800 px-4 py-2.5 text-sm text-neutral-300 hover:bg-lag-red hover:text-white"
                        >
                          {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className="px-4 py-2 lg:ml-6 lg:p-0">
              <a href="#" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}   