import React from "react";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "../../auth/AuthContext";
import { useI18n } from "../../i18n/I18nProvider";
import { humanizeFirebaseAuthError } from "../../auth/firebaseErrors";
import { auth } from "../../lib/firebase";

type Role = "warehouse" | "admin" | "merchant" | "rider" | string | undefined;

function defaultRouteForRole(role: Role): string {
  switch (role) {
    case "warehouse":
      return "/warehouse/dashboard";
    case "admin":
      return "/admin";
    case "merchant":
      return "/merchant";
    case "rider":
      return "/rider";
    default:
      return "/";
  }
}

/**
 * Only allow redirecting back into protected areas.
 * Everything else falls back to a role-based default.
 */
function pickSafeRedirect(from: unknown, role: Role): string {
  if (typeof from !== "string") return defaultRouteForRole(role);
  if (!from.startsWith("/")) return defaultRouteForRole(role);

  const allowed = ["/admin", "/merchant", "/rider", "/warehouse"];
  if (allowed.some((p) => from.startsWith(p))) return from;

  return defaultRouteForRole(role);
}

export default function LoginPage() {
  const { t } = useI18n();
  const { loading, user, profile, signIn, refresh, error: profileError } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;

  // If already logged in, redirect immediately based on role / previous intended route
  if (!loading && user) {
    const fromPath = loc?.state?.from?.pathname ?? loc?.state?.from;
    const to = pickSafeRedirect(fromPath, profile?.role);
    return <Navigate to={to} replace />;
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [err, setErr] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [resetBusy, setResetBusy] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setInfo(null);

    try {
      await signIn(email.trim(), password);

      // Ensure profile is loaded before redirect decision
      const p = await refresh();
      const fromPath = loc?.state?.from?.pathname ?? loc?.state?.from;
      const to = pickSafeRedirect(fromPath, p?.role);

      nav(to, { replace: true });
    } catch (e: unknown) {
      setErr(humanizeFirebaseAuthError(e));
    } finally {
      setBusy(false);
    }
  }

  async function forgotPassword() {
    const trimmed = email.trim();
    setErr(null);
    setInfo(null);

    if (!trimmed) {
      setErr("Please type your email first, then click “Forgot password?”.");
      return;
    }

    setResetBusy(true);
    try {
      await sendPasswordResetEmail(auth, trimmed);
      setInfo("Password reset email sent. Please check your inbox (and spam folder).");
    } catch (e: unknown) {
      setErr(humanizeFirebaseAuthError(e));
    } finally {
      setResetBusy(false);
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
            <div className="text-xl font-extrabold text-slate-900">{t("auth.signin")}</div>
            <div className="text-xs text-slate-500">{t("auth.portalTitle")}</div>
          </div>
        </div>

        {profileError ? (
          <div className="mt-4 rounded-xl border bg-amber-50 text-amber-900 text-sm font-semibold p-3">
            {profileError}
          </div>
        ) : null}

        {err ? (
          <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">
            {err}
          </div>
        ) : null}

        {info ? (
          <div className="mt-4 rounded-xl border bg-emerald-50 text-emerald-800 text-sm font-semibold p-3">
            {info}
          </div>
        ) : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Email")}
            inputMode="email"
            autoComplete="email"
          />

          <div className="space-y-2">
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Password")}
              type="password"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => void forgotPassword()}
                disabled={resetBusy}
                className="text-sm font-extrabold text-blue-700 hover:underline disabled:opacity-60"
              >
                {resetBusy ? "Sending…" : "Forgot password?"}
              </button>

              <NavLink to="/signup" className="text-sm font-extrabold text-slate-700 hover:underline">
                Create account
              </NavLink>
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
