import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'
import { scrollTo } from '../lib/scrollBus'
import CallDemo from './CallDemo'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered line reveals on load
      gsap.utils.toArray<HTMLElement>('.hero-line-inner').forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 112 },
          { yPercent: 0, duration: 1.5, ease: 'ora', delay: 0.25 + i * 0.14 }
        )
      })
      gsap.fromTo(
        '.hero-fade',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'ora', delay: 0.9, stagger: 0.12 }
      )
      // Scroll-coupled parallax on headline rows
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0')
        gsap.to(el, {
          y: speed * -16,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="top" className="relative overflow-hidden pb-16 pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Eyebrow */}
        <div className="hero-fade flex items-center gap-3 opacity-0">
          <span className="h-2 w-2 rounded-full bg-amber" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-navy/60">
            AI receptionist for local service businesses
          </p>
        </div>

        {/* Oversized headline with parallax rows */}
        <h1 className="mt-8 font-serif font-medium leading-[0.98] tracking-tight text-navy">
          <span className="block overflow-hidden pb-1" data-speed="6">
            <span className="hero-line-inner block text-[13.5vw] md:text-[9.5vw]">
              Your phone rings.
            </span>
          </span>
          <span className="block overflow-hidden pb-2" data-speed="3">
            <span className="hero-line-inner block text-[13.5vw] md:text-[9.5vw]">
              <em className="italic text-amber">Amy</em> answers.
            </span>
          </span>
        </h1>

        {/* Subcopy + demo */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <p className="hero-fade max-w-md text-lg leading-relaxed text-navy/75 opacity-0 md:text-xl">
              Every missed call is a customer dialing your competitor. OneRingAway picks up on the
              first ring — day, night, weekends — books the job into your calendar, and texts the
              confirmation before they hang up.
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-4 opacity-0">
              <a
                href="tel:+19145550134"
                className="group relative overflow-hidden rounded-full bg-amber px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-navy-ink transition-transform duration-300 active:scale-[0.98]"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-cream">
                  Call the demo line
                </span>
                <span className="absolute inset-0 translate-y-full bg-navy transition-transform duration-500 ease-ora group-hover:translate-y-0" />
              </a>
              <button
                onClick={() => scrollTo('#leak')}
                className="group flex items-center gap-2 rounded-full border border-navy/30 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-navy transition-colors duration-500 hover:border-navy"
              >
                See what it saves you
                <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
              </button>
            </div>

            <p className="hero-fade font-mono text-[11px] uppercase tracking-[0.2em] text-navy/45 opacity-0">
              No contracts · Live in a day · Sounds like your best hire
            </p>
          </div>

          <div className="hero-fade opacity-0">
            <CallDemo />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex items-center gap-4 md:mt-20">
          <div className="relative h-12 w-px overflow-hidden bg-navy/15">
            <span className="absolute inset-x-0 h-full bg-amber [animation:line-slide_2s_ease-in-out_infinite]" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-navy/45">
            Scroll — this is where it gets expensive
          </p>
        </div>
      </div>
    </section>
  )
}
