import React from "react";
import { Card } from "@/components/ui/SharedComponents";

export default function VendorDashboard() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">Vendor Dashboard</h2>
        <div className="text-sm text-slate-500">Partner access for integrations and service status.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Integrations</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">1</div>
          <div className="mt-1 text-xs text-slate-500">Active partner connection</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Orders Today</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">0</div>
          <div className="mt-1 text-xs text-slate-500">Awaiting data feed</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Status</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">Healthy</div>
          <div className="mt-1 text-xs text-slate-500">No incidents</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="font-extrabold text-slate-800">Next steps</div>
        <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
          <li>Define vendor data scope (what collections/documents vendor can read/write).</li>
          <li>Set integration keys and webhook endpoints (z.com private hosting).</li>
          <li>Enable server-side KPI aggregation for large datasets.</li>
        </ul>
      </Card>
    </div>
  );
}
