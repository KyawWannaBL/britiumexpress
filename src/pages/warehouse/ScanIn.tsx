import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { PackageSearch, CheckCircle } from "lucide-react";

export default function ScanIn({ stationName, stationId }: { stationName: string; stationId: string }) {
  const { t } = useI18n();
  const [code, setCode] = useState("");

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    try {
      await updateDoc(doc(db, "parcels", code), {
        status: "inbound_received",
        currentStationId: stationId,
        updatedAt: serverTimestamp(),
      });
      setCode("");
      alert(t("Scanned successfully"));
    } catch (err) {
      alert(t("Parcel not found"));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#0d2c54] rounded-[2rem] flex items-center justify-center mx-auto mb-4">
          <PackageSearch size={40} />
        </div>
        <h1 className="text-2xl font-black text-[#0d2c54] uppercase">{t("Inbound Operations")}</h1>
        <p className="text-gray-500 font-medium">{t("Station")}: {stationName}</p>
      </div>

      <form onSubmit={handleScan} className="space-y-4">
        <input 
          className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-[#ff6b00] outline-none font-mono text-center text-lg uppercase tracking-widest"
          placeholder={t("Scan Tracking ID")}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button className="w-full bg-[#0d2c54] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          {t("Confirm Reception")}
        </button>
      </form>
    </div>
  );
}