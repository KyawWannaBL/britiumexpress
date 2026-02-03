import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, Outlet, Link, useLocation } from "react-router-dom";
import AppShell from "@/AppShell";
import LanguageSwitcher from "@/i18n/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/auth/AuthContext";

const HomePage = lazy(() => import("@/pages/public/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const WarehouseDashboard = lazy(() => import("@/pages/warehouse/Dashboard"));
const SortingBoard = lazy(() => import("@/pages/warehouse/SortingBoard"));
const ScanIn = lazy(() => import("@/pages/warehouse/ScanIn"));
const ScanOut = lazy(() => import("@/pages/warehouse/ScanOut"));

function Loader() {
  return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;
}

function HashScroller() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash, pathname]);
  return null;
}

function PublicLayout() {
  const { t } = useI18n();
  const { user, profile } = useAuth();

  const headerRight = (
    <div className="flex items-center gap-3">
      <nav className="hidden md:flex items-center gap-5 text-sm font-extrabold">
        <Link className="text-neutral-700 hover:text-neutral-900" to="/#services">{t("Services")}</Link>
        <Link className="text-neutral-700 hover:text-neutral-900" to="/#about">{t("About")}</Link>
        <Link className="text-neutral-700 hover:text-neutral-900" to="/#contact">{t("Contact")}</Link>
      </nav>

      <LanguageSwitcher />

      {user ? (
        <Link
          to={profile?.role === "warehouse" ? "/warehouse/dashboard" : "/"}
          className="rounded-xl px-4 py-2 text-xs font-extrabold bg-neutral-900 text-white hover:opacity-90"
        >
          {t("Dashboard")}
        </Link>
      ) : (
        <Link
          to="/login"
          className="rounded-xl px-4 py-2 text-xs font-extrabold bg-neutral-900 text-white hover:opacity-90"
        >
          {t("Log in")}
        </Link>
      )}
    </div>
  );

  return (
    <>
      <HashScroller />
      <AppShell
        variant="public"
        title="Britium Express"
        brand={{ name: "Britium Express", href: "/", logoSrc: "/assets/britium-logo.png", logoAlt: "Britium Express" }}
        nav={[]}
        headerRight={headerRight}
      />
    </>
  );
}

function ProtectedOutlet({ role }: { role?: string }) {
  const { user, profile, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (role && profile?.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="contact" element={<Navigate to="/#contact" replace />} />
        </Route>

        <Route element={<ProtectedOutlet role="warehouse" />}>
          <Route path="/warehouse/dashboard" element={<WarehouseDashboard stationId="YGN-01" />} />
          <Route path="/warehouse/scan-in" element={<ScanIn />} />
          <Route path="/warehouse/scan-out" element={<ScanOut />} />
          <Route path="/warehouse/sorting" element={<SortingBoard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
