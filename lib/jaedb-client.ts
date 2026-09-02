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

export function fetchPublicHotels(params?: { county?: string; tier?: string; q?: string }): Promise<PublicHotel[]> {
  const qs = new URLSearchParams();
  if (params?.county) qs.set('county', params.county);
  if (params?.tier) qs.set('tier', params.tier);
  if (params?.q) qs.set('q', params.q);
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return jaedbFetch<PublicHotel[]>(`/api/public/hotels${suffix}`);
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
