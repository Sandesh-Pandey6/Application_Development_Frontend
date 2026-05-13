import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Eye, ArrowRight } from 'lucide-react';
import AuthLayout from '../../layout/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync role with URL
  useEffect(() => {
    if (location.pathname.includes('staff')) setRole('Staff');
    else if (location.pathname.includes('admin')) setRole('Admin');
    else setRole('Customer');
  }, [location.pathname]);

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setError('');
    if (newRole === 'Customer') navigate('/customer/login');
    if (newRole === 'Staff') navigate('/staff/login');
    if (newRole === 'Admin') navigate('/admin/login');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ email, password, role, rememberMe });

    if (result.success) {
      // Redirect based on role
      if (result.role === 'Admin') navigate('/admin/dashboard');
      else if (result.role === 'Staff') navigate('/staff/dashboard');
      else navigate('/customer/dashboard');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const getRegisterLink = () => {
    if (role === 'Staff') return '/staff/register';
    return '/customer/register';
  };

  return (
    <AuthLayout variant="login">
      <div className="flex justify-end mb-16">
        <p className="text-sm text-slate-500">
          No account?{' '}
          <Link to={getRegisterLink()} className="font-bold text-[#0F172A] hover:underline flex items-center gap-1 inline-flex">
            Register <ArrowRight size={14} />
          </Link>
        </p>
      </div>

      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">WELCOME BACK</p>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Sign in to your account</h2>
          <p className="text-slate-500 text-sm">Enter your credentials to access your dashboard</p>
        </div>

        {/* Role Toggle */}
        <div className="bg-slate-50 p-1 rounded-xl flex mb-8">
          {['Customer', 'Staff', 'Admin'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleSwitch(r)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === r ? 'bg-white text-[#0F172A] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh.thapa@gmail.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold text-slate-500 hover:text-[#0F172A] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]"
                required
              />
              <Eye size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#0F172A] border-slate-300"
            />
            <label htmlFor="remember" className="text-sm text-slate-600">
              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0F172A] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            New here?{' '}
            <Link to={getRegisterLink()} className="font-bold text-[#0F172A] hover:underline">
              Create an account
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 mt-10 max-w-xs mx-auto">
            By signing in, you agree to our{' '}
            <a href="#" className="hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;