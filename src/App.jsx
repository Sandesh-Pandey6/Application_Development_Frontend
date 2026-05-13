import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import CustomerRegisterPage from './pages/customer/RegisterPage';
import StaffRegisterPage from './pages/staff/RegisterPage';
import UnifiedLoginPage from './pages/auth/LoginPage';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import PartsInventory from './pages/admin/PartsInventory';
import StaffManagement from './pages/admin/StaffManagement';
import PurchaseInvoices from './pages/admin/PurchaseInvoices';
import FinancialReports from './pages/admin/FinancialReports';
import InventoryReports from './pages/admin/InventoryReports';
import Notifications from './pages/admin/Notifications';

// Customer features
import BookAppointment from './pages/customer/appointments/BookAppointment';
import AppointmentHistory from './pages/customer/appointments/AppointmentHistory';
import RequestPart from './pages/customer/parts/RequestPart';
import PartRequestHistory from './pages/customer/parts/PartRequestHistory';
import AddReview from './pages/customer/reviews/AddReview';
import PurchaseHistory from './pages/customer/history/PurchaseHistory';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Registration Routes */}
          <Route path="/customer/register" element={<CustomerRegisterPage />} />
          <Route path="/staff/register" element={<StaffRegisterPage />} />

          {/* Customer Routes */}
          <Route path="/customer/book-appointment" element={<BookAppointment />} />
          <Route path="/customer/appointments" element={<AppointmentHistory />} />
          <Route path="/customer/request-part" element={<RequestPart />} />
          <Route path="/customer/part-requests" element={<PartRequestHistory />} />
          <Route path="/customer/add-review" element={<AddReview />} />
          <Route path="/customer/history" element={<PurchaseHistory />} />

          {/* Unified Login Routes */}
          <Route path="/customer/login" element={<UnifiedLoginPage />} />
          <Route path="/staff/login" element={<UnifiedLoginPage />} />
          <Route path="/admin/login" element={<UnifiedLoginPage />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="parts" element={<PartsInventory />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="invoices" element={<PurchaseInvoices />} />
            <Route path="financial-reports" element={<FinancialReports />} />
            <Route path="inventory-reports" element={<InventoryReports />} />
            <Route path="notifications" element={<Notifications />} />
            {/* Other admin routes can be added here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;