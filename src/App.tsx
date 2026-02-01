import React from "react";
import { Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import MerchantLayout from "./layouts/MerchantLayout";
import RiderLayout from "./layouts/RiderLayout";
import VendorLayout from "./layouts/VendorLayout";

// Public pages
import HomePage from "./pages/public/HomePage";
import ServicesPage from "./pages/public/ServicesPage";
import QuotePage from "./pages/public/QuotePage";
import TrackingPage from "./pages/public/TrackingPage";
import ContactPage from "./pages/public/ContactPage";
import SendParcelPage from "./pages/public/SendParcel";
import BritiumCustomerTrackingApp from "./pages/public/BritiumCustomerTrackingApp";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import PortalRedirect from "./pages/auth/PortalRedirect";
import ForceChangePassword from "./pages/auth/ForceChangePassword";

// Errors
import Forbidden from "./pages/errors/Forbidden";
import PendingApproval from "./pages/errors/PendingApproval";
import NotFound from "./pages/errors/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminManagement from "./pages/admin/AdminManagement";
import BulkUpload from "./pages/admin/BulkUpload";
import TariffSetting from "./pages/admin/TariffSetting";

import ShipmentsPage from "./pages/admin/ShipmentsPage";
import ShipmentDetailsPage from "./pages/admin/ShipmentDetailsPage";

// Admin modules
import AccountingHome from "./pages/admin/accounting/AccountingHome";
import SimpleTransactionPage from "./pages/admin/accounting/SimpleTransactionPage";
import JournalVoucherEntryPage from "./pages/admin/accounting/JournalVoucherEntryPage";
import JournalVoucherListPage from "./pages/admin/accounting/JournalVoucherListPage";
import CashVoucherEntryPage from "./pages/admin/accounting/CashVoucherEntryPage";
import CashVoucherListPage from "./pages/admin/accounting/CashVoucherListPage";
import ChartOfAccountsPage from "./pages/admin/accounting/ChartOfAccountsPage";

import ReportsHome from "./pages/admin/reports/ReportsHome";
import ByDeliverymanPage from "./pages/admin/reports/ByDeliverymanPage";
import ByMerchantPage from "./pages/admin/reports/ByMerchantPage";
import ByTownPage from "./pages/admin/reports/ByTownPage";
import AuditLogsPage from "./pages/admin/reports/AuditLogsPage";

import SettingsHome from "./pages/admin/settings/SettingsHome";
import BranchesPage from "./pages/admin/settings/BranchesPage";
import PermissionsPage from "./pages/admin/settings/PermissionsPage";
import ServiceZonesPage from "./pages/admin/settings/ServiceZonesPage";
import PromoCodesPage from "./pages/admin/settings/PromoCodesPage";

// Merchant pages
import MerchantDashboardPage from "./pages/merchant/MerchantDashboardPage";
import MerchantPortal from "./pages/merchant/MerchantPortal";
import MerchantPickups from "./pages/merchant/MerchantPickups";
import MerchantFinance from "./pages/merchant/MerchantFinance";
import CreateShipment from "./pages/merchant/CreateShipment";
import MerchantBulkUpload from "./pages/merchant/BulkUpload";

// Rider pages
import RiderHome from "./pages/rider/RiderHome";
import RiderTaskList from "./pages/rider/RiderTaskList";
import JobDetailScreen from "./pages/rider/JobDetailScreen";
import RiderPickupConfirm from "./pages/rider/RiderPickupConfirm";
import RiderDeliveryConfirm from "./pages/rider/RiderDeliveryConfirm";
import RiderException from "./pages/rider/RiderException";
import RiderWallet from "./pages/rider/RiderWallet";
import RiderProfile from "./pages/rider/RiderProfile";
import RiderDashboardPage from "./pages/rider/RiderDashboardPage";

// Vendor pages
import VendorDashboard from "./pages/vendor/VendorDashboard";

export default function App() {
  return (
    <Routes>
      {/* Public + Auth */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="quote" element={<QuotePage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="send" element={<SendParcelPage />} />

        <Route path="app" element={<BritiumCustomerTrackingApp />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="portal" element={<PortalRedirect />} />
        <Route path="force-change-password" element={<ForceChangePassword />} />

        <Route path="403" element={<Forbidden />} />
        <Route path="pending" element={<PendingApproval />} />
      </Route>

      {/* Admin */}
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="shipments" element={<ShipmentsPage />} />
        <Route path="shipments/:id" element={<ShipmentDetailsPage />} />

        <Route path="accounting" element={<AccountingHome />} />
        <Route path="accounting/simple-transaction" element={<SimpleTransactionPage />} />
        <Route path="accounting/journal-voucher-entry" element={<JournalVoucherEntryPage />} />
        <Route path="accounting/journal-voucher-list" element={<JournalVoucherListPage />} />
        <Route path="accounting/cash-voucher-entry" element={<CashVoucherEntryPage />} />
        <Route path="accounting/cash-voucher-list" element={<CashVoucherListPage />} />
        <Route path="accounting/chart-of-accounts" element={<ChartOfAccountsPage />} />

        <Route path="reports" element={<ReportsHome />} />
        <Route path="reports/by-deliveryman" element={<ByDeliverymanPage />} />
        <Route path="reports/by-merchant" element={<ByMerchantPage />} />
        <Route path="reports/by-town" element={<ByTownPage />} />
        <Route path="reports/audit-logs" element={<AuditLogsPage />} />

        <Route path="settings" element={<SettingsHome />} />
        <Route path="settings/branches" element={<BranchesPage />} />
        <Route path="settings/permissions" element={<PermissionsPage />} />
        <Route path="settings/service-zones" element={<ServiceZonesPage />} />
        <Route path="settings/promo-codes" element={<PromoCodesPage />} />

        <Route path="users" element={<AdminUsers />} />
        <Route path="management" element={<AdminManagement />} />
        <Route path="bulk-upload" element={<BulkUpload />} />
        <Route path="tariffs" element={<TariffSetting />} />
      </Route>

      {/* Merchant */}
      <Route path="merchant" element={<MerchantLayout />}>
        <Route path="dashboard" element={<MerchantDashboardPage />} />
        <Route path="portal" element={<MerchantPortal />} />
        <Route path="pickups" element={<MerchantPickups />} />
        <Route path="finance" element={<MerchantFinance />} />
        <Route path="create" element={<CreateShipment />} />
        <Route path="bulk-upload" element={<MerchantBulkUpload />} />
      </Route>

      {/* Rider */}
      <Route path="rider" element={<RiderLayout />}>
        <Route path="home" element={<RiderHome />} />
        <Route path="tasks" element={<RiderTaskList />} />
        <Route path="job/:id" element={<JobDetailScreen />} />
        <Route path="pickup/:id" element={<RiderPickupConfirm />} />
        <Route path="deliver/:id" element={<RiderDeliveryConfirm />} />
        <Route path="exception/:id" element={<RiderException />} />
        <Route path="wallet" element={<RiderWallet />} />
        <Route path="profile" element={<RiderProfile />} />
        <Route path="dashboard" element={<RiderDashboardPage />} />
      </Route>

      {/* Vendor */}
      <Route path="vendor" element={<VendorLayout />}>
        <Route path="dashboard" element={<VendorDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
