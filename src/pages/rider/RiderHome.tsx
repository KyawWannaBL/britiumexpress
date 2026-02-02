import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Briefcase } from "lucide-react";

export default function RiderHome() {
  const { t } = useI18n();

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-[3rem] border border-gray-100 bg-white shadow-xl p-10 text-center">
        <div className="w-20 h-20 bg-blue-50 text-[#0d2c54] rounded-[2rem] flex items-center justify-center mx-auto mb-6">
          <Briefcase size={40} />
        </div>
        <h1 className="text-3xl font-black text-[#0d2c54]">{t("Rider Home")}</h1>
        <p className="mt-4 text-gray-500 font-medium leading-relaxed">
          {t("Upcoming assignments, route map, and proof-of-delivery tools will appear here.")}
        </p>
      </div>
    </div>
  );
}