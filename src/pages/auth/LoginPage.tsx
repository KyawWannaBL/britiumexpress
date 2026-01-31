import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { humanizeFirebaseAuthError } from "../../auth/firebaseErrors";

export default function LoginPage() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await signIn(email.trim(), password);
      nav(loc.state?.from ?? "/portal", { replace: true });
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
            <div className="text-xl font-extrabold text-slate-900">Sign in</div>
            <div className="text-xs text-slate-500">Britium Express Portal</div>
          </div>
        </div>

        {err ? (
          <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div>
        ) : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            inputMode="email"
          />
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <button type="submit" disabled={busy} className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          No account?{" "}
          <NavLink to="/signup" className="font-extrabold text-blue-600 hover:underline">
            Create one
          </NavLink>
        </div>
      </div>
    </div>
  );
}
