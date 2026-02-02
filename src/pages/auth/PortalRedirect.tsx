// src/pages/auth/PortalRedirect.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { auth } from "../../lib/firebase";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Use DEFAULT export to match the import in routes.tsx
 */
export default function PortalRedirect() {
  const { t } = useI18n();
  const { loading, user, refresh } = useAuth();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!tried && auth.currentUser && !user && !loading) {
      setTried(true);
      void refresh();
    }
  }, [tried, user, loading, refresh]);

  if (loading) return <div className="min-h-screen grid place-items-center text-sm font-bold">{t("Synchronizing Portal...")}</div>;

  if (!user) {
    if (auth.currentUser) {
      void refresh();
      return <div className="min-h-screen grid place-items-center text-sm">{t("Loading Profile...")}</div>;
    }
    return <Navigate to="/login" replace />;
  }

  if (user.status?.toLowerCase() !== "approved") return <Navigate to="/pending" replace />;
  if (user.mustChangePassword) return <Navigate to="/force-change-password" replace />;

  const r = user.role.toLowerCase();
  if (["super_admin", "admin", "manager", "accountant", "supervisor", "sub_station_manager", "warehouse"].includes(r)) return <Navigate to="/admin/dashboard" replace />;
  if (r === "merchant") return <Navigate to="/merchant/dashboard" replace />;
  if (r === "rider" || r === "driver") return <Navigate to="/rider/home" replace />;
  
  return <Navigate to="/customer/home" replace />;
}