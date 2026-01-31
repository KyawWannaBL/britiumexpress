 =====================================================================================
   File: src/pages/auth/SignupPage.tsx
   ===================================================================================== */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/brand";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) throw err;
      nav("/login");
    } catch (ex: any) {
      setError(ex?.message ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="text-center">
        <img src={BRAND.logoSrc} alt={BRAND.name} className="mx-auto h-16 w-16 rounded-3xl bg-white p-1 ring-1 ring-black/10 shadow-sm object-contain" />
        <h1 className="mt-4 text-3xl font-extrabold" style={{ color: BRAND.colors.blue }}>Sign Up</h1>
        <p className="mt-2 text-neutral-600">Create your account.</p>
      </div>

      <form onSubmit={submit} className="mt-6 rounded-3xl bg-white border border-black/5 shadow-[0_18px_46px_rgba(2,6,23,.14)] p-6">
        {error ? <div className="mb-3 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div> : null}

        <label className="text-sm font-extrabold" style={{ color: BRAND.colors.blue }}>Email</label>
        <input
          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="mt-4 block text-sm font-extrabold" style={{ color: BRAND.colors.blue }}>Password</label>
        <input
          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-black/20"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button
          disabled={loading}
          className="mt-5 w-full rounded-2xl px-5 py-3 font-extrabold text-white disabled:opacity-60 hover:brightness-105"
          style={{ background: `linear-gradient(135deg, ${BRAND.colors.orange}, #ff9a57)` }}
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <div className="mt-4 text-sm text-neutral-600 text-center">
          Have an account? <Link className="font-extrabold" style={{ color: BRAND.colors.blue }} to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}