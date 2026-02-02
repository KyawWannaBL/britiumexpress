import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/auth/AuthContext";
import { I18nProvider } from "@/i18n/I18nProvider";

// Import Portals
import HomePage from "@/pages/public/HomePage";
import MerchantDashboard from "@/pages/merchant/MerchantDashboardPage";
import RiderDashboard from "@/pages/rider/RiderDashboard";
import WarehouseDashboard from "@/pages/warehouse/Dashboard";
import LoginPage from "@/pages/auth/LoginPage";

// Protected Route Guard
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && profile?.role !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Merchant Portal */}
            <Route path="/merchant/*" element={
              <ProtectedRoute role="merchant">
                <Routes>
                  <Route path="dashboard" element={<MerchantDashboard />} />
                  {/* Other Merchant routes... */}
                </Routes>
              </ProtectedRoute>
            } />

            {/* Rider Portal */}
            <Route path="/rider/*" element={
              <ProtectedRoute role="rider">
                <Routes>
                  <Route path="dashboard" element={<RiderDashboard />} />
                  {/* Other Rider routes... */}
                </Routes>
              </ProtectedRoute>
            } />

            {/* Warehouse Portal */}
            <Route path="/warehouse/*" element={
              <ProtectedRoute role="warehouse">
                <Routes>
                  <Route path="dashboard" element={<WarehouseDashboard stationId="YGN-01" />} />
                  {/* Other Warehouse routes... */}
                </Routes>
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}