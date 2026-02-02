import React, { useState } from 'react';
import { ChevronRight, Package, Truck, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function CreateShipment() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Progress Stepper */}
        <div className="flex justify-between mb-12 relative px-4">
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-0"></div>
          {[
            { id: 1, label: t('Pickup'), icon: MapPin },
            { id: 2, label: t('Receiver'), icon: Truck },
            { id: 3, label: t('Parcel'), icon: Package },
            { id: 4, label: t('Service'), icon: CreditCard }
          ].map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center bg-gray-50 px-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step >= s.id ? 'bg-[#0d2c54] text-white scale-110 shadow-lg' : 'bg-gray-300 text-white'
              }`}>
                <s.icon size={18} />
              </div>
              <span className={`text-[10px] font-black uppercase mt-3 tracking-widest ${step >= s.id ? 'text-[#0d2c54]' : 'text-gray-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-12 animate-in slide-in-from-right-8 duration-500">
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-black text-[#0d2c54]">{t("Select Pickup Location")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Main Warehouse', 'Downtown Store'].map((loc) => (
                    <label key={loc} className="border-2 border-gray-100 p-6 rounded-[2rem] cursor-pointer hover:border-[#ff6b00] hover:bg-orange-50/30 transition-all flex items-start gap-4">
                      <input type="radio" name="pickup" className="mt-1 accent-[#ff6b00]" />
                      <div>
                        <span className="font-black text-[#0d2c54] block">{t(loc)}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">{t("123 Merchant Road, Yangon")}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 2, 3, 4 forms would follow same styling */}
          </div>

          <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))} 
              className={`px-8 py-3 font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 ${step === 1 ? 'invisible' : ''}`}
            >
              {t("Back")}
            </button>
            <button 
              onClick={() => step < 4 ? setStep(s => s + 1) : alert("Created")} 
              className="px-10 py-4 bg-[#ff6b00] text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-all flex items-center gap-3"
            >
              {step < 4 ? <>{t("Next Step")} <ChevronRight size={18} /></> : <>{t("Confirm & Print")} <CheckCircle size={18}/></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}