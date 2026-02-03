import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

/**
 * Central Firebase singleton.
 * - Avoids duplicate initialization during HMR
 * - Exposes commonly used Firebase services
 *
 * NOTE: analytics is exported as a Promise so it won't break SSR / unsupported environments.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "britium-express-bb380",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "britium-express-bb380.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Singleton pattern to prevent duplicate initialization
export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Backwards-compat alias used in a few files
export const firestore = db;

export const storage = getStorage(app);
export const functions = getFunctions(app);

// Analytics is optional (won't throw on server or unsupported browsers)
export const analyticsPromise = (async () => {
  try {
    const analyticsMod = await import("firebase/analytics");
    const supported = await analyticsMod.isSupported();
    if (!supported) return null;
    return analyticsMod.getAnalytics(app);
  } catch {
    return null;
  }
})();

export default app;
