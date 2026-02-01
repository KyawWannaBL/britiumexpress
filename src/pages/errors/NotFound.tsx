import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <Card className="p-8 max-w-lg w-full">
        <div className="text-2xl font-extrabold text-slate-900">{t("404")}</div>
        <div className="mt-2 text-sm text-slate-600">{t("Page not found.")}</div>
        <Link to="/" className="inline-block mt-5 rounded-xl px-4 py-2 font-extrabold brand-accent text-white">
          Go Home
        </Link>
      </Card>
    </div>
  );
}