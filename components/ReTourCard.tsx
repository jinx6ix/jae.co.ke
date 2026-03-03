// components/AmboseliTourCard.tsx  (or wherever you keep reusable components)

import { Star, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TourCardProps {
  title: string;
  description: string;
  price: number | string;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string;
  checkInText?: string;          // e.g. "Arrival and lodge check-in"
  href: string;                   // link for "Book Now"
  className?: string;
}

export default function TourCard({
  title,
  description,
  price,
  rating,
  reviewCount,
  location,
  imageUrl,
  checkInText = "Arrival and lodge check-in",
  href,
  className = "",
}: TourCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl ${className}`}
    >
      {/* Image + Price badge */}
      <div className="relative">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        {/* Price tag - top right */}
        <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 font-bold text-gray-900 shadow-md">
          ${price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <MapPin className="h-4 w-4 text-green-600" />
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold leading-tight text-gray-900 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {description}
        </p>

        {/* Rating + Check-in info */}
        <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-1 font-medium text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            <span>
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{checkInText}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={href} className="block">
          <button className="w-full rounded-xl bg-orange-500 py-3.5 text-base font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}