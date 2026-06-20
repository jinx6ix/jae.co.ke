// app/budget-tours/offers/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Check, X, Phone, MapPin, Star, Calendar, ArrowRight, Shield, Coffee, Car } from "lucide-react";
import { getOfferBySlug, getAllActiveOffers } from "@/lib/special-offers";
import BookingFormWrapper from "./BookingFormWrapper";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const offer = getOfferBySlug(params.slug);
  if (!offer) return {};

  return {
    title: offer.metaTitle || `${offer.title} | $${offer.offerPrice}`,
    description: offer.metaDescription || offer.shortDescription,
    openGraph: {
      title: offer.title,
      description: offer.shortDescription,
      images: [{ url: offer.image, alt: offer.imageAlt }],
    },
  };
}

export async function generateStaticParams() {
  const offers = getAllActiveOffers();
  return offers.map((offer) => ({ slug: offer.slug }));
}

export default async function OfferDetailPage(props: Props) {
  const params = await props.params;
  const offer = getOfferBySlug(params.slug);
  if (!offer) notFound();

  const savings = offer.originalPrice - offer.offerPrice;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/offers" className="hover:text-green-600">Special Offers</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{offer.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image 
          src={offer.image}
          alt={offer.imageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-7xl">
            <span className="inline-block bg-yellow-500 text-gray-900 text-sm font-bold px-4 py-1 rounded-full mb-4">
              {offer.badge}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
              {offer.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                {offer.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-5 w-5" />
                Shared Group (4-12 people)
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                4.8/5 (120 reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Price Card */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-gray-500 line-through text-xl">${offer.originalPrice}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-green-700">${offer.offerPrice}</span>
                      <span className="text-gray-600">per person</span>
                    </div>
                  </div>
                  <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-center">
                    <div className="text-xs">You Save</div>
                    <div className="text-xl">${savings}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  Free cancellation up to 48 hours before departure
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Tour Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {offer.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">About This Safari</h2>
                <div className="prose prose-green max-w-none">
                  <p className="text-gray-600 whitespace-pre-line">{offer.longDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {offer.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-8 border-l-2 border-green-200">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                        {day.day}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{day.title}</h3>
                      <p className="text-gray-600 mb-2">{day.description}</p>
                      {day.meals && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Coffee className="h-4 w-4" />
                          {day.meals}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-2">
                    {offer.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" />
                    Not Included
                  </h2>
                  <ul className="space-y-2">
                    {offer.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-gray-900">{offer.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Group Size</span>
                      <span className="font-medium text-gray-900">4-12 people</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Tour Type</span>
                      <span className="font-medium text-gray-900">Shared Safari</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Departure</span>
                      <span className="font-medium text-gray-900">Daily from Nairobi</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Transport</span>
                      <span className="font-medium text-gray-900 flex items-center gap-1">
                        <Car className="h-4 w-4" /> 4x4 Land Cruiser
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Form */}
              <div id="booking-form">
                <BookingFormWrapper
                  tourTitle={offer.title}
                  tourPrice={offer.offerPrice}
                  tourDuration={offer.duration}
                  serviceType="tour"
                  tourSlug={offer.slug}
                  tourUrl={`https://www.jaetravel.co.ke${offer.bookingUrl}`}
                />
              </div>

              {/* Contact CTA */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-gray-900 mb-2">Have Questions?</h3>
                  <p className="text-sm text-gray-600 mb-4">Our safari experts are ready to help you plan your perfect trip.</p>
                  <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                    <a href="https://wa.me/254726485228" target="_blank" rel="noopener noreferrer">
                      <Phone className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <a href="tel:+254726485228" className="block mt-3 text-sm text-gray-600 hover:text-green-600">
                    Or call +254 726 485 228
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}