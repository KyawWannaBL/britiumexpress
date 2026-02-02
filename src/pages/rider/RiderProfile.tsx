import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Truck, LogOut, Globe, Phone, ChevronRight, Shield } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";

export default function RiderProfile() {
  const { t, locale, setLocale } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-8 flex flex-col items-center border-b border-gray-100 rounded-b-[3rem] shadow-sm">
        <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl mb-4 bg-gray-100">
          <img src="https://ui-avatars.com/api/?name=Kyaw+Kyaw&background=0d2c54&color=fff" alt="Profile" />
        </div>
        <h1 className="text-2xl font-black text-[#0d2c54]">Kyaw Kyaw</h1>
        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{t("ID: RIDER-MM-0042")}</p>
      </div>

      <div className="p-6 space-y-4">
        <ProfileSection title={t("Vehicle Details")}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-[#0d2c54] rounded-2xl"><Truck size={20}/></div>
              <div>
                <p className="font-black text-gray-900 text-sm">Honda Click 125i</p>
                <p className="text-[10px] font-bold text-gray-400">YGN-12345</p>
              </div>
            </div>
            <button className="text-[#ff6b00] text-xs font-black uppercase">{t("Edit")}</button>
          </div>
        </ProfileSection>

        <ProfileSection title={t("App Settings")}>
          <button 
            onClick={() => setLocale(locale === 'en' ? 'my' : 'en')}
            className="w-full p-4 flex items-center justify-between border-b border-gray-50"
          >
            <div className="flex items-center gap-4 text-gray-700 font-bold text-sm">
              <Globe size={18} /> {t("Language")}
            </div>
            <span className="text-[10px] font-black uppercase text-[#ff6b00]">
              {locale === 'en' ? 'English' : 'မြန်မာ'}
            </span>
          </button>
        </ProfileSection>

        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-red-50 text-red-600 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 border border-red-100 active:scale-95 transition-all"
        >
          <LogOut size={18} /> {t("Log Out")}
        </button>
      </div>
    </div>
  );
}

function ProfileSection({ title, children }: any) {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 font-black text-[10px] uppercase text-gray-400 tracking-widest">{title}</div>
      {children}
    </div>
  );
}