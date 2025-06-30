import React, { useState } from 'react';

export default function AddPaymentModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ amount: '', date: '', status: 'Paid' });
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Add New Payment</h2>
        <form onSubmit={e => { e.preventDefault(); onSubmit(form); setForm({ amount: '', date: '', status: 'Paid' }); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Amount</label>
            <input type="number" required value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Date</label>
            <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2">
              <option value="Paid">Paid</option>
              <option value="Late">Late</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Add Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
} 