import React from "react";

/**
 * Shared UI components for the Britium Express portal.
 * Corrected to remove duplicate declarations.
 */
export const Toaster = () => (
  <div id="toast-portal" className="fixed bottom-5 right-5 z-[9999]" />
);

export const Loader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D47A1]" />
  </div>
);