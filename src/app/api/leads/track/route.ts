import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Resend } from 'resend';
import { getLeadEmailHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_123');

const trackSchema = z.object({
  leadId: z.string(),
  productName: z.string().optional(),
  productSlug: z.string().optional(),
  page: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = trackSchema.parse(body);

    const existingLead = await prisma.lead.findUnique({
      where: { id: data.leadId },
    });

    if (!existingLead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 });
    }

    // Only update if they are looking at a different product or page, or if a significant amount of time has passed (we just update it anyway to bump to top, but maybe only if different page)
    // To keep it simple and fulfill the requirement "gets displayed in the leads", we bump the updatedAt timestamp, update product interest, and set status to Returning so admin knows they came back.

    const updatedLead = await prisma.lead.update({
      where: { id: existingLead.id },
      data: {
        productName: data.productName || existingLead.productName,
        productSlug: data.productSlug || existingLead.productSlug,
        page: data.page,
        status: existingLead.status === 'Converted' ? 'Converted' : 'New', // Keep converted as converted, but reset Contacted to New? Actually let's just leave status alone or set it to 'New'. Let's set it to New so they see it.
        source: 'returning_visitor',
        updatedAt: new Date(),
      },
    });

    // Send email notification for Returning Lead
    if (process.env.RESEND_API_KEY) {
      try {
        const emailHtml = getLeadEmailHtml('RETURNING', {
          name: updatedLead.name,
          phone: updatedLead.phone,
          productName: updatedLead.productName,
          page: updatedLead.page,
        });
        
        await resend.emails.send({
          from: 'Katayayani Leads <onboarding@resend.dev>',
          to: 'devsharmaofficial.id@gmail.com',
          subject: `[Seen Again] 🔄 ${updatedLead.name} is looking at ${updatedLead.productName}`,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error('Failed to send returning lead email:', emailErr);
      }
    } else {
      console.log('RESEND_API_KEY not set. Would have sent RETURNING lead email to devsharmaofficial.id@gmail.com for:', updatedLead.name);
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }
    console.error('Lead Tracking API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to track lead' }, { status: 500 });
  }
}
