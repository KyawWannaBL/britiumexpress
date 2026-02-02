import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Uses your Vercel variable
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  // Uses your Vercel variable
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // Hardcoded for stability as these aren't sensitive
  projectId: "britium-express-bb380",
  storageBucket: "britium-express-bb380.firebasestorage.app",
};

// Singleton pattern to prevent duplicate initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;