import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Directly references your Vercel variable
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // Directly references your Vercel variable
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // These can often be derived if not explicitly set
  projectId: "britium-express-bb380", 
  storageBucket: "britium-express-bb380.firebasestorage.app",
};

// Initialize only once to support React Fast Refresh
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;