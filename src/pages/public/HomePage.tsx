import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Plane, HandCoins, ShieldCheck, ArrowRight } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

export default function HomePage() {
  const nav = useNavigate();
  const [code, setCode] = React.useState("");

  function quickTrack(e: React.FormEvent) {
    e.preventDefault();
    nav(`/tracking?code=${encodeURIComponent(code.trim())}`);
  }

  return (
    <div className="space-y-10 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative z-10 grid md:grid-cols-[auto,1fr] gap-6 items-center">
            <img
              src="/assets/britium-logo.png"
              alt="Britium Express"
              className="h-28 w-auto rounded-2xl bg-white/95 p-3 shadow-soft"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold">Britium Express</h1>
              <p className="mt-3 text-white/85 text-lg max-w-3xl">
                A dedicated delivery arm of Britium Ventures Company Limited — fast, secure, and trackable logistics.
              </p>

              <form onSubmit={quickTrack} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="flex-1 bg-white rounded-2xl p-1 ring-soft">
                  <div className="flex items-center gap-2 px-3">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Quick Track: Enter tracking number"
                      className="w-full py-3 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-2xl px-5 py-3 font-extrabold brand-accent text-white inline-flex items-center justify-center gap-2"
                >
                  Track <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          { icon: <Truck className="w-5 h-5" />, title: "Domestic Express", desc: "Same-day Yangon and next-day to major cities.", to: "/quote" },
          { icon: <HandCoins className="w-5 h-5" />, title: "COD for Shops", desc: "Collect cash safely and remit quickly.", to: "/services" },
          { icon: <Plane className="w-5 h-5" />, title: "International Cargo", desc: "Air freight rates and chargeable weight calculator.", to: "/services" },
        ].map((c) => (
          <Card key={c.title}>
            <div className="p-6">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center">{c.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600">{c.desc}</div>
              <button
                onClick={() => nav(c.to)}
                className="mt-4 inline-flex items-center gap-2 font-extrabold text-[var(--brand-blue)] hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-6 items-center">
        <img
          src="https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1200&q=80"
          alt="Delivery"
          className="rounded-3xl border shadow-soft object-cover w-full h-[360px]"
        />
        <Card>
          <div className="p-8">
            <div className="text-xs font-extrabold tracking-widest uppercase text-[var(--brand-orange)]">Who we are</div>
            <div className="mt-2 text-3xl font-extrabold text-[var(--brand-blue)]">Reliable delivery, built for scale.</div>
            <p className="mt-3 text-sm text-slate-600">
              Britium Express provides domestic courier, COD operations, warehousing support, and international forwarding.
              We focus on speed, proof-of-delivery, and friendly customer support.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-100 grid place-items-center text-green-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">Secure + Trackable</div>
                  <div className="text-sm text-slate-600">Shipment statuses, tracking, and clear service terms.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">Fast Operations</div>
                  <div className="text-sm text-slate-600">Optimized pickup routes and delivery hubs.</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button onClick={() => nav("/services")} className="rounded-2xl px-5 py-3 font-extrabold brand-gradient text-white">
                Explore Services
              </button>
              <button onClick={() => nav("/contact")} className="rounded-2xl px-5 py-3 font-extrabold bg-white border hover:bg-slate-50">
                Contact Us
              </button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
