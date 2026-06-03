// lib/online-bookings.ts
//
// Client-side helper that records a booking into the shared Supabase
// `online_bookings` table. The booking form on the public site calls
// this AFTER the email/admin-notification route has returned a booking
// id, reusing that id as `source_booking_id` so the dashboard row and
// the email reference the same booking.
//
// Design notes:
//   * Always returns a discriminated union — never throws. Callers can
//     branch on `ok` without try/catch noise and decide their own UX.
//   * The 4xx/5xx from the route handler carry enough detail for the
//     caller to log/alert without re-parsing; we surface the JSON body
//     in `details` when the response is JSON.

export type OnlineBookingWriteInput = {
  source_booking_id: string;
  booking_kind: 'tour' | 'vehicle_hire';

  tour_slug?: string | null;
  vehicle_slug?: string | null;
  service_name?: string | null;

  customer_name: string;
  customer_email?: string | null;
  customer_phone: string;
  customer_country?: string | null;

  departure_date: string; // YYYY-MM-DD
  return_date?: string | null;

  adults: number;
  total_price: number;
  currency?: string | null;

  pickup_location?: string | null;
  special_requests?: string | null;
  source_url?: string | null;
};

export type OnlineBookingWriteError =
  | 'network'          // fetch threw (offline, DNS, CORS, etc.)
  | 'invalid_payload'  // 400 — Zod validation failed
  | 'not_configured'   // 503 — env not set on the server
  | 'server_error'     // any other 5xx
  | 'invalid_response';// 2xx with unexpected shape

export type OnlineBookingWriteResult =
  | {
      ok: true;
      id: string;
      source_booking_id: string;
      status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
      created_at: string;
    }
  | {
      ok: false;
      error: OnlineBookingWriteError;
      status: number;
      details?: unknown;
    };

export async function recordOnlineBooking(
  input: OnlineBookingWriteInput,
): Promise<OnlineBookingWriteResult> {
  let res: Response;
  try {
    res = await fetch('/api/online-bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch (err) {
    return {
      ok: false,
      error: 'network',
      status: 0,
      details: err instanceof Error ? err.message : String(err),
    };
  }

  // The route always returns JSON; fall back to text if a future proxy
  // strips it so we still get a useful signal.
  const text = await res.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
  }

  if (res.ok) {
    const b = body as { id?: unknown; source_booking_id?: unknown; status?: unknown; created_at?: unknown } | null;
    if (b && typeof b.id === 'string' && typeof b.source_booking_id === 'string') {
      return {
        ok: true,
        id: b.id,
        source_booking_id: b.source_booking_id,
        status: (typeof b.status === 'string' ? b.status : 'pending') as OnlineBookingWriteResult extends { ok: true; status: infer S } ? S : never,
        created_at: typeof b.created_at === 'string' ? b.created_at : new Date().toISOString(),
      };
    }
    return {
      ok: false,
      error: 'invalid_response',
      status: res.status,
      details: text.slice(0, 500),
    };
  }

  const code =
    body && typeof body === 'object' && 'error' in body && typeof (body as { error: unknown }).error === 'string'
      ? (body as { error: string }).error
      : null;

  let error: OnlineBookingWriteError;
  switch (code) {
    case 'invalid_payload':
      error = 'invalid_payload';
      break;
    case 'not_configured':
      error = 'not_configured';
      break;
    default:
      error = 'server_error';
  }

  return {
    ok: false,
    error,
    status: res.status,
    details: body ?? text.slice(0, 500),
  };
}
