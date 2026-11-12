import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Awards from './pages/Awards'
import AutoPartners from './pages/AutoPartners'
import Brand from './pages/auto_brand/BMW'
import BMWModel from './pages/auto_brand/BMWModel'
import Carmix from './pages/auto_brand/Carmix'
import Changhe from './pages/auto_brand/Changhe'
import ChangheModel from './pages/auto_brand/ChangheModel'
import Chevrolet from './pages/auto_brand/Chevrolet'
import ChevroletModel from './pages/auto_brand/ChevroletModel'
import Chery from './pages/auto_brand/Chery'
import CheryModel from './pages/auto_brand/CheryModel'
import Ford from './pages/auto_brand/Ford'
import FordModel from './pages/auto_brand/FordModel'

// Jumps to the top on page change, or to the section if the link has a #hash
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // wait a tick so the new page has rendered
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <PageLoader />
      <ScrollToTop />

      {/* scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-lag-red"
        style={{ width: `${progress}%` }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/auto-partners" element={<AutoPartners />} />
        <Route path="/brands/carmix" element={<Carmix />} />
        <Route path="/brands/changhe" element={<Changhe />} />
        <Route path="/brands/changhe/:model" element={<ChangheModel />} />
        <Route path="/brands/chevrolet" element={<Chevrolet />} />
        <Route path="/brands/chevrolet/:model" element={<ChevroletModel />} />
        <Route path="/brands/chery" element={<Chery />} />
        <Route path="/brands/chery/:model" element={<CheryModel />} />
        <Route path="/brands/ford" element={<Ford />} />
        <Route path="/brands/ford/:model" element={<FordModel />} />
        <Route path="/brands/:slug" element={<Brand />} />
        <Route path="/brands/:slug/:model" element={<BMWModel />} />
      </Routes>

      <Footer />
      <BackToTop />
    </>
  )
}