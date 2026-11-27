'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/buy', label: 'Buy' },
  { href: '/rent', label: 'Rent' },
  { href: '/sell', label: 'Sell' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="VL & MO Properties home">
          <Image
            src="/logo.webp"
            alt="VL & MO Properties"
            width={160}
            height={96}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.href || (n.href !== '/' && pathname?.startsWith(n.href))
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                  active
                    ? 'text-brand-gold'
                    : 'text-brand-navy hover:text-brand-gold'
                }`}
              >
                {n.label}
              </Link>
            )
          })}
          <Link
            href="/admin"
            className="ml-2 px-4 py-2 text-sm font-semibold rounded bg-brand-navy text-white hover:bg-brand-navyDark"
          >
            Admin
          </Link>
        </nav>

        <button
          aria-label="Menu"
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container-page py-3 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b text-brand-navy font-semibold"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="py-3 text-brand-gold font-semibold"
            >
              Admin login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
