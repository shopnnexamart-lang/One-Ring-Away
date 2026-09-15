import { useEffect, useRef, useState } from 'react'

type Line = { who: 'amy' | 'caller'; text: string }

const SCRIPT: Line[] = [
  { who: 'amy', text: 'Thank you for calling Window World, this is Amy. How can I help you tonight?' },
  { who: 'caller', text: 'Hi — a window at our shop cracked. We need it replaced this week if possible.' },
  { who: 'amy', text: 'I can help with that. Is it one window, or a few you’re looking at?' },
  { who: 'caller', text: 'Just the one. It’s about three by five feet.' },
  { who: 'amy', text: 'Got it. I have Thursday at 10 AM or Friday at 2 PM for a free measure. Which works better?' },
  { who: 'caller', text: 'Thursday works.' },
]

type Phase = 'ringing' | 'talking' | 'booked' | 'fading'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function CallDemo() {
  const [phase, setPhase] = useState<Phase>('ringing')
  const [lines, setLines] = useState<{ who: Line['who']; text: string; done: boolean }[]>([])
  const [loopKey, setLoopKey] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)
  const cancelledRef = useRef(false)

  useEffect(() => {
    cancelledRef.current = false
    const el = rootRef.current
    if (!el) return

    const run = async () => {
      while (!cancelledRef.current) {
        // Ringing
        setLines([])
        setPhase('ringing')
        await sleep(2300)
        if (cancelledRef.current) return

        // Conversation, typed line by line
        setPhase('talking')
        for (const line of SCRIPT) {
          if (cancelledRef.current) return
          setLines((prev) => [...prev, { who: line.who, text: '', done: false }])
          const speed = line.who === 'amy' ? 20 : 32
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelledRef.current) return
            const slice = line.text.slice(0, i)
            setLines((prev) => {
              const next = [...prev]
              next[next.length - 1] = { ...next[next.length - 1], text: slice }
              return next
            })
            await sleep(speed)
          }
          setLines((prev) => {
            const next = [...prev]
            next[next.length - 1] = { ...next[next.length - 1], done: true }
            return next
          })
          await sleep(line.who === 'amy' ? 320 : 560)
        }
        if (cancelledRef.current) return

        // Booking confirmation
        setPhase('booked')
        await sleep(4600)
        if (cancelledRef.current) return

        // Fade out and restart
        setPhase('fading')
        await sleep(800)
        setLoopKey((k) => k + 1)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true
          run()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)

    return () => {
      cancelledRef.current = true
      io.disconnect()
    }
  }, [])

  const talking = phase === 'talking' || phase === 'booked'

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden rounded-2xl border border-cream/10 bg-navy-deep shadow-[0_40px_80px_-24px_rgba(12,15,36,0.55)] transition-opacity duration-700 ${
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/80">
            Live demo
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
          Window World · Atlantic City
        </span>
      </div>

      {/* Call area */}
      <div key={loopKey} className="px-5 pb-5 pt-5 md:px-6">
        {phase === 'ringing' ? (
          <div className="flex min-h-[288px] flex-col items-center justify-center gap-5">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-amber/30 [animation:ring-pulse_1.6s_ease-out_infinite]" />
              <span className="absolute inset-0 rounded-full bg-amber/20 [animation:ring-pulse_1.6s_ease-out_0.5s_infinite]" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber text-navy-ink">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
            </div>
            <div className="text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">
                Incoming call
              </p>
              <p className="mt-1 font-serif text-2xl italic text-cream">9:47 PM</p>
            </div>
          </div>
        ) : (
          <div className="min-h-[288px] space-y-3.5 font-mono text-[13px] leading-relaxed">
            {lines.map((line, i) => (
              <div key={i} className="grid grid-cols-[52px_1fr] gap-3">
                <span
                  className={`pt-px text-[10px] uppercase tracking-[0.18em] ${
                    line.who === 'amy' ? 'text-amber' : 'text-cream/40'
                  }`}
                >
                  {line.who === 'amy' ? 'Amy' : 'Caller'}
                </span>
                <p className={`${line.who === 'amy' ? 'text-cream' : 'text-cream/60'} ${!line.done ? 'caret' : ''}`}>
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Waveform + status */}
        <div
          className={`mt-5 flex items-center gap-4 border-t border-cream/10 pt-4 ${
            talking ? 'wave-live' : ''
          }`}
        >
          <div className="flex h-6 items-center gap-[3px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="wave-bar block h-6 w-[3px] rounded-full bg-amber"
                style={{ animationDelay: `${(i % 8) * 0.11}s`, animationDuration: `${0.7 + (i % 5) * 0.09}s` }}
              />
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/50">
            {phase === 'ringing'
              ? 'One ring…'
              : phase === 'booked'
                ? 'Booked · calendar updated'
                : 'Amy is answering'}
          </p>
        </div>

        {/* Booking confirmation */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-ora ${
            phase === 'booked' ? 'mt-4 max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="rounded-lg border-l-2 border-amber bg-cream/5 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
              ✓ Booked — Thu 10:00 AM
            </p>
            <p className="mt-1.5 text-sm text-cream/85">Free in-home measure · 3×5 ft window</p>
            <p className="mt-1 font-mono text-[11px] text-cream/45">
              → Confirmation text sent to the caller
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
