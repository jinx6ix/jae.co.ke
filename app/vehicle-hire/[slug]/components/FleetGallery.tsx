// Create a FleetGallery component: components/FleetGallery.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FleetGalleryProps {
  fleetGalleries: {
    fleet1: string[]
    fleet2: string[]
    fleet3: string[]
  }
  vehicleName: string
}

export function FleetGallery({ fleetGalleries, vehicleName }: FleetGalleryProps) {
  const [activeFleet, setActiveFleet] = useState<"fleet1" | "fleet2" | "fleet3">("fleet1")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentImages = fleetGalleries[activeFleet]
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)

  return (
    <div className="space-y-8">
      {/* Fleet Tabs */}
      <div className="flex gap-4 justify-center">
        {["fleet1", "fleet2", "fleet3"].map((fleet) => (
          <button
            key={fleet}
            onClick={() => {
              setActiveFleet(fleet as "fleet1" | "fleet2" | "fleet3")
              setCurrentImageIndex(0)
            }}
            className={`px-6 py-3 rounded-lg ${
              activeFleet === fleet ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            {fleet.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Image Display */}
      <Card className="overflow-hidden">
        <div className="relative h-[400px]">
          <Image
            src={currentImages[currentImageIndex]}
            alt={`${vehicleName} - ${activeFleet} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />
          <button
            title="Previous image"
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            title="Next image"
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {currentImages.length}
          </div>
        </div>
      </Card>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-4">
        {currentImages.map((image, index) => (
          <button
            title="Open image in modal"
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              currentImageIndex === index ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}