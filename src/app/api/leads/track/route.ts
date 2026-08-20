import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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
