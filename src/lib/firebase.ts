import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "britium-express-bb380",
  storageBucket: "britium-express-bb380.firebasestorage.app",
};

// Singleton pattern to prevent duplicate initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);