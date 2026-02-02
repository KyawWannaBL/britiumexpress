import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Wallet, DollarSign, History, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RiderWallet() {
  const { t } = useI18n();
  const [balance] = useState(125000); // MMK

  const transactions = [
    { id: 1, type: 'cod', amount: 45000, date: '2026-02-01', status: 'Settled' },
    { id: 2, type: 'commission', amount: 5000, date: '2026-02-01', status: 'Earned' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="bg-gradient-to-br from-[#0d2c54] to-[#1565C0] text-white border-none shadow-xl mb-8">
        <CardContent className="pt-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium">{t("Available Balance")}</p>
              <h2 className="text-4xl font-black mt-1">{balance.toLocaleString()} MMK</h2>
            </div>
            <Wallet className="h-10 w-10 opacity-40" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="border-b"><CardTitle className="text-lg font-bold">{t("History")}</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tx.type === 'cod' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {/* Fixed ternary logic from line 82 */}
                    {tx.type === 'cod' ? <DollarSign size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{tx.type === 'cod' ? t("COD") : t("Earned")}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-bold ${tx.type === 'cod' ? 'text-red-600' : 'text-green-600'}`}>
                   {tx.type === 'cod' ? '-' : '+'}{tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}