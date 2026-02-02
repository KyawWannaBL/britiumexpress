import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider"; 
import { 
    Users, 
    UserPlus, 
    ShieldCheck, 
    UserCog, 
    Search, 
    Filter,
    Settings
} from "lucide-react"; // Fixed: Closed import block
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminManagement() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0d2c54]">{t("User Management")} / အသုံးပြုသူ စီမံခန့်ခွဲမှု</h1>
          <p className="text-gray-500">{t("Manage 10-tier hierarchy system.")} / အဆင့် ၁၀ ဆင့်ရှိ အသုံးပြုသူစနစ်အား စီမံရန်</p>
        </div>
        <Button className="bg-[#ff6b00] hover:bg-[#e66000]">
          <UserPlus className="mr-2 h-4 w-4" /> {t("Add Staff")} / ဝန်ထမ်းအသစ်ထည့်ရန်
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Users} label={`${t("Total Users")} / စုစုပေါင်း`} value="1,240" />
        <StatCard icon={ShieldCheck} label={`${t("Active Admins")} / အက်ဒမင်များ`} value="14" />
        <StatCard icon={UserCog} label={`${t("Pending")} / စောင့်ဆိုင်းဆဲ`} value="3" />
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#0d2c54] font-bold">{t("Staff Accounts")} / ဝန်ထမ်းစာရင်း</CardTitle>
          <div className="flex gap-2">
            <Input 
                placeholder={t("Search...")} 
                className="w-64" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        {/* Table Content implementation */}
      </Card>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="pt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold mt-1 text-[#0d2c54]">{value}</h3>
        </div>
        <div className="bg-orange-100 p-3 rounded-lg"><Icon className="text-[#ff6b00] h-6 w-6" /></div>
      </CardContent>
    </Card>
  );
}