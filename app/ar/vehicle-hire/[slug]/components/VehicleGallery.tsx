"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface VehicleTypeGalleryProps {
  type: string
  vehicles: Array<{
    id: string
    slug: string
    name: string
    image: string
    description: string
    pricePerDay: number
    type?: string
  }>
  currentVehicleId: string
}

export function VehicleTypeGallery({ type, vehicles, currentVehicleId }: VehicleTypeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Filter out current vehicle from the gallery
  const filteredVehicles = vehicles.filter(v => v.id !== currentVehicleId)
  
  if (filteredVehicles.length === 0) return null

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredVehicles.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredVehicles.length) % filteredVehicles.length)
  }

  return (
    <div className="mb-16 last:mb-0">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{type} Vehicles</h3>
          <p className="text-muted-foreground">
            Explore our premium {type.toLowerCase()} collection
          </p>
        </div>
        
        {filteredVehicles.length > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Vehicle Gallery Grid */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVehicles.map((vehicle, index) => (
            <Card
              key={vehicle.id}
              className={cn(
                "overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
                index === currentIndex ? "ring-2 ring-primary ring-offset-2" : ""
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                  {type}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h4 className="text-lg font-bold mb-2 line-clamp-1">{vehicle.name}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {vehicle.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">${vehicle.pricePerDay}</div>
                    <div className="text-xs text-muted-foreground">per day</div>
                  </div>
                  
                  <Button asChild size="sm">
                    <Link href={`/vehicle-hire/${vehicle.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile carousel indicators */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {filteredVehicles.map((_, index) => (
            <button
              title="Select Vehicle"
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex ? "bg-primary w-6" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}