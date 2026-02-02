import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";
import { Truck, MapPin, CheckCircle, Navigation } from "lucide-react";

interface ITransitRoute {
  id: string;
  fromStationName: string;
  toStationId: string;
  vehicleNo: string;
  status: "PLANNED" | "DISPATCHED" | "ARRIVED";
}

export default function TransitRoutes({ stationId }: { stationId: string }) {
  const { t } = useI18n();
  const [routes, setRoutes] = useState<ITransitRoute[]>([]);

  useEffect(() => {
    const q = query(collection(db, "transit_routes"), where("fromStationId", "==", stationId));
    return onSnapshot(q, (snap) => {
      setRoutes(snap.docs.map(d => ({ id: d.id, ...d.data() } as ITransitRoute)));
    });
  }, [stationId]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen animate-in fade-in">
      <header className="flex items-center gap-4">
        <div className="p-4 bg-orange-50 text-[#ff6b00] rounded-2xl"><Navigation size={32}/></div>
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Transit Routes")}</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("Inter-hub Transfers")}</p>
        </div>
      </header>

      <div className="grid gap-4">
        {routes.map(route => (
          <div key={route.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Truck size={24}/></div>
              <div>
                <p className="font-black text-[#0d2c54]">{t("To")}: {route.toStationId}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{route.vehicleNo}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-orange-50 text-[#ff6b00] px-4 py-1 rounded-full text-[10px] font-black uppercase">{t(route.status)}</span>
              <button className="text-gray-300 hover:text-[#0d2c54] transition-colors"><CheckCircle size={24}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}