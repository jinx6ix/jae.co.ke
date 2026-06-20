// app/budget-tours/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check, DollarSign, Users, Shield, Phone, MapPin, Calendar, Camera,
  Star, Award, Clock, CreditCard, Mail, Sun, Mountain,
  Binoculars, Camera as CameraIcon, Globe, TreePine, Heart,
  Droplets, Thermometer, Info, ChevronRight, ThumbsUp,
  Coffee, AlertCircle, Palmtree, Ticket, ArrowRight, Car
} from "lucide-react";
import BudgetToursClient from "./BudgetToursClient";
import GoogleMerchantWidget from "./GoogleMerchantWidget";
import { budgetTours } from "@/lib/budget-tours-data";

const totalTours = budgetTours.length;
const avgRating = totalTours > 0
  ? (budgetTours.reduce((sum, t) => sum + (t.rating || 4.5), 0) / totalTours).toFixed(1)
  : "4.8";
const minPrice = totalTours > 0
  ? Math.min(...budgetTours.map(t => t.price))
  : 610;
const maxPrice = totalTours > 0
  ? Math.max(...budgetTours.map(t => t.price))
  : 1690;
const totalReviews = budgetTours.reduce((s, t) => s + t.reviewCount, 0);
const ABSOLUTE_URL = "https://www.jaetravel.co.ke/budget-tours";
const HERO_IMG = "https://www.jaetravel.co.ke/fantasticafrica-20240806-0001.jpg";
const featuredTours = budgetTours.slice(0, 6);

// Special Offers - Easy to add more by copying a block
const specialOffers = [
  {
    id: "offer-1",
    title: "Masai Mara & Nakuru 4-Day Safari",
    shortDesc: "Big Five in Masai Mara + Flamingos & Rhinos at Lake Nakuru",
    image: "/offers.jpeg",
    imageAlt: "Masai Mara and Lake Nakuru 4-Day Budget Safari with wildebeest and flamingos",
    originalPrice: 930,
    offerPrice: 750,
    duration: "4 Days / 3 Nights",
    highlights: ["2 National Parks", "Shared Group", "All Meals"],
    bookingUrl: "/budget-tours/offers/masai-mara-nakuru-4-days-budget-shared-safari-special",
    badge: "BEST VALUE",
    active: true,
  },
  // Add more offers here in the future:
  // {
  //   id: "offer-2",
  //   title: "Amboseli 3-Day Adventure",
  //   shortDesc: "Elephants with Kilimanjaro backdrop",
  //   image: "/your-image.jpg",
  //   imageAlt: "...",
  //   originalPrice: 699,
  //   offerPrice: 599,
  //   duration: "3 Days / 2 Nights",
  //   highlights: ["Kilimanjaro Views", "Big Five", "All Meals"],
  //   bookingUrl: "/budget-tours/offers/your-offer-slug",
  //   badge: "POPULAR",
  //   active: true,
  // },
];

const activeOffers = specialOffers.filter(o => o.active);

export const metadata: Metadata = {
  title: "Budget Safari Kenya 2026 | From $610/Person | JaeTravel",
  description: "Kenya budget safaris from $610. Masai Mara, Amboseli, Nakuru tours. All-inclusive.",
  keywords: [
    "budget tours Kenya", "budget safari Kenya", "cheap safaris Kenya", "Kenya budget tours 2026",
    "budget tours in Kenya", "cheap Kenya safari", "budget Kenya tours", "Kenya cheap tours",
    "affordable Kenya safaris", "budget safari in Kenya", "Kenya budget safari tours",
    "Masai Mara budget tours", "Amboseli budget tours", "Lake Nakuru budget tours",
    "Kenya group safaris", "budget Kenya wildlife tours", "Kenya tour packages budget",
    "cheap Africa safaris", "budget East Africa tours", "Kenya budget travel",
    "budget safari packages Kenya", "Kenya budget game drives", "budget tented camp Kenya",
    "Kenya budget travel guide", "budget Kenya itinerary", "affordable Kenya tours 2026",
    "Kenya budget vacation", "budget safaris Masai Mara", "Kenya budget holiday packages",
    "cheapest Kenya safaris", "Kenya budget trips", "low cost Kenya tours", "budget Africa tours"
  ].join(", "),
  
  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  alternates: {
    canonical: ABSOLUTE_URL,
    languages: {
      'en': ABSOLUTE_URL,
      'x-default': ABSOLUTE_URL,
    },
  },
  openGraph: {
    title: "Budget Safari Kenya 2026 | Tours from $610/Person",
    description: "Kenya budget safaris from $610. Masai Mara, Amboseli, Nakuru tours. All-inclusive, expert guides.",
    url: ABSOLUTE_URL,
    siteName: "JaeTravel Expeditions",
    images: [{
      url: HERO_IMG,
      width: 1200,
      height: 630,
      alt: "Budget Safari Kenya 2026 - Wildebeest migration in Masai Mara",
      type: "image/jpeg",
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Safari Kenya 2026 | Tours from $610/Person",
    description: "Kenya budget safaris from $610. Masai Mara, Amboseli, Nakuru tours. All-inclusive.",
    images: [HERO_IMG],
    site: "@jaetravel",
    creator: "@jaetravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "JaeTravel Expeditions",
      description: "Kenya tour operator specializing in budget tours and affordable safaris across Kenya's top wildlife destinations.",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressLocality: "Nairobi"
      },
      sameAs: [
        "https://www.facebook.com/jaetravelexpeditions",
        "https://www.instagram.com/jaetravel",
        "https://twitter.com/jaetravelke"
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        reviewCount: totalReviews.toString()
      }
    },
    {
      "@type": "WebPage",
      url: ABSOLUTE_URL,
      name: "Budget Safari Kenya 2026 | Tours from $610/Person",
      description: "Kenya budget safaris from $610. Masai Mara, Amboseli, Nakuru tours. All-inclusive, expert guides.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: HERO_IMG,
        width: 1200,
        height: 630
      }
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jaetravel.co.ke/" },
        { "@type": "ListItem", position: 2, name: "Budget Safari Kenya", item: ABSOLUTE_URL }
      ]
    },
    {
      "@type": "Product",
      name: "Budget Safari Packages Kenya 2026",
      description: "Affordable safari packages across Kenya from $610. Masai Mara, Amboseli, Lake Nakuru, Naivasha with all-inclusive guiding.",
      image: HERO_IMG,
      brand: { "@type": "Brand", name: "JaeTravel Expeditions" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: minPrice.toString(),
        highPrice: maxPrice.toString(),
        offerCount: totalTours.toString(),
        availability: "https://schema.org/InStock",
        priceValidUntil: "2026-12-31"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: totalReviews.toString(),
        bestRating: "5"
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How much does a budget safari in Kenya cost?", acceptedAnswer: { "@type": "Answer", text: `Our Kenya budget safaris start from $${minPrice} per person for entry-level packages. These include shared transport, tented camp accommodation, park fees, all meals, and professional guiding. Mid-range packages ($800-$1,200) offer better camps or private vehicle options. All tours are all-inclusive — no hidden extras.` } },
        { "@type": "Question", name: "What is the cheapest way to do a safari in Kenya?", acceptedAnswer: { "@type": "Answer", text: "The cheapest safaris in Kenya are group joining tours (4-12 travelers sharing a vehicle) staying at budget tented camps. Booking 2+ months ahead and choosing less busy seasons (March-May) can save 20-30%. Our $610+ budget packages represent the best value — park fees alone for Masai Mara are $100/day, so our all-inclusive pricing undercuts self-planning significantly." } },
        { "@type": "Question", name: "What destinations can I visit on a budget Kenya tour?", acceptedAnswer: { "@type": "Answer", text: "Popular budget safari destinations include Masai Mara (world-famous for Big Five and Great Migration), Lake Nakuru (rhinos and flamingos), Amboseli (elephants with Kilimanjaro views), Lake Naivasha (hippos and birding), and Tsavo (remote wildlife). Most budget packages combine 2-3 parks in 3-7 days." } },
        { "@type": "Question", name: "Is Kenya safe for budget travelers?", acceptedAnswer: { "@type": "Answer", text: "Kenya's major safari destinations (Masai Mara, Amboseli, Lake Nakuru) are very safe for tourists. We use licensed operators, professional guides, and well-maintained vehicles. Nairobi has typical urban caution needs — our safaris handle all transport from hotel to park and back. Safari camps have security personnel." } },
        { "@type": "Question", name: "What is the best time to visit Kenya for a budget safari?", acceptedAnswer: { "@type": "Answer", text: "June-October is peak season (dry, best wildlife viewing, Great Migration in Masai Mara) with higher prices. November-March is green season — lower prices, fewer crowds, excellent birding. April-May long rains see the biggest discounts but some roads become tricky. Budget travelers can save 30-40% by visiting in the green season." } },
        { "@type": "Question", name: "What is included in a typical budget safari package?", acceptedAnswer: { "@type": "Answer", text: "All our Kenya budget safari packages include: 4x4 Land Cruiser transport from Nairobi, park entrance fees, accommodation in tented camps or lodges, all meals (breakfast, lunch, dinner), professional English-speaking safari guide, and drinking water. Not included: international flights, visa, travel insurance, tips, alcohol, and optional activities." } },
        { "@type": "Question", name: "Can I see the Big Five on a budget Kenya safari?", acceptedAnswer: { "@type": "Answer", text: "Yes — all our Kenya budget safari packages are designed to spot the Big Five (lion, leopard, elephant, buffalo, rhino). Masai Mara has excellent lion and leopard sightings. Lake Nakuru has black and white rhinos in a protected sanctuary. Amboseli has large elephant herds. Our guides are experts at tracking wildlife in these proven Big Five destinations." } },
        { "@type": "Question", name: "What's the difference between group and private safaris?", acceptedAnswer: { "@type": "Answer", text: "Group safaris share a 4x4 vehicle with 4-12 other travelers — lower per-person cost, social atmosphere, great for solo travelers. Private safaris give you a dedicated vehicle and guide — flexibility to set your own pace and schedule, but 40-60% more expensive. Both use the same parks, same game drives, same quality guides." } },
        { "@type": "Question", name: "How far in advance should I book a Kenya budget safari?", acceptedAnswer: { "@type": "Answer", text: "For peak season (July-October, December-January, Easter), book 2-3 months ahead to secure your preferred dates and package. For green season (March-May, November), 2-4 weeks is often sufficient. Last-minute bookings are possible but availability becomes limited." } },
        { "@type": "Question", name: "Do budget safari camps have hot water and electricity?", acceptedAnswer: { "@type": "Answer", text: "Most budget tented camps in Kenya offer 24-hour electricity, hot showers, and comfortable beds with quality bedding. Some remote camps may have solar power limitations. We carefully vet all accommodations — our budget options balance authentic safari experience with genuine comfort." } },
        { "@type": "Question", name: "What should I pack for a Kenya budget safari?", acceptedAnswer: { "@type": "Answer", text: "Pack light neutral-colored clothing (khaki, brown, green — no white or bright colors), layers for morning game drives (can be cool), binoculars, a camera with zoom lens (200mm+ recommended), sunscreen, a wide-brimmed hat, comfortable walking shoes, and personal medications. Most camps provide bedding, towels, and basic toiletries." } },
        { "@type": "Question", name: "How do I get from Nairobi to safari parks on a budget?", acceptedAnswer: { "@type": "Answer", text: "All our Kenya budget safari packages include round-trip transport from Nairobi in 4x4 Land Cruisers. The drive to Masai Mara takes 5-6 hours (scenic Great Rift Valley route). Lake Nakuru is 2-3 hours. Amboseli is 4-5 hours. Transport, park fees, accommodation, and meals are all bundled in the package price." } }
      ]
    }
  ]
};

export default function BudgetToursPage() {
  return (
    <div className="pb-16">
      <Script id="budget-tours-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GoogleMerchantWidget />

      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/fantasticafrica-20240806-0001.jpg" alt="Budget Safari Kenya 2026 - Wildebeest migration Masai Mara" fill className="object-cover brightness-50" priority sizes="100vw" quality={90} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-[1]" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Rated {avgRating}/5 by {totalReviews}+ Happy Safari Travelers</span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Budget Safari Kenya 2026 <span className="text-amber-400">— From ${minPrice}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-5xl text-xl leading-relaxed text-white/90">
            Kenya budget tours from ${minPrice} per person. Masai Mara, Amboseli, Lake Nakuru — all-inclusive wildlife adventures with expert guides. No hidden costs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-8">
            <Button asChild size="lg" className="min-w-[240px] text-lg bg-green-600 hover:bg-green-700 font-semibold">
              <Link href="#tours">View {totalTours} Safari Packages</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[240px] text-lg border-white bg-white/10 text-white backdrop-blur hover:bg-white/20">
              <Link href="/contact">Talk to Safari Expert</Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Best Price Guarantee</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Group & Private Options</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4" /> {avgRating}/5 Rating</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 24/7 Support</span>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="bg-green-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center text-sm font-medium">
            <div><div className="text-2xl font-bold">{totalTours}+</div><div className="opacity-80">Safari Packages</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">${minPrice}</div><div className="opacity-80">Starting From</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{avgRating}★</div><div className="opacity-80">Average Rating</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">{totalReviews}+</div><div className="opacity-80">Happy Travelers</div></div>
            <div className="w-px bg-white/20 hidden md:block" />
            <div><div className="text-2xl font-bold">15+</div><div className="opacity-80">Years Experience</div></div>
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS SECTION */}
      {activeOffers.length > 0 && (
        <section className="py-8 md:py-12 bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                <span>🔥</span> LIMITED TIME OFFERS
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Exclusive Safari Deals
              </h2>
              <p className="text-white/80">Book now and save up to $180 per person</p>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-6xl mx-auto">
              {activeOffers.map((offer) => (
                <a
                  key={offer.id}
                  href={offer.bookingUrl}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col transform perspective-1000 hover:rotate-x-2 hover:rotate-y-2 hover:scale-[1.02]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Image Section */}
                  <div 
                    className="relative w-full overflow-hidden"
                    style={{ height: '240px', transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src={offer.image}
                      alt={offer.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Badge on image */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        {offer.badge}
                      </span>
                    </div>

                    {/* Duration on image */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur text-gray-900 text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {offer.duration}
                      </span>
                    </div>

                    {/* Price overlay on image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-end justify-between">
                        <div className="text-white drop-shadow-lg">
                          <div className="flex items-baseline gap-2">
                            <span className="text-white/70 line-through text-sm">${offer.originalPrice}</span>
                            <span className="text-2xl font-bold text-yellow-400 drop-shadow-md">${offer.offerPrice}</span>
                          </div>
                          <span className="text-xs text-white/80">per person</span>
                        </div>
                        <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          Save ${offer.originalPrice - offer.offerPrice}
                        </span>
                      </div>
                    </div>

                    {/* Gradient for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {offer.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {offer.shortDesc}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {offer.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          <Check className="h-3 w-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm w-full justify-center">
                        View This Offer
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-8">
              <Link href="/offers" className="text-white/80 hover:text-white text-sm font-medium inline-flex items-center gap-1">
                View All Special Offers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* INTRO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="mb-6 font-serif text-5xl font-bold tracking-tight">
              Kenya Budget Safaris: World-Class Wildlife Without the Premium Price
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Kenya offers some of Africa&apos;s most spectacular wildlife experiences — and you don&apos;t need a luxury budget to enjoy them. Our Kenya budget tours make Masai Mara, Amboseli, Lake Nakuru, and more accessible to every traveler, starting from just <strong>${minPrice} per person</strong>.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-4">
              Whether you&apos;re after the Big Five, the Great Migration, flamingo-filled lakes, or elephants against Kilimanjaro — our budget safari packages cover Kenya&apos;s iconic destinations with comfortable tented camps, expert guides, and all-inclusive pricing. No hidden costs, no surprises.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              From solo travelers joining group tours to families seeking affordable adventures, our Kenya budget tours deliver <strong>unforgettable wildlife encounters</strong> at prices that won&apos;t break the bank. All tours include 4x4 transport, park fees, accommodation, meals, and professional guiding.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
              <Link href="#tours">Browse Safari Packages</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Chat on WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY KENYA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">Why Choose a Budget Safari in Kenya?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Globe className="h-8 w-8" />, title: "Big Five Destinations", desc: "Masai Mara, Amboseli, Lake Nakuru — proven Big Five safari destinations with reliable wildlife sightings year-round." },
              { icon: <DollarSign className="h-8 w-8" />, title: "Best Value in Africa", desc: `Packages from $${minPrice} include transport, park fees, camps, meals — far less than booking independently.` },
              { icon: <Car className="h-8 w-8" />, title: "Expert Local Guides", desc: "Professional safari guides with deep knowledge of wildlife behavior, ecosystems, and Kenyan culture." },
              { icon: <TreePine className="h-8 w-8" />, title: "Authentic Experience", desc: "Stay in comfortable tented camps in prime wildlife areas — closer to nature, genuine safari atmosphere." },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition border-2 border-transparent hover:border-green-500">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4 text-green-600">{item.icon}</div>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TOP SAFARI DESTINATIONS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-serif text-4xl font-bold">Top Safari Destinations in Kenya</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">Kenya&apos;s national parks and reserves offer incredible wildlife viewing across diverse ecosystems — all accessible on our budget safari packages.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Masai Mara National Reserve", emoji: "🦁", desc: "Kenya&apos;s most famous safari destination. World-renowned for Big Five sightings and the Great Migration (July-October). Lions, leopards, elephants, and dramatic river crossings.", price: "From $610", img: "/masai-mara-migration.jpg", href: "/budget-masai-mara-safari" },
              { name: "Lake Nakuru National Park", emoji: "🦩", desc: "Famous for pink flamingos, black and white rhinos, and Rothschild giraffes. Excellent birding with 450+ species. Just 2-3 hours from Nairobi.", price: "From $610", img: "/lake-nakuru-flamingos-in-red-sunset-590x390.jpg", href: "/budget-lake-nakuru-safari" },
              { name: "Amboseli National Park", emoji: "🐘", desc: "Iconic elephants with Mt. Kilimanjaro backdrop. High predator density, 400+ bird species, and spectacular photography opportunities.", price: "From $750", img: "/amboseli_elephants_at_sun_set-2__1200w.jpg", href: "/cheap-amboseli-tours" },
              { name: "Lake Naivasha", emoji: "🦛", desc: "Boat rides among hippos, golden monkey tracking, and birding paradise. Often combined with Hell&apos;s Gate National Park for walking safaris.", price: "From $610", img: "/masai-mara-safari.jpg", href: "/budget-tours" },
              { name: "Tsavo East & West", emoji: "🌿", desc: "One of Kenya&apos;s largest parks. Diverse habitats — from arid plains to volcanic features. Excellent for lions, elephants, and the famous red elephants.", price: "From $750", img: "/kenya-safari-landscape.jpg", href: "/budget-tours" },
              { name: "Samburu National Reserve", emoji: "🦒", desc: "Arid landscape with species found nowhere else — Grevy&apos;s zebras, reticulated giraffes, Somali ostriches, and the endangered African wild dog.", price: "From $850", img: "/Samburu_National_Reserve,_Kenya-26December2012.jpg", href: "/budget-tours" },
            ].map((dest, i) => (
              <Link key={i} href={dest.href} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border">
                <div className="relative h-48 overflow-hidden">
                  <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <div className="text-2xl mb-2">{dest.emoji}</div>
                  <h3 className="font-bold text-lg mb-2">{dest.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3" dangerouslySetInnerHTML={{ __html: dest.desc }} />
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-bold text-sm">{dest.price}</span>
                    <span className="text-primary text-sm flex items-center gap-1">Learn more <ChevronRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GROUP vs PRIVATE */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">Choose Your Safari Style</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-2 border-green-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold">Group Joining Safaris</h3>
                </div>
                <div className="text-lg font-semibold text-green-700 mb-4">From ${minPrice} per person</div>
                <p className="text-muted-foreground mb-6">Share the adventure with 4-12 fellow travelers in a 4x4 Land Cruiser. Our most popular budget option — social, affordable, and great for solo travelers.</p>
                <ul className="space-y-3">
                  {["Meet travelers from around the world", "Lowest per-person price", "Social atmosphere", "Fixed departure dates", "Perfect for solo travelers", "Same wildlife viewing quality as private"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full bg-green-600 hover:bg-green-700">
                  <Link href="/group-joining-safaris-kenya">View Group Safari Packages</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-amber-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <TreePine className="h-8 w-8 text-amber-600" />
                  <h3 className="text-2xl font-bold">Private Safaris</h3>
                </div>
                <div className="text-lg font-semibold text-amber-700 mb-4">From $850 per person</div>
                <p className="text-muted-foreground mb-6">Your own vehicle and guide for complete flexibility — set your schedule, choose your pace, and customize your wildlife priorities.</p>
                <ul className="space-y-3">
                  {["Dedicated 4x4 vehicle and guide", "Flexible departure dates", "Customizable itinerary", "Stop for photos whenever you want", "Ideal for families or couples", "Comfort and privacy priority"].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full" variant="outline">
                  <Link href="/contact">Ask About Private Safari</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WILDLIFE HIGHLIGHTS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-serif text-4xl font-bold">Wildlife You&apos;ll See on Kenya Budget Tours</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">Kenya&apos;s national parks host an extraordinary diversity of wildlife — from the iconic Big Five to thousands of flamingos and 500+ bird species.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: "🦁", title: "Lions", desc: "High pride densities in Masai Mara. Watch hunts, cubs playing, and the dramatic Mara River crossings during migration season." },
              { emoji: "🐘", title: "Elephants", desc: "Large family herds in Amboseli with Kilimanjaro backdrop. Herds of 50-100 regularly seen moving between water sources." },
              { emoji: "🦏", title: "Rhinos", desc: "Lake Nakuru has Kenya&apos;s most successful rhino sanctuary. Both black and white rhinos in protected habitat with excellent sighting rates." },
              { emoji: "🐆", title: "Leopards", desc: "Masai Mara has one of the highest leopard densities in Africa. Our guides know the best trees and territories for sightings." },
              { emoji: "🦬", title: "Buffalo", desc: "Large herds congregate near wetlands in Lake Nakuru and Mara. Herds of 500+ are a spectacular sight against the African horizon." },
              { emoji: "🦩", title: "Flamingos", desc: "Lake Nakuru&apos;s alkaline waters attract up to 2 million flamingos — one of the most spectacular bird sights in Africa." },
              { emoji: "🦛", title: "Hippos", desc: "Lake Naivasha hosts thousands of hippos. Boat rides bring you close to these massive but shy creatures in their natural habitat." },
              { emoji: "🦒", title: "Giraffes", desc: "Rothschild giraffes at Lake Nakuru, Masai giraffes in Mara. Their towering height and gentle nature make for magical encounters." },
              { emoji: "🦅", title: "Birds", desc: "450-500+ species across Kenya parks. African fish eagles, pelvic fish owls, steppe eagles, kingfishers, and migrant species Nov-March." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST TIME TO VISIT */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">Best Time to Visit Kenya for Budget Safaris</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { season: "June – October", label: "Peak Season", color: "border-green-500", icon: <Sun className="h-8 w-8 text-green-600" />, highlights: ["Great Migration in Masai Mara", "Best Big Five sightings", "Kilimanjaro clearest views", "Dry = easier wildlife tracking"], temp: "20-28°C", tip: "Book 2-3 months ahead. Highest prices but best wildlife viewing." },
              { season: "November – March", label: "Green Season", color: "border-blue-500", icon: <Droplets className="h-8 w-8 text-blue-500" />, highlights: ["Lower prices (20-30% off)", "Fewer crowds", "Excellent birding (migrants)", "Lush green landscapes"], temp: "22-30°C", tip: "Best value for budget travelers. Great all-around." },
              { season: "April – May", label: "Long Rains", color: "border-gray-400", icon: <Thermometer className="h-8 w-8 text-gray-500" />, highlights: ["Biggest discounts (40% off)", "Some roads become muddy", "Not recommended for remote areas", "Many lodges offer deep cuts"], temp: "18-26°C", tip: "Only for flexible travelers comfortable with rain and mud." },
            ].map((item, i) => (
              <Card key={i} className={`border-t-4 ${item.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                    <div>
                      <h3 className="text-xl font-bold">{item.season}</h3>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm font-medium text-green-700 mb-2">Avg temp: {item.temp}</div>
                  <div className="bg-gray-50 p-3 rounded text-xs text-muted-foreground"><Info className="inline h-3 w-3 mr-1" />{item.tip}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PACKING TIPS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">Safari Packing Essentials</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Clothing", icon: "👕", items: ["Neutral colors: khaki, brown, green", "Long-sleeve shirts for sun/mosquitoes", "Shorts or light trousers", "Light jacket (mornings are cool)", "Comfortable walking shoes", "Wide-brimmed hat"] },
              { title: "Gear & Tech", icon: "📷", items: ["Binoculars (10x42 recommended)", "Camera with 200-400mm zoom", "Extra memory cards and batteries", "Sunscreen SPF 50+", "Dust-resistant bag for cameras", "Power bank for long game drives"] },
              { title: "Health & Comfort", icon: "💊", items: ["Personal medications", "Anti-malarial prophylaxis", "Insect repellent (DEET 30%+)", "Reusable water bottle", "Lip balm and moisturizer", "Basic first-aid kit"] },
            ].map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((thing, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {thing}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
              <AlertCircle className="h-4 w-4" /> Avoid white, bright colors, and dark colors — they alarm wildlife. Earth tones blend with the environment.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE COMPARISON */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-serif text-4xl font-bold">Why Our Budget Tours Beat Planning Yourself</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-green-700">Our All-Inclusive Package</h3>
                <ul className="space-y-3">
                  {[
                    "4x4 Land Cruiser transport from Nairobi",
                    "All park entrance fees (e.g., $100+/day for Masai Mara)",
                    "Comfortable tented camp accommodation",
                    "All meals: breakfast, lunch, dinner",
                    "Professional English-speaking safari guide",
                    "Bottled drinking water throughout",
                    "Nairobi hotel/airport pick-up & drop-off",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-1">Total per person from</div>
                  <div className="text-3xl font-bold text-green-700">${minPrice}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-red-600">Self-Planning Costs</h3>
                <ul className="space-y-3">
                  {[
                    "Safari vehicle rental + driver: $150-250/day",
                    "Masai Mara park fees: $100/day + $35 vehicle fee",
                    "Budget accommodation: $50-100/night",
                    "Meals at safari camps: $30-50/day",
                    "Airport transfers and logistics",
                    "Risk of unavailable camps or fully booked parks",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500 text-lg flex-shrink-0">–</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-1">Estimated 3-day minimum cost</div>
                  <div className="text-3xl font-bold text-red-600">$800+</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DYNAMIC TOURS GRID */}
      <div id="tours">
        <BudgetToursClient />
      </div>

      {/* INCLUDED/EXCLUDED */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-8 font-serif text-3xl font-bold flex items-center gap-3">
                <span className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center"><Check className="h-5 w-5" /></span>
                Everything Included
              </h2>
              <ul className="space-y-4">
                {["Professional English-speaking safari guide/driver", "4x4 Land Cruiser transport from Nairobi and between parks", "All park entrance fees and conservation charges", "Comfortable budget tented camp accommodation", "Full-board meals (breakfast, lunch, dinner daily)", "Bottled drinking water throughout the safari", "Nairobi hotel/airport pick-up and drop-off", "All government taxes and levies"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-8 font-serif text-3xl font-bold flex items-center gap-3">
                <span className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">–</span>
                Not Included (Plan Ahead)
              </h2>
              <ul className="space-y-4">
                {["International flights to Nairobi (Jomo Kenyatta International Airport)", "Kenya e-visa ($51 for most nationalities)", "Travel insurance (strongly recommended — from $30)", "Yellow fever vaccination certificate (required if arriving from endemic area)", "Tips for guide and camp staff ($10-20/day combined suggested)", "Alcoholic beverages and soft drinks", "Personal expenses and souvenirs", "Optional activities (balloon safari $450-500, village visits $25-30)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-xl flex-shrink-0">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center font-serif text-4xl font-bold">What Our Safari Guests Say</h2>
          <p className="text-center text-muted-foreground mb-12">Real reviews from travelers who experienced Kenya budget tours</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "David Chen", location: "Singapore", text: "Incredible value for money. JaeTravel organized everything perfectly — from the moment we landed in Nairobi to our final game drive. The tented camp was comfortable, the guide was exceptional, and we saw all Big Five.", rating: 5, tour: "5-Day Masai Mara Budget Safari" },
              { name: "Sarah Johnson", location: "United Kingdom", text: "As a solo traveler, joining a group safari was the best decision. I made friends from around the world and had the most incredible wildlife experiences. The Kenya budget tour format works beautifully.", rating: 5, tour: "6-Day Three-Park Budget Safari" },
              { name: "Michael Thompson", location: "Australia", text: "Best money I&apos;ve ever spent on travel. The Great Migration river crossing was beyond words — millions of wildebeest, crocodiles waiting, the whole drama. And JaeTravel delivered it all at an affordable price.", rating: 5, tour: "4-Day Mara Migration Safari" },
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md">
                <div className="flex mb-3">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
                <p className="text-xs text-green-600 mt-1">Booked: {review.tour}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-serif text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about Kenya budget tours and safaris</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { q: "How much does a budget safari in Kenya cost?", a: `Our Kenya budget safaris start from $${minPrice} per person for entry-level packages including shared transport, tented camp accommodation, park fees, all meals, and professional guiding. Mid-range packages ($800-$1,200) offer upgraded camps or private vehicle options. All tours are all-inclusive with no hidden costs.` },
              { q: "What is the cheapest way to do a safari in Kenya?", a: "The cheapest safaris in Kenya are group joining tours (4-12 travelers sharing a 4x4 vehicle) staying at budget tented camps. Booking 2+ months ahead and choosing green season (March-May or November) can save 20-40%. Our all-inclusive packages from $610 beat self-planning costs, which typically run $800+ for a 3-day trip." },
              { q: "Is Kenya safe for budget travelers?", a: "Kenya's major safari destinations — Masai Mara, Amboseli, Lake Nakuru — are very safe for tourists. We use licensed operators, professional guides, and well-maintained 4x4 vehicles. Safari camps have security personnel. Nairobi has typical urban caution needs, but our packages handle all transport from airport to park and back." },
              { q: "What is the best time for budget safaris in Kenya?", a: "November-March offers the best combination of value and wildlife viewing — prices drop 20-30%, crowds thin out, and birding is excellent with migratory species. June-October is peak season with the highest prices but best wildlife visibility. April-May has the deepest discounts but expect rain and muddy roads." },
              { q: "Can I see the Big Five on a Kenya budget tour?", a: "Yes — all our budget safari packages are designed to spot all Big Five: lion, leopard, elephant, buffalo, and rhino. Masai Mara offers excellent lion and leopard sightings. Lake Nakuru has a protected rhino sanctuary. Amboseli has large elephant herds. Our expert guides are masters at tracking wildlife." },
              { q: "What destinations are covered in Kenya budget tours?", a: "Popular budget safari combinations include: Masai Mara (Big Five, Great Migration), Lake Nakuru (flamingos, rhinos), Amboseli (elephants, Kilimanjaro views), Lake Naivasha (hippos, birding), and Tsavo (remote wildlife). Most packages combine 2-3 parks over 3-7 days for a complete Kenyan experience." },
              { q: "What's the difference between group and private safaris?", a: "Group safaris share a 4x4 Land Cruiser with 4-12 travelers — lower per-person cost (from $610) and social atmosphere, ideal for solo travelers. Private safaris give you a dedicated vehicle and guide — flexibility to set your own schedule but 40-60% more expensive. Both use the same parks, same game drives, same expert guides." },
              { q: "Do budget tented camps have hot water and electricity?", a: "Yes — our carefully vetted budget tented camps offer 24-hour electricity, hot showers, and comfortable beds with quality bedding. Camps are secure, clean, and in prime wildlife locations. Some remote camps may have solar power limitations. We always ensure a minimum standard of comfort for all budget packages." },
              { q: "How far in advance should I book a Kenya budget safari?", a: "For peak season (July-October migration, December-January holidays, Easter), book 2-3 months ahead to secure your preferred dates and package. For green season, 2-4 weeks is often sufficient. Last-minute bookings are possible but availability becomes limited, especially for popular Masai Mara packages." },
              { q: "What should I pack for a Kenya budget safari?", a: "Pack light neutral-colored clothing (khaki, brown, green — avoid white and bright colors), layers for cool morning game drives, binoculars, a camera with 200mm+ zoom, sunscreen SPF 50+, wide-brimmed hat, comfortable walking shoes, personal medications, and a small daypack. Most camps provide bedding, towels, and basic toiletries." },
              { q: "Are Kenya budget tours suitable for families with children?", a: "Yes — children aged 6+ can join most group safari packages. Many families choose private safaris for added flexibility. Children love the tented camp experience, wildlife spotting, and outdoor adventure. Some lodges have age restrictions for game drives, but we have family-friendly options across all destinations." },
              { q: "How do I get from Nairobi to safari parks?", a: "All our Kenya budget safari packages include round-trip 4x4 Land Cruiser transport from Nairobi hotels and airports. Drives: Masai Mara (5-6 hours via Great Rift Valley), Lake Nakuru (2-3 hours), Amboseli (4-5 hours). Transport, park fees, accommodation, and meals are all bundled — no separate costs to budget for." },
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl border border-gray-200" open={i === 0}>
                <summary className="font-bold text-lg text-gray-900 cursor-pointer hover:text-green-600 transition">{faq.q}</summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING STEPS */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold">How to Book Your Kenya Budget Safari</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "1", title: "Browse Packages", desc: "Explore our {totalTours}+ safari packages from $610. Filter by destination, duration, and budget." },
              { step: "2", title: "Contact Us", desc: "Reach out via WhatsApp, email, or our booking form. Our safari experts respond within 2 hours." },
              { step: "3", title: "Customize & Confirm", desc: "We tailor the itinerary to your needs, confirm availability, and send you a detailed quotation." },
              { step: "4", title: "Pay & Travel", desc: "Secure your spot with a deposit. Final balance due before departure. We handle the rest." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-green-700 via-green-800 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 font-serif text-5xl font-bold">Ready for Your Kenya Budget Safari?</h2>
          <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed opacity-90">
            From ${minPrice} per person — all-inclusive wildlife adventures across Kenya&apos;s iconic destinations. No hidden costs, no surprises. Just unforgettable African experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-lg px-10 py-7 font-semibold" asChild>
              <Link href="/contact">Book Your Safari Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-10 py-7" asChild>
              <a href="https://wa.me/254726485228"><Phone className="mr-2 h-5 w-5" />Chat on WhatsApp</a>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <span className="flex items-center gap-2"><Phone size={16} /> +254 726 485 228</span>
            <span className="flex items-center gap-2"><Mail size={16} /> info@jaetravel.co.ke</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Responds within 2 hours</span>
            <span className="flex items-center gap-2"><Shield size={16} /> Best Price Guarantee</span>
          </div>
        </div>
      </section>

      {/* BOTTOM LINKS */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Explore specific Kenya safari destinations</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="sm"><Link href="/budget-masai-mara-safari">Masai Mara Safaris</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/cheap-amboseli-tours">Amboseli Safaris</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/budget-lake-nakuru-safari">Lake Nakuru Safaris</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/group-joining-safaris-kenya">Group Joining Safaris</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/amboseli-safaris">All Amboseli Tours</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/short-safaris">Short Safaris</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}