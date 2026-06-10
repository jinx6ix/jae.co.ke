"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function TourHero({ tour }: { tour: any }) {
  return (
    <div className="relative rounded-xl overflow-hidden mb-8">
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(tour.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm">
              {tour.rating} · {tour.reviewCount} Bewertungen
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            {tour.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            {tour.shortDescription}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-sm">Dauer</span>
              <p className="font-semibold">{tour.duration}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-sm">Gruppengröße</span>
              <p className="font-semibold">{tour.groupSize}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-sm">Abfahrt</span>
              <p className="font-semibold">{tour.departure}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}