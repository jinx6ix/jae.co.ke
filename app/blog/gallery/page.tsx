import type { Metadata } from "next"
import Image from "next/image"
import { galleryItems, galleryCategories, galleryCountries } from "@/lib/gallery-data"
import { GalleryFilters } from "@/components/gallery-filters"
import { Camera, Video, MapPin, Calendar, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Safari Photo & Video Gallery | JaeTravel Expeditions",
  description:
    "Explore our stunning collection of safari photos and videos from Kenya, Tanzania, Rwanda, and Uganda. Witness the Great Migration, mountain gorillas, elephants, and breathtaking African landscapes. Browse wildlife photography, cultural experiences, and accessible safari adventures.",
  keywords: [
    "Safari Photos",
    "Wildlife Photography",
    "Africa Safari Gallery",
    "Kenya Wildlife Photos",
    "Tanzania Safari Images",
    "Rwanda Gorilla Photos",
    "Uganda Safari Videos",
    "Great Migration Photos",
    "Mountain Gorilla Images",
    "Safari Video Gallery",
    "African Wildlife Photography",
    "Masai Mara Photos",
    "Serengeti Images",
    "Accessible Safari Photos",
    "Safari Adventure Gallery",
  ],
  openGraph: {
    title: "Safari Photo & Video Gallery | JaeTravel Expeditions",
    description:
      "Explore stunning safari photos and videos from East Africa. Wildlife, landscapes, and cultural experiences.",
    images: ["/.jpg?height=630&width=1200&query=african safari wildlife photography gallery"],
  },
}

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-muted/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="/.jpg?height=600&width=1920&query=african safari photography camera wildlife"
            alt="Safari Photography"
            fill
            className="object-cover brightness-50"
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

      {/* Gallery Filters */}
      <section className="border-b border-border bg-background py-6">
        <div className="container mx-auto px-4">
          <GalleryFilters categories={galleryCategories} countries={galleryCountries} />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="mb-2 font-serif text-3xl font-bold">Explore Our Collection</h2>
            <p className="text-muted-foreground leading-relaxed">
              {galleryItems.length} stunning images and videos capturing the essence of East African safaris
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-lg bg-card shadow-sm transition-all hover:shadow-lg"
                itemScope
                itemType="https://schema.org/ImageObject"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.type === "video" ? item.thumbnailUrl! : item.url}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    itemProp="contentUrl"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur">
                        <Video className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  )}
                  <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {item.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold leading-tight" itemProp="name">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground leading-relaxed" itemProp="description">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 border-t border-border pt-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span itemProp="contentLocation">{item.country}</span>
                    </div>
                    {item.photographer && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span itemProp="creator">{item.photographer}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <time dateTime={item.date} itemProp="datePublished">
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
                        itemProp="keywords"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hidden structured data for SEO */}
                <meta itemProp="uploadDate" content={item.date} />
                <meta itemProp="thumbnailUrl" content={item.type === "video" ? item.thumbnailUrl! : item.url} />
              </article>
            ))}
          </div>
        </div>
      </section>

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
