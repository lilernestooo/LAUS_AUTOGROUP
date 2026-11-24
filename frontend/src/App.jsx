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
import Foton from './pages/auto_brand/Foton'
import FotonModel from './pages/auto_brand/FotonModel'
import Fuso from './pages/auto_brand/Fuso'
import FusoModel from './pages/auto_brand/FusoModel'
import Geely from './pages/auto_brand/Geely'
import GeelyModel from './pages/auto_brand/GeelyModel'
import Haima from './pages/auto_brand/Haima'
import HaimaModel from './pages/auto_brand/HaimaModel'
import HyundaiPassenger from './pages/auto_brand/HyundaiPassenger'
import HyundaiTrucks from './pages/auto_brand/HyundaiTrucks'
import HyundaiPassengerModel from './pages/auto_brand/HyundaiPassengerModel'
import Jeep from './pages/auto_brand/Jeep'
import JeepModel from './pages/auto_brand/JeepModel'
import Kia from './pages/auto_brand/Kia'
import KiaModel from './pages/auto_brand/KiaModel'
import Mazda from './pages/auto_brand/Mazda'
import MazdaModel from './pages/auto_brand/MazdaModel'
import Mini from './pages/auto_brand/Mini'
import MiniModel from './pages/auto_brand/MiniModel'
import Mitsubishi from './pages/auto_brand/Mitsubishi'
import MitsubishiModel from './pages/auto_brand/MitsubishiModel'
import Peugeot from './pages/auto_brand/Peugeot'
import PeugeotModel from './pages/auto_brand/PeugeotModel'
import Suzuki from './pages/auto_brand/Suzuki'
import Volkswagen from './pages/auto_brand/Volkswagen'

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
        <Route path="/brands/foton" element={<Foton />} />
        <Route path="/brands/foton/:model" element={<FotonModel />} />
        <Route path="/brands/fuso" element={<Fuso />} />
        <Route path="/brands/fuso/:model" element={<FusoModel />} />
        <Route path="/brands/geely" element={<Geely />} />
        <Route path="/brands/geely/:model" element={<GeelyModel />} />
        <Route path="/brands/haima" element={<Haima />} />
        <Route path="/brands/haima/:model" element={<HaimaModel />} />
        <Route path="/brands/hyundai-passenger-cars" element={<HyundaiPassenger />} />
        <Route path="/brands/hyundai-passenger-cars/:model" element={<HyundaiPassengerModel />} />
        <Route path="/brands/hyundai-trucks-and-buses" element={<HyundaiTrucks />} />
        <Route path="/brands/jeep" element={<Jeep />} />
        <Route path="/brands/jeep/:model" element={<JeepModel />} />
        <Route path="/brands/kia" element={<Kia />} />
        <Route path="/brands/kia/:model" element={<KiaModel />} />
        <Route path="/brands/mazda" element={<Mazda />} />
        <Route path="/brands/mazda/:model" element={<MazdaModel />} />
        <Route path="/brands/mini" element={<Mini />} />
        <Route path="/brands/mini/:model" element={<MiniModel />} />
        <Route path="/brands/mitsubishi" element={<Mitsubishi />} />
        <Route path="/brands/mitsubishi/:model" element={<MitsubishiModel />} />
        <Route path="/brands/:slug" element={<Brand />} />
        <Route path="/brands/:slug/:model" element={<BMWModel />} />
        <Route path="/brands/peugeot" element={<Peugeot />} />
        <Route path="/brands/peugeot/:model" element={<PeugeotModel />} />
        <Route path="/brands/suzuki" element={<Suzuki />} />
        <Route path="/brands/volkswagen" element={<Volkswagen />} />
      </Routes>

      <Footer />
      <BackToTop />
    </>
  )
}