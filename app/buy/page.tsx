'use client'
import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSiteData } from '@/lib/store'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import AdBanner from '@/components/AdBanner'

function BuyInner() {
  const { data } = useSiteData()
  const sp = useSearchParams()
  const q = (sp?.get('q') ?? '').toLowerCase()
  const beds = parseInt(sp?.get('beds') ?? '0', 10)
  const max = parseInt(sp?.get('max') ?? '0', 10)

  const list = useMemo(() => {
    return data.properties
      .filter((p) => p.listing === 'sale')
      .filter((p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.suburb.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.postcode.includes(q) ||
        p.state.toLowerCase().includes(q),
      )
      .filter((p) => (beds ? p.bedrooms >= beds : true))
      .filter((p) => (max ? p.price <= max : true))
  }, [data.properties, q, beds, max])

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl font-bold text-brand-navy">Properties for sale</h1>
      <p className="text-gray-600 mt-2">Browse homes, apartments, townhouses and land across Papua New Guinea.</p>

      <div className="mt-6">
        <SearchBar defaultListing="sale" />
      </div>

      <div className="mt-6">
        <AdBanner ads={data.ads} slot="results-top" />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-700">
        <span>{list.length} {list.length === 1 ? 'property' : 'properties'} found</span>
        <select className="px-3 py-2 border rounded">
          <option>Most recent</option>
          <option>Price (low to high)</option>
          <option>Price (high to low)</option>
          <option>Bedrooms</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => <PropertyCard key={p.id} p={p} />)}
          {!list.length && (
            <div className="col-span-full bg-white border border-gray-200 rounded p-10 text-center text-gray-600">
              No properties match your filters yet. Try broadening your search.
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <AdBanner ads={data.ads} slot="sidebar" />
          <div className="bg-brand-cream rounded-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-navy">Get property alerts</h4>
            <p className="text-sm text-gray-700 mt-1">Be the first to know when a matching home hits the market.</p>
            <input className="mt-3 w-full px-3 py-2 rounded border" placeholder="Your email" />
            <button className="btn-primary w-full mt-3">Create alert</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="container-page py-10">Loading…</div>}>
      <BuyInner />
    </Suspense>
  )
}
