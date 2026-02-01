import React from "react";
import { NavLink } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { humanizeFirebaseAuthError } from "../../auth/firebaseErrors";
import { useI18n } from "../../i18n/I18nProvider";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [email, setEmail] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setOk("Password reset email sent. Please check your inbox.");
    } catch (e: unknown) {
      setErr(humanizeFirebaseAuthError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center fade-in px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white shadow-soft p-6">
        <div className="flex items-center gap-3">
          <img
            src="/assets/britium-logo.png"
            className="h-12 w-12 rounded-2xl bg-white p-1 shadow-sm"
            alt="Britium Express"
          />
          <div>
            <div className="text-xl font-extrabold text-slate-900">{t("auth.forgot")}</div>
            <div className="text-xs text-slate-500">We will send you a reset link.</div>
          </div>
        </div>

        {err ? (
          <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div>
        ) : null}
        {ok ? (
          <div className="mt-4 rounded-xl border bg-emerald-50 text-emerald-800 text-sm font-semibold p-3">{ok}</div>
        ) : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            inputMode="email"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          <NavLink to="/login" className="font-extrabold text-blue-600 hover:underline">
            Back to sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
}
