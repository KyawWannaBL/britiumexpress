import React from "react";
import { useI18n } from "../../i18n/I18nProvider";

export default function EmptyState({ messageKey = "common.noData" }: { messageKey?: string }) {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
      <div className="text-sm text-slate-600 font-semibold">{t(messageKey)}</div>
    </div>
  );
}
