import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider"; // Fixed syntax
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Globe
} from "lucide-react"; // Closed block
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { t } = useI18n();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d2c54]">
          {t("System Overview")} / စနစ်အနှစ်ချုပ် ကြည့်ရှုရန်
        </h1>
        <p className="text-gray-500">{t("Real-time logistics monitoring.")}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Package} label={t("Total Shipments")} value="1,420" color="blue" />
        <StatCard icon={Truck} label={t("In Transit")} value="85" color="orange" />
        <StatCard icon={Globe} label={t("International")} value="42" color="purple" />
        <StatCard icon={TrendingUp} label={t("Revenue (MMK)")} value="4.2M" color="green" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
    green: "text-green-600 bg-green-50"
  };
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="pt-6 flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}><Icon className="h-6 w-6" /></div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-xl font-bold text-[#0d2c54]">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}