import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Home } from 'lucide-react';
import { useUser } from './UserContext';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { selectRole } = useUser();

  const handleSelect = (role) => {
    selectRole(role);
    navigate(`/signup/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col gap-8 items-center"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Get Started</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Choose your role to continue:</p>
        <div className="flex flex-col gap-6 w-full">
          <button
            onClick={() => handleSelect('tenant')}
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-indigo-50 dark:bg-zinc-800 hover:bg-indigo-100 dark:hover:bg-zinc-700 shadow transition group"
          >
            <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition" />
            <span className="font-medium text-lg text-gray-900 dark:text-white">Continue as Tenant</span>
          </button>
          <button
            onClick={() => handleSelect('landlord')}
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-purple-50 dark:bg-zinc-800 hover:bg-purple-100 dark:hover:bg-zinc-700 shadow transition group"
          >
            <Home className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition" />
            <span className="font-medium text-lg text-gray-900 dark:text-white">Continue as Landlord</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection; 