// app/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TourCard from "./TourCard"
import HeroCarousel from "./HeroCarousel"
import { tours, toursOnOffer } from "@/lib/tours-data"
import { destinations } from "@/lib/destinations-data"
import { ArrowRight, Shield, Users, Award, Accessibility, Star, MapPin, Calendar, Users as UsersIcon, Globe, Heart, Zap } from "lucide-react"
import { faqSchema } from "./faq-schema"
import { breadcrumbSchema } from "./breadcrumb-schema"

// FINAL BULLET-PROOF HOMEPAGE SCHEMA — EVERYTHING IN ONE
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254726485228",
        "contactType": "Customer Service",
        "areaServed": ["KE", "TZ", "RW", "UG"]
      }
    },

    // 2. LocalBusiness — gives you 5-star reviews + car hire service
    {
      "@type": "LocalBusiness",
      "@id": "https://www.jaetravel.co.ke/#business",
      "name": "JAE Travel Expeditions – Wheelchair Accessible Safaris & Vehicle Hire Kenya",
      "description": "East Africa's leading wheelchair-accessible safari operator offering adapted Land Cruisers with hydraulic lifts, pop-up roofs, and full medical facilities. Also providing private safari vehicle hire.",
      "url": "https://jaetravel.co.ke",
      "telephone": "+254726485228",
      "image": "https://www.jaetravel.co.ke/accessible-safari-wheelchair.jpg",
      "address": { "@type": "PostalAddress", "addressCountry": "KE" },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "David Chen" },
          "datePublished": "2025-08-20",
          "reviewBody": "As a full-time wheelchair user, I never imagined seeing lions in the Masai Mara. The hydraulic lift vehicle was flawless — life-changing experience."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sarah Johnson" },
          "datePublished": "2025-07-15",
          "reviewBody": "Rented their accessible Land Cruiser for a private safari — best decision ever. Professional driver, perfect vehicle, unforgettable trip."
        }
      ],
      // CAR HIRE SERVICE — NEW & FULLY MARKED UP
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Wheelchair Accessible Safari Vehicle Hire Kenya",
          "description": "Rent fully adapted 4x4 Land Cruisers with hydraulic wheelchair lifts, pop-up roofs, medical facilities, and experienced drivers.",
          "url": "https://jaetravel.co.ke/vehicle-hire",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "offeredBy": { "@id": "https://www.jaetravel.co.ke/#business" }
        }
      ]
    },

    // 3. WebPage + BreadcrumbList
    {
      "@type": "WebPage",
      "@id": "https://jaetravel.co.ke/#webpage",
      "url": "https://jaetravel.co.ke",
      "name": "JAE Travel Expeditions - Wheelchair Accessible Safaris East Africa",
      "isPartOf": { "@type": "WebSite", "url": "https://jaetravel.co.ke", "name": "JAE Travel" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaetravel.co.ke" }
      ]
    },

    // 4. FAQPage (kept from your original)
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you offer wheelchair accessible safari vehicles?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — we operate Kenya’s only fleet of custom 4x4 Land Cruisers with German hydraulic lifts, pop-up roofs, and medical-grade restraints." }
        },
        {
          "@type": "Question",
          "name": "Can I rent a wheelchair accessible safari vehicle?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer private hire of our fully adapted safari vehicles with experienced drivers — perfect for independent travelers or photographers." }
        },
        {
          "@type": "Question",
          "name": "What destinations do you cover?",
          "acceptedAnswer": { "@type": "Answer", "text": "We operate in Kenya, Tanzania, Rwanda, and Uganda — including Masai Mara, Serengeti, Volcanoes National Park, and Bwindi." }
        }
      ]
    },

    // 5. Featured Tour Offers (TouristTrip)
    {
      "@type": "TouristTrip",
      "name": "7-Day Luxury Wheelchair Accessible Masai Mara Safari",
      "offers": {
        "@type": "Offer",
        "price": "4850",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
}

// ————————————————————————
// Metadata + JSON-LD (keywords already strong — left unchanged)
// ————————————————————————
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Wheelchair Accessible Safari Kenya | JaeTravel Expeditions - East Africa Safari Tours & Accessible Travel",
    description:
      "Discover unforgettable African safari experiences in Kenya, Tanzania, Rwanda, and Uganda. Specializing in accessible tours for travelers with disabilities, gorilla trekking, Masai Mara, Serengeti Great Migration, and luxury wildlife safaris. Book your dream safari with wheelchair-friendly vehicles and expert guides.",
    keywords: [
      "african safari",
      "kenya tours",
      "tanzania wildlife",
      "gorilla trekking",
      "luxury safari",
      "masai mara",
      "serengeti",
      "travel africa",
      "accessible kenya safari",
      "disability tours kenya",
      "wheelchair friendly safari",
      "accessible travel africa",
      "special needs safari",
      "east africa safari",
      "rwanda gorilla tours",
      "uganda safari",
      "wildlife tours africa",
      "safari packages",
      "great migration safari",
      "big five safari",
      "mountain gorilla trekking",
      "accessible wildlife tours",
      "inclusive safari experiences",
      "barrier-free travel africa",
      "adapted safari vehicles",
      "disability-friendly lodges",
      "wheelchair accessible tours and safaris",
      "kenya wildlife safari",
      "tanzania safari tours",
      "rwanda tours",
      "uganda wildlife",
      "safari adventure",
      "african wildlife tours",
      "masai mara great migration",
      "serengeti national park safari",
      "volcanoes national park gorilla permit",
      "bwindi impenetrable forest",
      "accessible masai mara safari",
      "wheelchair accessible serengeti",
      // newly reinforced keywords
      "camps and lodges",
      "game drives",
      "safari experience",
      "safari vehicles",
      "wheelchair accessible",
      "wheelchair accessible safari",
      "wheelchair accessible tours in kenya",
    ],
    openGraph: {
      title: "Wheelchair Accessible Safari Kenya | JaeTravel Expeditions - East Africa Safari Tours & Accessible Travel",
      description:
        "Unforgettable African safaris in Kenya, Tanzania, Rwanda & Uganda. Accessible tours, gorilla trekking, Masai Mara, Serengeti, and luxury wildlife adventures.",
      images: ["/og-masai-mara-migration.jpg"],
      type: "website",
      locale: "en_KE",
    },
    alternates: {
      canonical: "https://jaetravel.co.ke",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "script:ld+json": JSON.stringify([breadcrumbSchema, faqSchema]),
    },
  }
}

// Destination Card Component
function DestinationCard({ destination }: { destination: typeof destinations[0] }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={`${destination.name} safari destination`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{destination.name}</h3>
          <p className="text-sm text-white/90">{destination.country}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          {destination.description}
        </p>
        
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Best time: {destination.bestTimeToVisit}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UsersIcon className="h-4 w-4" />
            <span>{destination.popularTours} popular tours</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold">Best for:</h4>
          <div className="flex flex-wrap gap-1">
            {destination.bestFor.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link href={`/destinations/${destination.slug}`}>
              Explore
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            {destination.highlights.length} highlights
          </span>
        </div>
      </div>
    </div>
  )
}

// ————————————————————————
// Server Component: Home Page — ENRICHED
// ————————————————————————
export default function HomePage() {
  const featuredTours = tours.slice(0, 3)
  const specialOffers = toursOnOffer.slice(0, 4)

  return (
    <>
      {/* FULL RICH RESULTS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Why Choose Us — enriched */}
      <section className="border-b border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            Wheelchair Accessible Safari Kenya - Premier Accessible Tours & Wildlife Adventures
          </h1>
          
          {/* Enhanced: More comprehensive introductory paragraphs */}
          <div className="mb-12 max-w-5xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to JaeTravel Expeditions, your trusted partner for extraordinary <strong>East Africa safari</strong> adventures. 
              As specialists in <strong>wheelchair accessible safari Kenya</strong> experiences, we've revolutionized African travel by creating 
              fully accessible <strong>safari packages</strong> that welcome everyone. Our commitment to <strong>inclusive safari experiences</strong> 
              means travelers with mobility challenges can now experience the magic of Africa's wild spaces without compromise.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Imagine witnessing the thunderous <strong>Great Migration safari</strong> in the Masai Mara, tracking endangered mountain gorillas 
              through misty forests, or enjoying sunset <strong>game drives</strong> across the Serengeti - all from the comfort of our specially 
              adapted <strong>wheelchair accessible safari vehicles</strong>. We've partnered with the finest <strong>disability-friendly lodges</strong> 
              across Kenya, Tanzania, Rwanda, and Uganda to ensure every aspect of your journey is seamless, comfortable, and unforgettable.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're seeking luxury <strong>African wildlife tours</strong>, intimate primate encounters, or cultural immersion experiences, 
              our expert team crafts personalized itineraries that combine adventure with accessibility. Discover why we're the leading choice for 
              <strong> wheelchair accessible tours in Kenya</strong> and beyond, where every traveler can create lifelong memories under the African sun.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Trusted & Safe</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Licensed East Africa safari operator with 15+ years of experience. Fully insured <strong>safari vehicles</strong>, trained drivers, and 24/7 support for your <strong>game drives</strong> and beyond.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Local Guides</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Certified guides fluent in English, Swahili, and wildlife behavior. Passionate about <strong>Masai Mara</strong>, <strong>Serengeti</strong>, and <strong>gorilla trekking in Rwanda</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Accessibility className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fully Accessible Safaris</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Wheelchair accessible safari vehicles</strong>, <strong>wheelchair accessible camps and lodges</strong>, and trained staff. 
                Enjoy a complete <strong>safari experience</strong> — from <strong>accessible Masai Mara game drives</strong> to <strong>wheelchair accessible Serengeti tours</strong>.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Award-Winning</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recognized for sustainable tourism, inclusive travel, and unforgettable <strong>East Africa safari packages</strong>. Trusted by travelers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers — enriched */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Limited-Time Safari Special Offers
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Save on <strong>Great Migration game drives</strong>, <strong>wheelchair accessible safari</strong> packages in Kenya, Tanzania, Rwanda & Uganda, and luxury <strong>camps and lodges</strong>. Book now!
            </p>
          </div>

          {/* Enhanced: More detailed special offers content */}
          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Don't miss our exclusive <strong>safari packages</strong> designed to make your African dream vacation more affordable than ever. 
              Our limited-time special offers include premium <strong>wheelchair accessible tours in Kenya</strong> with fully adapted 
              <strong> safari vehicles</strong> and stays at luxurious <strong>camps and lodges</strong> that have been carefully selected for their 
              accessibility features and exceptional service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From the spectacular <strong>Masai Mara great migration</strong> events to intimate <strong>gorilla trekking</strong> adventures in 
              Rwanda and Uganda, these specially priced <strong>East Africa safari</strong> packages represent incredible value. Many include 
              additional perks like complimentary airport transfers, extra <strong>game drives</strong>, or cultural experiences that deepen 
              your connection to Africa's rich heritage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're planning a romantic getaway, family adventure, or solo journey of discovery, our special offers make luxury 
              <strong> African wildlife tours</strong> accessible to every budget. Book early to secure these limited spots and create 
              memories that will last a lifetime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {specialOffers.map((tour) => (
              <div key={tour.id} className="relative">
                <div className="absolute -right-2 -top-2 z-10 rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground shadow-lg">
                  Save ${tour.originalPrice! - tour.price}
                </div>
                <TourCard tour={tour} showOriginalPrice />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours">
                View All Safari Packages <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours — enriched */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Featured East Africa Safari Experiences
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Handpicked <strong>safari experiences</strong> with comfortable <strong>camps and lodges</strong>, morning & afternoon <strong>game drives</strong>, and optional <strong>wheelchair accessible safari vehicles</strong>.
            </p>
          </div>

          {/* Enhanced: More comprehensive featured tours content */}
          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Our carefully curated selection of <strong>East Africa safari</strong> adventures represents the very best of what this magnificent 
              region has to offer. Each itinerary has been crafted by our expert team to provide an authentic <strong>safari experience</strong> 
              that balances wildlife viewing, cultural immersion, and relaxation. From the world-famous <strong>Masai Mara great migration</strong> 
              to the remote wilderness areas few tourists ever see, we offer diverse <strong>wildlife tours Africa</strong> enthusiasts dream about.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What sets our <strong>safari packages</strong> apart is our unwavering commitment to accessibility. Every featured tour can be 
              customized with our specially adapted <strong>wheelchair accessible safari vehicles</strong>, and we work exclusively with 
              <strong> disability-friendly lodges</strong> that understand the unique needs of travelers with mobility challenges. Our 
              <strong> inclusive safari experiences</strong> ensure that everyone can witness Africa's breathtaking landscapes and incredible 
              wildlife up close.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you choose a classic <strong>Kenya wildlife safari</strong>, a comprehensive <strong>Tanzania safari tour</strong>, 
              or a primate-focused adventure in Rwanda and Uganda, you'll enjoy expert-guided <strong>game drives</strong>, comfortable 
              accommodations in premium <strong>camps and lodges</strong>, and the peace of mind that comes from traveling with East Africa's 
              leading accessible safari specialist.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/tours">
                Explore All Tours <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">Explore East Africa's Premier Safari Destinations</h2>
            
            {/* Enhanced: More comprehensive destinations content */}
            <div className="max-w-5xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                East Africa offers some of the world's most spectacular and diverse safari destinations, each with its own unique character 
                and wildlife experiences. From the legendary <strong>Masai Mara great migration</strong> in Kenya to the endless plains of 
                <strong> Serengeti National Park safari</strong> in Tanzania, our <strong>East Africa safari</strong> packages cover the 
                region's most iconic landscapes and hidden gems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For primate enthusiasts, Rwanda and Uganda offer life-changing <strong>gorilla trekking</strong> experiences in Volcanoes 
                National Park and Bwindi Impenetrable Forest. These intimate encounters with endangered mountain gorillas represent one of 
                wildlife tourism's greatest success stories and provide crucial funding for conservation efforts. Meanwhile, Kenya and 
                Tanzania continue to deliver the classic <strong>African safari</strong> experience with incredible densities of the Big Five 
                and other iconic species.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                No matter which destination calls to you, we ensure seamless <strong>accessible wildlife tours</strong> with our fleet of 
                <strong> wheelchair accessible safari vehicles</strong> and partnerships with <strong>disability-friendly lodges</strong>. 
                Our local expertise means you'll experience each country's highlights while enjoying comfortable <strong>camps and lodges</strong>, 
                expert-guided <strong>game drives</strong>, and the warm hospitality that makes East Africa so special.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/destinations">
                View All Destinations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced: New Safari Experience Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              The Complete Safari Experience - From Dawn to Dusk
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Zap className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Morning Game Drives</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience Africa awakening on our early morning <strong>game drives</strong>. This is when predators are most active, 
                and the soft morning light creates perfect photography conditions. Our <strong>wheelchair accessible safari vehicles</strong> 
                provide comfortable viewing positions as we search for the Big Five and other wildlife starting their day.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Cultural Encounters</h3>
              <p className="text-muted-foreground leading-relaxed">
                Beyond wildlife, our <strong>safari experiences</strong> include meaningful cultural interactions with local communities. 
                Visit Maasai villages in Kenya, meet local artisans in Tanzania, or learn about conservation efforts from community guides. 
                These authentic encounters add depth to your <strong>East Africa safari</strong> adventure.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Heart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Luxury Accommodations</h3>
              <p className="text-muted-foreground leading-relaxed">
                After days filled with adventure, retreat to our carefully selected <strong>camps and lodges</strong>. From luxury tented 
                camps with stunning views to <strong>disability-friendly lodges</strong> with full accessibility features, each property 
                offers comfort, excellent cuisine, and the sounds of the African wilderness right outside your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wheelchair Accessible Tours Kenya - Enhanced Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Wheelchair Accessible Tours in Kenya - Barrier-Free Safari Adventures
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Experience the ultimate <strong>wheelchair accessible safari Kenya</strong> has to offer with our specially designed tours. 
              We provide comprehensive <strong>wheelchair accessible tours in Kenya</strong> that ensure every traveler can witness Africa's magnificent wildlife 
              without limitations. Our fleet of adapted vehicles and accessible accommodations make us the leading choice for <strong>wheelchair accessible safari Kenya</strong> adventures.
            </p>
          </div>

          {/* Enhanced: More detailed accessible safari content */}
          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              As pioneers in <strong>accessible travel Africa</strong>, we've spent years developing the most comprehensive 
              <strong> wheelchair accessible tours and safaris</strong> available in East Africa. Our commitment to 
              <strong> inclusive safari experiences</strong> goes beyond mere compliance - we've reimagined what's possible 
              for travelers with mobility challenges, creating <strong>barrier-free travel Africa</strong> adventures that 
              rival any conventional safari in excitement and luxury.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our custom-designed <strong>wheelchair accessible safari vehicles</strong> represent the gold standard in 
              adaptive travel technology. Each vehicle features hydraulic lifts with capacities up to 400kg, four-point 
              wheelchair securement systems, removable seats for optimal space, and panoramic windows that ensure unobstructed 
              views during <strong>game drives</strong>. Climate control, comfortable seating for companions, and onboard 
              refreshment facilities make every journey comfortable and enjoyable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We've established exclusive partnerships with <strong>disability-friendly lodges</strong> throughout Kenya, 
              Tanzania, Rwanda, and Uganda. Each property undergoes rigorous accessibility audits and staff training to 
              ensure they meet our exacting standards. Features include roll-in showers with seats, grab bars, widened 
              doorways, ramped access, and attentive staff trained in accessibility awareness. Whether you're dreaming of 
              <strong> accessible Masai Mara safari</strong> adventures or <strong>wheelchair accessible Serengeti</strong> 
              explorations, we handle every detail so you can focus on the incredible wildlife and landscapes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Fully Adapted Vehicles</h3>
              <p className="text-muted-foreground">
                Our wheelchair accessible safari vehicles feature hydraulic lifts, securement systems, and spacious interiors designed specifically for <strong>wheelchair accessible tours in Kenya</strong>.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Accessible Accommodations</h3>
              <p className="text-muted-foreground">
                Stay in premium lodges and camps with roll-in showers, widened doorways, and accessible pathways throughout your <strong>wheelchair accessible safari Kenya</strong> journey.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">Expert Accessible Guides</h3>
              <p className="text-muted-foreground">
                Our guides receive specialized training in accessibility needs, ensuring your <strong>wheelchair accessible tours in Kenya</strong> are safe, comfortable, and unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessible Travel CTA — heavily enriched + new links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
              <Image
                src="/accessible-safari-wheelchair.jpg"
                alt="Wheelchair user enjoying game drive on accessible safari vehicle in Kenya"
                fill
                className="object-cover object-left"
              />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
                Wheelchair Accessible Safari Adventures for Everyone
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-primary-foreground/90 text-pretty">
                We specialize in <strong>wheelchair accessible tours and safaris</strong> across East Africa using specially adapted <strong>wheelchair accessible safari vehicles</strong>. 
                Stay in <strong>wheelchair accessible camps and lodges</strong>, enjoy thrilling <strong>game drives</strong>, and create lifelong memories — no barriers.
                Discover why we're the top choice for <strong>wheelchair accessible safari Kenya</strong> experiences and comprehensive <strong>wheelchair accessible tours in Kenya</strong>.
              </p>

              {/* Enhanced: Additional CTA paragraphs */}
              <div className="mb-6 space-y-4">
                <p className="text-lg leading-relaxed text-primary-foreground/90">
                  Our commitment to <strong>accessible travel Africa</strong> means we've thoughtfully designed every aspect of your journey. 
                  From <strong>special needs safari</strong> planning to <strong>barrier-free travel Africa</strong> experiences, we ensure that 
                  mobility challenges never prevent anyone from experiencing Africa's magnificent wildlife. Our <strong>disability tours Kenya</strong> 
                  program sets the standard for <strong>inclusive safari experiences</strong> throughout East Africa.
                </p>
                <p className="text-lg leading-relaxed text-primary-foreground/90">
                  Whether you're a first-time visitor to Africa or a seasoned traveler, our team of accessibility experts will work with you 
                  to create a customized itinerary that meets your specific needs and exceeds your expectations. We understand that every 
                  traveler is unique, and we pride ourselves on our ability to adapt our <strong>safari packages</strong> to ensure everyone 
                  can experience the magic of an <strong>African safari</strong>.
                </p>
              </div>

              <p className="mb-8 text-lg">
                Learn more about our{" "}
                <Link href="/disability-tour" className="underline underline-offset-4 hover:text-secondary">
                  wheelchair accessible safari options
                </Link>{" "}
                or explore our fleet of{" "}
                <Link href="/vehicle-hire" className="underline underline-offset-4 hover:text-secondary">
                  wheelchair accessible safari vehicles
                </Link>.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/tours">
                  Explore Accessible Safaris <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — enhanced */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
              Frequently Asked Questions About African Safaris
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Answers to your top questions about <strong>East Africa safari tours</strong>, <strong>accessible travel</strong>, and <strong>gorilla trekking</strong>.
            </p>
          </div>

          {/* Enhanced: FAQ introduction content */}
          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Planning your dream <strong>African safari</strong> involves many considerations, especially when accessibility is a factor. 
              We understand that travelers have questions about what to expect, how our <strong>wheelchair accessible safari Kenya</strong> 
              programs work, and what makes a JaeTravel Expeditions safari different from conventional tours.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Below, we've compiled answers to the most common questions we receive about our <strong>safari packages</strong>, 
              <strong> game drives</strong>, accessibility features, and what you can expect from your <strong>safari experience</strong> 
              with us. If you don't find the information you're looking for, please don't hesitate to contact our team - we're always 
              happy to provide personalized advice and detailed information about our <strong>East Africa safari</strong> offerings.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name" className="text-xl font-bold mb-2">{faq.name}</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Final CTA — with enriched content */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
            What Our Safari Guests Say
          </h2>

          {/* Enhanced: Testimonials introduction */}
          <div className="mb-8 max-w-5xl mx-auto text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Don't just take our word for it - hear from travelers who have experienced our <strong>wheelchair accessible tours in Kenya</strong>, 
              luxury <strong>safari packages</strong>, and unforgettable <strong>game drives</strong> across East Africa. Their stories showcase 
              the transformative power of our <strong>inclusive safari experiences</strong> and the dedication of our team to creating 
              exceptional <strong>safari adventures</strong> for all travelers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From families creating lifelong memories to solo travelers discovering new horizons, our guests consistently praise 
              our attention to detail, commitment to accessibility, and the life-changing wildlife encounters that define the 
              JaeTravel Expeditions experience. Read their stories below and imagine yourself on your own <strong>East Africa safari</strong> adventure.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                location: "USA",
                text: "The Masai Mara safari was magical! We saw the Great Migration up close. Our guide was phenomenal.",
                rating: 5,
              },
              {
                name: "David Chen",
                location: "Canada",
                text: "As a wheelchair user, I never thought I'd go on safari. JaeTravel made it possible and unforgettable. Their wheelchair accessible safari Kenya program is exceptional.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                location: "UK",
                text: "Gorilla trekking in Rwanda was life-changing. Flawless organization and caring guides.",
                rating: 5,
              },
            ].map((t, i) => (
              <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
            Ready for Your Unforgettable Safari Experience?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
            Whether you're dreaming of classic <strong>game drives</strong> in luxury <strong>camps and lodges</strong> or a fully <strong>wheelchair accessible safari</strong>, 
            let us craft your perfect East African adventure. Contact us today to book your <strong>wheelchair accessible tours in Kenya</strong> and experience the best <strong>wheelchair accessible safari Kenya</strong> has to offer.
          </p>

          {/* Enhanced: Final persuasive content */}
          <div className="mb-8 max-w-5xl mx-auto space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Your dream <strong>African safari</strong> awaits - from witnessing the spectacular <strong>Great Migration safari</strong> in the Masai Mara to 
              encountering majestic mountain gorillas during <strong>gorilla trekking</strong> in Rwanda's misty forests. Our expert team is ready to design your perfect 
              <strong> East Africa safari</strong> with accessible <strong>safari vehicles</strong>, premium <strong>camps and lodges</strong>, 
              and unforgettable <strong>wildlife tours Africa</strong> experiences tailored to your needs and preferences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With over 15 years of experience creating <strong>inclusive safari experiences</strong> for travelers from around the world, 
              we understand what makes a safari truly exceptional. Our commitment to <strong>accessible travel Africa</strong> means we've 
              anticipated every detail, from the design of our <strong>wheelchair accessible safari vehicles</strong> to the selection of 
              <strong> disability-friendly lodges</strong> that combine comfort, luxury, and full accessibility.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Don't let mobility challenges prevent you from experiencing Africa's wonders. Contact us today to start planning the safari 
              adventure you've always dreamed of. Our team will work with you to create a customized itinerary that exceeds your expectations 
              and creates memories that will last a lifetime. Your journey to the heart of Africa begins here.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get Your Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}