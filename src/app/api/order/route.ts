import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

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

    const emailHtml = `
      <h2>New UPI Order Received!</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3>Product Details</h3>
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
      await resend.emails.send({
        from: 'Website Orders <onboarding@resend.dev>', // Update this if a custom domain is verified in Resend
        to: ['agroindustriesmeerut@gmail.com'], // The client's email
        subject: `[NEW ORDER] ₹${amount.toLocaleString('en-IN')} for ${productName} - Ref: ${upiRefId}`,
        html: emailHtml,
      });
    } else {
      console.log('RESEND_API_KEY not found. Simulating order email send:', emailHtml);
    }

    return NextResponse.json({ success: true, message: 'Order submitted successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Validation failed', errors: error.issues }, { status: 400 });
    }
    console.error('Email API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit order' }, { status: 500 });
  }
}
