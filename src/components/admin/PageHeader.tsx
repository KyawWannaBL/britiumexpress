import React from "react";
import { useI18n } from "../../i18n/I18nProvider";

export default function PageHeader({
  titleKey,
  subtitle,
  right,
}: {
  titleKey: string;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">{t(titleKey)}</h2>
        {subtitle ? <div className="text-sm text-slate-500 mt-1">{subtitle}</div> : null}
      </div>
      {right ? <div className="self-start md:self-auto">{right}</div> : null}
    </div>
  );
}
