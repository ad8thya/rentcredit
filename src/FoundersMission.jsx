import React from 'react';
import { motion } from 'framer-motion';

const FoundersMission = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="w-full py-16 px-6 md:px-12 bg-secondary/60 dark:bg-zinc-900 border border-muted/40 rounded-xl shadow-md mb-12 transition-colors duration-300 p-8 md:p-12"
    >
      <div className="max-w-3xl mx-auto flex flex-col lg:flex-row items-center gap-8 relative">
        {/* Vertical accent bar */}
        <div className="hidden lg:block absolute left-0 top-8 bottom-8 w-2 rounded-full bg-gradient-to-b from-indigo-400 via-purple-400 to-fuchsia-400 opacity-70" />
        {/* Avatar and tag */}
        <div className="flex flex-col items-center lg:items-start z-10">
          <img
            src="/logos/adithya.jpeg"
            className="w-32 h-32 rounded-full border-4 border-zinc-200 dark:border-zinc-800 shadow-lg mb-3"
          />
        </div>
        {/* Text */}
        <div className="text-center lg:text-left space-y-4 flex-1 z-10">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Our Vision for India</h2>
          <p className="text-lg italic text-zinc-700 dark:text-white/80">A message from the founder</p>
          <p className="text-base md:text-lg text-zinc-800 dark:text-white/90">
            RentCredit began as a personal mission to help people build credit without debt. I believe your rent - your biggest monthly expense - should work for you, not against you. Everyone, regardless of their financial background, deserves the opportunity to build their dreams without the burden of debt.
          </p>
          <p className="text-sm text-right text-zinc-500 dark:text-white/60">– Adithya Sivakumar, Founder</p>
        </div>
      </div>
    </motion.section>
  );
};

export default FoundersMission; 