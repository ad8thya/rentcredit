import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTheme } from './ThemeContext'
import FoundersMission from './FoundersMission';
import TenantDashboard from './TenantDashboard';
import LandlordDashboard from './LandlordDashboard';
import SignupForm from './SignupForm';
import { TrendingUp, ShieldCheck, ReceiptText, FileText, Bell, BarChart2, UserCheck, Lock, Sun, Moon, CheckCircle, BarChart, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import GetStarted from './GetStarted';
import RoleSelection from './RoleSelection';
import SignIn from './SignIn';
import HowItWorks from './HowItWorks';
import rentCreditLogo from '/logos/rentcredit-transparent.png';
import { DashboardProvider } from './contexts/DashboardContext';
import { Toaster } from 'react-hot-toast';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
    >
      {theme === 'light' ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
};

// Navbar Component
export const Navbar = () => (
  <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
          <img src={rentCreditLogo} alt="RentCredit Logo" className="h-8 w-auto invert-0 dark:invert" />
          <span className="text-xl font-semibold">RentCredit</span>
        </Link>
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link to="/signin" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
            Sign In
          </Link>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors duration-300">
            <Link to="/get-started" className="block w-full h-full">Get Started</Link>
          </button>
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  </nav>
)

const AuroraGlow = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none">
    <div className="w-full h-full bg-gradient-radial from-indigo-400/60 via-blue-300/40 to-purple-400/40 dark:from-purple-800/70 dark:via-fuchsia-700/40 dark:to-indigo-900/60 blur-[90px] opacity-80" />
  </div>
);

const bankPlaceholder = (
  <svg viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-14 w-auto">
    <rect x="4" y="16" width="56" height="32" rx="6" fill="#e5e7eb"/>
    <rect x="12" y="24" width="8" height="16" rx="2" fill="#cbd5e1"/>
    <rect x="28" y="24" width="8" height="16" rx="2" fill="#cbd5e1"/>
    <rect x="44" y="24" width="8" height="16" rx="2" fill="#cbd5e1"/>
    <rect x="20" y="12" width="24" height="8" rx="4" fill="#cbd5e1"/>
  </svg>
);

const trustedLogos = [
  {
    name: 'CIBIL',
    alt: 'CIBIL',
    svg: bankPlaceholder,
  },
  {
    name: 'Experian',
    alt: 'Experian',
    svg: bankPlaceholder,
  },
  {
    name: 'HDFC Bank',
    alt: 'HDFC Bank',
    svg: bankPlaceholder,
  },
  {
    name: 'ICICI Bank',
    alt: 'ICICI Bank',
    svg: bankPlaceholder,
  },
  {
    name: 'Razorpay',
    alt: 'Razorpay',
    url: 'https://cdn.simpleicons.org/razorpay/1A1A1A/ffffff',
  },
  {
    name: 'Paytm',
    alt: 'Paytm',
    url: 'https://cdn.simpleicons.org/paytm/1A1A1A/ffffff',
  },
  {
    name: 'PhonePe',
    alt: 'PhonePe',
    url: 'https://cdn.simpleicons.org/phonepe/1A1A1A/ffffff',
  },
  {
    name: 'BankBazaar',
    alt: 'BankBazaar',
    svg: bankPlaceholder,
  },
  {
    name: 'Kotak Mahindra',
    alt: 'Kotak Mahindra',
    svg: bankPlaceholder,
  },
];

function TrustedByScroller() {
  // List of logo files and their alt text
  const logos = [
    { src: "/logos/razorpay.svg.svg", alt: "Razorpay logo" },
    { src: "/logos/hdfc.svg.svg", alt: "HDFC Bank logo" },
    { src: "/logos/icici.svg.svg", alt: "ICICI Bank logo" },
    { src: "/logos/paytm.svg.svg", alt: "Paytm logo" },
    { src: "/logos/phonepe.svg.svg", alt: "PhonePe logo" },
  ];
  // Duplicate for seamless scroll
  const allLogos = [...logos, ...logos];
  return (
    <section className="w-full flex flex-col items-center py-8 select-none">
      <h3 className="text-sm md:text-base text-muted-foreground font-medium mb-4 text-center">
        <span className="text-lg md:text-xl font-semibold text-center text-muted-foreground dark:text-white">
          Trusted by India's Leading Financial Institutions
        </span>
      </h3>
      <div
        className="relative w-full overflow-x-hidden"
        aria-label="Trusted by India's Top Institutions"
      >
        <div
          className={
            `flex items-center whitespace-nowrap will-change-transform` +
            ` gap-2 md:gap-0 animate-logo-scroll`
          }
          style={{ animationPlayState: 'running' }}
        >
          {allLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center px-2 md:px-6">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto object-contain mx-2 md:mx-6 opacity-80 hover:opacity-100 hover:scale-105 transition duration-300 ease-in-out"
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>
        {/* Mobile fallback: allow manual scroll if needed */}
        <div className="absolute inset-0 pointer-events-none block sm:hidden bg-gradient-to-r from-white via-transparent to-white dark:from-zinc-950 dark:to-zinc-950 opacity-60" />
      </div>
      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-scroll {
          animation: logo-scroll 28s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-logo-scroll {
            animation-duration: 48s;
          }
        }
      `}</style>
    </section>
  );
}

const HeroSection = () => (
  <section className="relative py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
    <AuroraGlow />
    {/* Blurred RentCredit logo background */}
    <img
      src="/logos/rentcredit-transparent.png"
      alt="RentCredit Logo Background"
      className="absolute left-1/2 top-6 -translate-x-1/2 w-[440px] h-[440px] md:w-[600px] md:h-[600px] opacity-40 z-0 blur-lg dark:invert pointer-events-none select-none"
      aria-hidden="true"
    />
    <div className="max-w-3xl mx-auto text-center space-y-6 px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex items-center justify-center gap-3"
      >
        <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-purple-400" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Build Credit Through Rent Payments
        </h1>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
      >
        Turn your monthly rent into credit history. RentCredit reports your on-time payments to major credit bureaus, helping you build a stronger financial future.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex flex-col gap-4 items-center justify-center mt-6"
      >
        <Link to="/get-started" className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors duration-300 text-center hover:scale-[1.01] hover:shadow-xl transition-transform duration-300">
          Start Building Credit
        </Link>
      </motion.div>
    </div>
    <div className="w-full border-t border-muted/30 mt-16" />
  </section>
);

// Info Card Component
const InfoCard = ({ title, description, features }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
)

// Info Section Component
const InfoSection = () => {
  const cards = [
    {
      icon: <ReceiptText className="w-6 h-6 text-indigo-500 dark:text-purple-400" />,
      title: "For Renters in India",
      subtitle: "Turn rent payments into progress",
      features: [
        { icon: <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />, text: <>We report your rent payments to credit bureaus</> },
        { icon: <BarChart className="w-5 h-5 text-blue-500 dark:text-fuchsia-400" />, text: <>Track your <span className="text-primary font-semibold">CIBIL score</span> growth</> },
        { icon: <Bell className="w-5 h-5 text-purple-500 dark:text-indigo-300" />, text: <>Get SMS and email payment reminders</> },
        { icon: <ReceiptText className="w-5 h-5 text-indigo-500 dark:text-purple-400" />, text: <>Download rent receipts instantly</> },
      ]
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-blue-500 dark:text-fuchsia-400" />,
      title: "Boost Your CIBIL Score",
      subtitle: "Build trust with lenders through consistent rent payments",
      features: [
        { icon: <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />, text: <>Works with India's top credit bureaus</> },
        { icon: <BarChart className="w-5 h-5 text-blue-500 dark:text-fuchsia-400" />, text: <>Shows rent payments as positive history</> },
        { icon: <BarChart2 className="w-5 h-5 text-indigo-500 dark:text-purple-400" />, text: <>Can improve your <span className="text-primary font-semibold">credit eligibility</span></> },
        { icon: <TrendingUp className="w-5 h-5 text-purple-500 dark:text-indigo-300" />, text: <>Tools to track your score growth</> },
      ]
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500 dark:text-green-400" />,
      title: "Safe & Transparent Data Practices",
      subtitle: "Built with privacy-first by a student founder",
      features: [
        { icon: <ShieldCheck className="w-5 h-5 text-green-500 dark:text-green-400" />, text: <>Your data stays encrypted and private</> },
        { icon: <Lock className="w-5 h-5 text-purple-500 dark:text-purple-400" />, text: <>No access to your bank passwords</> },
        { icon: <EyeOff className="w-5 h-5 text-blue-500 dark:text-fuchsia-400" />, text: <>We never store sensitive login details</> },
        { icon: <UserCheck className="w-5 h-5 text-indigo-500 dark:text-indigo-300" />, text: <>We're committed to your trust — no data selling</> },
      ]
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="w-full border-t border-muted/30 mb-16" />
      {/* Soft gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 opacity-80" />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
          What You'll Get With RentCredit
        </h2>
        <p className="text-center text-lg font-semibold text-gray-600 dark:text-zinc-200 mb-2">
          Empowering Indian renters and landlords to unlock financial opportunities — with just their rent.
        </p>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-300 mb-10 max-w-2xl mx-auto">
          No credit history? No problem. RentCredit helps Indian tenants and landlords turn monthly rent into long-term credit value — safely and easily.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1 + idx * 0.1 }}
              className="bg-secondary/70 dark:bg-zinc-900 border border-muted/40 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col items-start p-6"
            >
              <div className="mb-3">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{card.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-4">{card.subtitle}</p>
              <ul className="space-y-3 w-full">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-200 text-left">
                    {feature.icon}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
const ShimmerBG = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path fill="url(#shimmer)" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-fuchsia-900/30 animate-pulse opacity-40" />
  </div>
);

const CallToAction = () => (
  <section className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-lg py-24 px-4 sm:px-6 lg:px-8 p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 mt-16">
    <div className="w-full border-t border-muted/30 absolute top-0 left-0" />
    <ShimmerBG />
    <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mb-2"
        >
          <CheckCircle className="w-10 h-10 text-green-400 drop-shadow-lg" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          Ready to Build Your Credit?
        </h2>
      </motion.div>
      <p className="text-base md:text-lg text-zinc-700 dark:text-white/80 mb-4">
        Join 500+ renters already building credit in India.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/get-started" className="px-8 py-3 rounded-xl font-medium border border-zinc-900 dark:border-white bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-colors duration-200 hover:scale-[1.01] hover:shadow-xl transition-transform duration-300">
          Get Started Today
        </Link>
        <Link to="/how-it-works" className="px-8 py-3 rounded-xl font-medium border border-zinc-900 dark:border-white bg-transparent text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-colors duration-200 hover:scale-[1.01] hover:shadow-xl transition-transform duration-300">
          See How It Works
        </Link>
      </div>
    </div>
  </section>
);

// Landing Page Layout
function LandingPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <Navbar />
        <HeroSection />
        <TrustedByScroller />
        <InfoSection />
        <FoundersMission />
        <CallToAction />
      </div>
    </div>
  );
}

// Main App Component with Routing
function App() {
  return (
    <Router>
      <DashboardProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/dashboard/tenant" element={<TenantDashboard />} />
          <Route path="/dashboard/landlord" element={<LandlordDashboard />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/signup/tenant" element={<SignupForm role="tenant" />} />
          <Route path="/signup/landlord" element={<SignupForm role="landlord" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </DashboardProvider>
    </Router>
  );
}

export default App; 