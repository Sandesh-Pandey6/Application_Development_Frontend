import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import CustomerRegisterPage from './pages/customer/RegisterPage';
import StaffRegisterPage from './pages/staff/RegisterPage';
import UnifiedLoginPage from './pages/auth/LoginPage';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Registration Routes */}
          <Route path="/customer/register" element={<CustomerRegisterPage />} />
          <Route path="/staff/register" element={<StaffRegisterPage />} />
          {/* Note: Admin register is not yet implemented but login supports routing to it */}

          {/* Unified Login Routes */}
          <Route path="/customer/login" element={<UnifiedLoginPage />} />
          <Route path="/staff/login" element={<UnifiedLoginPage />} />
          <Route path="/admin/login" element={<UnifiedLoginPage />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* Other admin routes can be added here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
