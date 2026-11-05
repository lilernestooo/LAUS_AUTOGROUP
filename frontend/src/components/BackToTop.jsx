import { useEffect, useState } from 'react'

export default function BackToTop({ showAfter = 300 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfter])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed right-10 bottom-8 z-40 grid h-[46px] w-[46px] cursor-pointer place-items-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition duration-300 hover:scale-110 hover:border-lag-red hover:bg-lag-red ${
        visible ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 15l6-6 6 6" />
      </svg>
    </button>
  )
}