import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, PenTool, DollarSign, ChevronLeft, Check } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderDeliveryConfirm() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [codCollected, setCodCollected] = useState(false);
  const [signature, setSignature] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const canComplete = codCollected && (signature || photo);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-4 shadow-sm flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)}><ChevronLeft /></button>
        <h1 className="font-black text-lg ml-4 uppercase tracking-tight">{t("Confirm Delivery")}</h1>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-red-700 font-black uppercase text-xs">
              <DollarSign size={18} /> {t("Collect Cash")}
            </div>
            <span className="text-3xl font-black text-red-600">45,000 Ks</span>
          </div>
          
          <button 
            onClick={() => setCodCollected(!codCollected)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              codCollected ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-white border-red-200 text-red-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${codCollected ? 'bg-white border-white' : 'border-red-200'}`}>
              {codCollected && <Check size={16} className="text-red-600" />}
            </div>
            <span className="font-black text-sm uppercase tracking-tight">{t("I have collected the full amount")}</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-black text-[#0d2c54] text-xs uppercase tracking-widest ml-2">{t("Proof of Delivery")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <ProofButton 
              active={signature} 
              icon={PenTool} 
              label={t("SIGNATURE")} 
              onClick={() => setSignature(true)} 
            />
            <ProofButton 
              active={!!photo} 
              icon={Camera} 
              label={t("PHOTO")} 
              onClick={() => setPhoto("demo-photo-path")} 
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button 
          disabled={!canComplete}
          onClick={() => navigate('/rider/dashboard')}
          className={`w-full py-4 rounded-2xl font-black shadow-lg transition-all ${
            canComplete ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {t("COMPLETE DELIVERY")}
        </button>
      </div>
    </div>
  );
}

function ProofButton({ active, icon: Icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`h-36 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${
        active ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-400'
      }`}
    >
      {active ? <Check size={32} /> : <Icon size={32} />}
      <span className="mt-2 text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}