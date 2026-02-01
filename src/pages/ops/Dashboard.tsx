import React from "react";
import { Link } from "react-router-dom";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useAuthProfile, requireStation } from "../../shared/useAuthProfile";
import { useI18n } from "@/i18n/I18nProvider";

function Stat({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="mt-2 text-3xl font-extrabold">{loading ? "…" : value}</div>
    </div>
  );
}

export default function OpsDashboard() {
  const { t } = useI18n();

  const { user, profile, loading: authLoading } = useAuthProfile();
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    pendingDeliveries: 0,
    activeDeliveries: 0,
    failedDeliveries: 0,
    parcelsInbound: 0,
    parcelsManifested: 0,
    parcelsOutForDelivery: 0,
    returns: 0,
    drivers: 0,
  });

  React.useEffect(() => {
    let alive = true;

    (async () => {
      if (authLoading) return;
      if (!user) return;

      let stationId = "";
      try {
        stationId = requireStation(profile);
      } catch {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [
          pendingDeliveries,
          activeDeliveries,
          failedDeliveries,
          parcelsInbound,
          parcelsManifested,
          parcelsOutForDelivery,
          returns,
          drivers,
        ] = await Promise.all([
          getCountFromServer(query(collection(db, "deliveries"), where("stationId", "==", stationId), where("status", "==", "pending"))),
          getCountFromServer(query(collection(db, "deliveries"), where("stationId", "==", stationId), where("status", "==", "active"))),
          getCountFromServer(query(collection(db, "deliveries"), where("stationId", "==", stationId), where("status", "==", "failed"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "inbound_received"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "manifested"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "out_for_delivery"))),
          getCountFromServer(query(collection(db, "parcels"), where("currentStationId", "==", stationId), where("status", "==", "return_received"))),
          getCountFromServer(query(collection(db, "users"), where("stationId", "==", stationId), where("role", "==", "rider_driver"))),
        ]);

        if (!alive) return;
        setStats({
          pendingDeliveries: pendingDeliveries.data().count,
          activeDeliveries: activeDeliveries.data().count,
          failedDeliveries: failedDeliveries.data().count,
          parcelsInbound: parcelsInbound.data().count,
          parcelsManifested: parcelsManifested.data().count,
          parcelsOutForDelivery: parcelsOutForDelivery.data().count,
          returns: returns.data().count,
          drivers: drivers.data().count,
        });
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [authLoading, user, profile]);

  if (authLoading) return <div className="p-6">{t("Loading…")}</div>;
  if (!user) return <div className="p-6">{t("Please login.")}</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="text-2xl font-extrabold">{t("Ops Dashboard")}</div>
        <div className="text-sm text-neutral-600">
          Station: <span className="font-mono">{profile?.stationId ?? "N/A"}</span> • Role:{" "}
          <span className="font-semibold">{profile?.role ?? "unknown"}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label={t("Pending deliveries")} value={stats.pendingDeliveries} loading={loading} />
        <Stat label={t("Active deliveries")} value={stats.activeDeliveries} loading={loading} />
        <Stat label={t("Failed deliveries")} value={stats.failedDeliveries} loading={loading} />
        <Stat label={t("Drivers")} value={stats.drivers} loading={loading} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label={t("Inbound parcels")} value={stats.parcelsInbound} loading={loading} />
        <Stat label={t("Manifested")} value={stats.parcelsManifested} loading={loading} />
        <Stat label={t("Out for delivery")} value={stats.parcelsOutForDelivery} loading={loading} />
        <Stat label={t("Returns")} value={stats.returns} loading={loading} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md" to="/ops/deliveries/create">
          <div className="font-semibold">{t("Create Delivery")}</div>
          <div className="text-sm text-neutral-600">{t("Assign parcels to a driver and dispatch.")}</div>
        </Link>

        <Link className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md" to="/ops/dispatch">
          <div className="font-semibold">{t("Dispatch Control")}</div>
          <div className="text-sm text-neutral-600">{t("Live board: pending/active/failed/return.")}</div>
        </Link>

        <Link className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md" to="/ops/way">
          <div className="font-semibold">{t("Way Management")}</div>
          <div className="text-sm text-neutral-600">{t("Parcel movement oversight & exceptions.")}</div>
        </Link>
      </div>
    </div>
  );
}