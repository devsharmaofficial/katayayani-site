import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { getLeadEmailHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_123');

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
    });

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        message: 'RESEND_API_KEY is not set in Environment Variables',
        leads,
      });
    }

    const results = [];

    for (const lead of leads) {
      const emailHtml = getLeadEmailHtml('NEW', {
        name: lead.name,
        phone: lead.phone,
        productName: lead.productName,
        page: lead.page,
      });

      const res = await resend.emails.send({
        from: 'Katayayani Leads <onboarding@resend.dev>',
        to: 'agroindustriesmeerut@gmail.com',
        subject: `🔥 [Top Lead] ${lead.name} - ${lead.productName}`,
        html: emailHtml,
      });

      results.push({ lead: lead.name, result: res });
    }

    return NextResponse.json({ success: true, count: leads.length, results });
  } catch (error: any) {
    console.error('Error sending top leads email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
