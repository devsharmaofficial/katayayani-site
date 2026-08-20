import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import LeadStatusChanger from './LeadStatusChanger';

export const dynamic = 'force-dynamic';

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    Converted: 'bg-green-50 text-green-700 border-green-200',
  };
  const dots: Record<string, string> = {
    New: 'bg-blue-500',
    Contacted: 'bg-amber-500',
    Converted: 'bg-green-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || 'bg-gray-400'}`} />
      {status}
    </span>
  );
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const statusFilter = typeof resolvedParams.status === 'string' ? resolvedParams.status : '';

  const where: Record<string, unknown> = {};
  if (query) {
    where.OR = [
      { name: { contains: query } },
      { phone: { contains: query } },
      { productName: { contains: query } },
    ];
  }
  if (statusFilter) {
    where.status = statusFilter;
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
  });

  const allLeads = await prisma.lead.findMany({ orderBy: { updatedAt: 'desc' } });
  const totalLeads = allLeads.length;
  const newLeads = allLeads.filter((l: any) => l.status === 'New').length;
  const contactedLeads = allLeads.filter((l: any) => l.status === 'Contacted').length;
  const convertedLeads = allLeads.filter((l: any) => l.status === 'Converted').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newToday = allLeads.filter((l: any) => new Date(l.createdAt) >= today).length;

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Leads</p>
          <p className="text-3xl font-black text-gray-900">{totalLeads}</p>
          {newToday > 0 && <p className="text-xs font-semibold text-blue-600">+{newToday} today</p>}
        </div>
        <div className="bg-blue-50 p-5 rounded-2xl shadow-sm border border-blue-100 flex flex-col gap-1">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">New</p>
          <p className="text-3xl font-black text-blue-700">{newLeads}</p>
        </div>
        <div className="bg-amber-50 p-5 rounded-2xl shadow-sm border border-amber-100 flex flex-col gap-1">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Contacted</p>
          <p className="text-3xl font-black text-amber-700">{contactedLeads}</p>
        </div>
        <div className="bg-green-50 p-5 rounded-2xl shadow-sm border border-green-100 flex flex-col gap-1">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Converted</p>
          <p className="text-3xl font-black text-green-700">{convertedLeads}</p>
          {totalLeads > 0 && (
            <p className="text-xs font-semibold text-green-600">
              {Math.round((convertedLeads / totalLeads) * 100)}% rate
            </p>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <form method="get" className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by name, phone, product..."
            className="flex-1 min-w-[180px] px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#012d1d] transition-colors"
          />
          <select
            name="status"
            defaultValue={statusFilter}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-[#012d1d] bg-white transition-colors"
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2 bg-[#012d1d] text-white text-sm font-bold rounded-xl hover:bg-[#0a3d26] transition-colors"
          >
            Filter
          </button>
          {(query || statusFilter) && (
            <a
              href="/admin/dashboard/leads"
              className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 rounded-xl border border-gray-200 transition-colors"
            >
              Clear
            </a>
          )}
        </form>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-700">
            {leads.length} Lead{leads.length !== 1 ? 's' : ''} found
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs border-b border-gray-100">
                <th className="p-4 font-bold uppercase tracking-wide">Customer</th>
                <th className="p-4 font-bold uppercase tracking-wide">Phone</th>
                <th className="p-4 font-bold uppercase tracking-wide">Product Interest</th>
                <th className="p-4 font-bold uppercase tracking-wide">Source</th>
                <th className="p-4 font-bold uppercase tracking-wide">Date</th>
                <th className="p-4 font-bold uppercase tracking-wide">Status</th>
                <th className="p-4 font-bold uppercase tracking-wide text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      <p className="font-semibold text-sm">No leads found</p>
                      <p className="text-xs">Leads from the popup form will appear here</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead: any) => (
                  <tr key={lead.id} className={`transition-colors group ${lead.status === 'New' ? 'bg-blue-50/40 hover:bg-blue-50' : 'hover:bg-gray-50/60'}`}>
                    <td className="p-4">
                      <Link href={`/admin/dashboard/leads/${lead.id}`} className="font-bold text-gray-900 text-sm hover:text-[#012d1d] hover:underline block transition-colors">
                        {lead.name}
                      </Link>
                    </td>
                    <td className="p-4">
                      <a
                        href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#128C7E] hover:text-[#075E54] group-hover:underline transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        {lead.phone}
                      </a>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-semibold text-gray-700 max-w-[180px] truncate block">
                        {lead.productName}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg capitalize w-fit">
                          {lead.source === 'returning_visitor' ? 'Seen Again' : lead.source}
                        </span>
                        {lead.source === 'returning_visitor' && (
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                            Active Again
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-500 font-medium whitespace-nowrap block">
                        {new Date(lead.updatedAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      {lead.updatedAt > lead.createdAt && (
                        <span className="text-xs font-bold text-green-600 mt-0.5 block">
                          Updated
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <Link href={`/admin/dashboard/leads/${lead.id}`} className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                          View
                        </Link>
                        <LeadStatusChanger leadId={lead.id} currentStatus={lead.status} />
                      </div>
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
