// lib/itinerary-extras.ts
//
// Helpers for the per-destination activity editor on the public
// itinerary builder. Kept as pure functions in their own module so
// the client component (which has them inline) and any future
// server-side re-derivation (cost sheet, quote breakdown) can share
// the same math without dragging the React component along.

// One editable line in the per-destination activity editor. `cost` is
// the *unit* price; the multiplier (numPax or nights) is applied by
// `effectiveCost` at render and on submit. `edited` flags lines the
// user has touched so the seed-on-first-visit logic in the page
// never overwrites their work.
export interface ExtraLine {
  id: string
  description: string
  unit: "perPerson" | "perStay"
  cost: number
  edited: boolean
}

// Stable id factory — exported so the editor can mint ids the same
// way across renders. Uses crypto.randomUUID when available, falls
// back to a Math.random-based id for older browsers (the page is
// React 19 / evergreen, so this is belt + suspenders).
export function newExtraId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `extra-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// Cost contribution of one line for a given party size / night
// count. Mirrors the server's math in
// app/api/public/quote/route.ts so the live total the user sees
// matches the total that ends up on the cost sheet.
export function effectiveCost(
  line: ExtraLine,
  numPax: number,
  nights: number,
): number {
  if (!line.description.trim() || line.cost <= 0) return 0
  return line.unit === "perPerson" ? line.cost * numPax : line.cost * nights
}

// Flatten the per-destination map into the array the server's
// QuoteRequest.extras expects. Empty/blank lines are dropped so the
// server never sees zero-cost filler. The destination string is
// passed through so staff can see *where* each line belongs in the
// cost sheet.
export function buildExtrasForSubmit(
  byDestination: Map<string, ExtraLine[]>,
): Array<{ description: string; unit: "perPerson" | "perStay"; cost: number; destination: string }> {
  const out: Array<{
    description: string
    unit: "perPerson" | "perStay"
    cost: number
    destination: string
  }> = []

  for (const [destination, rows] of byDestination) {
    for (const r of rows) {
      if (!r.description.trim() || r.cost <= 0) continue
      out.push({
        description: r.description,
        unit: r.unit,
        cost: r.cost,
        destination,
      })
    }
  }

  return out
}
