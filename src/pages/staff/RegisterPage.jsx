import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, User, ShieldCheck, ArrowRight, Eye, ChevronDown, CheckCircle, Mail, RefreshCw, X
} from 'lucide-react';
import AuthLayout from '../../layout/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

const StaffRegisterPage = () => {
  const [step, setStep] = useState(1);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const { register, verifyEmail, resendEmail } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    department: 'Sales',
    accessLevel: 'Staff',
    branchLocation: 'Kathmandu — Main Branch'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register({ role: 'Staff', ...formData });
    if (result.success) {
      setShowVerifyModal(true);
      setOtpError('');
    } else {
      alert(result.error);
    }
  };

  const handleRoleSwitch = (role) => {
    if (role === 'Customer') navigate('/customer/register');
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const code = otpCode.join('');
    if (code.length !== 6) {
      setOtpError('Please enter the full 6-digit code.');
      return;
    }
    const result = await verifyEmail(formData.email, code);
    if (result.success) {
      setOtpSuccess('Email verified! Waiting for admin approval...');
      setTimeout(() => navigate('/staff/login'), 2000);
    } else {
      setOtpError(result.error);
    }
  };

  const handleResend = async () => {
    const result = await resendEmail(formData.email);
    if (result.success) {
      setOtpError('');
      setOtpSuccess('New code sent to your email!');
    } else {
      setOtpError(result.error);
    }
  };

  return (
    <AuthLayout variant="staff">
      <div className="flex justify-end mb-16">
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/staff/login" className="font-bold text-[#0F172A] hover:underline flex items-center gap-1 inline-flex">
            Sign In <ArrowRight size={14} />
          </Link>
        </p>
      </div>

      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          {step === 1 ? (
            <>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">NEW ACCOUNT</p>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Create Your Account</h2>
              <p className="text-slate-500 text-sm">Fill in your personal details to get started</p>
            </>
          ) : (
            <>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">EMPLOYMENT DETAILS</p>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Verify Employment</h2>
              <p className="text-slate-500 text-sm">Provide your employment information for access</p>
            </>
          )}
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Step {step} of 2</span>
            <span className={step === 1 ? 'text-[#0F172A]' : ''}>{step === 1 ? 'Personal Info' : 'Employment Info'}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full flex mb-3">
            <div className={`h-full bg-[#0F172A] rounded-full transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
          </div>
          <div className="flex justify-between text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-[#0F172A]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A]"></div>
              Personal Info
            </div>
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#0F172A]' : 'text-slate-300'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${step === 2 ? 'bg-[#0F172A]' : 'bg-slate-300'}`}></div>
              Employment Info
            </div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Role</label>
              <div className="flex gap-4">
                <button type="button" onClick={() => handleRoleSwitch('Customer')} className="flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold bg-white text-slate-600 border-slate-200 hover:border-slate-300">
                  <User size={16} /> Customer
                </button>
                <button type="button" className="flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold bg-[#0F172A] text-white border-[#0F172A]">
                  <ShieldCheck size={16} /> Staff
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Ramesh Thapa" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. ramesh@example.com" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Phone</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📞</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 9841234567" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">City</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📍</span>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Kathmandu" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔒</span>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]" required />
                  <Eye size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Confirm</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔒</span>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]" required />
                  <Eye size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="terms" className="w-4 h-4 rounded text-[#0F172A] border-slate-300" required />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the <a href="#" className="font-semibold text-[#0F172A]">Terms of Service</a> and <a href="#" className="font-semibold text-[#0F172A]">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="w-full bg-[#0F172A] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors mt-8">
              Next: Employment Details <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-4 items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-500">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0F172A]">Employment verification</h4>
                <p className="text-xs text-slate-500">Required to activate your staff account and set permissions</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Employee ID</label>
              <div className="relative">
                <CheckCircle size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="e.g. EMP-2025-042" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Department</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select name="department" value={formData.department} onChange={handleChange} className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-sm appearance-none bg-white focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]">
                    <option>Sales</option>
                    <option>Inventory</option>
                    <option>Management</option>
                    <option>Mechanic</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Access Level</label>
                <div className="relative">
                  <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select name="accessLevel" value={formData.accessLevel} onChange={handleChange} className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-sm appearance-none bg-white focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]">
                    <option>Staff</option>
                    <option>Manager</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Branch / Location</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📍</span>
                <select name="branchLocation" value={formData.branchLocation} onChange={handleChange} className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-sm appearance-none bg-white focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]">
                  <option>Kathmandu — Main Branch</option>
                  <option>Pokhara Branch</option>
                  <option>Lalitpur Branch</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={handleBack} className="w-1/3 border border-slate-200 text-slate-600 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button type="submit" className="w-2/3 bg-[#0F172A] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                <CheckCircle size={18} /> Register
              </button>
            </div>
            <p className="text-center text-xs text-slate-400">Your account will be reviewed by an admin before full activation.</p>
          </form>
        )}
      </div>

      {/* OTP Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowVerifyModal(false)} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#0F172A] rounded-2xl flex items-center justify-center text-white mb-6">
                <div className="relative">
                  <Mail size={32} />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5">
                    <CheckCircle size={14} className="text-[#0F172A]" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">Verify Your Email</h2>
              <p className="text-slate-500 mb-1">We sent a 6-digit code to</p>
              <p className="font-bold text-[#0F172A] mb-8">{formData.email}</p>

              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">ENTER 6-DIGIT CODE</p>

              <div className="flex gap-2 justify-center mb-6 w-full">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={otpCode[i]}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 border-2 border-slate-200 rounded-xl text-center text-2xl font-bold text-[#0F172A] focus:border-[#0F172A] focus:outline-none focus:ring-0"
                  />
                ))}
              </div>

              {otpError && <p className="text-red-500 text-sm mb-4">{otpError}</p>}
              {otpSuccess && <p className="text-green-500 text-sm mb-4">{otpSuccess}</p>}

              <p className="text-sm text-slate-500 mb-8">Code expires in <span className="font-bold text-[#0F172A]">10 minutes</span></p>

              <button onClick={handleVerify} className="w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors mb-6">
                <CheckCircle size={18} /> Verify & Activate Account
              </button>

              <p className="text-sm text-slate-500 mb-8">
                Didn't receive it?{' '}
                <button onClick={handleResend} className="font-bold text-[#0F172A] hover:underline inline-flex items-center gap-1">
                  <RefreshCw size={14} /> Resend
                </button>
              </p>

              <div className="w-full h-px bg-slate-100 mb-6"></div>
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} /> Secured with email verification
              </p>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default StaffRegisterPage;