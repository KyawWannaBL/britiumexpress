/* =========================================================
   File: src/lib/britiumAuth.tsx
   Local (demo) auth with signup/login/logout using localStorage.
   Replace with Firebase/Supabase auth later without changing UI.
   ========================================================= */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthUser = { id: string; name: string; email: string };

type StoredUser = AuthUser & { passwordHash: string; createdAt: string };

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  signUp: (input: { name: string; email: string; password: string }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const USERS_KEY = "britium_users_v1";
const SESSION_KEY = "britium_session_v1";

function safeWindow(): Window | null {
  return typeof window === "undefined" ? null : window;
}

function loadUsers(): StoredUser[] {
  const w = safeWindow();
  if (!w) return [];
  try {
    const raw = w.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  const w = safeWindow();
  if (!w) return;
  w.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSessionUserId(): string | null {
  const w = safeWindow();
  if (!w) return null;
  try {
    const raw = w.localStorage.getItem(SESSION_KEY);
    const parsed = raw ? (JSON.parse(raw) as { userId?: string }) : null;
    return parsed?.userId ?? null;
  } catch {
    return null;
  }
}

function setSessionUserId(userId: string) {
  const w = safeWindow();
  if (!w) return;
  w.localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }));
}

function clearSession() {
  const w = safeWindow();
  if (!w) return;
  w.localStorage.removeItem(SESSION_KEY);
}

function makeId(): string {
  return `u_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

async function sha256(text: string): Promise<string> {
  const w = safeWindow();
  if (!w || !w.crypto?.subtle) return `plain:${text}`; // fallback for old browsers/dev env
  const enc = new TextEncoder().encode(text);
  const buf = await w.crypto.subtle.digest("SHA-256", enc);
  const bytes = Array.from(new Uint8Array(buf));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string): Promise<string> {
  return sha256(`britium::${password}`);
}

function toPublic(u: StoredUser): AuthUser {
  return { id: u.id, name: u.name, email: u.email };
}

function findUserByEmail(email: string): StoredUser | null {
  const users = loadUsers();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) ?? null;
}

function findUserById(id: string): StoredUser | null {
  const users = loadUsers();
  return users.find((u) => u.id === id) ?? null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const id = getSessionUserId();
    if (!id) {
      setIsReady(true);
      return;
    }
    const u = findUserById(id);
    setUser(u ? toPublic(u) : null);
    setIsReady(true);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      signUp: async ({ name, email, password }) => {
        const existing = findUserByEmail(email);
        if (existing) throw new Error("Email is already registered.");

        const users = loadUsers();
        const newUser: StoredUser = {
          id: makeId(),
          name: name.trim(),
          email: email.trim(),
          passwordHash: await hashPassword(password),
          createdAt: new Date().toISOString(),
        };
        saveUsers([newUser, ...users]);
        setSessionUserId(newUser.id);
        setUser(toPublic(newUser));
      },
      login: async ({ email, password }) => {
        const u = findUserByEmail(email);
        if (!u) throw new Error("Account not found.");
        const hash = await hashPassword(password);
        if (hash !== u.passwordHash) throw new Error("Wrong password.");
        setSessionUserId(u.id);
        setUser(toPublic(u));
      },
      logout: () => {
        clearSession();
        setUser(null);
      },
    }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider />");
  return ctx;
}
