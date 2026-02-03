import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function ReturnsManagement() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [reason, setReason] = useState("");

  const returnReasons = [
    "Customer Refused", "Wrong Address", "Cannot Contact", "Damaged Item"
  ];

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !reason) return;

    await updateDoc(doc(db, "parcels", code), {
      status: "return_received",
      returnReason: reason,
      updatedAt: serverTimestamp(),
    });
    alert(t("Return processed"));
    setCode("");
    setReason("");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><RotateCcw size={32}/></div>
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Returns Handling")}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("Manage return-to-sender parcels")}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-50">
        <form onSubmit={handleReturn} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Tracking ID")}</label>
            <input 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all outline-none font-mono" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              required 
            />
          </div>import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Search, Download, Printer, Tag } from "lucide-react";

export function WarehouseInventory() {
  const { t } = useI18n();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          <input 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/20 font-bold text-sm"
            placeholder={t("Search by Tracking ID, Name or Route")}
          />
        </div>
        <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#0d2c54] px-6 py-3 rounded-xl hover:bg-gray-50 transition-all">
          <Download size={18} /> {t("Export CSV")}
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-50">
         <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-8 py-5">{t("Tracking")}</th>
                <th className="px-8 py-5">{t("Status")}</th>
                <th className="px-8 py-5">{t("Bin")}</th>
                <th className="px-8 py-5 text-right">{t("Action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-medium text-sm text-[#0d2c54]">
               {/* Data rows mapping parcels */}
               <tr className="hover:bg-gray-50/50 transition-colors">
                 <td className="px-8 py-5 font-mono text-xs font-bold">BE-100234</td>
                 <td className="px-8 py-5"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{t("Sorted")}</span></td>
                 <td className="px-8 py-5 font-black">A-12</td>
                 <td className="px-8 py-5 text-right"><button className="text-gray-300 hover:text-[#ff6b00]"><Printer size={18}/></button></td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t("Return Reason")}</label>
            <select 
              className="w-full p-4 rounded-2xl border-gray-100 bg-gray-50 outline-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">{t("Select Reason")}</option>
              {returnReasons.map(r => <option key={r} value={r}>{t(r)}</option>)}
            </select>
          </div>
          <button className="md:col-span-2 bg-[#0d2c54] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-lg">
            {t("Receive Return")}
          </button>
        </form>
      </div>
    </div>
  );
}