import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { getLeadEmailHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_123');

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
    });

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        message: 'RESEND_API_KEY is not set in Environment Variables',
      });
    }

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    const results = [];
    
    // Process in batches of 5
    for (let i = 0; i < leads.length; i += 5) {
      const batch = leads.slice(i, i + 5);
      const batchPromises = batch.map(async (lead) => {
        const emailHtml = getLeadEmailHtml('NEW', {
          name: lead.name,
          phone: lead.phone,
          productName: lead.productName,
          page: lead.page,
        });

        const res = await resend.emails.send({
          from: 'Katayayani Leads <onboarding@resend.dev>',
          to: 'agroindustriesmeerut@gmail.com',
          subject: `🔥 [Past Lead] ${lead.name} - ${lead.productName}`,
          html: emailHtml,
        });
        
        return { lead: lead.name, result: res };
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      await sleep(500); // 500ms delay between batches
    }

    return NextResponse.json({ success: true, count: leads.length, results });
  } catch (error: any) {
    console.error('Error sending top leads email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
