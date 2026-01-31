import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export type AppRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "accountant"
  | "supervisor"
  | "merchant"
  | "rider"
  | "customer";

export type AuthUser = {
  uid: string;
  email: string;
  role: AppRole;
  status?: "approved" | "pending" | "rejected";
  mustChangePassword?: boolean;
};

type AuthState = {
  loading: boolean;
  user: AuthUser | null;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string, role: AppRole): Promise<void>;
  signOut(): Promise<void>;
  refresh(): Promise<void>;
};

const Ctx = React.createContext<AuthState | null>(null);

function normalizeRole(raw: unknown): AppRole {
  const r = String(raw ?? "").trim().toLowerCase().replace(/\s+/g, "_");
  const allowed: AppRole[] = [
    "super_admin",
    "admin",
    "manager",
    "accountant",
    "supervisor",
    "merchant",
    "rider",
    "customer",
  ];
  return allowed.includes(r as AppRole) ? (r as AppRole) : "customer";
}

function normalizeStatus(raw: unknown): "approved" | "pending" | "rejected" {
  const s = String(raw ?? "").trim().toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

function pickMustChangePassword(data: any): boolean {
  return Boolean(
    data?.mustChangePassword ??
      data?.MustChangePassword ??
      data?.mustchangepassword ??
      data?.must_change_password ??
      false
  );
}

async function findUserDocByEmail(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snaps = await getDocs(q);
  if (snaps.empty) return null;
  return snaps.docs[0];
}

/**
 * Read profile/role for the signed in user.
 * Why: your 'users' collection may be stored as users/{uid} OR auto-id docs.
 * Strategy: try users/{uid}, fallback to query by email.
 */
async function readUser(uid: string, email: string): Promise<AuthUser> {
  const uidSnap = await getDoc(doc(db, "users", uid));
  let data: any | null = uidSnap.exists() ? uidSnap.data() : null;

  if (!data) {
    const emailDoc = await findUserDocByEmail(email);
    if (emailDoc) {
      data = emailDoc.data();
      // Best-effort migration to users/{uid}; won't break login if rules deny.
      try {
        await setDoc(
          doc(db, "users", uid),
          {
            email,
            role: normalizeRole(data?.role),
            status: normalizeStatus(data?.status),
            mustChangePassword: pickMustChangePassword(data),
            migratedFrom: emailDoc.id,
            migratedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch {
        // ignored
      }
    }
  }

  return {
    uid,
    email,
    role: normalizeRole(data?.role),
    status: normalizeStatus(data?.status),
    mustChangePassword: pickMustChangePassword(data),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<AuthUser | null>(null);

  async function refresh() {
    const fb = auth.currentUser;
    if (!fb?.uid || !fb.email) return;
    setUser(await readUser(fb.uid, fb.email));
  }

  React.useEffect(() => {
    const off = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser?.uid || !fbUser.email) {
        setUser(null);
        setLoading(false);
        return;
      }

      const u = await readUser(fbUser.uid, fbUser.email);

      if (u.status !== "approved") {
        await fbSignOut(auth);
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(u);
      setLoading(false);
    });

    return () => off();
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }

  async function signUp(email: string, password: string, role: AppRole) {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await setDoc(
      doc(db, "users", cred.user.uid),
      {
        email: email.trim(),
        role,
        status: "approved",
        mustChangePassword: false,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async function signOut() {
    await fbSignOut(auth);
  }

  return <Ctx.Provider value={{ loading, user, signIn, signUp, signOut, refresh }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
