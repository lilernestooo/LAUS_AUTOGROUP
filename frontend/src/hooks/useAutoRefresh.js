import { useEffect, useRef } from 'react'

export default function useAutoRefresh(callback, ms = 20000) {
  const cb = useRef(callback)
  cb.current = callback // always the latest version

  useEffect(() => {
    const run = () => { if (!document.hidden) cb.current() }
    const id = setInterval(run, ms)
    document.addEventListener('visibilitychange', run)
    window.addEventListener('focus', run)

    let bc = null
    try { bc = new BroadcastChannel('lgc-news'); bc.onmessage = run } catch { /* not supported */ }

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', run)
      window.removeEventListener('focus', run)
      if (bc) bc.close()
    }
  }, [ms])
}