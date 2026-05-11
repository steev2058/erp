import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { BarChart3, ShoppingCart, Package, Truck, TrendingUp, Users } from 'lucide-react';

interface DashboardStats {
  totalInvoices: number;
  totalRevenue: number;
  pendingApprovals: number;
  lowStockItems: number;
}

export default function DashboardPage() {
  const { user, setUser } = useContext(AuthContext);
  const [, navigate] = useLocation();
  const [stats, setStats] = useState<DashboardStats>({
    totalInvoices: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    lowStockItems: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-6">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back, {user?.username}</p>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Invoices</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalInvoices}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Pending Approvals</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.pendingApprovals}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Low Stock Items</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.lowStockItems}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-left">
                <ShoppingCart className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-semibold text-slate-900">New Sales Invoice</p>
                <p className="text-xs text-slate-600 mt-1">Create a new invoice</p>
              </button>
              <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-left">
                <Package className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-semibold text-slate-900">Stock Movement</p>
                <p className="text-xs text-slate-600 mt-1">Record inventory movement</p>
              </button>
              <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-left">
                <Truck className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-semibold text-slate-900">Purchase Order</p>
                <p className="text-xs text-slate-600 mt-1">Create purchase request</p>
              </button>
              <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-left">
                <Users className="w-6 h-6 text-indigo-600 mb-2" />
                <p className="font-semibold text-slate-900">View Reports</p>
                <p className="text-xs text-slate-600 mt-1">Access analytics</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
