/**
 * File: src/pages/merchant/MerchantDashboardPage.tsx
 * Description: Design-compliant Merchant portal featuring order tracking and COD stats.
 */

import React, { useState } from "react";
import { 
import { useI18n } from "@/i18n/I18nProvider";
  Card, 
  CardBody, 
  CardHeader, 
  DataTable, 
  StatCard, 
  TextInput, 
  Badge 
} from "../../components/ui/SharedComponents";

// Mock data typed for merchant visibility
type MerchantOrder = {
  id: string;
  customer: string;
  status: "Processing" | "In Transit" | "Delivered" | "Canceled";
  amount: string;
  township: string;
  date: string;
};

const MERCHANT_ORDERS: MerchantOrder[] = [
  { id: "BE001400", customer: "May Thu", status: "In Transit", amount: "12,500 MMK", township: "Hlaing", date: "2026-01-31" },
  { id: "BE001401", customer: "Ko Min", status: "Delivered", amount: "9,000 MMK", township: "Sanchaung", date: "2026-01-30" },
  { id: "BE001402", customer: "Hnin Hnin", status: "Processing", amount: "15,000 MMK", township: "Tamwe", date: "2026-01-31" },
];

export default function MerchantDashboardPage() {
  const { t } = useI18n();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = MERCHANT_ORDERS.filter((order) => {
    const searchString = `${order.id} ${order.customer} ${order.township}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t("Merchant Dashboard")}</h1>
          <p className="text-sm text-slate-500">{t("Manage your store's shipments and COD collections.")}</p>
        </div>
        <TextInput 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder={t("Search by ID, customer, or township...")} 
          className="md:w-80 shadow-sm"
        />
      </div>

      {/* Stats Overview using StatCard with tone compliance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title={t("Orders This Week")} 
          value="74" 
          hint="+12% from last week" 
          tone="blue" 
        />
        <StatCard 
          title={t("Total COD Collected")} 
          value="1,420,000 MMK" 
          hint="Verified funds" 
          tone="green" 
        />
        <StatCard 
          title={t("Pending Payout")} 
          value="320,000 MMK" 
          hint="Next batch: Feb 2" 
          tone="orange" 
        />
      </div>

      {/* Recent Orders Table */}
      <Card className="overflow-hidden border-slate-100 shadow-soft">
        <CardHeader 
          title={t("Recent Orders")} 
          subtitle={t("Real-time status updates for your latest store deliveries.")}
        />
        <CardBody className="p-0">
          <DataTable<MerchantOrder>
            rowKey={(order) => order.id}
            rows={filteredRows}
            columns={[
              { 
                key: "id", 
                title: "Tracking ID", 
                render: (row) => <span className="font-mono font-bold text-blue-700">{row.id}</span> 
              },
              { key: "customer", title: "Customer" },
              { key: "township", title: "Township" },
              { 
                key: "status", 
                title: "Status",
                render: (row) => {
                  const tones: Record<string, "blue" | "green" | "orange" | "red"> = {
                    "In Transit": "blue",
                    "Delivered": "green",
                    "Processing": "orange",
                    "Canceled": "red"
                  };
                  return <Badge tone={tones[row.status]}>{row.status}</Badge>;
                }
              },
              { 
                key: "amount", 
                title: "Amount", 
                className: "text-right font-bold" 
              },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}