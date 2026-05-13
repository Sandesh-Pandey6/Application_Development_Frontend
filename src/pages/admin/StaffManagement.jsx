import { useState, useEffect } from 'react';
import { Users, UserCheck, Shield, UserX, Plus, Mail, Phone, Edit, UserMinus } from 'lucide-react';
import { getStaffData } from '../../api/adminApi';

const staticStaffData = [
  { id: 'S-001', initials: 'HB', name: 'Hari Bahadur Thapa', email: 'hari@autoparts.com', phone: '9841111222', role: 'Staff', department: 'Workshop', status: 'Active' },
  { id: 'S-002', initials: 'SK', name: 'Shyam Krishna Shrestha', email: 'shyam@autoparts.com', phone: '9851234567', role: 'Manager', department: 'Sales', status: 'Active' },
  { id: 'S-003', initials: 'DR', name: 'Dipak Rai', email: 'dipak@autoparts.com', phone: '9862345678', role: 'Staff', department: 'Workshop', status: 'Active' },
  { id: 'S-004', initials: 'SG', name: 'Sunita Gurung', email: 'sunita@autoparts.com', phone: '9803456789', role: 'Staff', department: 'Reception', status: 'Inactive' },
  { id: 'S-005', initials: 'BT', name: 'Bikash Tamang', email: 'bikash@autoparts.com', phone: '9814567890', role: 'Manager', department: 'Inventory', status: 'Active' },
  { id: 'S-006', initials: 'PM', name: 'Puja Maharjan', email: 'puja@autoparts.com', phone: '9825678901', role: 'Staff', department: 'Billing', status: 'Active' },
];

export default function StaffManagement() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getStaffData();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch staff data, using fallback", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaff();
  }, []);

  const staffList = data?.staff || staticStaffData;
  const totalStaff = data?.totalStaff || "6";
  const activeStaff = data?.activeStaff || "5";
  const managersCount = data?.managersCount || "2";
  const inactiveStaff = data?.inactiveStaff || "1";

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff Management</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage employee accounts, roles, and access levels</p>
        </div>
        <button className="bg-[#0f172a] hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} className="stroke-[2.5]" />
          Register New Staff
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <Users size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalStaff}</div>
            <div className="text-sm font-medium text-slate-400">Total Staff</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <UserCheck size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{activeStaff}</div>
            <div className="text-sm font-medium text-slate-400">Active</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <Shield size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{managersCount}</div>
            <div className="text-sm font-medium text-slate-400">Managers</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <UserX size={20} className="stroke-[2]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{inactiveStaff}</div>
            <div className="text-sm font-medium text-slate-400">Inactive</div>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-[17px] font-bold text-slate-900">All Staff Members</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 bg-white">
              <tr>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Staff ID</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Name</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Email</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Phone</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Role</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Department</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Status</th>
                <th scope="col" className="px-6 py-5 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5 font-bold text-slate-400 whitespace-nowrap">{staff.id}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        {staff.initials}
                      </div>
                      <span className="font-bold text-slate-900">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <Mail size={16} className="text-slate-400" />
                      {staff.email}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <Phone size={16} className="text-slate-400" />
                      {staff.phone}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      staff.role === 'Manager' 
                        ? 'bg-orange-50 text-orange-600 border-orange-200/60' 
                        : 'bg-slate-100 text-slate-600 border-slate-200/60'
                    }`}>
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-500 whitespace-nowrap">{staff.department}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      staff.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200/60'
                        : 'bg-rose-50 text-rose-600 border-rose-200/60'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors font-medium text-xs">
                        <Edit size={14} className="stroke-[2.5]" />
                        Edit
                      </button>
                      {staff.status === 'Active' ? (
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-600 transition-colors font-medium text-xs">
                          <UserMinus size={14} className="stroke-[2.5]" />
                          Deactivate
                        </button>
                      ) : (
                        <button className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 transition-colors font-medium text-xs">
                          <UserCheck size={14} className="stroke-[2.5]" />
                          Reactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
