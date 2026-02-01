import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "@/i18n/I18nProvider";

function Tile({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition">
      <div className="font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export default function ReportsHome() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.reports" subtitle={t("Client-side for now. For large datasets, move aggregation to server API (z.com) later.")} />
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Tile to="/admin/reports/by-deliveryman" title={t("By Deliveryman")} desc="Scaffold" />
          <Tile to="/admin/reports/by-merchant" title={t("By Merchant")} desc="Scaffold" />
          <Tile to="/admin/reports/by-town" title={t("By Town")} desc="Scaffold" />
          <Tile to="/admin/reports/audit-logs" title={t("Audit Logs")} desc="Scaffold" />
        </div>
      </Card>
    </div>
  );
}