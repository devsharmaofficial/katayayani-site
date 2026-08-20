import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { Resend } from 'resend';
import { getLeadEmailHtml } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_123');

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[0-9\s\-]{10,15}$/, 'Please enter a valid phone number'),
  productName: z.string().min(1, 'Product is required'),
  productSlug: z.string().optional(),
  page: z.string().optional().default('/'),
  source: z.string().optional().default('popup'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: data.name,
        phone: data.phone,
        productName: data.productName,
        productSlug: data.productSlug ?? null,
        page: data.page,
        source: data.source,
        status: 'New',
        updatedAt: new Date(),
      },
    });

    // Send email notification for New Lead
    if (process.env.RESEND_API_KEY) {
      try {
        const emailHtml = getLeadEmailHtml('NEW', {
          name: lead.name,
          phone: lead.phone,
          productName: lead.productName,
          page: lead.page,
        });
        
        await resend.emails.send({
          from: 'Katayayani Leads <onboarding@resend.dev>',
          to: 'devsharmaofficial.id@gmail.com',
          subject: `🔥 New Lead: ${lead.name} is looking for ${lead.productName}`,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error('Failed to send lead email:', emailErr);
      }
    } else {
      console.log('RESEND_API_KEY not set. Would have sent NEW lead email to devsharmaofficial.id@gmail.com for:', lead.name);
    }

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }
    console.error('Lead API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save lead' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const status = searchParams.get('status') || '';

    const where: Record<string, unknown> = {};
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { phone: { contains: query } },
        { productName: { contains: query } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Leads GET Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch leads' }, { status: 500 });
  }
}
