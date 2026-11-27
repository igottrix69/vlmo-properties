'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useSiteData } from '@/lib/store'

export default function Footer() {
  const { data } = useSiteData()
  return (
    <footer className="bg-brand-navy text-white mt-16">
      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Image src="/logo.webp" alt="VL & MO Properties" width={160} height={96} className="h-16 w-auto bg-white rounded p-2" />
          <p className="mt-4 text-sm text-white/80">Trust. Transparency. Opportunity.</p>
          <p className="mt-3 text-sm text-white/80">Buy · Sell · Rent · Invest</p>
        </div>
        <div>
          <h4 className="font-semibold text-brand-gold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/buy" className="hover:text-brand-gold">Buy a property</Link></li>
            <li><Link href="/rent" className="hover:text-brand-gold">Rent a property</Link></li>
            <li><Link href="/sell" className="hover:text-brand-gold">Sell with us</Link></li>
            <li><Link href="/about" className="hover:text-brand-gold">About us</Link></li>
            <li><Link href="/contact" className="hover:text-brand-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-gold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li>{data.contactAddress}</li>
            <li>{data.contactPhone}</li>
            <li>{data.contactEmail}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-gold mb-3">Stay in touch</h4>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thanks! We will be in touch.') }} className="flex flex-col gap-2">
            <input type="email" required placeholder="Your email" className="px-3 py-2 rounded text-brand-navy" />
            <button className="btn-gold">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-4 text-xs text-white/60 flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} VL & MO Properties. All rights reserved.</span>
          <span>Privacy · Terms · Agent Login</span>
        </div>
      </div>
    </footer>
  )
}
