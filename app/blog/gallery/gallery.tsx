"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { galleryItems, galleryCategories, galleryCountries, GalleryItem } from "@/lib/gallery-data"
import { GalleryFilters } from "@/components/gallery-filters"
import { MediaModal } from "@/components/media-modal"
import { Camera, Video, MapPin, Calendar, User } from "lucide-react"

export default function GalleryP() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const categoryMatch = selectedCategory === "All" || item.category === selectedCategory
      const countryMatch = selectedCountry === "All" || item.country === selectedCountry
      return categoryMatch && countryMatch
    })
  }, [selectedCategory, selectedCountry])

  const openMedia = (item: GalleryItem, index: number) => {
    setSelectedItem(item)
    setCurrentIndex(index)
  }

  const closeMedia = () => {
    setSelectedItem(null)
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setCurrentIndex(nextIndex)
    setSelectedItem(filteredItems[nextIndex])
  }

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setCurrentIndex(prevIndex)
    setSelectedItem(filteredItems[prevIndex])
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-muted/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/hero-bg.jpg"
            alt="Safari Photography"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-4 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl">
            Safari Photo & Video Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 text-pretty">
            Immerse yourself in the beauty of East Africa through our curated collection of safari photos and videos.
            From the Great Migration to intimate gorilla encounters, experience the magic of African wildlife and
            landscapes.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="mb-8">
                  <h2 className="mb-2 font-serif text-3xl font-bold">Gallery</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {filteredItems.length} stunning images and videos
                  </p>
                </div>
                
                <GalleryFilters
                  categories={galleryCategories}
                  countries={galleryCountries}
                  selectedCategory={selectedCategory}
                  selectedCountry={selectedCountry}
                  onCategoryChange={setSelectedCategory}
                  onCountryChange={setSelectedCountry}
                />
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="lg:col-span-3">
              {filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-muted-foreground text-lg mb-4">No items found matching your filters.</div>
                  <button
                    onClick={() => {
                      setSelectedCategory("All")
                      setSelectedCountry("All")
                    }}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item, index) => (
                    <article
                      key={item.id}
                      className="group cursor-pointer overflow-hidden rounded-lg bg-card shadow-sm transition-all hover:shadow-lg hover:scale-105"
                      onClick={() => openMedia(item, index)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.type === "video" ? item.thumbnailUrl! : item.url}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/20">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform group-hover:scale-110">
                              <Video className="h-8 w-8 text-primary" />
                            </div>
                          </div>
                        )}
                        <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                          {item.category}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="mb-2 text-lg font-bold leading-tight line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="mb-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{item.country}</span>
                          </div>
                          {item.photographer && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span>{item.photographer}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={item.date}>
                              {new Date(item.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                          {item.type === "image" && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Camera className="h-3 w-3" />
                              <span>Photo</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Media Modal */}
      <MediaModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={closeMedia}
        onNext={goToNext}
        onPrevious={goToPrevious}
        hasNext={currentIndex < filteredItems.length - 1}
        hasPrevious={currentIndex > 0}
      />

      {/* SEO Content Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-serif text-3xl font-bold">East Africa Safari Photography & Videography Gallery</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Welcome to the JaeTravel Expeditions photo and video gallery, your window into the breathtaking beauty
                of East African safaris. Our collection showcases the incredible wildlife, stunning landscapes, and rich
                cultural experiences that await you in Kenya, Tanzania, Rwanda, and Uganda.
              </p>

              <h3 className="text-xl font-semibold text-foreground">Wildlife Photography from the Heart of Africa</h3>
              <p>
                Browse through our extensive collection of wildlife photography featuring the Big Five (lions, leopards,
                elephants, buffalo, and rhinos), the Great Migration in Masai Mara and Serengeti, mountain gorillas in
                Bwindi and Volcanoes National Park, chimpanzees in Kibale Forest, and countless other species that call
                East Africa home. Each image captures the raw beauty and power of African wildlife in their natural
                habitats.
              </p>

              <h3 className="text-xl font-semibold text-foreground">Landscape & Scenic Photography</h3>
              <p>
                Experience the diverse landscapes of East Africa through our lens - from the endless plains of the
                Serengeti to the snow-capped peaks of Mount Kilimanjaro, the lush rainforests of Bwindi to the pristine
                beaches of Zanzibar. Our landscape photography showcases the incredible natural beauty that makes East
                Africa one of the world's premier safari destinations.
              </p>

              <h3 className="text-xl font-semibold text-foreground">Cultural & Accessible Safari Experiences</h3>
              <p>
                Our gallery also features authentic cultural encounters with the Maasai people, behind-the-scenes looks
                at our accessible safari experiences with wheelchair-adapted vehicles, and the warm hospitality that
                defines East African tourism. See how we make safari adventures accessible for everyone, regardless of
                mobility challenges.
              </p>

              <h3 className="text-xl font-semibold text-foreground">Safari Videos & Virtual Tours</h3>
              <p>
                Immerse yourself in the sights and sounds of an African safari through our video collection. Watch
                wildebeest crossing the Mara River, listen to lions roaring at dawn, experience gorilla trekking
                adventures, and get a preview of what awaits you on your East African safari. Our videos bring the
                safari experience to life and help you plan your perfect adventure.
              </p>

              <h3 className="text-xl font-semibold text-foreground">
                Use Our Gallery for Safari Planning & Inspiration
              </h3>
              <p>
                Whether you're researching your first African safari, looking for photography inspiration, or simply
                enjoying the beauty of African wildlife, our gallery provides an authentic glimpse into the safari
                experience. All images and videos are taken during actual JaeTravel Expeditions tours, giving you a
                realistic preview of what you can expect when you travel with us. Browse by country, category, or
                wildlife type to find exactly what you're looking for.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}