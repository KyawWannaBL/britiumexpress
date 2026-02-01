import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import MerchantLayout from "./layouts/MerchantLayout";
import RiderLayout from "./layouts/RiderLayout";
import VendorLayout from "./layouts/VendorLayout";

import HomePage from "./pages/public/HomePage";
import ServicesPage from "./pages/public/ServicesPage";
import QuotePage from "./pages/public/QuotePage";
import ContactPage from "./pages/public/ContactPage";
import TrackingPage from "./pages/public/TrackingPage";
import SendParcel from "./pages/public/SendParcel";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import PortalRedirect from "./pages/auth/PortalRedirect";
import ForceChangePassword from "./pages/auth/ForceChangePassword";
import Forbidden from "./pages/errors/Forbidden";
import PendingApproval from "./pages/errors/PendingApproval";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminManagement from "./pages/admin/AdminManagement";
import BulkUpload from "./pages/admin/BulkUpload";
import TariffSetting from "./pages/admin/TariffSetting";

import MerchantPortal from "./pages/merchant/MerchantPortal";
import MerchantPickups from "./pages/merchant/MerchantPickups";
import MerchantFinance from "./pages/merchant/MerchantFinance";
import CreateShipment from "./pages/merchant/CreateShipment";

import RiderHome from "./pages/rider/RiderHome";
import VendorDashboard from "./pages/vendor/VendorDashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="quote" element={<QuotePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="tracking" element={<TrackingPage />} />

        <Route path="send" element={<SendParcel />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="portal" element={<PortalRedirect />} />
        <Route path="force-change-password" element={<ForceChangePassword />} />
        <Route path="403" element={<Forbidden />} />
        <Route path="pending" element={<PendingApproval />} />

        {/* Convenience: customer dashboard */}
        <Route path="customer" element={<Navigate to="/send" replace />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="management" element={<AdminManagement />} />
        <Route path="bulk-upload" element={<BulkUpload />} />
        <Route path="tariffs" element={<TariffSetting />} />
      </Route>

      <Route path="/merchant" element={<MerchantLayout />}>
        <Route index element={<Navigate to="/merchant/dashboard" replace />} />
        <Route path="dashboard" element={<MerchantPortal />} />
        <Route path="pickups" element={<MerchantPickups />} />
        <Route path="finance" element={<MerchantFinance />} />
        <Route path="create" element={<CreateShipment />} />
      </Route>

      <Route path="/rider" element={<RiderLayout />}>
        <Route index element={<Navigate to="/rider/home" replace />} />
        <Route path="home" element={<RiderHome />} />
      

      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<Navigate to="/vendor/dashboard" replace />} />
        <Route path="dashboard" element={<VendorDashboard />} />
      </Route>
</Route>

      <Route path="*" element={<div className="p-8 text-sm text-slate-600">404</div>} />
    </Routes>
  );
}
