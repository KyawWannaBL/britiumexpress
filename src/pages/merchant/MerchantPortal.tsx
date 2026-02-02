import React, { useState } from 'react';
import { 
import { useI18n } from "@/i18n/I18nProvider";
  LayoutDashboard, Package, Upload, FileText, Warehouse, 
  BarChart3, CreditCard, Code, Bell, Truck, TrendingUp, 
  MapPin, RefreshCw, Eye, Download, Filter, UploadCloud, 
  FileSpreadsheet, CheckCircle, Clock, XCircle, AlertTriangle, 
  DollarSign, Edit, Search, Plus, ArrowUpRight, Copy, 
  Activity, Zap, BookOpen, Play, Mail, Smartphone, MessageCircle,
  ChevronDown, LogOut, User, Settings, HelpCircle, Wallet, Calendar
} from 'lucide-react';

const MerchantPortal = () => {
  const { t } = useI18n();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- MOCK DATA FOR CHARTS & TABLES ---
  const recentOrders = [
    { id: '#BE001247', customer: 'John Doe', loc: 'Mumbai', status: 'Delivered', amount: '₹1,250', statusColor: 'bg-green-100 text-green-700' },
    { id: '#BE001246', customer: 'Sarah Smith', loc: 'Delhi', status: 'In Transit', amount: '₹890', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: '#BE001245', customer: 'Mike Johnson', loc: 'Bangalore', status: 'Processing', amount: '₹2,100', statusColor: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* --- TOP NAVIGATION --- */}
      <nav className="bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight">{t("Britium Express")}</h1>
                <p className="text-xs text-blue-100 opacity-80">{t("Business Portal")}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-blue-700 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2.5 h-2.5 border-2 border-blue-800"></span>
              </button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-blue-700 cursor-pointer">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                  M
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{t("Merchant Store")}</p>
                  <p className="text-xs text-blue-200">{t("Premium Account")}</p>
                </div>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8 gap-6">
        {/* --- SIDEBAR NAVIGATION --- */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-4 space-y-1">
              <NavButton active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} icon={<LayoutDashboard size={20}/>} label={t("Dashboard")} />
              <NavButton active={activeSection === 'orders'} onClick={() => setActiveSection('orders')} icon={<Package size={20}/>} label={t("Order Management")} />
              <NavButton active={activeSection === 'bulk'} onClick={() => setActiveSection('bulk')} icon={<Upload size={20}/>} label={t("Bulk Upload")} />
              <NavButton active={activeSection === 'invoices'} onClick={() => setActiveSection('invoices')} icon={<FileText size={20}/>} label={t("Invoices & Billing")} />
              <NavButton active={activeSection === 'inventory'} onClick={() => setActiveSection('inventory')} icon={<Warehouse size={20}/>} label={t("Inventory Tracking")} />
              <NavButton active={activeSection === 'analytics'} onClick={() => setActiveSection('analytics')} icon={<BarChart3 size={20}/>} label={t("Analytics & Reports")} />
              <NavButton active={activeSection === 'payments'} onClick={() => setActiveSection('payments')} icon={<CreditCard size={20}/>} label={t("Payment Center")} />
              <NavButton active={activeSection === 'api'} onClick={() => setActiveSection('api')} icon={<Code size={20}/>} label={t("API Integration")} />
              <NavButton active={activeSection === 'notifications'} onClick={() => setActiveSection('notifications')} icon={<Bell size={20}/>} label={t("Notifications")} />
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 pb-12">
          
          {/* 1. DASHBOARD SECTION */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{t("Business Dashboard")}</h2>
                <p className="text-gray-500">{t("Welcome back! Here's your business overview for today.")}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title={t("Total Orders")} value="1,247" trend="+12.5%" trendUp={true} icon={<Package className="text-blue-600" />} color="blue" />
                <MetricCard title={t("Revenue")} value="₹2,45,680" trend="+8.2%" trendUp={true} icon={<TrendingUp className="text-green-600" />} color="green" />
                <MetricCard title={t("Delivery Rate")} value="94.2%" trend="+2.1%" trendUp={true} icon={<Truck className="text-orange-600" />} color="orange" />
                <MetricCard title={t("Active Shipments")} value="156" trend="-3.1%" trendUp={false} icon={<MapPin className="text-purple-600" />} color="purple" />
              </div>

              {/* Charts Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-gray-800">{t("Order Trends")}</h3>
                    <select className="text-sm border rounded-md p-1"><option>{t("Last 7 days")}</option></select>
                  </div>
                  {/* CSS-only Chart Simulation */}
                  <div className="h-48 flex items-end justify-between space-x-2 px-2">
                    {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group">
                         <div className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>{t("Mon")}</span><span>{t("Tue")}</span><span>{t("Wed")}</span><span>{t("Thu")}</span><span>{t("Fri")}</span><span>{t("Sat")}</span><span>{t("Sun")}</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-gray-800">{t("Delivery Status")}</h3>
                    <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:rotate-180 transition-transform" />
                  </div>
                  <div className="flex items-center justify-center h-48 space-x-8">
                     {/* Simple Donut Chart Representation */}
                     <div className="relative w-32 h-32 rounded-full border-[12px] border-green-500 border-r-blue-600 border-b-orange-400 border-l-green-500">
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-gray-700">{t("94%")}</div>
                     </div>
                     <div className="space-y-2 text-sm">
                       <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>{t("Delivered (65%)")}</div>
                       <div className="flex items-center"><div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>{t("Transit (20%)")}</div>
                       <div className="flex items-center"><div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>{t("Processing (15%)")}</div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{t("Recent Orders")}</h3>
                  <button onClick={() => setActiveSection('orders')} className="text-blue-600 text-sm font-medium hover:underline">{t("View All")}</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-6 py-3 font-medium">{t("Order ID")}</th>
                        <th className="px-6 py-3 font-medium">{t("Customer")}</th>
                        <th className="px-6 py-3 font-medium">{t("Destination")}</th>
                        <th className="px-6 py-3 font-medium">{t("Status")}</th>
                        <th className="px-6 py-3 font-medium">{t("Amount")}</th>
                        <th className="px-6 py-3 font-medium">{t("Actions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentOrders.map((order, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.loc}</td>
                          <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>{order.status}</span></td>
                          <td className="px-6 py-4 font-medium">{order.amount}</td>
                          <td className="px-6 py-4">
                            <button className="p-1 hover:bg-gray-200 rounded"><Eye size={16} className="text-gray-500" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. ORDERS SECTION (Simplified) */}
          {activeSection === 'orders' && (
             <div className="space-y-6">
               <div className="flex justify-between items-center">
                 <div>
                    <h2 className="text-2xl font-bold text-gray-800">{t("Order Management")}</h2>
                    <p className="text-gray-500">{t("Manage all your orders and shipments")}</p>
                 </div>
                 <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <Plus size={18} className="mr-2" /> Create New Order
                 </button>
               </div>
               
               {/* Filters */}
               <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select className="border p-2 rounded-lg text-sm bg-gray-50"><option>{t("All Status")}</option><option>{t("Delivered")}</option></select>
                  <input type="date" className="border p-2 rounded-lg text-sm bg-gray-50" />
                  <input type="text" placeholder={t("Search customer...")} className="border p-2 rounded-lg text-sm bg-gray-50" />
                  <button className="bg-gray-800 text-white rounded-lg py-2 text-sm font-medium">{t("Search")}</button>
               </div>

               {/* Expanded Table */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-600">
                     <tr>
                       <th className="px-6 py-3"><input type="checkbox" /></th>
                       <th className="px-6 py-3">{t("Order Details")}</th>
                       <th className="px-6 py-3">{t("Customer")}</th>
                       <th className="px-6 py-3">{t("Shipping")}</th>
                       <th className="px-6 py-3">{t("Status")}</th>
                       <th className="px-6 py-3">{t("Actions")}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {[1,2,3,4,5].map((i) => (
                       <tr key={i} className="hover:bg-gray-50">
                         <td className="px-6 py-4"><input type="checkbox" /></td>
                         <td className="px-6 py-4">
                           <div className="font-medium text-blue-600">#BE00124{i}</div>
                           <div className="text-xs text-gray-500">{t("Jan 27, 2026")}</div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="font-medium">Customer {i}</div>
                            <div className="text-xs text-gray-500">{t("+95 9 123 456")}</div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="text-sm">{t("Yangon → Mandalay")}</div>
                            <div className="text-xs text-gray-500">{t("Express")}</div>
                         </td>
                         <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">{t("Delivered")}</span></td>
                         <td className="px-6 py-4 flex gap-2">
                            <button className="text-gray-400 hover:text-blue-600"><Eye size={16}/></button>
                            <button className="text-gray-400 hover:text-blue-600"><MapPin size={16}/></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {/* 3. UPLOAD & OTHER SECTIONS (Placeholder Visuals) */}
          {activeSection === 'bulk' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                   <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-10 hover:bg-blue-100 transition-colors cursor-pointer">
                      <UploadCloud className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <p className="font-medium text-gray-700">{t("Drop your CSV/Excel files here")}</p>
                      <p className="text-sm text-gray-500 mb-4">{t("or click to browse")}</p>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">{t("Browse Files")}</button>
                   </div>
                   <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center"><FileSpreadsheet size={16} className="mr-2 text-green-600" />{t("CSV Format")}</span>
                      <span className="flex items-center"><FileSpreadsheet size={16} className="mr-2 text-blue-600" />{t("Excel Format")}</span>
                   </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="font-semibold text-gray-800 mb-4">{t("Upload History")}</h3>
                   <div className="space-y-4">
                      <UploadItem name="orders_batch_001.csv" size="125 orders" status="success" />
                      <UploadItem name="orders_batch_002.xlsx" size="89 orders" status="processing" />
                      <UploadItem name="orders_batch_003.csv" size="Failed" status="failed" />
                   </div>
                </div>
             </div>
          )}

          {/* 4. API & PAYMENTS (Simple representations) */}
          {activeSection === 'payments' && (
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <MetricCard title={t("Account Balance")} value="₹45,280" trend="Available" trendUp={true} icon={<Wallet className="text-green-500"/>} color="green" />
                   <MetricCard title={t("Pending Payments")} value="₹12,450" trend="Processing" trendUp={false} icon={<Clock className="text-yellow-500"/>} color="yellow" />
                   <MetricCard title={t("Total Transactions")} value="₹2,45,680" trend="This Month" trendUp={true} icon={<TrendingUp className="text-blue-500"/>} color="blue" />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                   <h3 className="font-semibold mb-4">{t("Payment Methods")}</h3>
                   <div className="flex items-center justify-between p-4 border rounded-lg mb-3">
                      <div className="flex items-center space-x-3">
                         <CreditCard className="text-blue-600" />
                         <div>
                            <p className="font-medium">{t("•••• •••• •••• 4532")}</p>
                            <p className="text-xs text-gray-500">{t("Expires 12/28")}</p>
                         </div>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{t("Primary")}</span>
                   </div>
                   <button className="w-full border border-dashed border-gray-300 py-3 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center">
                      <Plus size={16} className="mr-2" /> Add New Method
                   </button>
                </div>
             </div>
          )}

          {activeSection === 'api' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="font-semibold mb-4">{t("API Keys")}</h3>
                   <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-4">
                      <div>
                         <p className="font-medium text-sm">{t("Production Key")}</p>
                         <p className="font-mono text-xs text-gray-500">{t("be_live_sk_78sfd987sfd...")}</p>
                      </div>
                      <Copy size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
                   </div>
                   <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">{t("Generate New Key")}</button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="font-semibold mb-4">{t("Quick Start")}</h3>
                   <div className="bg-[#1e293b] text-gray-300 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                      <p className="text-purple-400">{t("curl")}</p>
                      <p className="pl-4">{t("-X POST https://api.britium.com/v1/orders \")}</p>
                      <p className="pl-4">{t("-H \"Authorization: Bearer KEY\" \")}</p>
                      <p className="pl-4">-d '{"{"} "customer": "John" {"}"}'</p>
                   </div>
                </div>
             </div>
          )}

        </main>
      </div>

      {/* --- CREATE ORDER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">{t("Create New Order")}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle size={24} /></button>
             </div>
             <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                   <InputGroup label={t("Customer Name")} placeholder={t("John Doe")} />
                   <InputGroup label={t("Phone Number")} placeholder={t("+95 9...")} />
                </div>
                <InputGroup label={t("Pickup Address")} placeholder={t("Enter full address")} />
                <InputGroup label={t("Delivery Address")} placeholder={t("Enter full address")} />
                <div className="grid grid-cols-3 gap-4">
                   <InputGroup label={t("Weight (kg)")} placeholder={t("1.0")} type="number" />
                   <InputGroup label={t("Value (MMK)")} placeholder={t("10000")} type="number" />
                   <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">{t("Type")}</label>
                      <select className="w-full border rounded-lg p-2 text-sm"><option>{t("Standard")}</option><option>{t("Express")}</option></select>
                   </div>
                </div>
             </div>
             <div className="p-6 bg-gray-50 flex justify-end space-x-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg">{t("Cancel")}</button>
                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">{t("Create Order")}</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- REUSABLE SUB-COMPONENTS ---
const NavButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      active ? 'bg-blue-50 text-blue-700 font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const MetricCard = ({ title, value, trend, trendUp, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-full bg-${color}-50`}>
         {icon}
      </div>
    </div>
    <div className="flex items-center text-sm">
      <span className={`font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>{trend}</span>
      <span className="text-gray-400 ml-2">{t("vs last month")}</span>
    </div>
  </div>
);

const UploadItem = ({ name, size, status }: any) => {
  const icon = status === 'success' ? <CheckCircle className="text-green-600" />{t(": status === 'failed' ?")}<XCircle className="text-red-500" />{t(":")}<Clock className="text-yellow-600" />;
  const bg = status === 'success' ? 'bg-green-50 border-green-200' : status === 'failed' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200';
  
  return (
    <div className={`flex items-center justify-between p-4 border rounded-lg ${bg}`}>
       <div className="flex items-center space-x-3">
          {icon}
          <div>
             <p className="font-medium text-sm text-gray-800">{name}</p>
             <p className="text-xs text-gray-500">{size}</p>
          </div>
       </div>
       <button className="text-gray-400 hover:text-gray-700"><Download size={16}/></button>
    </div>
  )
}

const InputGroup = ({ label, placeholder, type = "text" }: any) => (
  <div className="space-y-1">
     <label className="text-sm font-medium text-gray-700">{label}</label>
     <input type={type} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder={placeholder} />
  </div>
)

export default MerchantPortal;