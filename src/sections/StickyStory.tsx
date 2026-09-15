import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

const PANELS = [
  {
    index: '01',
    time: '9:47 PM',
    title: 'A pipe bursts in a kitchen on Atlantic Ave.',
    body: 'The homeowner grabs their phone and starts calling plumbers. Yours goes to voicemail — so they call the next name on the list.',
    visual: 'phone',
  },
  {
    index: '02',
    time: 'Ring one.',
    title: 'Amy picks up — calm, human, unhurried.',
    body: 'She asks how bad it is, helps them find the shut-off valve, and judges whether this is a real emergency or a morning job.',
    visual: 'wave',
  },
  {
    index: '03',
    time: '9:51 PM',
    title: 'Booked. Texted. On your calendar.',
    body: 'The customer has a confirmation text. You have a job on tomorrow’s schedule. Your competitor has a missed-call notification.',
    visual: 'booked',
  },
] as const

function Visual({ kind }: { kind: string }) {
  if (kind === 'phone') {
    return (
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-amber/25 [animation:ring-pulse_1.8s_ease-out_infinite]" />
        <span className="absolute inset-0 rounded-full bg-amber/15 [animation:ring-pulse_1.8s_ease-out_0.6s_infinite]" />
        <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cream/20 bg-cream/5 text-amber">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
      </div>
    )
  }
  if (kind === 'wave') {
    return (
      <div className="wave-live flex h-20 items-center gap-1.5">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="wave-bar block h-20 w-1.5 rounded-full bg-amber"
            style={{ animationDelay: `${(i % 9) * 0.1}s`, animationDuration: `${0.75 + (i % 5) * 0.08}s` }}
          />
        ))}
      </div>
    )
  }
  return (
    <div className="w-full max-w-xs rounded-xl border-l-2 border-amber bg-cream/5 p-5 [animation:soft-float_5s_ease-in-out_infinite]">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
        ✓ Emergency slot — 7:00 AM tomorrow
      </p>
      <p className="mt-2 text-sm text-cream/85">Burst pipe · shut-off valve located</p>
      <p className="mt-2 font-mono text-[11px] text-cream/45">→ Confirmation text sent</p>
    </div>
  )
}

export default function StickyStory() {
  const rootRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.story-panel')
      gsap.set(panels, { opacity: 0, y: 70 })
      gsap.set(panels[0], { opacity: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 0.6,
        },
      })

      panels.forEach((panel, i) => {
        if (i === 0) return
        tl.to(panels[i - 1], { opacity: 0, y: -70, duration: 1, ease: 'ora' }, i * 1.4)
        tl.to(panel, { opacity: 1, y: 0, duration: 1, ease: 'ora' }, i * 1.4 + 0.35)
      })

      if (progressRef.current) {
        tl.fromTo(
          progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: tl.duration(), ease: 'none' },
          0
        )
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={rootRef} id="how" className="relative overflow-hidden bg-navy text-cream">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 py-24 md:px-8">
        <div className="mb-12 flex items-end justify-between lg:mb-0 lg:absolute lg:left-8 lg:top-10 lg:right-8 lg:z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
            What one ring looks like
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
            After hours — when you can’t pick up
          </p>
        </div>

        {/* Desktop: pinned stacked panels / Mobile: stacked flow */}
        <div className="relative grid gap-24 lg:block lg:h-[62vh]">
          {PANELS.map((p) => (
            <div
              key={p.index}
              className="story-panel grid items-center gap-10 lg:absolute lg:inset-0 lg:grid-cols-2 lg:gap-16"
            >
              <div>
                <p className="font-mono text-xs tracking-[0.3em] text-amber">{p.index}</p>
                <p className="mt-6 font-serif text-6xl font-light italic leading-none text-cream/90 md:text-8xl">
                  {p.time}
                </p>
                <h3 className="mt-6 max-w-md font-serif text-3xl font-medium leading-tight md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-md leading-relaxed text-cream/65">{p.body}</p>
              </div>
              <div className="flex items-center justify-start lg:justify-center">
                <Visual kind={p.visual} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar (desktop) */}
        <div className="mt-14 h-px w-full bg-cream/15 lg:absolute lg:inset-x-8 lg:bottom-10 lg:mt-0 lg:w-auto">
          <div ref={progressRef} className="h-px origin-left bg-amber" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  )
}
