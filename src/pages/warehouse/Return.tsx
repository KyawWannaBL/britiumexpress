import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
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
          </div>
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