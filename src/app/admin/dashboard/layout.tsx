import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction } from '../actions';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">CRM Dashboard</h1>
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
