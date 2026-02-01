import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

/**
 * Britium Express Firebase bootstrap.
 *
 * Why: Vercel deployments often miss VITE_* envs. This file uses the supplied
 * Firebase config directly and exports all services used by the app.
 */
const firebaseConfig = {
  apiKey: "AIzaSyCUZuhS-pIb4I1lOtW7Xc_KN6qbGxu8Qfo",
  authDomain: "britium-express-bb380.firebaseapp.com",
  databaseURL:
    "https://britium-express-bb380-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "britium-express-bb380",
  storageBucket: "britium-express-bb380.firebasestorage.app",
  messagingSenderId: "860118014216",
  appId: "1:860118014216:web:91e7f75df72d17d95df4bd",
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

export { firebaseConfig };
