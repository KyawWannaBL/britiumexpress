import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Truck, Plane } from "lucide-react";

type Zone = { label: string; options: Array<{ name: string; price: number }> };

const YANGON_ZONES: Zone[] = [
  {
    label: "Zone 1 - Downtown & Inner City",
    options: [
      { name: "Ahlone", price: 3000 }, { name: "Bahan", price: 3000 }, { name: "Botahtaung", price: 3000 },
      { name: "Dagon", price: 3000 }, { name: "Dawbon", price: 3000 }, { name: "Hlaing", price: 3000 },
      { name: "Insein", price: 3000 }, { name: "Kamaryut", price: 3000 }, { name: "Kyauktada", price: 3000 },
      { name: "Kyimyindaing", price: 3000 }, { name: "Lanmataw", price: 3000 }, { name: "Latha", price: 3000 },
      { name: "Mayangone", price: 3000 }, { name: "Mingalar Taung Nyunt", price: 3000 }, { name: "North Okkalapa", price: 3000 },
      { name: "Pabedan", price: 3000 }, { name: "Pazundaung", price: 3000 }, { name: "Sanchaung", price: 3000 },
      { name: "South Oakkalapa", price: 3000 }, { name: "Tamwe", price: 3000 }, { name: "Thaketa", price: 3000 },
      { name: "Thingangyun", price: 3000 }, { name: "Yankin", price: 3000 },
    ],
  },
  {
    label: "Zone 2 - Outer City",
    options: [
      { name: "Dagon Seikken", price: 3500 }, { name: "East Dagon", price: 3500 }, { name: "Hlaing Thar Yar", price: 3500 },
      { name: "Mingalar Don", price: 3500 }, { name: "North Dagon", price: 3500 }, { name: "Shwe Paukkan", price: 3500 },
      { name: "Shwe Pyi Thar", price: 3500 }, { name: "South Dagon", price: 3500 },
    ],
  },
  {
    label: "Zone 3 - Periphery / Remote Yangon",
    options: [
      { name: "Thilawa", price: 4500 }, { name: "Hlegu", price: 4500 }, { name: "Thanlyin", price: 4500 },
      { name: "Kyauktan", price: 4500 }, { name: "Twante", price: 4500 },
    ],
  },
];

type DomesticRegion = "yangon" | "mandalay" | "other";
type IntlResult = { actual: number; vol: number; chargeable: number; total: number; divisor: number; rate: number };

const DESTS = [
  { label: "United States (USA) - $18.50/kg", rate: 18.5 },
  { label: "Singapore - $4.50/kg", rate: 4.5 },
  { label: "Thailand (BKK) - $3.00/kg", rate: 3.0 },
  { label: "United Kingdom (UK) - $15.00/kg", rate: 15.0 },
  { label: "Malaysia - $5.50/kg", rate: 5.5 },
  { label: "Japan - $12.00/kg", rate: 12.0 },
] as const;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

export default function QuotePage() {
  const [tab, setTab] = React.useState<"domestic" | "international">("domestic");

  const [region, setRegion] = React.useState<DomesticRegion>("yangon");
  const [townshipPrice, setTownshipPrice] = React.useState<number | "">("");
  const [weight, setWeight] = React.useState<number | "">("");

  const domesticTotal = React.useMemo(() => {
    if (region !== "yangon" || townshipPrice === "" || weight === "") return null;
    const base = townshipPrice;
    const extra = Math.max(0, Number(weight) - 1) * 500;
    return Math.round(base + extra);
  }, [region, townshipPrice, weight]);

  const [destRate, setDestRate] = React.useState<number | "">("");
  const [divisor, setDivisor] = React.useState(5000);
  const [iWeight, setIWeight] = React.useState<number | "">("");
  const [l, setL] = React.useState<number | "">("");
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [ires, setIres] = React.useState<IntlResult | null>(null);

  function calcIntl(e: React.FormEvent) {
    e.preventDefault();
    if (destRate === "" || iWeight === "" || l === "" || w === "" || h === "") return;
    const vol = (Number(l) * Number(w) * Number(h)) / divisor;
    const actual = Number(iWeight);
    const chargeable = Math.max(actual, vol);
    const total = chargeable * Number(destRate);
    setIres({ actual, vol, chargeable, total, divisor, rate: Number(destRate) });
  }

  return (
    <div className="space-y-8 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold">Shipping Rate Calculator</h1>
            <p className="mt-3 text-white/85 text-lg">Domestic (Yangon) and International (Air Cargo).</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => setTab("domestic")}
          className={[
            "rounded-2xl border px-4 py-3 text-sm font-extrabold flex items-center gap-2",
            tab === "domestic" ? "bg-white shadow-soft" : "bg-slate-50 hover:bg-white",
          ].join(" ")}
        >
          <Truck className="w-4 h-4 text-[var(--brand-blue)]" /> Domestic (Yangon)
        </button>

        <button
          onClick={() => setTab("international")}
          className={[
            "rounded-2xl border px-4 py-3 text-sm font-extrabold flex items-center gap-2",
            tab === "international" ? "bg-white shadow-soft" : "bg-slate-50 hover:bg-white",
          ].join(" ")}
        >
          <Plane className="w-4 h-4 text-[var(--brand-orange)]" /> International Air Cargo
        </button>
      </div>

      {tab === "domestic" ? (
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <div className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-slate-500" /> Shipment Details
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <div className="text-xs font-extrabold text-slate-600 mb-1">Origin</div>
                    <select disabled className="w-full rounded-xl border px-3 py-2 text-sm">
                      <option>From: Yangon</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">Destination Region</div>
                    <select
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      value={region}
                      onChange={(e) => {
                        const v = e.target.value as DomesticRegion;
                        setRegion(v);
                        setTownshipPrice("");
                      }}
                    >
                      <option value="yangon">Yangon City</option>
                      <option value="mandalay">Mandalay Region</option>
                      <option value="other">Other States/Regions</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">Select Township</div>
                    <select
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      disabled={region !== "yangon"}
                      value={townshipPrice}
                      onChange={(e) => setTownshipPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    >
                      <option value="" disabled>-- Select Area --</option>
                      {YANGON_ZONES.map((z) => (
                        <optgroup key={z.label} label={z.label}>
                          {z.options.map((o) => (
                            <option key={o.name} value={o.price}>{o.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {region !== "yangon" ? (
                      <div className="mt-1 text-xs text-slate-500">
                        For {region === "mandalay" ? "Mandalay" : "Other regions"}, please contact us for pricing.
                      </div>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <div className="text-xs font-extrabold text-slate-600 mb-1">Weight (KG)</div>
                    <input
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                      type="number"
                      step="0.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="e.g. 1.0"
                    />
                    <div className="mt-1 text-xs text-slate-500 italic">*Base rate covers 1st Kg. Additional +500 MMK/Kg.</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border bg-slate-50 p-5">
                  <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500">Estimated Delivery Cost</div>
                  <div className="mt-2 text-4xl font-extrabold text-slate-900">{domesticTotal ? `${domesticTotal.toLocaleString()} MMK` : "-- MMK"}</div>
                  <div className="mt-2 text-sm font-extrabold text-green-700">{region === "yangon" ? "Delivery: 1-2 Days" : "Select Yangon for instant quote"}</div>

                  <div className="my-4 h-px bg-slate-200" />

                  <div className="grid gap-2">
                    <Link to="/login" className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold brand-accent text-white">
                      BOOK NOW
                    </Link>
                    <Link to="/contact" className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold bg-white border hover:bg-slate-50">
                      Ask for Corporate Rates
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="p-6">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-[var(--brand-blue)]">International Air Cargo Calculator</div>
              <div className="mt-2 text-sm text-slate-600">Chargeable weight = max(actual, volumetric).</div>
            </div>

            <div className="mt-6 grid lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-3xl border bg-white p-5">
                <form onSubmit={calcIntl} className="space-y-4">
                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">Destination</div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={destRate} onChange={(e) => setDestRate(e.target.value === "" ? "" : Number(e.target.value))}>
                      <option value="" disabled>Choose Destination...</option>
                      {DESTS.map((d) => (
                        <option key={d.label} value={d.rate}>{d.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">Volumetric Standard</div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={divisor} onChange={(e) => setDivisor(Number(e.target.value))}>
                      <option value={5000}>Standard Air Cargo (5000)</option>
                      <option value={6000}>Express / Courier (6000)</option>
                    </select>
                  </div>

                  <div>
                    <div className="text-xs font-extrabold text-slate-600 mb-1">Actual Weight (KG)</div>
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" type="number" step="0.1" value={iWeight} onChange={(e) => setIWeight(e.target.value === "" ? "" : Number(e.target.value))} />
                  </div>

                  <div>
                    <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500 mb-2">Dimensions (CM)</div>
                    <div className="grid grid-cols-3 gap-2">
                      <input className="w-full rounded-xl border px-3 py-2 text-sm" value={l} onChange={(e) => setL(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="L" />
                      <input className="w-full rounded-xl border px-3 py-2 text-sm" value={w} onChange={(e) => setW(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="W" />
                      <input className="w-full rounded-xl border px-3 py-2 text-sm" value={h} onChange={(e) => setH(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="H" />
                    </div>
                  </div>

                  <button type="submit" className="w-full rounded-xl py-3 font-extrabold brand-accent text-white">CALCULATE ESTIMATE</button>
                </form>
              </div>

              <div className="rounded-3xl border bg-slate-50 p-5">
                <div className="text-sm font-extrabold text-slate-900 border-b pb-3 text-center">Quote Breakdown</div>

                <div className="mt-4 grid md:grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border bg-white p-4">
                    <div className="text-xs font-extrabold text-slate-500 uppercase">Actual</div>
                    <div className="mt-2 text-2xl font-extrabold">{ires ? `${ires.actual.toFixed(2)} kg` : "0 kg"}</div>
                  </div>

                  <div className="rounded-2xl border bg-white p-4">
                    <div className="text-xs font-extrabold text-slate-500 uppercase">Volumetric</div>
                    <div className="mt-2 text-2xl font-extrabold text-[var(--brand-blue)]">{ires ? `${ires.vol.toFixed(2)} kg` : "0 kg"}</div>
                    <div className="mt-1 text-xs text-slate-500 italic">/ {ires?.divisor ?? divisor}</div>
                  </div>

                  <div className="rounded-2xl border bg-red-50 p-4">
                    <div className="text-xs font-extrabold text-red-600 uppercase">Chargeable</div>
                    <div className="mt-2 text-3xl font-extrabold text-red-600">{ires ? `${ires.chargeable.toFixed(2)} kg` : "0 kg"}</div>
                  </div>
                </div>

                <div className="my-5 h-px bg-slate-200" />

                <div className="text-center">
                  <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500">Estimated Shipping Cost</div>
                  <div className="mt-2 text-5xl font-extrabold text-slate-900">{ires ? `$${ires.total.toFixed(2)}` : "$0.00"}</div>
                  <div className="mt-2 text-xs text-slate-500">* Excludes tax/duties.</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
