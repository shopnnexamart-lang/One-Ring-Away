import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/motion'
import { scrollBus } from '../lib/scrollBus'
import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import Marquee from '../sections/Marquee'
import Calculator from '../sections/Calculator'
import StickyStory from '../sections/StickyStory'
import Modes from '../sections/Modes'
import Trades from '../sections/Trades'
import Proof from '../sections/Proof'
import Pricing from '../sections/Pricing'
import Faq from '../sections/Faq'
import FinalCta from '../sections/FinalCta'

export default function Home() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis: Lenis | null = null
    const raf = (time: number) => lenis?.raf(time * 1000)

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 })
      scrollBus.lenis = lenis
      lenis.on('scroll', (e) => {
        scrollBus.velocity = e.velocity
        ScrollTrigger.update()
      })
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    // Scroll-triggered reveals
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: reduced ? 0 : 52, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'ora',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(raf)
      lenis?.destroy()
      scrollBus.lenis = null
      scrollBus.velocity = 0
    }
  }, [])

  return (
    <div className="noise relative">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Calculator />
        <StickyStory />
        <Modes />
        <Trades />
        <Proof />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
    </div>
  )
}
