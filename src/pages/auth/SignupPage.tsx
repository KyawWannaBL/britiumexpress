import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppRole, useAuth } from "../../auth/AuthContext";
import { useI18n } from "@/i18n/I18nProvider";

export default function SignupPage() {
  const { t } = useI18n();

  const { signUp } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<AppRole>("customer");
  const [err, setErr] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await signUp(email.trim(), password, role);
      nav("/login", { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? "Signup failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center fade-in px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white shadow-soft p-6">
        <div className="text-xl font-extrabold text-slate-900">{t("Create account")}</div>
        <div className="text-xs text-slate-500 mt-1">{t("Choose role for portal access.")}</div>

        {err ? <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div> : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input className="w-full rounded-xl border px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("Email")} />
          <input className="w-full rounded-xl border px-3 py-2 text-sm" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("Password")} type="password" />
          <select className="w-full rounded-xl border px-3 py-2 text-sm" value={role} onChange={(e) => setRole(e.target.value as AppRole)}>
            <option value="customer">{t("Customer")}</option>
            <option value="merchant">{t("Merchant")}</option>
            <option value="rider">{t("Rider")}</option>
            <option value="admin">{t("Admin")}</option>
          </select>
          <button type="submit" disabled={busy} className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60">
            {busy ? "Creating…" : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          Have an account?{" "}
          <NavLink to="/login" className="font-extrabold text-blue-600 hover:underline">
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
}