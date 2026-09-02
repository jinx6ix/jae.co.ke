// lib/pricing-rules.ts
//
// Pure pricing math for the customer-facing quotation builder.
//
// Every other surface (the front-end itinerary-builder, the /api/public/quote
// endpoint, and eventually the staff cost-sheet UI) should call into this
// module instead of re-deriving rates. No DB calls, no React, no Next.js — so
// the rules are trivial to unit-test and trivial to migrate to a server-side
// cost-sheet later.
//
// Constants
// ---------
// - CHILD_ADULT_AGE_CUTOFF: a child becomes an adult at 13. They count as
//   one of the "adult pax" and are charged ratePerPersonSharing.
// - MARKUP_PERCENT: 10% margin on the whole subtotal (accommodation + park
//   fees + transport + activities), applied after the sum.
// - TRANSPORT_RATES: USD per day for the whole vehicle (not per person).
//   Safari operators hire a vehicle for the trip, then divide the cost
//   across pax on the per-person line. The marketing result page flags
//   this as a baseline ("staff will confirm the final rate per season")
//   and shows an amber banner.
//
// Per-occupant rule (the tricky one)
// ----------------------------------
// - Adult (age >= 13): ratePerPersonSharing.
// - Child sharing (no extra bed): childRate.
// - Child with extra bed:
//     - On a TRIPLE room (maxOccupancy >= 3) where thirdAdultRate exists:
//         charge thirdAdultRate (the contract rate for a 3rd adult in a
//         triple — applied to a child occupying that 3rd bed).
//     - On any other room (single/double/twin): charge ratePerPersonSharing
//         because the child is taking a full bed slot. Falls back to
//         ratePerPersonSharing if the row is missing the child rate.
//
// Per-night accommodation for one room is the sum of rateForOccupant across
// the room's max occupancy (excess occupants spill into a second room — out
// of scope for v1, the form warns).

export const CHILD_ADULT_AGE_CUTOFF = 13;
export const MARKUP_PERCENT = 10;
export const TRANSPORT_RATES = {
  MINIVAN: 150,
  LANDCRUISER: 200,
} as const; // USD per day for the whole vehicle

export type Vehicle = keyof typeof TRANSPORT_RATES;

export function isAdult(age: number): boolean {
  return age >= CHILD_ADULT_AGE_CUTOFF;
}

export interface RoomPrice {
  ratePerPersonSharing: number | null;
  singleRoomRate: number | null;
  childRate: number | null;
  thirdAdultRate: number | null;
  currency: string;
}

export interface RoomType {
  id: number;
  name: string;
  maxOccupancy: number;
}

export interface OccupantInput {
  age: number;
  extraBed: boolean;
}

export interface QuoteLegInput {
  nights: number;
  price: RoomPrice;
  roomType: RoomType;
  occupants: OccupantInput[];
  /** Park fee per person per day for this leg's county. Omit when free. */
  parkFeePerPersonPerDay?: number;
}

export interface QuoteInput {
  legs: QuoteLegInput[];
  /** Total days for transport calculation (end - start + 1). */
  days: number;
  vehicle: Vehicle;
  /** One entry per activity, cost per person, summed then × pax. */
  activities: { description?: string; costPerPerson: number }[];
  /** Override the default 10% markup. */
  markupPercent?: number;
}

export interface QuoteBreakdown {
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
  vehicle: Vehicle;
  days: number;
  transportIsBaseline: true; // constant — the result page uses it for the amber banner
}

/** Per-person accommodation rate for ONE occupant given the child/extra-bed rules. */
export function rateForOccupant(
  price: RoomPrice,
  roomType: RoomType,
  occupant: OccupantInput,
): number {
  const adultRate = price.ratePerPersonSharing ?? 0;
  if (isAdult(occupant.age)) return adultRate;
  if (!occupant.extraBed) return price.childRate ?? adultRate;
  // Child with extra bed:
  if (roomType.maxOccupancy >= 3 && price.thirdAdultRate != null) {
    return price.thirdAdultRate;
  }
  return adultRate;
}

/** Total accommodation cost per night for one room (sum of occupant rates up to maxOccupancy). */
export function accommodationPerNight(input: {
  price: RoomPrice;
  roomType: RoomType;
  occupants: OccupantInput[];
}): number {
  return input.occupants
    .slice(0, input.roomType.maxOccupancy)
    .reduce((sum, occ) => sum + rateForOccupant(input.price, input.roomType, occ), 0);
}

/**
 * End-to-end quote calculation. Pure function — no I/O, no DB, no React.
 * Returns the structured breakdown the result page and the staff dashboard
 * both render.
 */
export function calculatePerPersonQuote(input: QuoteInput): QuoteBreakdown {
  const markupPercent = input.markupPercent ?? MARKUP_PERCENT;
  const pax = input.legs[0]?.occupants.length ?? 0;
  if (pax === 0) {
    throw new Error("calculatePerPersonQuote: no occupants on the first leg");
  }
  if (input.legs.length === 0) {
    throw new Error("calculatePerPersonQuote: no legs");
  }

  const accommodation = input.legs.reduce(
    (sum, leg) => sum + accommodationPerNight(leg) * leg.nights,
    0,
  );

  const parkFees = input.legs.reduce(
    (sum, leg) => sum + (leg.parkFeePerPersonPerDay ?? 0) * leg.nights * pax,
    0,
  );

  // Vehicle is hired for the trip, not per seat — multiply by days only.
  // The per-person line naturally gets the pax share when we divide total / pax.
  const transport = TRANSPORT_RATES[input.vehicle] * input.days;

  const extras =
    input.activities.reduce((sum, a) => sum + (a.costPerPerson || 0), 0) * pax;

  const subtotal = accommodation + parkFees + transport + extras;
  const markup = subtotal * (markupPercent / 100);
  const total = subtotal + markup;

  // Currency: all legs must agree; fall back to the first leg's price currency.
  const currency = input.legs[0]?.price.currency ?? "USD";

  return {
    accommodation,
    parkFees,
    transport,
    extras,
    subtotal,
    markup,
    total,
    perPerson: total / pax,
    pax,
    currency,
    vehicle: input.vehicle,
    days: input.days,
    transportIsBaseline: true,
  };
}

/**
 * Split a quote across legs for the "review" step and for the persisted
 * dayRows shape. Returns one entry per leg.
 */
export interface LegBreakdown {
  legIndex: number;
  accommodation: number;
  parkFees: number;
  perNightAccommodation: number;
}

export function breakdownByLeg(input: QuoteInput): LegBreakdown[] {
  const pax = input.legs[0]?.occupants.length ?? 0;
  return input.legs.map((leg, legIndex) => ({
    legIndex,
    accommodation: accommodationPerNight(leg) * leg.nights,
    parkFees: (leg.parkFeePerPersonPerDay ?? 0) * leg.nights * pax,
    perNightAccommodation: accommodationPerNight(leg),
  }));
}
