import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Truck, Plane, HandCoins, ShieldCheck, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HomePage() {
  const { t } = useI18n();
  const nav = useNavigate();

  const [code, setCode] = React.useState("");

  function quickTrack(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    nav(`/tracking?code=${encodeURIComponent(trimmed)}`);
  }

  const cards = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: t("Domestic Express"),
      desc: t("Same-day Yangon and next-day to major cities."),
      to: "/quote",
    },
    {
      icon: <HandCoins className="w-5 h-5" />,
      title: t("COD for Shops"),
      desc: t("Collect cash safely and remit quickly."),
      to: "/services",
    },
    {
      icon: <Plane className="w-5 h-5" />,
      title: t("International Cargo"),
      desc: t("Air freight rates and chargeable weight calculator."),
      to: "/services",
    },
  ] as const;

  return (
    <div className="space-y-10 slide-up">
      {/* HERO */}
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
              <h1 className="text-4xl md:text-5xl font-extrabold">{t("Britium Express")}</h1>

              <p className="mt-3 text-white/85 text-lg max-w-3xl">
                {t(
                  "A dedicated delivery arm of Britium Ventures Company Limited — fast, secure, and trackable logistics."
                )}
              </p>

              <form onSubmit={quickTrack} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="flex-1 bg-white rounded-2xl p-1 ring-soft">
                  <div className="flex items-center gap-2 px-3">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={t("Quick Track: Enter tracking number")}
                      className="w-full py-3 text-sm outline-none bg-transparent text-slate-900"
                      aria-label={t("Quick Track: Enter tracking number")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!code.trim()}
                  className="rounded-2xl px-5 py-3 font-extrabold brand-accent text-white inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {t("Track")} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (menu scroll target) */}
      <section id="services" className="grid md:grid-cols-3 gap-4 scroll-mt-24">
        {cards.map((c) => (
          <Card key={c.title}>
            <div className="p-6">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center">{c.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600">{c.desc}</div>

              <button
                onClick={() => nav(c.to)}
                className="mt-4 inline-flex items-center gap-2 font-extrabold text-[var(--brand-blue)] hover:underline"
              >
                {t("Learn more")} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </section>

      {/* ABOUT (menu scroll target) */}
      <section id="about" className="grid lg:grid-cols-2 gap-6 items-center scroll-mt-24">
        <img
          src="https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1200&q=80"
          alt={t("Delivery")}
          className="rounded-3xl border shadow-soft object-cover w-full h-[360px]"
        />

        <Card>
          <div className="p-8">
            <div className="text-xs font-extrabold tracking-widest uppercase text-[var(--brand-orange)]">
              {t("Who we are")}
            </div>

            <div className="mt-2 text-3xl font-extrabold text-[var(--brand-blue)]">
              {t("Reliable delivery, built for scale.")}
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {t(
                "Britium Express provides domestic courier, COD operations, warehousing support, and international forwarding. We focus on speed, proof-of-delivery, and friendly customer support."
              )}
            </p>

            <div className="mt-6 grid gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-100 grid place-items-center text-green-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">{t("Secure + Trackable")}</div>
                  <div className="text-sm text-slate-600">{t("Shipment statuses, tracking, and clear service terms.")}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900">{t("Fast Operations")}</div>
                  <div className="text-sm text-slate-600">{t("Optimized pickup routes and delivery hubs.")}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => nav("/services")}
                className="rounded-2xl px-5 py-3 font-extrabold brand-gradient text-white"
              >
                {t("Explore Services")}
              </button>

              {/* scroll instead of navigating away */}
              <button
                onClick={() => scrollToId("contact")}
                className="rounded-2xl px-5 py-3 font-extrabold bg-white border hover:bg-slate-50"
              >
                {t("Contact Us")}
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* CONTACT (menu scroll target) */}
      <section id="contact" className="rounded-2xl border bg-white shadow-soft p-6 scroll-mt-24">
        <h2 className="text-xl font-extrabold text-slate-900">{t("Contact")}</h2>
        <p className="mt-2 text-slate-600">
          {t("Email")}: cs_1@britiumexpress.com,cs_2@britiumexpress.com • {t("Phone")}: +95-9-897447744,+95-9-897447755, +95-9-897447766
        </p>
      </section>
    </div>
  );
}
