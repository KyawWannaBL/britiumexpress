/* =========================================================
   File: src/pages/public/Calculator.tsx   (adjust path if needed)
   - Completed Domestic + International calculator
   - Adds Britium Express logo at top
   - Domestic follows quote.html rule (Yangon township base + extra weight)
   - International follows services.html rule (chargeable weight: max(actual, volumetric))
   - Uses Supabase pricing_international; falls back if DB missing fields
   ========================================================= */

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plane, Truck, Info } from "lucide-react";

type Mode = "domestic" | "international";

type YangonZone = { zone: string; townships: { name: string; baseRateMmk: number }[] };

type IntlRateRow = Record<string, unknown>;

type IntlRateOption = {
  key: string;
  country: string;
  usdPerKg: number;
};

const BRAND = {
  name: "Britium Express",
  logoSrc: "/britium-logo-512.png", // put in /public
  colors: {
    blue: "#0d2c54",
    orange: "#ff6b00",
  },
};

const YANGON_TOWNSHIPS: YangonZone[] = [
  {
    zone: "Zone 1 - Downtown & Inner City",
    townships: [
      { name: "Ahlone", baseRateMmk: 3000 },
      { name: "Bahan", baseRateMmk: 3000 },
      { name: "Botahtaung", baseRateMmk: 3000 },
      { name: "Dagon", baseRateMmk: 3000 },
      { name: "Dawbon", baseRateMmk: 3000 },
      { name: "Hlaing", baseRateMmk: 3000 },
      { name: "Insein", baseRateMmk: 3000 },
      { name: "Kamaryut", baseRateMmk: 3000 },
      { name: "Kyauktada", baseRateMmk: 3000 },
      { name: "Kyimyindaing", baseRateMmk: 3000 },
      { name: "Lanmataw", baseRateMmk: 3000 },
      { name: "Latha", baseRateMmk: 3000 },
      { name: "Mayangone", baseRateMmk: 3000 },
      { name: "Mingalar Taung Nyunt", baseRateMmk: 3000 },
      { name: "North Okkalapa", baseRateMmk: 3000 },
      { name: "Pabedan", baseRateMmk: 3000 },
      { name: "Pazundaung", baseRateMmk: 3000 },
      { name: "Sanchaung", baseRateMmk: 3000 },
      { name: "South Oakkalapa", baseRateMmk: 3000 },
      { name: "Tamwe", baseRateMmk: 3000 },
      { name: "Thaketa", baseRateMmk: 3000 },
      { name: "Thingangyun", baseRateMmk: 3000 },
      { name: "Yankin", baseRateMmk: 3000 },
    ],
  },
  {
    zone: "Zone 2 - Outer City",
    townships: [
      { name: "Dagon Seikken", baseRateMmk: 3500 },
      { name: "East Dagon", baseRateMmk: 3500 },
      { name: "Hlaing Thar Yar", baseRateMmk: 3500 },
      { name: "Mingalar Don", baseRateMmk: 3500 },
      { name: "North Dagon", baseRateMmk: 3500 },
      { name: "Shwe Paukkan", baseRateMmk: 3500 },
      { name: "Shwe Pyi Thar", baseRateMmk: 3500 },
      { name: "South Dagon", baseRateMmk: 3500 },
    ],
  },
  {
    zone: "Zone 3 - Periphery",
    townships: [
      { name: "Htauk Kyant", baseRateMmk: 4500 },
      { name: "Hlegu", baseRateMmk: 4500 },
      { name: "Hmawbi", baseRateMmk: 4500 },
      { name: "Lay Daung Kan", baseRateMmk: 4500 },
      { name: "Thanlyin", baseRateMmk: 4500 },
    ],
  },
];

const FALLBACK_INTL_RATES: IntlRateOption[] = [
  { key: "usa", country: "United States (USA)", usdPerKg: 18.5 },
  { key: "sg", country: "Singapore", usdPerKg: 4.5 },
  { key: "th", country: "Thailand (BKK)", usdPerKg: 3.0 },
  { key: "uk", country: "United Kingdom (UK)", usdPerKg: 15.0 },
  { key: "my", country: "Malaysia", usdPerKg: 5.5 },
  { key: "jp", country: "Japan", usdPerKg: 12.0 },
];

function num(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function parseUsdPerKg(row: IntlRateRow): number | null {
  const candidates = [
    row.rate_usd_per_kg,
    row.usd_per_kg,
    row.rate_per_kg,
    row.rate,
    row.base_rate_5_10kg, // your existing code used this
  ];
  for (const c of candidates) {
    const n = num(c);
    if (n !== null && n > 0) return n;
  }
  return null;
}

function clampNonNeg(n: number): number {
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export const ShippingCalculator = () => {
  const [mode, setMode] = useState<Mode>("domestic");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border overflow-hidden flex items-center justify-center">
            <img
              src={BRAND.logoSrc}
              alt="Britium Express Delivery Service"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#0d2c54]">Shipping Rate Calculator</h2>
            <p className="text-gray-600">
              Domestic (Yangon) + International (Chargeable Weight) estimator.
            </p>
          </div>
        </div>

        <Card className="shadow-lg border-t-4 border-t-[#0d2c54] rounded-2xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#0d2c54] font-extrabold">Calculate your shipping</CardTitle>

            <Tabs defaultValue="domestic" className="w-full mt-4" onValueChange={(v) => setMode(v as Mode)}>
              <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="domestic" className="font-extrabold">
                  <Truck className="mr-2 h-4 w-4" /> Domestic
                </TabsTrigger>
                <TabsTrigger value="international" className="font-extrabold">
                  <Plane className="mr-2 h-4 w-4" /> International
                </TabsTrigger>
              </TabsList>

              <TabsContent value="domestic" className="pt-6">
                <DomesticCalculator />
              </TabsContent>

              <TabsContent value="international" className="pt-6">
                <InternationalCalculator />
              </TabsContent>
            </Tabs>

            {mode === "domestic" ? (
              <div className="mt-4 flex items-start gap-2 text-xs text-gray-600 bg-white border rounded-xl p-3">
                <Info className="w-4 h-4 mt-0.5 text-[#ff6b00]" />
                <div>
                  Domestic calculator is completed for <b>Yangon Township</b> pricing table.
                  For other regions, you can add tables later or show “contact support”.
                </div>
              </div>
            ) : null}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

function DomesticCalculator() {
  const [region, setRegion] = useState<"yangon" | "mandalay" | "other">("yangon");
  const [township, setTownship] = useState<string>("");
  const [baseRate, setBaseRate] = useState<number | null>(null);
  const [weightKg, setWeightKg] = useState<number>(0);

  const extraKg = useMemo(() => {
    const w = clampNonNeg(weightKg);
    if (w <= 1) return 0;
    return Math.ceil(w - 1); // why: matches “per kg or part thereof” common courier rule
  }, [weightKg]);

  const totalMmk = useMemo(() => {
    if (region !== "yangon" || baseRate === null) return null;
    const total = baseRate + extraKg * 500;
    return Math.round(total);
  }, [region, baseRate, extraKg]);

  return (
    <div className="p-4 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">Destination Region</label>
          <select
            className="w-full p-3 border rounded-xl bg-white"
            value={region}
            onChange={(e) => {
              const v = e.target.value as "yangon" | "mandalay" | "other";
              setRegion(v);
              setTownship("");
              setBaseRate(null);
            }}
          >
            <option value="yangon">Yangon City</option>
            <option value="mandalay">Mandalay Region</option>
            <option value="other">Other States/Regions</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">Weight (kg)</label>
          <input
            type="number"
            min={0}
            step={0.1}
            placeholder="e.g. 1.5"
            className="w-full p-3 border rounded-xl bg-white"
            value={Number.isFinite(weightKg) ? weightKg : 0}
            onChange={(e) => setWeightKg(Number(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">First 1kg included. +500 MMK per extra kg (rounded up).</p>
        </div>

        {region === "yangon" ? (
          <div className="md:col-span-2">
            <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">Select Township</label>
            <select
              className="w-full p-3 border rounded-xl bg-white"
              value={township}
              onChange={(e) => {
                const v = e.target.value;
                setTownship(v);
                const rate = Number(e.target.selectedOptions[0]?.getAttribute("data-rate") ?? "");
                setBaseRate(Number.isFinite(rate) ? rate : null);
              }}
            >
              <option value="" disabled>
                -- Select Area --
              </option>
              {YANGON_TOWNSHIPS.map((z) => (
                <optgroup key={z.zone} label={z.zone}>
                  {z.townships.map((t) => (
                    <option key={t.name} value={t.name} data-rate={t.baseRateMmk}>
                      {t.name} — {t.baseRateMmk.toLocaleString()} MMK
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        ) : (
          <div className="md:col-span-2 bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl">
            Rates for this region are not configured here yet. Please contact Britium Express support for a manual quote.
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
        <p className="text-xs text-gray-500 uppercase font-extrabold">Estimated Cost</p>
        <h3 className="text-4xl font-extrabold text-[#0d2c54] my-2">
          {totalMmk === null ? "-- MMK" : `${totalMmk.toLocaleString()} MMK`}
        </h3>
        <p className="text-xs text-gray-600">
          {totalMmk === null
            ? "Select Yangon township to calculate."
            : `Base: ${baseRate?.toLocaleString()} MMK • Extra: ${extraKg} kg × 500 MMK`}
        </p>
      </div>
    </div>
  );
}

function InternationalCalculator() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<IntlRateRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<string>("");
  const [weightKg, setWeightKg] = useState<number>(0);
  const [dims, setDims] = useState({ l: 0, w: 0, h: 0 });
  const [divisor, setDivisor] = useState<5000 | 6000>(5000);

  const [result, setResult] = useState<null | {
    usdPerKg: number;
    actual: number;
    volumetric: number;
    chargeable: number;
    totalUsd: number;
  }>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: supaErr } = await supabase.from("pricing_international").select("*");
        if (supaErr) throw supaErr;
        if (alive && Array.isArray(data)) setRows(data as IntlRateRow[]);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Failed to load rates.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const options: IntlRateOption[] = useMemo(() => {
    const fromDb = rows
      .map((r) => {
        const country = String((r as any).country_name ?? (r as any).country ?? "").trim();
        const usdPerKg = parseUsdPerKg(r);
        if (!country || !usdPerKg) return null;
        return { key: country, country, usdPerKg };
      })
      .filter(Boolean) as IntlRateOption[];

    return fromDb.length > 0 ? fromDb : FALLBACK_INTL_RATES;
  }, [rows]);

  const selectedRate = useMemo(() => {
    return options.find((o) => o.key === selected)?.usdPerKg ?? null;
  }, [options, selected]);

  const canCalc =
    !!selectedRate &&
    clampNonNeg(weightKg) > 0 &&
    clampNonNeg(dims.l) > 0 &&
    clampNonNeg(dims.w) > 0 &&
    clampNonNeg(dims.h) > 0;

  function calculate() {
    if (!selectedRate) return;
    const actual = clampNonNeg(weightKg);
    const vol = (clampNonNeg(dims.l) * clampNonNeg(dims.w) * clampNonNeg(dims.h)) / divisor;
    const chargeable = Math.max(actual, vol);
    const totalUsd = chargeable * selectedRate;

    setResult({
      usdPerKg: selectedRate,
      actual,
      volumetric: vol,
      chargeable,
      totalUsd,
    });
  }

  return (
    <div className="p-4 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">Destination Country</label>
          <select
            className="w-full p-3 border rounded-xl bg-white"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="" disabled>
              Select Country...
            </option>
            {options.map((o) => (
              <option key={o.key} value={o.key}>
                {o.country} — ${o.usdPerKg.toFixed(2)}/kg
              </option>
            ))}
          </select>
          {loading ? (
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading rates...
            </div>
          ) : null}
          {error ? <div className="mt-2 text-xs text-red-600">{error}</div> : null}
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">Volumetric Divisor</label>
          <select
            className="w-full p-3 border rounded-xl bg-white"
            value={divisor}
            onChange={(e) => setDivisor(Number(e.target.value) as 5000 | 6000)}
          >
            <option value={5000}>5000 (Standard Air Cargo)</option>
            <option value={6000}>6000 (Light Cargo)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">Actual Weight (kg)</label>
          <input
            type="number"
            min={0}
            step={0.1}
            className="w-full p-3 border rounded-xl bg-white"
            value={Number.isFinite(weightKg) ? weightKg : 0}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            placeholder="e.g. 2.0"
          />
        </div>

        <div>
          <label className="block text-sm font-extrabold text-[#0d2c54] mb-2">Dimensions (cm)</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              min={0}
              className="p-3 border rounded-xl bg-white"
              placeholder="L"
              value={dims.l || ""}
              onChange={(e) => setDims((d) => ({ ...d, l: Number(e.target.value) }))}
            />
            <input
              type="number"
              min={0}
              className="p-3 border rounded-xl bg-white"
              placeholder="W"
              value={dims.w || ""}
              onChange={(e) => setDims((d) => ({ ...d, w: Number(e.target.value) }))}
            />
            <input
              type="number"
              min={0}
              className="p-3 border rounded-xl bg-white"
              placeholder="H"
              value={dims.h || ""}
              onChange={(e) => setDims((d) => ({ ...d, h: Number(e.target.value) }))}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Volumetric weight = (L × W × H) / {divisor}</p>
        </div>
      </div>

      <button
        onClick={calculate}
        disabled={!canCalc}
        className="w-full bg-[#0d2c54] text-white font-extrabold py-3 rounded-xl hover:bg-blue-950 transition flex justify-center items-center gap-2 disabled:opacity-50"
      >
        Calculate International Rate
      </button>

      {result ? (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <div className="text-xs text-gray-500 uppercase font-extrabold">Result</div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Box label="Actual" value={`${result.actual.toFixed(2)} kg`} />
            <Box label="Volumetric" value={`${result.volumetric.toFixed(2)} kg`} />
            <Box label="Chargeable" value={`${result.chargeable.toFixed(2)} kg`} />
            <Box label="Rate" value={`$${result.usdPerKg.toFixed(2)}/kg`} />
          </div>

          <div className="mt-5 bg-white border rounded-2xl p-5 text-center">
            <div className="text-xs text-gray-500 uppercase font-extrabold">Estimated Total</div>
            <div className="text-4xl font-extrabold text-[#0d2c54] mt-2">${result.totalUsd.toFixed(2)}</div>
            <div className="text-xs text-gray-600 mt-2">
              Chargeable weight is the greater of actual vs volumetric.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="text-xs text-gray-500 uppercase font-extrabold">{label}</div>
      <div className="mt-1 font-extrabold text-[#0d2c54]">{value}</div>
    </div>
  );
}