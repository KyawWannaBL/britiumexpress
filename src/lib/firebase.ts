// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from your .env.local
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Singleton pattern: Initialize only if no app exists yet
export const firebaseApp = !getApps().length 
  ? initializeApp(firebaseConfig) 
  : getApp();

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// Compatibility Aliases
export const auth = firebaseAuth; 
export const db = firestore; // Vital for fixing your current Vercel build error