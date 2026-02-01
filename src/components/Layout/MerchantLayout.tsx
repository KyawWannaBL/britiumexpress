import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useI18n } from "@/i18n/I18nProvider";

const merchantNav: AppNavItem[] = [
  { to: "/merchant/dashboard", label: "Dashboard", icon: "Home", end: true },
  { to: "/merchant/orders", label: "Orders", icon: "Package" },
  { to: "/merchant/tracking", label: "Tracking", icon: "MapPin" },
  { to: "/merchant/payments", label: "Payments", icon: "CreditCard" },
  { to: "/merchant/settings", label: "Settings", icon: "Settings" },
];

export default function MerchantLayout() {
  const { t } = useI18n();

  // Best practice: enforce auth/role here (merchant).
  return (
    <AppShell
      title={t("Merchant • Britium Express")}
      brand={{ name: "Merchant Portal", href: "/merchant/dashboard" }}
      nav={merchantNav}
      headerRight={
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm text-neutral-600">{t("Merchant")}</span>
          <div className="h-8 w-8 rounded-full bg-neutral-200" aria-label={t("User avatar")} />
        </div>
      }
      footer={<div className="px-6 py-4 text-xs text-neutral-500">{t("Need help? Contact support.")}</div>}
    />
  );
}