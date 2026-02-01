import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppRole, useAuth } from "./AuthContext";

function isApproved(status?: string) {
  return String(status ?? "").toLowerCase() === "approved";
}

function needsForcedPasswordChange(role: AppRole, mustChangePassword?: boolean) {
  if (!mustChangePassword) return false;
  return ["super_admin", "admin", "manager"].includes(String(role));
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { loading, user } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />;

  if (user.status && !isApproved(user.status) && loc.pathname !== "/pending") return <Navigate to="/pending" replace />;

  if (needsForcedPasswordChange(user.role, user.mustChangePassword) && loc.pathname !== "/force-change-password") {
    return <Navigate to="/force-change-password" replace state={{ from: loc.pathname + loc.search }} />;
  }

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
  const loc = useLocation();

  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />;

  if (user.status && !isApproved(user.status) && loc.pathname !== "/pending") return <Navigate to="/pending" replace />;

  if (needsForcedPasswordChange(user.role, user.mustChangePassword) && loc.pathname !== "/force-change-password") {
    return <Navigate to="/force-change-password" replace state={{ from: loc.pathname + loc.search }} />;
  }

  const allowed = anyOf ?? (role ? [role] : []);
  if (allowed.length && !allowed.includes(user.role)) return <Navigate to="/403" replace />;

  return <>{children}</>;
}
