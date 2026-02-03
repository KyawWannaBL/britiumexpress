/**
 * File: src/routes/AppRoutes.tsx
 * Description: Central routing for Britium Express. 
 * Connects Public, Admin, Merchant, and Rider portals with role-based guards.
 */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import MerchantLayout from "../layouts/MerchantLayout";
import RiderLayout from "../layouts/RiderLayout";

// Public Pages
import HomePage from "../pages/public/HomePage";
import TrackingPage from "../pages/public/TrackingPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import Forbidden from "../pages/errors/Forbidden";

// Auth Guard
import RequireAuth from "../auth/RequireAuth";

// Dashboard Pages
import AdminDashboardPage from "../pages/admin/Dashboard";
import MerchantDashboardPage from "../pages/merchant/MerchantDashboardPage";
import RiderDashboardPage from "../pages/rider/RiderDashboardPage";

/**
 * Placeholder for pages still in development (TSX versions)
 */
function DevelopmentPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border bg-white p-10 shadow-soft animate-fade-in text-center">
      <div className="text-xl font-extrabold text-slate-900">{title}</div>
      <p className="mt-2 text-sm text-slate-500">
        This module is currently being migrated to the new Britium TSX standard.
      </p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================================================
          PUBLIC ROUTES
          ========================================================= */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="services" element={<DevelopmentPlaceholder title="International Services" />} />
        <Route path="quote" element={<DevelopmentPlaceholder title="Shipping Calculator" />} />
        <Route path="contact" element={<DevelopmentPlaceholder title="Contact Support" />} />
        
        {/* Auth Pages */}
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="403" element={<Forbidden />} />
      </Route>

      {/* =========================================================
          PROTECTED ADMIN ROUTES (Super Admin / Manager)
          ========================================================= */}
      <Route
        path="admin"
        element={
          <RequireAuth role="admin">
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        {/* Additional admin paths like /admin/users or /admin/reports go here */}
      </Route>

      {/* =========================================================
          PROTECTED MERCHANT ROUTES
          ========================================================= */}
      <Route
        path="merchant"
        element={
          <RequireAuth role="merchant">
            <MerchantLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/merchant/dashboard" replace />} />
        <Route path="dashboard" element={<MerchantDashboardPage />} />
      </Route>

      {/* =========================================================
          PROTECTED RIDER ROUTES
          ========================================================= */}
      <Route
        path="rider"
        element={
          <RequireAuth role="rider">
            <RiderLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/rider/dashboard" replace />} />
        <Route path="dashboard" element={<RiderDashboardPage />} />
      </Route>

      {/* =========================================================
          FALLBACK / 404
          ========================================================= */}
      <Route path="*" element={<DevelopmentPlaceholder title="404 — Page Not Found" />} />
    </Routes>
  );
}