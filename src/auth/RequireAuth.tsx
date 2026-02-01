import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppRole, useAuth } from "./AuthContext";
import { auth } from "../lib/firebase";

function isApproved(status?: string) {
  return String(status ?? "").toLowerCase() === "approved";
}

function needsForcedPasswordChange(role: AppRole, mustChangePassword?: boolean) {
  if (!mustChangePassword) return false;
  return ["super_admin", "admin", "manager"].includes(String(role));
}

function Loading({ label = "Loading…" }: { label?: string }) {
  return <div className="min-h-[50vh] grid place-items-center text-sm text-slate-600">{label}</div>;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { loading, user, refresh, error } = useAuth();
  const loc = useLocation();
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    if (tried) return;
    if (!loading && !user && auth.currentUser) {
      setTried(true);
      void refresh();
    }
  }, [tried, loading, user, refresh]);

  if (loading) return <Loading />;
  if (!user) {
    if (auth.currentUser) return <Loading label="Loading profile…" />;
    return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />;
  }

  if (user.status && !isApproved(user.status) && loc.pathname !== "/pending") return <Navigate to="/pending" replace />;

  if (needsForcedPasswordChange(user.role, user.mustChangePassword) && loc.pathname !== "/force-change-password") {
    return <Navigate to="/force-change-password" replace state={{ from: loc.pathname + loc.search }} />;
  }

  // Optional: expose profile/rules errors without looping.
  if (error && loc.pathname !== "/pending") {
    // Keep user inside app; pending screen displays the message.
    return <Navigate to="/pending" replace state={{ message: error }} />;
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
  const { loading, user, refresh, error } = useAuth();
  const loc = useLocation();
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    if (tried) return;
    if (!loading && !user && auth.currentUser) {
      setTried(true);
      void refresh();
    }
  }, [tried, loading, user, refresh]);

  if (loading) return <Loading />;
  if (!user) {
    if (auth.currentUser) return <Loading label="Loading profile…" />;
    return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />;
  }

  if (user.status && !isApproved(user.status) && loc.pathname !== "/pending") return <Navigate to="/pending" replace />;

  if (needsForcedPasswordChange(user.role, user.mustChangePassword) && loc.pathname !== "/force-change-password") {
    return <Navigate to="/force-change-password" replace state={{ from: loc.pathname + loc.search }} />;
  }

  if (error && loc.pathname !== "/pending") return <Navigate to="/pending" replace state={{ message: error }} />;

  const allowed = anyOf ?? (role ? [role] : []);
  if (allowed.length && !allowed.includes(user.role)) return <Navigate to="/403" replace />;

  return <>{children}</>;
}
