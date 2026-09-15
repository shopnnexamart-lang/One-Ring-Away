import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

export default function FinalCta() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.final-line',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.4,
          ease: 'ora',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        }
      )
      // Slow drift on the giant wordmark
      gsap.to('.footer-word', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="start" className="relative overflow-hidden bg-navy-deep pt-28 text-cream md:pt-40">
      <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
          Hear it before you spend a dollar
        </p>

        <h2 className="mt-8 font-serif font-medium leading-[0.98] tracking-tight">
          <span className="block overflow-hidden pb-1">
            <span className="final-line block text-[11vw] md:text-[8vw]">Your next customer</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="final-line block text-[11vw] italic text-amber md:text-[8vw]">
              is one ring away.
            </span>
          </span>
        </h2>

        <div data-reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+19145550134"
            className="group relative overflow-hidden rounded-full bg-amber px-9 py-5 font-mono text-xs uppercase tracking-[0.2em] text-navy-ink transition-transform duration-300 active:scale-[0.98]"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-cream">
              Call the demo line — (914) 555-0134
            </span>
            <span className="absolute inset-0 translate-y-full bg-navy transition-transform duration-500 ease-ora group-hover:translate-y-0" />
          </a>
          <a
            href="mailto:hello@oneringaway.com"
            className="rounded-full border border-cream/30 px-9 py-5 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:border-cream hover:bg-cream/5"
          >
            Book a 15-min setup call
          </a>
        </div>

        <p data-reveal className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/40">
          Amy answers this line right now — try her at 2 AM
        </p>
      </div>

      {/* Footer with oversized wordmark */}
      <footer className="mt-24 border-t border-cream/10 md:mt-32">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8">
          <p
            className="footer-word select-none text-center font-serif text-[12.5vw] font-semibold leading-none tracking-tight text-outline-cream"
            aria-hidden
          >
            OneRingAway
          </p>
          <div className="mt-14 flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
              © 2026 AI GG Corp · New York
            </p>
            <div className="flex gap-8">
              <a href="mailto:hello@oneringaway.com" className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60 transition-colors hover:text-amber">
                hello@oneringaway.com
              </a>
              <a href="tel:+19145550134" className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60 transition-colors hover:text-amber">
                (914) 555-0134
              </a>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
              Every call answered. Every job booked.
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}
