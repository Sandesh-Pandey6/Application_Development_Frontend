import { useState, useEffect } from 'react';
import { Package, Filter, AlertTriangle, Truck, Search, ChevronDown, Plus, MoreVertical, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getPartsData } from '../../api/adminApi';

const staticPartsData = [
  { id: 'P-001', name: 'Castrol Magnatec 10W-40 (1L)', category: 'Lubricants', price: '850', stock: 124, vendor: 'Nepal Auto Parts', date: '20 Nov 2024' },
  { id: 'P-002', name: 'Honda City Oil Filter', category: 'Filters', price: '480', stock: 8, vendor: 'Nepal Auto Parts', date: '18 Nov 2024', lowStock: true },
  { id: 'P-003', name: 'NGK Spark Plugs BKR6E', category: 'Ignition', price: '320', stock: 6, vendor: 'Nepal Auto Parts', date: '15 Nov 2024', lowStock: true },
  { id: 'P-004', name: 'Bosch Wiper Blades 22"', category: 'Accessories', price: '650', stock: 48, vendor: 'Himalayan Motors', date: '14 Nov 2024' },
  { id: 'P-005', name: 'Exide Mileage 65Ah Battery', category: 'Electrical', price: '8,200', stock: 8, vendor: 'Kathmandu Auto', date: '10 Nov 2024', lowStock: true },
  { id: 'P-006', name: 'MRF ZVTV 185/65 R15 Tyre', category: 'Tyres', price: '8,500', stock: 18, vendor: 'Everest Spare Parts', date: '08 Nov 2024' },
  { id: 'P-007', name: 'Brembo Front Brake Pads', category: 'Brakes', price: '2,900', stock: 5, vendor: 'Himalayan Motors', date: '05 Nov 2024', lowStock: true },
  { id: 'P-008', name: 'KYB Shock Absorber (Front)', category: 'Suspension', price: '4,500', stock: 14, vendor: 'Everest Spare Parts', date: '02 Nov 2024' },
];

export default function PartsInventory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await getPartsData();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch parts data, using fallback", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchParts();
  }, []);

  const parts = data?.parts || staticPartsData;
  const totalParts = data?.totalParts || "14,230";
  const categoriesCount = data?.categoriesCount || "8";
  const lowStockCount = data?.lowStockCount || "3";
  const vendorsCount = data?.vendorsCount || "5";

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Parts & Inventory</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage inventory, update pricing, and monitor stock levels.</p>
        </div>
        <button className="bg-[#0f172a] hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} className="stroke-[2.5]" />
          Add New Part
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <Package size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalParts}</div>
            <div className="text-sm font-medium text-slate-400">Total Parts</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <Filter size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{categoriesCount}</div>
            <div className="text-sm font-medium text-slate-400">Categories</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
            <AlertTriangle size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-600">{lowStockCount}</div>
            <div className="text-sm font-medium text-rose-400">Low Stock</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <Truck size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{vendorsCount}</div>
            <div className="text-sm font-medium text-slate-400">Vendors</div>
          </div>
        </div>
      </div>

      {/* Filters and Table Area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        {/* Filters Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Filter by part name or ID..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-colors"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-colors">
                <option>All Categories</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
            <div className="relative w-full sm:w-48">
              <select className="w-full appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white transition-colors">
                <option>All Stock Levels</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors w-full lg:w-auto justify-center">
            <Filter size={16} className="stroke-[2.5]" />
            More Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 bg-white">
              <tr>
                <th scope="col" className="px-6 py-5">Part ID</th>
                <th scope="col" className="px-6 py-5">Name</th>
                <th scope="col" className="px-6 py-5">Category</th>
                <th scope="col" className="px-6 py-5">Unit Price</th>
                <th scope="col" className="px-6 py-5">Stock Qty</th>
                <th scope="col" className="px-6 py-5">Vendor</th>
                <th scope="col" className="px-6 py-5">Last Updated</th>
                <th scope="col" className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {parts.map((part) => (
                <tr key={part.id} className={`transition-colors ${part.lowStock || (part.stock < 10) ? 'bg-rose-50/40 hover:bg-rose-50/70' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-4 font-bold text-slate-400 whitespace-nowrap">{part.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{part.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                      {part.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">Rs. {part.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {part.lowStock || (part.stock < 10) ? (
                      <div className="flex items-center gap-1.5 text-rose-600 font-bold">
                        <AlertTriangle size={14} className="stroke-[2.5]" />
                        {part.stock}
                      </div>
                    ) : (
                      <div className="text-emerald-500 font-bold px-2 py-0.5 rounded bg-emerald-50 inline-block">
                        {part.stock}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">{part.vendor}</td>
                  <td className="px-6 py-4 font-medium text-slate-400 whitespace-nowrap">{part.date}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">1-8</span> of <span className="font-bold text-slate-900">{totalParts}</span> parts
          </div>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-sm shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
