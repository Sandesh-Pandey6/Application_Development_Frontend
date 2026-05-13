import React from 'react';

const PurchaseHistory = () => {
  const purchases = [
    { id: 'INV-1020', date: '2026-05-01', items: 'Oil Filter, Engine Oil', amount: 85.00, discount: 8.50, status: 'Paid' },
    { id: 'INV-1011', date: '2026-03-12', items: 'Brake Pads', amount: 120.00, discount: 0, status: 'Paid' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Purchase & Service History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">{purchase.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{purchase.date}</td>
                <td className="px-6 py-4">{purchase.items}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>${(purchase.amount - purchase.discount).toFixed(2)}</div>
                  {purchase.discount > 0 && (
                    <div className="text-xs text-green-600 font-medium">10% Loyalty Discount Applied</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {purchase.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
