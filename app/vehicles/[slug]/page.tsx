import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Shield, Users, Car, Phone, Mail, Calendar, MapPin, Star } from "lucide-react"

// All accessible vehicles with rich SEO content
const vehicles = {
  "safari-accessible": {
    name: "Safari Accessible 4×4 Land Cruiser – Wheelchair Adapted",
    type: "Accessible Safari Tours",
    capacity: "1 wheelchair user + up to 5 companions",
    price: "$150 per day (all-inclusive safari rate)",
    image: "/2.jpeg",
    altImage: "Wheelchair-accessible safari vehicle with pop-up roof in Masai Mara, Kenya",
    description: "The only fully wheelchair-accessible safari vehicle in Kenya with hydraulic lift, pop-up roof, and all-terrain capability. Designed specifically for travelers with mobility impairments who want to experience the Big Five without barriers.",
    features: [
      "Hydraulic side lift (supports up to 300 kg)",
      "Full pop-up roof – wheelchair user stays seated during game drives",
      "360° viewing with camera hatches at wheelchair height",
      "4×4 all-terrain capability (Masai Mara, Amboseli, Tsavo, Samburu)",
      "Q'Straint wheelchair restraint system (international safety standard)",
      "Cooler box, charging ports, binoculars included",
      "Experienced driver-guide trained in disability assistance",
      "Raised suspension for smooth ride comfort",
    ],
    included: [
      "Unlimited game drives",
      "Professional accessible-trained guide",
      "Bottled water & snacks",
      "Park entrance fees assistance",
      "24/7 emergency support",
    ],
    seoContent: {
      overview: "Kenya's premier wheelchair accessible safari vehicle designed for barrier-free wildlife viewing in Masai Mara, Amboseli, and other national parks. Experience authentic African safari adventures without accessibility limitations.",
      benefits: [
        "Stay in your wheelchair throughout the entire game drive experience",
        "Hydraulic lift eliminates the need for difficult transfers",
        "Pop-up roof provides unobstructed wildlife viewing at wheelchair height",
        "All-terrain capability accesses remote safari locations safely"
      ],
      safariDestinations: ["Masai Mara National Reserve", "Amboseli National Park", "Tsavo West & East", "Samburu National Reserve", "Lake Nakuru National Park"]
    }
  },
  "premium-accessible": {
    name: "Premium Accessible Safari Van – Luxury Disability Travel",
    type: "Premium Accessible Tours",
    capacity: "2 wheelchair users + 4 passengers",
    price: "$200 per day",
    image: "/vehicles/premium-accessible.jpg",
    altImage: "Luxury accessible safari van with dual wheelchair capacity in Kenya",
    description: "Premium accessible vehicle offering luxury comfort for wheelchair users and their companions on Kenya safari adventures. Spacious interior with advanced accessibility features.",
    features: [
      "Dual hydraulic lifts for multiple wheelchair users",
      "Extra-wide interior for wheelchair maneuverability",
      "Premium leather seating with extra padding",
      "Advanced climate control system",
      "Entertainment system with accessibility controls",
      "Onboard refrigerator for medications",
      "Professional guide trained in disability care"
    ],
    included: [
      "Luxury accommodation coordination",
      "Premium guide services",
      "Comprehensive insurance",
      "24/7 concierge support"
    ],
    seoContent: {
      overview: "Luxury accessible safari transportation for groups and families requiring multiple wheelchair accommodations. Experience premium Kenya safari tours with unparalleled comfort and accessibility.",
      benefits: [
        "Accommodates multiple wheelchair users simultaneously",
        "Premium comfort features for extended safari journeys",
        "Advanced climate control for temperature sensitivity",
        "Luxury amenities for discerning travelers with disabilities"
      ],
      safariDestinations: ["Masai Mara Luxury Camps", "Amboseli Serena", "Samburu Intrepids", "Private Conservancies"]
    }
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = vehicles[params.slug as keyof typeof vehicles]
  
  if (!vehicle) {
    return {
      title: "Accessible Safari Vehicle Not Found | JAE Travel Kenya",
      description: "Page not found for accessible Kenya safari vehicles and wheelchair friendly tours."
    }
  }

  const keywords = [
    "accessible Kenya safari",
    "wheelchair accessible safari Kenya",
    "disabled safari Kenya",
    "mobility impaired safari Kenya",
    "handicap accessible Kenya safari",
    "wheelchair friendly safari Kenya",
    "inclusive safari tours Kenya",
    "adaptive safari Kenya",
    "special needs safari Kenya",
    "Kenya safari for people with disabilities",
    "accessible masai mara tours",
    "wheelchair travel kenya"
  ].join(", ")

  return {
    title: `${vehicle.name} | Accessible Kenya Safari Tours 2025/2026`,
    description: vehicle.description,
    keywords: keywords,
    openGraph: {
      title: `${vehicle.name} | Wheelchair Accessible Safari Kenya`,
      description: vehicle.description,
      images: [vehicle.image],
      type: "website",
    },
    alternates: {
      canonical: `https://www.jaetravel.co.ke/vehicles/${params.slug}`,
    },
    robots: "index, follow",
  }
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = vehicles[params.slug as keyof typeof vehicles]

  if (!vehicle) {
    notFound()
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: vehicle.name,
            description: vehicle.description,
            url: `https://www.jaetravel.co.ke/vehicles/${params.slug}`,
            image: `https://www.jaetravel.co.ke${vehicle.image}`,
            offers: {
              "@type": "Offer",
              price: vehicle.price.replace(/[^0-9]/g, ''),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `https://www.jaetravel.co.ke/book-now?vehicle=${params.slug}`,
            },
            accessibilityFeature: [
              "wheelchairAccessibleVehicle",
              "hydraulicLift",
              "accessibleViewingPlatform",
              "wheelchairFriendlyPath"
            ],
            touristType: "Accessible Tourism",
            areaServed: ["Kenya", "Masai Mara", "Amboseli", "Tsavo", "Samburu"]
          }),
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Back Link */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/vehicles" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Back to All Accessible Vehicles
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <div className="order-2 lg:order-1">
            <Image
              src={vehicle.image}
              alt={vehicle.altImage}
              width={800}
              height={600}
              className="rounded-2xl object-cover w-full shadow-2xl"
              priority
            />
            <p className="text-sm text-muted-foreground text-center mt-4">
              {vehicle.altImage}
            </p>

            {/* SEO-rich content block */}
            <div className="mt-8 bg-muted rounded-2xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-primary">
                Why Choose Our {vehicle.name} for Accessible Kenya Safari?
              </h2>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Vehicle Overview</h3>
                <p className="text-muted-foreground">
                  {vehicle.seoContent.overview}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Key Accessibility Benefits</h3>
                <ul className="space-y-2">
                  {vehicle.seoContent.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Safari Destinations</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.seoContent.safariDestinations.map((destination, index) => (
                    <span key={index} className="inline-flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-sm">
                      <MapPin className="h-3 w-3" />
                      {destination}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 mb-4">
                {vehicle.type}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                {vehicle.name}
              </h1>

              <p className="mt-6 text-xl text-muted-foreground">
                {vehicle.description}
              </p>

              <div className="flex items-center gap-6 mt-8">
                <div className="text-3xl font-bold text-primary">{vehicle.price}</div>
                <div className="text-sm text-muted-foreground">All accessibility features included</div>
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border bg-card p-6">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg">Capacity</h3>
                <p className="text-muted-foreground">{vehicle.capacity}</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg">Safety & Certification</h3>
                <p className="text-muted-foreground">Internationally certified · Fully insured · Trained assistants</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-5">Accessibility Features</h2>
              <ul className="space-y-3">
                {vehicle.features.map((feature, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/book-now?vehicle=${params.slug}`}>
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Accessible Safari
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Custom Quote
                </Link>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>5-Star Disability Service Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Certified Accessible Operator</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions – Accessible Kenya Safari</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can wheelchair users do safari in Kenya?",
                a: "Absolutely! Our specially modified 4x4 vehicles allow wheelchair users to enjoy full game drives while remaining seated in their wheelchair thanks to hydraulic lifts and pop-up roofs designed for optimal wildlife viewing."
              },
              {
                q: "Do you provide assistance transferring into the vehicle?",
                a: "Yes. All our drivers are trained in safe manual handling and transfer techniques. We can also arrange hoists on request for complete accessibility."
              },
              {
                q: "Which parks are best for accessible safari in Kenya?",
                a: "Masai Mara (best for Big Five & Migration), Amboseli (Kilimanjaro views), Lake Nakuru, Tsavo West, and Samburu all have accessible facilities and our vehicles can navigate them comfortably."
              },
              {
                q: "What is included in the safari rate?",
                a: "Our rates include the accessible vehicle, professional guide, all accessibility equipment, basic refreshments, and park entry coordination. Accommodation and meals are arranged separately based on your accessibility needs."
              }
            ].map((item, i) => (
              <div key={i} className="border-b pb-6">
                <h3 className="text-xl font-semibold mb-3">{item.q}</h3>
                <p className="text-muted-foreground text-lg">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center py-12 bg-primary/5 rounded-3xl mt-16">
          <h3 className="text-2xl font-bold mb-4">Ready for Your Accessible Kenya Adventure?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the wild heart of Africa without accessibility barriers.
          </p>
          <Button asChild size="lg">
            <Link href={`/book-now?vehicle=${params.slug}`}>
              <Mail className="mr-2 h-5 w-5" />
              Reserve Your Accessible Safari Today
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}