'use client';

import { useState, useTransition } from 'react';
import { updateOrderStatus } from './actions';

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Processing: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrderStatusSelect({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, newStatus);
      if (!res.success) {
        // Revert on failure
        setStatus(initialStatus);
        alert('Failed to update status');
      }
    });
  };

  return (
    <div className="relative inline-block w-full">
      <select
        value={status}
        onChange={handleChange}
        disabled={isPending}
        className={`appearance-none w-full border text-xs font-semibold px-3 py-1.5 rounded-full outline-none cursor-pointer transition-colors ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-200'} ${isPending ? 'opacity-50' : ''}`}
      >
        {STATUSES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
