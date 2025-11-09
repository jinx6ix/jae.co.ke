// app/destinations/DestinationCard.tsx
'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Destination = {
  slug: string
  name: string
  heroImage: string
  description: string
  bestFor: string[]
  popularTours: number
}

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destination/${destination.slug}`}
      className="group relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl"
    >
      <Image
        src={destination.heroImage}
        alt={`${destination.name} - East Africa safari destination with ${destination.bestFor.join(", ")}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h2 className="mb-3 font-serif text-4xl font-bold">{destination.name}</h2>
        <p className="mb-4 text-white/90 leading-relaxed line-clamp-2">
          {destination.description}
        </p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {destination.bestFor.map((tag, i) => (
            <span key={i} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 font-medium text-white">
          <span>Explore {destination.name}</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}