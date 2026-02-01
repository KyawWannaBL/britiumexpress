import React, { useState, useMemo } from 'react';
import { useI18n } from "@/i18n/I18nProvider"; // Fixed: Corrected import placement
import {
    LayoutDashboard, 
    Package, 
    Upload, 
    FileText, 
    Warehouse,
    BarChart3, 
    CreditCard, 
    Truck, 
    TrendingUp,
    Search,
    Download,
    Plus,
    Filter,
    DollarSign,
    Box,
    Clock,
    CheckCircle2,
    MapPin
} from 'lucide-react'; // Fixed: Consolidated and closed import block

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";

// --- Dashboard Component ---
export default function MerchantPortal() {
    const { t } = useI18n();
    const [searchTerm, setSearchTerm] = useState("");

    // Statistics based on your operational flow
    const stats = [
        { label: t("Pending Pickups"), value: "12", icon: Package, color: "text-blue-600" },
        { label: t("In Transit"), value: "48", icon: Truck, color: "text-orange-600" },
        { label: t("Delivered (Monthly)"), value: "154", icon: CheckCircle2, color: "text-green-600" },
        { label: t("COD Balance (MMK)"), value: "1,240,500", icon: DollarSign, color: "text-red-600" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-[#0d2c54] text-white flex flex-col p-6">
                <div className="mb-10">
                    <h1 className="text-xl font-bold tracking-tight text-[#ff6b00]">BRITIUM EXPRESS</h1>
                    <p className="text-xs opacity-60">Merchant Portal v1.0</p>
                </div>
                
                <nav className="flex-1 space-y-2">
                    <NavItem icon={LayoutDashboard} label={t("Dashboard")} active />
                    <NavItem icon={Plus} label={t("Create Order")} />
                    <NavItem icon={Box} label={t("My Shipments")} />
                    <NavItem icon={Warehouse} label={t("Warehousing")} />
                    <NavItem icon={FileText} label={t("Invoices")} />
                    <NavItem icon={TrendingUp} label={t("MMK Tariffs")} />
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{t("Merchant Overview")}</h2>
                        <p className="text-gray-500 text-sm">{t("Manage your parcels and track COD collections.")}</p>
                    </div>
                    <Button className="bg-[#ff6b00] hover:bg-[#e66000]">
                        <Upload className="mr-2 h-4 w-4" /> {t("Bulk Upload (Excel)")}
                    </Button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                <span className="text-xs font-bold text-gray-400">Live</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Shipments Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-[#0d2c54]">{t("Recent Shipments")}</h3>
                        <div className="flex gap-2">
                            <Input 
                                placeholder={t("Search Tracking ID...")} 
                                className="w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead>{t("Tracking ID")}</TableHead>
                                <TableHead>{t("Recipient")}</TableHead>
                                <TableHead>{t("Destination")}</TableHead>
                                <TableHead>{t("Status")}</TableHead>
                                <TableHead className="text-right">{t("COD (MMK)")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <OrderRow id="BE-99421" name="Daw Aye Aye" dest="Mandalay" status="In Transit" cod="25,000" />
                            <OrderRow id="BE-99420" name="U Kyaw Zayar" dest="Yangon (Zone 1)" status="Delivered" cod="12,500" />
                            <OrderRow id="BE-99419" name="John Smith" dest="USA (Air Cargo)" status="Processing" cod="0" />
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    );
}

// --- Helper Components ---
function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#ff6b00] text-white' : 'hover:bg-white/10 text-gray-300'}`}>
            <Icon className="h-5 w-5" />
            {label}
        </a>
    );
}

function OrderRow({ id, name, dest, status, cod }: { id: string, name: string, dest: string, status: string, cod: string }) {
    const statusColor = status === "Delivered" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700";
    return (
        <TableRow>
            <TableCell className="font-mono font-bold text-blue-600">{id}</TableCell>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell className="flex items-center gap-1 text-gray-500"><MapPin className="h-3 w-3" /> {dest}</TableCell>
            <TableCell><span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor}`}>{status}</span></TableCell>
            <TableCell className="text-right font-bold text-gray-900">{cod}</TableCell>
        </TableRow>
    );
}