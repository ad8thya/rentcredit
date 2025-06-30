import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building2, BarChart, CheckCircle } from 'lucide-react';
import { useUser } from './UserContext';

const GetStarted = () => {
  const navigate = useNavigate();
  const { setRole } = useUser();
  const [selected, setSelected] = useState(null);

  const handleSelect = (role) => {
    setSelected(role);
    setRole(role);
    setTimeout(() => {
      navigate(`/signup/${role}`);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950 px-2 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-muted/30"
        >
          {/* Heading with animated underline */}
          <div className="mb-2">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white text-center mb-1">
              Choose Your Role to Begin
            </h2>
            <motion.div
              layoutId="underline"
              className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ transformOrigin: 'center' }}
            />
          </div>

          {/* Role Cards */}
          <div className="flex flex-col gap-6 mt-4">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 4px 24px 0 rgba(99,102,241,0.10)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('tenant')}
              className={`group flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 shadow hover:shadow-md hover:scale-[1.01] cursor-pointer focus:outline-none ${selected === 'tenant' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-indigo-400'}`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900">
                <BarChart className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Continue as Tenant</span>
                  {selected === 'tenant' && <CheckCircle className="w-5 h-5 text-indigo-500" />}
                </div>
                <ul className="text-sm text-zinc-700 dark:text-zinc-200 space-y-1">
                  <li>• Build CIBIL score from monthly rent payments</li>
                  <li>• Track payment history and share rent reports</li>
                </ul>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 4px 24px 0 rgba(168,85,247,0.10)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect('landlord')}
              className={`group flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 shadow hover:shadow-md hover:scale-[1.01] cursor-pointer focus:outline-none ${selected === 'landlord' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-purple-400'}`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900">
                <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Continue as Landlord</span>
                  {selected === 'landlord' && <CheckCircle className="w-5 h-5 text-purple-500" />}
                </div>
                <ul className="text-sm text-zinc-700 dark:text-zinc-200 space-y-1">
                  <li>• Track rent collection with ease</li>
                  <li>• Provide tenants tools to improve credit</li>
                </ul>
              </div>
            </motion.button>
          </div>

          {/* Centered Logos Section */}
          <div className="flex flex-col items-center justify-center mt-6 space-y-4">
            <p className="text-xs text-muted-foreground dark:text-gray-200 text-center">
              How does this help your credit score? RentCredit reports your rent payments to bureaus, helping you build a financial future.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <img src="/logos/cibil-light.jpg" alt="CIBIL" className="h-6 bg-white dark:bg-zinc-900 rounded shadow p-0.5" />
              <img src="/logos/experian-light.svg" alt="Experian" className="h-6 bg-white dark:bg-zinc-900 rounded shadow p-0.5" />
              <img src="/logos/hdfc.svg.svg" alt="HDFC" className="h-6 bg-white dark:bg-zinc-900 rounded shadow p-0.5" />
            </div>
          </div>
        </motion.div>

        {/* Right Section: CIBIL Score Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-2xl shadow-lg p-8 min-h-[420px] border border-muted/30"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-xs mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 flex flex-col items-center"
          >
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-2">CIBIL Score Trend</span>
            <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-32">
              {/* Axes */}
              <line x1="32" y1="8" x2="32" y2="104" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="32" y1="104" x2="220" y2="104" stroke="#CBD5E1" strokeWidth="2" />
              {/* Line Chart Path */}
              <motion.path
                d="M32 104 Q60 90 80 80 Q110 60 140 70 Q170 90 200 40"
                stroke="url(#scoreGradient)"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="32" y1="104" x2="200" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#a21caf" />
                </linearGradient>
              </defs>
              {/* Dots */}
              <circle cx="32" cy="104" r="4" fill="#6366f1" />
              <circle cx="80" cy="80" r="4" fill="#6366f1" />
              <circle cx="140" cy="70" r="4" fill="#a21caf" />
              <circle cx="200" cy="40" r="4" fill="#22d3ee" />
              {/* Labels */}
              <text x="32" y="116" fontSize="10" fill="#64748b">0</text>
              <text x="80" y="116" fontSize="10" fill="#64748b">6 mo</text>
              <text x="140" y="116" fontSize="10" fill="#64748b">12 mo</text>
              <text x="200" y="116" fontSize="10" fill="#64748b">18 mo</text>
              <text x="10" y="104" fontSize="10" fill="#64748b">620</text>
              <text x="10" y="40" fontSize="10" fill="#64748b">750</text>
            </svg>
            <div className="flex justify-between w-full mt-2 text-xs text-zinc-500 dark:text-zinc-300">
              <span>Months</span>
              <span>Score</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">750</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-300">(after 18 months)</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted; 