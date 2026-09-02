// lib/public-quote.ts
//
// Support code for the PUBLIC (unauthenticated) itinerary-builder
// endpoints under app/api/public/*. Every existing route in this app
// requires a NextAuth session — these are the first exceptions, so
// they're kept in one file and deliberately narrow: read-only safe
// fields out, one write path in (creating an ENQUIRY booking), no
// access to margins, agent notes, or internal costing fields.
//
// Reuses calculateCost()/generateBookingRef() from lib/rates.ts rather
// than re-deriving pricing logic — same math the staff dashboard uses.

import { prisma } from './prisma';

export type BudgetTier = 'BUDGET' | 'MID_RANGE' | 'LUXURY';

// Thresholds derived from the actual imported rate data (sr_room_prices
// ranges roughly $38–$500 per person sharing on FB). Revisit these once
// more of the 83-hotel set has real rates entered — right now a chunk
// of hotels only have one room type priced, so the split is a starting
// point, not a permanent policy.
const BUDGET_MAX = 60;
const MID_MAX = 150;

export function classifyTier(pricePerPersonSharing: number): BudgetTier {
  if (pricePerPersonSharing <= BUDGET_MAX) return 'BUDGET';
  if (pricePerPersonSharing <= MID_MAX) return 'MID_RANGE';
  return 'LUXURY';
}

/**
 * Cheapest per-person-sharing FB rate on record for a hotel, regardless
 * of date — used for the hotel picker's "from $X/night" display and its
 * budget-tier badge. Not date-aware; see getRateForStay for that.
 */
export async function getIndicativeRate(hotelId: number): Promise<{ pricePerNight: number; currency: string } | null> {
  const cheapest = await prisma.sRRoomPrice.findFirst({
    where: { roomType: { hotelId }, ratePerPersonSharing: { not: null } },
    orderBy: { ratePerPersonSharing: 'asc' },
    select: { ratePerPersonSharing: true, currency: true },
  });
  if (!cheapest || cheapest.ratePerPersonSharing == null) return null;
  return { pricePerNight: cheapest.ratePerPersonSharing, currency: cheapest.currency };
}

/**
 * Date-aware rate for a specific hotel + stay date, falling back to the
 * cheapest rate on record if nothing matches the season (mirrors the
 * fallback behavior in app/api/safari-rates/lookup).
 */
export async function getRateForStay(
  hotelId: number,
  date: Date,
  boardBasis = 'FB'
): Promise<{ pricePerNight: number; currency: string; roomTypeId: number; matched: boolean } | null> {
  const inSeason = await prisma.sRRoomPrice.findFirst({
    where: {
      boardBasis,
      roomType: { hotelId },
      season: { startDate: { lte: date }, endDate: { gte: date } },
      ratePerPersonSharing: { not: null },
    },
    orderBy: { ratePerPersonSharing: 'asc' },
    select: { ratePerPersonSharing: true, currency: true, roomTypeId: true },
  });
  if (inSeason && inSeason.ratePerPersonSharing != null) {
    return {
      pricePerNight: inSeason.ratePerPersonSharing,
      currency: inSeason.currency,
      roomTypeId: inSeason.roomTypeId,
      matched: true,
    };
  }

  const fallback = await prisma.sRRoomPrice.findFirst({
    where: { boardBasis, roomType: { hotelId }, ratePerPersonSharing: { not: null } },
    orderBy: { ratePerPersonSharing: 'asc' },
    select: { ratePerPersonSharing: true, currency: true, roomTypeId: true },
  });
  if (!fallback || fallback.ratePerPersonSharing == null) return null;
  return {
    pricePerNight: fallback.ratePerPersonSharing,
    currency: fallback.currency,
    roomTypeId: fallback.roomTypeId,
    matched: false,
  };
}

/**
 * Date-aware lookup for a SPECIFIC roomTypeId + stay date + boardBasis.
 * Returns the full SRRoomPrice row so the calculator can use childRate
 * and thirdAdultRate in addition to ratePerPersonSharing.
 *
 * - "matched" = true  : found a season that contains the date.
 * - "matched" = false : fell back to the cheapest matching row of that
 *                       room type, regardless of season. (Same fallback
 *                       semantics as getRateForStay above; the
 *                       dayRows shape preserves the flag so staff can
 *                       see when fallback was used.)
 *
 * Returns null when the room type has no rate row at all — the
 * front-end then hides that room type from the user.
 */
export async function getRoomPriceForStay(
  hotelId: number,
  date: Date,
  roomTypeId: number,
  boardBasis = 'FB',
): Promise<{
  pricePerNight: number;
  currency: string;
  ratePerPersonSharing: number | null;
  singleRoomRate: number | null;
  childRate: number | null;
  thirdAdultRate: number | null;
  matched: boolean;
} | null> {
  const inSeason = await prisma.sRRoomPrice.findFirst({
    where: {
      boardBasis,
      roomTypeId,
      season: { startDate: { lte: date }, endDate: { gte: date } },
    },
    select: {
      ratePerPersonSharing: true,
      singleRoomRate: true,
      childRate: true,
      thirdAdultRate: true,
      currency: true,
    },
  });
  if (inSeason) {
    return {
      pricePerNight: inSeason.ratePerPersonSharing ?? 0,
      currency: inSeason.currency,
      ratePerPersonSharing: inSeason.ratePerPersonSharing,
      singleRoomRate: inSeason.singleRoomRate,
      childRate: inSeason.childRate,
      thirdAdultRate: inSeason.thirdAdultRate,
      matched: true,
    };
  }

  const fallback = await prisma.sRRoomPrice.findFirst({
    where: { boardBasis, roomTypeId },
    select: {
      ratePerPersonSharing: true,
      singleRoomRate: true,
      childRate: true,
      thirdAdultRate: true,
      currency: true,
    },
  });
  if (!fallback) return null;
  return {
    pricePerNight: fallback.ratePerPersonSharing ?? 0,
    currency: fallback.currency,
    ratePerPersonSharing: fallback.ratePerPersonSharing,
    singleRoomRate: fallback.singleRoomRate,
    childRate: fallback.childRate,
    thirdAdultRate: fallback.thirdAdultRate,
    matched: false,
  };
}

/** Park fee for a county, in the county's currency. Null when not set. */
export async function getParkFeeForCounty(
  countyId: number,
): Promise<{ amount: number; currency: string } | null> {
  const county = await prisma.sRCounty.findUnique({
    where: { id: countyId },
    select: { parkFee: true, parkFeeCurrency: true },
  });
  if (!county || county.parkFee == null || county.parkFee <= 0) return null;
  return { amount: county.parkFee, currency: county.parkFeeCurrency ?? "USD" };
}

/** Simple in-memory rate limit for the public write endpoint.
 * NOTE: resets on every deploy/restart and doesn't share state across
 * serverless instances — fine as a first guard, not a substitute for
 * real rate limiting (Vercel Firewall, Cloudflare, etc.) in production. */
const submissionLog = new Map<string, number[]>();
export function isRateLimited(key: string, maxPerHour = 5): boolean {
  const now = Date.now();
  const hour = 60 * 60 * 1000;
  const timestamps = (submissionLog.get(key) ?? []).filter((t) => now - t < hour);
  timestamps.push(now);
  submissionLog.set(key, timestamps);
  return timestamps.length > maxPerHour;
}
