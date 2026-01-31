import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type DashboardShipmentStatus =
  | "To Assign"
  | "Assigned"
  | "On Way"
  | "Delivered"
  | "Canceled"
  | "Return"
  | "Exception";

export type ShipmentRow = {
  trackingId: string;
  merchant: string;
  receiver: string;
  city: string;
  status: DashboardShipmentStatus;
  cod: number;
  updatedAt: string;
};

export type AdminDashboardSnapshot = {
  // last 30 days unless otherwise specified
  totalShipments: number;
  pendingPickups: number;
  inTransit: number;
  delivered: number;
  exceptions: number;

  codOutstandingMMK: number;

  activeUsers: number;
  activeRiders: number;

  revenueMTDMMK: number;
  expensesMTDMMK: number;

  pickupBreakdown: Record<string, number>;
  deliveryBreakdown: Record<string, number>;

  recentShipments: ShipmentRow[];
};

/**
 * Firestore KPI aggregation (best-effort).
 *
 * Goals:
 * - Real numbers from Firestore collections: shipments/users/financials
 * - No composite index requirements: prefers single-field filters or client-side aggregation on a bounded window
 *
 * If you have >50k shipments/month, move aggregates to Cloud Functions writing /stats documents.
 */

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}

function parseNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const s = String(v ?? "").replace(/[,\s]/g, "");
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function pickFirstString(data: any, keys: string[], fallback = "—"): string {
  for (const k of keys) {
    const v = data?.[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return fallback;
}

function pickFirstNumber(data: any, keys: string[]): number {
  for (const k of keys) {
    const v = data?.[k];
    const n = parseNumber(v);
    if (n) return n;
  }
  return 0;
}

function normalizeStatus(raw: unknown): DashboardShipmentStatus {
  const s = String(raw ?? "").trim().toLowerCase().replace(/\s+/g, "_");
  if (!s) return "To Assign";

  if (["delivered", "completed", "done"].includes(s)) return "Delivered";
  if (["on_way", "onway", "in_transit", "transit", "dispatched", "picked_up"].includes(s)) return "On Way";
  if (["assigned", "rider_assigned", "driver_assigned"].includes(s)) return "Assigned";
  if (["canceled", "cancelled", "void"].includes(s)) return "Canceled";
  if (["return", "returned", "rto", "return_to_sender"].includes(s)) return "Return";
  if (["exception", "failed", "problem", "hold", "retry"].includes(s)) return "Exception";

  if (["to_assign", "created", "pending", "processing", "pickup_pending", "awaiting_assignment"].includes(s)) return "To Assign";

  return "To Assign";
}

function anyDateFrom(data: any, keys: string[]): Date | null {
  for (const k of keys) {
    const v = data?.[k];
    if (v && typeof v === "object" && typeof (v as any).toDate === "function") {
      try {
        return (v as any).toDate() as Date;
      } catch {
        // ignored
      }
    }
    if (typeof v === "string" && v.trim()) {
      const d = new Date(v);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  return null;
}

function formatDateLike(v: any): string {
  const d = anyDateFrom({ v }, ["v"]);
  if (d) return d.toISOString().slice(0, 16).replace("T", " ");
  if (typeof v === "string" && v.trim()) return v.trim();
  return "";
}

function toShipmentRow(id: string, data: any): ShipmentRow {
  const trackingId = pickFirstString(data, ["trackingId", "tracking_id", "tracking", "waybill", "awb"], id);
  const merchant = pickFirstString(data, ["merchantName", "merchant_name", "merchant", "merchantId"], "—");
  const receiver = pickFirstString(data, ["receiverName", "receiver_name", "receiver", "customerName", "customer_name"], "—");
  const city = pickFirstString(data, ["destinationCity", "city", "receiverCity", "dropoffCity"], "—");

  const status = normalizeStatus(data?.status ?? data?.shipmentStatus ?? data?.state);
  const cod = pickFirstNumber(data, ["codAmount", "cod_amount", "cod", "cashOnDeliveryAmount"]);
  const updatedAt = formatDateLike(data?.updatedAt ?? data?.updated_at ?? data?.lastUpdatedAt ?? data?.modifiedAt ?? data?.createdAt);

  return { trackingId, merchant, receiver, city, status, cod, updatedAt };
}

async function safeGetDocsOrderBy(colName: string, fields: string[], maxDocs: number) {
  const c = collection(db, colName);
  for (const f of fields) {
    try {
      return await getDocs(query(c, orderBy(f as any, "desc"), limit(maxDocs)));
    } catch {
      // try next
    }
  }
  return await getDocs(query(c, limit(maxDocs)));
}

async function fetchShipmentsWindow(days: number, maxDocs: number): Promise<any[]> {
  const since = daysAgo(days);
  const snaps = await safeGetDocsOrderBy("shipments", ["updatedAt", "createdAt", "updated_at", "created_at", "modifiedAt"], maxDocs);

  const tsKeys = ["createdAt", "created_at", "updatedAt", "updated_at", "modifiedAt", "lastUpdatedAt"];
  return snaps.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((x: any) => {
      const dt = anyDateFrom(x, tsKeys);
      return dt ? dt >= since : true; // if no timestamp, keep (best-effort)
    });
}

async function fetchRecentShipments(maxRows = 25): Promise<ShipmentRow[]> {
  const snaps = await safeGetDocsOrderBy("shipments", ["updatedAt", "createdAt", "updated_at", "created_at", "modifiedAt"], maxRows);
  return snaps.docs.map((d) => toShipmentRow(d.id, d.data()));
}

async function fetchUsersAgg(): Promise<{ activeUsers: number; activeRiders: number }> {
  const users = collection(db, "users");

  // Active users: count by status only (single-field filter, no composite index needed)
  let activeUsers = 0;
  try {
    const c = await getCountFromServer(query(users, where("status", "in", ["approved", "Approved"])));
    activeUsers = c.data().count;
  } catch {
    const snaps = await getDocs(query(users, limit(5000)));
    activeUsers = snaps.docs.filter((d) => ["approved"].includes(String(d.data()?.status ?? "").toLowerCase())).length;
  }

  // Riders: fetch riders (single-field filter) then filter approved in-memory
  let activeRiders = 0;
  try {
    const snaps = await getDocs(query(users, where("role", "in", ["rider", "Rider"]), limit(5000)));
    activeRiders = snaps.docs.filter((d) => ["approved"].includes(String(d.data()?.status ?? "").toLowerCase())).length;
  } catch {
    // last resort
    activeRiders = 0;
  }

  return { activeUsers, activeRiders };
}

async function fetchFinancialsMTD(): Promise<{ revenue: number; expenses: number }> {
  const since = startOfMonth();

  // Prefer server-side filter if createdAt exists and is a Timestamp
  const c = collection(db, "financials");
  let snaps;
  try {
    snaps = await getDocs(
      query(c, where("createdAt", ">=", Timestamp.fromDate(since)), orderBy("createdAt", "desc"), limit(2000))
    );
  } catch {
    snaps = await safeGetDocsOrderBy("financials", ["createdAt", "date", "created_at"], 2000);
  }

  const docs = snaps.docs
    .map((d) => d.data())
    .filter((x: any) => {
      const dt = anyDateFrom(x, ["createdAt", "created_at", "date"]);
      return dt ? dt >= since : true;
    });

  let revenue = 0;
  let expenses = 0;

  for (const r of docs as any[]) {
    const amount = parseNumber(r?.amount ?? r?.value ?? r?.mmk ?? 0);
    const type = String(r?.type ?? r?.category ?? "").toLowerCase();

    if (type.includes("expense") || type.includes("cost")) expenses += Math.abs(amount);
    else if (type.includes("income") || type.includes("revenue")) revenue += Math.abs(amount);
    else if (amount < 0) expenses += Math.abs(amount);
    else revenue += Math.abs(amount);
  }

  return { revenue, expenses };
}

export async function loadAdminDashboardSnapshot(days = 30): Promise<AdminDashboardSnapshot> {
  const shipmentsWindow = await fetchShipmentsWindow(days, 2000);
  const shipmentRows = shipmentsWindow.map((s: any) => toShipmentRow(String(s.id ?? ""), s));

  const totalShipments = shipmentRows.length;
  const pendingPickups = shipmentRows.filter((s) => s.status === "To Assign").length;
  const inTransit = shipmentRows.filter((s) => s.status === "Assigned" || s.status === "On Way").length;
  const delivered = shipmentRows.filter((s) => s.status === "Delivered").length;
  const exceptions = shipmentRows.filter((s) => s.status === "Exception" || s.status === "Return").length;

  // COD outstanding: delivered + cod > 0 and not settled
  let codOutstandingMMK = 0;
  for (const raw of shipmentsWindow as any[]) {
    const st = normalizeStatus(raw?.status ?? raw?.shipmentStatus ?? raw?.state);
    const cod = pickFirstNumber(raw, ["codAmount", "cod_amount", "cod", "cashOnDeliveryAmount"]);
    const isCod = Boolean(raw?.isCod ?? raw?.is_cod ?? cod > 0);
    const settled = Boolean(raw?.codSettled ?? raw?.cod_settled ?? raw?.payoutSettled ?? raw?.settled);
    if (isCod && cod > 0 && st === "Delivered" && !settled) codOutstandingMMK += cod;
  }

  const pickupBreakdown: Record<string, number> = {
    "To assign": shipmentRows.filter((s) => s.status === "To Assign").length,
    "Already assigned": shipmentRows.filter((s) => s.status === "Assigned").length,
    "On way": shipmentRows.filter((s) => s.status === "On Way").length,
    "Canceled": shipmentRows.filter((s) => s.status === "Canceled").length,
  };

  const deliveryBreakdown: Record<string, number> = {
    "To assign": shipmentRows.filter((s) => s.status === "To Assign").length,
    "Already assigned": shipmentRows.filter((s) => s.status === "Assigned").length,
    "On way": shipmentRows.filter((s) => s.status === "On Way").length,
    "Retry": shipmentRows.filter((s) => s.status === "Exception").length,
    "Canceled": shipmentRows.filter((s) => s.status === "Canceled").length,
    "Return": shipmentRows.filter((s) => s.status === "Return").length,
  };

  const [recentShipments, usersAgg, finAgg] = await Promise.all([
    fetchRecentShipments(25).catch(() => shipmentRows.slice(0, 25)),
    fetchUsersAgg().catch(() => ({ activeUsers: 0, activeRiders: 0 })),
    fetchFinancialsMTD().catch(() => ({ revenue: 0, expenses: 0 })),
  ]);

  return {
    totalShipments,
    pendingPickups,
    inTransit,
    delivered,
    exceptions,
    codOutstandingMMK,
    activeUsers: usersAgg.activeUsers,
    activeRiders: usersAgg.activeRiders,
    revenueMTDMMK: finAgg.revenue,
    expensesMTDMMK: finAgg.expenses,
    pickupBreakdown,
    deliveryBreakdown,
    recentShipments,
  };
}
