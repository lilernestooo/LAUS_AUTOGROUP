import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo/LAG_WhiteRed_Logo.png'

/* ---------- MENU DATA ----------
   `to` starts with "/" for real pages. Anything without it stays a "#" placeholder.
   sub items can be a string, { label, to }, or { label, children: [...] } for a nested group */
const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about', sub: [{ label: 'Awards & Recognitions', to: '/awards' }] },
  {
    label: 'Auto Brand',
    sub: [
      { label: 'BMW', to: '/brands/bmw' }, { label: 'Carmix', to: '/brands/carmix' }, { label: 'Changhe', to: '/brands/changhe' }, { label: 'Chevrolet', to: '/brands/chevrolet' }, { label: 'Chery', to: '/brands/chery' }, { label: 'Ford', to: '/brands/ford' }, { label: 'Foton', to: '/brands/foton' }, 'FUSO',
      'Geely', 'Haima',
      { label: 'Hyundai', children: ['Passenger Cars', 'Trucks and Buses'] }, // edit these
      'Jeep', 'Kia', 'Mazda', 'MINI', 'Mitsubishi', 'Peugeot',
      'Piaggio APE', 'Suzuki', 'Volkswagen',
    ],
  },
  { label: 'Auto Partners', to: '/auto-partners' },
  { label: 'News and Events', sub: ['Latest News', 'Special Offers'] },
  { label: 'Contact Us', sub: ['Find a Dealer', 'Careers'] },
]

/* thin white scrollbar (matches the footer) */
const scrollbar =
  '[scrollbar-color:#fff_#171717] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-neutral-900'

const itemClass =
  'block border-b border-l-2 border-b-neutral-800 border-l-transparent px-4 py-2.5 text-sm text-neutral-200 transition-all duration-200 hover:border-l-lag-red hover:bg-neutral-800 hover:pl-5 hover:text-white'

/* Real page -> <Link>, placeholder -> plain <a href="#"> */
function A({ to = '#', children, ...props }) {
  return to.startsWith('/') ? (
    <Link to={to} {...props}>
      {children}
    </Link>
  ) : (
    <a href={to} {...props}>
      {children}
    </a>
  )
}

/* ---------- ONE DROPDOWN ITEM (with optional nested group) ---------- */
function DropItem({ item, onNavigate }) {
  const [expanded, setExpanded] = useState(false)
  const data = typeof item === 'string' ? { label: item } : item

  if (!data.children) {
    return (
      <li>
        <A to={data.to} onClick={onNavigate} className={itemClass}>
          {data.label}
        </A>
      </li>
    )
  }

  return (
    <li>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`${itemClass} flex w-full cursor-pointer items-center justify-between text-left`}
      >
        {data.label}
        <span className={`text-[10px] transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>
          ▸
        </span>
      </button>
      {expanded && (
        <ul className="bg-neutral-950">
          {data.children.map((c) => (
            <li key={c}>
              <a
                href="#"
                onClick={onNavigate}
                className="block border-b border-neutral-800 py-2.5 pr-4 pl-8 text-[13px] text-neutral-300 transition-colors hover:bg-lag-red hover:text-white"
              >
                {c}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

/* ---------- NAVBAR ---------- */
export default function Navbar() {
  const [open, setOpen] = useState(false) // mobile menu
  const [openIdx, setOpenIdx] = useState(null) // mobile accordion
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setOpen(false)
    setOpenIdx(null)
  }

  const onTabClick = (e, l, idx) => {
    // on mobile, tapping a tab with a dropdown opens/closes it
    if (l.sub && window.innerWidth < 1024) {
      e.preventDefault()
      setOpenIdx(openIdx === idx ? null : idx)
      return
    }
    closeMenu()
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-black transition-all duration-300 ${scrolled ? 'h-[64px] shadow-lg shadow-black/40' : 'h-[86px]'
        }`}
    >
      <div className="mx-auto flex h-full w-[94%] max-w-[1280px] items-center justify-between">
        {/* logo */}
        <Link to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt="LausAutoGroup"
            className={`block transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'}`}
          />
        </Link>

        {/* burger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          className="cursor-pointer text-3xl text-white lg:hidden"
        >
          {open ? '✕' : '☰'}
        </button>

        {/* menu */}
        <nav
          className={`absolute top-full right-0 left-0 max-h-[calc(100vh-64px)] overflow-y-auto bg-black lg:static lg:block lg:max-h-none lg:overflow-visible ${open ? 'block' : 'hidden'
            }`}
        >
          <ul className="flex flex-col py-2 lg:flex-row lg:items-center lg:gap-0.5 lg:py-0">
            {links.map((l, idx) => {
              const isActive =
                l.to === pathname ||
                l.sub?.some((s) => typeof s !== 'string' && s.to === pathname)
              return (
                <li key={l.label} className="group relative">
                  <A
                    to={l.to}
                    onClick={(e) => onTabClick(e, l, idx)}
                    className={`flex h-10 w-full items-center justify-between gap-2 px-3.5 text-[15px] text-white transition-colors duration-200 lg:w-auto ${isActive || openIdx === idx
                        ? 'bg-lag-red'
                        : 'hover:bg-lag-red lg:group-hover:bg-lag-red lg:group-focus-within:bg-lag-red'
                      }`}
                  >
                    {l.label}
                    {l.sub && (
                      <span
                        className={`text-[10px] transition-transform duration-200 lg:group-hover:rotate-180 ${openIdx === idx ? 'rotate-180' : ''
                          }`}
                      >
                        ▾
                      </span>
                    )}
                  </A>

                  {l.sub && (
                    <ul
                      className={`max-h-[260px] overflow-y-auto bg-neutral-900 ${scrollbar} ${openIdx === idx ? 'block' : 'hidden'
                        } lg:invisible lg:absolute lg:top-full lg:left-0 lg:block lg:max-h-[320px] lg:min-w-[210px] lg:translate-y-2 lg:border-t-2 lg:border-lag-red lg:opacity-0 lg:shadow-xl lg:shadow-black/60 lg:transition-all lg:duration-200 lg:group-focus-within:visible lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100`}
                    >
                      {/* mobile only: the tab itself opens the dropdown, so give a way to open the page */}
                      {l.to && (
                        <li className="lg:hidden">
                          <A to={l.to} onClick={closeMenu} className={itemClass}>
                            Overview
                          </A>
                        </li>
                      )}
                      {l.sub.map((s) => (
                        <DropItem key={typeof s === 'string' ? s : s.label} item={s} onNavigate={closeMenu} />
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}

            {/* search */}
            <li className="px-4 py-3 lg:ml-6 lg:p-0">
              <a href="#" aria-label="Search" className="inline-block transition-transform duration-200 hover:scale-125">
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