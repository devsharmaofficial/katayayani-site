'use client';

import { useTransition } from 'react';
import { updateOrderStatus } from './actions';
import DeleteOrderButton from './DeleteOrderButton';

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  productName: string;
  color: string;
  amount: number;
  upiRefId: string;
  status: string;
  createdAt: Date;
};

type OrderDetailsModalProps = {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
};

const STATUS_ORDER = ['Pending', 'Accepted', 'Shipped', 'Delivered'];

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const currentStatusIndex = STATUS_ORDER.indexOf(order.status);
  
  const handleUpdateStatus = (newStatus: string) => {
    startTransition(async () => {
      const res = await updateOrderStatus(order.id, newStatus);
      if (!res.success) {
        alert('Failed to update status');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Order Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          
          {/* Visual Stepper */}
          {order.status !== 'Rejected' ? (
            <div className="py-4">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-500"
                  style={{ width: `${(Math.max(0, currentStatusIndex) / (STATUS_ORDER.length - 1)) * 100}%` }}
                ></div>
                
                {STATUS_ORDER.map((step, index) => {
                  const isCompleted = currentStatusIndex >= index;
                  const isCurrent = currentStatusIndex === index;
                  return (
                    <div key={step} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(step)}
                        disabled={isPending}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          isCompleted 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-blue-300'
                        } ${isCurrent ? 'ring-4 ring-blue-100' : ''} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isCompleted ? '✓' : index + 1}
                      </button>
                      <span className={`text-xs font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-center font-medium">
              This order has been Rejected.
            </div>
          )}

          {/* Action Buttons for Pending */}
          {order.status === 'Pending' && (
            <div className="flex gap-4">
              <button
                onClick={() => handleUpdateStatus('Accepted')}
                disabled={isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
              >
                {isPending ? 'Updating...' : 'Accept Order'}
              </button>
              <button
                onClick={() => handleUpdateStatus('Rejected')}
                disabled={isPending}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
              >
                Reject Order
              </button>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Customer Info</h3>
                <p className="font-bold text-gray-900 text-lg">{order.name}</p>
                <p className="text-gray-600 font-medium mt-1">📞 {order.phone}</p>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">📍 {order.address}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3">Payment</h3>
                <p className="text-2xl font-bold text-blue-900 mb-2">₹{order.amount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-blue-800/80 font-mono">UPI Ref: <span className="font-bold text-blue-900">{order.upiRefId}</span></p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 h-full">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Order Specs</h3>
                <p className="font-semibold text-gray-900 mb-2">{order.productName}</p>
                <p className="text-gray-600 text-sm mb-4">Color: <span className="font-medium text-gray-900">{order.color}</span></p>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Order Date (IST)</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: 'numeric', month: 'long', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mt-3 mb-1">Order ID</p>
                  <p className="text-sm font-mono text-gray-500">{order.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
           <DeleteOrderButton orderId={order.id} />
           <button onClick={onClose} className="px-5 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
             Close
           </button>
        </div>
      </div>
    </div>
  );
}
