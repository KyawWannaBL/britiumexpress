import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RequireRole } from "../auth/RequireAuth";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import PortalRedirect from "../pages/auth/PortalRedirect";
import PendingApproval from "../pages/auth/PendingApproval";
import ForceChangePassword from "../pages/auth/ForceChangePassword";

// Admin & Staff Pages
import Dashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import TariffSetting from "../pages/admin/TariffSetting";
import BulkUpload from "../pages/admin/BulkUpload";
import ShipmentsPage from "../pages/admin/ShipmentsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Authentication & Entry */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/pending" element={<PendingApproval />} />
      <Route path="/force-change-password" element={<ForceChangePassword />} />
      <Route path="/portal" element={<PortalRedirect />} />

      {/* Staff Access (isStaff rule) */}
      <Route element={<RequireRole allowedRoles={["super_admin", "admin", "manager", "accountant", "sub_station_manager", "supervisor", "warehouse"]} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/shipments" element={<ShipmentsPage />} />
      </Route>

      {/* Management Exclusive (isHighAuthority rule) */}
      <Route element={<RequireRole allowedRoles={["super_admin", "admin", "manager"]} />}>
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/tariffs" element={<TariffSetting />} />
        <Route path="/admin/bulk-upload" element={<BulkUpload />} />
      </Route>

      <Route path="/" element={<Navigate to="/portal" replace />} />
    </Routes>
  );
}