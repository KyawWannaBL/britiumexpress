import React from "react";

/**
 * Shared UI Components
 * Resolves export resolution error in App.tsx
 */
export const Toaster = () => {
  return (
    <div 
      id="toaster-container" 
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
    />
  );
};

// Additional shared UI components can be exported here
export const Loader = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
);