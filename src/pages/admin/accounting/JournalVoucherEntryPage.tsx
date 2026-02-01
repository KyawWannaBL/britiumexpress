import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function JournalVoucherEntryPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle="JournalVoucherEntryPage (scaffold)" />
      <Card className="p-4"><EmptyState /></Card>
    </div>
  );
}
