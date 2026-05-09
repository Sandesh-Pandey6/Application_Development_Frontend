import React from 'react';

const PartRequestHistory = () => {
  const requests = [
    { id: 1, partName: 'Brake Pads', model: 'Honda Civic 2020', status: 'Pending' },
    { id: 2, partName: 'Spark Plugs', model: 'Toyota Corolla 2018', status: 'Available' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Ordered': return 'bg-blue-100 text-blue-800';
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Part Request History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-4 whitespace-nowrap">{req.partName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{req.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(req.status)}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && <p className="text-gray-500 text-center py-4">No part requests found.</p>}
      </div>
    </div>
  );
};

export default PartRequestHistory;
