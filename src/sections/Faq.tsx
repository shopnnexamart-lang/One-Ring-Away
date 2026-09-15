import { useState } from 'react'

const QA = [
  {
    q: 'Will my customers know it’s AI?',
    a: 'Most never ask. Amy speaks naturally, uses your company’s name, and knows your services. If a caller asks directly, she’s honest — and offers to connect them with you.',
  },
  {
    q: 'What happens in a real emergency?',
    a: 'She checks how serious it is first, then follows your rules: true emergencies ring straight through to your cell. Everything else gets booked or messaged — your call, literally.',
  },
  {
    q: 'Does it work with my calendar?',
    a: 'Yes. It connects to your Google Calendar, reads your real availability, and books appointments into open slots. Confirmations go out by text automatically.',
  },
  {
    q: 'I already have an answering service.',
    a: 'Then you’re paying per minute for someone reading a script in another state — who can’t see your calendar. Amy books the job on the call, for a flat monthly price.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative border-t border-navy/10 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.25em] text-navy/55">
            The questions every owner asks
          </p>
          <h2
            data-reveal
            className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl"
          >
            Fair questions. <em className="italic text-amber">Straight answers.</em>
          </h2>
        </div>

        <div>
          {QA.map((item, i) => (
            <div key={item.q} data-reveal className="hairline-t">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={open === i}
              >
                <span className="font-serif text-xl font-medium tracking-tight md:text-2xl">
                  {item.q}
                </span>
                <span
                  className={`font-mono text-amber transition-transform duration-500 ease-ora ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-500 ease-ora ${
                  open === i ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <p className="max-w-2xl overflow-hidden leading-relaxed text-navy/70">{item.a}</p>
              </div>
            </div>
          ))}
          <div className="hairline-t" />
        </div>
      </div>
    </section>
  )
}
