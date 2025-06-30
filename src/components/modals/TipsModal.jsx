import React from 'react';

const tips = [
  'Set up calendar reminders for rent due dates.',
  'Automate payments if possible to avoid missing deadlines.',
  'Communicate early with your landlord if you anticipate delays.',
  'Keep a buffer in your account for rent payments.',
  'Track your payment history and credit score regularly.',
];

export default function TipsModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Tips to Stay Consistent</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200 mb-6">
          {tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
        <button onClick={onClose} className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Close</button>
      </div>
    </div>
  );
} 