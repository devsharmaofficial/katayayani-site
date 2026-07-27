import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_123');

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[0-9\s-]{10,15}$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const { name, phone, message, type } = validatedData;
    const formType = type === 'enquiry' ? 'Pricing Enquiry' : 'Contact Message';

    const emailHtml = `
      <h2>New ${formType} from Katayayani Enterprises Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email using Resend
    // In production, process.env.RESEND_API_KEY must be set, and the "to" email should be the client's email.
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Website Form <onboarding@resend.dev>', // Update this if a custom domain is verified in Resend
        to: ['agroindustriesmeerut@gmail.com'], // The client's email
        subject: `[Website] New ${formType} from ${name}`,
        html: emailHtml,
      });
    } else {
      console.log('RESEND_API_KEY not found. Simulating email send:', emailHtml);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Validation failed', errors: error.issues }, { status: 400 });
    }
    console.error('Email API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}
