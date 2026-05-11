import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'wouter';
import { Plus } from 'lucide-react';

interface StockBalance {
  id: number;
  warehouse: string;
  item: string;
  sku: string;
  quantity: number;
  unit: string;
}

export default function InventoryPage() {
  const [, navigate] = useLocation();
  const [stocks, setStocks] = useState<StockBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/inventory/stock-balances', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
            <p className="text-slate-600 mt-1">Monitor stock levels and warehouse inventory</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Record Movement
          </button>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Stock Balances</h2>
            </div>

            {loading ? (
              <div className="p-6 text-center text-slate-600">Loading...</div>
            ) : stocks.length === 0 ? (
              <div className="p-6 text-center text-slate-600">No stock data available</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Warehouse</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => (
                      <tr key={stock.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{stock.warehouse}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{stock.item}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{stock.sku}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{stock.quantity}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{stock.unit || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
