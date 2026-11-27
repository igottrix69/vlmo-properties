'use client'
import type { Ad } from '@/lib/types'

export default function AdBanner({ ads, slot, className = '' }: { ads: Ad[]; slot: Ad['slot']; className?: string }) {
  const active = ads.filter((a) => a.active && a.slot === slot)
  if (!active.length) return null
  return (
    <div className={className}>
      {active.map((a) => (
        <a key={a.id} href={a.href} target="_blank" rel="noopener noreferrer" className="block relative group">
          <span className="absolute top-2 right-2 z-10 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded uppercase tracking-wide">Ad</span>
          <img src={a.imageUrl} alt={a.alt} className="w-full h-auto rounded-md border border-gray-200 group-hover:opacity-95" />
        </a>
      ))}
    </div>
  )
}
