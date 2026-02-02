import React, { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { collection, query, where, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { IWarehouseStats } from "@/types/britium";

export default function WarehouseDashboard({ stationId }: { stationId: string }) {
  const { t } = useI18n();
  const [stats, setStats] = useState<IWarehouseStats>({ inbound: 0, sorted: 0, manifested: 0, outForDelivery: 0 });

  useEffect(() => {
    async function fetchKPIs() {
      const baseQ = query(collection(db, "parcels"), where("currentStationId", "==", stationId));
      
      const counts = await Promise.all([
        getCountFromServer(query(baseQ, where("status", "==", "inbound_received"))),
        getCountFromServer(query(baseQ, where("status", "==", "sorted"))),
        getCountFromServer(query(baseQ, where("status", "==", "manifested"))),
        getCountFromServer(query(baseQ, where("status", "==", "out_for_delivery")))
      ]);

      setStats({
        inbound: counts[0].data().count,
        sorted: counts[1].data().count,
        manifested: counts[2].data().count,
        outForDelivery: counts[3].data().count,
      });
    }
    if (stationId) fetchKPIs();
  }, [stationId]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Station Monitoring")}</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label={t("Inbound")} value={stats.inbound} color="blue" />
        <KPICard label={t("Sorted")} value={stats.sorted} color="orange" />
        <KPICard label={t("Ready to Load")} value={stats.manifested} color="green" />
        <KPICard label={t("On Route")} value={stats.outForDelivery} color="red" />
      </div>
    </div>
  );
}

function KPICard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 text-center">
      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{label}</p>
      <p className={`text-3xl font-black text-${color}-600`}>{value}</p>
    </div>
  );
}