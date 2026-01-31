import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export type AppRole = "admin" | "merchant" | "rider" | "customer";
export type AuthUser = { uid: string; email: string; role: AppRole };

type AuthState = {
  loading: boolean;
  user: AuthUser | null;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string, role: AppRole): Promise<void>;
  signOut(): Promise<void>;
};

const Ctx = React.createContext<AuthState | null>(null);

async function readRole(uid: string): Promise<AppRole> {
  const snap = await getDoc(doc(db, "users", uid));
  const role = (snap.exists() ? (snap.data()?.role as string) : "customer") ?? "customer";
  return role === "admin" || role === "merchant" || role === "rider" || role === "customer" ? role : "customer";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<AuthUser | null>(null);

  React.useEffect(() => {
    const off = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser?.uid || !fbUser.email) {
        setUser(null);
        setLoading(false);
        return;
      }
      const role = await readRole(fbUser.uid);
      setUser({ uid: fbUser.uid, email: fbUser.email, role });
      setLoading(false);
    });
    return () => off();
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, role: AppRole) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), { email, role, createdAt: serverTimestamp() });
  }

  async function signOut() {
    await fbSignOut(auth);
  }

  return <Ctx.Provider value={{ loading, user, signIn, signUp, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
