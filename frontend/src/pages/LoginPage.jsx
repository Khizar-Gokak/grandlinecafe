import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User, Compass, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, user, isLoggedIn } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Extract redirect state if user was sent here when trying to reserve
  const fromPath = location.state?.from || '/';
  const shouldOpenModal = location.state?.openModal || false;
  const redirectMessage = location.state?.message || 'Please log in first to reserve a table.';

  // If already logged in, redirect immediately
  useEffect(() => {
    if (isLoggedIn) {
      navigate(user?.role === 'admin' ? '/admin' : fromPath, { replace: true, state: { openModal: shouldOpenModal } });
    }
  }, [isLoggedIn, navigate, fromPath, shouldOpenModal, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSuccessRedirect = (loggedInUser) => {
    toast.success(isSignUp ? 'Account created successfully! Welcome aboard ⚓' : 'Welcome back to Grand Line Café! ☕');
    const destination = loggedInUser?.role === 'admin' ? '/admin' : fromPath;
    navigate(destination, { replace: true, state: { openModal: shouldOpenModal } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!formData.name.trim()) {
          throw new Error('Please enter your full name');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        const loggedInUser = await register(formData.name, formData.email, formData.password);
        handleSuccessRedirect(loggedInUser);
      } else {
        if (!formData.email || !formData.password) {
          throw new Error('Please enter both email and password');
        }
        const loggedInUser = await login(formData.email, formData.password);
        handleSuccessRedirect(loggedInUser);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your details.');
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1E5] text-[#3D281D] pt-24 pb-20 px-4 flex flex-col justify-center items-center page-enter">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-[#EFE2CC]/80 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE2CC] shadow-warm-lg z-10"
      >
        {/* Reservation Notice Banner */}
        {(location.state?.from === '/reservations' || location.state?.from === '/checkout') && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FAF6EE] border border-[#D6A85F]/50 flex items-start gap-3 text-left">
            <AlertCircle size={20} className="text-[#D6A85F] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-xs uppercase tracking-wider text-[#9A6A45] font-bold">
                Table Reservation Required
              </h4>
              <p className="font-body text-xs text-[#5A4030] mt-0.5 leading-relaxed">
                {redirectMessage}
              </p>
            </div>
          </div>
        )}

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#D6A85F] to-[#E6BD7B] mx-auto mb-3 shadow-sm overflow-hidden">
            <img src="/grand_line_logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="font-pirate text-3xl text-[#3D281D]">
            {isSignUp ? 'JOIN THE CREW' : 'WELCOME BACK'}
          </h2>
          <p className="font-accent italic text-xs sm:text-sm text-[#7A4F30] mt-1">
            {isSignUp
              ? 'Create an account to reserve tables, order food, and earn rewards.'
              : 'Log in to your Grand Line Café account to manage bookings.'}
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#FAF6EE] border border-[#EFE2CC] mb-6">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(''); }}
            className={`py-2.5 rounded-xl font-display text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              !isSignUp ? 'bg-white text-[#3D281D] shadow-sm font-bold' : 'text-[#7A4F30] hover:text-[#3D281D]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
            className={`py-2.5 rounded-xl font-display text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              isSignUp ? 'bg-white text-[#3D281D] shadow-sm font-bold' : 'text-[#7A4F30] hover:text-[#3D281D]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-body flex items-center gap-2">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A6A45]" />
                <input
                  type="text"
                  name="name"
                  required={isSignUp}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Captain Luffy"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl input-pirate text-xs"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A6A45]" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="pirate@grandline.cafe"
                className="w-full pl-10 pr-4 py-3 rounded-2xl input-pirate text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A6A45]" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl input-pirate text-xs"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-[11px] font-display uppercase tracking-wider text-[#9A6A45] font-semibold mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A6A45]" />
                <input
                  type="password"
                  name="confirmPassword"
                  required={isSignUp}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl input-pirate text-xs"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60 mt-2"
          >
            {isSignUp ? <UserPlus size={16} /> : <LogIn size={16} />}
            <span>{loading ? 'Authenticating...' : isSignUp ? 'Create Account & Continue' : 'Log In & Continue'}</span>
          </button>
        </form>

      </motion.div>
    </div>
  );
}
