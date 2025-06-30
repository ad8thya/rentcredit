import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import AuthHeader from './AuthHeader';

export default function SignIn() {
  const [email, setEmail] = useState('demo@rentcredit.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('tenant');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password, role);
      toast.success('Signed in successfully!');
      navigate(`/dashboard/${role}`);
    } catch (err) {
      toast.error(err.message || 'Failed to sign in.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-neutral-950 flex flex-col items-center justify-center p-4">
      <AuthHeader />
      <div className="flex-grow flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl p-8 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to RentCredit</h2>
          </div>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sign in as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 