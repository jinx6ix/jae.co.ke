// app/api/online-bookings/route.ts
// Public site endpoint that records an incoming booking into the shared
// Supabase `online_bookings` table. The operator's dashboard then sees the
// row in /dashboard/online-bookings in real time and confirms or rejects it.
//
// This route is called from the booking forms (components/booking-form.tsx,
// components/vehicle-booking-form.tsx, etc.) AFTER the existing
// /api/bookings or /api/vehicle-hire route has sent the customer email.
// The user-visible success path is the email; this DB write is a parallel
// path that adds visibility to the dashboard.
//
// Idempotency: online_bookings.source_booking_id is UNIQUE. If the same
// client retries (double-click, network flake), the second insert is a
// Postgres-level no-op and we return the existing row's id.

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// Accept the union of tour-booking and vehicle-hire form payloads.
// The form already sends the fields it has; we fill in defaults for the rest.
const OnlineBookingSchema = z.object({
  source_booking_id: z.string().min(1).max(200),
  booking_kind: z.enum(['tour', 'vehicle_hire']),

  tour_slug: z.string().max(200).nullable().optional(),
  vehicle_slug: z.string().max(200).nullable().optional(),
  service_name: z.string().max(500).nullable().optional(),

  customer_name: z.string().min(1).max(200),
  customer_email: z.string().email().nullable().optional().or(z.literal('')),
  customer_phone: z.string().min(3).max(50),
  customer_country: z.string().max(100).nullable().optional(),

  // ISO date YYYY-MM-DD. We sanity-check the date is in a plausible
  // window (today → +5y) so a malicious client can't pollute the
  // dashboard with year-9999 or year-1900 rows.
  departure_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD')
    .refine(
      (s) => {
        const d = new Date(s + 'T00:00:00Z').getTime();
        if (Number.isNaN(d)) return false;
        const now = Date.now();
        const fiveYears = 5 * 365 * 24 * 60 * 60 * 1000;
        return d >= now - 24 * 60 * 60 * 1000 && d <= now + fiveYears;
      },
      { message: 'departure_date must be within the last day and next 5 years' },
    ),
  return_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD')
    .nullable()
    .optional(),

  adults: z.number().int().min(1).max(100).default(1),
  // Capped at $1M as a sanity bound. Real safari tours are < $50k.
  total_price: z.number().nonnegative().max(1_000_000),
  currency: z.string().max(10).nullable().optional(),

  pickup_location: z.string().max(300).nullable().optional(),
  special_requests: z.string().max(2000).nullable().optional(),
  source_url: z.string().url().nullable().optional(),
});

export async function POST(req: NextRequest) {
  // 1. Parse + validate.
  let body: z.infer<typeof OnlineBookingSchema>;
  try {
    body = OnlineBookingSchema.parse(await req.json());
  } catch (err) {
    const details = err instanceof z.ZodError ? err.issues : err;
    return NextResponse.json(
      { ok: false, error: 'invalid_payload', details },
      { status: 400 },
    );
  }

  // 2. Confirm env is configured. If the public site isn't pointed at the
  //    shared project yet, return a soft 503 so the form logs and moves on
  //    (the email is the user-visible success path).
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error(
      '[online-bookings] not_configured source_booking_id=',
      body.source_booking_id,
    );
    return NextResponse.json(
      { ok: false, error: 'not_configured' },
      { status: 503 },
    );
  }

  // 3. Insert via the server-side anon client. RLS policy permits this.
  const supabase = await createClient();

  const row = {
    source_booking_id: body.source_booking_id,
    booking_kind: body.booking_kind,
    tour_slug: body.tour_slug ?? null,
    vehicle_slug: body.vehicle_slug ?? null,
    service_name: body.service_name ?? null,
    customer_name: body.customer_name,
    customer_email: body.customer_email || null,
    customer_phone: body.customer_phone,
    customer_country: body.customer_country ?? null,
    departure_date: body.departure_date,
    return_date: body.return_date ?? null,
    adults: body.adults,
    total_price: body.total_price,
    currency: body.currency ?? 'USD',
    pickup_location: body.pickup_location ?? null,
    special_requests: body.special_requests ?? null,
    source_url: body.source_url ?? null,
  };

  const { data: inserted, error: insertErr } = await supabase
    .from('online_bookings')
    .upsert(row as never, { onConflict: 'source_booking_id', ignoreDuplicates: false })
    .select('id, source_booking_id, status, created_at')
    .maybeSingle() as {
      data: { id: string; source_booking_id: string; status: string; created_at: string } | null;
      error: { code?: string; message: string } | null;
    };

  if (insertErr) {
    console.error(
      '[online-bookings] insert_failed source_booking_id=',
      body.source_booking_id,
      'code=',
      insertErr.code,
      'message=',
      insertErr.message,
    );
    return NextResponse.json(
      { ok: false, error: 'insert_failed', details: insertErr.message },
      { status: 500 },
    );
  }

  if (!inserted) {
    console.error(
      '[online-bookings] no_row_returned source_booking_id=',
      body.source_booking_id,
    );
    return NextResponse.json(
      { ok: false, error: 'no_row_returned' },
      { status: 500 },
    );
  }

  // Idempotency: an upsert with `ignoreDuplicates: false` is "insert or
  // update". `created_at` here is the row's create time (not the upsert
  // time), so a retried form sees the original timestamp and the
  // dashboard can detect "this is a retry, not a new booking".
  console.log(
    '[online-bookings] action=inserted source_booking_id=',
    inserted.source_booking_id,
    'id=',
    inserted.id,
    'status=',
    inserted.status,
  );

  return NextResponse.json({
    ok: true,
    id: inserted.id,
    source_booking_id: inserted.source_booking_id,
    status: inserted.status,
    created_at: inserted.created_at,
  });
}
