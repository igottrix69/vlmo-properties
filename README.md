# VL & MO Properties

Professional real estate website for VL & MO Properties — Buy · Sell · Rent · Invest.

Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Features

- Public site: Home, Buy, Rent, Sell, About, Contact, Property Detail
- Rotating homepage hero carousel (admin editable)
- Multiple advertising slots (home banner, home mid, sidebar, results top)
- Search by suburb / address / postcode / keyword, with bedroom + price filters
- Agent cards, enquiry forms, OpenStreetMap on property detail
- Admin PIN login (default `0101`, change to any 4–6 digit PIN)
- Admin dashboard: CRUD on properties, hero slides, ads; edit contact info and PIN
- Data is persisted per-browser in `localStorage` (demo-grade). Swap for Vercel Postgres/KV for a real multi-user store.

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Admin

Visit `/admin` and enter PIN `0101`. Change it from the **PIN & Data** tab.

## Deploy on Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New Project → Import** the repo.
3. Framework preset is auto-detected as Next.js. Click **Deploy**.
