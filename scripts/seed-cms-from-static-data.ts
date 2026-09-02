// scripts/seed-cms-from-static-data.ts
//
// Run once after the CMS is up and connected to a real database:
//   pnpm cms:seed
//
// IMPORTANT: `import 'dotenv/config'` below must stay the very first
// line in this file. Next.js (`next dev`/`next build`) loads .env
// automatically, but this script runs standalone via tsx, which does
// NOT — without this, process.env.PAYLOAD_SECRET/PAYLOAD_DATABASE_URL/
// etc. are all undefined when cms/payload.config.ts evaluates, which is
// exactly what "missing secret key" means. Because ES module imports
// execute their side effects top-to-bottom, this has to run before the
// `@payload-config` import below, or it's too late.
import 'dotenv/config'
// Without this, turning on CMS-driven pages (lib/payload-tours.ts,
// lib/payload-vehicles.ts) just makes the site blank — Payload starts
// with zero documents. This reads the existing lib/tours-data.ts and
// lib/vehicles-data.ts arrays and creates one matching Payload document
// per entry, so /admin has real starting content to edit instead of
// nothing.
//
// Safe to re-run: skips any slug that already exists rather than
// creating duplicates.
//
// Images: no actual image files exist in this repo (confirmed while
// building this — every static tour/vehicle references a /public path
// like "/masai-mara-migration.jpg" that isn't actually present). This
// script does NOT try to upload anything — heroImage is left empty and
// legacyImagePath records the original path as a note. Upload real
// photos through /admin per tour/vehicle; the page will fall back to
// legacyImagePath (if that file exists) or a placeholder until then.

import { getPayload } from 'payload'
import config from '@payload-config'
import { tours } from '../lib/tours-data'
import { tours as legacyBookingTours } from '../data/tours'
import { vehicles } from '../lib/vehicles-data'
import { vehicles as accessibleVehicles } from '../app/(marketing)/vehicles/[slug]/accessible-vehicles-data'

// Loosely typed on purpose: lib/tours-data.ts and data/tours.ts declare
// two separate (near-identical, not identical) Tour interfaces — this
// function only touches fields both share, so it works for either
// dataset without forcing them into one exact shared type.
async function seedTours(
  payload: Awaited<ReturnType<typeof getPayload>>,
  tours: Array<Record<string, any>>,
  label = 'Tours',
) {
  let created = 0
  let skipped = 0
  for (const tour of tours) {
    const existing = await payload.find({
      collection: 'tours',
      where: { slug: { equals: tour.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    await payload.create({
      collection: 'tours',
      data: {
        title: tour.title,
        slug: tour.slug,
        legacyImagePath: tour.image || undefined,
        shortDescription: tour.shortDescription,
        description: tour.description,
        pricing: {
          price: tour.price,
          currency: tour.currency || 'USD',
          isOnOffer: tour.isOnOffer || false,
          originalPrice: tour.originalPrice,
        },
        tripDetails: {
          duration: tour.duration,
          region: tour.region,
          country: tour.country,
          location: tour.location,
          difficulty: tour.difficulty,
          groupSize: tour.groupSize,
          category: tour.category,
        },
        itinerary: tour.itinerary,
        checkInText: tour.checkInText,
        highlights: (tour.highlights || []).map((text) => ({ text })),
        included: (tour.included || []).map((text) => ({ text })),
        excluded: (tour.excluded || []).map((text) => ({ text })),
        tags: Array.isArray(tour.tags) ? tour.tags.map((tag: string) => ({ tag })) : [],
        rating: { value: tour.rating || 5, reviewCount: tour.reviewCount || 0 },
        meta: { title: tour.metaTitle, description: tour.metaDescription },
        _status: 'published',
      },
    })
    created++
  }
  console.log(`${label}: ${created} created, ${skipped} already existed (skipped).`)
}

async function seedVehicles(payload: Awaited<ReturnType<typeof getPayload>>) {
  let created = 0
  let skipped = 0
  for (const vehicle of vehicles) {
    const existing = await payload.find({
      collection: 'vehicles',
      where: { slug: { equals: vehicle.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    await payload.create({
      collection: 'vehicles',
      data: {
        title: vehicle.name,
        slug: vehicle.slug,
        legacyImagePath: vehicle.image || undefined,
        vehicleType: vehicle.type,
        description: vehicle.description,
        ideal: vehicle.ideal,
        capacity: vehicle.capacity,
        pricing: { pricePerDay: vehicle.pricePerDay, currency: vehicle.priceCurrency || 'USD' },
        specifications: vehicle.specifications
          ? {
              engine: vehicle.specifications.engine,
              transmission: vehicle.specifications.transmission,
              fuelType: vehicle.specifications.fuelType,
              luggage: vehicle.specifications.luggage,
              fuelEfficiency: vehicle.specifications.fuelEfficiency,
              driveType: vehicle.specifications.driveType,
              seats: vehicle.specifications.seats,
              doors: vehicle.specifications.doors,
              groundClearance: vehicle.specifications.groundClearance,
              payload: vehicle.specifications.payload,
            }
          : undefined,
        features: (vehicle.features || []).map((text) => ({ text })),
        structuredData: {
          brand: vehicle.brand,
          model: vehicle.model,
          vehicleYear: vehicle.vehicleYear,
          color: vehicle.color,
          aggregateRating: vehicle.aggregateRating
            ? { ratingValue: vehicle.aggregateRating.ratingValue, reviewCount: vehicle.aggregateRating.reviewCount }
            : undefined,
        },
        destinations: (vehicle.destinations || []).map((name) => ({ name })),
        useCases: (vehicle.useCases || []).map((text) => ({ text })),
        meta: { title: vehicle.metaTitle, description: vehicle.metaDescription },
        _status: 'published',
      },
    })
    created++
  }
  console.log(`Vehicles: ${created} created, ${skipped} already existed (skipped).`)
}

async function seedAccessibleVehicles(payload: Awaited<ReturnType<typeof getPayload>>) {
  let created = 0
  let skipped = 0
  for (const [slug, v] of Object.entries(accessibleVehicles)) {
    const existing = await payload.find({
      collection: 'vehicles',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    // This dataset's `price` is a free-text range (e.g. "$195-250 per
    // day") rather than a single number — take the first number found
    // as pricePerDay so it has SOMETHING sane to sort/filter by; the
    // original text range is worth re-entering precisely in /admin.
    const priceMatch = v.price.match(/\d+/)
    const pricePerDay = priceMatch ? Number(priceMatch[0]) : 0

    await payload.create({
      collection: 'vehicles',
      data: {
        title: v.name,
        slug,
        legacyImagePath: v.image || undefined,
        vehicleType: 'Accessible',
        description: v.description,
        capacity: v.capacity,
        pricing: { pricePerDay, currency: 'USD' },
        features: (v.features || []).map((text) => ({ text })),
        included: (v.included || []).map((text) => ({ text })),
        certifications: (v.certifications || []).map((text) => ({ text })),
        accessibilityDetails: {
          liftCapacity: v.specifications?.liftCapacity,
          dimensions: v.specifications?.dimensions,
          rampAngle: v.specifications?.rampAngle,
          restraint: v.specifications?.restraint,
          transfer: v.seoContent?.accessibilityDetails?.transfer,
          space: v.seoContent?.accessibilityDetails?.space,
          safety: v.seoContent?.accessibilityDetails?.safety,
          medical: v.seoContent?.accessibilityDetails?.medical,
        },
        seoContent: {
          overview: v.seoContent?.overview,
          benefits: (v.seoContent?.benefits || []).map((text) => ({ text })),
          safariDestinations: (v.seoContent?.safariDestinations || []).map((d) => ({
            name: d.name,
            highlights: d.highlights,
          })),
        },
        _status: 'published',
      },
    })
    created++
  }
  console.log(`Accessible vehicles: ${created} created, ${skipped} already existed (skipped).`)
  if (created > 0) {
    console.log(
      `  Note: pricePerDay was extracted from a free-text range (the original said e.g. "$195-250 per day") —`,
    )
    console.log(`  worth double-checking/re-entering precisely in /admin for these ${created} record(s).`)
  }
}

async function main() {
  const payload = await getPayload({ config })
  await seedTours(payload, tours, 'Tours (lib/tours-data.ts)')
  // data/tours.ts turned out to be a near-duplicate of lib/tours-data.ts
  // (all 53 slugs from lib/tours-data.ts also appear here) plus 3
  // genuinely new accessible-safari tours. The skip-if-exists check
  // above means this only actually creates those 3 new ones — the 53
  // duplicates are silently skipped, not double-created.
  await seedTours(payload, legacyBookingTours, 'Tours (data/tours.ts, booking flow)')
  await seedVehicles(payload)
  await seedAccessibleVehicles(payload)
  console.log('Done. Visit /admin to edit content, add real hero images, and publish/unpublish.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
