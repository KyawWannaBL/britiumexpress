import React from "react";
import AppShell, { AppNavItem } from "./AppShell";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const nav: AppNavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/quote", label: "Get Quote" },
  { to: "/tracking", label: "Track" },
  { to: "/contact", label: "Contact" },
];

export default function PublicLayout() {
  const { user, signOut } = useAuth();

  return (
    <AppShell
      title="Britium Express"
      variant="public"
      brand={{ name: "Britium Express", href: "/", logoSrc: "/assets/britium-logo.png" }}
      nav={nav}
      headerRight={
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1" aria-label="Public navigation">
            {nav.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                end={i.end}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 rounded-xl text-sm bg-neutral-900 text-white font-extrabold"
                    : "px-3 py-2 rounded-xl text-sm text-neutral-700 hover:bg-neutral-100 font-extrabold"
                }
              >
                {i.label}
              </NavLink>
            ))}
          </nav>

          {user ? (
            <>
              <NavLink
                to="/portal"
                className="px-3 py-2 rounded-xl text-sm bg-neutral-900 text-white hover:bg-neutral-800 font-extrabold"
              >
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={() => void signOut()}
                className="px-3 py-2 rounded-xl text-sm bg-white border hover:bg-neutral-50 font-extrabold"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-3 py-2 rounded-xl text-sm bg-neutral-900 text-white hover:bg-neutral-800 font-extrabold"
            >
              Sign in
            </NavLink>
          )}
        </div>
      }
      footer={
        <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} Britium Express • Privacy • Terms
        </div>
      }
    />
  );
}
