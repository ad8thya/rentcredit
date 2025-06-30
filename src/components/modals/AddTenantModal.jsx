import React, { useState } from 'react';

export default function AddTenantModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', rent: '', dueDate: '', reporting: false });
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Add New Tenant</h2>
        <form onSubmit={e => { e.preventDefault(); onSubmit(form); setForm({ name: '', rent: '', dueDate: '', reporting: false }); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Name</label>
            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Rent Amount</label>
            <input type="number" required value={form.rent} onChange={e => setForm(f => ({ ...f, rent: e.target.value }))} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2" placeholder="₹15,000" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Due Date</label>
            <input type="date" required value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Reporting</label>
            <select value={form.reporting ? 'Yes' : 'No'} onChange={e => setForm(f => ({ ...f, reporting: e.target.value === 'Yes' }))} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-zinc-800 px-3 py-2">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Add Tenant</button>
          </div>
        </form>
      </div>
    </div>
  );
} 