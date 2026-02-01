import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";

function Tile({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition">
      <div className="font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export default function SettingsHome() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.settings" subtitle="System configuration (branches CRUD implemented; others scaffold)." />
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Tile to="/admin/settings/branches" title="Branches" desc="CRUD (Firestore branches collection)" />
          <Tile to="/admin/settings/permissions" title="Permissions" desc="Scaffold" />
          <Tile to="/admin/settings/service-zones" title="Service Zones" desc="Scaffold" />
          <Tile to="/admin/settings/promo-codes" title="Promo Codes" desc="Scaffold" />
        </div>
      </Card>
    </div>
  );
}
