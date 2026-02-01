import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";

const nav: AppNavItem[] = [{ to: "/vendor/dashboard", label: "Dashboard", icon: "Home", end: true }];

export default function VendorLayout() {
  const { signOut } = useAuth();

  return (
    <RequireRole anyOf={["vendor", "super_admin", "admin", "manager"]}>
      <AppShell
        title="Vendor • Britium Express"
        brand={{ name: "Britium Express", href: "/vendor/dashboard", logoSrc: "/assets/britium-logo.png" }}
        nav={nav}
        headerRight={
          <button
            type="button"
            onClick={() => void signOut()}
            className="px-3 py-2 rounded-xl text-sm bg-white border hover:bg-neutral-50 font-extrabold"
          >
            Logout
          </button>
        }
        footer={<div className="px-6 py-4 text-xs text-neutral-500">Vendor portal • Limited access.</div>}
      />
    </RequireRole>
  );
}
