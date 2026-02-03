// src/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Database, Activity, Server, 
  ShieldAlert, Settings, LogOut, Search, Bell, Menu, X,
  CheckCircle, AlertTriangle, Cpu
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler 
} from 'chart.js';

// Import Services
import { UserManagementService } from './services/userManagement';
import { UserRole, UserProfile } from './types/user';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseconfig';

// Register ChartJS components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'system'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- LOGIC: User Management ---
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [loading, setLoading] = useState(false);
  const userService = new UserManagementService();

  const loadUsersByRole = async (role: UserRole) => {
    setLoading(true);
    try {
      const roleUsers = await userService.getUsersByRole(role);
      setUsers(roleUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsersByRole(selectedRole);
    }
  }, [activeTab, selectedRole]);

  const handleUpdateUserStatus = async (uid: string, status: 'active' | 'inactive' | 'suspended') => {
    await userService.updateUserStatus(uid, status);
    loadUsersByRole(selectedRole);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  // --- CHART DATA (Mock Data for Visuals) ---
  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Server Load (%)',
        data: [20, 35, 55, 80, 65, 45, 30],
        borderColor: '#0D47A1',
        backgroundColor: 'rgba(13, 71, 161, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShieldAlert size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider">BRITIUM</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">System Admin</p>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="System Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="User Management" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <NavItem 
            icon={<Database size={20} />} 
            label="Database & Logs" 
            active={activeTab === 'system'} 
            onClick={() => setActiveTab('system')} 
          />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout System</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-600">
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'overview' ? 'System Health Monitor' : 
                 activeTab === 'users' ? 'User Access Control' : 'System Logs'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                SYSTEM ONLINE
              </span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                SA
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          
          {/* === TAB: OVERVIEW (From your HTML) === */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total System Users" value="2,451" change="+12.5%" icon={<Users className="text-blue-600" />} />
                <StatCard title="API Request Rate" value="450/s" change="+5.2%" icon={<Activity className="text-green-600" />} />
                <StatCard title="Database Storage" value="64%" change="Stable" icon={<Database className="text-purple-600" />} />
                <StatCard title="Server Uptime" value="99.9%" change="Optimal" icon={<Server className="text-orange-600" />} />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Real-time Traffic Load</h3>
                  <div className="h-64">
                    <Line options={chartOptions} data={chartData} />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-6 rounded-xl text-white shadow-lg">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Cpu size={20} /> System Resources
                  </h3>
                  <div className="space-y-6">
                    <ResourceBar label="CPU Usage" percent={45} color="bg-blue-500" />
                    <ResourceBar label="Memory (RAM)" percent={72} color="bg-orange-500" />
                    <ResourceBar label="Disk I/O" percent={28} color="bg-green-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === TAB: USER MANAGEMENT (Restored functionality) === */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex items-center gap-2">
                    <Search size={20} className="text-gray-400" />
                    <input type="text" placeholder="Search users..." className="outline-none text-sm w-64" />
                 </div>
                 <select 
                    value={selectedRole} 
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {Object.values(UserRole).map(role => (
                      <option key={role} value={role}>{role.replace('_', ' ').toUpperCase()}</option>
                    ))}
                  </select>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">User Identity</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Current Role</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-500">Loading user data...</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-500">No users found in this category.</td></tr>
                    ) : (
                      users.map(user => (
                        <tr key={user.uid} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{user.displayName}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                            {user.role}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                              user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {user.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => handleUpdateUserStatus(user.uid, user.status === 'active' ? 'suspended' : 'active')}
                              className={`text-xs font-bold px-3 py-1 rounded border transition-colors ${
                                user.status === 'active' 
                                  ? 'border-red-200 text-red-600 hover:bg-red-50' 
                                  : 'border-green-200 text-green-600 hover:bg-green-50'
                              }`}
                            >
                              {user.status === 'active' ? 'SUSPEND ACCESS' : 'GRANT ACCESS'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === TAB: SYSTEM LOGS (Placeholder) === */}
          {activeTab === 'system' && (
            <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono text-sm h-[500px] overflow-y-auto shadow-inner">
              <p className="mb-2 opacity-50"># System Access Logs - {new Date().toLocaleDateString()}</p>
              <div className="space-y-1">
                <p>[10:42:15] <span className="text-blue-400">INFO</span> Connection established to Database Cluster 01</p>
                <p>[10:42:18] <span className="text-yellow-400">WARN</span> Latency spike detected in Region: MM-YGN (145ms)</p>
                <p>[10:43:05] <span className="text-blue-400">INFO</span> User Auth Service: Validated 24 sessions</p>
                <p>[10:45:00] <span className="text-green-500">SUCCESS</span> Automated backup completed (Size: 4.2GB)</p>
                <p>[10:48:22] <span className="text-blue-400">INFO</span> New merchant application received: ID #8821</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS for Clean Code ---

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active ? 'bg-[#0D47A1] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{change}</span>
    </div>
    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const ResourceBar = ({ label, percent, color }: any) => (
  <div>
    <div className="flex justify-between text-xs mb-1 text-slate-300">
      <span>{label}</span>
      <span>{percent}%</span>
    </div>
    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);