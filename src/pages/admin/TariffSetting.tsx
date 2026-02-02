import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Globe, Save, Plus, Trash2 } from "lucide-react";
import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableRow, 
    TableHead, 
    TableCell 
} from "@/components/ui/table"; // Fixed: Closed UI import
import { Button } from "@/components/ui/button";

export default function TariffSetting() {
  const { t } = useI18n();
  // Data sourced from 24.12.2025 list
  const [rates] = useState([
    { country: "Thailand 🇹🇭", slab: "5-10 Kg", mmk: 15000, region: "Asia" },
    { country: "Japan 🇯🇵", slab: "5-10 Kg", mmk: 65000, region: "Asia" },
    { country: "USA 🇺🇸", slab: "5-10 Kg", mmk: 119000, region: "North America" },
    { country: "Australia 🇦🇺", slab: "5-10 Kg", mmk: 95000, region: "Oceania" }
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0d2c54] flex items-center gap-2">
          <Globe className="h-5 w-5" /> {t("MMK Tariff Configuration")} / ပို့ဆောင်ခ နှုန်းထားများ
        </h2>
        <div className="flex gap-2">
            <Button variant="outline">{t("Add Route")} / လမ်းကြောင်းအသစ်</Button>
            <Button className="bg-[#ff6b00] hover:bg-[#e66000]"><Save className="mr-2 h-4 w-4" /> {t("Save")} / သိမ်းရန်</Button>
        </div>
      </div>

      <Table className="border border-gray-100 rounded-lg">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>{t("Country")} / နိုင်ငံ</TableHead>
            <TableHead>{t("Weight Slab")} / အလေးချိန်</TableHead>
            <TableHead>{t("Proposed Price (MMK)")} / ဈေးနှုန်း</TableHead>
            <TableHead>{t("Region")} / ဒေသ</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="font-bold text-[#0d2c54]">{r.country}</TableCell>
              <TableCell>{r.slab}</TableCell>
              <TableCell className="text-orange-600 font-mono font-bold">{r.mmk.toLocaleString()} MMK</TableCell>
              <TableCell>{r.region}</TableCell>
              <TableCell><Trash2 className="h-4 w-4 text-red-500 cursor-pointer" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}