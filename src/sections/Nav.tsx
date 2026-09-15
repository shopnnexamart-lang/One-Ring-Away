import { useEffect, useState } from 'react'
import { scrollTo } from '../lib/scrollBus'

const LINKS = [
  { label: 'The Leak', href: '#leak' },
  { label: 'How It Works', href: '#how' },
  { label: 'Trades', href: '#trades' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'backdrop-blur-md bg-beige/80 border-b border-navy/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => scrollTo('#top')}
          className="group flex items-center gap-2"
          aria-label="OneRingAway home"
        >
          {/* Ring mark */}
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
            <circle cx="13" cy="13" r="9" stroke="#22264B" strokeWidth="2.5" />
            <circle cx="20.5" cy="5.5" r="3" fill="#F7A026" />
          </svg>
          <span className="font-serif text-lg font-semibold tracking-tight text-navy">
            OneRingAway
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-navy/70 transition-colors duration-300 hover:text-navy"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <a
          href="tel:+19145550134"
          className="group relative overflow-hidden rounded-full bg-navy px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-transform duration-300 active:scale-[0.98]"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-navy-ink">
            Hear Amy answer
          </span>
          <span className="absolute inset-0 translate-y-full bg-amber transition-transform duration-500 ease-ora group-hover:translate-y-0" />
        </a>
      </div>
    </header>
  )
}
