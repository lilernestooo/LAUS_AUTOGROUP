export default function FacebookPage({ href, title, height = 500 }) {
  // remove ?ref=embed_page and similar, the plugin wants the clean page address
  const page = href.split('?')[0]

  const src =
    'https://www.facebook.com/plugins/page.php' +
    `?href=${encodeURIComponent(page)}` +
    '&tabs=' +
    '&width=340' +
    `&height=${height}` +
    '&small_header=false' +
    '&adapt_container_width=true' +
    '&hide_cover=false' +
    '&show_facepile=false'

  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={height}
      loading="lazy"
      scrolling="no"
      allow="encrypted-media"
      style={{ border: 'none', overflow: 'hidden' }}
    />
  )
}