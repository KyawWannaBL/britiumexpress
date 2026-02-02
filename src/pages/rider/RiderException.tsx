import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, Camera, X, Check } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderException() {
  const { t } = useI18n();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const reasons = [
    'Customer Unavailable', 'Wrong Address', 'Customer Refused Item', 
    'Shop/Office Closed', 'Cannot Contact', 'Bad Weather'
  ];

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-red-600 flex items-center gap-2 uppercase tracking-tight">
          <AlertTriangle /> {t("Failed Job")}
        </h1>
        <button onClick={() => navigate(-1)} className="bg-white border p-2 rounded-full shadow-sm">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">{t("Select Reason")}</label>
          <div className="grid grid-cols-2 gap-3">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedReason(r)}
                className={`p-4 rounded-2xl text-xs font-black border transition-all ${
                  selectedReason === r 
                    ? 'bg-red-600 text-white border-red-600 shadow-lg scale-[1.02]' 
                    : 'bg-white text-gray-600 border-gray-100'
                }`}
              >
                {t(r)}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">{t("Proof (Optional)")}</label>
          <label className="w-full h-40 bg-white rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative shadow-sm">
             {photo ? (
               <img src={photo} alt="Proof" className="absolute inset-0 w-full h-full object-cover" />
             ) : (
               <div className="text-gray-400 flex flex-col items-center">
                 <Camera size={32} className="mb-2" />
                 <span className="text-[10px] font-black uppercase">{t("Take Photo")}</span>
               </div>
             )}
             <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files && setPhoto(URL.createObjectURL(e.target.files[0]))} />
          </label>
        </section>

        <button
          disabled={!selectedReason}
          onClick={() => navigate('/rider/dashboard')}
          className={`w-full py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl transition-all ${
            selectedReason ? 'bg-red-600 text-white active:scale-95' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {t("SUBMIT REPORT")}
        </button>
      </div>
    </div>
  );
}