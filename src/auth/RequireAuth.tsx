import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { AppRole } from "../types/auth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />;

  if (user.mustChangePassword && loc.pathname !== "/change-password") {
    return <Navigate to="/change-password" replace />;
  }

  return <>{children}</>;
}

export function RequireRole({ role, children }: { role: AppRole; children: React.ReactNode }) {
  const { loading, user } = useAuth();
  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/403" replace />;
  return <>{children}</>;
}