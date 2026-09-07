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
import nodemailer from 'nodemailer';

// Shared SMTP transport — same env vars the inquiries / transfers /
// site-inquiries routes use. Created lazily so missing env in a non-email
// build doesn't crash the rest of the route.
let _bookingTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;
function getBookingTransporter() {
  if (_bookingTransporter) return _bookingTransporter;
  const host = process.env.SITE_SMTP_HOST;
  const port = Number(process.env.SITE_SMTP_PORT) || 465;
  const user = process.env.SITE_SMTP_USER;
  const pass = process.env.SITE_SMTP_PASS;
  if (!host || !user || !pass) return null;
  _bookingTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
  return _bookingTransporter;
}

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

  // Send confirmation emails to the client + info@ + it@ before
  // responding. We do NOT short-circuit on email failure — the booking
  // is already persisted, and the customer should still get their
  // bookingRef back. Each send is best-effort and logged server-side.
  const emailStatus = await sendBookingEmails({
    name,
    email,
    phone: body.phone,
    bookingRef,
    startDate: start,
    endDate: end,
    numAdults,
    numChildren,
    totalCost,
    perPersonCost,
    currency,
    selections: rated,
    notes: buildNotes(body),
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
      emailStatus,
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

// ── Booking confirmation emails ────────────────────────────────────
//
// Sends three emails using the same SITE_SMTP_* transport as the
// inquiries / transfers routes:
//   1. The client — confirmation + booking ref
//   2. info@jaetravel.co.ke — full enquiry details for sales follow-up
//   3. it@jaetravel.co.ke — booking ref + total, so the IT team can
//      keep an eye on operational health of incoming bookings
//
// All three are best-effort. If SMTP env is not configured, we log a
// warning and return `emailStatus: 'skipped'` so the API still replies
// with the bookingRef and the customer is not stuck on a spinner.
interface BookingEmailArgs {
  name: string;
  email: string;
  phone?: string | null;
  bookingRef: string;
  startDate: Date;
  endDate: Date;
  numAdults: number;
  numChildren: number;
  totalCost: number;
  perPersonCost: number;
  currency: string;
  selections: Array<{ hotelName: string; county: string | null; nights: number; pricePerNight: number; currency: string }>;
  notes: string;
}

async function sendBookingEmails(args: BookingEmailArgs): Promise<{
  client: 'sent' | 'failed' | 'skipped';
  info: 'sent' | 'failed' | 'skipped';
  it: 'sent' | 'failed' | 'skipped';
}> {
  const t = getBookingTransporter();
  if (!t) {
    console.warn('[quote] SMTP env not configured — skipping booking emails for', args.bookingRef);
    return { client: 'skipped', info: 'skipped', it: 'skipped' };
  }

  const fromAddr = process.env.SITE_SMTP_USER!;
  const fmtDate = (d: Date) => d.toISOString().split('T')[0];
  const fmtMoney = (n: number) => `${args.currency} ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  const selectionsRows = args.selections
    .map(
      (s) =>
        `<tr>
          <td style="padding:8px 0;">${s.hotelName}${s.county ? ` <span style="color:#6b7280;">(${s.county})</span>` : ''}</td>
          <td style="padding:8px 0; text-align:right;">${s.nights}</td>
          <td style="padding:8px 0; text-align:right;">${fmtMoney(s.pricePerNight)}</td>
        </tr>`,
    )
    .join('');

  // 1. Client email
  const clientHtml = `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, sans-serif; background:#f9fafb; color:#1f2937;">
  <div style="max-width:600px; margin:20px auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#f97316,#fb923c); color:white; padding:32px 24px; text-align:center;">
      <h1 style="margin:0; font-size:28px;">Booking Received!</h1>
      <p style="margin:6px 0 0; opacity:0.95;">JaeTravel Expeditions</p>
    </div>
    <div style="padding:32px 24px;">
      <p style="font-size:16px;">Hi <strong>${args.name}</strong>,</p>
      <p>Thank you for choosing JaeTravel Expeditions. Your booking enquiry has been received. Our safari consultants will be in touch within <strong>24 hours</strong> to finalise your itinerary.</p>

      <div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:12px; padding:20px; margin:20px 0;">
        <h2 style="margin:0 0 12px; color:#92400e; font-size:18px; border-bottom:2px solid #fbbf24; padding-bottom:6px;">Your Enquiry</h2>
        <table style="width:100%; font-size:15px;">
          <tr><td style="padding:6px 0; color:#92400e; font-weight:600;">Reference:</td><td><code style="background:#fef3c7; padding:4px 8px; border-radius:4px;">${args.bookingRef}</code></td></tr>
          <tr><td style="padding:6px 0; color:#92400e; font-weight:600;">Dates:</td><td>${fmtDate(args.startDate)} → ${fmtDate(args.endDate)}</td></tr>
          <tr><td style="padding:6px 0; color:#92400e; font-weight:600;">Guests:</td><td>${args.numAdults} adult${args.numAdults === 1 ? '' : 's'}${args.numChildren ? `, ${args.numChildren} child${args.numChildren === 1 ? '' : 'ren'}` : ''}</td></tr>
          <tr><td style="padding:6px 0; color:#92400e; font-weight:600;">Total:</td><td><strong style="color:#dc2626; font-size:17px;">${fmtMoney(args.totalCost)}</strong></td></tr>
          <tr><td style="padding:6px 0; color:#92400e; font-weight:600;">Per person:</td><td>${fmtMoney(args.perPersonCost)}</td></tr>
        </table>
      </div>

      ${args.selections.length ? `
      <h3 style="margin:24px 0 8px; color:#1f2937;">Selected Stays</h3>
      <table style="width:100%; border-collapse:collapse; font-size:14px;">
        <thead><tr style="background:#f3f4f6;"><th style="text-align:left; padding:8px;">Hotel</th><th style="text-align:right; padding:8px;">Nights</th><th style="text-align:right; padding:8px;">/night</th></tr></thead>
        <tbody>${selectionsRows}</tbody>
      </table>` : ''}

      <p style="margin-top:24px;">If you have any questions in the meantime, just reply to this email or reach us on WhatsApp:</p>
      <p style="text-align:center; margin:20px 0;">
        <a href="https://wa.me/254726485228" style="display:inline-block; background:#25D366; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Chat on WhatsApp</a>
      </p>
    </div>
    <div style="background:#f3f4f6; padding:24px; text-align:center; font-size:13px; color:#6b7280; border-top:1px solid #e5e7eb;">
      <p style="margin:0;">© 2025 JaeTravel Expeditions | TTA/0036 | Nairobi, Kenya</p>
      <p style="margin:6px 0 0;">
        <a href="tel:+254726485228" style="color:#f97316; text-decoration:none;">+254 726 485 228</a> |
        <a href="mailto:info@jaetravel.co.ke" style="color:#f97316; text-decoration:none;">info@jaetravel.co.ke</a>
      </p>
    </div>
  </div>
</body></html>`;

  // 2. info@ email — full enquiry, sales follow-up
  const infoHtml = `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, sans-serif; background:#f9fafb; color:#1f2937;">
  <div style="max-width:600px; margin:20px auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#059669,#10b981); color:white; padding:32px 24px; text-align:center;">
      <h1 style="margin:0; font-size:28px;">New Booking Enquiry!</h1>
      <p style="margin:6px 0 0; opacity:0.95;">JaeTravel Expeditions</p>
    </div>
    <div style="padding:32px 24px;">
      <h2 style="margin:0 0 12px; color:#059669; font-size:20px;">Customer</h2>
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; margin-bottom:20px;">
        <table style="width:100%; font-size:15px;">
          <tr><td style="padding:6px 0; color:#166534; font-weight:600; width:120px;">Name:</td><td><strong>${args.name}</strong></td></tr>
          <tr><td style="padding:6px 0; color:#166534; font-weight:600;">Email:</td><td><a href="mailto:${args.email}" style="color:#059669;">${args.email}</a></td></tr>
          ${args.phone ? `<tr><td style="padding:6px 0; color:#166534; font-weight:600;">Phone:</td><td><a href="tel:${args.phone}" style="color:#059669;">${args.phone}</a></td></tr>` : ''}
        </table>
      </div>

      <h2 style="margin:0 0 12px; color:#059669; font-size:20px;">Trip</h2>
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; margin-bottom:20px;">
        <table style="width:100%; font-size:15px;">
          <tr><td style="padding:6px 0; color:#166534; font-weight:600;">Reference:</td><td><code style="background:#d1fae5; padding:4px 8px; border-radius:4px;">${args.bookingRef}</code></td></tr>
          <tr><td style="padding:6px 0; color:#166534; font-weight:600;">Dates:</td><td>${fmtDate(args.startDate)} → ${fmtDate(args.endDate)}</td></tr>
          <tr><td style="padding:6px 0; color:#166534; font-weight:600;">Guests:</td><td>${args.numAdults} adult${args.numAdults === 1 ? '' : 's'}${args.numChildren ? `, ${args.numChildren} child${args.numChildren === 1 ? '' : 'ren'}` : ''}</td></tr>
          <tr><td style="padding:6px 0; color:#166534; font-weight:600;">Total:</td><td><strong style="color:#059669; font-size:17px;">${fmtMoney(args.totalCost)}</strong></td></tr>
          <tr><td style="padding:6px 0; color:#166534; font-weight:600;">Per person:</td><td>${fmtMoney(args.perPersonCost)}</td></tr>
        </table>
      </div>

      ${args.selections.length ? `
      <h3 style="margin:0 0 8px; color:#1f2937;">Selected Stays</h3>
      <table style="width:100%; border-collapse:collapse; font-size:14px; margin-bottom:20px;">
        <thead><tr style="background:#f3f4f6;"><th style="text-align:left; padding:8px;">Hotel</th><th style="text-align:right; padding:8px;">Nights</th><th style="text-align:right; padding:8px;">/night</th></tr></thead>
        <tbody>${selectionsRows}</tbody>
      </table>` : ''}

      ${args.notes ? `<h3 style="margin:0 0 8px; color:#1f2937;">Notes</h3><pre style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:12px; font-family:inherit; white-space:pre-wrap; font-size:13px;">${args.notes.replace(/</g, '&lt;')}</pre>` : ''}

      <p style="text-align:center; margin-top:20px;">
        ${args.phone ? `<a href="https://wa.me/${args.phone.replace(/[^0-9]/g, '').replace(/^0/, '254')}" style="display:inline-block; background:#25D366; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Contact Customer</a>` : ''}
      </p>
    </div>
    <div style="background:#f3f4f6; padding:24px; text-align:center; font-size:13px; color:#6b7280;">
      <p style="margin:0;">JaeTravel Booking System</p>
    </div>
  </div>
</body></html>`;

  // 3. IT email — booking ref + total only, lightweight
  const itHtml = `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="font-family: 'Segoe UI', Tahoma, sans-serif; color:#1f2937;">
  <h2>New booking enquiry received</h2>
  <table style="border-collapse:collapse; font-size:14px;">
    <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Reference:</td><td><code>${args.bookingRef}</code></td></tr>
    <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Customer:</td><td>${args.name} &lt;${args.email}&gt;${args.phone ? ` (${args.phone})` : ''}</td></tr>
    <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Dates:</td><td>${fmtDate(args.startDate)} → ${fmtDate(args.endDate)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Guests:</td><td>${args.numAdults}A / ${args.numChildren}C</td></tr>
    <tr><td style="padding:4px 12px 4px 0; color:#6b7280;">Total:</td><td><strong>${fmtMoney(args.totalCost)}</strong></td></tr>
  </table>
  <p style="font-size:13px; color:#6b7280;">Automated notification from the public quote/booking endpoint.</p>
</body></html>`;

  const sends = [
    { key: 'client' as const, msg: { from: `"JaeTravel Expeditions" <${fromAddr}>`, to: args.email, subject: `Booking Enquiry #${args.bookingRef} – Received!`, html: clientHtml } },
    { key: 'info' as const,   msg: { from: `"JaeTravel Bookings" <${fromAddr}>`, to: 'info@jaetravel.co.ke', subject: `New Booking #${args.bookingRef} – ${args.name}`, html: infoHtml } },
    { key: 'it' as const,     msg: { from: `"JaeTravel Bookings" <${fromAddr}>`, to: 'it@jaetravel.co.ke',   subject: `[IT] New booking ${args.bookingRef} – ${fmtMoney(args.totalCost)}`, html: itHtml } },
  ];

  const results = await Promise.allSettled(sends.map((s) => t.sendMail(s.msg)));
  const status = { client: 'skipped' as 'sent' | 'failed' | 'skipped', info: 'skipped' as 'sent' | 'failed' | 'skipped', it: 'skipped' as 'sent' | 'failed' | 'skipped' };
  results.forEach((r, i) => {
    const key = sends[i].key;
    if (r.status === 'fulfilled') status[key] = 'sent';
    else {
      status[key] = 'failed';
      console.error(`[quote] Failed to send ${key} email for ${args.bookingRef}:`, r.reason);
    }
  });
  return status;
}
