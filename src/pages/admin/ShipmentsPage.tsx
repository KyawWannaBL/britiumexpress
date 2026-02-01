import React from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import EmptyState from "@/components/admin/EmptyState";
import { useI18n } from "../../i18n/I18nProvider";

type ShipmentRow = {
  id: string;
  trackingId: string;
  merchant: string;
  receiver: string;
  city: string;
  status: string;
  cod: number;
  updatedAt: string;
};

function parseNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const n = Number(String(v ?? "").replace(/[,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function pickString(d: any, keys: string[], fallback = "—") {
  for (const k of keys) {
    const v = d?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return fallback;
}

function pickDateLike(d: any, keys: string[]): string {
  for (const k of keys) {
    const v = d?.[k];
    if (v && typeof v === "object" && typeof (v as any).toDate === "function") {
      try {
        const dt = (v as any).toDate() as Date;
        return dt.toISOString().slice(0, 16).replace("T", " ");
      } catch {}
    }
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

async function safeOrder(colName: string, fields: string[], maxDocs: number) {
  const c = collection(db, colName);
  for (const f of fields) {
    try {
      return await getDocs(query(c, orderBy(f as any, "desc"), limit(maxDocs)));
    } catch {}
  }
  return await getDocs(query(c, limit(maxDocs)));
}

function toRow(id: string, d: any): ShipmentRow {
  return {
    id,
    trackingId: pickString(d, ["trackingId", "tracking_id", "tracking", "waybill", "awb"], id),
    merchant: pickString(d, ["merchantName", "merchant_name", "merchant", "merchantId"], "—"),
    receiver: pickString(d, ["receiverName", "receiver_name", "receiver", "customerName", "customer_name"], "—"),
    city: pickString(d, ["destinationCity", "city", "receiverCity", "dropoffCity", "township"], "—"),
    status: pickString(d, ["status", "shipmentStatus", "shipment_status", "state"], "To Assign"),
    cod: parseNumber(d?.codAmount ?? d?.cod_amount ?? d?.cod ?? d?.cashOnDeliveryAmount),
    updatedAt: pickDateLike(d, ["updatedAt", "updated_at", "modifiedAt", "createdAt", "created_at"]),
  };
}

export default function ShipmentsPage() {
  const { t } = useI18n();
  const [rows, setRows] = React.useState<ShipmentRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("All");

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snaps = await safeOrder("shipments", ["updatedAt", "createdAt", "updated_at", "created_at", "modifiedAt"], 200);
      setRows(snaps.docs.map((d) => toRow(d.id, d.data())));
    } catch (e: any) {
      setError(e?.message ?? "Failed to load shipments.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  const statuses = React.useMemo(() => {
    const set = new Set<string>();
    for (const r of rows) set.add(r.status);
    return ["All", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = React.useMemo(() => {
    const s = search.trim().toLowerCase();
    return rows.filter((r) => {
      const match =
        !s ||
        r.trackingId.toLowerCase().includes(s) ||
        r.merchant.toLowerCase().includes(s) ||
        r.receiver.toLowerCase().includes(s) ||
        r.city.toLowerCase().includes(s);
      const st = status === "All" ? true : String(r.status).toLowerCase() === status.toLowerCase();
      return match && st;
    });
  }, [rows, search, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        titleKey="admin.shipments"
        subtitle={<span>{t("common.search")} / {t("common.status")}</span>}
        right={
          <button type="button" onClick={() => void load()} className="rounded-xl border bg-white px-3 py-2 text-sm font-extrabold hover:bg-slate-50">
            {t("common.refresh")}
          </button>
        }
      />

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <input
            className="w-full md:w-96 rounded-xl border px-3 py-2 text-sm"
            placeholder={`${t("common.search")}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="w-full md:w-64 rounded-xl border px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? `${t("common.status")}: All` : s}
              </option>
            ))}
          </select>
        </div>

        {error ? <div className="mt-3 rounded-xl border bg-red-50 p-3 text-sm text-red-800 font-semibold">{error}</div> : null}

        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-600">{t("common.loading")}</div>
          ) : filtered.length ? (
            <table className="w-full text-sm">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
                <tr>
                  <th className="px-3 py-3 text-left">Tracking</th>
                  <th className="px-3 py-3 text-left">Merchant</th>
                  <th className="px-3 py-3 text-left">Receiver</th>
                  <th className="px-3 py-3 text-left">City</th>
                  <th className="px-3 py-3 text-left">{t("common.status")}</th>
                  <th className="px-3 py-3 text-right">COD</th>
                  <th className="px-3 py-3 text-left">Updated</th>
                  <th className="px-3 py-3 text-right">{t("common.details")}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b last:border-b-0">
                    <td className="px-3 py-3 font-semibold text-slate-900">{r.trackingId}</td>
                    <td className="px-3 py-3 text-slate-700">{r.merchant}</td>
                    <td className="px-3 py-3 text-slate-700">{r.receiver}</td>
                    <td className="px-3 py-3 text-slate-700">{r.city}</td>
                    <td className="px-3 py-3 text-slate-700">{r.status}</td>
                    <td className="px-3 py-3 text-right font-semibold text-slate-900">{r.cod.toLocaleString()}</td>
                    <td className="px-3 py-3 text-xs text-slate-500">{r.updatedAt}</td>
                    <td className="px-3 py-3 text-right">
                      <Link to={`/admin/shipments/${encodeURIComponent(r.id)}`} className="rounded-xl border bg-white px-3 py-1.5 text-xs font-extrabold hover:bg-slate-50">
                        {t("common.details")}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState />
          )}
        </div>
      </Card>
    </div>
  );
}
