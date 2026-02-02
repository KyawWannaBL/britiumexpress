import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { auth } from "../../lib/firebase";
import { useI18n } from "@/i18n/I18nProvider";

function roleToDashboard(role: string): string {
  const r = role.toLowerCase();
  const staff = ["super_admin", "admin", "manager", "accountant", "supervisor", "sub_station_manager", "warehouse"];
  
  if (staff.includes(r)) return "/admin/dashboard";
  if (r === "merchant") return "/merchant/dashboard";
  if (r === "rider" || r === "driver") return "/rider/home";
  if (r === "vendor") return "/vendor/dashboard";
  return "/customer/home";
}

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

  return <Navigate to={roleToDashboard(user.role)} replace />;
}