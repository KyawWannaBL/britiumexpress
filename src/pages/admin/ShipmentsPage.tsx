import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Search, Filter, Download, MoreHorizontal, MapPin } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table"; // Fixed UI import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ShipmentsPage() {
  const { t } = useI18n();

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#0d2c54]">
          {t("Shipment Records")} / ပို့ဆောင်မှု မှတ်တမ်းများ
        </h2>
        <div className="flex gap-2">
          <Input placeholder={t("Search Tracking ID...")} className="w-64" />
          <Button className="bg-[#ff6b00] hover:bg-[#e66000]"><Download className="mr-2 h-4 w-4" /> {t("Export")}</Button>
        </div>
      </div>

      <Table className="border rounded-lg">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>{t("Tracking ID")} / အိုင်ဒီ</TableHead>
            <TableHead>{t("Recipient")} / လက်ခံသူ</TableHead>
            <TableHead>{t("Destination")} / လိပ်စာ</TableHead>
            <TableHead>{t("Status")} / အခြေအနေ</TableHead>
            <TableHead className="text-right">{t("Action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Mapping through shipments from Firestore... */}
        </TableBody>
      </Table>
    </div>
  );
}