'use client'
import { useCallback, useEffect, useState } from 'react'
import type { SiteData } from './types'
import { defaultData } from './defaultData'

const KEY = 'vlmo-site-data-v1'

function readLocal(): SiteData {
  if (typeof window === 'undefined') return defaultData
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw) as SiteData
    // Shallow merge to tolerate schema updates
    return {
      ...defaultData,
      ...parsed,
      properties: parsed.properties ?? defaultData.properties,
      hero: parsed.hero ?? defaultData.hero,
      ads: parsed.ads ?? defaultData.ads,
    }
  } catch {
    return defaultData
  }
}

function writeLocal(data: SiteData) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data))
    window.dispatchEvent(new Event('vlmo-data-changed'))
  } catch {}
}

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaultData)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setData(readLocal())
    setReady(true)
    const onChange = () => setData(readLocal())
    window.addEventListener('vlmo-data-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('vlmo-data-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const update = useCallback((updater: (d: SiteData) => SiteData) => {
    setData((prev) => {
      const next = updater(prev)
      writeLocal(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    if (typeof window !== 'undefined') window.localStorage.removeItem(KEY)
    setData(defaultData)
    window.dispatchEvent(new Event('vlmo-data-changed'))
  }, [])

  return { data, ready, update, reset }
}

// Admin auth helpers (sessionStorage)
const AUTH_KEY = 'vlmo-admin-auth'
export function isAuthed() {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(AUTH_KEY) === '1'
}
export function setAuthed(v: boolean) {
  if (typeof window === 'undefined') return
  if (v) window.sessionStorage.setItem(AUTH_KEY, '1')
  else window.sessionStorage.removeItem(AUTH_KEY)
}

export function formatPrice(p: number, listing: 'sale' | 'rent', label?: string) {
  if (label) return label
  if (listing === 'rent') return `$${p.toLocaleString()} per week`
  return `$${p.toLocaleString()}`
}
