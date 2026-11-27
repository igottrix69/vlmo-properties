'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar({ defaultListing = 'sale' as 'sale' | 'rent' }) {
  const router = useRouter()
  const params = useSearchParams()
  const [listing, setListing] = useState<'sale' | 'rent'>(defaultListing)
  const [q, setQ] = useState(params?.get('q') ?? '')
  const [minBeds, setMinBeds] = useState(params?.get('beds') ?? '')
  const [maxPrice, setMaxPrice] = useState(params?.get('max') ?? '')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (minBeds) sp.set('beds', minBeds)
    if (maxPrice) sp.set('max', maxPrice)
    router.push(`/${listing === 'sale' ? 'buy' : 'rent'}?${sp.toString()}`)
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-lg shadow-lg p-3 md:p-4">
      <div className="flex items-center gap-2 mb-3">
        {(['sale', 'rent'] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setListing(l)}
            className={`px-4 py-2 text-sm font-semibold rounded ${
              listing === l ? 'bg-brand-navy text-white' : 'bg-gray-100 text-brand-navy hover:bg-gray-200'
            }`}
          >
            {l === 'sale' ? 'Buy' : 'Rent'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Suburb, address, postcode or keyword"
          className="md:col-span-6 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-navy"
        />
        <select
          value={minBeds}
          onChange={(e) => setMinBeds(e.target.value)}
          className="md:col-span-2 px-3 py-3 border border-gray-300 rounded"
        >
          <option value="">Beds</option>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select>
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="md:col-span-2 px-3 py-3 border border-gray-300 rounded"
        >
          <option value="">Max price</option>
          {listing === 'sale'
            ? [500000, 750000, 1000000, 1500000, 2000000, 3000000].map((n) => (
                <option key={n} value={n}>K{(n / 1000).toFixed(0)}k</option>
              ))
            : [800, 1500, 2500, 3500, 5000, 7500].map((n) => (
                <option key={n} value={n}>K{n}/wk</option>
              ))}
        </select>
        <button className="md:col-span-2 btn-gold text-base py-3">Search</button>
      </div>
    </form>
  )
}
