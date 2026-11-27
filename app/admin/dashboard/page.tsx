'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAuthed, setAuthed, useSiteData } from '@/lib/store'
import type { Ad, HeroSlide, Property } from '@/lib/types'

type Tab = 'properties' | 'hero' | 'ads' | 'contact' | 'security'

export default function Dashboard() {
  const router = useRouter()
  const { data, update, reset, ready } = useSiteData()
  const [tab, setTab] = useState<Tab>('properties')
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (!isAuthed()) router.replace('/admin')
    else setAuthReady(true)
  }, [router])

  if (!authReady || !ready) return <div className="container-page py-20">Loading…</div>

  const logout = () => { setAuthed(false); router.replace('/admin') }

  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-navy">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm">Edit everything you see on the website.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" target="_blank" className="btn-outline">View site</Link>
          <button onClick={logout} className="btn-primary">Log out</button>
        </div>
      </div>

      <div className="mt-6 border-b border-gray-200">
        <nav className="flex gap-1 flex-wrap">
          {([
            ['properties', 'Properties'],
            ['hero', 'Homepage slides'],
            ['ads', 'Advertisements'],
            ['contact', 'Contact details'],
            ['security', 'PIN & Data'],
          ] as [Tab, string][]).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-2 text-sm font-semibold rounded-t ${
                tab === k ? 'bg-brand-navy text-white' : 'text-brand-navy hover:bg-gray-100'
              }`}
            >
              {l}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {tab === 'properties' && <PropertiesTab data={data} update={update} />}
        {tab === 'hero' && <HeroTab data={data} update={update} />}
        {tab === 'ads' && <AdsTab data={data} update={update} />}
        {tab === 'contact' && <ContactTab data={data} update={update} />}
        {tab === 'security' && <SecurityTab data={data} update={update} reset={reset} />}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-brand-navy">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

function PropertiesTab({ data, update }: { data: ReturnType<typeof useSiteData>['data']; update: ReturnType<typeof useSiteData>['update'] }) {
  const [editing, setEditing] = useState<Property | null>(null)
  const newProperty = (): Property => ({
    id: 'p' + Date.now(),
    title: 'New property',
    address: '',
    suburb: '',
    state: 'VIC',
    postcode: '',
    price: 0,
    listing: 'sale',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    description: '',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    featured: false,
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    dateAdded: new Date().toISOString().slice(0, 10),
  })

  const save = (p: Property) => {
    update((d) => {
      const i = d.properties.findIndex((x) => x.id === p.id)
      const next = [...d.properties]
      if (i >= 0) next[i] = p; else next.unshift(p)
      return { ...d, properties: next }
    })
    setEditing(null)
  }

  const del = (id: string) => {
    if (!confirm('Delete this property? This cannot be undone.')) return
    update((d) => ({ ...d, properties: d.properties.filter((p) => p.id !== id) }))
  }

  const toggleFeatured = (id: string) => {
    update((d) => ({
      ...d,
      properties: d.properties.map((p) => p.id === id ? { ...p, featured: !p.featured } : p),
    }))
  }

  if (editing) return <PropertyEditor initial={editing} onCancel={() => setEditing(null)} onSave={save} />

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-brand-navy">Properties ({data.properties.length})</h2>
        <button onClick={() => setEditing(newProperty())} className="btn-gold">+ Add property</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white border border-gray-200 rounded">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Suburb</th>
              <th className="p-3">Type</th>
              <th className="p-3">Listing</th>
              <th className="p-3">Price</th>
              <th className="p-3">Featured</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.properties.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium text-brand-navy">{p.title}</td>
                <td className="p-3">{p.suburb}</td>
                <td className="p-3">{p.type}</td>
                <td className="p-3">{p.listing === 'sale' ? 'Sale' : 'Rent'}</td>
                <td className="p-3">${p.price.toLocaleString()}</td>
                <td className="p-3">
                  <input type="checkbox" checked={!!p.featured} onChange={() => toggleFeatured(p.id)} />
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button onClick={() => setEditing(p)} className="text-brand-navy font-semibold hover:underline mr-3">Edit</button>
                  <button onClick={() => del(p.id)} className="text-red-600 font-semibold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PropertyEditor({ initial, onCancel, onSave }: { initial: Property; onCancel: () => void; onSave: (p: Property) => void }) {
  const [p, setP] = useState<Property>(initial)
  const set = <K extends keyof Property>(k: K, v: Property[K]) => setP((prev) => ({ ...prev, [k]: v }))
  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <h2 className="text-xl font-semibold text-brand-navy">{initial.title === 'New property' ? 'Add' : 'Edit'} property</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Title"><input className="w-full px-3 py-2 border rounded" value={p.title} onChange={(e) => set('title', e.target.value)} /></Field>
        <Field label="Address"><input className="w-full px-3 py-2 border rounded" value={p.address} onChange={(e) => set('address', e.target.value)} /></Field>
        <Field label="Suburb"><input className="w-full px-3 py-2 border rounded" value={p.suburb} onChange={(e) => set('suburb', e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="State"><input className="w-full px-3 py-2 border rounded" value={p.state} onChange={(e) => set('state', e.target.value)} /></Field>
          <Field label="Postcode"><input className="w-full px-3 py-2 border rounded" value={p.postcode} onChange={(e) => set('postcode', e.target.value)} /></Field>
        </div>
        <Field label="Listing">
          <select className="w-full px-3 py-2 border rounded" value={p.listing} onChange={(e) => set('listing', e.target.value as any)}>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </Field>
        <Field label="Type">
          <select className="w-full px-3 py-2 border rounded" value={p.type} onChange={(e) => set('type', e.target.value as any)}>
            {['House', 'Apartment', 'Townhouse', 'Land', 'Acreage', 'Unit'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Price (number only)"><input type="number" className="w-full px-3 py-2 border rounded" value={p.price} onChange={(e) => set('price', parseInt(e.target.value || '0', 10))} /></Field>
        <Field label='Price label (optional, e.g. "$650 per week" or "Contact Agent")'>
          <input className="w-full px-3 py-2 border rounded" value={p.priceLabel ?? ''} onChange={(e) => set('priceLabel', e.target.value || undefined)} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Beds"><input type="number" className="w-full px-3 py-2 border rounded" value={p.bedrooms} onChange={(e) => set('bedrooms', parseInt(e.target.value || '0', 10))} /></Field>
          <Field label="Baths"><input type="number" className="w-full px-3 py-2 border rounded" value={p.bathrooms} onChange={(e) => set('bathrooms', parseInt(e.target.value || '0', 10))} /></Field>
          <Field label="Cars"><input type="number" className="w-full px-3 py-2 border rounded" value={p.carSpaces} onChange={(e) => set('carSpaces', parseInt(e.target.value || '0', 10))} /></Field>
        </div>
        <Field label="Land size (sqm, optional)"><input type="number" className="w-full px-3 py-2 border rounded" value={p.landSize ?? ''} onChange={(e) => set('landSize', e.target.value ? parseInt(e.target.value, 10) : undefined)} /></Field>

        <div className="md:col-span-2">
          <Field label="Description"><textarea rows={5} className="w-full px-3 py-2 border rounded" value={p.description} onChange={(e) => set('description', e.target.value)} /></Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Image URLs (one per line)">
            <textarea rows={4} className="w-full px-3 py-2 border rounded font-mono text-xs" value={p.images.join('\n')} onChange={(e) => set('images', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} />
          </Field>
        </div>

        <Field label="Agent name"><input className="w-full px-3 py-2 border rounded" value={p.agentName} onChange={(e) => set('agentName', e.target.value)} /></Field>
        <Field label="Agent phone"><input className="w-full px-3 py-2 border rounded" value={p.agentPhone} onChange={(e) => set('agentPhone', e.target.value)} /></Field>
        <Field label="Agent email"><input className="w-full px-3 py-2 border rounded" value={p.agentEmail} onChange={(e) => set('agentEmail', e.target.value)} /></Field>
        <Field label="Date added"><input type="date" className="w-full px-3 py-2 border rounded" value={p.dateAdded} onChange={(e) => set('dateAdded', e.target.value)} /></Field>
        <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy mt-2">
          <input type="checkbox" checked={!!p.featured} onChange={(e) => set('featured', e.target.checked)} />
          Show as Featured on homepage
        </label>
      </div>

      <div className="mt-6 flex gap-3 justify-end">
        <button onClick={onCancel} className="btn-outline">Cancel</button>
        <button onClick={() => onSave(p)} className="btn-primary">Save property</button>
      </div>
    </div>
  )
}

function HeroTab({ data, update }: { data: ReturnType<typeof useSiteData>['data']; update: ReturnType<typeof useSiteData>['update'] }) {
  const addSlide = () => update((d) => ({
    ...d,
    hero: [...d.hero, {
      id: 'h' + Date.now(),
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
      headline: 'New slide headline',
      subhead: 'Short supporting text goes here.',
      ctaText: 'Learn more',
      ctaHref: '/buy',
    }],
  }))
  const upd = (id: string, patch: Partial<HeroSlide>) => update((d) => ({
    ...d, hero: d.hero.map((s) => s.id === id ? { ...s, ...patch } : s),
  }))
  const del = (id: string) => update((d) => ({ ...d, hero: d.hero.filter((s) => s.id !== id) }))
  const move = (id: string, dir: -1 | 1) => update((d) => {
    const i = d.hero.findIndex((s) => s.id === id)
    if (i < 0) return d
    const j = i + dir
    if (j < 0 || j >= d.hero.length) return d
    const next = [...d.hero]
    ;[next[i], next[j]] = [next[j], next[i]]
    return { ...d, hero: next }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-brand-navy">Homepage carousel ({data.hero.length})</h2>
        <button onClick={addSlide} className="btn-gold">+ Add slide</button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Slides rotate on the homepage hero. Reorder with ↑/↓.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.hero.map((s) => (
          <div key={s.id} className="bg-white border rounded p-4">
            <div className="aspect-[16/9] overflow-hidden rounded bg-gray-100 mb-3"><img src={s.imageUrl} className="w-full h-full object-cover" alt="" /></div>
            <Field label="Image URL"><input className="w-full px-3 py-2 border rounded" value={s.imageUrl} onChange={(e) => upd(s.id, { imageUrl: e.target.value })} /></Field>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field label="Headline"><input className="w-full px-3 py-2 border rounded" value={s.headline} onChange={(e) => upd(s.id, { headline: e.target.value })} /></Field>
              <Field label="Subhead"><input className="w-full px-3 py-2 border rounded" value={s.subhead} onChange={(e) => upd(s.id, { subhead: e.target.value })} /></Field>
              <Field label="Button text"><input className="w-full px-3 py-2 border rounded" value={s.ctaText} onChange={(e) => upd(s.id, { ctaText: e.target.value })} /></Field>
              <Field label="Button link"><input className="w-full px-3 py-2 border rounded" value={s.ctaHref} onChange={(e) => upd(s.id, { ctaHref: e.target.value })} /></Field>
            </div>
            <div className="mt-3 flex gap-2 justify-end">
              <button onClick={() => move(s.id, -1)} className="px-3 py-1 rounded border">↑</button>
              <button onClick={() => move(s.id, 1)} className="px-3 py-1 rounded border">↓</button>
              <button onClick={() => del(s.id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdsTab({ data, update }: { data: ReturnType<typeof useSiteData>['data']; update: ReturnType<typeof useSiteData>['update'] }) {
  const add = () => update((d) => ({
    ...d,
    ads: [...d.ads, {
      id: 'a' + Date.now(),
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
      href: '#',
      alt: 'New advertisement',
      slot: 'home-banner',
      active: true,
    } as Ad],
  }))
  const upd = (id: string, patch: Partial<Ad>) => update((d) => ({ ...d, ads: d.ads.map((a) => a.id === id ? { ...a, ...patch } : a) }))
  const del = (id: string) => update((d) => ({ ...d, ads: d.ads.filter((a) => a.id !== id) }))

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-brand-navy">Advertisements ({data.ads.length})</h2>
        <button onClick={add} className="btn-gold">+ Add ad</button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Place banners on the homepage, inline between sections, in search-results pages, or in the sidebar. Toggle Active to show/hide.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.ads.map((a) => (
          <div key={a.id} className="bg-white border rounded p-4">
            <div className="aspect-[16/5] overflow-hidden rounded bg-gray-100 mb-3"><img src={a.imageUrl} alt={a.alt} className="w-full h-full object-cover" /></div>
            <Field label="Image URL"><input className="w-full px-3 py-2 border rounded" value={a.imageUrl} onChange={(e) => upd(a.id, { imageUrl: e.target.value })} /></Field>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Field label="Link URL"><input className="w-full px-3 py-2 border rounded" value={a.href} onChange={(e) => upd(a.id, { href: e.target.value })} /></Field>
              <Field label="Alt text"><input className="w-full px-3 py-2 border rounded" value={a.alt} onChange={(e) => upd(a.id, { alt: e.target.value })} /></Field>
              <Field label="Placement slot">
                <select className="w-full px-3 py-2 border rounded" value={a.slot} onChange={(e) => upd(a.id, { slot: e.target.value as Ad['slot'] })}>
                  <option value="home-banner">Home — top banner</option>
                  <option value="home-mid">Home — mid banner</option>
                  <option value="results-top">Search results — top</option>
                  <option value="sidebar">Sidebar</option>
                </select>
              </Field>
              <label className="flex items-end gap-2 text-sm font-semibold text-brand-navy">
                <input type="checkbox" checked={a.active} onChange={(e) => upd(a.id, { active: e.target.checked })} /> Active
              </label>
            </div>
            <div className="mt-3 flex justify-end">
              <button onClick={() => del(a.id)} className="px-3 py-1 rounded border text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactTab({ data, update }: { data: ReturnType<typeof useSiteData>['data']; update: ReturnType<typeof useSiteData>['update'] }) {
  return (
    <div className="bg-white border rounded p-6 max-w-2xl">
      <h2 className="text-xl font-semibold text-brand-navy">Contact details</h2>
      <p className="text-sm text-gray-600">Shown in the footer and on the Contact page.</p>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Field label="Office address">
          <input className="w-full px-3 py-2 border rounded" value={data.contactAddress} onChange={(e) => update((d) => ({ ...d, contactAddress: e.target.value }))} />
        </Field>
        <Field label="Phone">
          <input className="w-full px-3 py-2 border rounded" value={data.contactPhone} onChange={(e) => update((d) => ({ ...d, contactPhone: e.target.value }))} />
        </Field>
        <Field label="Email">
          <input className="w-full px-3 py-2 border rounded" value={data.contactEmail} onChange={(e) => update((d) => ({ ...d, contactEmail: e.target.value }))} />
        </Field>
      </div>
    </div>
  )
}

function SecurityTab({ data, update, reset }: { data: ReturnType<typeof useSiteData>['data']; update: ReturnType<typeof useSiteData>['update']; reset: () => void }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [msg, setMsg] = useState('')

  const changePin = (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')
    if (current !== data.pin) { setMsg('Current PIN is incorrect.'); return }
    if (!/^\d{4,6}$/.test(next)) { setMsg('New PIN must be 4–6 digits.'); return }
    update((d) => ({ ...d, pin: next }))
    setMsg('PIN updated.')
    setCurrent(''); setNext('')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border rounded p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Change admin PIN</h2>
        <p className="text-sm text-gray-600 mt-1">PIN must be 4–6 digits.</p>
        <form onSubmit={changePin} className="mt-4 grid gap-3">
          <Field label="Current PIN"><input inputMode="numeric" maxLength={6} className="w-full px-3 py-2 border rounded tracking-widest text-lg" value={current} onChange={(e) => setCurrent(e.target.value.replace(/\D/g, ''))} /></Field>
          <Field label="New PIN (4–6 digits)"><input inputMode="numeric" maxLength={6} className="w-full px-3 py-2 border rounded tracking-widest text-lg" value={next} onChange={(e) => setNext(e.target.value.replace(/\D/g, ''))} /></Field>
          <button className="btn-primary">Update PIN</button>
          {msg && <p className="text-sm text-brand-navy">{msg}</p>}
        </form>
      </div>
      <div className="bg-white border rounded p-6">
        <h2 className="text-xl font-semibold text-brand-navy">Data</h2>
        <p className="text-sm text-gray-600 mt-1">Reset all site data (properties, slides, ads, contact, PIN) back to defaults.</p>
        <button
          className="btn-outline mt-4"
          onClick={() => { if (confirm('Reset ALL site data to defaults? Your PIN will revert to 0101.')) reset() }}
        >
          Reset to defaults
        </button>
      </div>
    </div>
  )
}
