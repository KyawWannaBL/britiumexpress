import React from "react";
import {
  Activity,
  BadgeCheck,
  CircleDollarSign,
  Clock,
  Package,
  Shield,
  Truck,
  Users,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Card, cn } from "@/components/ui/SharedComponents";
import { useAuth } from "../../auth/AuthContext";
import { loadAdminDashboardSnapshot, type AdminDashboardSnapshot, type DashboardShipmentStatus } from "../../data/adminDashboard";

type Kpi = {
  key: string;
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
};

function roleLabel(role: string) {
  const r = role.toLowerCase();
  if (r === "super_admin") return "Super Admin";
  if (r === "admin") return "Admin";
  if (r === "manager") return "Manager";
  if (r === "accountant") return "Accountant";
  if (r === "supervisor") return "Supervisor";
  return r;
}

function formatMMK(v: number) {
  return `${Math.round(v).toLocaleString()} MMK`;
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card className="p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{kpi.label}</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{kpi.value}</div>
          {kpi.sub ? <div className="mt-1 text-xs text-slate-500">{kpi.sub}</div> : null}
        </div>
        <div className="h-10 w-10 rounded-2xl bg-slate-50 border flex items-center justify-center text-slate-700">
          {kpi.icon}
        </div>
      </div>
    </Card>
  );
}

const STATUS_BADGE: Record<DashboardShipmentStatus, string> = {
  "To Assign": "bg-orange-50 text-orange-700 border-orange-200",
  Assigned: "bg-blue-50 text-blue-700 border-blue-200",
  "On Way": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Canceled: "bg-red-50 text-red-700 border-red-200",
  Return: "bg-slate-50 text-slate-700 border-slate-200",
  Exception: "bg-yellow-50 text-yellow-800 border-yellow-200",
};

function isPermissionDenied(err: unknown): boolean {
  return String((err as any)?.code ?? "").includes("permission-denied");
}

export default function DashboardPage() {
  const { user } = useAuth();
  const role = user?.role ?? "customer";
  const who = user?.email ?? "user";

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<AdminDashboardSnapshot | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const snap = await loadAdminDashboardSnapshot(30);
      setData(snap);
    } catch (e) {
      if (isPermissionDenied(e)) {
        setError(
          "Permission denied by Firestore rules. Ensure your Firestore rules allow this role to read 'shipments', 'users', and 'financials'. (Your posted rules allow manager/accountant/super_admin; add 'admin' if needed.)"
        );
      } else {
        setError(String((e as any)?.message ?? e));
      }
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void refresh();
  }, []);

  const kpis: Kpi[] = React.useMemo(() => {
    const d = data;
    const base: Kpi[] = [
      { key: "shipments", label: "Total Shipments", value: d ? String(d.totalShipments) : "—", sub: "Last 30 days", icon: <Package size={18} /> },
      { key: "pickup", label: "Pending Pickups", value: d ? String(d.pendingPickups) : "—", sub: "Need assignment", icon: <Truck size={18} /> },
      { key: "transit", label: "In Transit", value: d ? String(d.inTransit) : "—", sub: "Assigned / On the way", icon: <Activity size={18} /> },
      { key: "delivered", label: "Delivered", value: d ? String(d.delivered) : "—", sub: "Completed", icon: <BadgeCheck size={18} /> },
    ];

    if (!d) return base;

    if (role === "manager") {
      return [
        ...base,
        { key: "riders", label: "Active Riders", value: String(d.activeRiders), sub: "Approved riders", icon: <Users size={18} /> },
        { key: "exceptions", label: "Exceptions", value: String(d.exceptions), sub: "Return / Exception", icon: <AlertTriangle size={18} /> },
      ];
    }

    if (role === "super_admin") {
      return [
        ...base,
        { key: "revenue", label: "Revenue (MTD)", value: formatMMK(d.revenueMTDMMK), sub: "Financials collection", icon: <CircleDollarSign size={18} /> },
        { key: "security", label: "Security", value: "Healthy", sub: "No critical alerts", icon: <Shield size={18} /> },
      ];
    }

    // admin (and others)
    return [
      ...base,
      { key: "cod", label: "COD Outstanding", value: formatMMK(d.codOutstandingMMK), sub: "Delivered & unsettled", icon: <CircleDollarSign size={18} /> },
      { key: "users", label: "Active Users", value: String(d.activeUsers), sub: "Approved accounts", icon: <Users size={18} /> },
    ];
  }, [data, role]);

  const pickupBreakdown = data?.pickupBreakdown ?? { "To assign": 0, "Already assigned": 0, "On way": 0, "Canceled": 0 };
  const deliveryBreakdown = data?.deliveryBreakdown ?? { "To assign": 0, "Already assigned": 0, "On way": 0, "Retry": 0, "Canceled": 0, "Return": 0 };

  const recentShipments = data?.recentShipments ?? [];
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState<DashboardShipmentStatus | "All">("All");

  const filtered = React.useMemo(() => {
    const s = search.trim().toLowerCase();
    return recentShipments.filter((r) => {
      const match =
        !s ||
        r.trackingId.toLowerCase().includes(s) ||
        r.merchant.toLowerCase().includes(s) ||
        r.receiver.toLowerCase().includes(s) ||
        r.city.toLowerCase().includes(s);
      const st = status === "All" ? true : r.status === status;
      return match && st;
    });
  }, [search, status, recentShipments]);

  const showFinance = role === "super_admin" || role === "admin";
  const finRevenue = data?.revenueMTDMMK ?? 0;
  const finExpenses = data?.expensesMTDMMK ?? 0;
  const finNet = finRevenue - finExpenses;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Dashboard</h2>
          <div className="text-sm text-slate-500">
            Welcome, <span className="font-semibold text-slate-700">{who}</span> • Role:{" "}
            <span className="font-semibold text-slate-700">{roleLabel(role)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void refresh()}
          className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm font-extrabold hover:bg-slate-50 self-start md:self-auto"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border bg-red-50 p-4 text-sm text-red-800">
          <div className="font-extrabold mb-1">Dashboard cannot load</div>
          <div className="text-xs text-red-700">{error}</div>
        </div>
      ) : null}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.key} kpi={k} />
        ))}
      </div>

      {/* Operations Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="font-extrabold text-slate-800 flex items-center gap-2">
              <Truck size={18} className="text-[#0D47A1]" />
              Pickup Operations
            </div>
            <div className="text-xs text-slate-500">{data ? data.pendingPickups : 0} pending</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(pickupBreakdown).map(([label, count]) => (
              <div key={label} className="rounded-xl border bg-slate-50 p-3">
                <div className="text-xs text-slate-500">{label}</div>
                <div className="text-xl font-extrabold text-slate-900">{count}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="font-extrabold text-slate-800 flex items-center gap-2">
              <Package size={18} className="text-[#0D47A1]" />
              Delivery Operations
            </div>
            <div className="text-xs text-slate-500">{data ? data.inTransit : 0} in transit</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(deliveryBreakdown).map(([label, count]) => (
              <div key={label} className="rounded-xl border bg-slate-50 p-3">
                <div className="text-xs text-slate-500">{label}</div>
                <div className="text-xl font-extrabold text-slate-900">{count}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Finance (Admin + Super Admin) */}
      {showFinance ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="p-5 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div className="font-extrabold text-slate-800 flex items-center gap-2">
                <CircleDollarSign size={18} className="text-[#0D47A1]" />
                Finance Snapshot
              </div>
              <div className="text-xs text-slate-500">Month-to-date</div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl border bg-emerald-50 p-4">
                <div className="text-xs text-emerald-700 font-bold">Revenue</div>
                <div className="text-2xl font-extrabold text-emerald-900">{formatMMK(finRevenue)}</div>
              </div>
              <div className="rounded-xl border bg-rose-50 p-4">
                <div className="text-xs text-rose-700 font-bold">Expenses</div>
                <div className="text-2xl font-extrabold text-rose-900">{formatMMK(finExpenses)}</div>
              </div>
              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="text-xs text-slate-700 font-bold">Net</div>
                <div className="text-2xl font-extrabold text-slate-900">{formatMMK(finNet)}</div>
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Source: Firestore <span className="font-semibold">financials</span> collection.
            </div>
          </Card>

          <Card className="p-5">
            <div className="font-extrabold text-slate-800 flex items-center gap-2">
              <Shield size={18} className="text-[#0D47A1]" />
              System & Security
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-xl border bg-slate-50 p-3">
                <div className="font-bold text-slate-800">Auth</div>
                <div className="text-xs text-slate-500">Firebase Auth OK</div>
              </li>
              <li className="rounded-xl border bg-slate-50 p-3">
                <div className="font-bold text-slate-800">RBAC</div>
                <div className="text-xs text-slate-500">Roles enforced</div>
              </li>
              <li className="rounded-xl border bg-slate-50 p-3">
                <div className="font-bold text-slate-800">Alerts</div>
                <div className="text-xs text-slate-500">0 critical</div>
              </li>
            </ul>
          </Card>
        </div>
      ) : null}

      {/* Recent Shipments */}
      <Card className="p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="font-extrabold text-slate-800">Recent Shipments</div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              className="w-full sm:w-72 rounded-xl border px-3 py-2 text-sm"
              placeholder="Search tracking / merchant / receiver / city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
            />
            <select
              className="rounded-xl border px-3 py-2 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              disabled={loading}
            >
              <option value="All">All statuses</option>
              <option value="To Assign">To Assign</option>
              <option value="Assigned">Assigned</option>
              <option value="On Way">On Way</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
              <option value="Return">Return</option>
              <option value="Exception">Exception</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
              <tr>
                <th className="px-3 py-3 text-left">Tracking</th>
                <th className="px-3 py-3 text-left">Merchant</th>
                <th className="px-3 py-3 text-left">Receiver</th>
                <th className="px-3 py-3 text-left">City</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-right">COD</th>
                <th className="px-3 py-3 text-left">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.trackingId} className="border-b last:border-b-0">
                  <td className="px-3 py-3 font-semibold text-slate-900">{r.trackingId}</td>
                  <td className="px-3 py-3 text-slate-700">{r.merchant}</td>
                  <td className="px-3 py-3 text-slate-700">{r.receiver}</td>
                  <td className="px-3 py-3 text-slate-700">{r.city}</td>
                  <td className="px-3 py-3">
                    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold", STATUS_BADGE[r.status])}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-slate-900">{formatMMK(r.cod)}</td>
                  <td className="px-3 py-3 text-slate-500 text-xs">{r.updatedAt}</td>
                </tr>
              ))}
              {!filtered.length ? (
                <tr>
                  <td className="px-3 py-6 text-center text-slate-500 text-sm" colSpan={7}>
                    {loading ? "Loading…" : "No shipments found."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5">
          <div className="font-extrabold text-slate-800">Quick Actions</div>
          <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
            <a className="rounded-xl border bg-white hover:bg-slate-50 px-3 py-2 font-bold" href="/admin/management">
              Manage Users / Roles
            </a>
            <a className="rounded-xl border bg-white hover:bg-slate-50 px-3 py-2 font-bold" href="/admin/bulk-upload">
              Bulk Upload Orders
            </a>
            <a className="rounded-xl border bg-white hover:bg-slate-50 px-3 py-2 font-bold" href="/admin/tariffs">
              Tariff / Pricing Settings
            </a>
          </div>
        </Card>

        <Card className="p-5 md:col-span-2">
          <div className="font-extrabold text-slate-800">Operational Tasks</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Unassigned Deliveries</div>
              <div className="text-2xl font-extrabold text-slate-900">{data ? data.pendingPickups : 0}</div>
              <div className="text-xs text-slate-500 mt-1">Dispatch riders for best SLA.</div>
            </div>
            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Exceptions / Returns</div>
              <div className="text-2xl font-extrabold text-slate-900">{data ? data.exceptions : 0}</div>
              <div className="text-xs text-slate-500 mt-1">Resolve issues quickly.</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
