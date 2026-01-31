import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";

const adminNav: AppNavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "Home", end: true },
  { to: "/admin/management", label: "Management", icon: "Users" },
  { to: "/admin/bulk-upload", label: "Bulk Upload", icon: "Package" },
  { to: "/admin/tariffs", label: "Tariffs", icon: "Settings" },
];

export default function AdminLayout() {
  const { signOut } = useAuth();

  return (
    <RequireRole anyOf={["super_admin", "admin", "manager", "accountant", "supervisor"]}>
      <AppShell
        title="Admin • Britium Express"
        brand={{ name: "Britium Express", href: "/admin/dashboard", logoSrc: "/assets/britium-logo.png" }}
        nav={adminNav}
        headerRight={
          <button
            type="button"
            onClick={() => void signOut()}
            className="px-3 py-2 rounded-xl text-sm bg-white border hover:bg-neutral-50 font-extrabold"
          >
            Logout
          </button>
        }
        footer={<div className="px-6 py-4 text-xs text-neutral-500">© {new Date().getFullYear()} Britium Express</div>}
      />
    </RequireRole>
  );
}
