import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { humanizeFirebaseAuthError } from "../../auth/firebaseErrors";
import { useAuth } from "../../auth/AuthContext";

function validateNewPassword(pw: string) {
  return pw.trim().length >= 8;
}

export default function ForceChangePassword() {
  const { loading, user, refresh, signOut } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  if (!loading && !user) return <Navigate to="/login" replace />;
  if (!loading && user?.status && user.status !== "approved") return <Navigate to="/pending" replace />;
  if (!loading && user && !user.mustChangePassword) return <Navigate to={loc.state?.from ?? "/portal"} replace />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    const fbUser = auth.currentUser;
    if (!fbUser?.email || !fbUser.uid) {
      setErr("No authenticated user. Please login again.");
      return;
    }

    if (!validateNewPassword(newPassword)) {
      setErr("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirm) {
      setErr("New password and confirmation do not match.");
      return;
    }

    setBusy(true);
    try {
      // Re-auth is required by Firebase for sensitive operations
      const cred = EmailAuthProvider.credential(fbUser.email, currentPassword);
      await reauthenticateWithCredential(fbUser, cred);
      await updatePassword(fbUser, newPassword);

      // Clear the flag in Firestore
      try {
        await updateDoc(doc(db, "users", fbUser.uid), {
          mustChangePassword: false,
          mustChangePasswordClearedAt: serverTimestamp(),
        });
      } catch (e) {
        // If rules block update, avoid infinite loop by telling user what happened.
        setErr(
          "Password updated in Firebase Auth, but your profile flag could not be updated in Firestore (permission denied). Please ask a Super Admin to set mustChangePassword=false for your user profile."
        );
        await refresh();
        return;
      }

      await refresh();
      setOk("Password updated successfully. Redirecting…");
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
            <div className="text-xl font-extrabold text-slate-900">Change password</div>
            <div className="text-xs text-slate-500">Required on first login</div>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          For security, you must set a new password before accessing dashboards.
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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            type="password"
            autoComplete="current-password"
          />

          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password (min 8 characters)"
            type="password"
            autoComplete="new-password"
          />

          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            type="password"
            autoComplete="new-password"
          />

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60"
          >
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => void signOut()}
            className="font-extrabold text-slate-700 hover:underline"
          >
            Logout
          </button>

          <a
            className="font-extrabold text-blue-700 hover:underline"
            href="mailto:admin@britiumexpress.com?subject=Password%20Change%20Help"
          >
            Need help?
          </a>
        </div>
      </div>
    </div>
  );
}
