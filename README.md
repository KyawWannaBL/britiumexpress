# Britium Express — Flawless Web App

A merged, production-ready React + Vite + Tailwind app with:

- Public website (Home, Services, Quote Calculator, Tracking with prefilled code, Contact)
- Firebase Auth + Firestore role system (admin / merchant / rider / customer)
- Admin + Merchant portals (from your uploaded screens)
- SPA deep-link fix for Vercel (`vercel.json`)

## Run
```bash
npm install
cp .env.example .env
npm run dev
```

## Deploy (Vercel)
- Add the same env vars in Vercel Project Settings.
- `vercel.json` is included to prevent 404 on refresh.

## Roles
When users sign up, a Firestore doc is created:
- `users/{uid}`: `{ email, role }`

Portals:
- Admin: `/admin/*`
- Merchant: `/merchant/*`
- Rider: `/rider/*`
- Customer: `/send`
