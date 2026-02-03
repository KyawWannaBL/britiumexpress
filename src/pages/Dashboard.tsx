import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Truck, 
  Users, 
  User, 
  FileText, 
  BarChart3, 
  Megaphone, 
  Briefcase, 
  MapPin, 
  RefreshCw, 
  Crosshair, 
  Network, 
  Radio, 
  DollarSign, 
  HeartHandshake, 
  Tags, 
  Contact, 
  Headphones, 
  Settings, 
  FileCheck, 
  ScrollText,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Calendar,
  Menu,
  X,
  Filter,
  Download,
  MoreHorizontal,
  Map,
  ArrowRightLeft,
  Package,
  AlertCircle,
  CheckCircle2,
  Clock,
  Save,
  Phone,
  Mail,
  Lock,
  Building,
  Bike,
  Navigation,
  Undo2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Facebook,
  MessageCircle,
  Receipt,
  CreditCard,
  BookOpen,
  PieChart,
  TrendingUp,
  TrendingDown,
  FileBarChart,
  Wallet,
  Send,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  Image,
  Crown,
  Gift,
  Ticket,
  CheckCircle,
  Building2,
  Home
} from 'lucide-react';

/**
 * BRITIUM EXPRESS - ENTERPRISE ADMIN SUITE
 * Based on 'BE_app_pages.pdf' (88 Pages)
 * * CORE COLORS:
 * Primary Blue: #0D47A1
 * Accent Orange: #FF6F00
 * Background: #F4F6F8
 */

// --- Assets & Icons ---

const BritiumLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#0D47A1"/>
    <path d="M12 10H20C24.4183 10 28 13.5817 28 18V22C28 26.4183 24.4183 30 20 30H12V10Z" fill="white" fillOpacity="0.2"/>
    <path d="M12 10H18C21.3137 10 24 12.6863 24 16V16C24 19.3137 21.3137 22 18 22H12V10Z" fill="white"/>
    <path d="M12 22H20C23.3137 22 26 24.6863 26 28V28C26 31.3137 23.3137 34 20 34H12V22Z" fill="#FF6F00"/>
  </svg>
);

// --- Reusable Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

const Badge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    "Successful": "bg-green-100 text-green-700",
    "To assign": "bg-orange-100 text-orange-800",
    "Assigned": "bg-blue-100 text-blue-700",
    "On way": "bg-indigo-100 text-indigo-700",
    "Canceled": "bg-red-100 text-red-700",
    "Created": "bg-slate-100 text-slate-700",
    "Regular": "bg-slate-100 text-slate-600",
    "Active": "bg-green-100 text-green-700",
    "Day off": "bg-slate-100 text-slate-500",
    "Arrived": "bg-teal-100 text-teal-700",
    "Returned": "bg-rose-100 text-rose-700",
    "Failed": "bg-red-50 text-red-600 border border-red-200",
    "Processing": "bg-blue-50 text-blue-600",
    "Depart Requesting": "bg-yellow-50 text-yellow-700",
    "Arrived Requesting": "bg-purple-50 text-purple-700",
    "Assets": "bg-emerald-50 text-emerald-700",
    "Expense": "bg-red-50 text-red-700",
    "Revenue": "bg-green-50 text-green-700",
    "Equity": "bg-blue-50 text-blue-700",
    "Liabilities": "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider whitespace-nowrap ${styles[status] || styles["Created"]}`}>
      {status}
    </span>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  className?: string;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
}

const Button = ({ children, variant = "primary", className = "", icon: Icon, onClick, ...props }: ButtonProps) => {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors text-sm";
  const variants = {
    primary: "bg-[#0D47A1] text-white hover:bg-blue-800",
    secondary: "bg-[#FF6F00] text-white hover:bg-orange-700",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

// --- View Components ---

// 1. DASHBOARD VIEW (PDF Page 1)
const DashboardView = () => {
  const pickupStats = {
    total: 27,
    percent: 23,
    breakdown: [
      { label: "To assign", count: 28, color: "text-orange-600" },
      { label: "Already assigned", count: 60, color: "text-blue-600" },
      { label: "On way", count: 0, color: "text-indigo-600" },
      { label: "Canceled", count: 0, color: "text-red-600" },
    ]
  };

  const deliveryStats = {
    total: 19,
    percent: 3,
    breakdown: [
      { label: "To assign", count: 52, color: "text-orange-600" },
      { label: "Already assigned", count: 434, color: "text-blue-600" },
      { label: "On way", count: 54, color: "text-indigo-600" },
      { label: "Retry", count: 1, color: "text-yellow-600" },
      { label: "Canceled", count: 0, color: "text-red-600" },
      { label: "Return", count: 0, color: "text-slate-600" },
    ]
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <div className="text-sm text-slate-500">Overview period: 25/12/2025 - 25/01/2026</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Merchant Orders Table */}
        <Card className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-lg">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Users size={18} className="text-[#0D47A1]" />
              Merchant direct order
            </h3>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold text-center">Ways</th>
                  <th className="px-4 py-3 font-semibold">Order at</th>
                  <th className="px-4 py-3 font-semibold">Town</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 1, merchant: "Nora Store", ways: 15, date: "24/01/26", town: "ရန်ကင်း" },
                  { id: 2, merchant: "ပီတိစာပေ", ways: 1, date: "23/01/26", town: "ဒဂုံမြို့" },
                  { id: 3, merchant: "စံချိန်သစ် ကွန်ပျူတာ", ways: 1, date: "21/01/26", town: "egyi" },
                  { id: 4, merchant: "Aqua Pa La Tar Aquarium", ways: 1, date: "21/01/26", town: "လှိုင်" },
                  { id: 5, merchant: "Unique/Diva", ways: 20, date: "21/01/26", town: "တာမွေ" },
                  { id: 6, merchant: "Mee Lay", ways: 3, date: "20/01/26", town: "ay" },
                ].map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{order.merchant}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs font-bold">
                        {order.ways}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{order.date}</td>
                    <td className="px-4 py-3 text-slate-600">{order.town}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Stats Column */}
        <div className="space-y-6">
          {/* Pickup Summary */}
          <Card className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-700 mb-1">Pickup Summary</h3>
                <p className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2">
                  {pickupStats.total} <span className="text-sm font-normal text-slate-500">pickup ways successful</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Truck size={24} />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
                <span>Progress</span>
                <span>{pickupStats.percent}% Completed</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-[#2E7D32] h-2 rounded-full" style={{ width: `${pickupStats.percent}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pickupStats.breakdown.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 rounded bg-slate-50 border border-slate-100">
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.count}</span>
                  <span className="text-xs text-slate-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Delivery Summary */}
          <Card className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-700 mb-1">Delivery Summary</h3>
                <p className="text-2xl font-bold text-[#2E7D32] flex items-center gap-2">
                  {deliveryStats.total} <span className="text-sm font-normal text-slate-500">delivery ways successful</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Package size={24} />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
                <span>Progress</span>
                <span>{deliveryStats.percent}% Completed</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-[#2E7D32] h-2 rounded-full" style={{ width: `${deliveryStats.percent}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {deliveryStats.breakdown.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 rounded bg-slate-50 border border-slate-100">
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.count}</span>
                  <span className="text-xs text-slate-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-700">Total overdue ways</h3>
            <select className="text-xs border border-slate-300 rounded px-2 py-1 bg-white">
              <option>This Month</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between px-4 space-x-2">
            {[35, 20, 45, 10, 60, 30, 15].map((h, i) => (
              <div key={i} className="w-full bg-red-100 rounded-t relative group">
                <div className="absolute bottom-0 w-full bg-red-500 rounded-t transition-all duration-500 hover:bg-red-600" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-700">Daily delivered ways</h3>
            <select className="text-xs border border-slate-300 rounded px-2 py-1 bg-white">
              <option>This Month</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between px-4 space-x-2">
            {[15, 30, 40, 55, 35, 20, 45].map((h, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t relative group">
                <div className="absolute bottom-0 w-full bg-[#0D47A1] rounded-t transition-all duration-500 hover:bg-blue-800" style={{ height: `${h}%` }}></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// 2. CREATE DELIVERY VIEW (PDF Page 2 & 3)
const CreateDeliveryView = () => {
  const [activeTab, setActiveTab] = useState('pickup'); // 'pickup' or 'office'

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Create Delivery</h2>
        <div className="flex gap-2">
          <Button variant="primary" icon={PlusCircle}>New Order</Button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-white rounded-t-lg shadow-sm">
        <button 
          onClick={() => setActiveTab('pickup')}
          className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'pickup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Pickup and deliver
        </button>
        <button 
          onClick={() => setActiveTab('office')}
          className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'office' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          In office receive
        </button>
      </div>

      <Card className="p-6 rounded-tl-none">
        {activeTab === 'pickup' ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Create delivery pickup</h3>
              <p className="text-sm text-slate-500">Fill up the pickup information first and then the pieces of delivery way information shall be followed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Merchant</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type merchant name (OR) phone (OR) ID"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">Pickup location</label>
                  
                  <div className="flex items-start gap-3 p-3 border border-blue-200 bg-blue-50 rounded-lg cursor-pointer">
                    <div className="mt-0.5"><div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div></div>
                    <div>
                      <span className="block text-sm font-medium text-slate-900">Pickup from merchant</span>
                      <span className="block text-xs text-slate-500">The items will be pickup From the merchant office / shop / home etc.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div className="mt-0.5"><div className="w-4 h-4 rounded-full border border-slate-400 bg-white"></div></div>
                    <div>
                      <span className="block text-sm font-medium text-slate-900">Pickup from Highway gates</span>
                      <span className="block text-xs text-slate-500">The items will be pickup at the highway station</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div className="mt-0.5"><div className="w-4 h-4 rounded-full border border-slate-400 bg-white"></div></div>
                    <div>
                      <span className="block text-sm font-medium text-slate-900">Pickup from post office</span>
                      <span className="block text-xs text-slate-500">The items will be pickup at the post office</span>
                    </div>
                  </div>

                  <button className="text-sm text-blue-600 font-medium flex items-center gap-1 mt-2">
                    <PlusCircle size={14} /> Add new address
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of ways to deliver</label>
                  <input type="number" defaultValue={1} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pickup date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cash advance</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-sm">Ks</span>
                    <input type="number" placeholder="0" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">The large item(s) should be carried by car</span>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Parcel(s) already received</span>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                        <span className="block text-sm text-slate-700">Confirm and assign to delivery man</span>
                        <span className="text-xs text-slate-400">Automatically assign the deliveryman to be pickup</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Remark</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Any special instructions..."></textarea>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-1">Create in office delivery way</h3>
              <p className="text-sm text-slate-500">The parcel has been received in the office and does not require to pickup.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sender information</label>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase">Sender name</label>
                      <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded text-sm" placeholder="Name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase">Mobile phone</label>
                      <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded text-sm" placeholder="09..." />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase">Other phones</label>
                      <input type="text" className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded text-sm" placeholder="Optional" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pickup date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Number of ways to deliver</label>
                  <input type="number" defaultValue={1} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Remark</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Notes..."></textarea>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">{activeTab === 'pickup' ? 'Next Step' : 'Save'}</Button>
        </div>
      </Card>
    </div>
  );
};

// 3. WAY MANAGEMENT VIEW (Updated for PDF Pages 4-12)
const WayManagementView = () => {
  const [activeTab, setActiveTab] = useState('pickup'); // pickup, deliver, failed, return, inout, transit, map
  const [inOutSubTab, setInOutSubTab] = useState('in'); // 'in' (In bucket) or 'out' (Pickup parcels)

  // Render Table Functions based on Tab
  const renderPickupTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4"><input type="checkbox" /></th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Cash advance</th>
            <th className="px-4 py-3">Car required</th>
            <th className="px-4 py-3">Prepaid</th>
            <th className="px-4 py-3">Parcel arrived</th>
            <th className="px-4 py-3">Total ways</th>
            <th className="px-4 py-3">Delivered</th>
            <th className="px-4 py-3">Data entry waiting</th>
            <th className="px-4 py-3">Address waiting</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Date to pickup</th>
            <th className="px-4 py-3">Pickup by</th>
            <th className="px-4 py-3">Created by</th>
            <th className="px-4 py-3">Zone</th>
            <th className="px-4 py-3">Branch</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN2401007655", status: "Assigned", merchant: "Baby Genius Os", mid: "M000020445", advance: "-", car: "No", prepaid: "No", arrived: "No", ways: 7, delivered: 0, waiting: 0, addr: 0, town: "ADSIT", created: "2026-01-24 05:03 pm", date: "2026-01-24", by: "Kyaw Zin Khant", createdBy: "Britium Express", zone: "AD(1)", branch: "Head Office" },
            { id: "YGN2401771323", status: "Assigned", merchant: "Unique Diva", mid: "M000016193", advance: "-", car: "No", prepaid: "No", arrived: "No", ways: 7, delivered: 0, waiting: 0, addr: 0, town: "ADSIT", created: "2026-01-24 04:41 pm", date: "2026-01-24", by: "Kyaw Zin Khant", createdBy: "Britium Express", zone: "Head Office", branch: "Head Office" },
            { id: "YGN2401455077", status: "Assigned", merchant: "OK Aluminium", mid: "M000049130", advance: "100,000", car: "Yes", prepaid: "No", arrived: "No", ways: 6, delivered: 0, waiting: 0, addr: 0, town: "ADSIT", created: "2026-01-24 03:46 pm", date: "2026-01-24", by: "Moe Sat Zin Tun", createdBy: "Britium Express", zone: "Head Office", branch: "Head Office" },
            { id: "YGN2401607489", status: "Created", merchant: "Nora Store", mid: "M000052597", advance: "305,000", car: "No", prepaid: "No", arrived: "No", ways: 15, delivered: 0, waiting: 15, addr: 15, town: "ADSIT", created: "2026-01-24 12:20 pm", date: "2026-01-24", by: "-", createdBy: "Nora Store", zone: "Head Office", branch: "Head Office" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="p-4"><input type="checkbox" /></td>
              <td className="px-4 py-3"><Badge status={row.status} /></td>
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-600">{row.advance}</td>
              <td className="px-4 py-3 text-slate-600">{row.car}</td>
              <td className="px-4 py-3 text-slate-600">{row.prepaid}</td>
              <td className="px-4 py-3 text-slate-600">{row.arrived}</td>
              <td className="px-4 py-3 text-center font-bold text-slate-700">{row.ways}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.delivered}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.waiting}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.addr}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
              <td className="px-4 py-3 text-slate-600">{row.date}</td>
              <td className="px-4 py-3 text-blue-600">{row.by}</td>
              <td className="px-4 py-3 text-slate-600">{row.createdBy}</td>
              <td className="px-4 py-3 text-slate-500">{row.zone}</td>
              <td className="px-4 py-3 text-slate-500">{row.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDeliverTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4"><input type="checkbox" /></th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Customer phone</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Deliver Date</th>
            <th className="px-4 py-3">Deliver By</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated by</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN279032YGN", status: "On way", customer: "Thinn Su Kyaw", phone: "09989996122", town: "ADSIT", date: "2026-01-25", by: "Myo Min Kyaw", merchant: "Unique Diva", mid: "M000016193", created: "Britium Express" },
            { id: "YGN355606YGN", status: "To assign", customer: "Ma Aye Myat", phone: "09989996122", town: "Sanchaung", date: "2026-01-25", by: "-", merchant: "Unique/Diva", mid: "M000016193", created: "Britium Express" },
            { id: "YGN140166YGN", status: "On way", customer: "Ma Nwe", phone: "09428027922", town: "ADSIT", date: "2026-01-24", by: "Aung Myo Min", merchant: "OK Aluminium", mid: "M000049130", created: "Britium Express" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="p-4"><input type="checkbox" /></td>
              <td className="px-4 py-3"><Badge status={row.status} /></td>
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 font-medium text-slate-900">{row.customer}</td>
              <td className="px-4 py-3 text-slate-600">{row.phone}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-slate-600">{row.date}</td>
              <td className="px-4 py-3 text-blue-600">{row.by}</td>
              <td className="px-4 py-3 text-slate-500">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
              <td className="px-4 py-3 text-slate-500"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFailedTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Action</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Date to deliver</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Pickup Date</th>
            <th className="px-4 py-3">Pickup by</th>
            <th className="px-4 py-3">Deliver by</th>
            <th className="px-4 py-3">Created By</th>
            <th className="px-4 py-3">Updated By</th>
            <th className="px-4 py-3">Transportation cost</th>
            <th className="px-4 py-3">Pickup ID</th>
            <th className="px-4 py-3">Failed count</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN0501873545", reason: "Cannot contact", action: "Put it back", customer: "Nandarin", phone: "095109705", ddate: "2026-01-06", town: "ADSIT", created: "2026-01-06", updated: "2026-01-08", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", pby: "Zone", dby: "Wai Phyo Oo", cby: "Britium Express", uby: "Wai Phyo Oo", cost: "-", pid: "YGN0501873545", count: 1 },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 text-red-600 font-medium">{row.reason}</td>
              <td className="px-4 py-3 flex gap-2">
                <button className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200">Put back</button>
                <button className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200">To collect</button>
              </td>
              <td className="px-4 py-3 text-slate-700">{row.customer}</td>
              <td className="px-4 py-3 text-slate-600">{row.phone}</td>
              <td className="px-4 py-3 text-slate-600">{row.ddate}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{row.created}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{row.updated}</td>
              <td className="px-4 py-3 text-slate-500">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
              <td className="px-4 py-3 text-slate-600">{row.pby}</td>
              <td className="px-4 py-3 text-blue-600">{row.dby}</td>
              <td className="px-4 py-3 text-slate-500">{row.cby}</td>
              <td className="px-4 py-3 text-slate-500">{row.uby}</td>
              <td className="px-4 py-3 text-slate-600">{row.cost}</td>
              <td className="px-4 py-3 text-slate-600 text-xs">{row.pid}</td>
              <td className="px-4 py-3 text-center text-slate-600">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderReturnTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4"><input type="checkbox" /></th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Way ID</th>
            <th className="px-4 py-3">Depart</th>
            <th className="px-4 py-3">Merchant</th>
            <th className="px-4 py-3">Merchant id</th>
            <th className="px-4 py-3">Pickup Date</th>
            <th className="px-4 py-3">Town</th>
            <th className="px-4 py-3">Return By</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Customer phone</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: "YGN122567YGN", status: "Returned", depart: "Head Office", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", by: "Myo Min Kyaw", customer: "Zin Mar", phone: "095041050", created: "2026-01-05", updated: "2026-01-07" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-50">
              <td className="p-4"><input type="checkbox" /></td>
              <td className="px-4 py-3"><Badge status={row.status} /></td>
              <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
              <td className="px-4 py-3 text-slate-600">{row.depart}</td>
              <td className="px-4 py-3 text-slate-600">{row.merchant}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
              <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
              <td className="px-4 py-3 text-slate-600">{row.town}</td>
              <td className="px-4 py-3 text-blue-600">{row.by}</td>
              <td className="px-4 py-3 text-slate-600">{row.customer}</td>
              <td className="px-4 py-3 text-slate-600">{row.phone}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{row.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderParcelInOut = () => (
    <div className="space-y-4">
      <div className="flex gap-4 border-b border-slate-200 pb-2">
        <button 
          onClick={() => setInOutSubTab('in')}
          className={`font-bold pb-2 px-1 border-b-2 transition-colors ${inOutSubTab === 'in' ? 'text-slate-700 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Pickup parcels (IN)
        </button>
        <button 
          onClick={() => setInOutSubTab('out')}
          className={`font-bold pb-2 px-1 border-b-2 transition-colors ${inOutSubTab === 'out' ? 'text-slate-700 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
        >
          Deliver parcels (OUT)
        </button>
      </div>
      
      {inOutSubTab === 'in' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total ways</th>
                <th className="px-4 py-3">Way Id</th>
                <th className="px-4 py-3">Merchant</th>
                <th className="px-4 py-3">Merchant Id</th>
                <th className="px-4 py-3">Pickup Date</th>
                <th className="px-4 py-3">Town</th>
                <th className="px-4 py-3">Pickup by</th>
                <th className="px-4 py-3">Arrived in</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Updated by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "YGN0501872545", status: "Arrived Requesting", total: 11, merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", by: "Kyaw Zin Khant", in: "Group1", created: "2026-01-05 02:01 pm", updated: "2026-01-05 02:37 pm" },
                { id: "YGN0501647500", status: "Arrived Requesting", total: 3, merchant: "Ko Phyo(Fishing Feeling)", mid: "M000004323", pdate: "2026-01-05", town: "ADSIT", by: "Moe Sat Zin Tun", in: "Group2", created: "2026-01-05 02:10 pm", updated: "2026-01-05 02:35 pm" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3"><Badge status={row.status} /></td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{row.total}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
                  <td className="px-4 py-3 text-slate-600">{row.merchant}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.town}</td>
                  <td className="px-4 py-3 text-blue-600">{row.by}</td>
                  <td className="px-4 py-3 text-slate-500">{row.in}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.updated}</td>
                  <td className="px-4 py-3 text-slate-500"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Way Id</th>
                <th className="px-4 py-3">Parcel location</th>
                <th className="px-4 py-3">Merchant</th>
                <th className="px-4 py-3">Merchant id</th>
                <th className="px-4 py-3">Pickup Date</th>
                <th className="px-4 py-3">Town</th>
                <th className="px-4 py-3">Deliver Date</th>
                <th className="px-4 py-3">Deliver by</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Updated by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "YGN122567YGN", status: "To deliver", loc: "Group1", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", ddate: "2026-01-06", by: "Myo Min Kyaw", created: "2026-01-05 03:52 pm", updated: "2026-01-07 05:30 pm" },
                { id: "YGN861121YGN", status: "To deliver", loc: "Group1", merchant: "The Shopping Cart", mid: "M000004287", pdate: "2026-01-05", town: "ADSIT", ddate: "2026-01-06", by: "Myo Min Kyaw", created: "2026-01-05 04:00 pm", updated: "2026-01-07 05:30 pm" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3"><Badge status={row.status} /></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.id}</td>
                  <td className="px-4 py-3 text-slate-600">{row.loc}</td>
                  <td className="px-4 py-3 text-slate-600">{row.merchant}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.mid}</td>
                  <td className="px-4 py-3 text-slate-600">{row.pdate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.town}</td>
                  <td className="px-4 py-3 text-slate-600">{row.ddate}</td>
                  <td className="px-4 py-3 text-blue-600">{row.by}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.created}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.updated}</td>
                  <td className="px-4 py-3 text-slate-500"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Way Management</h2>
           <p className="text-sm text-slate-500">Comprehensive order processing and tracking</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" icon={Download}>Export</Button>
           <Button variant="primary" icon={PlusCircle}>Create Way</Button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-1 border-b border-slate-200">
        {[
          { id: 'pickup', label: 'Pickup ways', icon: Truck },
          { id: 'deliver', label: 'Deliver ways', icon: Package },
          { id: 'failed', label: 'Failed ways', icon: AlertTriangle },
          { id: 'return', label: 'Return ways', icon: Undo2 },
          { id: 'inout', label: 'Parcel In/Out', icon: ArrowRightLeft },
          { id: 'transit', label: 'Transit route', icon: Navigation },
          { id: 'map', label: 'Tracking map', icon: Map },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap rounded-t-lg border-b-2 transition-colors
              ${activeTab === tab.id ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
            `}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {/* Filters Bar (Common for lists) */}
        {activeTab !== 'map' && (
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
               <span className="text-sm text-slate-500">Filter by:</span>
               <select className="text-sm border-slate-300 rounded-md shadow-sm"><option>All Zones</option></select>
               <select className="text-sm border-slate-300 rounded-md shadow-sm"><option>All Merchants</option></select>
            </div>
            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
               <input type="text" placeholder="Search way ID..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm" />
            </div>
          </div>
        )}
        
        {/* Content Render */}
        <div className="min-h-[400px]">
          {activeTab === 'pickup' && renderPickupTable()}
          {activeTab === 'deliver' && renderDeliverTable()}
          {activeTab === 'failed' && renderFailedTable()}
          {activeTab === 'return' && renderReturnTable()}
          {activeTab === 'inout' && <div className="p-4">{renderParcelInOut()}</div>}
          
          {activeTab === 'transit' && (
            <div className="p-8 text-center text-slate-500">
              <Navigation size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">Transit Routes</h3>
              <p>Manage inter-station transfers and routing.</p>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="h-[600px] bg-slate-100 relative w-full flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
               <div className="absolute top-1/4 left-1/4">
                  <div className="bg-white p-2 rounded shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Rider: Kyaw Zin</span>
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white mx-auto mt-1"></div>
               </div>
               <div className="absolute bottom-1/3 right-1/3">
                  <div className="bg-white p-2 rounded shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">Rider: Moe Sat</span>
                  </div>
               </div>
               <div className="absolute top-4 right-4 bg-white p-4 rounded shadow-md w-64">
                 <h4 className="font-bold text-sm mb-2">Live Tracking</h4>
                 <div className="space-y-2 text-xs">
                   <div className="flex justify-between"><span>Active Riders</span><span className="font-bold text-green-600">23</span></div>
                   <div className="flex justify-between"><span>Idle</span><span className="font-bold text-orange-500">5</span></div>
                   <div className="flex justify-between"><span>Offline</span><span className="font-bold text-slate-500">2</span></div>
                 </div>
               </div>
            </div>
          )}
        </div>

        {activeTab !== 'map' && (
          <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
             <span>Showing 1-10 of 50 records</span>
             <div className="flex gap-1">
               <button className="px-3 py-1 border rounded hover:bg-slate-50">Prev</button>
               <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
             </div>
          </div>
        )}
      </Card>
    </div>
  );
};

// 4. MERCHANTS VIEW (PDF Page 13 & 14)
const MerchantsView = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'add'

  if (viewMode === 'add') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Create new merchant</h2>
          <Button variant="outline" onClick={() => setViewMode('list')}>Cancel</Button>
        </div>

        <Card className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-5">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select the branch</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <option>Head Office</option>
                    <option>Mandalay Branch</option>
                  </select>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Merchant Name" />
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="text" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" placeholder="09..." />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select State</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <option>Yangon</option>
                      <option>Mandalay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Township</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <option>Kamaryut</option>
                      <option>Sanchaung</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Street</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
               </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">House No(or) Unit, floor</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg" />
               </div>
             </div>

             <div className="space-y-5">
               <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2"><Lock size={16}/> Login Credentials</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">User login mobile phone</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                      <input type="email" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                      <input type="password" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                      <input type="password" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg" />
                    </div>
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Account ID</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500" value="M000052899" readOnly />
               </div>

               <div className="pt-4 flex gap-3">
                  <Button variant="outline" className="w-full" onClick={() => setViewMode('list')}>Cancel</Button>
                  <Button variant="primary" className="w-full" icon={Save}>Save Merchant</Button>
               </div>
             </div>
           </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Merchants</h2>
          <p className="text-sm text-slate-500">The list of merchants who will work with you</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" icon={PlusCircle} onClick={() => setViewMode('add')}>Add new merchant</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Users size={20} /></div>
           <div>
             <div className="text-2xl font-bold">128</div>
             <div className="text-xs text-slate-500">Total Merchants</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
           <div>
             <div className="text-2xl font-bold">115</div>
             <div className="text-xs text-slate-500">Active Now</div>
           </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
           <div className="flex gap-2">
              <Button variant="primary" className="text-xs px-3 py-1">Merchant list</Button>
              <Button variant="ghost" className="text-xs px-3 py-1">Receipts</Button>
           </div>
           <div className="relative w-64">
             <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
             <input type="text" placeholder="Search merchant..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 w-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Merchant ID</th>
                <th className="px-4 py-3 text-center">Active delivered ways</th>
                <th className="px-4 py-3 text-center">Completed ways</th>
                <th className="px-4 py-3 text-center">To refund</th>
                <th className="px-4 py-3">Price profile</th>
                <th className="px-4 py-3">Facebook link</th>
                <th className="px-4 py-3">Viber link</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Testing delivery myanmar", phone: "09984394844", id: "M000052730", active: 15, completed: 50, refund: 0, profile: "Regular" },
                { name: "Elegance", phone: "09772165941", id: "M000052645", active: 4, completed: 12, refund: 2, profile: "Regular" },
                { name: "Nora Store", phone: "09978364462", id: "M000052597", active: 15, completed: 100, refund: 5, profile: "Regular" },
                { name: "OK Aluminium", phone: "09754844460", id: "M000049130", active: 8, completed: 40, refund: 0, profile: "Regular" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.phone}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{row.id}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full font-bold text-xs">{row.active}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{row.completed}</td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{row.refund}</td>
                  <td className="px-4 py-3"><Badge status={row.profile} /></td>
                  <td className="px-4 py-3 text-blue-600 text-xs">
                    <a href="#" className="flex items-center gap-1 hover:underline"><Facebook size={12} /> Link</a>
                  </td>
                  <td className="px-4 py-3 text-blue-600 text-xs">
                    <a href="#" className="flex items-center gap-1 hover:underline"><MessageCircle size={12} /> Link</a>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-400 hover:text-blue-600"><ArrowRightLeft size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
           <span>Showing 1-6 of 115</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Prev</button>
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
           </div>
        </div>
      </Card>
    </div>
  );
};

// 5. DELIVERYMEN VIEW
const DeliverymenView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Deliverymen</h2>
          <p className="text-sm text-slate-500">Manage delivery personnel and their assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" icon={PlusCircle}>Add Deliveryman</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><User size={20} /></div>
           <div>
             <div className="text-2xl font-bold">45</div>
             <div className="text-xs text-slate-500">Total Deliverymen</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
           <div>
             <div className="text-2xl font-bold">38</div>
             <div className="text-xs text-slate-500">Active Today</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><Truck size={20} /></div>
           <div>
             <div className="text-2xl font-bold">23</div>
             <div className="text-xs text-slate-500">On Delivery</div>
           </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Clock size={20} /></div>
           <div>
             <div className="text-2xl font-bold">7</div>
             <div className="text-xs text-slate-500">Day Off</div>
           </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
           <div className="flex gap-2">
              <Button variant="primary" className="text-xs px-3 py-1">Deliveryman list</Button>
              <Button variant="ghost" className="text-xs px-3 py-1">Performance</Button>
           </div>
           <div className="relative w-64">
             <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
             <input type="text" placeholder="Search deliveryman..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 w-4"><input type="checkbox" /></th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Active Ways</th>
                <th className="px-4 py-3 text-center">Completed Today</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3">Zone</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Kyaw Zin Khant", phone: "09123456789", status: "Active", active: 8, completed: 12, rate: "95%", zone: "Zone A", vehicle: "Motorcycle" },
                { name: "Moe Sat Zin Tun", phone: "09987654321", status: "Active", active: 6, completed: 15, rate: "92%", zone: "Zone B", vehicle: "Car" },
                { name: "Aung Myo Min", phone: "09456789123", status: "On way", active: 4, completed: 8, rate: "88%", zone: "Zone A", vehicle: "Motorcycle" },
                { name: "Pyae Phyo Kyaw", phone: "09321654987", status: "Day off", active: 0, completed: 0, rate: "90%", zone: "Zone C", vehicle: "Motorcycle" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600">{row.phone}</td>
                  <td className="px-4 py-3"><Badge status={row.status} /></td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full font-bold text-xs">{row.active}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{row.completed}</td>
                  <td className="px-4 py-3 text-center font-bold text-green-600">{row.rate}</td>
                  <td className="px-4 py-3 text-slate-600">{row.zone}</td>
                  <td className="px-4 py-3 text-slate-600">{row.vehicle}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-400 hover:text-blue-600"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <div className="p-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
           <span>Showing 1-4 of 45</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Prev</button>
             <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
           </div>
        </div>
      </Card>
    </div>
  );
};

// 6. RECEIPTS VIEW (PDF Page 15)
const ReceiptsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Receipts</h2>
          <p className="text-sm text-slate-500">Delivery receipts for your merchants are available here</p>
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Merchant / ID</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3 text-center">Total ways</th>
                <th className="px-4 py-3 text-right">Collect</th>
                <th className="px-4 py-3 text-right">Merchant prepaid</th>
                <th className="px-4 py-3 text-right">Highway transport cost</th>
                <th className="px-4 py-3 text-right">Delivery charges</th>
                <th className="px-4 py-3 text-right">Pickup charges</th>
                <th className="px-4 py-3 text-right">Cash advance</th>
                <th className="px-4 py-3 text-right">To refund</th>
                <th className="px-4 py-3">Pickup date</th>
                <th className="px-4 py-3">Pickup by</th>
                <th className="px-4 py-3">Created by</th>
                <th className="px-4 py-3">Pickup ID</th>
                <th className="px-4 py-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: "Baby Genius Os", id: "M000020445", phone: "09796239153", total: 7, collect: "-", prepaid: "-", highway: "-", del: "-", pick: "-", adv: "-", refund: "-", date: "2026-01-24", by: "Kyaw Zin Khant", created: "Britium Express", pid: "Processing" },
                { name: "Unique Diva", id: "M000016193", phone: "09444450771", total: 7, collect: "47,000", prepaid: "-", highway: "-", del: "6,000", pick: "-", adv: "-", refund: "41,000", date: "2026-01-24", by: "Kyaw Zin Khant", created: "Britium Express", pid: "Processing" },
                { name: "OK Aluminium", id: "M000049130", phone: "09754844460", total: 8, collect: "248,500", prepaid: "-", highway: "-", del: "23,500", pick: "-", adv: "-", refund: "225,000", date: "2026-01-24", by: "Moe Sat Zin Tun", created: "Britium Express", pid: "YGN2401455077" },
                { name: "Ohmarkhun", id: "M000011687", phone: "09795526809", total: 9, collect: "-", prepaid: "-", highway: "-", del: "-", pick: "-", adv: "-", refund: "-", date: "2026-01-24", by: "Pyae Phyo Kyaw", created: "Britium Express", pid: "Processing" },
                { name: "Nora Store", id: "M000052597", phone: "09978364462", total: 15, collect: "1,608,700", prepaid: "-", highway: "-", del: "63,500", pick: "-", adv: "305,000", refund: "1,545,200", date: "2026-01-24", by: "-", created: "Nora Store", pid: "Processing" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{row.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{row.id}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.phone}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{row.total}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.collect}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.prepaid}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.highway}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.del}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.pick}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{row.adv}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">{row.refund}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.date}</td>
                  <td className="px-4 py-3 text-blue-600 text-xs">{row.by}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.created}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.pid}</td>
                  <td className="px-4 py-3 text-center"><Receipt size={16} className="text-blue-600 mx-auto cursor-pointer" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// 7. ACCOUNTING VIEW (PDF Pages 30-36)
const AccountingView = () => {
  const [subTab, setSubTab] = useState('balance');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Accounting</h2>
          <p className="text-sm text-slate-500">Manage your ledger, vouchers, and chart of accounts</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-2 mb-4">
        {[
          { id: 'balance', label: 'Account balance' },
          { id: 'chart', label: 'Account name/title' },
          { id: 'journal_list', label: 'Journal voucher list' },
          { id: 'cash_list', label: 'Cash voucher list' },
          { id: 'ledger', label: 'General Ledger' }
        ].map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setSubTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${subTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {/* Filters for Accounting Views */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2025-01-01" />
            <span className="text-slate-400">-</span>
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2026-01-31" />
          </div>
          <select className="text-sm border rounded px-2 py-1"><option>Select the branch</option></select>
          <select className="text-sm border rounded px-2 py-1"><option>Select the zone</option></select>
          <div className="relative flex-1 min-w-[200px]">
             <Search className="absolute left-3 top-2 text-slate-400" size={16} />
             <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-1.5 text-sm border rounded-full" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {subTab === 'balance' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">No</th><th className="px-4 py-3">Account name</th><th className="px-4 py-3">Type</th><th className="px-4 py-3 text-right">Opening Balance</th><th className="px-4 py-3 text-right">Debit</th><th className="px-4 py-3 text-right">Credit</th><th className="px-4 py-3 text-right">Closing Balance</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 1, name: "Cash on hand/Cash balance", type: "Assets", open: "70,000", debit: "372,600", credit: "305,000", close: "67,600" },
                  { id: 2, name: "Inventory-All Merchants Parcels (System Generated)", type: "Assets", open: "-", debit: "1,931,600", credit: "431,100", close: "1,500,500" },
                  { id: 3, name: "Account Receivable-Deliveryman-cash on hand-COD", type: "Assets", open: "-", debit: "372,600", credit: "372,600", close: "0" },
                  { id: 4, name: "Kpay (testing)", type: "Assets", open: "63,500", debit: "-", credit: "230,100", close: "-230,100" },
                  { id: 5, name: "Account Payable-Merchant (System Generated)", type: "Liabilities", open: "63,500", debit: "593,600", credit: "1,873,100", close: "1,279,500" },
                  { id: 6, name: "Delivery Fee-Revenue (System Generated)", type: "Revenue", open: "-", debit: "58,500", credit: "-", close: "58,500" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{row.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                    <td className="px-4 py-3"><Badge status={row.type} /></td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.open}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.debit}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.credit}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-800">{row.close}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {subTab === 'chart' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">No</th><th className="px-4 py-3">Code No</th><th className="px-4 py-3">Account head</th><th className="px-4 py-3">Chart of account</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Remark</th><th className="px-4 py-3">Updated on</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { no: 1, code: "2-101", head: "Current Assets", chart: "Cash on hand/Cash balance", type: "Assets", remark: "", date: "2022-08-04" },
                  { no: 2, code: "2-102", head: "Other Current Assets", chart: "Inventory-All Merchants Parcels (System Generated)", type: "Assets", remark: "", date: "2024-04-15" },
                  { no: 3, code: "2-103", head: "Other Current Assets", chart: "Account Receivable-Deliveryman-cash on hand-COD", type: "Assets", remark: "", date: "2024-04-15" },
                  { no: 4, code: "2-104", head: "Other Current Assets", chart: "COD-Cashier received", type: "Assets", remark: "", date: "2023-07-20" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500">{row.no}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{row.code}</td>
                    <td className="px-4 py-3 text-slate-600">{row.head}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{row.chart}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3 text-slate-500">{row.remark}</td>
                    <td className="px-4 py-3 text-slate-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {subTab === 'journal_list' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">No.</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Account Title</th><th className="px-4 py-3 text-right">Debit</th><th className="px-4 py-3 text-right">Credit</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50/50"><td className="px-4 py-3">1</td><td className="px-4 py-3">Sat, 24 Jan, 2026</td><td className="px-4 py-3">233</td><td className="px-4 py-3">YGN345663YGN-COD & balance</td><td className="px-4 py-3 font-bold text-slate-700">Total</td><td className="px-4 py-3 text-right font-bold">45,500</td><td className="px-4 py-3 text-right font-bold">45,500</td></tr>
                <tr><td></td><td></td><td></td><td></td><td className="px-4 py-2 pl-8 text-slate-600">Inventory-All Merchants Parcels</td><td className="px-4 py-2 text-right text-slate-600">45,500</td><td className="px-4 py-2 text-right text-slate-600"></td></tr>
                <tr><td></td><td></td><td></td><td></td><td className="px-4 py-2 pl-8 text-slate-600">Account Payable-Merchant</td><td className="px-4 py-2 text-right text-slate-600"></td><td className="px-4 py-2 text-right text-slate-600">45,500</td></tr>
              </tbody>
            </table>
          )}

          {subTab === 'cash_list' && (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">No</th><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Description</th><th className="px-4 py-3 text-right">Received</th><th className="px-4 py-3 text-right">Payment</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { date: "Tue, 13 Jan, 2026", no: 1, ref: "180", desc: "COD received from Moe Sat Zin Tun", rec: "3,500", pay: "-" },
                  { date: "Tue, 13 Jan, 2026", no: 2, ref: "181", desc: "COD received from Pyae Phyo Kyaw", rec: "369,100", pay: "-" },
                  { date: "Thu, 08 Jan, 2026", no: 3, ref: "182", desc: "Invoicing-Invoice No MB0126000001...", rec: "-", pay: "185,100" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{row.date}</td>
                    <td className="px-4 py-3 text-slate-500">{row.no}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.ref}</td>
                    <td className="px-4 py-3 text-slate-800">{row.desc}</td>
                    <td className="px-4 py-3 text-right text-green-600">{row.rec}</td>
                    <td className="px-4 py-3 text-right text-red-600">{row.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {subTab === 'ledger' && (
            <div className="p-8 text-center text-slate-500">
              <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">General Ledger</h3>
              <p>Detailed account transactions and balances.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// 8. REPORTING VIEW (PDF Pages 37-40)
const ReportingView = () => {
  const [subTab, setSubTab] = useState('overview');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reporting Dashboard</h2>
          <p className="text-sm text-slate-500">Operational performance and financial reports overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={Download}>Export Data</Button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-2 mb-4">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'operational', label: 'Operational' },
          { id: 'financial', label: 'Financial' },
          { id: 'deliverymen_performance', label: 'Deliverymen' },
          { id: 'merchant_performance', label: 'Merchants' }
        ].map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setSubTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${subTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        {/* Date Range & Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2025-01-01" />
            <span className="text-slate-400">-</span>
            <input type="date" className="text-sm border rounded px-2 py-1" defaultValue="2026-01-31" />
          </div>
          <select className="text-sm border rounded px-2 py-1"><option>All Branches</option></select>
          <div className="flex-1"></div>
          <Button variant="ghost" icon={Filter} className="text-xs">More Filters</Button>
        </div>

        <div className="p-6">
          {subTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Order Volume</h3>
                  <BarChart3 size={20} className="text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">1,245</div>
                <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +12% from last month</div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Success Rate</h3>
                  <CheckCircle2 size={20} className="text-green-500" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">94.2%</div>
                <div className="text-xs text-slate-500">Delivery completion rate</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Revenue</h3>
                  <DollarSign size={20} className="text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">4.2M Ks</div>
                <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +5% from last month</div>
              </div>

              {/* Chart Placeholder 1 */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white border border-slate-200 rounded-lg p-4 h-64 flex flex-col justify-center items-center relative">
                <div className="absolute top-4 left-4 font-bold text-slate-700">Monthly Performance</div>
                <div className="w-full h-40 flex items-end justify-between gap-2 px-8">
                   {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                     <div key={i} className="w-full bg-blue-100 rounded-t relative group">
                        <div className="absolute bottom-0 w-full bg-blue-600 rounded-t" style={{height: `${h}%`}}></div>
                     </div>
                   ))}
                </div>
                <div className="w-full flex justify-between px-8 mt-2 text-xs text-slate-400">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                </div>
              </div>

              {/* Chart Placeholder 2 */}
              <div className="col-span-1 bg-white border border-slate-200 rounded-lg p-4 h-64 flex flex-col justify-center items-center relative">
                 <div className="absolute top-4 left-4 font-bold text-slate-700">Delivery Status</div>
                 <div className="w-32 h-32 rounded-full border-8 border-slate-100 border-t-green-500 border-r-blue-500 border-b-red-500 rotate-45"></div>
                 <div className="mt-4 text-xs space-y-1">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Successful (60%)</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> In Transit (30%)</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Failed (10%)</div>
                 </div>
              </div>
            </div>
          )}

          {subTab === 'operational' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-center">Total Orders</th>
                    <th className="px-4 py-3 text-center">Pickups</th>
                    <th className="px-4 py-3 text-center">Deliveries</th>
                    <th className="px-4 py-3 text-center">Returns</th>
                    <th className="px-4 py-3 text-center">Success %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { date: "24 Jan 2026", total: 156, pick: 45, del: 98, ret: 13, rate: "92%" },
                    { date: "23 Jan 2026", total: 142, pick: 40, del: 90, ret: 12, rate: "91%" },
                    { date: "22 Jan 2026", total: 160, pick: 50, del: 100, ret: 10, rate: "94%" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{row.date}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row.total}</td>
                      <td className="px-4 py-3 text-center text-blue-600">{row.pick}</td>
                      <td className="px-4 py-3 text-center text-green-600">{row.del}</td>
                      <td className="px-4 py-3 text-center text-red-600">{row.ret}</td>
                      <td className="px-4 py-3 text-center font-bold text-slate-700">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(subTab === 'financial' || subTab === 'deliverymen_performance' || subTab === 'merchant_performance') && (
            <div className="p-8 text-center text-slate-500">
              <PieChart size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">{subTab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Reports</h3>
              <p>Detailed analytics and performance metrics for {subTab.split('_')[0]}.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// --- FINANCIAL REPORTS VIEWS ---

// Cash Book Summary View
const CashBookSummaryView = () => {
  const [dateRange, setDateRange] = useState('this_month');
  const [accountType, setAccountType] = useState('all');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Cash Book Summary</h2>
        <div className="flex gap-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="this_year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Opening Balance</p>
              <p className="text-2xl font-bold text-slate-800">Ks 2,450,000</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Wallet className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Cash In</p>
              <p className="text-2xl font-bold text-green-600">Ks 1,850,000</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowDownLeft className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Cash Out</p>
              <p className="text-2xl font-bold text-red-600">Ks 980,000</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Closing Balance</p>
              <p className="text-2xl font-bold text-slate-800">Ks 3,320,000</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <DollarSign className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Transaction Details</h3>
          <div className="flex gap-2">
            <select 
              value={accountType} 
              onChange={(e) => setAccountType(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded text-sm bg-white"
            >
              <option value="all">All Accounts</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Reference</th>
                <th className="px-4 py-3 text-right">Cash In</th>
                <th className="px-4 py-3 text-right">Cash Out</th>
                <th className="px-4 py-3 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2026-01-25', desc: 'Delivery Payment - Nora Store', ref: 'DEL-001', cashIn: 45000, cashOut: 0, balance: 2495000 },
                { date: '2026-01-25', desc: 'Fuel Expense', ref: 'EXP-045', cashIn: 0, cashOut: 25000, balance: 2470000 },
                { date: '2026-01-24', desc: 'COD Collection', ref: 'COD-234', cashIn: 180000, cashOut: 0, balance: 2650000 },
                { date: '2026-01-24', desc: 'Office Rent', ref: 'EXP-044', cashIn: 0, cashOut: 150000, balance: 2500000 },
                { date: '2026-01-23', desc: 'Delivery Payment - ပီတိစာပေ', ref: 'DEL-002', cashIn: 12000, cashOut: 0, balance: 2512000 },
              ].map((txn, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{txn.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{txn.desc}</td>
                  <td className="px-4 py-3 text-slate-600">{txn.ref}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">
                    {txn.cashIn > 0 ? `Ks ${txn.cashIn.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600 font-medium">
                    {txn.cashOut > 0 ? `Ks ${txn.cashOut.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-800">
                    Ks {txn.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Journal Summary View
const JournalSummaryView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Journal Summary</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export Journal
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Journal Entry</th>
                <th className="px-4 py-3 text-left">Account</th>
                <th className="px-4 py-3 text-right">Debit</th>
                <th className="px-4 py-3 text-right">Credit</th>
                <th className="px-4 py-3 text-left">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2026-01-25', entry: 'JE-001', account: 'Cash Account', debit: 45000, credit: 0, ref: 'DEL-001' },
                { date: '2026-01-25', entry: 'JE-001', account: 'Delivery Revenue', debit: 0, credit: 45000, ref: 'DEL-001' },
                { date: '2026-01-25', entry: 'JE-002', account: 'Fuel Expense', debit: 25000, credit: 0, ref: 'EXP-045' },
                { date: '2026-01-25', entry: 'JE-002', account: 'Cash Account', debit: 0, credit: 25000, ref: 'EXP-045' },
              ].map((entry, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">{entry.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{entry.entry}</td>
                  <td className="px-4 py-3 text-slate-700">{entry.account}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">
                    {entry.debit > 0 ? `Ks ${entry.debit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right text-blue-600 font-medium">
                    {entry.credit > 0 ? `Ks ${entry.credit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{entry.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Trial Balance View
const TrialBalanceView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Trial Balance</h2>
        <div className="flex gap-3">
          <input type="date" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" defaultValue="2026-01-25" />
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Britium Express Delivery Service</h3>
          <p className="text-slate-600">Trial Balance as of January 25, 2026</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Account Name</th>
                <th className="px-4 py-3 text-right">Debit</th>
                <th className="px-4 py-3 text-right">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { account: 'Cash Account', debit: 3320000, credit: 0 },
                { account: 'Accounts Receivable', debit: 450000, credit: 0 },
                { account: 'Vehicle Assets', debit: 15000000, credit: 0 },
                { account: 'Office Equipment', debit: 2500000, credit: 0 },
                { account: 'Accounts Payable', debit: 0, credit: 280000 },
                { account: 'Capital Account', debit: 0, credit: 18000000 },
                { account: 'Delivery Revenue', debit: 0, credit: 2850000 },
                { account: 'Fuel Expense', debit: 180000, credit: 0 },
                { account: 'Salary Expense', debit: 680000, credit: 0 },
                { account: 'Office Rent', debit: 150000, credit: 0 },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.account}</td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {item.debit > 0 ? `Ks ${item.debit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">
                    {item.credit > 0 ? `Ks ${item.credit.toLocaleString()}` : '-'}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-300 font-bold bg-slate-50">
                <td className="px-4 py-3 text-slate-800">TOTAL</td>
                <td className="px-4 py-3 text-right text-slate-800">Ks 22,280,000</td>
                <td className="px-4 py-3 text-right text-slate-800">Ks 22,280,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Income Statement View
const IncomeStatementView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Income Statement</h2>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Britium Express Delivery Service</h3>
          <p className="text-slate-600">Income Statement for January 2026</p>
        </div>
        
        <div className="space-y-6">
          {/* Revenue Section */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">REVENUE</h4>
            <div className="space-y-2 ml-4">
              <div className="flex justify-between">
                <span className="text-slate-700">Delivery Service Revenue</span>
                <span className="font-medium">Ks 2,850,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">COD Commission</span>
                <span className="font-medium">Ks 185,000</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800 border-t border-slate-200 pt-2">
                <span>Total Revenue</span>
                <span>Ks 3,035,000</span>
              </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">EXPENSES</h4>
            <div className="space-y-2 ml-4">
              <div className="flex justify-between">
                <span className="text-slate-700">Fuel Expense</span>
                <span className="font-medium">Ks 180,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Salary Expense</span>
                <span className="font-medium">Ks 680,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Office Rent</span>
                <span className="font-medium">Ks 150,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Vehicle Maintenance</span>
                <span className="font-medium">Ks 85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Insurance</span>
                <span className="font-medium">Ks 45,000</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800 border-t border-slate-200 pt-2">
                <span>Total Expenses</span>
                <span>Ks 1,140,000</span>
              </div>
            </div>
          </div>

          {/* Net Income */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-800">Net Income</span>
              <span className="text-2xl font-bold text-green-600">Ks 1,895,000</span>
            </div>
            <p className="text-sm text-green-700 mt-1">Profit Margin: 62.4%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Balance Sheet View
const BalanceSheetView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Balance Sheet</h2>
        <div className="flex gap-3">
          <input type="date" className="px-3 py-2 border border-slate-300 rounded-lg text-sm" defaultValue="2026-01-25" />
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">ASSETS</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Current Assets</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Cash</span>
                  <span>Ks 3,320,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Accounts Receivable</span>
                  <span>Ks 450,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Current Assets</span>
                  <span>Ks 3,770,000</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 mb-2">Fixed Assets</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Vehicles</span>
                  <span>Ks 15,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Office Equipment</span>
                  <span>Ks 2,500,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Less: Depreciation</span>
                  <span>(Ks 1,200,000)</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Fixed Assets</span>
                  <span>Ks 16,300,000</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="flex justify-between font-bold text-blue-800">
                <span>TOTAL ASSETS</span>
                <span>Ks 20,070,000</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Liabilities & Equity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">LIABILITIES & EQUITY</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Current Liabilities</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Accounts Payable</span>
                  <span>Ks 280,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Accrued Expenses</span>
                  <span>Ks 95,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Current Liabilities</span>
                  <span>Ks 375,000</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 mb-2">Long-term Liabilities</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Vehicle Loan</span>
                  <span>Ks 1,695,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Long-term Liabilities</span>
                  <span>Ks 1,695,000</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-700 mb-2">Owner's Equity</h4>
              <div className="space-y-1 ml-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Capital</span>
                  <span>Ks 16,105,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Retained Earnings</span>
                  <span>Ks 1,895,000</span>
                </div>
                <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                  <span>Total Owner's Equity</span>
                  <span>Ks 18,000,000</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded border border-green-200">
              <div className="flex justify-between font-bold text-green-800">
                <span>TOTAL LIABILITIES & EQUITY</span>
                <span>Ks 20,070,000</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Profit & Loss View
const ProfitLossView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Profit & Loss Statement</h2>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
            <option>January 2026</option>
            <option>December 2025</option>
            <option>Q4 2025</option>
            <option>Year 2025</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">Ks 3,035,000</p>
            <p className="text-sm text-slate-600 mt-1">+12.5% from last month</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowUpRight className="text-red-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">Ks 1,140,000</p>
            <p className="text-sm text-slate-600 mt-1">+8.2% from last month</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <PieChart className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Net Profit</h3>
            <p className="text-3xl font-bold text-blue-600">Ks 1,895,000</p>
            <p className="text-sm text-slate-600 mt-1">Margin: 62.4%</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Monthly Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Month</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-right">Expenses</th>
                <th className="px-4 py-3 text-right">Net Profit</th>
                <th className="px-4 py-3 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { month: 'January 2026', revenue: 3035000, expenses: 1140000, profit: 1895000, margin: 62.4 },
                { month: 'December 2025', revenue: 2698000, expenses: 1050000, profit: 1648000, margin: 61.1 },
                { month: 'November 2025', revenue: 2456000, expenses: 980000, profit: 1476000, margin: 60.1 },
                { month: 'October 2025', revenue: 2234000, expenses: 920000, profit: 1314000, margin: 58.8 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.month}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">Ks {row.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-red-600 font-medium">Ks {row.expenses.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-blue-600 font-bold">Ks {row.profit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-700">{row.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- REPORTING VIEWS ---

// Ways Count Report View
const WaysCountReportView = () => {
  const [dateRange, setDateRange] = useState('this_month');
  const [status, setStatus] = useState('all');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Ways Count Report</h2>
        <div className="flex gap-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="this_year">This Year</option>
          </select>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Ways</p>
              <p className="text-2xl font-bold text-slate-800">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Successful</p>
              <p className="text-2xl font-bold text-green-600">1,089</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">98</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">60</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Daily Breakdown</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Successful</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '2026-01-25', total: 156, success: 142, pending: 8, failed: 6, rate: 91.0 },
                { date: '2026-01-24', total: 189, success: 175, pending: 10, failed: 4, rate: 92.6 },
                { date: '2026-01-23', total: 134, success: 120, pending: 12, failed: 2, rate: 89.6 },
                { date: '2026-01-22', total: 167, success: 154, pending: 9, failed: 4, rate: 92.2 },
                { date: '2026-01-21', total: 145, success: 132, pending: 8, failed: 5, rate: 91.0 },
              ].map((day, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{day.date}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{day.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{day.success}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{day.pending}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{day.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{day.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Active Ways by Town View
const ActiveWaysByTownView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Active Ways Count by Town</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Town/City</th>
                <th className="px-4 py-3 text-center">Active Ways</th>
                <th className="px-4 py-3 text-center">Completed Today</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { town: 'ရန်ကင်း (Yankin)', active: 45, completed: 38, pending: 7, rate: 84.4 },
                { town: 'ဒဂုံမြို့ (Dagon)', active: 32, completed: 29, pending: 3, rate: 90.6 },
                { town: 'လှိုင် (Hlaing)', active: 28, completed: 25, pending: 3, rate: 89.3 },
                { town: 'တာမွေ (Tamwe)', active: 24, completed: 22, pending: 2, rate: 91.7 },
                { town: 'ကမာရွတ် (Kamaryut)', active: 19, completed: 17, pending: 2, rate: 89.5 },
                { town: 'ဗဟန်း (Bahan)', active: 16, completed: 14, pending: 2, rate: 87.5 },
                { town: 'မရမ်းကုန်း (Mayangone)', active: 14, completed: 13, pending: 1, rate: 92.9 },
                { town: 'သင်္ဃန်းကျွန်း (Thingangyun)', active: 12, completed: 11, pending: 1, rate: 91.7 },
              ].map((town, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{town.town}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{town.active}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{town.completed}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{town.pending}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{town.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Ways by Deliverymen View
const WaysByDeliverymenView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Ways by Deliverymen</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Deliveryman</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Completed</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Kyaw Zin Oo', total: 89, completed: 82, pending: 5, failed: 2, rate: 92.1, status: 'Active' },
                { name: 'Moe Sat Naing', total: 76, completed: 71, pending: 3, failed: 2, rate: 93.4, status: 'Active' },
                { name: 'Thura Aung', total: 68, completed: 62, pending: 4, failed: 2, rate: 91.2, status: 'Active' },
                { name: 'Zaw Min Htut', total: 54, completed: 48, pending: 4, failed: 2, rate: 88.9, status: 'Active' },
                { name: 'Htet Paing Oo', total: 45, completed: 40, pending: 3, failed: 2, rate: 88.9, status: 'Active' },
                { name: 'Kaung Myat Thu', total: 38, completed: 34, pending: 2, failed: 2, rate: 89.5, status: 'Offline' },
                { name: 'Ye Min Oo', total: 32, completed: 29, pending: 2, failed: 1, rate: 90.6, status: 'Active' },
              ].map((rider, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{rider.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{rider.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{rider.completed}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{rider.pending}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{rider.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{rider.rate}%</td>
                  <td className="px-4 py-3 text-center">
                    <Badge status={rider.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Ways by Merchants View
const WaysByMerchantsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Ways by Merchants</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Completed</th>
                <th className="px-4 py-3 text-center">Pending</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3 text-right">Total Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Nora Store', total: 156, completed: 142, pending: 8, failed: 6, rate: 91.0, value: 2450000 },
                { name: 'ပီတိစာပေ', total: 89, completed: 82, pending: 5, failed: 2, rate: 92.1, value: 1680000 },
                { name: 'စံချိန်သစ် ကွန်ပျူတာ', total: 76, completed: 71, pending: 3, failed: 2, rate: 93.4, value: 3200000 },
                { name: 'Aqua Pa La Tar Aquarium', total: 45, completed: 40, pending: 3, failed: 2, rate: 88.9, value: 890000 },
                { name: 'Unique/Diva', total: 134, completed: 120, pending: 12, failed: 2, rate: 89.6, value: 4560000 },
                { name: 'Mee Lay', total: 67, completed: 62, pending: 3, failed: 2, rate: 92.5, value: 1230000 },
                { name: 'Golden Phoenix Restaurant', total: 54, completed: 48, pending: 4, failed: 2, rate: 88.9, value: 2100000 },
              ].map((merchant, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{merchant.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{merchant.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{merchant.completed}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{merchant.pending}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{merchant.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{merchant.rate}%</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">Ks {merchant.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Overdue Ways Count View
const OverdueWaysCountView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Overdue Ways Count</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Overdue</p>
              <p className="text-2xl font-bold text-red-600">87</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">1-3 Days</p>
              <p className="text-2xl font-bold text-orange-600">45</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">4-7 Days</p>
              <p className="text-2xl font-bold text-red-500">28</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">7+ Days</p>
              <p className="text-2xl font-bold text-red-700">14</p>
            </div>
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-700" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Way ID</th>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-left">Deliveryman</th>
                <th className="px-4 py-3 text-left">Created Date</th>
                <th className="px-4 py-3 text-center">Days Overdue</th>
                <th className="px-4 py-3 text-center">Priority</th>
                <th className="px-4 py-3 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'WAY-2456', merchant: 'Nora Store', deliveryman: 'Kyaw Zin Oo', date: '2026-01-15', days: 10, priority: 'High', value: 45000 },
                { id: 'WAY-2398', merchant: 'ပီတိစာပေ', deliveryman: 'Moe Sat Naing', date: '2026-01-18', days: 7, priority: 'High', value: 28000 },
                { id: 'WAY-2401', merchant: 'Unique/Diva', deliveryman: 'Thura Aung', date: '2026-01-19', days: 6, priority: 'Medium', value: 67000 },
                { id: 'WAY-2445', merchant: 'Mee Lay', deliveryman: 'Zaw Min Htut', date: '2026-01-20', days: 5, priority: 'Medium', value: 23000 },
                { id: 'WAY-2467', merchant: 'Golden Phoenix', deliveryman: 'Htet Paing Oo', date: '2026-01-22', days: 3, priority: 'Low', value: 89000 },
              ].map((way, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{way.id}</td>
                  <td className="px-4 py-3 text-slate-800">{way.merchant}</td>
                  <td className="px-4 py-3 text-slate-700">{way.deliveryman}</td>
                  <td className="px-4 py-3 text-slate-600">{way.date}</td>
                  <td className="px-4 py-3 text-center font-bold text-red-600">{way.days}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      way.priority === 'High' ? 'bg-red-100 text-red-700' :
                      way.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {way.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">Ks {way.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Overdue Ways by Deliveryman View
const OverdueWaysByDeliverymanView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Overdue Ways by Deliveryman</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Deliveryman</th>
                <th className="px-4 py-3 text-center">Total Overdue</th>
                <th className="px-4 py-3 text-center">1-3 Days</th>
                <th className="px-4 py-3 text-center">4-7 Days</th>
                <th className="px-4 py-3 text-center">7+ Days</th>
                <th className="px-4 py-3 text-center">Overdue Rate</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Kyaw Zin Oo', total: 15, days1_3: 8, days4_7: 5, days7plus: 2, rate: 16.9 },
                { name: 'Moe Sat Naing', total: 12, days1_3: 7, days4_7: 3, days7plus: 2, rate: 15.8 },
                { name: 'Thura Aung', total: 18, days1_3: 10, days4_7: 6, days7plus: 2, rate: 26.5 },
                { name: 'Zaw Min Htut', total: 9, days1_3: 5, days4_7: 3, days7plus: 1, rate: 16.7 },
                { name: 'Htet Paing Oo', total: 14, days1_3: 8, days4_7: 4, days7plus: 2, rate: 31.1 },
                { name: 'Kaung Myat Thu', total: 11, days1_3: 6, days4_7: 4, days7plus: 1, rate: 28.9 },
                { name: 'Ye Min Oo', total: 8, days1_3: 5, days4_7: 2, days7plus: 1, rate: 25.0 },
              ].map((rider, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{rider.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-red-600">{rider.total}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{rider.days1_3}</td>
                  <td className="px-4 py-3 text-center text-red-500 font-medium">{rider.days4_7}</td>
                  <td className="px-4 py-3 text-center text-red-700 font-bold">{rider.days7plus}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{rider.rate}%</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Overdue Ways by Merchant View
const OverdueWaysByMerchantView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Overdue Ways by Merchant</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Overdue</th>
                <th className="px-4 py-3 text-center">1-3 Days</th>
                <th className="px-4 py-3 text-center">4-7 Days</th>
                <th className="px-4 py-3 text-center">7+ Days</th>
                <th className="px-4 py-3 text-center">Overdue Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Nora Store', total: 156, overdue: 14, days1_3: 8, days4_7: 4, days7plus: 2, rate: 9.0 },
                { name: 'ပီတိစာပေ', total: 89, overdue: 8, days1_3: 5, days4_7: 2, days7plus: 1, rate: 9.0 },
                { name: 'စံချိန်သစ် ကွန်ပျူတာ', total: 76, overdue: 12, days1_3: 7, days4_7: 3, days7plus: 2, rate: 15.8 },
                { name: 'Aqua Pa La Tar Aquarium', total: 45, overdue: 6, days1_3: 3, days4_7: 2, days7plus: 1, rate: 13.3 },
                { name: 'Unique/Diva', total: 134, overdue: 18, days1_3: 10, days4_7: 6, days7plus: 2, rate: 13.4 },
                { name: 'Mee Lay', total: 67, overdue: 9, days1_3: 5, days4_7: 3, days7plus: 1, rate: 13.4 },
                { name: 'Golden Phoenix Restaurant', total: 54, overdue: 7, days1_3: 4, days4_7: 2, days7plus: 1, rate: 13.0 },
              ].map((merchant, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{merchant.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-700">{merchant.total}</td>
                  <td className="px-4 py-3 text-center font-bold text-red-600">{merchant.overdue}</td>
                  <td className="px-4 py-3 text-center text-orange-600 font-medium">{merchant.days1_3}</td>
                  <td className="px-4 py-3 text-center text-red-500 font-medium">{merchant.days4_7}</td>
                  <td className="px-4 py-3 text-center text-red-700 font-bold">{merchant.days7plus}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{merchant.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Total Ways by Town View
const TotalWaysByTownView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Total Ways by Town</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Town/City</th>
                <th className="px-4 py-3 text-center">Total Ways</th>
                <th className="px-4 py-3 text-center">Successful</th>
                <th className="px-4 py-3 text-center">Failed</th>
                <th className="px-4 py-3 text-center">Success Rate</th>
                <th className="px-4 py-3 text-right">Total Value</th>
                <th className="px-4 py-3 text-center">Avg per Way</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { town: 'ရန်ကင်း (Yankin)', total: 245, success: 220, failed: 25, rate: 89.8, value: 4850000, avg: 19796 },
                { town: 'ဒဂုံမြို့ (Dagon)', total: 189, success: 171, failed: 18, rate: 90.5, value: 3780000, avg: 20000 },
                { town: 'လှိုင် (Hlaing)', total: 167, success: 152, failed: 15, rate: 91.0, value: 3340000, avg: 20000 },
                { town: 'တာမွေ (Tamwe)', total: 145, success: 133, failed: 12, rate: 91.7, value: 2900000, avg: 20000 },
                { town: 'ကမာရွတ် (Kamaryut)', total: 134, success: 120, failed: 14, rate: 89.6, value: 2680000, avg: 20000 },
                { town: 'ဗဟန်း (Bahan)', total: 123, success: 108, failed: 15, rate: 87.8, value: 2460000, avg: 20000 },
                { town: 'မရမ်းကုန်း (Mayangone)', total: 98, success: 91, failed: 7, rate: 92.9, value: 1960000, avg: 20000 },
                { town: 'သင်္ဃန်းကျွန်း (Thingangyun)', total: 87, success: 80, failed: 7, rate: 92.0, value: 1740000, avg: 20000 },
              ].map((town, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{town.town}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{town.total}</td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">{town.success}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{town.failed}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-800">{town.rate}%</td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">Ks {town.value.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-600">Ks {town.avg.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Merchants Order Compare View
const MerchantsOrderCompareView = () => {
  const [compareType, setCompareType] = useState('monthly');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Merchants Order Compare</h2>
        <div className="flex gap-3">
          <select 
            value={compareType} 
            onChange={(e) => setCompareType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-center">Current Month</th>
                <th className="px-4 py-3 text-center">Last Month</th>
                <th className="px-4 py-3 text-center">Change</th>
                <th className="px-4 py-3 text-center">Growth %</th>
                <th className="px-4 py-3 text-right">Current Value</th>
                <th className="px-4 py-3 text-right">Last Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Nora Store', current: 156, last: 142, change: 14, growth: 9.9, currentValue: 3120000, lastValue: 2840000 },
                { name: 'ပီတိစာပေ', current: 89, last: 76, change: 13, growth: 17.1, currentValue: 1780000, lastValue: 1520000 },
                { name: 'စံချိန်သစ် ကွန်ပျူတာ', current: 76, last: 89, change: -13, growth: -14.6, currentValue: 1520000, lastValue: 1780000 },
                { name: 'Aqua Pa La Tar Aquarium', current: 45, last: 38, change: 7, growth: 18.4, currentValue: 900000, lastValue: 760000 },
                { name: 'Unique/Diva', current: 134, last: 156, change: -22, growth: -14.1, currentValue: 2680000, lastValue: 3120000 },
                { name: 'Mee Lay', current: 67, last: 54, change: 13, growth: 24.1, currentValue: 1340000, lastValue: 1080000 },
                { name: 'Golden Phoenix Restaurant', current: 54, last: 67, change: -13, growth: -19.4, currentValue: 1080000, lastValue: 1340000 },
              ].map((merchant, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{merchant.name}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-600">{merchant.current}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{merchant.last}</td>
                  <td className="px-4 py-3 text-center font-medium ${
                    merchant.change > 0 ? 'text-green-600' : merchant.change < 0 ? 'text-red-600' : 'text-slate-600'
                  }">
                    {merchant.change > 0 ? '+' : ''}{merchant.change}
                  </td>
                  <td className="px-4 py-3 text-center font-bold ${
                    merchant.growth > 0 ? 'text-green-600' : merchant.growth < 0 ? 'text-red-600' : 'text-slate-600'
                  }">
                    {merchant.growth > 0 ? '+' : ''}{merchant.growth}%
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-blue-600">Ks {merchant.currentValue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-slate-600">Ks {merchant.lastValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- OTHER VIEWS ---

// Broadcast Message View
const BroadcastMessageView = () => {
  const [messageType, setMessageType] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Broadcast Messages</h2>
        <button 
          onClick={() => setShowCompose(true)}
          className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"
        >
          <Megaphone size={16} /> New Broadcast
        </button>
      </div>

      {showCompose && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Compose Broadcast Message</h3>
            <button 
              onClick={() => setShowCompose(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                  <option>All Users</option>
                  <option>Merchants Only</option>
                  <option>Deliverymen Only</option>
                  <option>Customers Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" 
                placeholder="Enter message subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm h-32 resize-none" 
                placeholder="Type your broadcast message here..."
              />
            </div>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700">
                Send Broadcast
              </button>
              <button 
                onClick={() => setShowCompose(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-4 mb-6">
        <select 
          value={messageType} 
          onChange={(e) => setMessageType(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
        >
          <option value="all">All Messages</option>
          <option value="sent">Sent</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {[
            {
              id: 1,
              subject: 'System Maintenance Notice',
              message: 'Scheduled maintenance on Sunday 2AM-4AM. Service may be temporarily unavailable.',
              target: 'All Users',
              priority: 'High',
              sent: '2026-01-24 14:30',
              status: 'Sent',
              recipients: 1247
            },
            {
              id: 2,
              subject: 'New Delivery Zones Added',
              message: 'We have expanded our delivery coverage to include 5 new townships in Yangon.',
              target: 'Merchants',
              priority: 'Normal',
              sent: '2026-01-23 09:15',
              status: 'Sent',
              recipients: 456
            },
            {
              id: 3,
              subject: 'Performance Bonus Announcement',
              message: 'Top performing deliverymen for January will receive bonus payments.',
              target: 'Deliverymen',
              priority: 'Normal',
              sent: '2026-01-22 16:45',
              status: 'Sent',
              recipients: 89
            },
            {
              id: 4,
              subject: 'Holiday Schedule Update',
              message: 'Updated delivery schedule for upcoming public holidays.',
              target: 'All Users',
              priority: 'Normal',
              sent: 'Draft',
              status: 'Draft',
              recipients: 0
            },
          ].map((msg) => (
            <div key={msg.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-slate-800">{msg.subject}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      msg.priority === 'High' ? 'bg-red-100 text-red-700' :
                      msg.priority === 'Urgent' ? 'bg-red-200 text-red-800' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {msg.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      msg.status === 'Sent' ? 'bg-green-100 text-green-700' :
                      msg.status === 'Draft' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">{msg.message}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Target: {msg.target}</span>
                    <span>Recipients: {msg.recipients}</span>
                    <span>Sent: {msg.sent}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Teams View
const TeamsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Teams Management</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} /> Add Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Delivery Team A',
            leader: 'Kyaw Zin Oo',
            members: 12,
            zone: 'Yankin, Dagon',
            performance: 92.5,
            status: 'Active'
          },
          {
            name: 'Delivery Team B',
            leader: 'Moe Sat Naing',
            members: 10,
            zone: 'Hlaing, Tamwe',
            performance: 89.8,
            status: 'Active'
          },
          {
            name: 'Delivery Team C',
            leader: 'Thura Aung',
            members: 8,
            zone: 'Kamaryut, Bahan',
            performance: 87.2,
            status: 'Active'
          },
        ].map((team, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">{team.name}</h3>
              <Badge status={team.status} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Team Leader</p>
                  <p className="text-sm text-slate-600">{team.leader}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Members</p>
                  <p className="text-sm text-slate-600">{team.members} deliverymen</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Coverage Zone</p>
                  <p className="text-sm text-slate-600">{team.zone}</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Performance</span>
                  <span className="text-sm font-bold text-green-600">{team.performance}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${team.performance}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-50">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-[#0D47A1] text-white rounded hover:bg-blue-700">
                Manage
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// HR Management View
const HRManagementView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">HR Management</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
            <PlusCircle size={16} /> Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Employees</p>
              <p className="text-2xl font-bold text-slate-800">127</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Deliverymen</p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Bike className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Office Staff</p>
              <p className="text-2xl font-bold text-orange-600">28</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Building className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Management</p>
              <p className="text-2xl font-bold text-purple-600">10</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Briefcase className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Employee Directory</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg bg-white w-64"
              />
            </div>
            <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
              <option>All Departments</option>
              <option>Delivery</option>
              <option>Operations</option>
              <option>Management</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-left">Position</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Join Date</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Salary</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Kyaw Zin Oo', position: 'Senior Deliveryman', dept: 'Delivery', join: '2024-03-15', status: 'Active', salary: 450000 },
                { name: 'Moe Sat Naing', position: 'Team Leader', dept: 'Delivery', join: '2024-01-20', status: 'Active', salary: 550000 },
                { name: 'Thura Aung', position: 'Deliveryman', dept: 'Delivery', join: '2024-06-10', status: 'Active', salary: 400000 },
                { name: 'Ma Thandar Win', position: 'Operations Manager', dept: 'Operations', join: '2023-11-05', status: 'Active', salary: 800000 },
                { name: 'Ko Aung Myat', position: 'Customer Service', dept: 'Operations', join: '2024-02-28', status: 'Active', salary: 350000 },
                { name: 'Ma Ei Ei Mon', position: 'Accountant', dept: 'Finance', join: '2024-04-12', status: 'Active', salary: 500000 },
              ].map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-800">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{emp.position}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.dept}</td>
                  <td className="px-4 py-3 text-slate-600">{emp.join}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge status={emp.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">Ks {emp.salary.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Pricing & Package View
const PricingPackageView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Pricing & Package Management</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} /> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: 'Standard Delivery',
            description: 'Regular delivery within city limits',
            basePrice: 2000,
            perKm: 500,
            maxWeight: '5kg',
            deliveryTime: '1-2 days',
            popular: false
          },
          {
            name: 'Express Delivery',
            description: 'Fast delivery within 24 hours',
            basePrice: 3500,
            perKm: 750,
            maxWeight: '3kg',
            deliveryTime: 'Same day',
            popular: true
          },
          {
            name: 'Premium Delivery',
            description: 'Priority delivery with tracking',
            basePrice: 5000,
            perKm: 1000,
            maxWeight: '10kg',
            deliveryTime: '2-4 hours',
            popular: false
          },
        ].map((pkg, i) => (
          <Card key={i} className={`p-6 relative ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{pkg.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>
              <div className="text-3xl font-bold text-[#0D47A1] mb-1">
                Ks {pkg.basePrice.toLocaleString()}
              </div>
              <p className="text-sm text-slate-500">+ Ks {pkg.perKm}/km</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">Max weight: {pkg.maxWeight}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">Delivery: {pkg.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">SMS notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-sm text-slate-700">Basic insurance</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-50">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-[#0D47A1] text-white rounded hover:bg-blue-700">
                View Stats
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Zone-based Pricing</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Zone</th>
                <th className="px-4 py-3 text-center">Standard</th>
                <th className="px-4 py-3 text-center">Express</th>
                <th className="px-4 py-3 text-center">Premium</th>
                <th className="px-4 py-3 text-center">Distance (km)</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { zone: 'Zone A (City Center)', standard: 2000, express: 3500, premium: 5000, distance: '0-5' },
                { zone: 'Zone B (Suburbs)', standard: 2500, express: 4000, premium: 6000, distance: '5-15' },
                { zone: 'Zone C (Outskirts)', standard: 3500, express: 5500, premium: 8000, distance: '15-30' },
                { zone: 'Zone D (Extended)', standard: 5000, express: 7500, premium: 12000, distance: '30+' },
              ].map((zone, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{zone.zone}</td>
                  <td className="px-4 py-3 text-center text-slate-700">Ks {zone.standard.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-700">Ks {zone.express.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-700">Ks {zone.premium.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{zone.distance}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// Contacts View
const ContactsView = () => {
  const [contactType, setContactType] = useState('all');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Contacts Management</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} /> Add Contact
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select 
          value={contactType} 
          onChange={(e) => setContactType(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm"
        >
          <option value="all">All Contacts</option>
          <option value="merchants">Merchants</option>
          <option value="customers">Customers</option>
          <option value="suppliers">Suppliers</option>
          <option value="partners">Partners</option>
        </select>
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg bg-white w-full"
          />
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  name: 'Nora Store',
                  type: 'Merchant',
                  phone: '09-123-456-789',
                  email: 'nora@store.com',
                  address: 'Yankin Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'ပီတိစာပေ',
                  type: 'Merchant',
                  phone: '09-987-654-321',
                  email: 'piti@bookstore.mm',
                  address: 'Dagon Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'Ko Thant Zin',
                  type: 'Customer',
                  phone: '09-555-123-456',
                  email: 'thantzin@email.com',
                  address: 'Hlaing Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'Golden Phoenix Restaurant',
                  type: 'Merchant',
                  phone: '09-777-888-999',
                  email: 'info@goldenphoenix.mm',
                  address: 'Tamwe Township, Yangon',
                  status: 'Active'
                },
                {
                  name: 'Myanmar Logistics Co.',
                  type: 'Partner',
                  phone: '09-111-222-333',
                  email: 'contact@mmlogistics.com',
                  address: 'Industrial Zone, Yangon',
                  status: 'Active'
                },
              ].map((contact, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{contact.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.type === 'Merchant' ? 'bg-blue-100 text-blue-700' :
                      contact.type === 'Customer' ? 'bg-green-100 text-green-700' :
                      contact.type === 'Partner' ? 'bg-purple-100 text-purple-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {contact.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />
                      {contact.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" />
                      {contact.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{contact.address}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge status={contact.status} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium">Call</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- ADDITIONAL MISSING VIEWS FROM SCREENSHOT ---

// Broadcast Message Views
const BroadcastCreateMessageView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Create Message</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Send size={16} /> Send Message
        </button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message Title</label>
            <input type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Enter message title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message Content</label>
            <textarea className="w-full p-3 border border-slate-300 rounded-lg h-32" placeholder="Enter your message content"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg">
                <option>All Users</option>
                <option>Merchants</option>
                <option>Deliverymen</option>
                <option>Customers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
              <select className="w-full p-3 border border-slate-300 rounded-lg">
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const BroadcastMessageListView = () => {
  const messages = [
    { id: 1, title: "System Maintenance Notice", status: "Sent", date: "2024-01-20", recipients: 1250 },
    { id: 2, title: "New Feature Announcement", status: "Draft", date: "2024-01-19", recipients: 0 },
    { id: 3, title: "Holiday Schedule Update", status: "Scheduled", date: "2024-01-18", recipients: 850 }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Message List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Message
        </button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">Title</th>
                <th className="text-left p-4 font-medium text-slate-700">Status</th>
                <th className="text-left p-4 font-medium text-slate-700">Date</th>
                <th className="text-left p-4 font-medium text-slate-700">Recipients</th>
                <th className="text-left p-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">{message.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === 'Sent' ? 'bg-green-100 text-green-800' :
                      message.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{message.date}</td>
                  <td className="p-4 text-slate-600">{message.recipients}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Eye size={16} className="text-slate-500" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Edit size={16} className="text-slate-500" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const FacebookPagesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Facebook Pages</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Connect Page
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Facebook size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Facebook Pages Integration</h3>
        <p>Connect and manage your Facebook business pages for broadcast messaging.</p>
      </Card>
    </div>
  );
};

const ViberBotsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Viber Bots</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Bot
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <MessageCircle size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Viber Bots Management</h3>
        <p>Configure and manage Viber bots for automated customer communication.</p>
      </Card>
    </div>
  );
};

const MediaFilesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Media Files</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Upload size={16} /> Upload Media
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Image size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Media Library</h3>
        <p>Manage images, videos, and other media files for broadcast messages.</p>
      </Card>
    </div>
  );
};

// Teams Sub-Views
const BranchesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Branches</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Branch
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <MapPin size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Branch Management</h3>
        <p>Manage company branches and their operational details.</p>
      </Card>
    </div>
  );
};

const SyncUsersHRMView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Sync Users to HRM</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <RefreshCw size={16} /> Sync Now
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <RefreshCw size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">HRM Synchronization</h3>
        <p>Synchronize user data with Human Resource Management system.</p>
      </Card>
    </div>
  );
};

const ZoneAutoAssignView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Zone and Auto Assign</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Settings size={16} /> Configure
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Crosshair size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Zone Management</h3>
        <p>Configure delivery zones and automatic assignment rules.</p>
      </Card>
    </div>
  );
};

const StationNetworkView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Station Network</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Station
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Network size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Station Network</h3>
        <p>Manage delivery stations and network infrastructure.</p>
      </Card>
    </div>
  );
};

const StationCoveragesView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Station Coverages</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Map size={16} /> View Map
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Radio size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Coverage Areas</h3>
        <p>View and manage station coverage areas and service zones.</p>
      </Card>
    </div>
  );
};

const FinancialCenterView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Financial Center</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Download size={16} /> Export Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">$125,430</p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Monthly Profit</p>
              <p className="text-2xl font-bold text-slate-800">$45,230</p>
            </div>
            <TrendingUp className="text-blue-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Expenses</p>
              <p className="text-2xl font-bold text-slate-800">$32,150</p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-800">$8,420</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </Card>
      </div>
    </div>
  );
};

// Pricing and Package Sub-Views
const RegularPricingView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Regular Pricing</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Pricing
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Tags size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Regular Pricing Plans</h3>
        <p>Manage standard pricing structures for delivery services.</p>
      </Card>
    </div>
  );
};

const ExclusivePricingView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Exclusive Pricing</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Exclusive
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Crown size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Exclusive Pricing</h3>
        <p>Manage premium and exclusive pricing for special customers.</p>
      </Card>
    </div>
  );
};

const CashbackPromotionView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Cashback Promotion</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Create Promotion
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Gift size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Cashback Promotions</h3>
        <p>Create and manage cashback promotional campaigns.</p>
      </Card>
    </div>
  );
};

const CodePromotionView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Code Promotion</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Generate Code
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Ticket size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Promotional Codes</h3>
        <p>Generate and manage discount codes and promotional offers.</p>
      </Card>
    </div>
  );
};

// Contacts Sub-Views
const MerchantContactsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Merchant Contacts</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Contact
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Users size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Merchant Contacts</h3>
        <p>Manage contact information for all registered merchants.</p>
      </Card>
    </div>
  );
};

const RecipientContactsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Recipient Contacts</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Recipient
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Contact size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Recipient Contacts</h3>
        <p>Manage delivery recipient contact information and addresses.</p>
      </Card>
    </div>
  );
};

// Customer Support View
const CustomerSupportView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Customer Support</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Ticket
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Open Tickets</p>
              <p className="text-2xl font-bold text-slate-800">24</p>
            </div>
            <AlertCircle className="text-red-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Resolved</p>
              <p className="text-2xl font-bold text-slate-800">156</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </Card>
      </div>
    </div>
  );
};

// Settings Sub-Views
const BankListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Bank List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Bank
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Building2 size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Bank Management</h3>
        <p>Manage supported banks and financial institutions.</p>
      </Card>
    </div>
  );
};

const SystemSettingsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Settings size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">System Configuration</h3>
        <p>Configure global system settings and preferences.</p>
      </Card>
    </div>
  );
};

const HighwayGateListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Highway Gate List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Gate
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Navigation size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Highway Gates</h3>
        <p>Manage highway gates and toll points for route optimization.</p>
      </Card>
    </div>
  );
};

const PostOfficeListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Post Office List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Office
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Mail size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Post Offices</h3>
        <p>Manage post office locations and service points.</p>
      </Card>
    </div>
  );
};

const PlacesOfInterestView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Places of Interest</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Place
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <MapPin size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Points of Interest</h3>
        <p>Manage important locations and landmarks for delivery reference.</p>
      </Card>
    </div>
  );
};

const TownListView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Town List</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add Town
        </button>
      </div>
      <Card className="p-8 text-center text-slate-500">
        <Home size={48} className="mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium text-slate-700">Town Management</h3>
        <p>Manage towns and cities in the delivery service area.</p>
      </Card>
    </div>
  );
};

const TermsConditionsView = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Terms & Conditions</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Terms & Conditions</label>
            <textarea className="w-full p-3 border border-slate-300 rounded-lg h-64" placeholder="Enter terms and conditions content..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Privacy Policy</label>
            <textarea className="w-full p-3 border border-slate-300 rounded-lg h-64" placeholder="Enter privacy policy content..."></textarea>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Audit Logs View
const AuditLogsView = () => {
  const logs = [
    { id: 1, user: "Admin User", action: "Created new delivery", timestamp: "2024-01-20 14:30:25", ip: "192.168.1.100" },
    { id: 2, user: "Manager", action: "Updated merchant profile", timestamp: "2024-01-20 14:25:10", ip: "192.168.1.101" },
    { id: 3, user: "Admin User", action: "Deleted expired promotion", timestamp: "2024-01-20 14:20:45", ip: "192.168.1.100" }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Audit Logs</h2>
        <button className="px-4 py-2 bg-[#0D47A1] text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
          <Download size={16} /> Export Logs
        </button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">User</th>
                <th className="text-left p-4 font-medium text-slate-700">Action</th>
                <th className="text-left p-4 font-medium text-slate-700">Timestamp</th>
                <th className="text-left p-4 font-medium text-slate-700">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">{log.user}</td>
                  <td className="p-4 text-slate-600">{log.action}</td>
                  <td className="p-4 text-slate-600">{log.timestamp}</td>
                  <td className="p-4 text-slate-600">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// --- Sidebar Navigation ---

interface NavItemProps {
  icon: React.ComponentType<{ size?: number | string }>;
  label: string;
  active?: boolean;
  hasSub?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, active = false, hasSub = false, onClick }: NavItemProps) => (
  <div 
    onClick={onClick}
    className={`
    flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors select-none text-sm mx-2 rounded-md
    ${active ? 'bg-white/10 text-white font-medium' : 'text-slate-300 hover:bg-white/5 hover:text-white'}
  `}>
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span>{label}</span>
    </div>
    {hasSub && <ChevronRight size={14} className="opacity-70" />}
  </div>
);

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentView: string;
  setView: (view: string) => void;
}

const Sidebar = ({ isOpen, toggleSidebar, currentView, setView }: SidebarProps) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-[#0D47A1] text-white transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block flex flex-col shadow-2xl
    `}>
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-blue-800 bg-[#0a3a85]">
        <BritiumLogo />
        <div className="ml-3">
          <h1 className="font-bold text-lg leading-none tracking-wide">Britium Express</h1>
          <span className="text-xs text-blue-300 font-light">Delivery Service</span>
        </div>
        <button className="ml-auto lg:hidden" onClick={toggleSidebar}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 scrollbar-hide space-y-1">
        <NavItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={currentView === 'dashboard'} 
          onClick={() => setView('dashboard')} 
        />
        <NavItem 
          icon={PlusCircle} 
          label="Create Delivery" 
          active={currentView === 'create_delivery'} 
          onClick={() => setView('create_delivery')} 
        />
        
        <div className="px-6 py-2 text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-4">Operations</div>
        <NavItem 
          icon={Truck} 
          label="Way management" 
          active={currentView === 'way_management'} 
          onClick={() => setView('way_management')} 
          hasSub 
        />

        <NavItem 
          icon={Users} 
          label="Merchants" 
          active={currentView === 'merchants'} 
          onClick={() => setView('merchants')}
          hasSub 
        />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('merchants')}>Merchant list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('receipts')}>Receipts</div>
        </div>

        <NavItem 
          icon={User} 
          label="Deliverymen" 
          active={currentView === 'deliverymen'} 
          onClick={() => setView('deliverymen')}
          hasSub 
        />

        <NavItem icon={FileText} label="Accounting" active={currentView === 'accounting'} onClick={() => setView('accounting')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('cash_book_summary')}>Cash book summary</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('journal_summary')}>Journal summary</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('trial_balance')}>Trial balance</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('income_statement')}>Income statement</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('balance_sheet')}>Balance sheet</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('profit_loss')}>Profit And Loss</div>
        </div>
        
        <NavItem icon={BarChart3} label="Reporting" active={currentView === 'reporting'} onClick={() => setView('reporting')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('ways_count_report')}>Ways count report</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('active_ways_by_town')}>Active ways count by town</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('ways_by_deliverymen')}>Ways by deliverymen</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('ways_by_merchants')}>Ways by merchants</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('overdue_ways_count')}>Overdue ways count</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('overdue_ways_by_deliveryman')}>Overdue ways by deliveryman</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('overdue_ways_by_merchant')}>Overdue ways by merchant</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('total_ways_by_town')}>Total ways by town</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('merchants_order_compare')}>Merchants order compare</div>
        </div>
        
        <div className="flex items-center justify-between px-6 py-2">
          <NavItem icon={Megaphone} label="Broadcast message" active={currentView === 'broadcast_message'} onClick={() => setView('broadcast_message')} hasSub />
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">New</span>
        </div>
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('broadcast_create_message')}>Create message</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('broadcast_message_list')}>Message list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('facebook_pages')}>Facebook pages</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('viber_bots')}>Viber bots</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('media_files')}>Media files</div>
        </div>
        
        <NavItem icon={Briefcase} label="Teams" active={currentView === 'teams'} onClick={() => setView('teams')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('branches')}>Branches</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('sync_users_hrm')}>Sync users to HRM</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('zone_auto_assign')}>Zone and auto assign</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('station_network')}>Station network</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('station_coverages')}>Station coverages</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('financial_center')}>Financial Center</div>
        </div>
        
        <NavItem icon={HeartHandshake} label="HR Management" active={currentView === 'hr_management'} onClick={() => setView('hr_management')} />
        
        <NavItem icon={Tags} label="Pricing and package" active={currentView === 'pricing_package'} onClick={() => setView('pricing_package')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('regular_pricing')}>Regular pricing</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('exclusive_pricing')}>Exclusive pricing</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('cashback_promotion')}>Cashback promotion</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('code_promotion')}>Code promotion</div>
        </div>
        
        <NavItem icon={Contact} label="Contacts" active={currentView === 'contacts'} onClick={() => setView('contacts')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('merchant_contacts')}>Merchant contacts</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('recipient_contacts')}>Recipient contacts</div>
        </div>
        
        <NavItem icon={Headphones} label="Customer support" active={currentView === 'customer_support'} onClick={() => setView('customer_support')} />
        
        <NavItem icon={Settings} label="Settings" active={currentView === 'settings'} onClick={() => setView('settings')} hasSub />
        <div className="pl-12 space-y-1">
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('bank_list')}>Bank list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('system_settings')}>System settings</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('highway_gate_list')}>Highway gate list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('post_office_list')}>Post office list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('places_of_interest')}>Places of interest</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('town_list')}>Town list</div>
            <div className="text-sm text-blue-200 hover:text-white py-1 cursor-pointer transition-colors" onClick={() => setView('terms_conditions')}>Edit Terms & Conditions</div>
        </div>

        <NavItem icon={FileCheck} label="Audit logs" active={currentView === 'audit_logs'} onClick={() => setView('audit_logs')} />
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-blue-800 bg-[#0a3a85]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white text-[#0D47A1] flex items-center justify-center text-sm font-bold shadow-sm">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">Admin User</p>
            <p className="text-xs text-blue-300 truncate">admin@britium.com</p>
          </div>
          <Settings size={18} className="text-blue-300 cursor-pointer hover:text-white" />
        </div>
      </div>
    </aside>
  );
};

// --- Main App Controller ---

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); 

  const renderContent = () => {
    switch (currentView) {
      case 'create_delivery':
        return <CreateDeliveryView />;
      case 'way_management':
        return <WayManagementView />;
      case 'merchants':
        return <MerchantsView />;
      case 'deliverymen':
        return <DeliverymenView />;
      case 'receipts':
        return <ReceiptsView />;
      case 'accounting':
        return <AccountingView />;
      case 'reporting':
        return <ReportingView />;
      
      // Financial Reports
      case 'cash_book_summary':
        return <CashBookSummaryView />;
      case 'journal_summary':
        return <JournalSummaryView />;
      case 'trial_balance':
        return <TrialBalanceView />;
      case 'income_statement':
        return <IncomeStatementView />;
      case 'balance_sheet':
        return <BalanceSheetView />;
      case 'profit_loss':
        return <ProfitLossView />;
      
      // Reporting Views
      case 'ways_count_report':
        return <WaysCountReportView />;
      case 'active_ways_by_town':
        return <ActiveWaysByTownView />;
      case 'ways_by_deliverymen':
        return <WaysByDeliverymenView />;
      case 'ways_by_merchants':
        return <WaysByMerchantsView />;
      case 'overdue_ways_count':
        return <OverdueWaysCountView />;
      case 'overdue_ways_by_deliveryman':
        return <OverdueWaysByDeliverymanView />;
      case 'overdue_ways_by_merchant':
        return <OverdueWaysByMerchantView />;
      case 'total_ways_by_town':
        return <TotalWaysByTownView />;
      case 'merchants_order_compare':
        return <MerchantsOrderCompareView />;
      
      // Broadcast Message Views
      case 'broadcast_message':
        return <BroadcastMessageView />;
      case 'broadcast_create_message':
        return <BroadcastCreateMessageView />;
      case 'broadcast_message_list':
        return <BroadcastMessageListView />;
      case 'facebook_pages':
        return <FacebookPagesView />;
      case 'viber_bots':
        return <ViberBotsView />;
      case 'media_files':
        return <MediaFilesView />;
      
      // Teams Views
      case 'teams':
        return <TeamsView />;
      case 'branches':
        return <BranchesView />;
      case 'sync_users_hrm':
        return <SyncUsersHRMView />;
      case 'zone_auto_assign':
        return <ZoneAutoAssignView />;
      case 'station_network':
        return <StationNetworkView />;
      case 'station_coverages':
        return <StationCoveragesView />;
      case 'financial_center':
        return <FinancialCenterView />;
      
      // HR Management
      case 'hr_management':
        return <HRManagementView />;
      
      // Pricing Views
      case 'pricing_package':
        return <PricingPackageView />;
      case 'regular_pricing':
        return <RegularPricingView />;
      case 'exclusive_pricing':
        return <ExclusivePricingView />;
      case 'cashback_promotion':
        return <CashbackPromotionView />;
      case 'code_promotion':
        return <CodePromotionView />;
      
      // Contacts Views
      case 'contacts':
        return <ContactsView />;
      case 'merchant_contacts':
        return <MerchantContactsView />;
      case 'recipient_contacts':
        return <RecipientContactsView />;
      
      // Customer Support
      case 'customer_support':
        return <CustomerSupportView />;
      
      // Settings Views
      case 'settings':
        return <SystemSettingsView />;
      case 'bank_list':
        return <BankListView />;
      case 'system_settings':
        return <SystemSettingsView />;
      case 'highway_gate_list':
        return <HighwayGateListView />;
      case 'post_office_list':
        return <PostOfficeListView />;
      case 'places_of_interest':
        return <PlacesOfInterestView />;
      case 'town_list':
        return <TownListView />;
      case 'terms_conditions':
        return <TermsConditionsView />;
      
      // Audit Logs
      case 'audit_logs':
        return <AuditLogsView />;
      
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F6F8] font-sans overflow-hidden text-slate-800">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        currentView={currentView}
        setView={(view) => {
          setCurrentView(view);
          setSidebarOpen(false);
        }}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-slate-100 rounded text-slate-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              {/* Breadcrumb Mockup */}
              <div className="flex items-center text-sm text-slate-500 gap-2">
                <span>Application</span>
                <ChevronRight size={14} />
                <span className="font-semibold text-slate-800 capitalize">{currentView.replace(/_/g, ' ')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Global Search */}
             <div className="hidden md:block relative">
                <Search size={16} className="absolute left-3 top-2 text-slate-400" />
                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-blue-100 w-64 transition-all" />
             </div>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-50 p-1 rounded">
                <div className="w-6 h-4 bg-slate-200 rounded-sm overflow-hidden relative">
                   <div className="absolute inset-0 flex flex-col">
                     <div className="h-1/3 bg-[#00247D]"></div>
                     <div className="h-1/3 bg-white flex items-center justify-center relative">
                        <div className="h-full w-1 bg-[#CF142B] absolute"></div>
                        <div className="w-full h-1 bg-[#CF142B] absolute"></div>
                     </div>
                     <div className="h-1/3 bg-[#00247D]"></div>
                   </div>
                </div>
                <span className="text-sm font-medium text-slate-600 hidden sm:block">EN</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
           {renderContent()}
        </div>
      </main>
    </div>
  );         
}
