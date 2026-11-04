import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  const [showTop, setShowTop] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
      setShowTop(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-lag-red"
        style={{ width: `${progress}%` }}
      />

      <Navbar />
      <Home />
      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed right-10 bottom-8 z-40 h-[42px] w-[42px] cursor-pointer bg-black/50 text-[22px] text-white transition hover:bg-lag-red ${
          showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        ⌃
      </button>
    </>
  )
}