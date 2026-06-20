// app/offers/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Users, Check, ArrowRight, Phone, MapPin, Star } from "lucide-react";
import { getAllActiveOffers } from "@/lib/special-offers";

export const metadata: Metadata = {
  title: "Exclusive Safari Offers & Deals 2026 | JaeTravel",
  description: "Save on Kenya safari packages with our exclusive limited-time offers. Budget safaris from $750. Book now!",
  openGraph: {
    title: "Exclusive Safari Offers & Deals 2026",
    description: "Save on Kenya safari packages with our exclusive limited-time offers. Budget safaris from $750.",
    type: "website",
  },
};

export default function OffersPage() {
  const offers = getAllActiveOffers();

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            <span className="animate-pulse">🔥</span> LIMITED TIME OFFERS
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Exclusive Safari Deals
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Save up to $180 per person on our special safari packages. Premium wildlife experiences at unbeatable prices.
          </p>
          <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8">
            <Link href="/budget-tours">
              View All Budget Tours
            </Link>
          </Button>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {offers.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No offers available at the moment. Check back soon!</p>
              <Button asChild className="mt-6 bg-green-600 hover:bg-green-700">
                <Link href="/budget-tours">Browse All Tours</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {offers.map((offer) => (
                <Link 
                  key={offer.id}
                  href={`/budget-tours/offers/${offer.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={offer.image}
                      alt={offer.imageAlt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        {offer.badge}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end justify-between">
                        <div className="text-white">
                          <div className="flex items-baseline gap-2">
                            <span className="text-white/60 line-through text-sm">${offer.originalPrice}</span>
                            <span className="text-3xl font-bold text-yellow-400">${offer.offerPrice}</span>
                          </div>
                          <span className="text-xs text-white/80">per person</span>
                        </div>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Save ${offer.originalPrice - offer.offerPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      {offer.duration}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {offer.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {offer.shortDescription}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {offer.highlights.slice(0, 3).map((highlight, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          <Check className="h-3 w-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        4.8/5 (120 reviews)
                      </span>
                      <span className="text-green-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Looking for something else?
          </h3>
          <p className="text-gray-600 mb-6">
            Browse our full range of safari packages for every budget and preference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/budget-tours">All Budget Tours</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}