"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock } from "lucide-react"
import type { Tour } from "@/lib/tours-data"
import { trackBookingClick } from "@/components/analytics-tracker"

interface TourCardProps {
  tour: Tour
  showOriginalPrice?: boolean
}

// Optional: Add fallback URL if tour.url is missing
const FALLBACK_TOUR_URL = "/contact" // or "/tours" or "#"

export function TourCard({ tour, showOriginalPrice = false }: TourCardProps) {
  const handleBookingClick = () => {
    trackBookingClick(tour.title, tour.price)
  }

  // Safe URL – fallback if tour.url is undefined
  const tourUrl = tour.url ?? FALLBACK_TOUR_URL

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={tourUrl}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={
                tour.image ||
                `/?height=400&width=600&text=${encodeURIComponent(tour.title)}`
              }
              alt={tour.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-semibold backdrop-blur">
              {showOriginalPrice && tour.originalPrice ? (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground line-through">
                    ${tour.originalPrice}
                  </span>
                  <span className="text-destructive">${tour.price}</span>
                </div>
              ) : (
                <span>${tour.price}</span>
              )}
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{tour.country}</span>
        </div>

        <Link href={tourUrl}>
          <h3 className="mb-2 text-xl font-bold leading-tight transition-colors hover:text-primary">
            {tour.title}
          </h3>
        </Link>

        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {tour.description}
        </p>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-muted-foreground">({tour.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {tour.itinerary && typeof tour.itinerary === "string"
                ? tour.itinerary.split(".")[0].replace("Day 1:", "").trim()
                : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full"
          onClick={handleBookingClick}
          disabled={!tour.bookingUrl}
        >
          <a
            href={tour.bookingUrl ?? "https://wa.me/+254726485228"}
            rel="noopener noreferrer"
            target="_blank"
          >
            Book Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}