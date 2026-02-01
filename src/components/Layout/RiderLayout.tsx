import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useI18n } from "@/i18n/I18nProvider";

const riderNav: AppNavItem[] = [
  { to: "/rider/home", label: "Home", icon: "Home", end: true },
  { to: "/rider/assignments", label: "Assignments", icon: "Truck" },
  { to: "/rider/tracking", label: "Tracking", icon: "MapPin" },
  { to: "/rider/earnings", label: "Earnings", icon: "CreditCard" },
  { to: "/rider/profile", label: "Profile", icon: "Users" },
];

export default function RiderLayout() {
  const { t } = useI18n();

  return (
    <AppShell
      title={t("Rider • Britium Express")}
      brand={{
        name: "Rider App",
        href: "/rider/home",
        logoSrc: "/britium-logo-512.png",
        logoAlt: "Britium Express Delivery Service",
      }}
      nav={riderNav}
      headerRight={
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-sm text-neutral-600">{t("Rider")}</span>
          <div className="h-8 w-8 rounded-full bg-neutral-200" aria-label={t("User avatar")} />
        </div>
      }
    />
  );
}