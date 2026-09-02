// app/api/public/hotels/route.ts
//
// Public, unauthenticated read endpoint for the marketing site's
// itinerary builder / hotel picker. Deliberately returns a curated
// field set — no contactEmail/contactPhone/notes (those are staff-only
// on SRHotel) and no margin data.
//
// GET /api/public/hotels?county=Maasai+Mara&tier=MID_RANGE&q=serena
//
// Caching: the result is wrapped in `unstable_cache` keyed on
// (county, tier, q) with a 5-minute TTL and the `public:hotels`
// tag. The endpoint is on the hot path of the marketing
// itinerary builder — without this, every visitor pays the
// full N+1 rate lookup (one MongoDB query per hotel × ~83
// hotels = 84 queries per request). At ~10k uniques/month on
// the free Vercel plan, that would be the single biggest
// contributor to CPU / MongoDB time.
// The N+1 is also collapsed into a single batched
// `sRRoomPrice.findMany` (cheapest per hotel) rather than
// N `findFirst` calls — see `getIndicativeRatesBatch` below.

import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { classifyTier } from '@/lib/public-quote';

// Batched variant of `getIndicativeRate` — one query for the
// whole hotel set instead of N. Returns a Map<hotelId, rate>
// suitable for a single join.
async function getIndicativeRatesBatch(
  hotelIds: number[]
): Promise<Map<number, { pricePerNight: number; currency: string }>> {
  const out = new Map<number, { pricePerNight: number; currency: string }>();
  if (hotelIds.length === 0) return out;

  // One round-trip: for each hotel pick the cheapest
  // per-person-sharing rate on record. Prisma's relational
  // filters let us scope to `roomType.hotelId IN (...)` and
  // we use `orderBy` + a per-group `take: 1` via `groupBy`
  // alternative — `findMany` with the cheapest-first order
  // is simpler and the volume is small (a few hundred rows).
  const rows = await prisma.sRRoomPrice.findMany({
    where: {
      ratePerPersonSharing: { not: null },
      roomType: { hotelId: { in: hotelIds } },
    },
    orderBy: [
      { roomType: { hotelId: 'asc' } },
      { ratePerPersonSharing: 'asc' },
    ],
    select: {
      ratePerPersonSharing: true,
      currency: true,
      roomType: { select: { hotelId: true } },
    },
  });

  for (const r of rows) {
    const hid = r.roomType.hotelId;
    if (out.has(hid)) continue; // first one (cheapest) wins
    if (r.ratePerPersonSharing == null) continue;
    out.set(hid, { pricePerNight: r.ratePerPersonSharing, currency: r.currency });
  }
  return out;
}

// The cache key. We pass an object (not a single string) so
// adding a new filter later only requires extending the
// interface, not migrating keys.
interface HotelsQuery {
  county: string | null;
  tier: string | null;
  q: string | null;
}

async function loadHotelsUncached(query: HotelsQuery) {
  const { county, tier, q } = query;

  const hotels = await prisma.sRHotel.findMany({
    where: {
      ...(county ? { county: { name: { equals: county, mode: 'insensitive' } } } : {}),
      ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
    },
    include: { county: true },
    orderBy: { name: 'asc' },
  });

  // One batched call for all rate lookups instead of N.
  const ratesByHotel = await getIndicativeRatesBatch(hotels.map((h) => h.id));

  const withRates = hotels.map((hotel) => {
    const rate = ratesByHotel.get(hotel.id);
    return {
      id: hotel.id,
      name: hotel.name,
      county: hotel.county.name,
      region: hotel.county.region,
      stars: hotel.stars,
      category: hotel.category,
      fromPricePerNight: rate?.pricePerNight ?? null,
      currency: rate?.currency ?? 'USD',
      budgetTier: rate ? classifyTier(rate.pricePerNight) : null,
    };
  });

  const filtered = tier ? withRates.filter((h) => h.budgetTier === tier) : withRates;

  // Hotels with no rate on record yet are pushed to the end rather than
  // dropped — still worth showing in the picker with a "price on
  // request" state instead of silently disappearing.
  filtered.sort((a, b) => {
    if (a.fromPricePerNight == null) return 1;
    if (b.fromPricePerNight == null) return -1;
    return a.fromPricePerNight - b.fromPricePerNight;
  });

  return filtered;
}

// Stable cache wrapper. The 300s revalidate acts as a hard
// upper bound on staleness; the `public:hotels` tag lets the
// /api/revalidate endpoint flush the entire endpoint's
// results in one shot if the underlying data changes.
const getCachedHotels = unstable_cache(
  async (q: HotelsQuery) => loadHotelsUncached(q),
  ['public', 'hotels'],
  { revalidate: 300, tags: ['public:hotels'] }
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query: HotelsQuery = {
    county: searchParams.get('county'),
    tier: searchParams.get('tier'),
    q: searchParams.get('q'),
  };

  // Force a fresh fetch on the server (no `next: { revalidate }`
  // / `cache: 'force-cache'` here — the public builder calls
  // this with `cache: 'no-store'` already, so client-side
  // staleness is handled at the fetch layer). The
  // `unstable_cache` wrapper is what saves us on the server
  // side.
  const filtered = await getCachedHotels(query);

  return NextResponse.json(filtered);
}
