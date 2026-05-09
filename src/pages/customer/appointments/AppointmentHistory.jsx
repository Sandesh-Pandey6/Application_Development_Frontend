import React from 'react';

const AppointmentHistory = () => {
  const appointments = [
    { id: 1, date: '2026-05-15', time: '10:00', type: 'Maintenance', status: 'Pending' },
    { id: 2, date: '2026-04-10', time: '14:30', type: 'Repair', status: 'Completed' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Appointment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td className="px-6 py-4 whitespace-nowrap">{apt.date} {apt.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{apt.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(apt.status)}`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {apt.status === 'Pending' && (
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && <p className="text-gray-500 text-center py-4">No appointments found.</p>}
      </div>
    </div>
  );
};

export default AppointmentHistory;
