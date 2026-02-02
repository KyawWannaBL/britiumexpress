import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Map, Package, Truck, Wifi, WifiOff } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { IRiderStats } from '@/types/rider';

export default function RiderDashboard() {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isOnDuty, setIsOnDuty] = useState<boolean>(false);
  const [stats, setStats] = useState<IRiderStats>({ pending: 12, completed: 5, failed: 1, cod: 45000 });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-[#0d2c54] text-white p-5 rounded-b-[2rem] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">{t("Hello")}, Kyaw Kyaw</h1>
            <p className="text-xs opacity-80">{t("Zone: Downtown-A")}</p>
          </div>
          <button className="p-2 bg-white/10 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0d2c54]"></span>
          </button>
        </div>

        <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi size={18} className="text-green-400"/> : <WifiOff size={18} className="text-red-400"/>}
            <span className="text-sm font-bold">{isOnline ? t("Online") : t("Offline Mode")}</span>
          </div>
          <button 
            onClick={() => setIsOnDuty(!isOnDuty)}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
              isOnDuty ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isOnDuty ? t("ON DUTY") : t("START ROUTE")}
          </button>
        </div>
      </header>

      <div className="p-4 grid grid-cols-2 gap-4 -mt-4">
        <StatCard icon={Package} label={t("Pending Tasks")} value={stats.pending.toString()} color="blue" onClick={() => navigate('/rider/tasks')} />
        <StatCard icon={Truck} label={t("Completed")} value={stats.completed.toString()} color="green" />
        <StatCard label={t("Failed/Return")} value={stats.failed.toString()} color="red" />
        <StatCard label={t("COD On-Hand")} value={`${stats.cod.toLocaleString()} Ks`} color="orange" onClick={() => navigate('/rider/wallet')} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, onClick }: any) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
    orange: "text-orange-600 bg-orange-50"
  };
  return (
    <div onClick={onClick} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform">
      {Icon && <Icon className={`mb-2 ${colors[color as keyof typeof colors]}`} size={24} />}
      <span className="text-2xl font-black text-gray-900">{value}</span>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}