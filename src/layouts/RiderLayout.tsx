import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";
import LanguageSwitcher from "../i18n/LanguageSwitcher";
import { useI18n } from "../i18n/I18nProvider";

const nav: AppNavItem[] = [
  { to: "/rider/home", label: "nav.home", icon: "Home", end: true },
  { to: "/rider/tasks", label: "admin.shipments", icon: "Package" },
  { to: "/rider/wallet", label: "admin.accounting", icon: "CreditCard" },
  { to: "/rider/profile", label: "common.details", icon: "Users" },
];

export default function RiderLayout() {
  const { signOut } = useAuth();
  const { t } = useI18n();

  return (
    <RequireRole anyOf={["rider", "driver"] as any}>
      <AppShell
        title={t("Rider • Britium Express")}
        brand={{ name: "Britium Express", href: "/rider/home", logoSrc: "/assets/britium-logo.png" }}
        nav={nav}
        headerRight={
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => void signOut()}
              className="px-3 py-2 rounded-xl text-sm bg-white border hover:bg-neutral-50 font-extrabold"
            >
              {t("auth.logout")}
            </button>
          </div>
        }
        footer={<div className="px-6 py-4 text-xs text-neutral-500">© {new Date().getFullYear()} Britium Express</div>}
      />
    </RequireRole>
  );
}
