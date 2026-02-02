import React, { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, Check } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IBulkRow } from '@/types/merchant';

export default function BulkUpload() {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);

  const rows: IBulkRow[] = [
    { row: 1, receiver: 'Kyaw Kyaw', phone: '0912345678', address: 'Yangon', status: 'valid' },
    { row: 3, receiver: 'Aung Aung', phone: '123', address: '', status: 'error', msg: t('Invalid Phone & Missing Address') },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in">
      <h1 className="text-3xl font-black text-[#0d2c54] mb-8 uppercase tracking-tight">{t("Bulk Order Upload")}</h1>
      
      {!file ? (
        <div className="border-4 border-dashed border-gray-100 rounded-[3rem] p-20 text-center bg-white hover:border-[#ff6b00] transition-all cursor-pointer group shadow-sm">
          <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <UploadCloud size={48} className="text-[#ff6b00]" />
          </div>
          <h3 className="text-2xl font-black text-[#0d2c54]">{t("Drag & Drop CSV / Excel file")}</h3>
          <p className="text-gray-400 mt-2 font-bold uppercase text-xs tracking-widest">{t("or")} <span className="text-[#ff6b00] underline cursor-pointer">{t("browse computer")}</span></p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-black text-[#0d2c54]">{t("Validation Results")}</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("Check records before submission")}</p>
            </div>
            <button onClick={() => setFile(null)} className="px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl text-xs uppercase tracking-widest">{t("Re-upload")}</button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                <tr>
                  <th className="p-6">{t("Row")}</th>
                  <th className="p-6">{t("Receiver")}</th>
                  <th className="p-6">{t("Status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map((r) => (
                  <tr key={r.row} className={r.status === 'error' ? 'bg-red-50/30' : 'hover:bg-gray-50/50'}>
                    <td className="p-6 text-gray-400 font-mono text-xs">#{r.row}</td>
                    <td className="p-6 font-bold text-[#0d2c54]">{r.receiver}</td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-2 font-black text-[10px] uppercase px-3 py-1.5 rounded-full ${
                        r.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {r.status === 'valid' ? <Check size={12}/> : <AlertTriangle size={12}/>}
                        {t(r.status === 'valid' ? "Valid" : "Error")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}