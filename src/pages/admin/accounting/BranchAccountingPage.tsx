import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function BranchAccountingPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="acct.branchAccounting" subtitle="Branch accounting snapshots (scaffold)" />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
