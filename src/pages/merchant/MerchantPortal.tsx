import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider"; // Fixed: Moved outside the open block
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent 
} from "@/components/ui/card"; // Fixed: Properly closed and added source
import { 
    LayoutDashboard, 
    Package, 
    Truck, 
    CheckCircle2, 
    DollarSign, 
    Plus, 
    Search, 
    MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MerchantDashboardPage() {
    const { t } = useI18n();
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0d2c54]">{t("Merchant Dashboard")}</h1>
                    <p className="text-sm text-gray-500">{t("Track your shipments and COD collections.")}</p>
                </div>
                <Button className="bg-[#ff6b00] hover:bg-[#e66000]">
                    <Plus className="mr-2 h-4 w-4" /> {t("New Shipment")}
                </Button>
            </div>

            {/* Quick Stats in MMK */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <DashboardStat icon={Package} label={t("Pending")} value="12" color="blue" />
                <DashboardStat icon={Truck} label={t("In Transit")} value="5" color="orange" />
                <DashboardStat icon={CheckCircle2} label={t("Delivered")} value="142" color="green" />
                <DashboardStat icon={DollarSign} label={t("COD Balance")} value="450,000 MMK" color="red" />
            </div>

            {/* Tracking Search */}
            <Card className="mb-8 border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-[#0d2c54]">{t("Quick Tracking")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                                placeholder={t("Enter Tracking ID (e.g., BE-12345)")} 
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="bg-[#0d2c54]">{t("Search")}</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function DashboardStat({ icon: Icon, label, value, color }: any) {
    const colors: any = {
        blue: "text-blue-600 bg-blue-50",
        orange: "text-orange-600 bg-orange-50",
        green: "text-green-600 bg-green-50",
        red: "text-red-600 bg-red-50"
    };
    return (
        <Card className="border-none shadow-sm">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${colors[color]}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">{label}</p>
                        <h3 className="text-xl font-bold text-gray-900">{value}</h3>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}