import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";

function buildAdminNav(role: string): AppNavItem[] {
  const r = role.toLowerCase();

  const base: AppNavItem[] = [{ to: "/admin/dashboard", label: "Dashboard", icon: "Home", end: true }];

  // High authority: full system access (your requirement)
  if (["super_admin", "admin"].includes(r)) {
    return [
      ...base,
      { to: "/admin/management", label: "Management", icon: "Users" },
      { to: "/admin/bulk-upload", label: "Bulk Upload", icon: "Package" },
      { to: "/admin/tariffs", label: "Tariffs", icon: "Settings" },
    ];
  }

  // Manager: operational control (branch/region); tariffs usually restricted
  if (r === "manager") {
    return [
      ...base,
      { to: "/admin/management", label: "Management", icon: "Users" },
      { to: "/admin/bulk-upload", label: "Bulk Upload", icon: "Package" },
    ];
  }

  // Accountant: finance visibility (future: add /admin/finance page)
  if (r === "accountant") {
    return [...base];
  }

  // Supervisor / station / warehouse: focused operations (future pages)
  return [...base];
}

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const nav = React.useMemo(() => buildAdminNav(user?.role ?? "admin"), [user?.role]);

  return (
    <RequireRole
      anyOf={[
        "super_admin",
        "admin",
        "manager",
        "sub_station_manager",
        "supervisor",
        "warehouse",
        "accountant",
      ]}
    >
      <AppShell
        title="Admin • Britium Express"
        brand={{ name: "Britium Express", href: "/admin/dashboard", logoSrc: "/assets/britium-logo.png" }}
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
        footer={<div className="px-6 py-4 text-xs text-neutral-500">© {new Date().getFullYear()} Britium Express</div>}
      />
    </RequireRole>
  );
}
