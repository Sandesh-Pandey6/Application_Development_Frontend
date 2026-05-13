import { useState, useEffect } from 'react';
import { DollarSign, BarChart2, TrendingUp, ArrowUpRight, Download } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { getFinancialReportData } from '../../api/adminApi';

const staticRevenueOverTime = [
  { name: '1 Mangsir', revenue: 4200 },
  { name: '5 Mangsir', revenue: 5100 },
  { name: '10 Mangsir', revenue: 4800 },
  { name: '20 Mangsir', revenue: 4600 },
  { name: '30 Mangsir', revenue: 6800 },
];

const staticPurchaseCosts = [
  { name: 'Brakes', cost: 12000 },
  { name: 'Engine', cost: 28000 },
  { name: 'Filters', cost: 10000 },
  { name: 'Electrical', cost: 18000 },
  { name: 'Suspension', cost: 14000 },
];

const staticTopParts = [
  { name: 'Castrol Magnatec 10W-40 (1L)', category: 'Lubricants', unitsSold: 340, revenue: '28,900' },
  { name: 'Alternator 12V 65A', category: 'Electrical', unitsSold: 42, revenue: '22,050' },
  { name: 'NGK Spark Plugs BKR6E', category: 'Ignition', unitsSold: 210, revenue: '15,120' },
  { name: 'Exide Mileage 65Ah Battery', category: 'Electrical', unitsSold: 38, revenue: '14,820' },
  { name: 'Brembo Front Brake Pads', category: 'Brakes', unitsSold: 56, revenue: '13,720' },
];

const staticVendorSpend = [
  { name: 'Nepal Auto Parts', value: 42 },
  { name: 'Himalayan Motors', value: 25 },
  { name: 'Everest Spare Parts', value: 18 },
  { name: 'Ktm Auto Accessories', value: 15 },
];

const DONUT_COLORS = ['#0f172a', '#475569', '#94a3b8', '#cbd5e1'];

export default function FinancialReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getFinancialReportData(period);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch financial report, using fallback", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [period]);

  const revenueOverTime = data?.revenueOverTime || staticRevenueOverTime;
  const purchaseCosts = data?.purchaseCosts || staticPurchaseCosts;
  const topParts = data?.topParts || staticTopParts;
  const vendorSpend = data?.vendorSpend || staticVendorSpend;

  const grossRevenue = data?.grossRevenue || "1,24,500";
  const revenueChange = data?.revenueChange || "+12.5%";
  const totalExpenses = data?.totalExpenses || "75,400";
  const expensesChange = data?.expensesChange || "+8.2%";
  const netMargin = data?.netMargin || "39.4%";
  const marginChange = data?.marginChange || "+4.3%";

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
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Reports</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Analyze revenue, expenses, and inventory performance — Mangsir 2081</p>
        </div>
        <div className="flex items-center gap-2">
          {['Daily', 'Monthly', 'Yearly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                period === p.toLowerCase()
                  ? 'bg-[#0f172a] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-500">Gross Revenue</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <DollarSign size={16} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">Rs. {grossRevenue}</div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpRight size={16} className="text-emerald-500 mr-1 stroke-[2.5]" />
            <span className="text-emerald-500 font-bold">{revenueChange}</span>
            <span className="text-slate-400 ml-2 font-medium">vs previous period</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-500">Total Expenses</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <BarChart2 size={16} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">Rs. {totalExpenses}</div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpRight size={16} className="text-emerald-500 mr-1 stroke-[2.5]" />
            <span className="text-emerald-500 font-bold">{expensesChange}</span>
            <span className="text-slate-400 ml-2 font-medium">Cost of goods sold</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-500">Net Margin</h3>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
              <TrendingUp size={16} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{netMargin}</div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpRight size={16} className="text-emerald-500 mr-1 stroke-[2.5]" />
            <span className="text-emerald-500 font-bold">{marginChange}</span>
            <span className="text-slate-400 ml-2 font-medium">Overall profitability</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Revenue Over Time */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-[17px] font-bold text-slate-900">Sales Revenue Over Time</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Daily revenue tracking for the selected period</p>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueOverTime} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0f172a"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: '#0f172a', strokeWidth: 0 }}
                  activeDot={{ r: 7, fill: '#0f172a', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Purchase Costs by Category */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="mb-6">
            <h2 className="text-[17px] font-bold text-slate-900">Purchase Costs by Category</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Inventory expenditure breakdown (Rs.)</p>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={purchaseCosts} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                  tickFormatter={(v) => `${v / 1000}k`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="cost" fill="#0f172a" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Parts */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-[17px] font-bold text-slate-900">Top Selling Parts</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Highest performing inventory items by revenue</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 bg-white">
                <tr>
                  <th scope="col" className="px-6 py-4">Part Name</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Units Sold</th>
                  <th scope="col" className="px-6 py-4">Total Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topParts.map((part, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{part.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                        {part.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">{part.unitsSold}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">Rs. {part.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vendor Spend Donut */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="mb-4">
            <h2 className="text-[17px] font-bold text-slate-900">Vendor Spend</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Share of total procurement budget</p>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vendorSpend}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {vendorSpend.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 justify-center">
            {vendorSpend.map((vendor, index) => (
              <div key={vendor.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DONUT_COLORS[index % DONUT_COLORS.length] }}></div>
                <span className="text-xs font-medium text-slate-500">{vendor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
