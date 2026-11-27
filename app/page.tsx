'use client'
import Link from 'next/link'
import { useSiteData } from '@/lib/store'
import HeroCarousel from '@/components/HeroCarousel'
import PropertyCard from '@/components/PropertyCard'
import AdBanner from '@/components/AdBanner'

export default function Home() {
  const { data } = useSiteData()
  const featured = data.properties.filter((p) => p.featured).slice(0, 6)
  const newListings = [...data.properties].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded)).slice(0, 8)
  const forRent = data.properties.filter((p) => p.listing === 'rent').slice(0, 4)

  return (
    <>
      <HeroCarousel slides={data.hero} />

      <section className="container-page mt-10">
        <AdBanner ads={data.ads} slot="home-banner" />
      </section>

      {/* Featured */}
      <section className="container-page mt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">Featured Properties</h2>
            <p className="text-gray-600 mt-1">Hand-picked by our agents from across the network.</p>
          </div>
          <Link href="/buy" className="hidden md:inline-flex btn-outline">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Why VL & MO */}
      <section className="mt-16 bg-brand-cream py-14">
        <div className="container-page grid md:grid-cols-3 gap-8">
          {[
            { t: 'Trust', d: 'Local experts who care about your outcome, not just the transaction.' },
            { t: 'Transparency', d: 'Clear process, honest advice and plain-English pricing — every step.' },
            { t: 'Opportunity', d: 'From first home to investment portfolio, we help you make the right move.' },
          ].map((v) => (
            <div key={v.t} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-gold mb-4 flex items-center justify-center text-brand-navy font-bold">✓</div>
              <h3 className="text-xl font-semibold text-brand-navy">{v.t}</h3>
              <p className="mt-2 text-gray-700">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-12">
        <AdBanner ads={data.ads} slot="home-mid" />
      </section>

      {/* New listings */}
      <section className="container-page mt-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl font-bold text-brand-navy">Just Listed</h2>
          <Link href="/buy" className="hidden md:inline-flex btn-outline">Browse all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newListings.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Rentals strip */}
      <section className="container-page mt-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl font-bold text-brand-navy">Rentals you’ll love</h2>
          <Link href="/rent" className="hidden md:inline-flex btn-outline">See rentals</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {forRent.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 bg-brand-navy text-white">
        <div className="container-page py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Thinking of selling?</h2>
            <p className="mt-3 text-white/85 max-w-prose">
              Our market experts will give you a free, no-obligation appraisal and an honest view of what your property is worth today.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/sell" className="btn-gold">Request appraisal</Link>
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">Talk to us</Link>
            </div>
          </div>
          <div className="bg-brand-navyDark rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-brand-gold">What your home could be worth</h3>
            <form className="mt-4 grid grid-cols-1 gap-3" onSubmit={(e) => { e.preventDefault(); alert('An agent will be in touch within 24 hours.') }}>
              <input required placeholder="Full name" className="px-4 py-3 rounded text-brand-navy" />
              <input required placeholder="Property address" className="px-4 py-3 rounded text-brand-navy" />
              <input required type="tel" placeholder="Phone" className="px-4 py-3 rounded text-brand-navy" />
              <button className="btn-gold">Get my appraisal</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
