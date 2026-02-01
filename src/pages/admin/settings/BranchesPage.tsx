import React from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../../../auth/AuthContext";
import { Card, cn } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "../../../i18n/I18nProvider";

type Branch = { id: string; code: string; name: string; region?: string; address?: string; phone?: string; createdAt?: string };

function dtLike(v: any): string {
  if (v && typeof v === "object" && typeof v.toDate === "function") {
    try { return v.toDate().toISOString().slice(0, 16).replace("T", " "); } catch { return ""; }
  }
  if (typeof v === "string") return v;
  return "";
}

export default function BranchesPage() {
  const { t } = useI18n();
  const { user } = useAuth();

  const [rows, setRows] = React.useState<Branch[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const snaps = await getDocs(query(collection(db, "branches"), orderBy("createdAt", "desc"), limit(100)));
      setRows(snaps.docs.map((d) => {
        const x: any = d.data();
        return {
          id: d.id,
          code: String(x.code ?? x.branchCode ?? ""),
          name: String(x.name ?? x.branchName ?? ""),
          region: String(x.region ?? x.state ?? ""),
          address: String(x.address ?? ""),
          phone: String(x.phone ?? ""),
          createdAt: dtLike(x.createdAt),
        };
      }));
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load branches.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void load(); }, [load]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (!name.trim()) throw new Error("Branch name is required.");
      await addDoc(collection(db, "branches"), {
        code: code.trim() || null,
        name: name.trim(),
        region: region.trim() || null,
        address: address.trim() || null,
        phone: phone.trim() || null,
        createdAt: serverTimestamp(),
        createdBy: user?.uid ?? null,
      });
      setCode(""); setName(""); setRegion(""); setAddress(""); setPhone("");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this branch?")) return;
    try {
      await deleteDoc(doc(db, "branches", id));
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to delete.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader titleKey="admin.settings" subtitle={t("Branches (Firestore)")} right={
        <button type="button" onClick={() => void load()} className="rounded-xl border bg-white px-3 py-2 text-sm font-extrabold hover:bg-slate-50">{t("common.refresh")}</button>
      } />

      <Card className="p-4">
        <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Code")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("YGN")} />
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Name")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("Yangon HQ")} />
          </div>
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Region")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={region} onChange={(e) => setRegion(e.target.value)} placeholder={t("Yangon")} />
          </div>
          <div className="md:col-span-1">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Phone")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("+95 ...")} />
          </div>
          <div className="md:col-span-6">
            <div className="text-xs font-extrabold text-slate-600 mb-1">{t("Address")}</div>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("Street, Township")} />
          </div>
          <div className="md:col-span-6">
            <button type="submit" disabled={busy} className="rounded-xl px-4 py-2 font-extrabold brand-accent text-white disabled:opacity-60">{busy ? "Saving…" : t("common.save")}</button>
          </div>
          {err ? <div className="md:col-span-6 text-sm font-semibold text-red-700">{err}</div> : null}
        </form>
      </Card>

      <Card className="p-4">
        <div className="font-extrabold text-slate-900">{t("Branches")}</div>
        <div className="mt-3 overflow-x-auto">
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-600">{t("common.loading")}</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
                <tr>
                  <th className="px-3 py-3 text-left">{t("Code")}</th>
                  <th className="px-3 py-3 text-left">{t("Name")}</th>
                  <th className="px-3 py-3 text-left">{t("Region")}</th>
                  <th className="px-3 py-3 text-left">{t("Phone")}</th>
                  <th className="px-3 py-3 text-left">{t("Created")}</th>
                  <th className="px-3 py-3 text-right">{t("common.delete")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-slate-900">{r.code}</td>
                    <td className="px-3 py-3 text-slate-700">{r.name}</td>
                    <td className="px-3 py-3 text-slate-700">{r.region}</td>
                    <td className="px-3 py-3 text-slate-700">{r.phone}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{r.createdAt}</td>
                    <td className="px-3 py-3 text-right">
                      <button type="button" onClick={() => void remove(r.id)} className={cn("rounded-xl border px-3 py-1.5 text-xs font-extrabold", "bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-700")}>
                        {t("common.delete")}
                      </button>
                    </td>
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
