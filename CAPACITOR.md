# Britium Express Mobile (Capacitor)

This repo ships **one codebase** for Web + Mobile by wrapping the Vite web build inside a Capacitor shell.

## Why this solves your requirement
- Same UI + features as Web
- Same Firebase Auth / Firestore RBAC logic (super_admin / admin / manager / merchant / rider)
- Vercel hosts the web, and Capacitor packages it as Android/iOS

## Setup
```bash
npm install
npm run build
npm run mobile:add-android
npm run mobile:android
```

## Notes
- Ensure `.env` has your Firebase `VITE_FIREBASE_*` keys.
- For deep links / SPA routing, the app already uses client-side routing.
- To change the app icon/splash: use Capacitor Assets tooling.
