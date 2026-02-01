/* =========================================================
   File: src/pages/GreetingPage.tsx
   ========================================================= */
import { ArrowRight, Plane, Truck, HandCoins, LogOut } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

function BrandLogo({ src = "/britium-logo.png" }: { src?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center overflow-hidden">
        {/* If image fails, show letter */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Britium Express"
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="text-[#0d2c54] font-extrabold text-xl">{t("B")}</span>
      </div>
      <div className="leading-tight">
        <div className="text-white font-extrabold text-xl">{t("Britium Express")}</div>
        <div className="text-white/80 text-xs">{t("Fast • Reliable • Door-to-door")}</div>
      </div>
    </div>
  );
}

export function GreetingPage() {
  const { t } = useI18n();

  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <AuthModal open={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} />

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,44,84,0.92), rgba(13,44,84,0.92)), url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1950&q=80)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo />
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <div className="hidden sm:block text-white/80 text-sm">
                    Welcome, <span className="text-white font-bold">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setAuthOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#ff6b00] text-white font-extrabold hover:bg-orange-600"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-white font-extrabold text-4xl leading-tight">
                Logistics solutions that connect Myanmar to the world.
              </h1>
              <p className="text-white/80 mt-4">
                From domestic parcels to international air cargo, Britium Express delivers with transparent pricing,
                fast pickup, and reliable tracking.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/calculator"
                  className="px-5 py-3 rounded-xl bg-white text-[#0d2c54] font-extrabold inline-flex items-center gap-2"
                >
                  Calculate Shipping <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/send"
                  className="px-5 py-3 rounded-xl bg-[#ff6b00] text-white font-extrabold inline-flex items-center gap-2"
                >
                  Request Pickup <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-4 text-white/70 text-xs">
                Tip: set this page as your route <span className="font-mono">{t("\"/\"")}</span> so deploy won’t show a blank page.
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border p-6">
              <div className="text-xs font-bold text-gray-500 uppercase">{t("Who we are")}</div>
              <div className="mt-2 text-[#0d2c54] font-extrabold text-2xl">{t("Britium Express")}</div>
              <p className="mt-3 text-gray-600">
                We provide nationwide express delivery, COD support for e-commerce, and international air cargo with
                chargeable-weight calculation and customs-ready handling.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#0d2c54]/5 border p-3">
                  <div className="font-extrabold text-[#0d2c54]">{t("Fast")}</div>
                  <div className="text-xs text-gray-600 mt-1">{t("Same-day / Next-day options")}</div>
                </div>
                <div className="rounded-xl bg-[#0d2c54]/5 border p-3">
                  <div className="font-extrabold text-[#0d2c54]">{t("Trackable")}</div>
                  <div className="text-xs text-gray-600 mt-1">{t("End-to-end visibility")}</div>
                </div>
                <div className="rounded-xl bg-[#0d2c54]/5 border p-3">
                  <div className="font-extrabold text-[#0d2c54]">{t("Reliable")}</div>
                  <div className="text-xs text-gray-600 mt-1">{t("Consistent delivery SLA")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-xs font-bold uppercase text-[#0d2c54]">{t("What we do")}</div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#0d2c54]">{t("Core Services")}</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            title={t("Domestic Express")}
            icon={<Truck className="w-6 h-6 text-white" />}
            image="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80"
            desc="Door-to-door delivery connecting Yangon, Mandalay, Nay Pyi Taw and major routes."
            cta={{ label: "Domestic Rates", href: "/calculator" }}
          />
          <ServiceCard
            title={t("COD & E-Commerce")}
            icon={<HandCoins className="w-6 h-6 text-white" />}
            image="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80"
            desc="Grow your shop with COD. We collect and remit quickly with clean reporting."
            cta={{ label: "Seller Info", href: "/services" }}
          />
          <ServiceCard
            title={t("International Cargo")}
            icon={<Plane className="w-6 h-6 text-white" />}
            image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
            desc="Air freight forwarding to key destinations with chargeable-weight calculation."
            cta={{ label: "International Calculator", href: "/calculator" }}
          />
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-gray-500">© {new Date().getFullYear()} Britium Express</footer>
    </div>
  );
}

function ServiceCard({
  title,
  desc,
  image,
  icon,
  cta,
}: {
  title: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
  cta: { label: string; href: string };
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#ff6b00] flex items-center justify-center mx-auto -mt-14 border-[6px] border-white shadow">
          {icon}
        </div>
        <div className="mt-3 font-extrabold text-[#0d2c54] text-xl">{title}</div>
        <p className="mt-2 text-gray-600 text-sm">{desc}</p>
        <a
          href={cta.href}
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border border-[#0d2c54] text-[#0d2c54] font-bold hover:bg-[#0d2c54] hover:text-white transition"
        >
          {cta.label} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}