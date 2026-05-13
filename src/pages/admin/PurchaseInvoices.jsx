import { useState, useEffect } from 'react';
import { FileText, DollarSign, CheckCircle, Clock, Plus, Eye } from 'lucide-react';
import { getPurchaseInvoicesData } from '../../api/adminApi';

const staticInvoices = [
  { id: 'PI-2024-042', vendor: 'Nepal Auto Parts Pvt. Ltd.', date: '20 Nov 2024', parts: '5 items', total: '28,500', status: 'Completed' },
  { id: 'PI-2024-041', vendor: 'Himalayan Motors Supply', date: '15 Nov 2024', parts: '3 items', total: '14,200', status: 'Completed' },
  { id: 'PI-2024-040', vendor: 'Everest Spare Parts', date: '10 Nov 2024', parts: '7 items', total: '42,000', status: 'Pending' },
  { id: 'PI-2024-039', vendor: 'Kathmandu Auto Accessories', date: '02 Nov 2024', parts: '4 items', total: '19,800', status: 'Completed' },
  { id: 'PI-2024-038', vendor: 'Nepal Auto Parts Pvt. Ltd.', date: '28 Oct 2024', parts: '6 items', total: '35,600', status: 'Completed' },
  { id: 'PI-2024-037', vendor: 'Pokhara Vehicle Supplies', date: '20 Oct 2024', parts: '2 items', total: '8,900', status: 'Processing' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Completed':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">Completed</span>;
    case 'Pending':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200/60">Pending</span>;
    case 'Processing':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200/60">Processing</span>;
    default:
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
  }
};

export default function PurchaseInvoices() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getPurchaseInvoicesData();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch invoices data, using fallback", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const invoices = data?.invoices || staticInvoices;
  const totalInvoices = data?.totalInvoices || "6";
  const totalValue = data?.totalValue || "1,49,000";
  const completedCount = data?.completedCount || "4";
  const pendingProcessing = data?.pendingProcessing || "2";

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Purchase Invoices</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Track all vendor purchases and inventory restocking orders</p>
        </div>
        <button className="bg-[#0f172a] hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} className="stroke-[2.5]" />
          Create Purchase Invoice
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="text-2xl font-bold text-slate-900">{totalInvoices}</div>
          <div className="text-sm font-medium text-slate-400 mt-1">Total Invoices</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="text-2xl font-bold text-slate-900">Rs. {totalValue}</div>
          <div className="text-sm font-medium text-slate-400 mt-1">Total Value</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="text-2xl font-bold text-slate-900">{completedCount}</div>
          <div className="text-sm font-medium text-slate-400 mt-1">Completed</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="text-2xl font-bold text-slate-900">{pendingProcessing}</div>
          <div className="text-sm font-medium text-slate-400 mt-1">Pending / Processing</div>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-[17px] font-bold text-slate-900">All Purchase Invoices</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 bg-white">
              <tr>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Invoice #</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Vendor</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Date</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Parts</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Total Amount</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-bold text-slate-400 whitespace-nowrap">{invoice.id}</td>
                  <td className="px-6 py-5 font-bold text-slate-900 whitespace-nowrap">{invoice.vendor}</td>
                  <td className="px-6 py-5 font-medium text-slate-500 whitespace-nowrap">{invoice.date}</td>
                  <td className="px-6 py-5 font-medium text-slate-500 whitespace-nowrap">{invoice.parts}</td>
                  <td className="px-6 py-5 font-bold text-slate-900 whitespace-nowrap">Rs. {invoice.total}</td>
                  <td className="px-6 py-5 whitespace-nowrap">{getStatusBadge(invoice.status)}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors font-medium text-xs">
                      <Eye size={14} className="stroke-[2.5]" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
