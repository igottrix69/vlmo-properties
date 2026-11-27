export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <h1 className="font-display text-4xl font-bold text-brand-navy">About VL & MO Properties</h1>
      <p className="mt-4 text-gray-700 max-w-3xl">
        VL & MO Properties is an independent Papua New Guinea real estate agency built on
        three values: <strong>Trust</strong>, <strong>Transparency</strong> and <strong>Opportunity</strong>.
        From Port Moresby to Lae and the Highlands, we help clients buy, sell, rent and
        invest with the confidence that comes from clear advice and honest local knowledge.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {[
          { t: 'Our story', d: 'Founded by PNG-based agents who believe property is personal, we combine deep local knowledge with international standards.' },
          { t: 'Our people', d: 'Qualified agents, property managers and marketing specialists who put your goals first.' },
          { t: 'Our results', d: 'Hundreds of satisfied families across NCD, Morobe and the Highlands.' },
        ].map((b) => (
          <div key={b.t} className="bg-white border border-gray-100 shadow-sm rounded p-6">
            <h3 className="font-semibold text-brand-navy text-lg">{b.t}</h3>
            <p className="mt-2 text-gray-700">{b.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-brand-cream rounded-lg p-8">
        <h2 className="font-display text-2xl font-bold text-brand-navy">Meet our agents</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: 'Olivia Kila', r: 'Director — Sales', p: '+675 7123 4567' },
            { n: 'Marcus Omaro', r: 'Senior Sales Agent', p: '+675 7221 1099' },
            { n: 'Priya Natera', r: 'Head of Property Management', p: '+675 7332 2211' },
          ].map((a) => (
            <div key={a.n} className="bg-white rounded border border-gray-100 p-5 flex gap-4 items-center">
              <div className="w-14 h-14 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center">
                {a.n.split(' ').map((s) => s[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-brand-navy">{a.n}</p>
                <p className="text-sm text-gray-600">{a.r}</p>
                <p className="text-sm text-gray-800 mt-1">{a.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
