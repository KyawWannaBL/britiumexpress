import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";

function Tile({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition">
      <div className="font-extrabold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </Link>
  );
}

export default function AccountingHome() {
  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.accounting" subtitle="Client-side for now. For large data, move KPI/ledger aggregation to your private server (z.com) and call via API." />
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <Tile to="/admin/accounting/simple-transaction" title="Simple Transaction" desc="Write revenue/expense into Firestore financials collection." />
          <Tile to="/admin/accounting/journal-voucher-entry" title="Journal Voucher Entry" desc="Scaffold (to be implemented) for double-entry vouchers." />
          <Tile to="/admin/accounting/journal-voucher-list" title="Journal Voucher List" desc="Scaffold list + export." />
          <Tile to="/admin/accounting/cash-voucher-entry" title="Cash Voucher Entry" desc="Scaffold entry." />
          <Tile to="/admin/accounting/cash-voucher-list" title="Cash Voucher List" desc="Scaffold list." />
          <Tile to="/admin/accounting/chart-of-accounts" title="Chart of Accounts" desc="Scaffold CRUD for accounts." />
        </div>
      </Card>
    </div>
  );
}
