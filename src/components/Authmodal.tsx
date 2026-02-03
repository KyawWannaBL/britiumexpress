/* =========================================================
   File: src/components/AuthModal.tsx
   ========================================================= */
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/auth/AuthContext";

export function AuthModal({
  open,
  mode,
  onClose,
}: {
  open: boolean;
  mode: "login" | "signup";
  onClose: () => void;
}) {
  const { t } = useI18n();
  const { loginWith, signUpWith } = useAuth();

  const [tab, setTab] = useState<"login" | "signup">(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTab(mode);
      setErr(null);
      setBusy(false);
      setPw("");
    }
  }, [open, mode]);

  if (!open) return null;

  async function onSubmit() {
    setErr(null);
    setBusy(true);
    try {
      if (tab === "signup") {
        await signUpWith({ name, email, password: pw });
      } else {
        await loginWith({ email, password: pw });
      }
      onClose();
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center p-3">
      <div className="w-full sm:w-[420px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="font-extrabold text-[#0d2c54]">{t("Britium Express")}</div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100" aria-label={t("Close")}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${
                tab === "login" ? "bg-[#0d2c54] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {t("Login")}
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold ${
                tab === "signup" ? "bg-[#0d2c54] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {t("Sign up")}
            </button>
          </div>

          {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void onSubmit();
            }}
            className="space-y-3"
          >
            {tab === "signup" && (
              <div>
                <label className="text-xs font-semibold text-gray-600">{t("Name")}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  placeholder={t("Your name")}
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-600">{t("Email")}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">{t("Password")}</label>
              <input
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="••••••••"
                type="password"
                autoComplete={tab === "signup" ? "new-password" : "current-password"}
              />
            </div>

            <button
              disabled={busy}
              className="w-full rounded-xl bg-[#0d2c54] text-white font-semibold px-3 py-2 disabled:opacity-60"
              type="submit"
            >
              {busy ? t("Please wait…") : tab === "signup" ? t("Create account") : t("Login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
