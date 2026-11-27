export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <h1 className="font-display text-4xl font-bold text-brand-navy">About VL & MO Properties</h1>
      <p className="mt-4 text-gray-700 max-w-3xl">
        VL & MO Properties is an independent Australian real estate agency built on three
        values: <strong>Trust</strong>, <strong>Transparency</strong> and <strong>Opportunity</strong>.
        We help clients buy, sell, rent and invest with the confidence that comes from clear
        advice and honest service.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {[
          { t: 'Our story', d: 'Founded by agents who believe property is personal, we combine local knowledge with national reach.' },
          { t: 'Our people', d: 'Qualified agents, property managers and marketing specialists who put your goals first.' },
          { t: 'Our results', d: 'Hundreds of satisfied families, record-setting sales and 5-star client reviews.' },
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
            { n: 'Olivia Chen', r: 'Director — Sales', p: '0412 345 678' },
            { n: 'Marcus O’Donnell', r: 'Senior Sales Agent', p: '0422 110 998' },
            { n: 'Priya Sharma', r: 'Head of Property Management', p: '0433 222 118' },
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
