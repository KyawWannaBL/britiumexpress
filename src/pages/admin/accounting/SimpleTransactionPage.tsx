import React from "react";
import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../../../auth/AuthContext";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "../../../i18n/I18nProvider";

type Txn = { id: string; type: "revenue" | "expense" | "transfer"; amount: number; currency: string; note?: string; ref?: string; createdAt?: string };

function parseNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const n = Number(String(v ?? "").replace(/[,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function dtLike(v: any): string {
  if (v && typeof v === "object" && typeof v.toDate === "function") {
    try { return v.toDate().toISOString().slice(0, 16).replace("T", " "); } catch { return ""; }
  }
  if (typeof v === "string") return v;
  return "";
}

export default function SimpleTransactionPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  const [type, setType] = React.useState<Txn["type"]>("revenue");
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("MMK");
  const [ref, setRef] = React.useState("");
  const [note, setNote] = React.useState("");

  const [rows, setRows] = React.useState<Txn[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [ok, setOk] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const snaps = await getDocs(query(collection(db, "financials"), orderBy("createdAt", "desc"), limit(50)));
      setRows(snaps.docs.map((d) => {
        const x: any = d.data();
        return {
          id: d.id,
          type: (x.type ?? "revenue") as any,
          amount: parseNumber(x.amount ?? x.total ?? x.value),
          currency: String(x.currency ?? "MMK"),
          note: String(x.note ?? ""),
          ref: String(x.ref ?? x.reference ?? ""),
          createdAt: dtLike(x.createdAt),
        };
      }));
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      const n = parseNumber(amount);
      if (!n) throw new Error("Amount is required.");
      await addDoc(collection(db, "financials"), {
        type,
        amount: n,
        currency,
        ref: ref.trim() || null,
        note: note.trim() || null,
        createdAt: serverTimestamp(),
        createdBy: user?.uid ?? null,
        createdByEmail: user?.email ?? null,
      });
      setOk("Saved.");
      setAmount(""); setRef(""); setNote("");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader titleKey="acct.simpleTxn" subtitle={t("Firestore: financials")} right={
        <button type="button" onClick={() => void load()} className="rounded-xl border bg-white px-3 py-2 text-sm font-extrabold hover:bg-slate-50">{t("common.refresh")}</button>
      } />

      <Card className="p-4">
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Type")}</div>
            <select className="w-full rounded-xl border px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="revenue">{t("Revenue")}</option>
              <option value="expense">{t("Expense")}</option>
              <option value="transfer">{t("Transfer")}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Amount")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t("0")} inputMode="decimal" />
          </div>
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Currency")}</div>
            <select className="w-full rounded-xl border px-3 py-2 text-sm" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="MMK">{t("MMK")}</option>
              <option value="USD">{t("USD")}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Reference")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={ref} onChange={(e) => setRef(e.target.value)} placeholder={t("INV-0001")} />
          </div>
          <div className="md:col-span-6">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Note")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("Description")} />
          </div>

          <div className="md:col-span-6 flex items-center gap-2">
            <button type="submit" disabled={busy} className="rounded-xl px-4 py-2 font-extrabold brand-accent text-white disabled:opacity-60">
              {busy ? "Saving…" : t("common.save")}
            </button>
            {err ? <div className="text-sm font-semibold text-red-700">{err}</div> : null}
            {ok ? <div className="text-sm font-semibold text-emerald-700">{ok}</div> : null}
          </div>
        </form>
      </Card>

      <Card className="p-4">
        <div className="font-extrabold text-slate-900">{t("Latest entries")}</div>
        <div className="mt-3 overflow-x-auto">
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-600">{t("common.loading")}</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
                <tr>
                  <th className="px-3 py-3 text-left">{t("Type")}</th>
                  <th className="px-3 py-3 text-right">{t("Amount")}</th>
                  <th className="px-3 py-3 text-left">{t("Currency")}</th>
                  <th className="px-3 py-3 text-left">{t("Ref")}</th>
                  <th className="px-3 py-3 text-left">{t("Note")}</th>
                  <th className="px-3 py-3 text-left">{t("Created")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-slate-900">{r.type}</td>
                    <td className="px-3 py-3 text-right font-extrabold text-slate-900">{r.amount.toLocaleString()}</td>
                    <td className="px-3 py-3 text-slate-700">{r.currency}</td>
                    <td className="px-3 py-3 text-slate-700">{r.ref}</td>
                    <td className="px-3 py-3 text-slate-700">{r.note}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{r.createdAt}</td>
                  </tr>
                ))}
                {!rows.length ? <tr><td colSpan={6} className="px-3 py-8 text-center text-sm text-slate-600">{t("common.noData")}</td></tr> : null}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
