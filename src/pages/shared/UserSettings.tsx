import React from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/auth/AuthContext";
import { User, Globe, Lock, Bell, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserSettings() {
  const { t, locale, setLocale } = useI18n();
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#0d2c54] mb-8">{t("Settings")} / ဆက်တင်များ</h1>

      <div className="space-y-6">
        {/* Language Selection */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="text-sm font-bold text-gray-500 flex items-center gap-2">
                <Globe className="h-4 w-4" /> {t("Language Preferences")}
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <button 
                onClick={() => setLocale('en')}
                className={`w-full flex justify-between items-center p-3 rounded-xl border transition-all ${locale === 'en' ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}
              >
                <span className="font-bold">English (US)</span>
                {locale === 'en' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
              </button>
              <button 
                onClick={() => setLocale('my')}
                className={`w-full flex justify-between items-center p-3 rounded-xl border transition-all ${locale === 'my' ? 'border-blue-600 bg-blue-50' : 'bg-white'}`}
              >
                <span className="font-bold">မြန်မာဘာသာ (Unicode)</span>
                {locale === 'my' && <div className="h-2 w-2 rounded-full bg-blue-600" />}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-red-50 p-2 rounded-lg text-red-600"><Lock className="h-5 w-5" /></div>
              <div>
                <p className="font-bold text-gray-900">{t("Security")}</p>
                <p className="text-xs text-gray-500">{t("Change password and two-factor auth")}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-300" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}