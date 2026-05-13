import { useState, useEffect } from 'react';
import { TrendingDown, MessageSquare, Info, CheckCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { getNotificationsData } from '../../api/adminApi';

const staticNotifications = [
  {
    id: 1, type: 'Low Stock', title: 'Critical: NGK Spark Plugs BKR6E',
    description: 'NGK Spark Plugs BKR6E stock has dropped to 6 units — below the minimum threshold of 10. Immediate reorder recommended.',
    date: '23 Nov 2024 · 09:15 AM', unread: true,
  },
  {
    id: 2, type: 'Credit Reminder', title: 'Overdue Credit Balance — Ramesh Thapa',
    description: 'Customer Ramesh Thapa (ID: C-0048) has an outstanding credit balance of Rs. 2,500 overdue since 15 Nov 2024. Automated reminder sent.',
    date: '23 Nov 2024 · 08:30 AM', unread: true,
  },
  {
    id: 3, type: 'Low Stock', title: 'Low Stock Alert: Brembo Brake Pads',
    description: 'Brembo Front Brake Pads stock is at 5 units. Reorder from Himalayan Motors Supply to avoid stockout.',
    date: '22 Nov 2024 · 04:45 PM', unread: true,
  },
  {
    id: 4, type: 'Low Stock', title: 'Low Stock Alert: Denso Fuel Filter',
    description: 'Denso Fuel Filter has only 3 units remaining. Minimum threshold is 10 units.',
    date: '22 Nov 2024 · 11:00 AM', unread: true,
  },
  {
    id: 5, type: 'Credit Reminder', title: 'Overdue Credit — Sita Devi Shrestha',
    description: 'Customer Sita Devi Shrestha (ID: C-0076) has unpaid balance of Rs. 5,800. Overdue by 21 days.',
    date: '21 Nov 2024 · 10:00 AM', unread: true,
  },
  {
    id: 6, type: 'Low Stock', title: 'Low Stock Alert: Exide Mileage Battery',
    description: 'Exide Mileage 65Ah Battery stock is at 8 units. Restock from Kathmandu Auto Accessories.',
    date: '21 Nov 2024 · 09:00 AM', unread: true,
  },
  {
    id: 7, type: 'Info', title: 'New Staff Account Created',
    description: 'Staff account for Puja Maharjan (Billing Dept.) was created by Admin Anil Dawadi.',
    date: '20 Nov 2024 · 03:20 PM', unread: true,
  },
  {
    id: 8, type: 'Low Stock', title: 'Low Stock Alert: Aisin Clutch Plate Set',
    description: 'Aisin Clutch Plate Set is at 9 units, approaching the minimum threshold.',
    date: '20 Nov 2024 · 08:00 AM', unread: true,
  },
  {
    id: 9, type: 'Credit Reminder', title: 'Payment Received — Bikram Adhikari',
    description: 'Customer Bikram Adhikari cleared outstanding balance of Rs. 3,200. Account status: Clear.',
    date: '18 Nov 2024 · 02:00 PM', unread: false,
  },
  {
    id: 10, type: 'Low Stock', title: 'Low Stock Alert: Bosch Wiper Blades',
    description: 'Bosch Wiper Blades 22" stock is at 7 units. Consider reordering from Himalayan Motors.',
    date: '17 Nov 2024 · 10:30 AM', unread: false,
  },
  {
    id: 11, type: 'Info', title: 'System Maintenance Completed',
    description: 'Scheduled database maintenance completed successfully. No downtime recorded.',
    date: '16 Nov 2024 · 06:00 AM', unread: false,
  },
  {
    id: 12, type: 'Credit Reminder', title: 'Overdue Credit — Rajesh Kumar',
    description: 'Customer Rajesh Kumar (ID: C-0091) has unpaid balance of Rs. 4,100. Overdue by 14 days.',
    date: '15 Nov 2024 · 11:45 AM', unread: false,
  },
];

const typeConfig = {
  'Low Stock': {
    borderColor: 'border-l-rose-400',
    badgeBg: 'bg-rose-50 text-rose-600 border-rose-200/60',
    icon: TrendingDown,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
  'Credit Reminder': {
    borderColor: 'border-l-amber-400',
    badgeBg: 'bg-amber-50 text-amber-600 border-amber-200/60',
    icon: MessageSquare,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  'Info': {
    borderColor: 'border-l-blue-400',
    badgeBg: 'bg-blue-50 text-blue-600 border-blue-200/60',
    icon: Info,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
};

const ITEMS_PER_PAGE = 5;

export default function Notifications() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotificationsData();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch notifications, using fallback", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const allNotifications = data?.notifications || staticNotifications;
  const unreadCount = allNotifications.filter(n => n.unread).length;

  // Count by type
  const lowStockCount = allNotifications.filter(n => n.type === 'Low Stock').length;
  const creditCount = allNotifications.filter(n => n.type === 'Credit Reminder').length;
  const infoCount = allNotifications.filter(n => n.type === 'Info').length;

  const filters = [
    { label: 'All', count: null },
    { label: 'Low Stock', count: lowStockCount },
    { label: 'Credit Reminder', count: creditCount },
    { label: 'Info', count: infoCount },
  ];

  // Filter notifications
  const filteredNotifications = activeFilter === 'All'
    ? allNotifications
    : allNotifications.filter(n => n.type === activeFilter);

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page on filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications & Alerts</h1>
        <p className="text-sm text-blue-500 font-semibold mt-1">{unreadCount} unread notifications</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => handleFilterChange(f.label)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              activeFilter === f.label
                ? 'bg-[#0f172a] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}{f.count !== null ? ` (${f.count})` : ''}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {paginatedNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-sm text-center">
            <p className="text-slate-400 font-medium">No notifications found.</p>
          </div>
        ) : (
          paginatedNotifications.map((notification) => {
            const config = typeConfig[notification.type] || typeConfig['Info'];
            const IconComponent = config.icon;

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl border border-slate-100 shadow-sm border-l-4 ${config.borderColor} overflow-hidden`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <IconComponent size={18} className={config.iconColor} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-slate-900">{notification.title}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${config.badgeBg}`}>
                            {notification.type}
                          </span>
                          {notification.unread && (
                            <span className="w-2 h-2 rounded-full bg-slate-900 flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{notification.description}</p>

                        {/* Mark as Read */}
                        <button className="flex items-center gap-1.5 mt-3 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
                          <CheckCheck size={14} className="stroke-[2.5]" />
                          Mark as Read
                        </button>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap flex-shrink-0 mt-1">{notification.date}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredNotifications.length)}</span> of <span className="font-bold text-slate-900">{filteredNotifications.length}</span> notifications
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'border border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
