import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const validStatuses = ['New', 'Contacted', 'Converted'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Lead PATCH Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update lead' }, { status: 500 });
  }
}
