import { useAuth } from "../auth/AuthContext";
import { PERMISSIONS } from "../auth/authClient";
import { LayoutDashboard, CreditCard, Users, Truck, Package } from "lucide-react";

export default function AppLayout() {
  const { can, user } = useAuth();

  const menuItems = [
    { label: "Dashboard", path: `/${user?.role}/dashboard`, icon: LayoutDashboard, show: true },
    { label: "Financials", path: "/finance", icon: CreditCard, show: can(PERMISSIONS.FINANCIAL_READ) },
    { label: "User Management", path: "/admin/users", icon: Users, show: can(PERMISSIONS.USER_MANAGE) },
    { label: "Dispatch", path: "/dispatch", icon: Truck, show: can(PERMISSIONS.DISPATCH_ASSIGN) },
    { label: "Inventory", path: "/warehouse", icon: Package, show: can(PERMISSIONS.INVENTORY_SCAN) },
  ];

  return (
    <div className="flex">
      <aside className="w-64 bg-white border-r h-screen p-4">
        <nav className="space-y-2">
          {menuItems.filter(item => item.show).map(item => (
            <a key={item.label} href={item.path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50">
              <item.icon size={18} />
              <span className="font-extrabold text-sm">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{/* Page Content */}</main>
    </div>
  );
}