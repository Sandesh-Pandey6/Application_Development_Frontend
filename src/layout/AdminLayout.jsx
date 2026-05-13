import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Truck, 
  FileText, 
  PieChart, 
  BarChart2, 
  Bell, 
  Search,
  Settings,
  LogOut
} from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Parts & Inventory', icon: Package, path: '/admin/parts' },
    { name: 'Staff Management', icon: Users, path: '/admin/staff' },
    { name: 'Vendor Management', icon: Truck, path: '/admin/vendors' },
    { name: 'Purchase Invoices', icon: FileText, path: '/admin/invoices' },
    { name: 'Financial Reports', icon: PieChart, path: '/admin/financial-reports' },
    { name: 'Inventory Reports', icon: BarChart2, path: '/admin/inventory-reports' },
    { name: 'Notifications', icon: Bell, path: '/admin/notifications', badge: 12 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="bg-[#111827] text-white p-1.5 rounded-md">
                <Settings size={20} className="stroke-[2.5]"/>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">AutoParts<span className="text-blue-600">Pro</span></span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="p-4 space-y-1">
            <div className="px-2 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Admin Menu
            </div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#111827] text-white shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                AD
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Anil Dawadi</p>
                <p className="text-xs text-slate-500">System Admin</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search parts, vendors, invoices..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-4">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-slate-800 rounded-full border-2 border-white"></span>
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-auto p-8 bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
