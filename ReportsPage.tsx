import Sidebar from '../components/Sidebar';
import { useLocation } from 'wouter';
import { BarChart3, TrendingUp, PieChart, LineChart } from 'lucide-react';

export default function ReportsPage() {
  const [, navigate] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const reports = [
    {
      title: 'Sales Performance',
      description: 'Monthly sales trends and revenue analysis',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Inventory Analysis',
      description: 'Stock levels and movement patterns',
      icon: BarChart3,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Production Efficiency',
      description: 'Production plan vs actual execution',
      icon: LineChart,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Financial Summary',
      description: 'Revenue, expenses, and profit analysis',
      icon: PieChart,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-6">
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">View comprehensive business analytics and reports</p>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, idx) => {
              const Icon = report.icon;
              return (
                <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition cursor-pointer">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${report.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{report.title}</h3>
                  <p className="text-slate-600 text-sm">{report.description}</p>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View Report →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
