import React, { useState, useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Search, Download, Printer, Box } from "lucide-react";
import { IParcel } from "@/types/britium";

export default function WarehouseInventory({ parcels }: { parcels: IParcel[] }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => 
    parcels.filter(p => p.trackingId.toLowerCase().includes(query.toLowerCase())), 
  [parcels, query]);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-[#0d2c54] text-white p-8 rounded-[3rem] shadow-xl flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight">{t("Inventory")}</h2>
          <p className="opacity-60 text-xs font-bold uppercase mt-1 tracking-widest">{filtered.length} {t("Items in Station")}</p>
        </div>
        <div className="relative w-64">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
           <input 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 outline-none focus:bg-white/20 transition-all font-bold text-sm"
              placeholder={t("Filter by Tracking...")}
              onChange={(e) => setQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-8 py-5">{t("Tracking")}</th>
              <th className="px-8 py-5">{t("Status")}</th>
              <th className="px-8 py-5">{t("Bin")}</th>
              <th className="px-8 py-5 text-right">{t("Action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors font-medium">
                <td className="px-8 py-5 font-mono text-xs font-bold text-[#0d2c54]">{p.trackingId}</td>
                <td className="px-8 py-5"><span className="text-[10px] font-black uppercase text-blue-600">{t(p.status)}</span></td>
                <td className="px-8 py-5 font-black text-gray-400">{p.routeCode || "-"}</td>
                <td className="px-8 py-5 text-right"><button className="text-gray-300 hover:text-[#ff6b00]"><Printer size={18}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}