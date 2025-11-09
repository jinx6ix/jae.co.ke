// app/vehicle-hire/VehicleCard.tsx
'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Users, Luggage } from "lucide-react"

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
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={vehicle.image || "/placeholder.svg"}
            alt={`${vehicle.name} - 4x4 safari vehicle for rent in East Africa`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <h3 className="mb-4 text-xl font-bold">{vehicle.name}</h3>
        <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{vehicle.capacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <Luggage className="h-4 w-4" />
            <span>{vehicle.specifications.luggage}</span>
          </div>
        </div>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{vehicle.description}</p>
        <div className="border-t border-border pt-4">
          <div className="text-3xl font-bold">${vehicle.pricePerDay}</div>
          <div className="text-sm text-muted-foreground">per day</div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/vehicle-hire/${vehicle.slug}`}>View Details & Book</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}