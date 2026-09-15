import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'
import { scrollBus } from '../lib/scrollBus'

const TRADES = [
  'Plumbing',
  'HVAC',
  'Electrical',
  'Windows & Doors',
  'Handyman',
  'Pest Control',
  'Salons',
  'Spas',
  'Auto Repair',
  'Landscaping',
  'Restaurants',
  'Retail',
]

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let x = 0
    let boost = 0
    const tick = () => {
      // Base drift + scroll-velocity coupling (reference move: scroll_coupled_marquee)
      boost += (Math.min(Math.abs(scrollBus.velocity) * 0.9, 14) - boost) * 0.08
      x -= 0.9 + boost
      const half = track.scrollWidth / 2
      if (-x >= half) x += half
      gsap.set(track, { x })
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  const items = [...TRADES, ...TRADES]

  return (
    <section aria-label="Trades we serve" className="overflow-hidden border-y border-cream/10 bg-navy py-6">
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((t, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-serif text-2xl italic text-cream/90 md:text-3xl">
                  {t}
                </span>
                <span className="font-mono text-xl text-amber">+</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
