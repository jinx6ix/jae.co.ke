// app/api/public/quote/route.ts
//
// POST-only, unauthenticated. This is what the website's itinerary
// builder calls when someone finishes picking hotels and hits
// "Get my quote". It creates a real Client + Booking(status=ENQUIRY)
// + CostSheet using the SAME calculateCost()/generateBookingRef() the
// staff dashboard uses — a quote from the public site and a quote a
// staff member builds by hand produce the same shape of record, so it
// shows up in the normal dashboard/bookings and dashboard/cost-sheets
// views with no special-casing needed there.
//
// Hardening note: `isRateLimited` here is an in-memory, single-instance
// guard — good enough to stop a script kiddie hammering the endpoint
// from one box, not a substitute for real rate limiting/bot protection
// (Cloudflare Turnstile, Vercel Firewall) in front of this route in
// production. Flagging rather than pretending it's solved.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateCost, generateBookingRef } from '@/lib/rates';
import { getRateForStay, isRateLimited } from '@/lib/public-quote';

interface HotelSelection {
  hotelId: number;
  nights: number;
}

interface QuoteRequestBody {
  name: string;
  email: string;
  phone?: string;
  startDate: string;
  endDate: string;
  numAdults: number;
  numChildren?: number;
  tourPackageId?: string;
  selections: HotelSelection[];
  notes?: string;
  website?: string; // honeypot — real users never fill this in
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests — please try again shortly.' }, { status: 429 });
  }

  let body: QuoteRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (body.website) {
    // Honeypot tripped — pretend success so a bot doesn't learn it was caught.
    return NextResponse.json({ bookingRef: generateBookingRef(), totalCost: 0, currency: 'USD' }, { status: 201 });
  }

  const { name, email, startDate, endDate, numAdults, selections } = body;
  if (!name || !email || !startDate || !endDate || !numAdults || !selections?.length) {
    return NextResponse.json(
      { error: 'name, email, startDate, endDate, numAdults, and at least one hotel selection are required' },
      { status: 400 }
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) {
    return NextResponse.json({ error: 'Invalid date range' }, { status: 400 });
  }

  const numPax = numAdults + (body.numChildren ?? 0);
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  try {
    // Rate lookup + selection detail, one call per selection (small N —
    // an itinerary builder realistically has a handful of legs, not hundreds).
    const rated = await Promise.all(
      selections.map(async (sel) => {
        const rate = await getRateForStay(sel.hotelId, start);
        const hotel = await prisma.sRHotel.findUnique({
          where: { id: sel.hotelId },
          select: { name: true, county: { select: { name: true } } },
        });
        return {
          hotelId: sel.hotelId,
          hotelName: hotel?.name ?? `Hotel #${sel.hotelId}`,
          county: hotel?.county.name ?? null,
          nights: sel.nights,
          pricePerNight: rate?.pricePerNight ?? 0,
          currency: rate?.currency ?? 'USD',
          matched: rate?.matched ?? false,
          lineTotal: (rate?.pricePerNight ?? 0) * sel.nights * numPax,
        };
      })
    );

    const totalNights = rated.reduce((sum, r) => sum + r.nights, 0);
    const totalPropertyCost = rated.reduce((sum, r) => sum + r.lineTotal, 0);
    const avgPropertyRatePerNight = totalNights > 0 ? totalPropertyCost / (totalNights * numPax) : 0;
    const currency = rated[0]?.currency ?? 'USD';

    const breakdown = calculateCost({
      days: totalDays,
      numPax,
      propertyRatePerNight: avgPropertyRatePerNight,
      numNights: totalNights,
      currency,
      // fileHandlingFee/ecoBottle/evacInsurance intentionally left at
      // defaults (0) here — those are jaedb's standard per-booking add-
      // ons and should be applied the same way staff apply them
      // elsewhere, not guessed at from a public form.
    });

    // Find-or-create by email so repeat visitors don't create duplicate
    // client records every time they request a quote. NOTE: jaedb's
    // Client.email field is NOT marked @unique in prisma/schema.prisma,
    // so prisma.client.upsert({ where: { email } }) is not valid Prisma
    // usage here (upsert requires a unique/id field) — this does the
    // equivalent by hand instead. If you do add a @unique constraint to
    // Client.email later, this can be simplified back to a real upsert.
    const existingClient = await prisma.client.findFirst({ where: { email } });
    const client = existingClient
      ? await prisma.client.update({
          where: { id: existingClient.id },
          data: { name, phone: body.phone ?? existingClient.phone },
        })
      : await prisma.client.create({ data: { name, email, phone: body.phone ?? null } });

    const bookingRef = generateBookingRef();
    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        clientId: client.id,
        tourPackageId: body.tourPackageId ?? null,
        status: 'ENQUIRY',
        startDate: start,
        endDate: end,
        numAdults,
        numChildren: body.numChildren ?? 0,
        totalAmount: breakdown.totalCost,
        currency,
        notes: body.notes ?? null,
      },
    });

    await prisma.costSheet.create({
      data: {
        bookingId: booking.id,
        clientId: client.id,
        bookingRef,
        tourTitle: body.tourPackageId ? 'Custom itinerary (from template)' : 'Custom itinerary (built on website)',
        days: totalDays,
        numPax,
        numAdults,
        numChildren: body.numChildren ?? 0,
        subtotal: breakdown.subtotal,
        markupPercent: 10,
        markupAmount: breakdown.markupAmount,
        totalCost: breakdown.totalCost,
        perAdultCost: breakdown.perPersonCost,
        currency,
        dayRows: JSON.stringify(rated),
        notes: 'Generated from the public website itinerary builder.',
      },
    });

    return NextResponse.json(
      {
        bookingRef,
        totalCost: breakdown.totalCost,
        perPersonCost: breakdown.perPersonCost,
        currency,
        breakdown,
        selections: rated,
        anyUnmatchedSeason: rated.some((r) => !r.matched),
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.error('POST /api/public/quote error:', e);
    return NextResponse.json({ error: 'Could not generate quote' }, { status: 500 });
  }
}
