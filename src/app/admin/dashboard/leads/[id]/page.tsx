import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, MessageCircle, Calendar, User, ShoppingBag, Globe, Info } from 'lucide-react';
import LeadStatusChanger from '../LeadStatusChanger';

export const dynamic = 'force-dynamic';

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    Converted: 'bg-green-50 text-green-700 border-green-200',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${styles[status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
      {status}
    </span>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const lead = await prisma.lead.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!lead) {
    notFound();
  }

  let phoneOnlyDigits = lead.phone.replace(/\D/g, '');
  if (phoneOnlyDigits.length > 10) {
    phoneOnlyDigits = phoneOnlyDigits.slice(-10);
  }
  const waMessage = encodeURIComponent(
    `Hi ${lead.name},\nThis is Katayayani Enterprises.\nWe noticed your inquiry for the ${lead.productName}.\nHow can we help you today? 😊`
  );
  const whatsappUrl = `https://wa.me/91${phoneOnlyDigits}?text=${waMessage}`;
  const telUrl = `tel:+91${phoneOnlyDigits}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header / Nav */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/admin/dashboard/leads" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Top Profile Header */}
        <div className="px-8 py-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 mb-1">{lead.name}</h1>
              <p className="text-gray-500 font-medium">{lead.phone}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <StatusBadge status={lead.status} />
            <div className="bg-white px-4 py-1.5 rounded-lg border border-gray-100 shadow-sm inline-flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Change Status:</span>
              <LeadStatusChanger leadId={lead.id} currentStatus={lead.status} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-6 bg-white border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-6 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-colors shadow-sm shadow-green-600/20"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp
          </a>
          <a
            href={telUrl}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Phone className="w-6 h-6" />
            Call Customer
          </a>
        </div>

        {/* Details Grid */}
        <div className="px-8 py-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-gray-400" />
            Lead Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4" />
                Product Interest
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="font-bold text-gray-900 text-lg">{lead.productName}</p>
                {lead.productSlug && (
                  <Link 
                    href={`/products/${lead.productSlug}`} 
                    target="_blank"
                    className="text-sm font-semibold text-blue-600 hover:underline mt-1 inline-block"
                  >
                    View Product Page →
                  </Link>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                Submitted & Activity
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">First Submitted</p>
                  <p className="font-bold text-gray-900">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                {lead.updatedAt > lead.createdAt && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wide">Last Active</p>
                    <p className="font-bold text-gray-900">
                      {new Date(lead.updatedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      at{' '}
                      {new Date(lead.updatedAt).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4" />
                Source Page
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="font-medium text-gray-900 truncate" title={lead.page}>
                  {lead.page}
                </p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-2">
                  Captured via: {lead.source}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
