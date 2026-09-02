// app/api/public/quote/route.ts
//
// POST-only, unauthenticated. This is what the website's itinerary
// builder calls when someone finishes the multi-step form and hits
// "Get my quote". It creates a real Client + Booking(status=ENQUIRY)
// + CostSheet using the SAME calculateCost()/generateBookingRef() the
// staff dashboard uses (legacy path) or the new pure pricing math in
// lib/pricing-rules.ts (multi-leg path). A quote from the public site
// and a quote a staff member builds by hand produce the same shape of
// record, so it shows up in the normal dashboard/bookings and
// dashboard/cost-sheets views with no special-casing needed there.
//
// Hardening note: `isRateLimited` here is an in-memory, single-instance
// guard — good enough to stop a script kiddie hammering the endpoint
// from one box, not a substitute for real rate limiting/bot protection
// (Cloudflare Turnstile, Vercel Firewall) in front of this route in
// production. Flagging rather than pretending it's solved.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateCost, generateBookingRef } from '@/lib/rates';
import { getRateForStay, getRoomPriceForStay, getParkFeeForCounty, isRateLimited } from '@/lib/public-quote';
import {
  calculatePerPersonQuote,
  accommodationPerNight,
  type OccupantInput,
  type QuoteLegInput,
  type Vehicle,
} from '@/lib/pricing-rules';

interface HotelSelection {
  hotelId: number;
  nights: number;
}

interface ChildInputAPI {
  age: number;
  extraBed: boolean;
}

interface RouteLegInputAPI {
  countyId: number;
  countyName: string;
  nights: number;
}

interface LegHotelInputAPI {
  countyId: number;
  hotelId: number;
  roomTypeId: number;
  boardBasis: 'FB' | 'HB' | 'BB' | 'AI';
  /**
   * Customer-supplied rate, used only when the DB has no rate row for
   * (hotel, roomType, boardBasis). Stored on the CostSheet so staff can
   * verify the number before sending the final quote.
   */
  clientRatePerPersonSharing?: number | null;
}

interface ActivityInputAPI {
  dayIndex: number;
  description: string;
  costPerPerson: number;
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

  // ── New multi-leg builder fields (optional, back-compat) ──
  children?: ChildInputAPI[];
  route?: RouteLegInputAPI[];
  hotels?: LegHotelInputAPI[];
  activities?: ActivityInputAPI[];
  vehicle?: Vehicle;
  markupPercent?: number;
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

  // Decide which path to use. The multi-leg path is taken when the
  // builder supplied `route` + `hotels` (1:1 with the new front-end).
  // The legacy path covers anything else — that lets us ship the new
  // front-end without breaking older forms.
  const useNewPath =
    Array.isArray(body.route) &&
    Array.isArray(body.hotels) &&
    body.route.length > 0 &&
    body.route.length === body.hotels.length;

  try {
    if (useNewPath) {
      return await handleMultiLegQuote(body, start, end);
    }
    return await handleLegacyQuote(body, start, end);
  } catch (e: any) {
    console.error('POST /api/public/quote error:', e);
    return NextResponse.json({ error: 'Could not generate quote' }, { status: 500 });
  }
}

// ── Legacy path (unchanged behavior for the old builder) ────────────
async function handleLegacyQuote(
  body: QuoteRequestBody,
  start: Date,
  end: Date,
) {
  const { name, email, numAdults, selections } = body;
  const numPax = numAdults + (body.numChildren ?? 0);
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

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
  });

  return persistAndRespond({
    body,
    name,
    email,
    start,
    end,
    numAdults,
    numChildren: body.numChildren ?? 0,
    totalDays,
    currency,
    rated,
    breakdown,
    structuredBreakdown: undefined,
  });
}

// ── New multi-leg path ──────────────────────────────────────────────
async function handleMultiLegQuote(
  body: QuoteRequestBody,
  start: Date,
  end: Date,
) {
  const { name, email, numAdults } = body;
  const route = body.route!;
  const hotels = body.hotels!;
  const activities = body.activities ?? [];
  const vehicle: Vehicle = body.vehicle ?? 'MINIVAN';
  const markupPercent = body.markupPercent ?? 10;

  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const totalNights = route.reduce((sum, leg) => sum + leg.nights, 0);
  if (totalNights !== totalDays - 1) {
    return NextResponse.json(
      { error: `Route nights (${totalNights}) must equal trip nights (${totalDays - 1})` },
      { status: 400 }
    );
  }

  // Build the occupants list. 13+ children are counted as adults by the
  // front-end, so we just append `children` after `numAdults` adults.
  const children = (body.children ?? []).filter((c) => c.age < 13);
  if (numAdults + children.length === 0) {
    return NextResponse.json({ error: 'At least one adult or child is required' }, { status: 400 });
  }
  const occupants: OccupantInput[] = [
    ...Array.from({ length: numAdults }, () => ({ age: 30, extraBed: false })),
    ...children.map((c) => ({ age: c.age, extraBed: c.extraBed })),
  ];

  // Build a QuoteLeg per route entry. For each leg, look up the matching
  // hotel's room-type price for the start date of the trip (we use the
  // trip start as the season probe — season rows span a wide window
  // and the start-of-trip date is the most stable choice for a
  // single-season quote). Park fee comes from SRCounty.parkFee.
  const legs: QuoteLegInput[] = [];
  const legMeta: Array<{
    countyName: string;
    hotelName: string;
    matched: boolean;
    clientSuppliedRate: boolean;
    clientRatePerPersonSharing: number | null;
  }> = [];
  let currency: string | null = null;
  let anyUnmatchedSeason = false;

  for (let i = 0; i < route.length; i++) {
    const leg = route[i];
    const sel = hotels[i];

    const hotel = await prisma.sRHotel.findUnique({
      where: { id: sel.hotelId },
      select: { name: true, countyId: true, county: { select: { name: true } } },
    });
    if (!hotel) {
      return NextResponse.json({ error: `Hotel ${sel.hotelId} not found` }, { status: 400 });
    }

    const roomType = await prisma.sRRoomType.findUnique({
      where: { id: sel.roomTypeId },
      select: { id: true, name: true, maxOccupancy: true, hotelId: true },
    });
    if (!roomType || roomType.hotelId !== sel.hotelId) {
      return NextResponse.json(
        { error: `Room type ${sel.roomTypeId} does not belong to hotel ${sel.hotelId}` },
        { status: 400 }
      );
    }
    if (roomType.maxOccupancy < occupants.length) {
      return NextResponse.json(
        { error: `Room "${roomType.name}" sleeps up to ${roomType.maxOccupancy} — need ${occupants.length}` },
        { status: 400 }
      );
    }

    const price = await getRoomPriceForStay(sel.hotelId, start, sel.roomTypeId, sel.boardBasis);
    let clientSuppliedRate = false;
    let rateForBreakdown: typeof price;
    if (price) {
      rateForBreakdown = price;
      if (!price.matched) anyUnmatchedSeason = true;
    } else if (
      typeof sel.clientRatePerPersonSharing === "number" &&
      sel.clientRatePerPersonSharing > 0
    ) {
      // No DB row — but the client (customer) gave us a number from
      // somewhere. Treat it as the adult-sharing rate, leave child /
      // third-adult rates blank (the calculator falls back to the adult
      // rate for children in that case, which is the right conservative
      // behavior). Flag the breakdown so staff confirm the figure.
      rateForBreakdown = {
        pricePerNight: sel.clientRatePerPersonSharing,
        currency: "USD",
        ratePerPersonSharing: sel.clientRatePerPersonSharing,
        singleRoomRate: null,
        childRate: null,
        thirdAdultRate: null,
        matched: false,
      };
      clientSuppliedRate = true;
    } else {
      return NextResponse.json(
        {
          error: `No rate on record for ${hotel.name} / ${roomType.name} (${sel.boardBasis}). Either pick a different room type, or enter the rate you've been quoted (USD per person per night) and we'll confirm it with you.`,
        },
        { status: 400 }
      );
    }

    const parkFee = await getParkFeeForCounty(leg.countyId);

    legs.push({
      nights: leg.nights,
      price: {
        ratePerPersonSharing: rateForBreakdown.ratePerPersonSharing,
        singleRoomRate: rateForBreakdown.singleRoomRate,
        childRate: rateForBreakdown.childRate,
        thirdAdultRate: rateForBreakdown.thirdAdultRate,
        currency: rateForBreakdown.currency,
      },
      roomType: {
        id: roomType.id,
        name: roomType.name,
        maxOccupancy: roomType.maxOccupancy,
      },
      occupants,
      parkFeePerPersonPerDay: leg.includeParkFee === false ? undefined : parkFee?.amount,
    });
    legMeta.push({
      countyName: leg.countyName,
      hotelName: hotel.name,
      matched: rateForBreakdown.matched,
      clientSuppliedRate,
      clientRatePerPersonSharing:
        sel.clientRatePerPersonSharing ?? null,
    });
    if (currency == null) currency = rateForBreakdown.currency;
  }

  // The calculator insists on a single currency. If the legs disagree,
  // log a warning and use the first leg's currency — same fallback
  // policy as the legacy path.
  if (legs.some((l) => l.price.currency !== currency)) {
    console.warn('[quote] mixed-currency route — using first leg currency', currency);
  }

  const breakdown = calculatePerPersonQuote({
    legs,
    days: totalDays,
    vehicle,
    activities: activities.map((a) => ({ description: a.description, costPerPerson: a.costPerPerson })),
    markupPercent,
  });

  // Build the byLeg array for the response and for the dayRows JSON.
  const byLeg = legs.map((leg, idx) => ({
    legIndex: idx,
    countyName: legMeta[idx].countyName,
    hotelName: legMeta[idx].hotelName,
    nights: leg.nights,
    accommodation: accommodationPerNight(leg) * leg.nights,
    parkFees: (leg.parkFeePerPersonPerDay ?? 0) * leg.nights * occupants.length,
    matched: legMeta[idx].matched,
    currency: leg.price.currency,
    clientSuppliedRate: legMeta[idx].clientSuppliedRate,
    clientRatePerPersonSharing: legMeta[idx].clientRatePerPersonSharing,
  }));

  // Persist as a "rated" array the legacy dashboard can still render
  // (the dashboard's parseDayRows reads `hotelName`, `adultCostPP`,
  // `childCostPP`, `parkFeeAdultPP`, `transportPP` etc. with fallbacks).
  const ratedForDashboard = legs.map((leg, idx) => ({
    hotelId: hotels[idx].hotelId,
    hotelName: legMeta[idx].hotelName,
    county: legMeta[idx].countyName,
    nights: leg.nights,
    pricePerNight: leg.price.ratePerPersonSharing ?? 0,
    currency: leg.price.currency,
    matched: legMeta[idx].matched,
    lineTotal: accommodationPerNight(leg) * leg.nights,
  }));

  // Match the legacy response shape so the existing result page still works
  // until we ship a fully-rebuilt result UI.
  const legacyBreakdown = calculateCost({
    days: totalDays,
    numPax: occupants.length,
    propertyRatePerNight: legs[0].price.ratePerPersonSharing ?? 0,
    numNights: totalNights,
    currency: currency ?? 'USD',
  });

  return persistAndRespond({
    body,
    name,
    email,
    start,
    end,
    numAdults,
    numChildren: children.length,
    totalDays,
    currency: currency ?? 'USD',
    rated: ratedForDashboard,
    breakdown: legacyBreakdown,
    structuredBreakdown: {
      accommodation: breakdown.accommodation,
      parkFees: breakdown.parkFees,
      transport: breakdown.transport,
      extras: breakdown.extras,
      subtotal: breakdown.subtotal,
      markup: breakdown.markup,
      total: breakdown.total,
      perPerson: breakdown.perPerson,
      pax: breakdown.pax,
      currency: breakdown.currency,
      vehicle: breakdown.vehicle,
      days: breakdown.days,
      transportIsBaseline: true,
      byLeg,
    },
  });
}

// ── Shared persistence + response ───────────────────────────────────
async function persistAndRespond(args: {
  body: QuoteRequestBody;
  name: string;
  email: string;
  start: Date;
  end: Date;
  numAdults: number;
  numChildren: number;
  totalDays: number;
  currency: string;
  rated: Array<{
    hotelId: number;
    hotelName: string;
    county: string | null;
    nights: number;
    pricePerNight: number;
    currency: string;
    matched: boolean;
    lineTotal: number;
    // The two extra fields below are only present on the multi-leg
    // path (legacy path doesn't set them). The dashboard's parseDayRows
    // is defensive about unknown fields, so we just widen the type here
    // to let the JSON.stringify below carry the markers through.
    clientSuppliedRate?: boolean;
    clientRatePerPersonSharing?: number | null;
  }>;
  breakdown: ReturnType<typeof calculateCost>;
  structuredBreakdown: import('@/lib/jaedb-client').QuoteResult['structuredBreakdown'];
}) {
  const { body, name, email, start, end, numAdults, numChildren, totalDays, currency, rated, breakdown, structuredBreakdown } = args;

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
  const totalCost = structuredBreakdown?.total ?? breakdown.totalCost;
  const perPersonCost = structuredBreakdown?.perPerson ?? breakdown.perPersonCost;

  const booking = await prisma.booking.create({
    data: {
      bookingRef,
      clientId: client.id,
      tourPackageId: body.tourPackageId ?? null,
      status: 'ENQUIRY',
      startDate: start,
      endDate: end,
      numAdults,
      numChildren,
      totalAmount: totalCost,
      currency,
      // Persist child ages + extra-bed flags in notes so the staff
      // dashboard can see them when reviewing the ENQUIRY. Format is
      // human-readable; the staff cost-sheet UI doesn't parse it yet.
      notes: buildNotes(body),
    },
  });

  await prisma.costSheet.create({
    data: {
      bookingId: booking.id,
      clientId: client.id,
      bookingRef,
      tourTitle: body.tourPackageId ? 'Custom itinerary (from template)' : 'Custom itinerary (built on website)',
      days: totalDays,
      numPax: numAdults + numChildren,
      numAdults,
      numChildren,
      subtotal: structuredBreakdown?.subtotal ?? breakdown.subtotal,
      markupPercent: 10,
      markupAmount: structuredBreakdown?.markup ?? breakdown.markupAmount,
      totalCost,
      perAdultCost: perPersonCost,
      currency,
      // The dashboard's parseDayRows is defensive: any unknown field is
      // ignored, so the new structured shape is safe to write here
      // even before the dashboard learns to render it. The cost-sheet
      // UI update is a follow-up.
      dayRows: JSON.stringify(
        structuredBreakdown
          ? {
              kind: 'multi-leg',
              breakdown: structuredBreakdown,
              legs: rated,
            }
          : rated,
      ),
      notes: 'Generated from the public website itinerary builder.',
    },
  });

  return NextResponse.json(
    {
      bookingRef,
      totalCost,
      perPersonCost,
      currency,
      breakdown,
      selections: rated,
      anyUnmatchedSeason: rated.some((r) => !r.matched),
      structuredBreakdown,
    },
    { status: 201 }
  );
}

function buildNotes(body: QuoteRequestBody): string {
  const parts: string[] = [];
  if (body.notes) parts.push(body.notes);
  if (body.children && body.children.length > 0) {
    parts.push(
      `Children: ${body.children
        .map((c) => `${c.age}yo${c.extraBed ? ' (extra bed)' : ''}`)
        .join(', ')}`,
    );
  }
  if (body.route && body.route.length > 0) {
    parts.push(
      `Route: ${body.route.map((l) => `${l.countyName} (${l.nights}n)`).join(' → ')}`,
    );
  }
  if (body.vehicle) parts.push(`Vehicle: ${body.vehicle}`);
  if (body.activities && body.activities.length > 0) {
    parts.push(
      `Activities: ${body.activities
        .map((a) => `day ${a.dayIndex + 1} ${a.description} @ $${a.costPerPerson}/pp`)
        .join('; ')}`,
    );
  }
  // Flag legs where the client (customer) supplied a rate because we
  // had no record in the DB. Staff should confirm the number before
  // sending the final quote — it's the only thing on the ENQUIRY the
  // client could be wrong about.
  if (body.hotels && body.hotels.length > 0) {
    const clientSupplied = body.hotels
      .map((h, i) => ({ h, route: body.route?.[i] }))
      .filter(({ h }) => typeof h.clientRatePerPersonSharing === "number" && h.clientRatePerPersonSharing > 0);
    if (clientSupplied.length > 0) {
      parts.push(
        `Client-supplied rates (NEED CONFIRMATION): ${clientSupplied
          .map(
            ({ h, route }) =>
              `${route?.countyName ?? "Leg"} $${h.clientRatePerPersonSharing}/pp/night`,
          )
          .join(', ')}`,
      );
    }
  }
  return parts.join('\n');
}
