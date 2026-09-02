// app/api/public/tours/route.ts
//
// Public read endpoint: active tour packages, safe fields only, for
// the website's itinerary builder ("start from a template" step).
//
// Caching: wrapped in `unstable_cache` with a 5-minute TTL and
// the `public:tours` tag. The full set of active tours is a
// small (~70) but expensive query (joins days + destinations)
// and is fetched on every visit to the "start from a template"
// step of the public builder. Without this cache it eats into
// the Vercel free-plan CPU budget every time a visitor opens
// the builder. The tag lets /api/revalidate flush the whole
// endpoint's result when staff publish a change.

import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

const getCachedTours = unstable_cache(
  async () =>
    prisma.tourPackage.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        durationDays: true,
        durationNights: true,
        countries: true,
        highlights: true,
        days: {
          orderBy: { dayNumber: 'asc' },
          select: {
            dayNumber: true,
            title: true,
            description: true,
            destination: { select: { name: true } },
          },
        },
      },
    }),
  ['public', 'tours'],
  { revalidate: 300, tags: ['public:tours'] }
);

export async function GET() {
  const tours = await getCachedTours();
  return NextResponse.json(tours);
}
