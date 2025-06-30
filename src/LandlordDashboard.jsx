import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, XCircle, Plus, BarChart2, PieChart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useAuth } from './AuthContext';
import { useDashboard } from './contexts/DashboardContext';
import { toast } from 'react-hot-toast';
import AddTenantModal from './components/modals/AddTenantModal';
import { exportToCSV, exportToPDF } from './utils/exports';

const mockUser = { name: 'Adithya', tenantsReporting: 3 };
const tenants = [
  { name: 'Priya Sharma', due: '₹15,000', lastPayment: 'Feb 2025', status: 'Paid', reporting: true, streak: 12 },
  { name: 'Rahul Verma', due: '₹12,000', lastPayment: 'Feb 2025', status: 'Late', reporting: false, streak: 2 },
  { name: 'Sneha Patel', due: '₹18,000', lastPayment: 'Jan 2025', status: 'Paid', reporting: true, streak: 10 },
];
const rentCollection = [12000, 15000, 18000, 17000, 16000, 15000];
const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
const pieData = [
  { label: 'Paid', value: 70, color: '#22c55e' },
  { label: 'Late', value: 20, color: '#facc15' },
  { label: 'Pending', value: 10, color: '#ef4444' },
];
const reliableTenants = [
  { name: 'Priya Sharma', streak: 12 },
  { name: 'Sneha Patel', streak: 10 },
  { name: 'Amit Singh', streak: 9 },
];

export default function LandlordDashboard() {
  const {
    tenants,
    setTenants,
    filters,
    setFilters,
    graphType,
    setGraphType,
    confirmPayment,
    addTenant,
  } = useDashboard();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', rent: '', dueDate: '', reporting: false });
  const [search, setSearch] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [chartType, setChartType] = useState('Bar');

  // Filtered tenant list
  const filteredTenants = tenants.filter(t =>
    (search === '' || t.name.toLowerCase().includes(search.toLowerCase())) &&
    (filters.status === 'All' || t.status === filters.status) &&
    (filters.reporting === 'All' || (filters.reporting === 'Yes' ? t.reporting : !t.reporting))
  );

  // Handlers
  const handleConfirmPayment = (tenantId, name) => {
    confirmPayment(tenantId);
    toast.success(`Payment Confirmed for ${name}`);
  };
  const handleAddTenant = (tenantData) => {
    addTenant(tenantData);
    setShowModal(false);
    toast.success('Tenant Added');
  };
  const handleExportCSV = () => {
    exportToCSV(filteredTenants, `tenants-${new Date().toLocaleString('default', { month: 'short', year: 'numeric' }).replace(' ', '-')}.csv`);
    toast.success('Report Downloaded');
  };
  const handleExportPDF = async () => {
    await exportToPDF(filteredTenants, `tenants-${new Date().toLocaleString('default', { month: 'short', year: 'numeric' }).replace(' ', '-')}.pdf`, 'Tenant Report');
    toast.success('Report Downloaded');
  };

  try {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-950">
        <Header userType="landlord" userName="Demo Landlord" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 p-4">
          {/* Left Column: Main Info & Table */}
          <div className="flex flex-col gap-6">
            {/* Welcome Section */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome, {mockUser.name}!</h1>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300 font-medium">
                <User className="w-5 h-5" />
                {mockUser.tenantsReporting} tenants reporting rent this month
              </div>
            </motion.div>
            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or mobile" className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Late">Late</option>
                <option value="Pending">Unpaid</option>
              </select>
              <select value={filters.reporting} onChange={e => setFilters(f => ({ ...f, reporting: e.target.value }))} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
                <option value="All">All Reporting</option>
                <option value="Yes">CIBIL Reporting</option>
                <option value="No">Not Reporting</option>
              </select>
            </div>
            {/* Tenant Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tenant Overview</h2>
                <div className="flex gap-2">
                  <button onClick={handleExportCSV} className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition" title="Export tenant data as CSV">Export CSV</button>
                  <button onClick={handleExportPDF} className="px-3 py-1 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition" title="Export tenant data as PDF">Export PDF ZIP</button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:scale-[1.03] hover:shadow-lg transition">
                    <Plus className="w-5 h-5" /> Add Tenant
                  </motion.button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 dark:text-gray-300">
                      <th className="py-2 px-2 text-left">Name</th>
                      <th className="py-2 px-2 text-left">Rent Due</th>
                      <th className="py-2 px-2 text-left">Last Payment</th>
                      <th className="py-2 px-2 text-left">Status</th>
                      <th className="py-2 px-2 text-left">Reporting</th>
                      <th className="py-2 px-2 text-left">Reliability</th>
                      <th className="py-2 px-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTenants.map((t, i) => (
                      <tr key={i} className="border-b border-muted/20 last:border-0 hover:bg-indigo-50 dark:hover:bg-zinc-800 transition">
                        <td className="py-2 px-2 text-indigo-700 dark:text-indigo-300 font-semibold cursor-pointer underline" onClick={() => setSelectedTenant(t)}>{t.name}</td>
                        <td className="py-2 px-2 text-gray-800 dark:text-gray-100">{t.due}</td>
                        <td className="py-2 px-2 text-gray-800 dark:text-gray-100">{t.lastPayment}</td>
                        <td className={`py-2 px-2 font-semibold text-gray-800 dark:text-gray-100 ${t.status === 'Paid' ? 'text-green-500' : t.status === 'Late' ? 'text-yellow-500' : 'text-red-500'}`}>{t.status}</td>
                        <td className="py-2 px-2" title={t.reporting ? "Reporting to Bureau" : "Not Reporting"}>{t.reporting ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}</td>
                        <td className="py-2 px-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 cursor-pointer group relative" title="12-month on-time streak">
                            🥇 Gold
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleConfirmPayment(t.id, t.name)} disabled={t.status === 'Paid'} className="px-3 py-1 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium hover:bg-green-200 dark:hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed">Confirm Payment</motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Right Column: Widgets */}
          <div className="flex flex-col gap-6">
            {/* Monthly Collection Chart with Toggle */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:shadow-xl transition">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">Monthly Collection</span>
                <div className="flex gap-2">
                  <button onClick={() => setGraphType('Line')} className={`px-2 py-1 rounded ${graphType==='Line' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'} text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition`}>Line</button>
                  <button onClick={() => setGraphType('Bar')} className={`px-2 py-1 rounded ${graphType==='Bar' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'} text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition`}>Bar</button>
                  <button onClick={() => setGraphType('Pie')} className={`px-2 py-1 rounded ${graphType==='Pie' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'} text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition`}>Pie</button>
                  <button className="px-2 py-1 rounded bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-white text-xs font-medium hover:bg-gray-300 dark:hover:bg-zinc-700 transition">Download</button>
                </div>
              </div>
              {/* Chart Placeholder */}
              <div className="w-full h-40 flex items-center justify-center">
                {graphType === 'Bar' && (
                  <svg viewBox="0 0 220 100" fill="none" className="w-full h-32">
                    <line x1="30" y1="10" x2="30" y2="90" stroke="#CBD5E1" strokeWidth="2" />
                    <line x1="30" y1="90" x2="210" y2="90" stroke="#CBD5E1" strokeWidth="2" />
                    {rentCollection.map((amt, i) => (
                      <rect key={i} x={40 + i * 28} y={90 - amt / 300} width="18" height={amt / 300} rx="4" fill="#6366f1" />
                    ))}
                    {months.map((m, i) => (
                      <text key={m} x={49 + i * 28} y={98} fontSize="10" className="text-gray-700 dark:text-gray-200" textAnchor="middle">{m}</text>
                    ))}
                  </svg>
                )}
                {graphType === 'Line' && (
                  <svg viewBox="0 0 220 100" fill="none" className="w-full h-32">
                    <polyline points="40,90 68,70 96,60 124,40 152,60 180,30 210,50" fill="none" stroke="#6366f1" strokeWidth="3" />
                    {months.map((m, i) => (
                      <text key={m} x={49 + i * 28} y={98} fontSize="10" className="text-gray-700 dark:text-gray-200" textAnchor="middle">{m}</text>
                    ))}
                  </svg>
                )}
                {graphType === 'Pie' && (
                  <svg viewBox="0 0 120 120" width="120" height="120">
                    <circle cx="60" cy="60" r="50" fill="#f3f4f6" className="dark:fill-zinc-800" />
                    {(() => {
                      let acc = 0;
                      return pieData.map((slice, i) => {
                        const start = acc;
                        const end = acc + (slice.value / 100) * 360;
                        acc = end;
                        const large = end - start > 180 ? 1 : 0;
                        const r = 50, cx = 60, cy = 60;
                        const x1 = cx + r * Math.cos(Math.PI * start / 180);
                        const y1 = cy + r * Math.sin(Math.PI * start / 180);
                        const x2 = cx + r * Math.cos(Math.PI * end / 180);
                        const y2 = cy + r * Math.sin(Math.PI * end / 180);
                        return (
                          <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`} fill={slice.color} opacity="0.85" />
                        );
                      });
                    })()}
                    {pieData.map((slice, i) => (
                      <g key={i}>
                        <rect x="10" y={100 + i * 8} width="8" height="8" fill={slice.color} />
                        <text x="22" y={107 + i * 8} fontSize="9" className="text-gray-700 dark:text-gray-200">{slice.label}</text>
                      </g>
                    ))}
                  </svg>
                )}
              </div>
            </div>
            {/* Rental Income Forecast Widget */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:shadow-xl transition">
              <span className="font-semibold text-gray-900 dark:text-white mb-1">Rental Income Forecast</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300">₹45,000</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">Expected vs Collected: <span className="font-semibold text-green-600 dark:text-green-400">₹42,000</span></span>
              <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full mt-2">
                <div className="h-2 bg-gradient-to-r from-green-400 to-indigo-500 rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
            {/* Credit Impact Overview Widget */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:shadow-xl transition">
              <span className="font-semibold text-gray-900 dark:text-white mb-1">Credit Impact Overview</span>
              <span className="text-sm text-gray-700 dark:text-gray-200">Avg. credit boost: <span className="font-semibold text-green-600 dark:text-green-400">+42</span></span>
              <span className="text-sm text-gray-700 dark:text-gray-200">% tenants benefiting: <span className="font-semibold text-indigo-600 dark:text-indigo-300">87%</span></span>
              <div className="flex gap-2 mt-2">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-300">Priya</span>
                  <div className="w-16 h-8 bg-gradient-to-r from-green-400 to-indigo-500 rounded-lg flex items-end">
                    <div className="w-2 h-6 bg-green-500 rounded"></div>
                    <div className="w-2 h-4 bg-indigo-400 rounded ml-1"></div>
                    <div className="w-2 h-7 bg-purple-400 rounded ml-1"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-300">Sneha</span>
                  <div className="w-16 h-8 bg-gradient-to-r from-green-400 to-indigo-500 rounded-lg flex items-end">
                    <div className="w-2 h-5 bg-green-500 rounded"></div>
                    <div className="w-2 h-7 bg-indigo-400 rounded ml-1"></div>
                    <div className="w-2 h-4 bg-purple-400 rounded ml-1"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-300">Amit</span>
                  <div className="w-16 h-8 bg-gradient-to-r from-green-400 to-indigo-500 rounded-lg flex items-end">
                    <div className="w-2 h-4 bg-green-500 rounded"></div>
                    <div className="w-2 h-6 bg-indigo-400 rounded ml-1"></div>
                    <div className="w-2 h-7 bg-purple-400 rounded ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tenant Profile Modal */}
        {selectedTenant && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{selectedTenant.name} Profile</h3>
              <div className="mb-2 text-sm text-gray-700 dark:text-gray-200">Mobile: {selectedTenant.contact || 'N/A'}</div>
              <div className="mb-2 text-sm text-gray-700 dark:text-gray-200">Reporting: {selectedTenant.reporting ? 'Yes' : 'No'}</div>
              <div className="mb-2 text-sm text-gray-700 dark:text-gray-200">Notes: <input className="ml-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white" defaultValue={selectedTenant.notes || ''} /></div>
              <div className="mb-4">
                <span className="font-semibold text-gray-900 dark:text-white">Payment History</span>
                <ul className="mt-1 space-y-1">
                  <li className="text-xs text-gray-700 dark:text-gray-200">Feb 2025: Paid</li>
                  <li className="text-xs text-gray-700 dark:text-gray-200">Jan 2025: Paid</li>
                  <li className="text-xs text-gray-700 dark:text-gray-200">Dec 2024: Late</li>
                </ul>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-gray-900 dark:text-white">CIBIL Trend</span>
                <svg viewBox="0 0 120 40" className="w-full h-10 mt-1">
                  <polyline points="0,30 20,20 40,15 60,10 80,20 100,5 120,10" fill="none" stroke="#6366f1" strokeWidth="2" />
                </svg>
              </div>
              <button className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition w-max" onClick={() => setSelectedTenant(null)}>Close</button>
            </motion.div>
          </div>
        )}
        {/* Add Tenant Modal */}
        <AddTenantModal open={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddTenant} />
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