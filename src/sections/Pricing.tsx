import { scrollTo } from '../lib/scrollBus'

const TIERS = [
  {
    name: 'After-Hours',
    price: 149,
    blurb: 'Nights, weekends & holidays covered while you sleep.',
    features: ['Answers every call after closing', 'Books into your calendar', 'Takes messages', 'Confirmation texts'],
    featured: false,
  },
  {
    name: 'Full 24/7',
    price: 299,
    blurb: 'Every call answered, around the clock.',
    features: [
      'Everything in After-Hours',
      'Daytime + overflow coverage',
      'Emergency routing to your cell',
      'Trained on your services & voice',
    ],
    featured: true,
  },
  {
    name: 'Growth',
    price: 499,
    blurb: 'For busy shops with more lines and more volume.',
    features: [
      'Everything in Full 24/7',
      'Multiple lines & locations',
      'Custom voice & call flows',
      'Priority support',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-navy/10 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Anchor */}
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.25em] text-navy/55">
            The math that decides it
          </p>
          <h2
            data-reveal
            className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl"
          >
            The average booked job is worth <em className="italic text-amber">$450.</em>
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-xl leading-relaxed text-navy/70">
            One recovered call a month pays for the whole thing. Everything after that is profit you
            used to hand to competitors.
          </p>
        </div>

        {/* Ascending staircase tiers */}
        <div className="mt-16 grid items-end gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              data-reveal
              className={`relative flex flex-col rounded-2xl p-8 transition-transform duration-500 ease-ora hover:-translate-y-2 md:p-9 ${
                t.featured
                  ? 'bg-navy text-cream shadow-[0_40px_80px_-24px_rgba(12,15,36,0.5)] md:-translate-y-6 md:hover:-translate-y-8'
                  : 'border border-navy/20 bg-beige-light/60'
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3.5 left-8 rounded-full bg-amber px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-ink">
                  Most chosen
                </span>
              )}
              <h3
                className={`font-mono text-[11px] uppercase tracking-[0.25em] ${
                  t.featured ? 'text-cream/60' : 'text-navy/55'
                }`}
              >
                {t.name}
              </h3>
              <p className="mt-5 font-serif text-6xl font-medium tracking-tight tabular-nums">
                ${t.price}
                <span className={`ml-2 font-mono text-xs uppercase tracking-[0.15em] ${t.featured ? 'text-cream/45' : 'text-navy/45'}`}>
                  /mo
                </span>
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${t.featured ? 'text-cream/70' : 'text-navy/65'}`}>
                {t.blurb}
              </p>
              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={`mt-0.5 ${t.featured ? 'text-amber' : 'text-amber'}`}>✓</span>
                    <span className={t.featured ? 'text-cream/85' : 'text-navy/80'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('#start')}
                className={`mt-9 rounded-full py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-[0.98] ${
                  t.featured
                    ? 'bg-amber text-navy-ink hover:bg-amber-soft'
                    : 'border border-navy/30 text-navy hover:bg-navy hover:text-cream'
                }`}
              >
                Start with {t.name}
              </button>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
          Pilot pricing — locked in for early customers, forever
        </p>
      </div>
    </section>
  )
}
