'use client'
import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSiteData } from '@/lib/store'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import AdBanner from '@/components/AdBanner'

function RentInner() {
  const { data } = useSiteData()
  const sp = useSearchParams()
  const q = (sp?.get('q') ?? '').toLowerCase()
  const beds = parseInt(sp?.get('beds') ?? '0', 10)
  const max = parseInt(sp?.get('max') ?? '0', 10)

  const list = useMemo(() => {
    return data.properties
      .filter((p) => p.listing === 'rent')
      .filter((p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.suburb.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.postcode.includes(q),
      )
      .filter((p) => (beds ? p.bedrooms >= beds : true))
      .filter((p) => (max ? p.price <= max : true))
  }, [data.properties, q, beds, max])

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl font-bold text-brand-navy">Properties for rent</h1>
      <p className="text-gray-600 mt-2">Find your next rental — shortlist, inspect and apply online.</p>

      <div className="mt-6">
        <SearchBar defaultListing="rent" />
      </div>

      <div className="mt-6">
        <AdBanner ads={data.ads} slot="results-top" />
      </div>

      <div className="mt-6 text-sm text-gray-700">{list.length} rentals available</div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => <PropertyCard key={p.id} p={p} />)}
          {!list.length && (
            <div className="col-span-full bg-white border border-gray-200 rounded p-10 text-center text-gray-600">
              No rentals match your filters.
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <AdBanner ads={data.ads} slot="sidebar" />
          <div className="bg-brand-cream rounded-lg p-5 border border-gray-100">
            <h4 className="font-semibold text-brand-navy">Tenant tips</h4>
            <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Have your ID, references and proof of income ready.</li>
              <li>Attend inspections early to beat the queue.</li>
              <li>Ask about pets, bond and lease length.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function RentPage() {
  return (
    <Suspense fallback={<div className="container-page py-10">Loading…</div>}>
      <RentInner />
    </Suspense>
  )
}
