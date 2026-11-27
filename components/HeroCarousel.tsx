'use client'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import type { HeroSlide } from '@/lib/types'
import SearchBar from './SearchBar'

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 5500)
    return () => clearInterval(id)
  }, [slides.length])

  if (!slides.length) return null
  const s = slides[i]

  return (
    <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </div>
      ))}
      <div className="relative z-10 container-page h-full flex flex-col justify-end pb-10">
        <div className="max-w-2xl text-white">
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight drop-shadow">
            {s.headline}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/95 drop-shadow">{s.subhead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={s.ctaHref} className="btn-gold">{s.ctaText}</Link>
            <Link href="/sell" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-brand-navy">Free Appraisal</Link>
          </div>
        </div>

        <div className="mt-8">
          <Suspense fallback={<div className="bg-white rounded-lg p-4">Loading search…</div>}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex items-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${idx === i ? 'bg-brand-gold w-8' : 'bg-white/60 w-2'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
