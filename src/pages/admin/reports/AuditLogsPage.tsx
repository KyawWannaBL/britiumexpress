import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "@/i18n/I18nProvider";

export default function AuditLogsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.reports" subtitle={t("AuditLogsPage (scaffold)")} />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}