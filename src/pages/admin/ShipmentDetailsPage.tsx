import React from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/SharedComponents";
import PageHeader from "@/components/admin/PageHeader";
import { useI18n } from "../../i18n/I18nProvider";

export default function ShipmentDetailsPage() {
  const { t } = useI18n();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any | null>(null);

  React.useEffect(() => {
    async function run() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const snap = await getDoc(doc(db, "shipments", id));
        setData(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load.");
      } finally {
        setLoading(false);
      }
    }
    void run();
  }, [id]);

  return (
    <div className="space-y-6">
      <PageHeader titleKey="common.details" subtitle={<span>{t("admin.shipments")} • {id}</span>} />
      <Card className="p-4">
        {loading ? (
          <div className="py-10 text-center text-sm text-slate-600">{t("common.loading")}</div>
        ) : error ? (
          <div className="rounded-xl border bg-red-50 p-3 text-sm text-red-800 font-semibold">{error}</div>
        ) : !data ? (
          <div className="text-sm text-slate-600">{t("common.noData")}</div>
        ) : (
          <pre className="text-xs overflow-auto bg-slate-50 border rounded-xl p-4">{JSON.stringify(data, null, 2)}</pre>
        )}
      </Card>
    </div>
  );
}
