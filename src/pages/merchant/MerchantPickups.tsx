import React, { useState } from 'react';
import { Truck, Calendar, MapPin, Plus, Clock, ChevronRight } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IPickupRequest } from '@/types/merchant';

export default function MerchantPickups() {
  const { t } = useI18n();
  
  const pickups: IPickupRequest[] = [
    { id: 'PK-202', status: 'assigned', date: 'Today', time: '10:00 AM', location: 'Main Warehouse', rider: 'Kyaw Kyaw', count: 12 },
    { id: 'PK-203', status: 'pending', date: 'Tomorrow', time: '02:00 PM', location: 'Downtown Store', rider: null, count: 50 },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] uppercase tracking-tight">{t("Pickup Requests")}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t("Manage your scheduled pickups.")}</p>
        </div>
        <button className="bg-[#0d2c54] text-white font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest">
          <Plus size={20} /> {t("New Pickup Request")}
        </button>
      </div>

      <div className="space-y-4">
        {pickups.map((p) => (
          <div key={p.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-all group">
            <div className="flex items-center gap-6">
              <div className={`p-5 rounded-3xl ${
                p.status === 'assigned' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
              }`}>
                <Truck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0d2c54]">
                  {p.count} {t("Parcels")} 
                  <span className="text-gray-300 ml-3 font-mono text-sm">#{p.id}</span>
                </h3>
                <div className="flex gap-6 mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {p.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {p.time}</span>
                  <span className="flex items-center gap-1 text-[#ff6b00]"><MapPin size={14}/> {p.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center gap-8">
              {p.rider && (
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{t("Assigned Rider")}</p>
                  <p className="font-black text-[#0d2c54]">{p.rider}</p>
                </div>
              )}
              <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                p.status === 'assigned' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {t(p.status)}
              </div>
              <button className="p-3 text-gray-300 hover:text-[#0d2c54] hover:bg-gray-50 rounded-2xl transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}