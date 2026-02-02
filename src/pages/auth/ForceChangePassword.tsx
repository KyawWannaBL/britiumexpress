import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../auth/AuthContext";
import { useI18n } from "@/i18n/I18nProvider";

export default function ForceChangePassword() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!loading && !user) return <Navigate to="/login" replace />;
  if (!loading && user && !user.mustChangePassword) return <Navigate to="/portal" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const fbUser = auth.currentUser;
    if (!fbUser?.email) return setErr("Session expired. Please login again.");
    if (newPassword.length < 8) return setErr("New password must be at least 8 characters.");
    if (newPassword !== confirm) return setErr("Passwords do not match.");

    setBusy(true);
    try {
      const cred = EmailAuthProvider.credential(fbUser.email, currentPassword);
      await reauthenticateWithCredential(fbUser, cred);
      await updatePassword(fbUser, newPassword);
      await updateDoc(doc(db, "users", fbUser.uid), { mustChangePassword: false, passwordUpdatedAt: serverTimestamp() });
      navigate(location.state?.from ?? "/portal", { replace: true });
    } catch (e: any) {
      setErr(e.message || "Update failed.");
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 shadow-xl">
        <h2 className="text-xl font-black text-[#0d2c54] mb-6">{t("Security Update Required")}</h2>
        {err && <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl">{err}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder={t("Current Password")} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d2c54]" required />
          <input type="password" placeholder={t("New Secure Password")} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d2c54]" required />
          <input type="password" placeholder={t("Confirm New Password")} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#0d2c54]" required />
          <button type="submit" disabled={busy} className="w-full py-4 bg-[#0d2c54] text-white font-bold rounded-xl hover:bg-blue-800 disabled:opacity-50">{busy ? t("Updating...") : t("Update and Enter Portal")}</button>
        </form>
      </div>
    </div>
  );
}