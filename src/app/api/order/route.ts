import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Lazy import prisma so a DB connection failure doesn't crash the whole module
let prismaClient: Awaited<typeof import('@/lib/prisma')>['prisma'] | null = null;

async function getPrisma() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:')) {
    // Don't use prisma on Vercel without a real hosted DB
    return null;
  }
  if (!prismaClient) {
    const { prisma } = await import('@/lib/prisma');
    prismaClient = prisma;
  }
  return prismaClient;
}

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_123');

const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number"),
  address: z.string().min(10, "Please enter a complete address"),
  color: z.string().min(1, "Please select a color"),
  productName: z.string(),
  productSlug: z.string(),
  amount: z.number(),
  upiRefId: z.string().min(6, "Please enter a valid UPI Reference / UTR Number"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = orderSchema.parse(body);

    const { name, phone, address, color, productName, productSlug, amount, upiRefId } = validatedData;

    // Generate a simple order ID for tracking
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // Try to save to DB (optional – won't fail the order if DB is not configured)
    let savedOrderId = orderId;
    try {
      const db = await getPrisma();
      if (db) {
        const saved = await db.order.create({
          data: { name, phone, address, color, productName, productSlug, amount, upiRefId, status: 'Pending' },
        });
        savedOrderId = saved.id;
      }
    } catch (dbErr) {
      console.warn('DB save skipped (no hosted DB configured):', dbErr);
    }

    const emailHtml = `
      <h2>New UPI Order Received!</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3>Product Details</h3>
        <p><strong>Order ID:</strong> ${savedOrderId}</p>
        <p><strong>Product:</strong> ${productName} (Slug: ${productSlug})</p>
        <p><strong>Color:</strong> ${color}</p>
        <p><strong>Amount Paid:</strong> ₹${amount.toLocaleString('en-IN')}</p>
        <p><strong>UPI Reference / UTR:</strong> <span style="background-color: #ffe082; padding: 2px 6px; font-weight: bold;">${upiRefId}</span></p>
      </div>
      
      <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px;">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone (WhatsApp):</strong> ${phone}</p>
        <p><strong>Delivery Address:</strong><br/>${address}</p>
      </div>
      
      <p style="color: #666; font-size: 14px; margin-top: 20px;">Please verify the UPI payment in your bank app using the UTR number before dispatching the order.</p>
    `;

    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Website Orders <onboarding@resend.dev>',
          to: ['agroindustriesmeerut@gmail.com'],
          subject: `[NEW ORDER] ₹${amount.toLocaleString('en-IN')} for ${productName} - Ref: ${upiRefId}`,
          html: emailHtml,
        });
      } catch (emailErr) {
        console.error('Failed to send email via Resend:', emailErr);
        // Continue anyway since we might have saved it to the DB
      }
    } else {
      console.log('RESEND_API_KEY not set. Order details:', { name, phone, productName, amount, upiRefId });
    }

    return NextResponse.json({ success: true, message: 'Order submitted successfully', orderId: savedOrderId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Validation failed', errors: error.issues }, { status: 400 });
    }
    console.error('Order API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit order' }, { status: 500 });
  }
}
