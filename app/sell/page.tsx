'use client'
import { useState } from 'react'

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div>
      <section className="bg-brand-navy text-white">
        <div className="container-page py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold">Sell with VL & MO</h1>
            <p className="mt-4 text-white/85 max-w-prose">
              Our agents deliver more than a sold sticker — they deliver confidence. Get a free appraisal and a tailored marketing plan.
            </p>
            <ul className="mt-6 space-y-2 text-white/90">
              <li>✓ Free, no-obligation property appraisal</li>
              <li>✓ Transparent fee structure — no surprises</li>
              <li>✓ Hand-picked photographers, stylists and copywriters</li>
              <li>✓ Nationwide PNG buyer database</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 text-brand-navy shadow-lg">
            <h2 className="text-xl font-semibold">Request a free appraisal</h2>
            {submitted ? (
              <p className="mt-6 text-brand-green">Thanks — one of our agents will be in touch within 24 hours.</p>
            ) : (
              <form className="mt-4 grid grid-cols-1 gap-3" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                <input required placeholder="Full name" className="px-4 py-3 rounded border border-gray-300" />
                <input required type="email" placeholder="Email" className="px-4 py-3 rounded border border-gray-300" />
                <input required type="tel" placeholder="Phone" className="px-4 py-3 rounded border border-gray-300" />
                <input required placeholder="Property address" className="px-4 py-3 rounded border border-gray-300" />
                <textarea placeholder="Tell us about your property" className="px-4 py-3 rounded border border-gray-300" rows={3} />
                <button className="btn-gold">Request appraisal</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-14 grid md:grid-cols-3 gap-8">
        {[
          { t: '1. Free appraisal', d: 'We meet on-site, understand your goals and provide a transparent market appraisal.' },
          { t: '2. Tailored marketing', d: 'Photography, floor plans, copy and campaigns that showcase your home at its best.' },
          { t: '3. Sold — your way', d: 'Private sale, auction or expressions of interest — we recommend what’s right for you.' },
        ].map((s) => (
          <div key={s.t} className="bg-white rounded border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-brand-navy">{s.t}</h3>
            <p className="text-gray-700 mt-2">{s.d}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
