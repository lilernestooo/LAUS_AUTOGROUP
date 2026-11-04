import { useEffect, useRef, useState } from 'react'

// Tailwind needs full class names, so each direction is written out here.
const hiddenState = {
  up: 'translate-y-10',
  down: '-translate-y-10',
  left: 'translate-x-10', // slides in from the right
  right: '-translate-x-10', // slides in from the left
  zoom: 'scale-90',
  none: '',
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // animate only once
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out motion-reduce:translate-none motion-reduce:scale-none motion-reduce:opacity-100 motion-reduce:transition-none ${
        visible
          ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
          : `opacity-0 ${hiddenState[direction]}`
      } ${className}`}
    >
      {children}
    </Tag>
  )
}