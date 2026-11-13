import { useEffect, useRef, useState } from 'react'

const BASE_WIDTH = 340 // the layout Facebook always renders

export default function FacebookPage({ href, title, height = 130 }) {
  const boxRef = useRef(null)
  const iframeRef = useRef(null)
  const [scale, setScale] = useState(1)
  // actual height reported by the FB plugin (falls back to the prop)
  const [liveHeight, setLiveHeight] = useState(height)

  // remove ?ref=embed_page and similar, the plugin wants the clean page address
  const page = href.split('?')[0].replace(/#$/, '')

  // shrink the whole card when the container is narrower than 340 px
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const update = () => setScale(Math.min(1, el.clientWidth / BASE_WIDTH))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // listen for the FB plugin's own resize postMessage so we clip to the real height
  useEffect(() => {
    const onMessage = (e) => {
      try {
        // FB sends either a JSON string or an object
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        // the message contains the iframe's src so we match on our page URL
        if (
          data &&
          (data.type === 'resize' || data['fb-iframe-resize']) &&
          data.height &&
          iframeRef.current &&
          String(data.height) !== '0'
        ) {
          setLiveHeight(Number(data.height))
        }
      } catch {
        // non-JSON messages — ignore
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // reset live height whenever the target page changes
  useEffect(() => {
    setLiveHeight(height)
  }, [href, height])

  const src =
    'https://www.facebook.com/plugins/page.php' +
    `?href=${encodeURIComponent(page)}` +
    '&tabs=' +
    `&width=${BASE_WIDTH}` +
    `&height=${height}` +
    '&small_header=false' +
    '&adapt_container_width=true' +
    '&hide_cover=false' +
    '&show_facepile=false'

  return (
    <div ref={boxRef} style={{ height: liveHeight * scale, overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        width={BASE_WIDTH}
        height={liveHeight}
        loading="lazy"
        scrolling="no"
        allow="encrypted-media"
        style={{
          border: 'none',
          overflow: 'hidden',
          display: 'block',
          width: BASE_WIDTH,
          height: liveHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}