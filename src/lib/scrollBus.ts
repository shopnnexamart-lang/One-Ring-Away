import type Lenis from 'lenis'

/** Shared scroll state so any component can react to scroll velocity. */
export const scrollBus = {
  velocity: 0,
  lenis: null as Lenis | null,
}

export function scrollTo(target: string) {
  const el = document.querySelector(target)
  if (!el) return
  if (scrollBus.lenis) {
    scrollBus.lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.6 })
  } else {
    ;(el as HTMLElement).scrollIntoView({ behavior: 'smooth' })
  }
}
