import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import { useI18n } from "@/i18n/I18nProvider";

export default function VendorDashboard() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">{t("Vendor Dashboard")}</h2>
        <div className="text-sm text-slate-500">{t("Partner access for integrations and service status.")}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("Integrations")}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{t("1")}</div>
          <div className="mt-1 text-xs text-slate-500">{t("Active partner connection")}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("Orders Today")}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{t("0")}</div>
          <div className="mt-1 text-xs text-slate-500">{t("Awaiting data feed")}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("Status")}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{t("Healthy")}</div>
          <div className="mt-1 text-xs text-slate-500">{t("No incidents")}</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="font-extrabold text-slate-800">{t("Next steps")}</div>
        <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
          <li>{t("Define vendor data scope (what collections/documents vendor can read/write).")}</li>
          <li>{t("Set integration keys and webhook endpoints (z.com private hosting).")}</li>
          <li>{t("Enable server-side KPI aggregation for large datasets.")}</li>
        </ul>
      </Card>
    </div>
  );
}