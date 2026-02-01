import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <Card className="p-8 max-w-lg w-full">
        <div className="text-2xl font-extrabold text-slate-900">404</div>
        <div className="mt-2 text-sm text-slate-600">Page not found.</div>
        <Link to="/" className="inline-block mt-5 rounded-xl px-4 py-2 font-extrabold brand-accent text-white">
          Go Home
        </Link>
      </Card>
    </div>
  );
}
