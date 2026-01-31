import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import type { AppRole, UserProfile, UserStatus } from "../types/auth";

function normalizeStatus(v: unknown): UserStatus {
  const s = String(v ?? "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

function normalizeRole(v: unknown): AppRole {
  const s = String(v ?? "").toLowerCase();
  const ok: AppRole[] = [
    "super_admin",
    "admin",
    "manager",
    "accountant",
    "merchant",
    "rider",
    "customer",
  ];
  return (ok.includes(s as AppRole) ? (s as AppRole) : "customer");
}

function pickMustChangePassword(data: any): boolean {
  // supports: mustChangePassword / MustChangePassword / mustchangepassword
  return Boolean(
    data?.mustChangePassword ??
      data?.MustChangePassword ??
      data?.mustchangepassword ??
      false
  );
}

function pickBackupEmail(data: any): string | undefined {
  // supports: backupemail / backup_email / backupEmail
  const v = data?.backupEmail ?? data?.backup_email ?? data?.backupemail;
  return v ? String(v) : undefined;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(firestore, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data();
  const email = String(data?.email ?? "");
  const role = normalizeRole(data?.role);
  const status = normalizeStatus(data?.status);
  const mustChangePassword = pickMustChangePassword(data);
  const backupEmail = pickBackupEmail(data);

  return { uid, email, role, status, mustChangePassword, backupEmail };
}

export async function ensureUserProfile(uid: string, email: string, role: AppRole) {
  // why: initial signup. you can later lock role changes via rules/admin tools
  const ref = doc(firestore, "users", uid);
  await setDoc(
    ref,
    {
      email,
      role,
      status: "approved",
      mustChangePassword: false,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function clearMustChangePassword(uid: string) {
  const ref = doc(firestore, "users", uid);
  await setDoc(ref, { mustChangePassword: false }, { merge: true });
}
