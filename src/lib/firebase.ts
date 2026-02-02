// src/lib/firebase.ts  (YOUR CONFIG + SAFE ANALYTICS)
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCUZuhS-pIb4I1lOtW7Xc_KN6qbGxu8Qfo",
  authDomain: "britium-express-bb380.firebaseapp.com",
  databaseURL: "https://britium-express-bb380-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "britium-express-bb380",
  storageBucket: "britium-express-bb380.firebasestorage.app",
  messagingSenderId: "860118014216",
  appId: "1:860118014216:web:91e7f75df72d17d95df4bd",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export const analyticsPromise = isSupported()
  .then((ok) => (ok ? getAnalytics(app) : null))
  .catch(() => null);

export default app;
