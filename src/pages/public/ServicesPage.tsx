import React from "react";
import { Link } from "react-router-dom";
import { Globe, Ruler, Plane, Truck, HandCoins, ShieldCheck, Headphones } from "lucide-react";

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
  return <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>;
}

export default function ServicesPage() {
  const [destRate, setDestRate] = React.useState<number | "">("");
  const [divisor, setDivisor] = React.useState(5000);
  const [weight, setWeight] = React.useState<number | "">("");
  const [l, setL] = React.useState<number | "">("");
  const [w, setW] = React.useState<number | "">("");
  const [h, setH] = React.useState<number | "">("");
  const [res, setRes] = React.useState<IntlResult | null>(null);

  function calc(e: React.FormEvent) {
    e.preventDefault();
    if (destRate === "" || weight === "" || l === "" || w === "" || h === "") return;
    const vol = (Number(l) * Number(w) * Number(h)) / divisor;
    const actual = Number(weight);
    const chargeable = Math.max(actual, vol);
    const total = chargeable * Number(destRate);
    setRes({ actual, vol, chargeable, total, divisor, rate: Number(destRate) });
  }

  return (
    <div className="space-y-10 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold">Our Logistics Solutions</h1>
            <p className="mt-3 text-white/85 text-lg max-w-3xl">Domestic parcels, COD support, and international air cargo.</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Domestic Express",
            icon: <Truck className="w-5 h-5" />,
            img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80",
            desc: "Door-to-door delivery connecting Yangon, Mandalay, and Nay Pyi Taw.",
            to: "/quote",
            btn: "Get Domestic Quote",
          },
          {
            title: "COD & E-Commerce",
            icon: <HandCoins className="w-5 h-5" />,
            img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80",
            desc: "Grow your online shop with Cash on Delivery. Fast remittance and reporting.",
            to: "/contact",
            btn: "Contact Sales",
          },
          {
            title: "International Cargo",
            icon: <Plane className="w-5 h-5" />,
            img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
            desc: "Reliable air freight to Asia, USA, and Europe. Customs support available.",
            to: "/quote",
            btn: "Get Intl Quote",
          },
        ].map((s) => (
          <Card key={s.title} className="overflow-hidden hover:shadow-soft transition-shadow">
            <img src={s.img} className="h-44 w-full object-cover" alt={s.title} />
            <div className="p-5">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center shadow-sm">{s.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{s.title}</div>
              <div className="mt-2 text-sm text-slate-600">{s.desc}</div>
              <div className="mt-4">
                <Link to={s.to} className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold bg-white border hover:bg-slate-50">
                  {s.btn}
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl border bg-white shadow-soft p-6 md:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[var(--brand-blue)]">International Air Cargo Calculator</h2>
          <p className="mt-2 text-sm text-slate-600">Estimate by Chargeable Weight (Actual vs. Volumetric).</p>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6 items-start">
          <Card>
            <div className="p-5">
              <form onSubmit={calc} className="space-y-4">
                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">Destination Country</div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-xl border bg-white grid place-items-center text-[var(--brand-blue)]">
                      <Globe className="w-5 h-5" />
                    </div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={destRate} onChange={(e) => setDestRate(e.target.value === "" ? "" : Number(e.target.value))}>
                      <option value="" disabled>Choose Destination...</option>
                      {DESTS.map((d) => (
                        <option key={d.label} value={d.rate}>{d.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">Volumetric Standard</div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 rounded-xl border bg-white grid place-items-center text-slate-500">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <select className="w-full rounded-xl border px-3 py-2 text-sm" value={divisor} onChange={(e) => setDivisor(Number(e.target.value))}>
                      <option value={5000}>Standard Air Cargo (5000)</option>
                      <option value={6000}>Express / Courier (6000)</option>
                    </select>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">Formula: (L×W×H)/{divisor}.</div>
                </div>

                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">Actual Gross Weight (KG)</div>
                  <input className="w-full rounded-xl border px-3 py-2 text-sm" value={weight} onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))} type="number" step="0.1" placeholder="e.g. 5.5" />
                </div>

                <div>
                  <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500 mb-2">Parcel Dimensions (CM)</div>
                  <div className="grid grid-cols-3 gap-2">
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" value={l} onChange={(e) => setL(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="L" />
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" value={w} onChange={(e) => setW(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="W" />
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" value={h} onChange={(e) => setH(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="H" />
                  </div>
                </div>

                <button type="submit" className="w-full rounded-xl py-3 font-extrabold brand-accent text-white">CALCULATE ESTIMATE</button>
              </form>
            </div>
          </Card>

          <Card className="bg-slate-50">
            <div className="p-5">
              <div className="text-center font-extrabold text-slate-900 border-b pb-3">Quote Breakdown</div>

              <div className="mt-4 grid md:grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-xs font-extrabold text-slate-500 uppercase">Actual Weight</div>
                  <div className="mt-2 text-2xl font-extrabold text-slate-900">{res ? `${res.actual.toFixed(2)} kg` : "0 kg"}</div>
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-xs font-extrabold text-slate-500 uppercase">Volumetric</div>
                  <div className="mt-2 text-2xl font-extrabold text-[var(--brand-blue)]">{res ? `${res.vol.toFixed(2)} kg` : "0 kg"}</div>
                  <div className="mt-1 text-xs text-slate-500 italic">/ {res?.divisor ?? divisor}</div>
                </div>
                <div className="rounded-2xl border bg-red-50 p-4">
                  <div className="text-xs font-extrabold text-red-600 uppercase">Chargeable</div>
                  <div className="mt-2 text-3xl font-extrabold text-red-600">{res ? `${res.chargeable.toFixed(2)} kg` : "0 kg"}</div>
                </div>
              </div>

              <div className="my-5 h-px bg-slate-200" />

              <div className="text-center">
                <div className="text-xs font-extrabold tracking-widest uppercase text-slate-500">Estimated Shipping Cost</div>
                <div className="mt-2 text-5xl font-extrabold text-slate-900">{res ? `$${res.total.toFixed(2)}` : "$0.00"}</div>
                <div className="mt-2 text-xs text-slate-500">* Prices are estimates and exclude tax/duties.</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80"
            alt="Warehousing"
            className="rounded-3xl border shadow-soft object-cover w-full h-[320px]"
          />
          <Card>
            <div className="p-6">
              <h3 className="text-2xl font-extrabold text-[var(--brand-blue)]">Why Choose Britium?</h3>

              <div className="mt-5 grid gap-4">
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-100 grid place-items-center text-green-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">Secure Handling</div>
                    <div className="text-sm text-slate-600">Careful handling with transparent updates.</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-700">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">Customer Support</div>
                    <div className="text-sm text-slate-600">Support for rates, tracking, and claims.</div>
                  </div>
                </div>

                <Link to="/contact" className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold brand-gradient text-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
