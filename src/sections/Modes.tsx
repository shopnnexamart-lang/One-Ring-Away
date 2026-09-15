import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/motion'

type ModeKey = 'after' | 'overflow' | 'full'

const MODES: Record<
  ModeKey,
  {
    label: string
    tagline: string
    body: string
    // [startHour, endHour] covered segments on a 24h clock (end can wrap past 24)
    segments: [number, number][]
    dashed?: boolean
  }
> = {
  after: {
    label: 'After-hours',
    tagline: 'Nights, weekends, holidays.',
    body: 'You work your normal day. At closing time, Amy takes over — so the 9 PM emergency and the Sunday-morning inquiry both land on your calendar, not your competitor’s.',
    segments: [
      [0, 8],
      [18, 24],
    ],
  },
  overflow: {
    label: 'Overflow',
    tagline: 'Only when you can’t reach the phone.',
    body: 'You answer when you can. When you’re up a ladder or elbows-deep in an engine, the call rolls to Amy after a ring or two. The customer never hears voicemail.',
    segments: [[8, 18]],
    dashed: true,
  },
  full: {
    label: 'Full 24/7',
    tagline: 'Every call. Every hour. Every day.',
    body: 'Amy is your front desk around the clock — answering, booking, texting confirmations, and routing true emergencies straight to your cell.',
    segments: [[0, 24]],
  },
}

const HOURS = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p', '12a']

export default function Modes() {
  const [mode, setMode] = useState<ModeKey>('full')
  const textRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Animate text + bar on mode change
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'ora', stagger: 0.07 }
      )
    }
    if (barRef.current) {
      gsap.fromTo(
        barRef.current.querySelectorAll('.seg'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'ora', stagger: 0.08 }
      )
    }
  }, [mode])

  const m = MODES[mode]

  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.25em] text-navy/55">
              You stay in control
            </p>
            <h2
              data-reveal
              className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
            >
              You decide <em className="italic text-amber">when</em> she answers.
            </h2>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-navy/70">
              Three ways to run it. Switch anytime — most owners start with after-hours and go full
              24/7 within a month.
            </p>

            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              {(Object.keys(MODES) as ModeKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`rounded-full border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-500 ${
                    mode === key
                      ? 'border-navy bg-navy text-cream'
                      : 'border-navy/25 text-navy/70 hover:border-navy hover:text-navy'
                  }`}
                >
                  {MODES[key].label}
                </button>
              ))}
            </div>
          </div>

          <div data-reveal>
            <div ref={textRef}>
              <p className="font-serif text-3xl font-medium italic text-navy md:text-4xl">
                {m.tagline}
              </p>
              <p className="mt-5 max-w-lg leading-relaxed text-navy/70">{m.body}</p>
            </div>

            {/* 24-hour coverage bar */}
            <div className="mt-12">
              <div ref={barRef} className="relative h-14 overflow-hidden rounded-lg bg-navy/10">
                {m.segments.map(([s, e], i) => (
                  <div
                    key={`${mode}-${i}`}
                    className={`seg absolute top-0 h-full origin-left ${
                      m.dashed ? 'bg-amber/45' : 'bg-amber'
                    }`}
                    style={{
                      left: `${(s / 24) * 100}%`,
                      width: `${((e - s) / 24) * 100}%`,
                      backgroundImage: m.dashed
                        ? 'repeating-linear-gradient(-45deg, rgba(23,26,51,0.35) 0 6px, transparent 6px 12px)'
                        : undefined,
                    }}
                  />
                ))}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-navy px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-cream">
                    {mode === 'overflow' ? 'Covered when you’re busy' : 'Amy covers this'}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-navy/45">
                {HOURS.map((h, i) => (
                  <span key={i}>{h}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
