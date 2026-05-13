import React, { useState } from 'react';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    { id: 1, message: 'Low Stock: Brake Pads', time: '10 mins ago', read: false },
    { id: 2, message: 'Low Stock: Engine Oil (5W-30)', time: '1 hour ago', read: false },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-64 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-50">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">Notifications</p>
          </div>
          <div className="py-1">
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <div key={note.id} className="px-4 py-3 hover:bg-gray-50 flex flex-col cursor-pointer">
                  <span className={`text-sm ${note.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                    {note.message}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{note.time}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
