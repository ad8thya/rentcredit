import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Home, CreditCard, CheckCircle, ArrowRight, Building2, ShieldCheck, TrendingUp, HelpCircle, Clock, Banknote, Lock } from 'lucide-react';
import Header from './Header';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: <User className="w-8 h-8 text-indigo-600" />, title: 'Sign Up',
    desc: `Join RentCredit as a tenant or landlord. It's fast and easy.`
  },
  {
    icon: <Home className="w-8 h-8 text-purple-600" />, title: 'Add Property & Tenant',
    desc: 'Link your property and verify tenant information.'
  },
  {
    icon: <CreditCard className="w-8 h-8 text-blue-500" />, title: 'Pay/Collect Rent',
    desc: 'Rent is paid as usual — no changes in your process.'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-500" />, title: 'We Report to Credit Bureaus',
    desc: 'RentCredit reports timely payments to help boost tenant credit scores.'
  },
];

const benefits = [
  {
    icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
    title: 'Improve Credit History',
    desc: 'On-time rent payments help build your credit profile.'
  },
  {
    icon: <Banknote className="w-8 h-8 text-green-500" />,
    title: 'Get Rewarded for On-Time Payments',
    desc: 'Earn recognition and rewards for consistent, timely rent.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
    title: 'Build Trust',
    desc: 'Strengthen relationships between landlords and tenants.'
  },
];

const faqs = [
  {
    q: 'Does it affect my rent process?',
    a: 'No, you pay or collect rent as usual. RentCredit works in the background to report your payments.'
  },
  {
    q: 'How soon will I see a credit impact?',
    a: 'Most users see credit impact within 1-2 months of consistent, on-time rent payments.'
  },
  {
    q: 'Which credit bureaus do you report to?',
    a: 'We report to major Indian credit bureaus including CIBIL, Experian, and more.'
  },
  {
    q: 'Is it secure?',
    a: 'Yes, we use bank-level encryption and never share your data without consent.'
  },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex-1 flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-left">How RentCredit Works</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 text-left">Turn your rent payments into a credit-building superpower.</p>
          <Link to="/signup" className="px-6 py-3 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow mt-2">Get Started</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 flex justify-center items-center relative w-full max-w-md mx-auto md:mx-0">
          {/* Soft radial background glow */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-radial from-indigo-200/60 via-purple-100/60 to-white/0 dark:from-indigo-900/60 dark:via-purple-900/40 dark:to-zinc-900/0 blur-2xl opacity-80"></div>
          </div>
          {/* Modern SVG Illustration */}
          <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-56 h-56 md:w-80 md:h-80">
            <rect x="40" y="120" width="240" height="120" rx="32" fill="#EDE9FE" />
            <rect x="70" y="150" width="180" height="60" rx="16" fill="#C7D2FE" />
            <rect x="110" y="170" width="100" height="20" rx="8" fill="#A5B4FC" />
            {/* Upward arrow for credit improvement */}
            <path d="M160 170 L160 110" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
            <polygon points="160,100 152,115 168,115" fill="#7C3AED" />
            {/* Coin/rent payment icons */}
            <circle cx="90" cy="210" r="12" fill="#A78BFA" />
            <circle cx="230" cy="210" r="12" fill="#A78BFA" />
            <rect x="150" y="210" width="20" height="12" rx="6" fill="#C4B5FD" />
            {/* Credit score badge */}
            <rect x="200" y="80" width="60" height="32" rx="16" fill="#7C3AED" />
            <text x="230" y="102" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">750</text>
            <text x="230" y="118" textAnchor="middle" fontSize="10" fill="#ede9fe">CIBIL</text>
          </svg>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">How It Works: Step by Step</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center backdrop-blur-md"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Why Use RentCredit?</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center backdrop-blur-md"
            >
              <div className="mb-4">{b.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{b.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Frequently Asked Questions</motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * i }}>
              <button
                className="w-full flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-neutral-900/80 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
                <ArrowRight className={`w-5 h-5 ml-2 transition-transform ${openFaq === i ? 'rotate-90 text-indigo-600' : 'text-gray-400'}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 py-2 px-6' : 'max-h-0 py-0 px-6'}`}
                style={{ color: 'var(--tw-prose-body)' }}
              >
                {openFaq === i && <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.a}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 text-white text-center mt-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Credit?</motion.h2>
        <p className="text-lg mb-8">Join RentCredit today and unlock new financial opportunities.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="px-8 py-3 rounded-xl font-medium border border-white bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors duration-200">Sign Up Now</Link>
          <Link to="/get-started" className="px-8 py-3 rounded-xl font-medium border border-white bg-transparent text-white hover:bg-white hover:text-indigo-700 transition-colors duration-200">Learn More</Link>
        </div>
      </section>
    </div>
  );
} 