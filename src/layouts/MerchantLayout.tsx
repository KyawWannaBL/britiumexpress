import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";

const merchantNav: AppNavItem[] = [
  { to: "/merchant/dashboard", label: "Dashboard", icon: "Home", end: true },
  { to: "/merchant/pickups", label: "Pickups", icon: "Truck" },
  { to: "/merchant/finance", label: "Finance", icon: "CreditCard" },
  { to: "/merchant/create", label: "Create Shipment", icon: "Package" },
];

export default function MerchantLayout() {
  const { signOut } = useAuth();

  return (
    <RequireRole anyOf={["merchant", "super_admin", "admin", "manager"]}>
      <AppShell
        title="Merchant • Britium Express"
        brand={{ name: "Britium Express", href: "/merchant/dashboard", logoSrc: "/assets/britium-logo.png" }}
        nav={merchantNav}
        headerRight={
          <button
            type="button"
            onClick={() => void signOut()}
            className="px-3 py-2 rounded-xl text-sm bg-white border hover:bg-neutral-50 font-extrabold"
          >
            Logout
          </button>
        }
        footer={<div className="px-6 py-4 text-xs text-neutral-500">Need help? Contact support.</div>}
      />
    </RequireRole>
  );
}
