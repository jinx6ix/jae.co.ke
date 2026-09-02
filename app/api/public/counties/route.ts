// app/api/public/counties/route.ts
//
// Public, unauthenticated read endpoint for the marketing itinerary
// builder's "route" step. Returns every SRCounty with its name and
// park fee so the form can render a destination dropdown that already
// includes the per-person park fee hint.
//
// GET /api/public/counties
//
// Caching: 5-minute TTL, tag `public:counties`. The volume is tiny
// (a few dozen rows) but the endpoint is on the hot path of the
// marketing builder, so caching is still worth it.

import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

interface CountyDTO {
  id: number;
  name: string;
  region: string | null;
  parkFee: number | null;
  parkFeeCurrency: string;
}

async function loadCountiesUncached(): Promise<CountyDTO[]> {
  const rows = await prisma.sRCounty.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      region: true,
      parkFee: true,
      parkFeeCurrency: true,
    },
  });
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    region: c.region,
    parkFee: c.parkFee ?? null,
    parkFeeCurrency: c.parkFeeCurrency ?? 'USD',
  }));
}

const getCachedCounties = unstable_cache(
  async () => loadCountiesUncached(),
  ['public', 'counties'],
  { revalidate: 300, tags: ['public:counties'] }
);

export async function GET() {
  const counties = await getCachedCounties();
  return NextResponse.json(counties);
}
