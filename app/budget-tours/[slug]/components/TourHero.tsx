// app/budget-tours/[slug]/components/TourHero.tsx
import Image from "next/image";
import { Star, Clock, Users, MapPin, Calendar } from "lucide-react";

interface TourHeroProps {
  tour: {
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    duration: string;
    groupSize: string;
    country: string;
    departure: string;
    price: number;
    originalPrice?: number;
    bookingUrl: string;
    url: string;
  };
}

export default function TourHero({ tour }: TourHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
      {/* Main Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={tour.image}
          alt={`${tour.title} - Affordable Kenya Safari 2026`}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Tour Info Overlay */}
      <div className="container relative z-10 mx-auto flex h-full flex-col justify-end px-4 pb-12 text-white">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/90 px-4 py-2 text-sm font-semibold">
            <Star className="h-4 w-4" />
            <span>{tour.rating} ({tour.reviewCount} reviews)</span>
          </div>
          
          <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
            {tour.title}
          </h1>
          
          <div className="mb-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-medium">{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-medium">{tour.groupSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{tour.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">{tour.departure}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">${tour.price}</span>
              {tour.originalPrice && (
                <span className="text-xl text-white/70 line-through">${tour.originalPrice}</span>
              )}
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-300">
                Save ${tour.originalPrice ? tour.originalPrice - tour.price : 0}
              </span>
            </div>
            <p className="mt-2 text-white/80">per person sharing</p>
          </div>
        </div>
      </div>
    </section>
  );
}