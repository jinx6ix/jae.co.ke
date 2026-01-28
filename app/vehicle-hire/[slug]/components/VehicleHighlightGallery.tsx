"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import { Vehicle } from "@/lib/vehicles-data" // adjust path

interface VehicleHighlightGalleryProps {
  vehicles: Vehicle[]
}

export function VehicleHighlightGallery({ vehicles }: VehicleHighlightGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const openLightbox = (vehicle: Vehicle, index: number = 0) => {
    setSelectedVehicle(vehicle)
    setSlideIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedVehicle(null)
  }

  // Prepare slides only when needed
  const slides = selectedVehicle
    ? [
        { src: selectedVehicle.image, alt: selectedVehicle.name },
        ...selectedVehicle.gallery.map((src) => ({ src, alt: selectedVehicle.name })),
      ]
    : []

  return (
    <>
      <div className="space-y-24 md:space-y-32">
        {vehicles.map((vehicle, idx) => {
          const isEven = idx % 2 === 0
          const mainImage = vehicle.image
          const thumbImages = vehicle.gallery.slice(0, 3) // show up to 3 thumbs

          return (
            <div
              key={vehicle.id}
              className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-start ${isEven ? "" : "md:flex-row-reverse"}`}
            >
              {/* Main featured image */}
              <div className="md:col-span-8 relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={mainImage}
                  alt={`${vehicle.name} - Featured`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  onClick={() => openLightbox(vehicle, 0)}
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {vehicle.name}
                  </h3>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
                {thumbImages.map((thumb, thumbIdx) => (
                  <div
                    key={thumbIdx}
                    className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3] cursor-pointer group"
                    onClick={() => openLightbox(vehicle, thumbIdx + 1)}
                  >
                    <Image
                      src={thumb}
                      alt={`${vehicle.name} - ${thumbIdx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}

                {/* "View more" placeholder if more images exist */}
                {vehicle.gallery.length > 3 && (
                  <div
                    className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3] bg-muted flex items-center justify-center cursor-pointer group"
                    onClick={() => openLightbox(vehicle, 4)}
                  >
                    <div className="text-center p-4">
                      <p className="text-lg font-semibold">+{vehicle.gallery.length - 3} more</p>
                      <p className="text-sm text-muted-foreground">Click to explore full gallery</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox – shows ALL images of the selected vehicle */}
      {selectedVehicle && (
        <Lightbox
          open={lightboxOpen}
          close={closeLightbox}
          slides={slides}
          index={slideIndex}
          on={{
            view: ({ index }) => setSlideIndex(index),
          }}
          plugins={[Zoom, Thumbnails]}
          zoom={{ maxZoomPixelRatio: 3 }}
          thumbnails={{
            position: "bottom",
            gap: 12,
            padding: 8,
            border: 0,
            imageFit: "cover",
          }}
          carousel={{
            finite: false,
            preload: 3,
          }}
        />
      )}
    </>
  )
}