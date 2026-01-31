import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function roleToDashboard(role: string): string {
  const r = role.toLowerCase();
  if (["super_admin", "admin", "manager", "accountant", "supervisor"].includes(r)) return "/admin/dashboard";
  if (r === "merchant") return "/merchant/dashboard";
  if (r === "rider") return "/rider/home";
  return "/send";
}

export default function PortalRedirect() {
  const { loading, user } = useAuth();
  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={roleToDashboard(user.role)} replace />;
}
