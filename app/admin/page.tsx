'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthed, setAuthed, useSiteData } from '@/lib/store'

export default function AdminLogin() {
  const router = useRouter()
  const { data, ready } = useSiteData()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthed()) router.replace('/admin/dashboard')
  }, [router])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    if (pin === data.pin) {
      setAuthed(true)
      router.replace('/admin/dashboard')
    } else {
      setError('Incorrect PIN. Try again.')
      setPin('')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-cream">
      <form onSubmit={submit} className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm">
        <h1 className="font-display text-2xl font-bold text-brand-navy text-center">Admin Login</h1>
        <p className="text-sm text-gray-600 text-center mt-1">Enter your PIN to manage the site.</p>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={pin}
          onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setError('') }}
          placeholder="••••"
          className="mt-6 w-full text-center tracking-[0.6em] text-2xl font-semibold px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-navy"
          autoFocus
        />
        {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
        <button className="btn-primary w-full mt-5">Enter</button>
        <p className="mt-4 text-xs text-gray-500 text-center">Default PIN: 0101 — change it in the dashboard.</p>
      </form>
    </div>
  )
}
