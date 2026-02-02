import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  writeBatch,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useI18n } from "@/i18n/I18nProvider";
import { IParcel } from "@/types/britium";
import { CheckCircle } from "lucide-react";

export default function SortingBoard({ stationId }: { stationId: string }) {
  const { t } = useI18n();
  const [parcels, setParcels] = useState<IParcel[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [bin, setBin] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "parcels"),
      where("currentStationId", "==", stationId),
      where("status", "==", "inbound_received")
    );

    return onSnapshot(q, (snap) => {
      setParcels(snap.docs.map((d) => ({ id: d.id, ...d.data() } as IParcel)));
    });
  }, [stationId]);

  const handleSort = async () => {
    const batch = writeBatch(db);

    Object.keys(selected).forEach((id) => {
      if (selected[id]) {
        batch.update(doc(db, "parcels", id), {
          status: "sorted",
          sortBin: bin,
          updatedAt: serverTimestamp(),
        });
      }
    });

    await batch.commit();
    setSelected({});
    setBin("");
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="p-6 space-y-6 animate-in fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-[#0d2c54] uppercase tracking-tight">
            {t("Sorting Board")}
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {parcels.length} {t("Parcels Pending")}
          </p>
        </div>

        <div className="flex gap-3">
          <input
            className="p-3 rounded-xl border border-gray-200 text-sm font-bold uppercase w-32 outline-none focus:border-[#ff6b00]"
            placeholder={t("Bin ID")}
            value={bin}
            onChange={(e) => setBin(e.target.value.toUpperCase())}
          />
          <button
            onClick={handleSort}
            disabled={!bin || selectedCount === 0}
            className="bg-[#ff6b00] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <CheckCircle size={16} /> {t("Apply Sort")}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parcels.map((p) => (
          <div
            key={p.id}
            onClick={() =>
              setSelected((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
            }
            className={`p-5 rounded-[2rem] border-2 transition-all cursor-pointer ${
              selected[p.id]
                ? "border-[#0d2c54] bg-blue-50/50 shadow-md"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs font-bold text-gray-400">
                #{p.trackingId}
              </span>

              {selected[p.id] && (
                <div className="w-5 h-5 bg-[#0d2c54] rounded-full flex items-center justify-center text-white">
                  <CheckCircle size={12} />
                </div>
              )}
            </div>

            <p className="font-black text-[#0d2c54]">{p.receiverName}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 line-clamp-1">
              {p.deliveryAddress}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
