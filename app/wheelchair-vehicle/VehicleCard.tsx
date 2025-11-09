// app/vehicles/VehicleCard.tsx
'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

type Vehicle = {
  id: string
  name: string
  type: string
  capacity: string
  features: string[]
  description: string
  image: string
  alt: string
  price: string
  bestFor: string[]
}

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10]">
        <Image
          src={vehicle.image}
          alt={vehicle.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
          priority={vehicle.id === "safari-accessible"}
        />
        <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
          {vehicle.type}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-medium backdrop-blur-sm">
          {vehicle.price}
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{vehicle.name}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{vehicle.capacity}</p>
        <p className="mb-4 text-sm text-muted-foreground">{vehicle.description}</p>

        <div className="mb-4">
          <h4 className="mb-2 font-semibold text-sm">Best For:</h4>
          <div className="flex flex-wrap gap-2">
            {vehicle.bestFor.map((use, i) => (
              <span key={i} className="rounded-full bg-secondary px-2 py-1 text-xs">{use}</span>
            ))}
          </div>
        </div>

        <ul className="mb-6 space-y-2">
          {vehicle.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href={`/vehicles/${vehicle.id}`}>View Details</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/book-now?vehicle=${vehicle.id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}