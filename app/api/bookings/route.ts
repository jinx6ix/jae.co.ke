// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateBookingRef } from '@/lib/rates';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const withTour = searchParams.get('withTour') === '1';
  const clientId = searchParams.get('clientId');
  // ?all=1 returns every booking (used by the cost calculator). Without it, cap at 200.
  const all = searchParams.get('all') === '1';

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    take: all ? undefined : 200,
    where: clientId ? { clientId } : undefined,
    include: {
      client: { select: { id: true, name: true } },
      ...(withTour
        ? { tourPackage: { include: { days: { orderBy: { dayNumber: 'asc' } } } } }
        : { tourPackage: { select: { id: true, title: true } } }),
    },
  });

  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        bookingRef: generateBookingRef(),
        clientId: body.clientId,
        tourPackageId: body.tourPackageId || null,
        assignedToId: body.assignedToId || null,
        status: 'ENQUIRY',
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        numAdults: Number(body.numAdults),
        numChildren: Number(body.numChildren) || 0,
        isResident: body.isResident ?? false,
        totalAmount: body.totalAmount ? Number(body.totalAmount) : null,
        currency: body.currency || 'USD',
        paidAmount: 0,
        notes: body.notes || null,
        specialRequirements: body.specialRequirements || null,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
