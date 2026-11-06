import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo/LAG_Black_Logo.png'

const MIN_FIRST = 1200 // first visit / refresh: minimum time (ms)
const MIN_NAV = 700 // page switch: minimum time (ms)
const MAX_TIME = 6000 // safety: never stay longer than this (ms)
const LEAVE_TIME = 800 // length of the fade-out (ms)

export default function PageLoader() {
  const { pathname } = useLocation()
  const [phase, setPhase] = useState('loading') // loading -> leaving -> gone
  const [run, setRun] = useState(0) // 0 = first load, 1+ = page switches
  const [prevPath, setPrevPath] = useState(pathname)

  // The path changed: show the loader again in the same render,
  // so the new page is never visible for a moment before the blur
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setRun((r) => r + 1)
    setPhase('loading')
  }

  // decide when the loader may leave
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const first = run === 0
    const minTime = first ? MIN_FIRST : MIN_NAV
    let finished = false
    const timers = []

    const finish = () => {
      if (finished) return
      finished = true
      const wait = Math.max(0, minTime - (performance.now() - start))
      timers.push(setTimeout(() => setPhase('leaving'), wait))
    }

    if (first && document.readyState !== 'complete') {
      // first visit: wait for the whole page (images included)
      window.addEventListener('load', finish)
      timers.push(setTimeout(finish, MAX_TIME))
    } else {
      // page switch: the page is already loaded, just wait the minimum time
      finish()
    }

    return () => {
      window.removeEventListener('load', finish)
      timers.forEach(clearTimeout)
    }
  }, [run])

  // after the fade-out, remove the loader and unlock scrolling
  useEffect(() => {
    if (phase !== 'leaving') return
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      setPhase('gone')
    }, LEAVE_TIME)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'gone') return null

  const leaving = phase === 'leaving'

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[300] flex items-center justify-center transition-all duration-700 ease-out ${
        leaving
          ? 'pointer-events-none bg-white/0 opacity-0 backdrop-blur-none'
          : 'bg-white/70 opacity-100 backdrop-blur-xl'
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ease-out ${
          leaving ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* spinning logo */}
        <div className="[perspective:800px]">
          <img
            src={logo}
            alt="LausAutoGroup"
            className="w-44 animate-spin-y drop-shadow-[0_8px_24px_rgba(224,0,0,0.25)] motion-reduce:animate-none md:w-60"
          />
        </div>

        {/* small loading bar */}
        <div className="mt-8 h-1 w-40 overflow-hidden rounded bg-neutral-300/60">
          <div className="h-full w-1/3 animate-loader-bar rounded bg-lag-red motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  )
}