import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function ProfitLossPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="fin.profitLoss" subtitle="Profit & loss summary (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
