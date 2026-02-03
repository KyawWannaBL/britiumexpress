import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  createUserWithEmailAndPassword,
  updateProfile,
  type User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { ROLE_PERMISSIONS, PERMISSIONS } from "./authClient";
import type { AppRole, UserProfile, UserStatus } from "../types/auth";
import { getUserProfile, ensureUserProfile } from "./userProfile";

export type { AppRole, UserProfile, UserStatus };

export type AuthUser = UserProfile & {
  displayName?: string;
  photoURL?: string;
};

export type LoginRequest = { email: string; password: string };
export type SignupRequest = { name?: string; email: string; password: string; role?: AppRole };

interface AuthContextType {
  firebaseUser: User | null;
  user: AuthUser | null;
  profile: AuthUser | null;

  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  loginWith: (req: LoginRequest) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;

  signUp: (email: string, password: string, role?: AppRole) => Promise<void>;
  signUpWith: (req: SignupRequest) => Promise<void>;

  refresh: () => Promise<AuthUser | null>;
  refreshProfile: () => Promise<AuthUser | null>;

  signOut: () => Promise<void>;
  logout: () => Promise<void>;

  can: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toAuthUser(firebaseUser: User, profile: UserProfile | null): AuthUser | null {
  if (!profile) return null;
  return {
    ...profile,
    displayName: firebaseUser.displayName ?? undefined,
    photoURL: firebaseUser.photoURL ?? undefined,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setError(null);
      const current = auth.currentUser;
      if (!current) {
        setUser(null);
        return null;
      }
      const profile = await getUserProfile(current.uid);
      const merged = toAuthUser(current, profile);
      setUser(merged);
      return merged;
    } catch (e: any) {
      setUser(null);
      setError(e?.message ?? "Failed to load profile");
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    await signInWithEmailAndPassword(auth, email, password);
    await refresh();
  };

  const login = async (email: string, password: string) => signIn(email, password);
  const loginWith = async (req: LoginRequest) => signIn(req.email, req.password);

  const signUpWith = async (req: SignupRequest) => {
    setError(null);
    const role: AppRole = req.role ?? "customer";
    const cred = await createUserWithEmailAndPassword(auth, req.email, req.password);

    if (req.name) {
      try {
        await updateProfile(cred.user, { displayName: req.name });
      } catch {
        // ignore displayName failures
      }
    }

    await ensureUserProfile(cred.user.uid, req.email, role);
    await refresh();
  };

  const signUp = async (email: string, password: string, role?: AppRole) =>
    signUpWith({ email, password, role });

  const signOut = async () => {
    await fbSignOut(auth);
    setUser(null);
    setFirebaseUser(null);
  };

  const logout = async () => signOut();

  const can = (permission: string) => {
    const role = user?.role;
    if (!role) return false;

    // authClient.ts AppRole union may differ from types/auth.ts.
    const perms =
      ((ROLE_PERMISSIONS as unknown) as Record<string, string[]>)[role] ?? [];

    if (perms.includes(PERMISSIONS.FULL_ACCESS)) return true;
    return perms.includes(permission);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      setLoading(true);

      try {
        setError(null);
        if (currentUser) {
          const profile = await getUserProfile(currentUser.uid);
          setUser(toAuthUser(currentUser, profile));
        } else {
          setUser(null);
        }
      } catch (e: any) {
        setUser(null);
        setError(e?.message ?? "Failed to load profile");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const value = useMemo(
    () => ({
      firebaseUser,
      user,
      profile: user,
      loading,
      error,
      login,
      loginWith,
      signIn,
      signUp,
      signUpWith,
      refresh,
      refreshProfile: refresh,
      signOut,
      logout,
      can,
    }),
    [firebaseUser, user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
