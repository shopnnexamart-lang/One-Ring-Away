import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/motion'
import { scrollTo } from '../lib/scrollBus'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function Calculator() {
  const [missed, setMissed] = useState(6)
  const [jobValue, setJobValue] = useState(450)

  // Conservative: only 3 in 10 missed callers would have booked
  const yearlyLoss = missed * 52 * jobValue * 0.3
  const monthlyLoss = yearlyLoss / 12

  const yearRef = useRef<HTMLSpanElement>(null)
  const monthRef = useRef<HTMLSpanElement>(null)
  const animated = useRef({ y: 0, m: 0 })

  useEffect(() => {
    const state = animated.current
    gsap.to(state, {
      y: yearlyLoss,
      m: monthlyLoss,
      duration: 1.1,
      ease: 'ora',
      onUpdate: () => {
        if (yearRef.current) yearRef.current.textContent = fmt(state.y)
        if (monthRef.current) monthRef.current.textContent = fmt(state.m)
      },
    })
  }, [yearlyLoss, monthlyLoss])

  return (
    <section id="leak" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Left: story + sliders */}
          <div>
            <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.25em] text-navy/55">
              The leak you can’t hear
            </p>
            <h2
              data-reveal
              className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-navy md:text-6xl"
            >
              Missed calls don’t feel like losses.
              <em className="italic text-amber"> They are.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-navy/70">
              When you’re on a ladder, under a sink, or with a client, the phone goes to voicemail.
              The caller doesn’t leave a message — they call the next name on the list. Drag the
              numbers. Watch what silence costs.
            </p>

            <div data-reveal className="mt-10 space-y-9">
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor="missed" className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60">
                    Missed calls per week
                  </label>
                  <span className="font-serif text-3xl font-medium text-navy tabular-nums">{missed}</span>
                </div>
                <input
                  id="missed"
                  type="range"
                  min={1}
                  max={30}
                  value={missed}
                  onChange={(e) => setMissed(+e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor="value" className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60">
                    Average job value
                  </label>
                  <span className="font-serif text-3xl font-medium text-navy tabular-nums">
                    {fmt(jobValue)}
                  </span>
                </div>
                <input
                  id="value"
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={jobValue}
                  onChange={(e) => setJobValue(+e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right: the number */}
          <div data-reveal className="flex flex-col justify-center rounded-2xl bg-navy p-8 md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
              Walking to whoever answered
            </p>
            <p className="mt-6 font-mono text-5xl font-medium tracking-tight text-amber tabular-nums md:text-7xl">
              <span ref={monthRef}>$0</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-cream/45">
              every month
            </p>

            <div className="my-8 h-px bg-cream/10" />

            <p className="font-mono text-2xl text-cream/85 tabular-nums md:text-3xl">
              <span ref={yearRef}>$0</span>
              <span className="ml-3 text-sm uppercase tracking-[0.2em] text-cream/45">per year</span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-cream/55">
              Conservative math — assumes only 3 in 10 of those callers would have actually booked.
              The real number is usually worse.
            </p>

            <button
              onClick={() => scrollTo('#pricing')}
              className="group mt-9 flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-amber"
            >
              OneRingAway costs less than one recovered job
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
