import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, MessageCircle, Navigation, ChevronLeft, AlertTriangle } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IJob } from '@/types/rider';

export default function JobDetailScreen() {
  const { t } = useI18n();
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Mock data - In production, fetch from Firestore
  const job: IJob = {
    id: jobId || "---",
    type: 'delivery',
    customerName: 'Maung Maung',
    phone: '+95912345678',
    address: 'Room 5A, Build 12, Hledan Center, Kamayut Tsp',
    codAmount: 45000,
    slaTime: '14:30',
    notes: 'Doorbell is broken, please call upon arrival.',
    isFragile: true,
    tags: ['COD', 'Express']
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-4 flex items-center shadow-sm border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft /></button>
        <h1 className="font-extrabold text-lg ml-2">{t("Job")} #{job.id}</h1>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="text-xl font-black text-[#0d2c54]">{job.customerName}</h2>
          <p className="text-gray-500 mt-2 font-medium leading-snug">{job.address}</p>
          
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-green-50 text-green-700 py-3 rounded-2xl font-black flex items-center justify-center gap-2 border border-green-100">
              <Phone size={18} /> {t("Call")}
            </button>
            <button className="flex-1 bg-blue-50 text-[#0d2c54] py-3 rounded-2xl font-black flex items-center justify-center gap-2 border border-blue-100">
              <Navigation size={18} /> {t("Map")}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-widest mb-4">{t("Shipment Details")}</h3>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-gray-600 font-bold">{t("Collect COD")}</span>
            <span className="font-black text-xl text-red-600">{job.codAmount.toLocaleString()} Ks</span>
          </div>

          {job.isFragile && (
            <div className="mt-4 bg-red-50 p-4 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-black border border-red-100">
              <AlertTriangle size={20} />
              {t("Handle with Care: FRAGILE")}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3">
        <button 
          onClick={() => navigate(`/rider/exception/${job.id}`)}
          className="bg-red-50 text-red-600 px-6 rounded-2xl font-black text-xs uppercase"
        >
          {t("Failed")}
        </button>
        <button 
          onClick={() => navigate(job.type === 'delivery' ? `/rider/delivery-confirm/${job.id}` : `/rider/pickup-confirm/${job.id}`)}
          className="flex-1 bg-[#0d2c54] text-white rounded-2xl font-black py-4 shadow-lg active:scale-95 transition-all"
        >
          {job.type === 'delivery' ? t("CONFIRM DELIVERY") : t("START PICKUP")}
        </button>
      </div>
    </div>
  );
}