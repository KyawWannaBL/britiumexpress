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
  | "sub_station_manager"
  | "supervisor"
  | "warehouse"
  | "accountant"
  | "merchant"
  | "vendor"
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
  /** non-fatal profile/read error */
  error: string | null;
  signIn(email: string, password: string): Promise<void>;
  signUp(email: string, password: string, role: AppRole): Promise<void>;
  signOut(): Promise<void>;
  refresh(): Promise<void>;
};

const Ctx = React.createContext<AuthState | null>(null);

function normalizeRole(raw: unknown): AppRole {
  const cleaned = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const aliases: Record<string, AppRole> = {
    superadmin: "super_admin",
    super_admin: "super_admin",
    admin: "admin",
    manager: "manager",
    substationmanager: "sub_station_manager",
    sub_station_manager: "sub_station_manager",
    sub_station: "sub_station_manager",
    sub_station_mgr: "sub_station_manager",
    supervisor: "supervisor",
    warehouse: "warehouse",
    warehousestaff: "warehouse",
    warehouse_staff: "warehouse",
    accountant: "accountant",
    finance: "accountant",
    merchant: "merchant",
    vendor: "vendor",
    rider: "rider",
    driver: "rider",
    rider_driver: "rider",
    rider_driver_driver: "rider",
    customer: "customer",
  };

  const mapped = aliases[cleaned];
  if (mapped) return mapped;

  const allowed: AppRole[] = [
    "super_admin",
    "admin",
    "manager",
    "sub_station_manager",
    "supervisor",
    "warehouse",
    "accountant",
    "merchant",
    "vendor",
    "rider",
    "driver",
    "customer",
  ];
  return allowed.includes(cleaned as AppRole) ? (cleaned as AppRole) : "customer";
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
 * Strategy: try users/{uid}, fallback to query by email.
 */
async function readUser(uid: string, email: string): Promise<AuthUser | null> {
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
        // ignored: rules may restrict writes to super_admin only
      }
    }
  }

  if (!data) return null;

  return {
    uid,
    email,
    role: normalizeRole(data?.role),
    status: normalizeStatus(data?.status),
    mustChangePassword: pickMustChangePassword(data),
  };
}

function humanizeProfileError(e: unknown): string {
  const code = String((e as any)?.code ?? "");
  if (code.includes("permission-denied")) {
    return "Firestore permission denied while reading your user profile. Please update Firestore rules to allow signed-in users to read the 'users' collection.";
  }
  return String((e as any)?.message ?? e ?? "Failed to load profile.");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function refresh() {
    const fb = auth.currentUser;
    if (!fb?.uid || !fb.email) return;
    try {
      const u = await readUser(fb.uid, fb.email);
      setUser(u);
      setError(null);
    } catch (e) {
      setError(humanizeProfileError(e));
    }
  }

  React.useEffect(() => {
    const off = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setError(null);

      if (!fbUser?.uid || !fbUser.email) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const u = await readUser(fbUser.uid, fbUser.email);

        if (!u) {
          // Auth account exists but profile not provisioned in Firestore
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            role: "customer",
            status: "pending",
            mustChangePassword: false,
          });
          setError("Your account is not provisioned in Firestore 'users' yet. Please contact an administrator.");
          setLoading(false);
          return;
        }

        setUser(u);
        setLoading(false);
      } catch (e) {
        // Avoid infinite loading → show something and let user proceed to /pending
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          role: "customer",
          status: "pending",
          mustChangePassword: false,
        });
        setError(humanizeProfileError(e));
        setLoading(false);
      }
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
    setUser(null);
  }

  return (
    <Ctx.Provider value={{ loading, user, error, signIn, signUp, signOut, refresh }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
