import { useState, useEffect } from 'react';
import { AlertCircle, ArrowUpRight, ArrowDownRight, Package, Users, TrendingUp, FileText, Truck, ArrowRight, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboardData } from '../../api/adminApi';

const revenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 59000 },
  { name: 'Jun', revenue: 75000 },
  { name: 'Jul', revenue: 68000 },
];

const recentActivity = [
  {
    id: 1,
    user: 'Hari Thapa',
    action: 'created purchase invoice',
    target: 'INV-8892',
    time: '10 min ago',
    icon: FileText,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600'
  },
  {
    id: 2,
    user: 'Sunita Gurung',
    action: 'updated stock for',
    target: 'Brake Pad Set',
    time: '45 min ago',
    icon: Package,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600'
  },
  {
    id: 3,
    user: 'Bikash Tamang',
    action: 'added new vendor',
    target: 'Pokhara Supplies',
    time: '2 hours ago',
    icon: Truck,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600'
  },
  {
    id: 4,
    user: 'Hari Thapa',
    action: 'approved order',
    target: 'ORD-1024',
    time: '3 hours ago',
    icon: TrendingUp,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600'
  }
];

const recentInvoices = [
  { id: 'PI-2024-042', vendor: 'Nepal Auto Parts Pvt. Ltd.', items: 45, total: '28,500', date: '20 Nov 2024', status: 'Completed' },
  { id: 'PI-2024-041', vendor: 'Himalayan Motors Supply', items: 120, total: '14,200', date: '15 Nov 2024', status: 'Pending' },
  { id: 'PI-2024-040', vendor: 'Everest Spare Parts', items: 30, total: '42,000', date: '10 Nov 2024', status: 'Completed' },
  { id: 'PI-2024-039', vendor: 'Kathmandu Auto Accessories', items: 200, total: '19,800', date: '02 Nov 2024', status: 'Processing' },
  { id: 'PI-2024-038', vendor: 'Nepal Auto Parts Pvt. Ltd.', items: 15, total: '35,600', date: '28 Oct 2024', status: 'Completed' },
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Completed':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Completed</span>;
    case 'Pending':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">Pending</span>;
    case 'Processing':
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">Processing</span>;
    default:
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
  }
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardData();
        // Assuming response structure has the necessary dashboard details.
        // If the structure differs, we will map it, but for now we store it.
        setData(response);
      } catch (error) {
        console.error("Failed to fetch dashboard data, using fallback", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboard();
  }, []);

  // Use backend data if available, otherwise fallback to static mock data
  const revenue = data?.revenueData || revenueData;
  const activity = data?.recentActivity || recentActivity;
  const invoices = data?.recentInvoices || recentInvoices;

  const totalRevenue = data?.totalRevenue || "1,24,500";
  const revenueChange = data?.revenueChange || "+12.5%";
  
  const totalParts = data?.totalParts || "14,230";
  const partsChange = data?.partsChange || "-2.1%";

  const activeStaff = data?.activeStaff || "24";
  const staffChange = data?.staffChange || "~ 0%";

  const pendingOrders = data?.pendingOrders || "48";
  const ordersChange = data?.ordersChange || "+18.2%";

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Alert */}
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 sm:mt-0 text-rose-500">
            <AlertCircle size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-rose-800">Inventory Alert</h3>
            <p className="text-sm text-rose-600 mt-0.5">12 parts have fallen below the minimum stock threshold of 10 units.</p>
          </div>
        </div>
        <button className="bg-[#e11d48] hover:bg-rose-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap shadow-sm">
          Review Restock List
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Total Revenue (MTD)</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <TrendingUp size={16} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">Rs. {totalRevenue}</span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpRight size={16} className="text-emerald-500 mr-1 stroke-[2.5]" />
            <span className="text-emerald-500 font-bold">{revenueChange}</span>
            <span className="text-slate-400 ml-2 font-medium">vs last month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Total Parts in Stock</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <Package size={16} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalParts}</span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowDownRight size={16} className="text-rose-500 mr-1 stroke-[2.5]" />
            <span className="text-rose-500 font-bold">{partsChange}</span>
            <span className="text-slate-400 ml-2 font-medium">vs last month</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Active Staff</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <Users size={16} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeStaff}</span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpRight size={16} className="text-slate-400 mr-1 stroke-[2.5]" />
            <span className="text-slate-500 font-bold">{staffChange}</span>
            <span className="text-slate-400 ml-2 font-medium">vs last month</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Pending Orders</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <TrendingUp size={16} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{pendingOrders}</span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpRight size={16} className="text-emerald-500 mr-1 stroke-[2.5]" />
            <span className="text-emerald-500 font-bold">{ordersChange}</span>
            <span className="text-slate-400 ml-2 font-medium">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-[17px] font-bold text-slate-900">Revenue Overview</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Monthly revenue for the current fiscal year</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-[17px] font-bold text-slate-900">Recent Activity</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Latest actions from staff members</p>
          </div>
          <div className="space-y-6">
            {activity.map((act, index) => (
              <div key={act.id || index} className="flex gap-4">
                <div className="relative">
                  {index !== activity.length - 1 && (
                    <div className="absolute top-8 left-1/2 -ml-[1px] w-[2px] h-[calc(100%+8px)] bg-slate-100" aria-hidden="true" />
                  )}
                  <div className={`w-8 h-8 rounded-full ${act.iconBg || 'bg-slate-100'} flex items-center justify-center relative z-10`}>
                    {act.icon ? <act.icon size={14} className={act.iconColor || 'text-slate-600'} /> : <FileText size={14} className="text-slate-600" />}
                  </div>
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-[13px] text-slate-800 leading-snug">
                    <span className="font-bold text-slate-900">{act.user}</span>{' '}
                    <span className="text-slate-500">{act.action}</span>{' '}
                    <span className="font-bold text-slate-900">{act.target}</span>
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900">Recent Purchase Invoices</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Latest inventory purchases from vendors</p>
          </div>
          <button className="px-5 py-2 border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-4">Invoice ID</th>
                <th scope="col" className="px-6 py-4">Vendor</th>
                <th scope="col" className="px-6 py-4">Items</th>
                <th scope="col" className="px-6 py-4">Total Cost</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-400">{invoice.id || invoice.invoiceId}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{invoice.vendor || invoice.vendorName}</td>
                  <td className="px-6 py-4 font-medium text-slate-500">{invoice.items || invoice.totalItems}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">Rs. {invoice.total || invoice.totalAmount}</td>
                  <td className="px-6 py-4 font-medium text-slate-400">{invoice.date || invoice.createdAt}</td>
                  <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
