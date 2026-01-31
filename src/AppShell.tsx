// FILE: src/AppShell.tsx  (UPDATED: brand supports logo)
// ===============================
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

type IconProps = { className?: string; "aria-hidden"?: true };

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const Icons = {
  Home: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={p.className} aria-hidden="true">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-6v-7H10v7H4a1 1 0 0 1-1-1v-10.5Z" />
    </svg>
  ),
  Package: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={p.className} aria-hidden="true">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 8.5 12 3 3 8.5 12 14l9-5.5Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 8.5V16l9 5 9-5V8.5" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
    </svg>
  ),
  Users: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={p.className} aria-hidden="true">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 21a9 9 0 0 1 18 0" />
    </svg>
  ),
  Truck: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={p.className} aria-hidden="true">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v10H3V7Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 10h4l3 3v4h-7v-7Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    </svg>
  ),
  MapPin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={p.className} aria-hidden="true">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  ),
  CreditCard: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={p.className} aria-hidden="true">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 8h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 10h20" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 16h4" />
    </svg>
  ),
  Settings: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={p.className} aria-hidden="true">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.6-2-3.4-2.4 1a8.3 8.3 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a8.3 8.3 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.9 7.9 0 0 0 .1 2l-2 1.6 2 3.4 2.4-1a8.3 8.3 0 0 0 1.7 1l.4 2.6h4l.4-2.6a8.3 8.3 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6Z" />
    </svg>
  ),
};

export type AppNavItem = {
  to: string;
  label: string;
  icon?: keyof typeof Icons;
  end?: boolean;
};

type AppShellProps = {
  brand: { name: string; href?: string; logoSrc?: string; logoAlt?: string };
  nav: AppNavItem[];
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  variant?: "app" | "public";
};

export default function AppShell({
  brand,
  nav,
  headerRight,
  footer,
  title,
  variant = "app",
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!title) return;
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const BrandNode = (
    <a href={brand.href ?? "/"} className="flex items-center gap-3 font-semibold tracking-tight">
      {brand.logoSrc ? (
        <img
          src={brand.logoSrc}
          alt={brand.logoAlt ?? brand.name}
          className={variant === "public" ? "h-10 w-auto" : "h-9 w-auto"}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-neutral-900 text-white text-sm">
          B
        </span>
      )}
      <span className="leading-none">{brand.name}</span>
    </a>
  );

  const NavLinks = (
    <nav className="space-y-1" aria-label="Primary">
      {nav.map((item) => {
        const Icon = item.icon ? Icons[item.icon] : null;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                isActive ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"
              )
            }
          >
            {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
            <span className="truncate">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );

  const Header = (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className={cn("mx-auto flex items-center gap-3 px-4 py-3 md:px-6", variant === "public" && "max-w-5xl")}>
        {variant === "app" ? (
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white hover:bg-neutral-50"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            ☰
          </button>
        ) : null}

        <div className="min-w-0 flex-1">{variant === "public" ? BrandNode : null}</div>

        <div className="flex items-center gap-2">{headerRight}</div>
      </div>
    </header>
  );

  const Sidebar = (
    <aside className="hidden md:flex w-72 flex-col border-r bg-white">
      <div className="h-16 px-5 flex items-center gap-3 border-b">
        {BrandNode}
      </div>
      <div className="p-3 flex-1 overflow-auto">{NavLinks}</div>
    </aside>
  );

  const MobileDrawer = (
    <div className={cn("fixed inset-0 z-50 md:hidden", mobileOpen ? "" : "pointer-events-none")}>
      <div
        className={cn("absolute inset-0 bg-black/40 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-72 bg-white shadow-xl transition-transform",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 px-5 flex items-center gap-3 border-b">
          {BrandNode}
          <button className="ml-auto text-sm text-neutral-600" onClick={() => setMobileOpen(false)}>
            Close
          </button>
        </div>
        <div className="p-3">{NavLinks}</div>
      </div>
    </div>
  );

  if (variant === "public") {
    return (
      <div className="min-h-dvh bg-neutral-50 text-neutral-900">
        {Header}
        <main id="main" className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
          <Outlet />
        </main>
        {footer ? <footer className="border-t bg-white">{footer}</footer> : null}
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      {MobileDrawer}
      <div className="flex min-h-dvh">
        {Sidebar}
        <div className="flex-1 flex flex-col">
          {Header}
          <main id="main" className="flex-1 px-4 py-6 md:px-6">
            <Outlet />
          </main>
          {footer ? <footer className="border-t bg-white">{footer}</footer> : null}
        </div>
      </div>
    </div>
  );
}

export { Icons };
