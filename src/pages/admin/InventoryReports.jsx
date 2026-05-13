import { useState, useEffect } from 'react';
import { Package, DollarSign, TrendingDown, AlertTriangle, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getInventoryReportData } from '../../api/adminApi';

const staticStockByCategory = [
  { name: 'Lubricants', stock: 124 },
  { name: 'Tyres', stock: 18 },
  { name: 'Ignition', stock: 6 },
  { name: 'Brakes', stock: 5 },
  { name: 'Filters', stock: 25 },
  { name: 'Electrical', stock: 46 },
  { name: 'Suspension', stock: 14 },
];

const staticInventoryList = [
  { id: 'P-001', name: 'Castrol Magnatec 10W-40 (1L)', category: 'Lubricants', vendor: 'Nepal Auto Parts', stock: 124, unitValue: '850', totalValue: '105,400', status: 'In Stock' },
  { id: 'P-002', name: 'MRF ZVTV 185/65 R15 Tyre', category: 'Tyres', vendor: 'Everest Spare Parts', stock: 18, unitValue: '8,500', totalValue: '153,000', status: 'In Stock' },
  { id: 'P-003', name: 'NGK Spark Plugs BKR6E', category: 'Ignition', vendor: 'Nepal Auto Parts', stock: 6, unitValue: '320', totalValue: '1,920', status: 'Low Stock' },
  { id: 'P-004', name: 'Bosch Wiper Blades 22"', category: 'Accessories', vendor: 'Himalayan Motors', stock: 48, unitValue: '650', totalValue: '31,200', status: 'In Stock' },
  { id: 'P-005', name: 'Honda City Oil Filter', category: 'Filters', vendor: 'Nepal Auto Parts', stock: 22, unitValue: '480', totalValue: '10,560', status: 'In Stock' },
  { id: 'P-006', name: 'Exide Mileage 65Ah Battery', category: 'Electrical', vendor: 'Kathmandu Auto', stock: 8, unitValue: '8,200', totalValue: '65,600', status: 'Low Stock' },
  { id: 'P-007', name: 'Brembo Front Brake Pads', category: 'Brakes', vendor: 'Himalayan Motors', stock: 5, unitValue: '2,900', totalValue: '14,500', status: 'Low Stock' },
  { id: 'P-008', name: 'KYB Shock Absorber (Front)', category: 'Suspension', vendor: 'Everest Spare Parts', stock: 14, unitValue: '4,500', totalValue: '63,000', status: 'In Stock' },
  { id: 'P-009', name: 'Denso Fuel Filter', category: 'Filters', vendor: 'Nepal Auto Parts', stock: 3, unitValue: '750', totalValue: '2,250', status: 'Low Stock' },
  { id: 'P-010', name: 'Aisin Clutch Plate Set', category: 'Drivetrain', vendor: 'Kathmandu Auto', stock: 9, unitValue: '6,800', totalValue: '61,200', status: 'Low Stock' },
];

const staticLowStockParts = [
  { name: 'NGK Spark Plugs BKR6E', category: 'Ignition', currentStock: 6, reorderQty: 54, vendor: 'Nepal Auto Parts' },
  { name: 'Exide Mileage 65Ah Battery', category: 'Electrical', currentStock: 8, reorderQty: 52, vendor: 'Kathmandu Auto' },
  { name: 'Brembo Front Brake Pads', category: 'Brakes', currentStock: 5, reorderQty: 55, vendor: 'Himalayan Motors' },
  { name: 'Denso Fuel Filter', category: 'Filters', currentStock: 3, reorderQty: 57, vendor: 'Nepal Auto Parts' },
  { name: 'Aisin Clutch Plate Set', category: 'Drivetrain', currentStock: 9, reorderQty: 51, vendor: 'Kathmandu Auto' },
];

export default function InventoryReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getInventoryReportData();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch inventory report, using fallback", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  const stockByCategory = data?.stockByCategory || staticStockByCategory;
  const inventoryList = data?.inventoryList || staticInventoryList;
  const lowStockParts = data?.lowStockParts || staticLowStockParts;
  const totalPartTypes = data?.totalPartTypes || "10";
  const totalStockValue = data?.totalStockValue || "509K";
  const lowStockCount = data?.lowStockCount || "5";

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory Reports</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Full stock overview, valuation, and low stock analysis</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <Package size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalPartTypes}</div>
            <div className="text-sm font-medium text-slate-400">Total Part Types</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <DollarSign size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">Rs. {totalStockValue}</div>
            <div className="text-sm font-medium text-slate-400">Total Stock Value</div>
          </div>
        </div>

        <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
            <TrendingDown size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-600">{lowStockCount}</div>
            <div className="text-sm font-medium text-rose-400">Low Stock Parts</div>
          </div>
        </div>
      </div>

      {/* Stock Levels by Category Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="mb-6">
          <h2 className="text-[17px] font-bold text-slate-900">Stock Levels by Category</h2>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stockByCategory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="stock" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Inventory List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-[17px] font-bold text-slate-900">Full Inventory List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Part ID</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Part Name</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Category</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Vendor</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Stock</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Unit Value</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Total Value</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inventoryList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-400 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">{item.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status === 'Low Stock' ? (
                      <span className="text-rose-600 font-bold">{item.stock}</span>
                    ) : (
                      <span className="text-slate-900 font-medium">{item.stock}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">Rs. {item.unitValue}</td>
                  <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">Rs. {item.totalValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status === 'In Stock' ? (
                      <span className="text-emerald-600 font-bold text-xs">In Stock</span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-600 font-bold text-xs">
                        <AlertTriangle size={12} className="stroke-[2.5]" />
                        Low Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Reorder Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-500 stroke-[2.5]" />
          <h2 className="text-[17px] font-bold text-slate-900">Low Stock — Reorder Required ({lowStockCount} parts)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Part</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Category</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Current Stock</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Reorder Qty (Suggested)</th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">Vendor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lowStockParts.map((part, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{part.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                      {part.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-rose-600 whitespace-nowrap">{part.currentStock} units</td>
                  <td className="px-6 py-4 font-bold text-emerald-600 whitespace-nowrap">{part.reorderQty} units</td>
                  <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">{part.vendor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
