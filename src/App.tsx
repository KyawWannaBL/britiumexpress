import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

import HomePage from "@/pages/public/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import WarehouseDashboard from "@/pages/warehouse/Dashboard";
import SortingBoard from "@/pages/warehouse/SortingBoard";
import ScanIn from "@/pages/warehouse/ScanIn";
import ScanOut from "@/pages/warehouse/ScanOut";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { user, profile, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center font-bold">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && profile?.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/warehouse/*"
        element={
          <ProtectedRoute role="warehouse">
            <Routes>
              <Route path="dashboard" element={<WarehouseDashboard stationId="YGN-01" />} />
              <Route path="scan-in" element={<ScanIn />} />
              <Route path="scan-out" element={<ScanOut />} />
              <Route path="sorting" element={<SortingBoard />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
