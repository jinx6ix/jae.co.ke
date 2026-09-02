// lib/activity-catalog.ts
//
// Static catalog of standard per-destination activities and park
// fees. Used by the public itinerary builder to pre-fill the
// per-destination activity editor so the user doesn't have to type
// in "Maasai Mara park fee" from scratch — they can edit, remove,
// or add as needed.
//
// Prices here are starting points; the actual line item on the
// cost sheet comes from whatever the user enters (or the seeded
// value) at the time of submission. Keeping the catalog static
// (rather than DB-driven) is intentional: the public builder runs
// in a cache-aggressive context where every MongoDB hit is
// expensive, and the catalog is a few dozen rows.

export interface CatalogActivity {
  id: string
  description: string
  unit: "perPerson" | "perStay"
  cost: number
}

const CATALOG: Record<string, CatalogActivity[]> = {
  "Maasai Mara": [
    { id: "mara-park-fee", description: "Maasai Mara park fee (per person, per day)", unit: "perPerson", cost: 80 },
    { id: "mara-game-drive", description: "Game drive (full day, shared vehicle)", unit: "perStay", cost: 0 },
    { id: "mara-village", description: "Maai Mahai cultural village visit", unit: "perStay", cost: 35 },
  ],
  "Amboseli": [
    { id: "amboseli-park-fee", description: "Amboseli park fee (per person, per day)", unit: "perPerson", cost: 60 },
    { id: "amboseli-game-drive", description: "Game drive (full day, shared vehicle)", unit: "perStay", cost: 0 },
  ],
  "Tsavo East": [
    { id: "tsavo-east-park-fee", description: "Tsavo East park fee (per person, per day)", unit: "perPerson", cost: 52 },
    { id: "tsavo-east-game-drive", description: "Game drive (full day, shared vehicle)", unit: "perStay", cost: 0 },
  ],
  "Tsavo West": [
    { id: "tsavo-west-park-fee", description: "Tsavo West park fee (per person, per day)", unit: "perPerson", cost: 52 },
    { id: "tsavo-west-game-drive", description: "Game drive (full day, shared vehicle)", unit: "perStay", cost: 0 },
  ],
  "Samburu": [
    { id: "samburu-park-fee", description: "Samburu park fee (per person, per day)", unit: "perPerson", cost: 70 },
    { id: "samburu-game-drive", description: "Game drive (full day, shared vehicle)", unit: "perStay", cost: 0 },
  ],
  "Nakuru": [
    { id: "nakuru-park-fee", description: "Lake Nakuru park fee (per person, per day)", unit: "perPerson", cost: 60 },
    { id: "nakuru-game-drive", description: "Game drive (half day, shared vehicle)", unit: "perStay", cost: 0 },
  ],
  "Naivasha": [
    { id: "naivasha-boat", description: "Boat ride on Lake Naivasha", unit: "perPerson", cost: 30 },
  ],
  "Nanyuki / Laikipia": [
    { id: "ol-pejeta", description: "Ol Pejeta conservancy (per person, per day)", unit: "perPerson", cost: 110 },
    { id: "ol-pejeta-chimp", description: "Chimpanzee sanctuary visit", unit: "perPerson", cost: 25 },
  ],
  "Nairobi": [
    { id: "nairobi-np", description: "Nairobi National Park (half day)", unit: "perPerson", cost: 50 },
    { id: "giraffe-centre", description: "Giraffe Centre visit", unit: "perPerson", cost: 15 },
    { id: "elephant-orphanage", description: "Sheldrick elephant orphanage", unit: "perPerson", cost: 25 },
  ],
}

/**
 * Return the catalog of activities for a destination, or [] for
 * destinations we haven't catalogued yet. Match is by exact
 * SRCounty.name (same string the route step stores in
 * `route[i]`), so a destination renamed in the DB will just
 * return an empty list — the user can still add activities
 * manually.
 */
export function getDestinationActivities(destination: string): CatalogActivity[] {
  return CATALOG[destination] ?? []
}
