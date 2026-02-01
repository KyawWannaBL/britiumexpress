import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function PendingApproval() {
  const { user, error } = useAuth();

  return (
    <div className="min-h-[65vh] grid place-items-center text-center px-4 fade-in">
      <div className="max-w-xl rounded-2xl border bg-white shadow-soft p-6">
        <div className="flex items-center justify-center gap-3">
          <img src="/assets/britium-logo.png" alt="Britium Express" className="h-12 w-12 rounded-2xl bg-white p-1 shadow-sm" />
          <div className="text-left">
            <div className="text-xl font-extrabold text-slate-900">Account Pending</div>
            <div className="text-xs text-slate-500">Britium Express Portal</div>
          </div>
        </div>

        <div className="mt-4 text-slate-700">
          {user?.email ? (
            <>
              Signed in as <span className="font-extrabold">{user.email}</span>, but your account is not approved / provisioned for dashboards yet.
            </>
          ) : (
            <>Your account is not ready for dashboards yet.</>
          )}
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border bg-amber-50 text-amber-900 text-sm font-semibold p-3 text-left">
            {error}
          </div>
        ) : null}

        <div className="mt-5 text-sm text-slate-600 text-left">
          <div className="font-extrabold text-slate-800">What to do</div>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Ensure you have a document in Firestore collection <span className="font-semibold">users</span> with fields: <span className="font-semibold">email, role, status</span>.</li>
            <li>Set <span className="font-semibold">status</span> to <span className="font-semibold">approved</span>.</li>
            <li>Ensure Firestore rules allow signed-in users to read <span className="font-semibold">users</span>.</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-center">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold bg-slate-900 text-white hover:bg-slate-800">
            Back Home
          </Link>
          <Link to="/login" className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold border bg-white hover:bg-slate-50">
            Try another account
          </Link>
        </div>
      </div>
    </div>
  );
}
