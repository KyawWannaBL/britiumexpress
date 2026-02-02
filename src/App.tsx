import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { I18nProvider } from "./i18n/I18nProvider";
import AppRoutes from "./routes/routes"; // Fixed pathing
import { Toaster } from "./components/ui/SharedComponents"; // Resolved export

function App() {
  return (
    <I18nProvider defaultLocale="en">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 font-sans antialiased">
            <AppRoutes />
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;