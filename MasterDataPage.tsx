import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'wouter';
import { Plus } from 'lucide-react';

interface Item {
  id: number;
  name: string;
  sku: string;
  category: string;
  unit: string;
}

export default function MasterDataPage() {
  const [, navigate] = useLocation();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/master-data/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
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
            <h1 className="text-3xl font-bold text-slate-900">Master Data</h1>
            <p className="text-slate-600 mt-1">Manage items, customers, suppliers, and categories</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-slate-200">
            {['items', 'customers', 'suppliers', 'categories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium transition border-b-2 ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Items Table */}
          {activeTab === 'items' && (
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Items</h2>
              </div>

              {loading ? (
                <div className="p-6 text-center text-slate-600">Loading...</div>
              ) : items.length === 0 ? (
                <div className="p-6 text-center text-slate-600">No items found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{item.sku}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{item.category || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{item.unit || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab !== 'items' && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 text-center text-slate-600">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management coming soon
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
