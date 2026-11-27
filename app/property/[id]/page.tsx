'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { useSiteData, formatPrice } from '@/lib/store'

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data, ready } = useSiteData()
  const [active, setActive] = useState(0)
  const [enquired, setEnquired] = useState(false)

  const p = data.properties.find((x) => x.id === id)
  if (ready && !p) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-semibold text-brand-navy">Property not found</h1>
        <p className="text-gray-600 mt-2">It may have been sold, leased or removed.</p>
        <button onClick={() => router.push('/buy')} className="btn-primary mt-6">Back to listings</button>
      </div>
    )
  }
  if (!p) return <div className="container-page py-20 text-center text-gray-500">Loading…</div>

  return (
    <div>
      {/* Gallery */}
      <section className="bg-black">
        <div className="container-page py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="md:col-span-3 aspect-[16/10] bg-gray-900 overflow-hidden rounded">
              <img src={p.images[active]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 md:grid-cols-1 gap-2">
              {p.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-[4/3] md:aspect-video bg-gray-800 overflow-hidden rounded border-2 ${i === active ? 'border-brand-gold' : 'border-transparent'}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-page py-10 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <span className={`chip ${p.listing === 'sale' ? 'bg-brand-gold text-brand-navy' : 'bg-brand-green text-white'}`}>
            {p.listing === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy">{p.title}</h1>
          <p className="text-gray-700 mt-1">{p.address}, {p.suburb} {p.state} {p.postcode}</p>
          <p className="mt-4 text-3xl font-bold text-brand-navy">{formatPrice(p.price, p.listing, p.priceLabel)}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-gray-800">
            <span>🛏️ {p.bedrooms} Bed</span>
            <span>🛁 {p.bathrooms} Bath</span>
            <span>🚗 {p.carSpaces} Car</span>
            {p.landSize && <span>📐 {p.landSize} m²</span>}
            <span>🏠 {p.type}</span>
          </div>

          <h2 className="mt-8 text-2xl font-semibold text-brand-navy">Property description</h2>
          <p className="mt-3 text-gray-800 whitespace-pre-line leading-relaxed">{p.description}</p>

          <h2 className="mt-8 text-2xl font-semibold text-brand-navy">Features</h2>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-800">
            <li>• {p.bedrooms} spacious bedrooms</li>
            <li>• {p.bathrooms} well-appointed bathrooms</li>
            <li>• Secure parking for {p.carSpaces}</li>
            <li>• Close to transport, cafes & schools</li>
            <li>• Energy-efficient appliances</li>
            <li>• Low-maintenance landscaping</li>
          </ul>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-brand-navy">Location</h2>
            <div className="mt-3 aspect-[16/8] rounded overflow-hidden border">
              <iframe
                title="Map"
                className="w-full h-full"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=144.8,-37.9,145.1,-37.7&layer=mapnik&marker=-37.81,144.96`}
              />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-5">
            <p className="text-sm text-gray-500">Listed by</p>
            <p className="mt-1 text-lg font-semibold text-brand-navy">{p.agentName}</p>
            <p className="text-sm text-gray-700">{p.agentPhone}</p>
            <p className="text-sm text-gray-700">{p.agentEmail}</p>
          </div>

          <div className="bg-brand-cream rounded-lg p-5 border border-gray-100">
            <h3 className="font-semibold text-brand-navy">Enquire about this property</h3>
            {enquired ? (
              <p className="mt-4 text-brand-green">Thanks — the agent will be in touch soon.</p>
            ) : (
              <form className="mt-4 grid gap-2" onSubmit={(e) => { e.preventDefault(); setEnquired(true) }}>
                <input required placeholder="Full name" className="px-3 py-2 rounded border" />
                <input required type="email" placeholder="Email" className="px-3 py-2 rounded border" />
                <input placeholder="Phone (optional)" className="px-3 py-2 rounded border" />
                <textarea placeholder="Your message" rows={3} className="px-3 py-2 rounded border" />
                <button className="btn-primary">Send enquiry</button>
              </form>
            )}
          </div>

          <Link href={p.listing === 'sale' ? '/buy' : '/rent'} className="block text-center btn-outline">
            ← Back to listings
          </Link>
        </aside>
      </section>
    </div>
  )
}
