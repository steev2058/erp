import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'wouter';
import { Plus, Eye } from 'lucide-react';

interface Invoice {
  id: number;
  invoice_number: string;
  customer: string;
  total_amount: number;
  status: string;
  invoice_date: string;
}

export default function SalesPage() {
  const [, navigate] = useLocation();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/sales/invoices', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
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
            <h1 className="text-3xl font-bold text-slate-900">Sales Module</h1>
            <p className="text-slate-600 mt-1">Manage sales invoices and targets</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Invoice
          </button>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Recent Invoices</h2>
            </div>

            {loading ? (
              <div className="p-6 text-center text-slate-600">Loading...</div>
            ) : invoices.length === 0 ? (
              <div className="p-6 text-center text-slate-600">No invoices found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Invoice #</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{invoice.invoice_number}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{invoice.customer}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">${invoice.total_amount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            invoice.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
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
