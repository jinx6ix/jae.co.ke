// app/vehicle-hire/VehicleCard.tsx
'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Users, Luggage, Fuel, MapPin, Shield } from "lucide-react"

type Vehicle = {
  id: string | number
  name: string
  slug: string
  image: string
  capacity: string
  specifications: { luggage: string }
  description: string
  pricePerDay: string
}

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl border-2 hover:border-primary/20">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={vehicle.image || "/placeholder.svg"}
            alt={`${vehicle.name} - professional 4x4 safari vehicle for rent in East Africa`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            Safari Ready
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <h3 className="mb-4 text-xl font-bold text-foreground">{vehicle.name}</h3>
        <div className="mb-4 flex gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded">
            <Users className="h-4 w-4" />
            <span className="font-medium">{vehicle.capacity}</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded">
            <Luggage className="h-4 w-4" />
            <span className="font-medium">{vehicle.specifications.luggage}</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded">
            <Fuel className="h-4 w-4" />
            <span className="font-medium">4x4 Diesel</span>
          </div>
        </div>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground leading-relaxed">{vehicle.description}</p>
        <div className="border-t border-border pt-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">${vehicle.pricePerDay}</div>
              <div className="text-sm text-muted-foreground">per day + insurance</div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Shield className="h-4 w-4" />
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/vehicle-hire/${vehicle.slug}`}>
            View Safari Vehicle Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}