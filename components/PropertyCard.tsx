'use client'
import Link from 'next/link'
import type { Property } from '@/lib/types'
import { formatPrice } from '@/lib/store'

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <Link href={`/property/${p.id}`} className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow border border-gray-100">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={p.images[0]}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`chip ${p.listing === 'sale' ? 'bg-brand-gold text-brand-navy' : 'bg-brand-green text-white'}`}>
            {p.listing === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
          {p.featured && <span className="chip bg-brand-navy text-white">Featured</span>}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xl font-bold text-brand-navy">{formatPrice(p.price, p.listing, p.priceLabel)}</p>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-1">{p.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">{p.address}, {p.suburb} {p.state} {p.postcode}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
          <span title="Bedrooms" className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4h1v8h-2v-2H3v2H1v-8h3zm2 0h12V7H6v4z"/></svg>
            {p.bedrooms}
          </span>
          <span title="Bathrooms" className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h3v6H4V5a3 3 0 0 1 3-3zm13 8H2v4a5 5 0 0 0 4 4.9V22h2v-3h8v3h2v-3.1A5 5 0 0 0 22 14v-4h-2z"/></svg>
            {p.bathrooms}
          </span>
          <span title="Car spaces" className="flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a1 1 0 0 1 1 1v6h-3v-2H6v2H3v-6a1 1 0 0 1 1-1h1zm2.1 0h9.8l-1-3H8.1l-1 3z"/></svg>
            {p.carSpaces}
          </span>
          {p.landSize ? (
            <span title="Land size" className="ml-auto text-xs text-gray-500">{p.landSize} m²</span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
