import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { I18nProvider } from "./i18n/I18nProvider";
import AppRoutes from "./routes/routes"; // Fixed: Updated to match lowercase filename in your Git logs
import { Toaster } from "./components/ui/SharedComponents";

/**
 * Main Application Entry Point
 * Synchronizes 10-tier user hierarchy with Firebase Auth and Bilingual logic
 */
function App() {
  return (
    // Wraps the application in I18n for English/Myanmar Unicode support
    <I18nProvider defaultLocale="en">
      {/* Synchronizes user session state across all portals (Admin, Merchant, Rider) */}
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 font-sans antialiased">
            {/* Centralized Role-Based Access Control (RBAC) */}
            <AppRoutes />
            
            {/* Global toast system for bilingual status updates and errors */}
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;