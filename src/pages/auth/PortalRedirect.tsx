import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { auth } from "../../lib/firebase";

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
  const { loading, user, refresh } = useAuth();
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    if (tried) return;
    if (auth.currentUser && !user && !loading) {
      setTried(true);
      void refresh();
    }
  }, [tried, user, loading, refresh]);

  if (loading) return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading…</div>;
        if (!user) {
  // If Firebase has a session but profile hasn't loaded yet, do NOT bounce back to login.
  if (auth.currentUser) {
    void refresh();
    return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">Loading profile…</div>;
  }
  return <Navigate to="/login" replace />;
}
  if (user.status && user.status !== "approved") return <Navigate to="/pending" replace />;
  if (needsForcedPasswordChange(user.role, user.mustChangePassword)) return <Navigate to="/force-change-password" replace />;

  return <Navigate to={roleToDashboard(user.role)} replace />;
}
