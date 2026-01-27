"use client"

import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, Grid3x3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface VehicleGalleryProps {
  mainImage: string
  gallery: string[]
  name: string
}

export function VehicleGallery({ mainImage, gallery, name }: VehicleGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [activeView, setActiveView] = useState<"grid" | "stack">("stack")

  // All images for lightbox (main first)
  const allImages = [mainImage, ...gallery].filter(Boolean)
  const totalImages = allImages.length

  const slides = allImages.map((src, i) => ({
    src,
    alt: `${name} - Image ${i + 1}`,
  }))

  // For large screens: Show 3-4 thumbnails depending on view mode
  const desktopThumbs = gallery.slice(0, activeView === "stack" ? 3 : 4)
  const remaining = gallery.length - desktopThumbs.length

  const openLightbox = (idx: number) => {
    setIndex(idx)
    setOpen(true)
  }

  // Navigate through thumbnails (for stack view)
  const [stackIndex, setStackIndex] = useState(0)
  const stackThumbs = gallery.slice(stackIndex, stackIndex + 3)

  const nextStack = () => {
    if (stackIndex + 3 < gallery.length) {
      setStackIndex(stackIndex + 1)
    }
  }

  const prevStack = () => {
    if (stackIndex > 0) {
      setStackIndex(stackIndex - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* View toggle for desktop */}
      <div className="hidden lg:flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveView("stack")}
          className={cn(
            "flex items-center gap-2",
            activeView === "stack" && "bg-primary text-primary-foreground"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Stack
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActiveView("grid")}
          className={cn(
            "flex items-center gap-2",
            activeView === "grid" && "bg-primary text-primary-foreground"
          )}
        >
          <Grid3x3 className="w-4 h-4" />
          Grid
        </Button>
      </div>

      {/* Desktop layout with enhanced thumbnails */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Main image - takes 9 columns */}
        <div
          className="lg:col-span-9 relative aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={mainImage || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            loading="eager"
            decoding="async"
          />

          {/* Enhanced overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating action button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black rounded-full w-12 h-12 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            onClick={(e) => {
              e.stopPropagation()
              openLightbox(0)
            }}
          >
            <Maximize2 className="w-5 h-5" />
          </Button>

          {/* Image count badge with glass effect */}
          {totalImages > 1 && (
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-gray-800">
                  {totalImages} Photos Available
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails area - takes 3 columns with enhanced layout */}
        <div className="lg:col-span-3">
          {/* Stack View (Vertical) */}
          {activeView === "stack" && stackThumbs.length > 0 && (
            <div className="relative h-full">
              {/* Navigation arrows for stack */}
              {gallery.length > 3 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 shadow-md"
                    onClick={prevStack}
                    disabled={stackIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 shadow-md"
                    onClick={nextStack}
                    disabled={stackIndex + 3 >= gallery.length}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}

              {/* Stacked thumbnails with layered effect */}
              <div className="space-y-4 h-full flex flex-col justify-center">
                {stackThumbs.map((img, i) => {
                  const stackPosition = i * 8 // Stagger effect
                  return (
                    <div
                      key={stackIndex + i}
                      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transform transition-transform duration-300 hover:-translate-y-1"
                      style={{ marginLeft: `${stackPosition}px` }}
                      onClick={() => openLightbox(stackIndex + i + 1)}
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`${name} gallery ${stackIndex + i + 1}`}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Overlay with number */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-sm">
                          {stackIndex + i + 2}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Stack position indicator */}
              {gallery.length > 3 && (
                <div className="flex justify-center mt-4 space-x-1">
                  {Array.from({ length: Math.ceil(gallery.length / 3) }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        Math.floor(stackIndex / 3) === i
                          ? "bg-primary w-4"
                          : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Grid View (2x2) */}
          {activeView === "grid" && desktopThumbs.length > 0 && (
            <div className="grid grid-cols-2 gap-3 h-full">
              {desktopThumbs.map((img, i) => {
                const isLast = i === desktopThumbs.length - 1
                const showOverlay = isLast && remaining > 0

                return (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    onClick={() => openLightbox(i + 1)}
                  >
                    <div className="relative h-full">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${name} gallery ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Image number badge */}
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                        {i + 2}
                      </div>

                      {/* More images overlay */}
                      {showOverlay && (
                        <>
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <div className="text-2xl font-bold">+{remaining + 1}</div>
                            <div className="text-xs mt-1">More Photos</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile thumbnails (unchanged) */}
      {gallery.length > 0 && (
        <div className="lg:hidden">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Gallery</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openLightbox(0)}
              className="text-primary hover:text-primary/80"
            >
              View all {totalImages} photos
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {gallery.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={img}
                  alt={`${name} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{
          view: ({ index }) => setIndex(index),
        }}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{
          position: "bottom",
          gap: 12,
          border: 0,
          padding: 8,
          imageFit: "cover",
          borderRadius: 8,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        carousel={{
          finite: false,
          preload: 2,
          imageFit: "contain",
        }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        }}
      />
    </div>
  )
}