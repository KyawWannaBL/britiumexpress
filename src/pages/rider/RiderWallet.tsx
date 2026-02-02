import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  History 
} from "lucide-react"; // Fixed closed import block
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RiderWallet() {
  const { t } = useI18n();
  // State for MMK balance synchronization
  const [balance] = useState(125000); 

  const transactions = [
    { id: 1, type: 'cod', amount: 45000, date: '2026-02-01', status: 'Settled' },
    { id: 2, type: 'commission', amount: 5000, date: '2026-02-01', status: 'Earned' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0d2c54]">{t("My Wallet")} / ကျွန်ုပ်၏ ပိုက်ဆံအိတ်</h1>
        <p className="text-sm text-gray-500">{t("Track your COD collections and earnings.")}</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-[#0d2c54] to-[#1565C0] text-white border-none shadow-xl mb-8">
        <CardContent className="pt-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm font-medium">{t("Current Balance")}</p>
              <h2 className="text-4xl font-black mt-1">
                {balance.toLocaleString()} <span className="text-lg">MMK</span>
              </h2>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" /> {t("Recent History")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* FIXED SYNTAX: Corrected line 82 ternary operator */}
                  <div className={`p-2 rounded-lg ${tx.type === 'cod' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {tx.type === 'cod' ? <DollarSign size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{tx.type === 'cod' ? t("COD Collection") : t("Delivery Commission")}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'cod' ? 'text-red-600' : 'text-green-600'}`}>
                    {tx.type === 'cod' ? '-' : '+'}{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-gray-400">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}