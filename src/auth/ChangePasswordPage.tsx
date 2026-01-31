import React from "react";
import { updatePassword } from "firebase/auth";
import { firebaseAuth } from "../../lib/firebase";
import { clearMustChangePassword } from "../../auth/userProfile";
import { useAuth } from "../../auth/AuthContext";

export default function ChangePasswordPage() {
  const { user, refreshProfile } = useAuth();
  const [p1, setP1] = React.useState("");
  const [p2, setP2] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!user) {
      setErr("Not signed in.");
      return;
    }
    if (p1.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }
    if (p1 !== p2) {
      setErr("Passwords do not match.");
      return;
    }

    const fb = firebaseAuth.currentUser;
    if (!fb) {
      setErr("Not signed in.");
      return;
    }

    setBusy(true);
    try {
      await updatePassword(fb, p1);
      await clearMustChangePassword(user.uid);
      await refreshProfile();
      setOk("Password updated successfully.");
      setP1("");
      setP2("");
    } catch (e: any) {
      // updatePassword may require recent login
      setErr(e?.message ?? "Failed to update password. Please sign in again and retry.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-soft">
        <div className="text-xl font-extrabold text-slate-900">Change Password</div>
        <div className="text-sm text-slate-600 mt-1">
          This account requires a password change before continuing.
        </div>

        {err ? <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div> : null}
        {ok ? <div className="mt-4 rounded-xl border bg-green-50 text-green-700 text-sm font-semibold p-3">{ok}</div> : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input className="w-full rounded-xl border px-3 py-2 text-sm" value={p1} onChange={(e) => setP1(e.target.value)} placeholder="New password" type="password" />
          <input className="w-full rounded-xl border px-3 py-2 text-sm" value={p2} onChange={(e) => setP2(e.target.value)} placeholder="Confirm new password" type="password" />
          <button disabled={busy} className="w-full rounded-xl brand-accent text-white py-3 text-sm font-extrabold hover:brightness-105 disabled:opacity-60">
            {busy ? "Saving…" : "Save password"}
          </button>
        </form>
      </div>
    </div>
  );
}