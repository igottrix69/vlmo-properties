'use client'
import { useState } from 'react'
import { useSiteData } from '@/lib/store'

export default function ContactPage() {
  const { data } = useSiteData()
  const [sent, setSent] = useState(false)
  return (
    <div className="container-page py-12 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="font-display text-4xl font-bold text-brand-navy">Contact us</h1>
        <p className="mt-3 text-gray-700">We’d love to help. Call, email or send us a message.</p>
        <div className="mt-6 space-y-2 text-gray-800">
          <p><strong>Office:</strong> {data.contactAddress}</p>
          <p><strong>Phone:</strong> {data.contactPhone}</p>
          <p><strong>Email:</strong> {data.contactEmail}</p>
          <p><strong>Hours:</strong> Mon–Fri 9am–6pm · Sat 10am–3pm</p>
        </div>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Send a message</h2>
        {sent ? (
          <p className="mt-6 text-brand-green">Thanks — we will reply within one business day.</p>
        ) : (
          <form className="mt-4 grid grid-cols-1 gap-3" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            <input required placeholder="Full name" className="px-4 py-3 rounded border border-gray-300" />
            <input required type="email" placeholder="Email" className="px-4 py-3 rounded border border-gray-300" />
            <input placeholder="Phone (optional)" className="px-4 py-3 rounded border border-gray-300" />
            <textarea required placeholder="How can we help?" rows={5} className="px-4 py-3 rounded border border-gray-300" />
            <button className="btn-primary">Send message</button>
          </form>
        )}
      </div>
    </div>
  )
}
