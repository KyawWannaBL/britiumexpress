import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { Truck, CheckCircle, XCircle } from "lucide-react";
import { ParcelStatus } from "@/types/britium";

export default function ScanOut() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [lastScan, setLastScan] = useState<{ code: string; ok: boolean } | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    try {
      // Logic for final mile vs station transfer can be toggled here
      await updateDoc(doc(db, "parcels", code), {
        status: "out_for_delivery" as ParcelStatus,
        updatedAt: serverTimestamp(),
      });
      setLastScan({ code, ok: true });
      setCode("");
    } catch (err) {
      setLastScan({ code, ok: false });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-orange-50 text-[#ff6b00] rounded-[2rem] flex items-center justify-center mx-auto mb-4">
          <Truck size={40} />
        </div>
        <h1 className="text-2xl font-black text-[#0d2c54] uppercase">{t("Outbound Operations")}</h1>
        <p className="text-gray-500 font-medium">{t("Scan parcels for dispatch or delivery")}</p>
      </div>

      <form onSubmit={handleScan} className="space-y-4">
        <input 
          className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-[#0d2c54] outline-none font-mono text-center text-lg uppercase tracking-widest"
          placeholder={t("Scan Tracking ID")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button className="w-full bg-[#ff6b00] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          {t("Confirm Dispatch")}
        </button>
      </form>

      {lastScan && (
        <div className={`p-4 rounded-2xl flex items-center justify-between border-2 ${lastScan.ok ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
          <span className="font-bold font-mono">{lastScan.code}</span>
          <span className="font-black text-xs uppercase">{lastScan.ok ? t("Success") : t("Error")}</span>
        </div>
      )}
    </div>
  );
}