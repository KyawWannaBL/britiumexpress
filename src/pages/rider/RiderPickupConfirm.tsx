import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, Scan, CheckCircle, ChevronLeft, Package, Loader2 } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderPickupConfirm() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: '101', name: 'Shoe Box (Nike)', scanned: false },
    { id: '102', name: 'Accessory Bag', scanned: false },
  ]);
  const [photoProof, setPhotoProof] = useState<string | null>(null);

  const handleScan = () => {
    const nextIndex = items.findIndex(i => !i.scanned);
    if (nextIndex !== -1) {
      const newItems = [...items];
      newItems[nextIndex].scanned = true;
      setItems(newItems);
    }
  };

  const canSubmit = items.every(i => i.scanned) && photoProof;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-4 shadow-sm flex items-center">
        <button onClick={() => navigate(-1)}><ChevronLeft /></button>
        <h1 className="font-black text-lg ml-4">{t("Pickup Verification")}</h1>
      </div>

      <div className="flex-1 p-5 space-y-6">
        <div className="bg-[#0d2c54] text-white rounded-[2rem] p-8 flex flex-col items-center shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-4xl font-black">{items.filter(i => i.scanned).length} / {items.length}</h2>
            <p className="opacity-60 text-xs font-bold uppercase tracking-widest mt-1">{t("Items Scanned")}</p>
          </div>
          <button 
            onClick={handleScan}
            className="w-full bg-[#ff6b00] hover:bg-[#e66000] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95"
          >
            <Scan size={24} /> {t("TAP TO SCAN")}
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="font-black text-[#0d2c54] text-xs uppercase tracking-widest ml-2">{t("Manifest")}</h3>
          {items.map((item) => (
            <div key={item.id} className={`p-5 rounded-2xl border transition-all ${item.scanned ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Package className={item.scanned ? 'text-green-600' : 'text-gray-300'} />
                  <span className={`font-bold ${item.scanned ? 'text-green-900' : 'text-gray-600'}`}>{item.name}</span>
                </div>
                {item.scanned && <CheckCircle className="text-green-500" size={20} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <button 
          disabled={!canSubmit}
          onClick={() => navigate('/rider/dashboard')}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-md ${
            canSubmit ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {t("CONFIRM PICKUP")}
        </button>
      </div>
    </div>
  );
}