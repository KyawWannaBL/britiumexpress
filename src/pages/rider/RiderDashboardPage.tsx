/**
 * File: src/pages/rider/RiderDashboardPage.tsx
 * Description: Design-compliant Rider portal with task management and status updates.
 */

import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  DataTable, 
  StatCard, 
  Badge, 
  Button 
} from "../../components/ui/SharedComponents";
import { CheckCircle, Navigation, Package } from "lucide-react";

type Assignment = {
  id: string;
  township: string;
  address: string;
  status: "To pick up" | "Out for delivery" | "Completed";
  customer: string;
};

const INITIAL_TASKS: Assignment[] = [
  { id: "BE001247", township: "East Dagon", address: "No. 42, Padonmar St", status: "Out for delivery", customer: "Kyaw Kyaw" },
  { id: "BE001310", township: "Sanchaung", address: "Pyay Road, Junction Square", status: "To pick up", customer: "Zayar" },
  { id: "BE001199", township: "Hlaing", address: "AD Junction", status: "Completed", customer: "Su Su" },
];

export default function RiderDashboardPage() {
  const [tasks, setTasks] = useState<Assignment[]>(INITIAL_TASKS);

  const updateStatus = (id: string, newStatus: Assignment["status"]) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Rider Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Stops Today" value="12" hint="3 remaining" tone="blue" />
        <StatCard title="Completed" value="9" hint="Great pace!" tone="green" />
        <StatCard title="Daily Earnings" value="28,500 MMK" hint="Estimated" tone="orange" />
      </div>

      <Card className="shadow-soft overflow-hidden">
        <CardHeader 
          title="Daily Assignments" 
          subtitle="Your route for today. Tap the button to update parcel status." 
        />
        <CardBody className="p-0">
          <DataTable<Assignment>
            rowKey={(t) => t.id}
            rows={tasks}
            columns={[
              { 
                key: "id", 
                title: "Parcel", 
                render: (t) => (
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-blue-900">{t.id}</span>
                    <span className="text-xs text-slate-500">{t.customer}</span>
                  </div>
                )
              },
              { 
                key: "township", 
                title: "Location", 
                render: (t) => (
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-slate-400" />
                    <span className="text-sm">{t.township}</span>
                  </div>
                )
              },
              { 
                key: "status", 
                title: "Status", 
                render: (t) => {
                  const toneMap: Record<string, "orange" | "blue" | "green"> = {
                    "To pick up": "orange",
                    "Out for delivery": "blue",
                    "Completed": "green",
                  };
                  return <Badge tone={toneMap[t.status]}>{t.status}</Badge>;
                }
              },
              { 
                key: "actions", 
                title: "Update", 
                className: "text-right",
                render: (t) => (
                  <div className="flex justify-end gap-2">
                    {t.status === "Out for delivery" && (
                      <Button 
                        variant="primary" 
                        className="h-8 px-3 text-xs"
                        onClick={() => updateStatus(t.id, "Completed")}
                      >
                        <CheckCircle className="w-3 h-3" />
                        Finish
                      </Button>
                    )}
                    {t.status === "To pick up" && (
                      <Button 
                        variant="secondary" 
                        className="h-8 px-3 text-xs"
                        onClick={() => updateStatus(t.id, "Out for delivery")}
                      >
                        <Package className="w-3 h-3" />
                        Start
                      </Button>
                    )}
                  </div>
                )
              },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}