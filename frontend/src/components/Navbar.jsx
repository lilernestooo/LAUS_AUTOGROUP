import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo/LAG_WhiteRed_Logo.png'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about', sub: [{ label: 'Awards & Recognitions', to: '/awards' }] },
  {
    label: 'Auto Brand',
    match: '/brands', // stays highlighted on every /brands/... page
    sub: [
      { label: 'BMW', to: '/brands/bmw' }, { label: 'Carmix', to: '/brands/carmix' }, { label: 'Changhe', to: '/brands/changhe' }, { label: 'Chevrolet', to: '/brands/chevrolet' }, { label: 'Chery', to: '/brands/chery' }, { label: 'Ford', to: '/brands/ford' }, { label: 'Foton', to: '/brands/foton' }, { label: 'FUSO', to: '/brands/fuso' },
      { label: 'Geely', to: '/brands/geely' },
      { label: 'Haima', to: '/brands/haima' },
      { label: 'Hyundai', children: [{ label: 'Passenger Cars', to: '/brands/hyundai-passenger-cars' }, { label: 'Trucks and Buses', to: '/brands/hyundai-trucks-and-buses' }] },
      { label: 'Jeep', to: '/brands/jeep' }, { label: 'Kia', to: '/brands/kia' }, { label: 'Mazda', to: '/brands/mazda' }, { label: 'MINI', to: '/brands/mini' }, { label: 'Mitsubishi', to: '/brands/mitsubishi' }, { label: 'Peugeot', to: '/brands/peugeot' },
      //'Piaggio APE', 
      { label: 'Suzuki', to: '/brands/suzuki' }, { label: 'Volkswagen', to: '/brands/volkswagen' },
    ],
  },
  { label: 'Auto Partners', to: '/auto-partners' },
  {
    label: 'News and Events',
    to: '/news',
    sub: [{ label: 'Latest News', to: '/news' }, 'Special Offers'],
  },
  {
    label: 'Contact Us',
    sub: [
      'Find a Dealer',
      { label: 'Careers', to: 'https://careers.lausgroup.com.ph/', external: true },
    ],
  },
]

const scrollbar =
  '[scrollbar-color:#fff_#171717] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-neutral-900'

const itemClass =
  'block border-b border-l-2 border-b-neutral-800 border-l-transparent px-4 py-2.5 text-sm tracking-wide text-neutral-200 transition-all duration-200 hover:border-l-lag-red hover:bg-neutral-800 hover:pl-6 hover:text-white'

/* Real page -> <Link>, placeholder -> plain <a href="#"> */
function A({ to = '#', children, ...props }) {
  if (to.startsWith('/')) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    )
  }
  const isWeb = /^https?:\/\//i.test(to)
  return (
    <a href={to} {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
      {children}
    </a>
  )
}

/* ---------- ONE DROPDOWN ITEM (with optional nested group) ---------- */
function DropItem({ item, onNavigate }) {
  const [expanded, setExpanded] = useState(false)
  const data = typeof item === 'string' ? { label: item } : item
  const isDesktop = () => window.innerWidth >= 1024

  if (!data.children) {
    // external links: open a new tab directly
    const openExternal = (e) => {
      e.preventDefault()
      window.open(data.to, '_blank', 'noopener,noreferrer')
      onNavigate?.()
    }

    return (
      <li>
        <A
          to={data.to}
          onClick={data.external ? openExternal : onNavigate}
          className={itemClass}
        >
          {data.label}
        </A>
      </li>
    )
  }

  return (
    <li
      onMouseEnter={() => isDesktop() && setExpanded(true)}
      onMouseLeave={() => isDesktop() && setExpanded(false)}
    >
      <button
        onClick={() => (isDesktop() ? setExpanded(true) : setExpanded(!expanded))}
        className={`${itemClass} flex w-full cursor-pointer items-center justify-between text-left ${expanded ? 'border-l-lag-red bg-neutral-800 text-white' : ''
          }`}
      >
        {data.label}
        <span className={`text-base transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>
          ▸
        </span>
      </button>
      {expanded && (
        <ul className="bg-neutral-950">
          {data.children.map((c) => {
            const child = typeof c === 'string' ? { label: c } : c
            return (
              <li key={child.label}>
                <A
                  to={child.to}
                  onClick={onNavigate}
                  className="block border-b border-neutral-800 py-2.5 pr-4 pl-8 text-[13px] tracking-wide text-neutral-300 transition-colors hover:bg-lag-red hover:text-white"
                >
                  {child.label}
                </A>
              </li>
            )
          })}
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
      <div className="mx-auto flex h-full w-[94%] max-w-[1280px] items-center justify-between gap-6">
        {/* logo */}
        <Link to="/" onClick={closeMenu} className="shrink-0">
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

        {/* menu: fills the space next to the logo, tabs are spread evenly */}
        <nav
          className={`absolute top-full right-0 left-0 max-h-[calc(100vh-64px)] overflow-y-auto bg-black lg:static lg:block lg:max-h-none lg:flex-1 lg:overflow-visible ${open ? 'block' : 'hidden'
            }`}
        >
          <ul className="flex flex-col py-2 lg:flex-row lg:items-center lg:justify-evenly lg:py-0">
            {links.map((l, idx) => {
              const isActive =
                l.to === pathname ||
                (l.match && pathname.startsWith(l.match)) ||
                l.sub?.some((s) => typeof s !== 'string' && s.to === pathname)
              return (
                <li key={l.label} className="group relative">
                  <A
                    to={l.to}
                    onClick={(e) => onTabClick(e, l, idx)}
                    className={`relative flex h-11 w-full items-center justify-between gap-2 px-4 text-[13px] font-semibold tracking-[0.12em] text-white uppercase transition-colors duration-200 lg:w-auto lg:px-5 ${isActive || openIdx === idx
                      ? 'bg-lag-red lg:bg-transparent'
                      : 'hover:bg-lag-red lg:hover:bg-transparent'
                      }`}
                  >
                    {l.label}
                    {l.sub && (
                      <span
                        className={`text-base transition-transform duration-200 lg:group-hover:rotate-180 ${openIdx === idx ? 'rotate-180' : ''
                          }`}
                      >
                        ▾
                      </span>
                    )}

                    {/* red bar that slides in from the left (desktop) */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-0 bottom-0 hidden h-[3px] origin-left bg-lag-red shadow-[0_0_12px_rgba(224,0,0,0.7)] transition-transform duration-300 ease-out lg:block ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </A>

                  {l.sub && (
                    <ul
                      className={`max-h-[260px] overflow-y-auto bg-neutral-900 ${scrollbar} ${openIdx === idx ? 'block' : 'hidden'
                        } lg:invisible lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:block lg:max-h-[340px] lg:min-w-[230px] lg:translate-y-2 lg:border-t-2 lg:border-lag-red lg:opacity-0 lg:shadow-2xl lg:shadow-black/70 lg:transition-all lg:duration-200 lg:group-focus-within:visible lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100`}
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
            <li className="px-4 py-3 lg:p-0">
              <a
                href="#"
                aria-label="Search"
                className="grid h-10 w-10 place-items-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-lag-red"
              >
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