// app/vehicle-hire/luxury-roof-top-camping/CampingHero.tsx
'use client'

import Image from "next/image"
import { Star, Tent, Mountain, Sun } from "lucide-react"

type Product = {
  name: string
  heroImage?: string
  description: string
}

export default function CampingHero({ product }: { product: Product }) {
  return (
    <section className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-16">
      <Image
        src={product.heroImage || "/camping/rooftop-tent-sunset.jpg"}
        alt="Luxury roof-top tent on 4x4 vehicle under starry sky in Maasai Mara, Kenya"
        fill
        priority
        sizes="100vw"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h1 className="mb-3 font-serif text-5xl md:text-6xl font-bold drop-shadow-lg">
          {product.name}
        </h1>
        <p className="text-xl leading-relaxed max-w-3xl text-white/90">
          {product.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1 text-sm font-medium text-white">
            <Star className="h-4 w-4" /> Luxury Glamping
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
            <Tent className="h-4 w-4" /> Roof-Top Tents
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
            <Mountain className="h-4 w-4" /> Private Camps
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1 text-sm font-medium text-white">
            <Sun className="h-4 w-4" /> Starlit Dinners
          </span>
        </div>
      </div>
    </section>
  )
}