import React from "react";
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-center fade-in px-4">
      <div className="max-w-md">
        <div className="text-4xl font-extrabold text-slate-900">403</div>
        <div className="mt-2 text-slate-600">You don’t have access to this page.</div>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold brand-gradient text-white">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
