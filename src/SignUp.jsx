import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, XCircle, User, Mail, Phone, Lock } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { auth, db } from './firebase';
import Header from './Header';

const passwordCriteria = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'At least 1 number', test: (pw) => /\d/.test(pw) },
  { label: 'At least 1 special character', test: (pw) => /[!@#$%^&*]/.test(pw) },
  { label: 'At least 1 uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
];

function getPasswordStrength(password) {
  const passed = passwordCriteria.map((c) => c.test(password));
  const score = passed.filter(Boolean).length;
  if (score <= 1) return { label: 'Weak', color: 'bg-red-500' };
  if (score === 2 || score === 3) return { label: 'Moderate', color: 'bg-yellow-400' };
  return { label: 'Strong', color: 'bg-green-500' };
}

export default function SignUp() {
  const navigate = useNavigate();
  const { user, role: userRole } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: 'tenant',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  // React.useEffect(() => {
  //   if (user && userRole) {
  //     navigate(`/dashboard/${userRole}`);
  //   }
  // }, [user, userRole, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Full name is required.';
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) return 'Enter a valid email.';
    if (!/^\d{10}$/.test(form.mobile)) return 'Enter a valid 10-digit mobile number.';
    if (!form.password) return 'Password is required.';
    if (getPasswordStrength(form.password).label === 'Weak') return 'Password is too weak.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    try {
      // Create user in Firebase Auth
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      // Store user info in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        role: form.role,
        createdAt: new Date(),
      });
      // AuthContext will handle redirect
    } catch (err) {
      setError(err.message.replace('Firebase:', '').replace('auth/', '').replace(/-/g, ' '));
    } finally {
      setSubmitting(false);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);
  const passedCriteria = passwordCriteria.map((c) => c.test(form.password));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Create your RentCredit account</h2>
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Name */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-neutral-800/70 focus:bg-white dark:focus:bg-neutral-900/80 border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition-all"
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
            </motion.div>
            {/* Email */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-neutral-800/70 focus:bg-white dark:focus:bg-neutral-900/80 border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition-all"
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>
            </motion.div>
            {/* Mobile */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-neutral-800/70 focus:bg-white dark:focus:bg-neutral-900/80 border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition-all"
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                />
              </div>
            </motion.div>
            {/* Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border-2 bg-white/70 dark:bg-neutral-800/70 focus:bg-white dark:focus:bg-neutral-900/80 border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition-all"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password Strength Bar */}
              <div className="mt-2">
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <motion.div
                    className={`h-2 rounded-full ${passwordStrength.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(passedCriteria.filter(Boolean).length / 4) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="text-xs mt-1 font-bold" style={{ color: passwordStrength.color === 'bg-red-500' ? '#ef4444' : passwordStrength.color === 'bg-yellow-400' ? '#facc15' : '#22c55e' }}>
                  {form.password && passwordStrength.label}
                </div>
                <ul className="text-xs space-y-1 mt-2">
                  {passwordCriteria.map((c, i) => (
                    <li key={c.label} className="flex items-center gap-1">
                      {passedCriteria[i] ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                      {c.label}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            {/* Role Selection */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-2">Sign up as</label>
              <div className="flex gap-4">
                <label className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all ${form.role === 'tenant' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-slate-200 dark:border-slate-600'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="tenant"
                    checked={form.role === 'tenant'}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  Tenant
                </label>
                <label className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all ${form.role === 'landlord' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-slate-200 dark:border-slate-600'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="landlord"
                    checked={form.role === 'landlord'}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  Landlord
                </label>
              </div>
            </motion.div>
            {/* Error Message */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500 text-sm mt-2">
                <XCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
              style={{ boxShadow: '0 4px 24px 0 rgba(99, 102, 241, 0.15)' }}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>Create Account</>
              )}
            </motion.button>
          </form>
          <div className="text-center mt-6">
            <span className="text-slate-600 dark:text-slate-400">Already have an account? </span>
            <Link to="/signin" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium transition-colors">Sign In</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 