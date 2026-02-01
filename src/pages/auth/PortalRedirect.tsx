import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function roleToDashboard(role: string): string {
  const r = role.toLowerCase();

  if (
    [
      "super_admin",
      "admin",
      "manager",
      "accountant",
      "supervisor",
      "sub_station_manager",
      "warehouse",
    ].includes(r)
  ) {
    return "/admin/dashboard";
  }

  if (r === "merchant") return "/merchant/dashboard";
  if (r === "rider" || r === "driver") return "/rider/home";
  if (r === "vendor") return "/vendor/dashboard";

  return "/send";
}


function needsForcedPasswordChange(role: string, mustChangePassword?: boolean) {
  if (!mustChangePassword) return false;
  return ["super_admin", "admin", "manager"].includes(role.toLowerCase());
}

export default function PortalRedirect() {
  const { loading, user } = useAuth();

  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.status && user.status !== "approved") return <Navigate to="/pending" replace />;
  if (needsForcedPasswordChange(user.role, user.mustChangePassword)) return <Navigate to="/force-change-password" replace />;

  return <Navigate to={roleToDashboard(user.role)} replace />;
}
