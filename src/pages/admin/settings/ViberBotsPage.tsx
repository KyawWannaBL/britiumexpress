import React from "react";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";

export default function ViberBotsPage() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="settings.viberBots" subtitle="Viber bots integration (scaffold)." />
      <Card className="p-4">
        <EmptyState />
      </Card>
    </div>
  );
}
