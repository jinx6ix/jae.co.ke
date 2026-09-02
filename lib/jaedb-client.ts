// lib/jaedb-client.ts
//
// Client for the itinerary-builder API (app/api/public/* — implemented
// alongside the rest of jaedb's backend in this same merged app). Uses
// relative paths since everything is one deployment now; no separate
// origin/CORS config needed for these calls.

export interface PublicHotel {
  id: number;
  name: string;
  county: string;
  region: string | null;
  stars: number | null;
  category: string | null;
  fromPricePerNight: number | null;
  currency: string;
  budgetTier: 'BUDGET' | 'MID_RANGE' | 'LUXURY' | null;
  roomTypes?: PublicRoomType[];
}

export interface PublicRoomType {
  id: number;
  name: string;
  maxOccupancy: number;
}

export interface PublicCounty {
  id: number;
  name: string;
  region: string | null;
  parkFee: number | null;
  parkFeeCurrency: string;
}

export interface PublicTourDay {
  dayNumber: number;
  title: string;
  description: string | null;
  destination: { name: string } | null;
}

export interface PublicTour {
  id: string;
  title: string;
  description: string | null;
  durationDays: number;
  durationNights: number;
  countries: string;
  highlights: string | null;
  days: PublicTourDay[];
}

export interface QuoteSelection {
  hotelId: number;
  nights: number;
}

export interface ChildInput {
  age: number;
  extraBed: boolean;
}

export interface RouteLegInput {
  countyId: number;
  countyName: string;
  nights: number;
}

export interface LegHotelInput {
  countyId: number;
  hotelId: number;
  roomTypeId: number;
  boardBasis: 'FB' | 'HB' | 'BB' | 'AI';
  /**
   * When the hotel/room-type has no rate on record in the database, the
   * client can supply their own USD/person/night rate (the number the
   * customer was already quoted elsewhere). The server uses it instead of
   * the missing DB row, and flags it on the persisted cost sheet so staff
   * can confirm before sending the final quote.
   */
  clientRatePerPersonSharing?: number | null;
}

export interface ActivityInput {
  /** 0-based day index across the whole trip. */
  dayIndex: number;
  description: string;
  costPerPerson: number;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  numAdults: number;
  numChildren?: number;
  tourPackageId?: string;
  selections: QuoteSelection[];
  notes?: string;
  website?: string; // honeypot field — always leave empty

  // ── New multi-leg builder fields (all optional for back-compat) ──
  /** Children with ages + extra-bed flag. 13+ should be counted as adults
   *  (not included here). When present, overrides numChildren. */
  children?: ChildInput[];
  /** Ordered destination legs. Sum of nights must equal end - start. */
  route?: RouteLegInput[];
  /** 1:1 with route. */
  hotels?: LegHotelInput[];
  /** Per-day extras (game drives, sundowners, etc.). */
  activities?: ActivityInput[];
  /** Minivan vs. landcruiser for transport pricing. */
  vehicle?: 'MINIVAN' | 'LANDCRUISER';
  /** Override the default 10% markup. */
  markupPercent?: number;
}

export interface QuoteResult {
  bookingRef: string;
  totalCost: number;
  perPersonCost: number;
  currency: string;
  breakdown: Record<string, number | string>;
  selections: Array<{
    hotelId: number;
    hotelName: string;
    county: string | null;
    nights: number;
    pricePerNight: number;
    currency: string;
    matched: boolean;
    lineTotal: number;
  }>;
  anyUnmatchedSeason: boolean;
  // New structured breakdown — the result page renders from this when
  // the multi-leg builder was used; falls back to `breakdown` otherwise.
  structuredBreakdown?: {
    accommodation: number;
    parkFees: number;
    transport: number;
    extras: number;
    subtotal: number;
    markup: number;
    total: number;
    perPerson: number;
    pax: number;
    currency: string;
    vehicle: 'MINIVAN' | 'LANDCRUISER';
    days: number;
    transportIsBaseline: true;
    byLeg: Array<{
      legIndex: number;
      countyName: string;
      hotelName: string;
      nights: number;
      accommodation: number;
      parkFees: number;
      matched: boolean;
      currency: string;
      clientSuppliedRate?: boolean;
      clientRatePerPersonSharing?: number;
    }>;
  };
}

async function jaedbFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    // Quotes/hotel lists change often enough that caching is more risk
    // than benefit for this builder — always fetch fresh.
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed (${res.status})`);
  }
  return res.json();
}

export function fetchPublicHotels(params?: {
  county?: string;
  tier?: string;
  q?: string;
  roomTypeId?: number;
}): Promise<PublicHotel[]> {
  const qs = new URLSearchParams();
  if (params?.county) qs.set('county', params.county);
  if (params?.tier) qs.set('tier', params.tier);
  if (params?.q) qs.set('q', params.q);
  if (params?.roomTypeId != null) qs.set('roomTypeId', String(params.roomTypeId));
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return jaedbFetch<PublicHotel[]>(`/api/public/hotels${suffix}`);
}

export function fetchPublicCounties(): Promise<PublicCounty[]> {
  return jaedbFetch<PublicCounty[]>('/api/public/counties');
}

export function fetchPublicTours(): Promise<PublicTour[]> {
  return jaedbFetch<PublicTour[]>('/api/public/tours');
}

export function submitQuote(payload: QuoteRequest): Promise<QuoteResult> {
  return jaedbFetch<QuoteResult>('/api/public/quote', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
