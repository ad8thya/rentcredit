import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, FileText, CheckCircle, Info, Download, Filter, Plus, Share2, BadgeCheck, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useAuth } from './AuthContext';
import { useDashboard } from './contexts/DashboardContext';
import { toast } from 'react-hot-toast';
import { exportToCSV, exportToPDF } from './utils/exports';
import AddPaymentModal from './components/modals/AddPaymentModal';
import TipsModal from './components/modals/TipsModal';

const mockUser = { name: 'Adithya', streak: 5 };
const cibilScores = [650, 670, 690, 710, 720, 730, 740, 750];
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
const tenantPayments = [
  { date: 'Feb 2025', amount: '₹15,000', status: 'Paid' },
  { date: 'Jan 2025', amount: '₹15,000', status: 'Paid' },
  { date: 'Dec 2024', amount: '₹15,000', status: 'Paid' },
  { date: 'Nov 2024', amount: '₹15,000', status: 'Late' },
  { date: 'Oct 2024', amount: '₹15,000', status: 'Paid' },
];

const statusColors = {
  Paid: 'text-green-500',
  Late: 'text-red-500',
};

const filters = ['All', 'Paid', 'Late'];

export default function TenantDashboard() {
  const {
    payments,
    setPayments,
    addPayment,
  } = useDashboard();
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const filteredPayments = filter === 'All' ? payments : payments.filter(p => p.status === filter);

  // const { user, role, loading, error } = useAuth();

  // DEMO MODE: Bypass all auth/role checks
  // if (loading || (user && role === null)) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
  //       <Header />
  //       <div className="text-lg text-gray-700 dark:text-gray-200">Loading dashboard…</div>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
  //       <Header />
  //       <div className="text-lg text-red-500">You must be signed in to view this page.</div>
  //     </div>
  //   );
  // }

  // if (role !== 'tenant') {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
  //       <Header />
  //       <div className="text-lg text-red-500">You must be signed in as a tenant to view this page.</div>
  //     </div>
  //   );
  // }

  try {
    // Handlers
    const handleDownloadCreditSummary = async () => {
      // This could be a more complex data structure in a real app
      const summaryData = `CIBIL Score: 750\nOn-Time Streak: ${mockUser.streak} months\nPayment Health: 92% On-Time`;
      await exportToPDF(summaryData, `credit-summary-${mockUser.name}.pdf`, 'Credit Health Summary');
      toast.success('Credit Summary Downloaded');
    };
    const handlePayNow = () => {
      // Find the first pending payment and mark it as paid
      const pendingPaymentIndex = payments.findIndex(p => p.status === 'Pending');
      if (pendingPaymentIndex !== -1) {
        const updatedPayments = [...payments];
        updatedPayments[pendingPaymentIndex].status = 'Paid';
        setPayments(updatedPayments);
        toast.success('Payment of ₹15,000 Confirmed!');
      } else {
        toast.error('No pending payments to be made.');
      }
    };
    const handleDownloadReport = () => {
      exportToCSV(filteredPayments, `rent-history-${mockUser.name}.csv`);
      toast.success('Report Downloaded');
    };
    const handleShareReport = () => {
      navigator.clipboard.writeText('https://rentcredit.app/public/report/some-unique-id');
      toast.success('Share link copied to clipboard!');
    };
    const handleAddPayment = (payment) => {
      addPayment({ ...payment, id: Date.now().toString() });
      setShowModal(false);
      toast.success('Payment Added');
    };
    const handleShowTips = () => {
      setShowTips(true);
    };

    return (
      <div className="min-h-screen bg-background dark:bg-gray-950">
        <Header userType="tenant" userName={mockUser.name} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 p-4">
          {/* Left Column: Main Info */}
          <div className="flex flex-col gap-6">
            {/* Welcome + Streak Badge */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {mockUser.name}!</h1>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold text-sm shadow cursor-pointer relative group">
                  <span className="text-lg">🔥</span> On-Time Streak – {mockUser.streak} months
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-3 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 shadow-lg">Earn badges as you stay consistent!</span>
                </div>
              </div>
            </motion.div>
            {/* CIBIL Score Chart */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">CIBIL Score Trend</h2>
                <div className="relative w-full h-40">
                  <svg viewBox="0 0 320 120" fill="none" className="w-full h-full">
                    {/* Axes */}
                    <line x1="40" y1="10" x2="40" y2="110" stroke="#CBD5E1" strokeWidth="2" />
                    <line x1="40" y1="110" x2="300" y2="110" stroke="#CBD5E1" strokeWidth="2" />
                    {/* Line Chart Path */}
                    <motion.path
                      d="M40 110 Q70 90 100 80 Q130 60 160 70 Q190 90 220 60 Q250 40 300 30"
                      stroke="url(#scoreGradient)"
                      strokeWidth="4"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="40" y1="110" x2="300" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366f1" />
                        <stop offset="1" stopColor="#a21caf" />
                      </linearGradient>
                    </defs>
                    {/* Dots and tooltips */}
                    {cibilScores.map((score, i) => {
                      const x = 40 + (i * 35);
                      const y = 110 - ((score - 650) * 0.8);
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="5" fill="#a21caf" />
                          <title>{months[i]}: {score}</title>
                        </g>
                      );
                    })}
                    {/* Labels */}
                    {months.map((m, i) => (
                      <text key={m} x={40 + i * 35} y={120} fontSize="10" className="text-gray-700 dark:text-gray-200" textAnchor="middle">{m}</text>
                    ))}
                    <text x="10" y="110" fontSize="10" className="text-gray-700 dark:text-gray-200">650</text>
                    <text x="10" y="30" fontSize="10" className="text-gray-700 dark:text-gray-200">750</text>
                  </svg>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">750</span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">— Excellent</span>
                </div>
              </div>
              {/* Progress Badge */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow">
                  <span className="text-xl">🔥</span>
                  <span className="font-semibold">On-Time Streak</span>
                  <Info className="w-4 h-4 text-white/80 cursor-pointer" title="Earn badges as you stay consistent!" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-300">Earn badges as you stay consistent!</span>
              </div>
            </motion.div>
            {/* Payment Health Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span className="font-semibold text-gray-900 dark:text-white">Payment Health Overview</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">92% On-Time</span>
                <span className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-1"><span className="text-lg">❌</span> 1 late in 12 months</span>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleShowTips} className="mt-2 text-xs text-indigo-600 dark:text-indigo-300 hover:underline">Tips to stay consistent</motion.button>
            </div>
            {/* Streak Achievement Badges */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition">
              <span className="font-semibold text-gray-900 dark:text-white mb-2">Streak Achievements</span>
              <div className="flex gap-4">
                <div className="flex flex-col items-center group relative">
                  <div className="w-10 h-10 rounded-full bg-yellow-400/80 flex items-center justify-center text-white font-bold shadow">🥉</div>
                  <span className="text-xs mt-1 text-gray-700 dark:text-gray-200">Bronze</span>
                  <span className="absolute mt-12 w-max px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 shadow-lg">Earned after 3 months</span>
                </div>
                <div className="flex flex-col items-center group relative">
                  <div className="w-10 h-10 rounded-full bg-gray-400/80 flex items-center justify-center text-white font-bold shadow">🥈</div>
                  <span className="text-xs mt-1 text-gray-700 dark:text-gray-200">Silver</span>
                  <span className="absolute mt-12 w-max px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 shadow-lg">Earned after 6 months</span>
                </div>
                <div className="flex flex-col items-center group relative">
                  <div className="w-10 h-10 rounded-full bg-amber-500/80 flex items-center justify-center text-white font-bold shadow">🥇</div>
                  <span className="text-xs mt-1 text-gray-700 dark:text-gray-200">Gold</span>
                  <span className="absolute mt-12 w-max px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 shadow-lg">Earned after 12 months</span>
                </div>
                <div className="flex flex-col items-center group relative">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/80 flex items-center justify-center text-white font-bold shadow">💎</div>
                  <span className="text-xs mt-1 text-gray-700 dark:text-gray-200">Platinum</span>
                  <span className="absolute mt-12 w-max px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 shadow-lg">Earned after 24 months</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Widgets */}
          <div className="flex flex-col gap-6">
            {/* Next Payment Reminder Widget */}
            <div className="rounded-xl shadow bg-gradient-to-br from-indigo-100 via-purple-100 to-fuchsia-100 dark:from-indigo-900 dark:via-purple-900 dark:to-fuchsia-900 p-5 flex flex-col gap-2 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-5 h-5 text-indigo-500 dark:text-indigo-300" />
                <span className="font-semibold text-gray-900 dark:text-white">Next Payment Reminder</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-900 dark:text-white">Due: <span className="font-bold">28 Feb 2025</span></span>
                <span className="text-lg text-gray-900 dark:text-white">₹15,000</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-300">Due in 4 days</span>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePayNow} className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition w-max">Pay Now</motion.button>
            </div>
            {/* Credit Score Certificate Download CTA */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-indigo-500 dark:text-indigo-300" />
                <span className="font-semibold text-gray-900 dark:text-white">Credit Score Certificate</span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-200">Use this to show your credit reliability to banks or landlords</span>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDownloadCreditSummary} className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition w-max" title="Download a PDF of your credit health summary">📄 Download Credit Summary</motion.button>
            </div>
            {/* Mini Sidebar Navigation */}
            <nav className="bg-white dark:bg-zinc-900 rounded-xl shadow p-3 flex flex-col gap-2 mt-2">
              <button onClick={() => setActivePage('Dashboard')} className={`px-4 py-2 rounded-lg font-medium transition ${activePage === 'Dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-800'}`}>Dashboard</button>
              <button onClick={() => setActivePage('Credit Score')} className={`px-4 py-2 rounded-lg font-medium transition ${activePage === 'Credit Score' ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-800'}`}>Credit Score</button>
              <button onClick={() => setActivePage('Rent History')} className={`px-4 py-2 rounded-lg font-medium transition ${activePage === 'Rent History' ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-800'}`}>Rent History</button>
              <button onClick={() => setActivePage('Settings')} className={`px-4 py-2 rounded-lg font-medium transition ${activePage === 'Settings' ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-800'}`}>Settings</button>
            </nav>
          </div>
        </div>
        {/* Rent Payment History Table and CTA Buttons */}
        <div className="max-w-7xl mx-auto mt-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Rent Payment History</h2>
              <div className="flex items-center gap-2">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDownloadReport} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition" title="Download your rent history as a CSV file">
                  <Download className="w-4 h-4" /> Download Report
                </motion.button>
                <div className="flex items-center gap-1">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent text-xs text-gray-700 dark:text-gray-200 focus:outline-none">
                    {filters.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleShareReport} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition" title="Copy a shareable link to your report">
                  <Share2 className="w-4 h-4" /> Share Report
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium hover:bg-green-200 dark:hover:bg-green-800 transition" title="Add a past rent payment">
                  <Plus className="w-4 h-4" /> Add Payment
                </motion.button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-500 dark:text-gray-300">
                    <th className="py-2 px-2 text-left">Date</th>
                    <th className="py-2 px-2 text-left">Amount</th>
                    <th className="py-2 px-2 text-left">Status</th>
                    <th className="py-2 px-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p, i) => (
                    <tr key={i} className="border-b border-muted/20 last:border-0 hover:bg-indigo-50 dark:hover:bg-zinc-800 transition">
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-100">{p.date}</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-100">{p.amount}</td>
                      <td className={`py-2 px-2 font-semibold ${statusColors[p.status]}`}>{p.status}</td>
                      <td className="py-2 px-2">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition" title="Download receipt for this payment">Rent Report</motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        {/* Add Payment Modal (placeholder) */}
        <AddPaymentModal open={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddPayment} />
        <TipsModal open={showTips} onClose={() => setShowTips(false)} />
      </div>
    );
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-950">
        <Header />
        <div className="text-lg text-red-500">Something went wrong loading your dashboard.</div>
      </div>
    );
  }
} 