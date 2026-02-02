import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { auth } from "../../lib/firebase";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Handles automatic redirection based on user roles and status.
 * Use 'default' export to resolve the build error in routes.tsx.
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

  if (loading) return <div className="min-h-screen grid place-items-center">{t("loading")}</div>;

  if (!user) {
    if (auth.currentUser) {
      void refresh();
      return <div className="min-h-screen grid place-items-center">{t("loading")}</div>;
    }
    return <Navigate to="/login" replace />;
  }

  // Redirection logic for the 10-tier hierarchy
  const role = user.role?.toLowerCase();
  if (role === "super_admin" || role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "merchant") return <Navigate to="/merchant/dashboard" replace />;
  if (role === "rider") return <Navigate to="/rider/home" replace />;
  
  return <Navigate to="/customer/home" replace />;
}