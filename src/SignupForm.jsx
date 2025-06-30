import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext.jsx';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  CreditCard, 
  Eye, 
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import rentCreditLogo from '../public/logos/experian-light.svg'; // Placeholder, replace with actual logo if available

const validateMobile = (mobile) => /^\d{10}$/.test(mobile);
const validateEmail = (email) => /.+@.+\..+/.test(email);

const SignupForm = ({ role }) => {
  const { signup } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    id: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'Weak', color: 'bg-red-500', tips: [false, false, false, false, false] });

  // Password requirements check
  const checkPasswordStrength = (password) => {
    const requirements = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[!@#$%^&*]/.test(password),
    ];
    const score = requirements.filter(Boolean).length;
    let label = 'Weak', color = 'bg-red-500';
    if (score >= 4) { label = 'Strong'; color = 'bg-green-500'; }
    else if (score >= 3) { label = 'Moderate'; color = 'bg-yellow-400'; }
    return { score, label, color, tips: requirements };
  };

  // Update password strength on change
  React.useEffect(() => {
    setPasswordStrength(checkPasswordStrength(form.password));
  }, [form.password]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!validateEmail(form.email)) errs.email = 'Enter a valid email';
    if (!validateMobile(form.mobile)) errs.mobile = 'Enter a valid 10-digit mobile number';
    if (!form.password || passwordStrength.score < 3) errs.password = 'Password is too weak';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        signup(role, form);
        navigate(`/dashboard/${role}`);
      }, 800);
    }
  };

  const handleThirdPartyAuth = (provider) => {
    // Mock third-party authentication
    console.log(`Signing up with ${provider}`);
    setSubmitting(true);
    setTimeout(() => {
      signup(role, { ...form, email: `demo@${provider}.com`, name: 'Demo User' });
      navigate(`/dashboard/${role}`);
    }, 1000);
  };

  const getFieldIcon = (fieldName) => {
    const icons = {
      name: User,
      email: Mail,
      mobile: Phone,
      password: Lock,
      id: CreditCard
    };
    return icons[fieldName];
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      name: 'Full Name',
      email: 'Email Address',
      mobile: 'Mobile Number',
      password: 'Password',
      id: 'PAN or Aadhar (Optional)'
    };
    return labels[fieldName];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8"
      >
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Header with Logo and Tagline */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/80 dark:bg-neutral-900/80 rounded-2xl mb-4 shadow-lg ring-2 ring-indigo-200 dark:ring-indigo-700 backdrop-blur-md"
            >
              {/* Placeholder SVG logo, replace src with actual RentCredit logo if available */}
              <img src="/logos/rentcredit-transparent.png" alt="RentCredit Logo" className="w-14 h-14 object-contain invert-0 dark:invert" />
            </motion.div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Join RentCredit
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base mb-2">
              Trusted by major banks. Build your credit effortlessly with RentCredit.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {role === 'tenant' ? 'Build credit through rent payments' : 'Streamline rent collection'}
            </p>
          </div>

          {/* Main Form Card with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-white/40 dark:bg-neutral-900/60 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-slate-900 dark:text-white glass-card"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
          >
            {/* Third-party Auth Section */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="space-y-3">
                <button
                  onClick={() => handleThirdPartyAuth('google')}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-medium py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 transition-all duration-200 hover:shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                
                <button
                  onClick={() => handleThirdPartyAuth('phone')}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-medium py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 transition-all duration-200 hover:shadow-md"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                  Continue with Phone
                </button>
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">or continue with email</span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {['name', 'email', 'mobile', 'password'].map((fieldName, index) => {
                const Icon = getFieldIcon(fieldName);
                const isActive = activeField === fieldName;
                const hasError = errors[fieldName];
                return (
                  <motion.div
                    key={fieldName}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-slate-700 dark:text-white mb-2">
                      {getFieldLabel(fieldName)}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                        hasError ? 'text-red-500' : isActive ? 'text-indigo-500' : 'text-slate-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <input
                        name={fieldName}
                        type={fieldName === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                        value={form[fieldName]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(fieldName)}
                        onBlur={() => setActiveField('')}
                        maxLength={fieldName === 'mobile' ? 10 : undefined}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white/70 dark:bg-neutral-800/70 focus:bg-white dark:focus:bg-neutral-900/80 focus:backdrop-blur-md ${
                          hasError 
                            ? 'border-red-300 bg-red-50 dark:bg-red-900/20 focus:border-red-500' 
                            : isActive 
                              ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 focus:border-indigo-500'
                              : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:border-indigo-500'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-400/40 hover:shadow-md`}
                        placeholder={getFieldLabel(fieldName)}
                      />
                      {fieldName === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      )}
                    </div>
                    {/* Password requirements and strength bar */}
                    {fieldName === 'password' && (
                      <div className="mt-2">
                        <ul className="text-xs space-y-1 mb-2 text-slate-500 dark:text-slate-300">
                          <li className="flex items-center gap-1">
                            {passwordStrength.tips[0] ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : <span className="inline-block w-4 h-4" />} Minimum 8 characters
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordStrength.tips[1] ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : <span className="inline-block w-4 h-4" />} At least one uppercase letter
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordStrength.tips[2] ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : <span className="inline-block w-4 h-4" />} At least one lowercase letter
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordStrength.tips[3] ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : <span className="inline-block w-4 h-4" />} At least one number
                          </li>
                          <li className="flex items-center gap-1">
                            {passwordStrength.tips[4] ? <CheckCircle className="w-4 h-4 text-green-500 inline" /> : <span className="inline-block w-4 h-4" />} At least one special character (!@#$%^&*)
                          </li>
                        </ul>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <motion.div
                            className={`h-2 rounded-full ${passwordStrength.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                        <div className="text-xs mt-1 font-bold" style={{ color: passwordStrength.color === 'bg-red-500' ? '#ef4444' : passwordStrength.color === 'bg-yellow-400' ? '#facc15' : '#22c55e' }}>
                          {form.password && passwordStrength.label}
                        </div>
                      </div>
                    )}
                    {hasError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-sm mt-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {hasError}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={submitting}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
                style={{ boxShadow: '0 4px 24px 0 rgba(99, 102, 241, 0.15)' }}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>
          </motion.div>

          {/* Partner Logos Row */}
          <div className="flex flex-row items-center justify-center gap-8 mt-8 mb-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="/logos/cibil-light.jpg" alt="CIBIL" className="h-8 w-auto object-contain" />
            <img src="/logos/experian-light.svg" alt="Experian" className="h-8 w-auto object-contain" />
            <img src="/logos/hdfc.svg.svg" alt="HDFC" className="h-8 w-auto object-contain" />
          </div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <button
              onClick={() => navigate('/')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </motion.div>
        </div>

        {/* Right: Illustration Section (Desktop only) */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center">
          {/* Placeholder illustration, replace with actual credit graph/app screenshot/testimonial as needed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-md p-8 flex flex-col items-center justify-center"
          >
            <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="30" width="200" height="120" rx="24" fill="#EEF2FF" />
              <rect x="30" y="50" width="160" height="80" rx="16" fill="#C7D2FE" />
              <path d="M50 110 Q80 80 110 120 Q140 160 170 90" stroke="#6366F1" strokeWidth="4" fill="none" />
              <circle cx="50" cy="110" r="6" fill="#6366F1" />
              <circle cx="110" cy="120" r="6" fill="#6366F1" />
              <circle cx="170" cy="90" r="6" fill="#6366F1" />
            </svg>
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-slate-700 dark:text-white">Track your credit growth</p>
              <p className="text-slate-500 dark:text-slate-300 text-sm mt-1">See your rent payments boost your credit score, month after month.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm; 