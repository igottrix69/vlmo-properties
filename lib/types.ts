export type Listing = 'sale' | 'rent'

export interface Property {
  id: string
  title: string
  address: string
  suburb: string
  state: string
  postcode: string
  price: number
  priceLabel?: string // e.g. "$650/week" or "Contact Agent"
  listing: Listing
  type: 'House' | 'Apartment' | 'Townhouse' | 'Land' | 'Acreage' | 'Unit'
  bedrooms: number
  bathrooms: number
  carSpaces: number
  landSize?: number // sqm
  description: string
  images: string[]
  featured?: boolean
  agentName: string
  agentPhone: string
  agentEmail: string
  dateAdded: string
}

export interface HeroSlide {
  id: string
  imageUrl: string
  headline: string
  subhead: string
  ctaText: string
  ctaHref: string
}

export interface Ad {
  id: string
  imageUrl: string
  href: string
  alt: string
  slot: 'home-banner' | 'home-mid' | 'sidebar' | 'results-top'
  active: boolean
}

export interface SiteData {
  pin: string // up to 6 digits
  properties: Property[]
  hero: HeroSlide[]
  ads: Ad[]
  contactPhone: string
  contactEmail: string
  contactAddress: string
  version: number
}
