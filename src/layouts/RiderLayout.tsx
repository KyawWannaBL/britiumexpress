import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { useAuth } from "../auth/AuthContext";
import { RequireRole } from "../auth/RequireAuth";

const riderNav: AppNavItem[] = [
  { to: "/rider/home", label: "Home", icon: "Home", end: true },
];

export default function RiderLayout() {
  const { signOut } = useAuth();

  return (
    <RequireRole role="rider">
      <AppShell
        title="Rider • Britium Express"
        brand={{ name: "Britium Express", href: "/rider/home", logoSrc: "/assets/britium-logo.png" }}
        nav={riderNav}
        headerRight={
          <button
            type="button"
            onClick={() => void signOut()}
            className="px-3 py-2 rounded-xl text-sm bg-white border hover:bg-neutral-50 font-extrabold"
          >
            Logout
          </button>
        }
        footer={<div className="px-6 py-4 text-xs text-neutral-500">Ride safe. Always verify pickup codes.</div>}
      />
    </RequireRole>
  );
}
