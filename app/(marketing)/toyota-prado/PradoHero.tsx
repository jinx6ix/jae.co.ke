// app/vehicle-hire/toyota-prado/PradoHero.tsx
'use client'

import Image from "next/image"
import { CheckCircle, Users, Fuel } from "lucide-react"

type Product = {
  name: string
  heroImage?: string
  description: string
}

export default function PradoHero({ product }: { product: Product }) {
  return (
    <section className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-16">
      <Image
        src={product.heroImage || "/vehicles/toyota-prado-hero.jpg"}
        alt="Toyota Prado 4x4 on safari in Maasai Mara with pop-up roof open during golden hour"
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
          <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
            <CheckCircle className="h-4 w-4" /> Self-Drive Available
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
            <Users className="h-4 w-4" /> 5 Passengers
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1 text-sm font-medium text-white">
            <Fuel className="h-4 w-4" /> Diesel 4x4
          </span>
        </div>
      </div>
    </section>
  )
}