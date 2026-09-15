const TRADES = [
  { name: 'Windows & Doors', note: 'Books free measures, declines jobs you don’t do' },
  { name: 'Plumbing', note: 'Triages emergencies, finds the shut-off first' },
  { name: 'HVAC', note: 'Seasonal rushes answered on ring one' },
  { name: 'Electrical', note: 'Panels, outages, estimates — booked' },
  { name: 'Handyman', note: 'Small jobs scheduled without phone tag' },
  { name: 'Pest Control', note: 'Calm answers for panicked callers' },
  { name: 'Salons & Spas', note: 'Appointments while your hands are full' },
  { name: 'Auto Repair', note: 'Drop-offs, quotes, and status calls handled' },
  { name: 'Landscaping', note: 'Seasonal quotes booked from the truck' },
  { name: 'Restaurants & Retail', note: 'Hours, reservations, and orders — answered' },
]

export default function Trades() {
  return (
    <section id="trades" className="relative border-t border-navy/10 py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        {/* Sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.25em] text-navy/55">
            Built for the trades
          </p>
          <h2
            data-reveal
            className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl"
          >
            She already speaks <em className="italic text-amber">your</em> business.
          </h2>
          <p data-reveal className="mt-6 max-w-sm leading-relaxed text-navy/70">
            Each trade gets its own trained voice — your services, your pricing logic, your
            calendar. She knows what you do, and politely declines what you don’t.
          </p>
        </div>

        {/* Editorial list */}
        <div>
          {TRADES.map((t, i) => (
            <div
              key={t.name}
              data-reveal
              className="group hairline-t flex cursor-default items-baseline gap-6 py-5 transition-all duration-500 hover:bg-navy/[0.04] md:gap-10"
            >
              <span className="font-mono text-xs text-navy/40 transition-colors duration-500 group-hover:text-amber">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-2xl font-medium tracking-tight transition-transform duration-500 ease-ora group-hover:translate-x-2 md:text-4xl">
                {t.name}
              </h3>
              <p className="ml-auto hidden max-w-[220px] text-right text-sm text-navy/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                {t.note}
              </p>
            </div>
          ))}
          <div className="hairline-t" />
          <p data-reveal className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/45">
            Don’t see your trade? If it answers a phone, we can train it.
          </p>
        </div>
      </div>
    </section>
  )
}
