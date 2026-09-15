const STATS = [
  { value: '<1', unit: 'ring', label: 'To answer, every time' },
  { value: '24/7', unit: '', label: 'Nights, weekends, holidays' },
  { value: '160+', unit: '', label: 'Automated checks before any change ships' },
  { value: '10+', unit: '', label: 'Trades with trained voices' },
]

export default function Proof() {
  return (
    <section className="relative bg-navy py-24 text-cream md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
          Already working in the wild
        </p>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2
              data-reveal
              className="font-serif text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl"
            >
              “Amy” is on the phones at{' '}
              <em className="italic text-amber">Window World of Atlantic City.</em>
            </h2>
            <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-cream/70">
              Our first pilot receptionist answers as Window World, books free in-home measures,
              politely turns away jobs the company doesn’t do — glass repair, other brands’ windows —
              and only transfers to a human when the caller asks for one. Real emergencies get judged
              on urgency and routed to the owner.
            </p>
            <p
              data-reveal
              className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/40"
            >
              Tested in live calls · Refined against real conversations
            </p>
          </div>

          <div className="grid content-center gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.label} data-reveal className="bg-navy p-7 md:p-8">
                <p className="font-mono text-4xl font-medium text-amber tabular-nums md:text-5xl">
                  {s.value}
                  {s.unit && (
                    <span className="ml-1 text-lg text-cream/60">{s.unit}</span>
                  )}
                </p>
                <p className="mt-3 text-sm leading-snug text-cream/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
