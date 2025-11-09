// app/TourCard.tsx
'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin, Calendar, Users } from "lucide-react"

// Import the real Tour type
import { Tour } from "@/lib/tours-data"

type TourCardProps = {
  tour: Tour
  showOriginalPrice?: boolean
}

export default function TourCard({ tour, showOriginalPrice = false }: TourCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3]">
          <Image
            src={tour.image}
            alt={`${tour.title} - Safari tour in ${tour.country}, ${tour.region}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority={tour.isOnOffer}
          />
          {tour.isOnOffer && (
            <div className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs font-medium text-white">
              On Offer
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="mb-3 text-xl font-bold line-clamp-2">{tour.title}</h3>

        <div className="mb-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {tour.region}, {tour.country}
            </span>
          </div>
          {tour.groupSize && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{tour.groupSize}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">
              {tour.currency}{tour.price}
              {showOriginalPrice && tour.originalPrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  {tour.currency}{tour.originalPrice}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">per person</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={tour.url || `/tours/${tour.slug}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}