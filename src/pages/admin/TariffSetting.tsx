import React, { useEffect, useMemo, useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebaseconfig"; // Fixed: Using db alias to resolve build error

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/I18nProvider";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// Updated Type to match the Dec 2025 Price List structure
type IntlRate = {
  id: string;
  country_name: string;
  weight_slab: string; // New field for slabs (e.g., 5-10 Kg)
  proposed_price_mmk: number; // Switched to MMK as per Excel data
  est_duration: string;
  region: string;
  updatedAt?: any;
};

const COLLECTION = "pricing_international";

export default function TariffSetting() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [intlRates, setIntlRates] = useState<IntlRate[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const colRef = useMemo(() => collection(db, COLLECTION), []);

  useEffect(() => {
    void fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const q = query(colRef, orderBy("country_name", "asc"));
      const snap = await getDocs(q);
      const rows: IntlRate[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      
      // Initialize with data from the 24.12.2025 lists if empty
      if (rows.length === 0) {
        const initialData: IntlRate[] = [
          { id: '1', country_name: "Thailand 🇹🇭", weight_slab: "5-10 Kg", proposed_price_mmk: 15000, est_duration: "1-2 Days", region: "Asia" },
          { id: '2', country_name: "Thailand 🇹🇭", weight_slab: "11-20 Kg", proposed_price_mmk: 12000, est_duration: "1-2 Days", region: "Asia" },
          { id: '3', country_name: "Japan 🇯🇵", weight_slab: "5-10 Kg", proposed_price_mmk: 65000, est_duration: "3-5 Days", region: "Asia" },
          { id: '4', country_name: "USA 🇺🇸", weight_slab: "5-10 Kg", proposed_price_mmk: 119000, est_duration: "7-10 Days", region: "North America" },
          { id: '5', country_name: "Australia 🇦🇺", weight_slab: "5-10 Kg", proposed_price_mmk: 95000, est_duration: "5-7 Days", region: "Oceania" }
        ];
        setIntlRates(initialData);
      } else {
        setIntlRates(rows);
      }
      setHasChanges(false);
    } catch (e) {
      console.error("Fetch failed:", e);
    }
  };

  const handleRateChange = (id: string, field: keyof IntlRate, value: any) => {
    setIntlRates((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    setHasChanges(true);
  };

  const addNewCountry = () => {
    const newEntry: IntlRate = {
      id: crypto.randomUUID(),
      country_name: "New Country",
      weight_slab: "5-10 Kg",
      proposed_price_mmk: 0,
      est_duration: "3-5 Days",
      region: "Asia",
    };
    setIntlRates((prev) => [newEntry, ...prev]);
    setHasChanges(true);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      await Promise.all(
        intlRates.map((rate) =>
          setDoc(
            doc(db, COLLECTION, rate.id),
            {
              country_name: rate.country_name,
              weight_slab: rate.weight_slab,
              proposed_price_mmk: Number(rate.proposed_price_mmk || 0),
              est_duration: rate.est_duration,
              region: rate.region,
              updatedAt: serverTimestamp(),
              updatedBy: user?.email ?? null,
            },
            { merge: true }
          )
        )
      );
      alert(t("MMK Tariffs synced with Dec 2025 Price List!"));
      setHasChanges(false);
    } catch (e: any) {
      alert(`Save Error: ${e?.message}`);
    } finally {
      setSaving(false);
    }
  };

  const deleteFromFirestore = async (id: string) => {
    if (!confirm(t("Delete this pricing row?"))) return;
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      setIntlRates((prev) => prev.filter((r) => r.id !== id));
    } catch (e: any) {
      alert(`Delete error: ${e?.message}`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0d2c54]">{t("Proposed Tariff Manager")}</h1>
          <p className="text-sm text-gray-500">{t("Active Price List Date: 24.12.2025")}</p>
        </div>

        {hasChanges && (
          <Button onClick={saveChanges} disabled={saving} className="bg-[#ff6b00] hover:bg-[#e66000]">
            <Save className="mr-2 h-4 w-4" />
            {saving ? t("Updating...") : t("Save All MMK Rates")}
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-bold text-[#0d2c54]">{t("International Routes & Pricing")}</h3>
            <Button variant="outline" size="sm" onClick={addNewCountry}>
                <Plus className="mr-2 h-4 w-4" /> {t("Add New Slab")}
            </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Country")}</TableHead>
              <TableHead>{t("Weight Slab")}</TableHead>
              <TableHead>{t("MMK Price/KG")}</TableHead>
              <TableHead>{t("Duration")}</TableHead>
              <TableHead>{t("Region")}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {intlRates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell>
                  <Input 
                    value={rate.country_name} 
                    onChange={(e) => handleRateChange(rate.id, "country_name", e.target.value)}
                    className="border-none font-bold"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    value={rate.weight_slab} 
                    onChange={(e) => handleRateChange(rate.id, "weight_slab", e.target.value)}
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={rate.proposed_price_mmk} 
                      onChange={(e) => handleRateChange(rate.id, "proposed_price_mmk", Number(e.target.value))}
                      className="text-right font-mono"
                    />
                    <span className="text-[10px] font-black text-gray-400">MMK</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Input 
                    value={rate.est_duration} 
                    onChange={(e) => handleRateChange(rate.id, "est_duration", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <select
                    className="p-2 border rounded text-xs w-full bg-white"
                    value={rate.region}
                    onChange={(e) => handleRateChange(rate.id, "region", e.target.value)}
                  >
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Africa">Africa</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => deleteFromFirestore(rate.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}