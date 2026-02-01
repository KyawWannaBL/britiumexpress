import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";
import LanguageSwitcher from "../i18n/LanguageSwitcher";
import { useI18n } from "../i18n/I18nProvider";

function buildAdminNav(role: string): AppNavItem[] {
  const r = role.toLowerCase();

  const base: AppNavItem[] = [
    { to: "/admin/dashboard", label: "admin.dashboard", icon: "Home", end: true },
    { to: "/admin/shipments", label: "admin.shipments", icon: "Package" },
    { to: "/admin/accounting", label: "admin.accounting", icon: "CreditCard" },
    { to: "/admin/reports", label: "admin.reports", icon: "BarChart" },
    { to: "/admin/settings", label: "admin.settings", icon: "Settings" },
  ];

  if (["super_admin", "admin", "manager"].includes(r)) {
    return [
      ...base,
      { to: "/admin/management", label: "admin.management", icon: "Users" },
      ...(r === "super_admin" ? [{ to: "/admin/debug-auth", label: "admin.debugAuth", icon: "Shield" }] : []),
      { to: "/admin/bulk-upload", label: "admin.bulkUpload", icon: "Package" },
      { to: "/admin/tariffs", label: "admin.tariffs", icon: "Settings" },
    ];
  }

  if (r === "accountant") return base;

  if (["sub_station_manager", "supervisor", "warehouse"].includes(r)) {
    return [
      { to: "/admin/dashboard", label: "admin.dashboard", icon: "Home", end: true },
      { to: "/admin/shipments", label: "admin.shipments", icon: "Package" },
    ];
  }

  return base;
}

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const { t } = useI18n();

  const role = user?.role ?? "admin";
  const nav = buildAdminNav(role);

  return (
    <RequireRole
      anyOf={[
        "super_admin",
        "admin",
        "manager",
        "accountant",
        "supervisor",
        "sub_station_manager",
        "warehouse",
      ]}
    >
      <AppShell
        title="Admin • Britium Express"
        brand={{ name: "Britium Express", href: "/admin/dashboard", logoSrc: "/assets/britium-logo.png" }}
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
