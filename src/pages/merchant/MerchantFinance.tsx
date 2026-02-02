import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, Clock, Download, Search, Filter } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { ITransactionRecord, IPayoutRecord } from '@/types/merchant';

export default function MerchantFinance() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'ledger' | 'payouts'>('ledger');

  const transactions: ITransactionRecord[] = [
    { id: 'TX-901', date: '2026-01-28', ref: 'ORD-1122', type: 'COD Collected', amount: 45000, status: 'pending' },
    { id: 'TX-902', date: '2026-01-28', ref: 'ORD-1125', type: 'Delivery Fee', amount: -2500, status: 'deducted' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t("Unsettled COD")}</p>
            <h2 className="text-4xl font-black text-gray-900 mt-2">1,245,000 <span className="text-sm font-bold text-gray-300">{t("MMK")}</span></h2>
            <div className="mt-4 flex items-center gap-2 text-orange-600 text-xs font-bold">
              <Clock size={14} /> {t("Next Payout")}: Feb 1st
            </div>
        </div>

        <div className="bg-[#0d2c54] p-8 rounded-[2rem] shadow-xl text-white flex flex-col justify-between">
          <div>
            <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">{t("Action")}</p>
            <h3 className="font-bold text-xl mt-1">{t("Request Early Payout?")}</h3>
          </div>
          <button className="mt-6 w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95">
            <ArrowUpRight size={18} /> {t("Request Withdrawal")}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-50 flex px-8 pt-2">
          {['ledger', 'payouts'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-5 mr-10 font-black text-xs uppercase tracking-widest border-b-4 transition-all ${
                activeTab === tab ? 'border-[#ff6b00] text-[#0d2c54]' : 'border-transparent text-gray-300'
              }`}
            >
              {tab === 'ledger' ? t("Transaction Ledger") : t("Payout History")}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
              <tr>
                <th className="px-8 py-5">{t("Date")}</th>
                <th className="px-8 py-5">{t("Ref ID")}</th>
                <th className="px-8 py-5 text-right">{t("Amount")}</th>
                <th className="px-8 py-5 text-center">{t("Status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-gray-500 text-sm">{tx.date}</td>
                  <td className="px-8 py-5 font-mono text-xs font-bold text-[#0d2c54]">{tx.ref}</td>
                  <td className={`px-8 py-5 text-right font-black ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      tx.status === 'payable' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {t(tx.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}