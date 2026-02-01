import React from "react";
import { getIdTokenResult } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { RequireRole } from "../../auth/RequireAuth";
import { useAuth } from "../../auth/AuthContext";
import PageHeader from "@/components/admin/PageHeader";
import { Badge, Button, Card, CardBody, CardHeader, cn } from "@/components/ui/SharedComponents";

type CheckResult = {
  name: string;
  ok: boolean;
  details?: string;
};

function OkBadge({ ok }: { ok: boolean }) {
  return <Badge tone={ok ? "green" : "red"}>{ok ? "OK" : "FAIL"}</Badge>;
}

function pre(v: unknown) {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

export default function DebugAuthPage() {
  const { user, refresh } = useAuth();
  const [checks, setChecks] = React.useState<CheckResult[]>([]);
  const [token, setToken] = React.useState<any>(null);
  const [userDoc, setUserDoc] = React.useState<any>(null);
  const [busy, setBusy] = React.useState(false);

  async function run() {
    setBusy(true);
    const out: CheckResult[] = [];

    const fb = auth.currentUser;
    if (!fb?.uid) {
      out.push({ name: "Firebase Auth: currentUser", ok: false, details: "No currentUser (not signed in)" });
      setChecks(out);
      setBusy(false);
      return;
    }

    out.push({ name: "Firebase Auth: currentUser", ok: true, details: `uid=${fb.uid} email=${fb.email ?? ""}` });

    // Token result
    try {
      const r = await getIdTokenResult(fb, true);
      setToken({
        claims: r.claims,
        issuedAtTime: r.issuedAtTime,
        expirationTime: r.expirationTime,
        authTime: r.authTime,
        signInProvider: (r as any)?.signInProvider,
      });
      out.push({ name: "Auth Token: getIdTokenResult()", ok: true });
    } catch (e: any) {
      out.push({ name: "Auth Token: getIdTokenResult()", ok: false, details: e?.message ?? String(e) });
      setToken(null);
    }

    // users/{uid}
    try {
      const snap = await getDoc(doc(db, "users", fb.uid));
      if (snap.exists()) {
        setUserDoc({ id: snap.id, ...snap.data() });
        out.push({ name: "Firestore: users/{uid} readable", ok: true });
      } else {
        setUserDoc(null);
        out.push({ name: "Firestore: users/{uid} readable", ok: false, details: "Document does not exist" });
      }
    } catch (e: any) {
      setUserDoc(null);
      out.push({ name: "Firestore: users/{uid} readable", ok: false, details: e?.message ?? String(e) });
    }

    // Lightweight health checks for collections (rules + connectivity)
    const collectionsToTest: Array<{ name: string; col: string }> = [
      { name: "Firestore: shipments read (limit 1)", col: "shipments" },
      { name: "Firestore: financials read (limit 1)", col: "financials" },
      { name: "Firestore: users read (limit 1)", col: "users" },
      { name: "Firestore: branches read (limit 1)", col: "branches" },
    ];

    for (const c of collectionsToTest) {
      try {
        await getDocs(query(collection(db, c.col), limit(1)));
        out.push({ name: c.name, ok: true });
      } catch (e: any) {
        out.push({ name: c.name, ok: false, details: e?.message ?? String(e) });
      }
    }

    setChecks(out);
    setBusy(false);
  }

  React.useEffect(() => {
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RequireRole role="super_admin">
      <div className="space-y-6">
        <PageHeader
          titleKey="admin.debugAuth"
          subtitle="Shows auth/profile state + Firestore read health. Super Admin only."
          right={
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={() => void refresh()}>
                Refresh profile
              </Button>
              <Button onClick={() => void run()} disabled={busy}>
                {busy ? "Running…" : "Run checks"}
              </Button>
            </div>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Current Profile (AuthContext)" subtitle="What UI sees after login" />
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">uid</div>
                  <div className="mt-1 font-extrabold text-slate-900">{user?.uid ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">email</div>
                  <div className="mt-1 font-extrabold text-slate-900 break-all">{user?.email ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">role</div>
                  <div className="mt-1 font-extrabold text-slate-900">{user?.role ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">status</div>
                  <div className="mt-1 font-extrabold text-slate-900">{user?.status ?? "-"}</div>
                </div>
                <div className="rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 font-bold">mustChangePassword</div>
                  <div className="mt-1 font-extrabold text-slate-900">{String(Boolean(user?.mustChangePassword))}</div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Health Checks" subtitle="If these fail, you will be stuck on login/portal." />
            <CardBody>
              <div className="space-y-2">
                {checks.map((c) => (
                  <div key={c.name} className="flex items-start justify-between gap-3 rounded-xl border p-3">
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900">{c.name}</div>
                      {c.details ? <div className="text-xs text-slate-500 mt-1 break-words">{c.details}</div> : null}
                    </div>
                    <OkBadge ok={c.ok} />
                  </div>
                ))}
                {!checks.length ? <div className="text-sm text-slate-600">No checks yet.</div> : null}
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Tip: If <span className="font-semibold text-slate-700">users/{'{uid}'}</span> is not readable or missing, your app cannot determine role/status and will not route to dashboards.
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Firestore user doc (users/{uid})" subtitle="Raw data the rules allow you to read" />
            <CardBody>
              <pre className={cn("text-xs rounded-xl border bg-slate-50 p-3 overflow-auto max-h-[360px]")}>
{pre(userDoc)}
              </pre>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Token claims" subtitle="Useful if you later move to server aggregation on z.com" />
            <CardBody>
              <pre className={cn("text-xs rounded-xl border bg-slate-50 p-3 overflow-auto max-h-[360px]")}>
{pre(token)}
              </pre>
            </CardBody>
          </Card>
        </div>
      </div>
    </RequireRole>
  );
}
