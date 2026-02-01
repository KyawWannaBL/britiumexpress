import React, { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider"; // Fixed: Corrected import placement
import {
  Activity,
  AlertTriangle,
  Database,
  Download,
  HardDrive,
  LogOut,
  Monitor,
  MoreHorizontal,
  Power,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserCog,
  UserPlus,
  UserX,
  Users,
  Zap,
  FileText,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                    */
/* -------------------------------------------------------------------------- */

type Tone = "green" | "blue" | "purple" | "orange" | "red" | "gray" | "yellow";

type Metrics = {
  uptime: number;
  activeUsers: number;
  apiRequestsM: number;
  storageGB: number;
};

type Monitoring = {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
};

/* -------------------------------------------------------------------------- */
/* CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const TONE_STYLES = {
  green: {
    text: "text-green-700",
    textStrong: "text-green-800",
    iconBg: "bg-green-100",
    btn: "bg-green-600 hover:bg-green-700",
    bar: "bg-green-500",
  },
  blue: {
    text: "text-blue-700",
    textStrong: "text-blue-800",
    iconBg: "bg-blue-100",
    btn: "bg-blue-600 hover:bg-blue-700",
    bar: "bg-blue-500",
  },
  purple: {
    text: "text-purple-700",
    textStrong: "text-purple-800",
    iconBg: "bg-purple-100",
    btn: "bg-purple-600 hover:bg-purple-700",
    bar: "bg-purple-500",
  },
  orange: {
    text: "text-orange-700",
    textStrong: "text-orange-800",
    iconBg: "bg-orange-100",
    btn: "bg-orange-600 hover:bg-orange-700",
    bar: "bg-orange-500",
  },
  yellow: {
    text: "text-yellow-700",
    textStrong: "text-yellow-800",
    iconBg: "bg-yellow-100",
    btn: "bg-yellow-600 hover:bg-yellow-700",
    bar: "bg-yellow-500",
  },
  red: {
    text: "text-red-700",
    textStrong: "text-red-800",
    iconBg: "bg-red-100",
    btn: "bg-red-600 hover:bg-red-700",
    bar: "bg-red-500",
  },
  gray: {
    text: "text-gray-700",
    textStrong: "text-gray-800",
    iconBg: "bg-gray-100",
    btn: "bg-gray-700 hover:bg-gray-800",
    bar: "bg-gray-500",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

export default function AdminManagement(): JSX.Element {
  const { t } = useI18n();

  // Initial States
  const [metrics, setMetrics] = useState<Metrics>({
    uptime: 99.98,
    activeUsers: 2847,
    apiRequestsM: 1.2,
    storageGB: 847,
  });

  const [monitoring, setMonitoring] = useState<Monitoring>({
    cpu: 23,
    memory: 67,
    disk: 42,
    network: 15,
  });

  // Real-time Dashboard Simulation
  useEffect(() => {
    const metricInterval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        uptime: Math.min(100, Math.max(99, prev.uptime + (Math.random() - 0.5) * 0.01)),
        activeUsers: Math.max(0, Math.floor(prev.activeUsers + (Math.random() - 0.5) * 10)),
      }));
    }, 5000);

    const monitorInterval = setInterval(() => {
      setMonitoring((prev) => ({
        cpu: Math.min(95, Math.max(5, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(95, Math.max(10, prev.memory + (Math.random() - 0.5) * 5)),
        disk: prev.disk,
        network: Math.min(90, Math.max(5, prev.network + (Math.random() - 0.5) * 15)),
      }));
    }, 3000);

    return () => {
      clearInterval(metricInterval);
      clearInterval(monitorInterval);
    };
  }, []);

  const handleDangerAction = (action: string) => {
    if (window.confirm(t("Irreversible action warning: ") + action)) {
      alert(`${action} ${t("initiated.")}`);
    }
  };

  const metricCards = useMemo(() => [
    { title: t("System Uptime"), value: `${metrics.uptime.toFixed(2)}%`, sub: t("Last 30 days"), tone: "green" as const, icon: Activity },
    { title: t("Active Users"), value: metrics.activeUsers.toLocaleString(), sub: t("+12% from yesterday"), tone: "blue" as const, icon: Users },
    { title: t("API Requests"), value: `${metrics.apiRequestsM}M`, sub: t("Last 24 hours"), tone: "purple" as const, icon: Zap },
    { title: t("Storage Used"), value: `${metrics.storageGB} GB`, sub: t("of 2 TB capacity"), tone: "orange" as const, icon: HardDrive },
  ], [metrics, t]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      {/* ENTERPRISE HEADER */}
      <header className="bg-gradient-to-br from-[#0D47A1] to-[#1565C0] text-white shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">{t("System Administration Console")}</h1>
              <p className="text-xs text-blue-100 uppercase tracking-widest">{t("Britium Express Enterprise")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 border border-white/20">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span className="text-xs font-semibold uppercase">{t("System Live")}</span>
            </div>
            <button onClick={() => alert("Logout initiated")} className="flex items-center gap-2 rounded-lg bg-red-600/90 px-4 py-2 text-sm font-bold hover:bg-red-700 transition-all shadow-md">
              <LogOut className="h-4 w-4" /> {t("Logout")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI GRID */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            
            {/* USER CONTROL PANEL */}
            <SectionCard 
              title={t("User Management")} 
              icon={<UserCog className="h-5 w-5 text-blue-600" />}
              action={
                <button onClick={() => alert("Add User")} className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 shadow-sm">
                  <UserPlus className="mr-2 h-4 w-4" /> {t("Add User")}
                </button>
              }
            >
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatBox label={t("Total Registry")} value="15,847" tone="gray" icon={<Users className="h-8 w-8 opacity-20" />} />
                <StatBox label={t("Online Now")} value={metrics.activeUsers.toLocaleString()} tone="green" icon={<UserCheck className="h-8 w-8 opacity-20" />} />
                <StatBox label={t("Suspended")} value="23" tone="red" icon={<UserX className="h-8 w-8 opacity-20" />} />
              </div>
              <div className="space-y-2">
                <UserRow initial="M" tone="blue" email="manager.yangon@britium.com" role="Manager • Yangon Region" />
                <UserRow initial="S" tone="green" email="station.ygn001@britium.com" role="Sub-station • YGN Branch 1" />
              </div>
            </SectionCard>

            {/* DATA INFRASTRUCTURE */}
            <SectionCard title={t("Database Administration")} icon={<Database className="h-5 w-5 text-blue-600" />}>
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatBox label={t("Total Records")} value="2.4M" tone="blue" icon={<FileText className="h-8 w-8 opacity-20" />} />
                <StatBox label={t("Query Performance")} value="98.5%" tone="green" icon={<Zap className="h-8 w-8 opacity-20" />} />
                <StatBox label={t("Cloud Storage")} value={`${metrics.storageGB} GB`} tone="orange" icon={<HardDrive className="h-8 w-8 opacity-20" />} />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ActionButton label={t("Backup Database")} tone="blue" icon={<Download className="h-4 w-4" />} />
                <ActionButton label={t("Optimize Tables")} tone="green" icon={<RefreshCw className="h-4 w-4" />} />
              </div>
            </SectionCard>
          </div>

          <div className="space-y-8">
            {/* SERVER MONITORING */}
            <SectionCard title={t("Resources Monitoring")} icon={<Monitor className="h-5 w-5 text-blue-600" />}>
              <ProgressBar label={t("CPU Load")} value={monitoring.cpu} tone="green" />
              <ProgressBar label={t("Memory Allocation")} value={monitoring.memory} tone="yellow" />
              <ProgressBar label={t("Disk I/O")} value={monitoring.disk} tone="blue" />
              <ProgressBar label={t("Network Throughput")} value={monitoring.network} tone="purple" />
            </SectionCard>

            {/* CRITICAL ACTIONS */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
              <h3 className="mb-4 flex items-center text-lg font-bold text-red-800">
                <AlertTriangle className="mr-2 h-5 w-5" /> {t("Danger Zone")}
              </h3>
              <div className="space-y-3">
                <button onClick={() => handleDangerAction("Data Purge")} className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-bold text-white hover:bg-red-700 transition-colors shadow-sm">
                  <Trash2 className="h-4 w-4" /> {t("Purge Old Data")}
                </button>
                <button onClick={() => handleDangerAction("System Reset")} className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-600 py-3 font-bold text-red-600 hover:bg-red-600 hover:text-white transition-all">
                  <Power className="h-4 w-4" /> {t("Emergency Shutdown")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SUBCOMPONENTS                               */
/* -------------------------------------------------------------------------- */

function MetricCard({ title, value, sub, tone, icon: Icon }: any) {
  const s = TONE_STYLES[tone];
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{title}</p>
          <p className={`text-2xl font-black mt-1 ${s.textStrong}`}>{value}</p>
          <p className="text-xs text-gray-500 mt-1">{sub}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.iconBg}`}>
          <Icon className={`h-6 w-6 ${s.text}`} />
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, action, children }: any) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="flex items-center text-lg font-bold text-gray-800">
          <span className="mr-3">{icon}</span> {title}
        </h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function StatBox({ label, value, tone, icon }: any) {
  const s = TONE_STYLES[tone as keyof typeof TONE_STYLES];
  const bgColor = tone === "gray" ? "bg-gray-50" : `bg-${tone}-50`;
  return (
    <div className={`${bgColor} flex items-center justify-between rounded-xl p-4 border border-black/5`}>
      <div>
        <p className={`text-xs font-bold uppercase tracking-wide ${s.text}`}>{label}</p>
        <p className={`text-xl font-black ${s.textStrong}`}>{value}</p>
      </div>
      {icon}
    </div>
  );
}

function UserRow({ initial, tone, email, role }: any) {
  const colors: any = { blue: "bg-blue-600", green: "bg-green-600" };
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 border border-gray-100 hover:border-blue-200 transition-colors cursor-default">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${colors[tone]} text-sm font-black text-white shadow-sm`}>
          {initial}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">{email}</p>
          <p className="text-xs text-gray-500 font-medium">{role}</p>
        </div>
      </div>
      <MoreHorizontal className="h-5 w-5 text-gray-300 hover:text-gray-600 cursor-pointer" />
    </div>
  );
}

function ActionButton({ label, icon, tone, onClick }: any) {
  const s = TONE_STYLES[tone as keyof typeof TONE_STYLES];
  return (
    <button onClick={onClick} className={`flex items-center justify-center gap-2 rounded-lg py-3 font-bold text-white transition-all shadow-sm ${s.btn}`}>
      {icon} <span>{label}</span>
    </button>
  );
}

function ProgressBar({ label, value, tone }: any) {
  const s = TONE_STYLES[tone as keyof typeof TONE_STYLES];
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="mb-5">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wide mb-2">
        <span className="text-gray-500">{label}</span>
        <span className={s.textStrong}>{Math.round(pct)}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-100 border border-gray-200">
        <div className={`h-full rounded-full transition-all duration-500 ${s.bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}