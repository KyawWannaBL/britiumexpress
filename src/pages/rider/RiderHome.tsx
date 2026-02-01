import React from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderHome() {
  const { t } = useI18n();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="rounded-2xl border bg-white shadow-soft p-6">
        <div className="text-2xl font-extrabold text-slate-900">{t("Rider Home")}</div>
        <div className="mt-2 text-sm text-slate-600">
          Upcoming assignments, route map, and proof-of-delivery tools will appear here.
        </div>
      </div>
    </div>
  );
}