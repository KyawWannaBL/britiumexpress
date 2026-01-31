import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppRole, useAuth } from "./AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />;

  return <>{children}</>;
}

export function RequireRole({
  role,
  anyOf,
  children,
}: {
  role?: AppRole;
  anyOf?: AppRole[];
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth();

  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;

  const allowed = anyOf ?? (role ? [role] : []);
  if (allowed.length && !allowed.includes(user.role)) return <Navigate to="/403" replace />;

  return <>{children}</>;
}
