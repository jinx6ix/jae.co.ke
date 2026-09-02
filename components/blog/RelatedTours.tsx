// components/blog/RelatedTours.tsx
//
// "You may also like" tour card grid that appears under blog post bodies.
// Mirrors the style of the related-articles section in
// app/(marketing)/blog/[slug]/page.tsx but with a different card layout
// suited to tour cards (no aspect-video image, since tour images aren't
// part of the BlogPost shape).

import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export type RelatedTour = {
  id: string
  slug: string
  title: string
  source: "tours" | "budget-tours"
  destination?: string
  priceFrom?: number
  durationDays?: number
}

type Props = {
  tours: RelatedTour[]
}

function tourHref(t: RelatedTour): string {
  return t.source === "budget-tours" ? `/budget-tours/${t.slug}` : `/tours/${t.slug}`
}

function destinationFromTitle(title: string): string | undefined {
  // Heuristic — pull a destination word from the start of a tour title.
  // We keep it conservative: only split on the first " - " or " | " and
  // return the shorter side. Used for the "Where" line on the card.
  const parts = title.split(/\s+[—–\-|]\s+/)
  if (parts.length < 2) return undefined
  const left = parts[0].trim()
  const right = parts[1].trim()
  // Prefer the shorter, more focused side
  const candidate = right.length < left.length ? right : left
  if (candidate.length < 3 || candidate.length > 60) return undefined
  return candidate
}

export default function RelatedTours({ tours }: Props) {
  if (tours.length === 0) return null

  return (
    <section className="mt-16" data-component="related-tours">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold">You may also like</h2>
        <Button asChild variant="ghost" size="sm">
          <Link href="/tours" className="text-muted-foreground hover:text-primary">
            View all tours
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => {
          const destination = t.destination ?? destinationFromTitle(t.title)
          return (
            <Card key={`${t.source}:${t.id}`} className="group h-full">
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                    {t.source === "budget-tours" ? "Budget" : "Tour"}
                  </span>
                  {typeof t.durationDays === "number" && (
                    <span>{t.durationDays} {t.durationDays === 1 ? "day" : "days"}</span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-semibold leading-snug">
                  <Link
                    href={tourHref(t)}
                    className="transition-colors hover:text-primary"
                  >
                    {t.title}
                  </Link>
                </h3>
                {destination && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{destination}</span>
                  </div>
                )}
                {typeof t.priceFrom === "number" && (
                  <div className="mt-auto text-sm">
                    <span className="text-muted-foreground">From </span>
                    <span className="font-semibold text-foreground">
                      ${t.priceFrom.toLocaleString()}
                    </span>
                  </div>
                )}
                <Button asChild variant="outline" size="sm" className="mt-1 w-full">
                  <Link href={tourHref(t)}>
                    View {t.source === "budget-tours" ? "budget tour" : "tour"}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
