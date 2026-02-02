import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRAND } from "@/lib/brand";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, Lock, UserPlus } from "lucide-react";

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src={BRAND.logoSrc} 
            alt={BRAND.name} 
            className="mx-auto h-20 w-20 rounded-3xl bg-white p-2 ring-1 ring-black/5 shadow-sm object-contain" 
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight" style={{ color: BRAND.colors.blue }}>
            Create Account
          </h1>
          <p className="mt-2 text-neutral-500 font-medium">Join the Britium Express team.</p>
        </div>

        <form 
          onSubmit={submit} 
          className="rounded-[2.5rem] bg-white border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8"
        >
          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider ml-1" style={{ color: BRAND.colors.blue }}>
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  className="w-full rounded-2xl border border-black/10 bg-white pl-12 pr-4 py-3.5 outline-none transition-all focus:ring-2 focus:ring-black/5 focus:border-black/20"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider ml-1" style={{ color: BRAND.colors.blue }}>
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  className="w-full rounded-2xl border border-black/10 bg-white pl-12 pr-4 py-3.5 outline-none transition-all focus:ring-2 focus:ring-black/5 focus:border-black/20"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="group relative mt-2 w-full overflow-hidden rounded-2xl px-5 py-4 font-extrabold text-white transition-all active:scale-[0.98] disabled:opacity-70"
              style={{ background: `linear-gradient(135deg, ${BRAND.colors.orange}, #ff9a57)` }}
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <UserPlus className="h-5 w-5" />
                )}
                <span>{loading ? "Creating Account..." : "Create Account"}</span>
              </div>
            </button>
          </div>

          <div className="mt-8 text-sm text-neutral-500 text-center font-medium">
            Already have an account?{" "}
            <Link 
              className="font-extrabold underline-offset-4 hover:underline" 
              style={{ color: BRAND.colors.blue }} 
              to="/login"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
