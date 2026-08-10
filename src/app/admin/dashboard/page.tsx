import { prisma } from '@/lib/prisma';
import OrderStatusSelect from './OrderStatusSelect';
import SearchOrders from './SearchOrders';
import DeleteOrderButton from './DeleteOrderButton';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

  const whereClause = query
    ? {
        OR: [
          { name: { contains: query } },
          { phone: { contains: query } },
          { id: { contains: query } },
        ],
      }
    : {};

  const orders = await prisma.order.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum: number, order: { amount: number }) => sum + order.amount, 0);
  const pendingOrders = orders.filter((o: any) => o.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending Orders</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{pendingOrders}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <SearchOrders />
        <div className="text-sm text-gray-500 font-medium">
          Showing {orders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Amount & UPI</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">{order.id.slice(-6)}</td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{order.name}</p>
                      <p className="text-gray-500">{order.phone}</p>
                      <p className="text-gray-400 text-xs mt-1 truncate max-w-[200px]" title={order.address}>{order.address}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{order.productName}</p>
                      <p className="text-gray-500">Color: {order.color}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-900">₹{order.amount.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-gray-500 font-mono mt-1">Ref: {order.upiRefId}</p>
                    </td>
                    <td className="p-4">
                      <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4 text-center">
                      <DeleteOrderButton orderId={order.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
