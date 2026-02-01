import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";
import LanguageSwitcher from "../i18n/LanguageSwitcher";
import { useI18n } from "../i18n/I18nProvider";

const nav: AppNavItem[] = [{ to: "/vendor/dashboard", label: "admin.dashboard", icon: "Home", end: true }];

export default function VendorLayout() {
  const { signOut } = useAuth();
  const { t } = useI18n();

  return (
    <RequireRole anyOf={["vendor"]}>
      <AppShell
        title={t("Vendor • Britium Express")}
        brand={{ name: "Britium Express", href: "/vendor/dashboard", logoSrc: "/assets/britium-logo.png" }}
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
