import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction } from '../actions';
import Link from 'next/link';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-black text-gray-900">📊 CRM Dashboard</h1>
          <nav className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <Link
              href="/admin/dashboard"
              className="px-4 py-1.5 text-sm font-bold rounded-lg transition-all hover:bg-white hover:shadow-sm text-gray-600 hover:text-gray-900"
            >
              Orders
            </Link>
            <Link
              href="/admin/dashboard/leads"
              className="px-4 py-1.5 text-sm font-bold rounded-lg transition-all hover:bg-white hover:shadow-sm text-gray-600 hover:text-gray-900"
            >
              🎯 Leads
            </Link>
          </nav>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors">
            Logout
          </button>
        </form>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
