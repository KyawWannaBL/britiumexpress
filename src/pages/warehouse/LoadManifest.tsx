import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Truck, PackageCheck, ClipboardList, Plus } from "lucide-react";

export default function LoadManifest() {
  const { t } = useI18n();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Manifest Management")}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t("Group parcels for dispatch")}</p>
        </div>
        <button className="bg-[#0d2c54] text-white font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest">
          <Plus size={20} /> {t("Create New Manifest")}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ManifestTypeCard 
          icon={Truck} 
          title={t("Delivery Manifest")} 
          desc={t("Final-mile delivery to customers via riders.")} 
          color="blue"
        />
        <ManifestTypeCard 
          icon={PackageCheck} 
          title={t("Transfer Manifest")} 
          desc={t("Inter-station movement between hubs.")} 
          color="orange"
        />
      </div>
    </div>
  );
}

function ManifestTypeCard({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
        color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-[#ff6b00]'
      }`}>
        <Icon size={40} />
      </div>
      <h3 className="text-2xl font-black text-[#0d2c54] mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-gray-400 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
  );
}