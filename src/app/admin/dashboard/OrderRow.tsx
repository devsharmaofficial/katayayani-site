'use client';

import { useState } from 'react';
import OrderDetailsModal, { Order } from './OrderDetailsModal';

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Accepted: 'bg-blue-100 text-blue-800 border-blue-200',
  Shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Rejected: 'bg-red-100 text-red-800 border-red-200',
};

export default function OrderRow({ order }: { order: Order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr 
        onClick={() => setIsModalOpen(true)}
        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group"
      >
        <td className="p-4 font-mono text-xs text-gray-500">{order.id.slice(-6)}</td>
        <td className="p-4">
          <p className="font-bold text-gray-900">{order.name}</p>
          <p className="text-gray-500 text-sm mt-0.5">{order.phone}</p>
        </td>
        <td className="p-4">
          <p className="font-semibold text-gray-900">{order.productName}</p>
        </td>
        <td className="p-4">
          <p className="font-bold text-gray-900">₹{order.amount.toLocaleString('en-IN')}</p>
        </td>
        <td className="p-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'}`}>
            {order.status}
          </span>
        </td>
        <td className="p-4 text-gray-500 text-sm font-medium">
          {new Date(order.createdAt).toLocaleDateString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: 'numeric', month: 'short'
          })}
        </td>
        <td className="p-4 text-center">
          <button className="text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            View Details &rarr;
          </button>
        </td>
      </tr>

      <OrderDetailsModal 
        order={order} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
