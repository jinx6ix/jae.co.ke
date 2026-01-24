import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Shield, Users, Car, Phone, Mail, Calendar, MapPin, Star, Heart, Clock, Award, Globe, Battery, Wifi, Utensils, Eye } from "lucide-react"

// Define proper TypeScript interfaces
interface VehicleSpecifications {
  vehicle: string;
  liftCapacity: string;
  dimensions: string;
  rampAngle: string;
  restraint: string;
  suspension: string;
  fuelCapacity: string;
  warranty: string;
}

interface SafariDestination {
  name: string;
  highlights: string;
}

interface VehicleSeoContent {
  overview: string;
  benefits: string[];
  safariDestinations: SafariDestination[];
  accessibilityDetails: {
    transfer: string;
    ramp: string;
    space: string;
    safety: string;
    medical: string;
  };
}

interface Vehicle {
  name: string;
  type: string;
  capacity: string;
  price: string;
  image: string;
  altImage: string;
  description: string;
  specifications: VehicleSpecifications;
  features: string[];
  included: string[];
  seoContent: VehicleSeoContent;
  certifications?: string[];
}

interface Vehicles {
  [key: string]: Vehicle;
}

const vehicles: Vehicles = {
  "safari-accessible": {
    name: "Safari Accessible 4×4 Land Cruiser – Kenya's #1 Wheelchair Adapted Safari Vehicle",
    type: "Premium Accessible Safari Tours",
    capacity: "1 wheelchair user + up to 5 companions (6 total)",
    price: "$195-250 per day (complete safari package available)",
    image: "/2.jpeg",
    altImage: "Wheelchair accessible safari Land Cruiser with hydraulic lift in Masai Mara Kenya",
    description: "Kenya's most advanced wheelchair accessible safari vehicle featuring German-engineered hydraulic lift system, medical-grade wheelchair restraints, and professional disability-trained guides. Experience the Great Migration and Big Five without accessibility limitations.",
    
    // Detailed Specifications
    specifications: {
      vehicle: "Toyota Land Cruiser 4×4 (2023-2024)",
      liftCapacity: "350kg (770lbs) hydraulic lift system",
      dimensions: "Wheelchair space: 120cm × 150cm × 140cm height",
      rampAngle: "8-degree slope for easy access",
      restraint: "Q'Straint 4-point wheelchair restraint system",
      suspension: "Heavy-duty raised suspension with stabilizers",
      fuelCapacity: "180L extended range for full-day safaris",
      warranty: "3-year accessibility equipment warranty"
    },

    // Comprehensive Features
    features: [
      "German-engineered hydraulic side lift (350kg capacity)",
      "Medical-grade Q'Straint 4-point wheelchair restraint system",
      "Full pop-up roof - remain seated in wheelchair for 360° game viewing",
      "Camera hatches at wheelchair eye-level (95-110cm height)",
      "4×4 all-terrain capability with differential lock",
      "Raised heavy-duty suspension for rough terrain comfort",
      "Onboard 2kW power inverter for medical equipment",
      "Dual-zone climate control with HEPA filtration",
      "USB-C charging ports at wheelchair position",
      "Integrated 45L medical refrigerator for medications",
      "Starlink satellite internet for remote areas",
      "Professional Swarovski binoculars provided",
      "Wildlife reference library and birding guides",
      "Emergency first aid kit with disability-specific supplies",
      "Onboard accessible restroom facility (optional)"
    ],

    // What's Included
    included: [
      "Unlimited game drives (sunrise to sunset)",
      "Professional guide (Kenya Silver Level Certified)",
      "Disability awareness trained driver (72 hours training)",
      "All national park entrance fees and conservation charges",
      "Bottled water, soft drinks, and healthy snacks",
      "Emergency medical evacuation insurance",
      "Satellite phone communication",
      "Safari briefing with accessibility orientation",
      "Wildlife checklist and safari journal",
      "24/7 emergency support with response team"
    ],

    // SEO Content Blocks
    seoContent: {
      overview: `As Kenya's premier accessible safari operator since 2018, we've pioneered wheelchair-friendly wildlife experiences that set the industry standard. Our custom-built Land Cruisers represent the pinnacle of accessible safari technology in East Africa, combining rugged 4×4 capability with medical-grade accessibility features. Each vehicle undergoes rigorous monthly safety inspections and our guides complete comprehensive disability awareness training. When you choose us for your accessible Kenya safari, you are selecting the only operator in Kenya that guarantees a seamless, vehicle-based game viewing experience without the need for a transfer. Our vehicles feature patented, integrated wheelchair lift systems that provide safe and dignified access directly into the heart of the action, eliminating the unreliable and often undignified use of portable ramps. This core innovation, combined with our unwavering commitment to safety and expertise, ensures your focus remains entirely on the breathtaking wildlife and creating unforgettable memories, making us the definitive choice for a truly premier accessible Kenya safari.`,

      benefits: [
        "Stay securely in your own wheelchair throughout the entire safari experience - no transfers required",
        "Hydraulic lift system handles power chairs up to 350kg with smooth, quiet operation",
        "Pop-up roof design provides unobstructed wildlife viewing at perfect wheelchair height",
        "All-terrain capability accesses remote locations where other accessible vehicles cannot go",
        "Medical-grade restraint system exceeds international safety standards for rough terrain"
      ],

      safariDestinations: [
        { name: "Masai Mara National Reserve", highlights: "Great Migration (Jul-Oct), Big Five, Hot Air Balloon Safari Accessible" },
        { name: "Amboseli National Park", highlights: "Kilimanjaro Views, Large Elephant Herds, Accessible Observation Hill" },
        { name: "Tsavo East & West National Parks", highlights: "Red Elephants, Mzima Springs, Accessible Lodges" },
        { name: "Samburu National Reserve", highlights: "Special Five, Cultural Visits, Wheelchair-Friendly Trails" },
        { name: "Lake Nakuru National Park", highlights: "Flamingoes, Rhino Sanctuary, Paved Accessible Routes" }
      ],

      accessibilityDetails: {
        transfer: "No transfer required - remain in your wheelchair",
        ramp: "Hydraulic lift with 8-degree slope, handles all wheelchair types",
        space: "Generous 1.2m × 1.5m space with 360° turning radius",
        safety: "Q'Straint system tested to 20G impact standards",
        medical: "Power for CPAP machines, oxygen concentrators, and other equipment"
      }
    },

    // Awards and Certifications
    certifications: [
      "Kenya Tourism Board - Gold Level Accessible Tourism Operator",
      "ISO 9001:2015 Quality Management Certified",
      "Accessible Travel Solutions International Certification",
      "Kenya Red Cross First Aid and Emergency Response",
      "Wildlife Conservation and Anti-Poaching Certified"
    ]
  },

  "premium-accessible": {
    name: "Premium Accessible Safari Van – Dual Wheelchair Luxury Transport",
    type: "Luxury Accessible Group Tours",
    capacity: "2 wheelchair users + 4 companions (6 total)",
    price: "$280-350 per day (group safari package)",
    image: "/11.jpeg",
    altImage: "Luxury accessible safari van with dual wheelchair capacity in Kenya wilderness",
    description: "East Africa's only dual-wheelchair accessible luxury safari vehicle featuring individual hydraulic lifts, premium accessibility features, and executive-class comfort for group travel and family safaris.",
    
    specifications: {
      vehicle: "Mercedes Sprinter 4×4 (2024)",
      liftCapacity: "Dual 300kg hydraulic lifts (600kg total)",
      dimensions: "Two wheelchair spaces: 120cm × 140cm each",
      rampAngle: "7-degree slope with automatic leveling",
      restraint: "Dual Q'Straint systems with independent controls",
      suspension: "Air suspension with kneeling capability",
      fuelCapacity: "120L with auxiliary power unit",
      warranty: "4-year comprehensive warranty"
    },

    features: [
      "Dual independent hydraulic lift systems",
      "Executive leather seating with extra legroom",
      "Advanced climate control with separate zones",
      "4G LTE WiFi and entertainment system",
      "Accessible restroom with privacy screen",
      "Professional guide station with communications",
      "Onboard refreshment center",
      "Night vision and spotlight for nocturnal game viewing"
    ],

    included: [
      "Dual guide team (driver + accessibility specialist)",
      "Luxury accommodation coordination",
      "Premium dining experiences",
      "Comprehensive travel insurance",
      "24/7 concierge service"
    ],

    seoContent: {
      overview: "Designed for groups and families requiring multiple wheelchair accommodations, our premium accessible van offers unparalleled luxury and accessibility. Perfect for multi-generational family safaris and disability group travel throughout Kenya's premier wildlife destinations.",
      benefits: [
        "Accommodates two wheelchair users simultaneously with independent lift systems",
        "Executive-class comfort for extended safari journeys",
        "Advanced accessibility features for complex mobility needs",
        "Professional accessibility specialist on every tour"
      ],
      safariDestinations: [
        { name: "Masai Mara Luxury Conservancies", highlights: "Private reserves with exclusive access" },
        { name: "Amboseli Serena", highlights: "Luxury lodge with accessible amenities" },
        { name: "Samburu Intrepids", highlights: "Premium tented camp with accessibility features" },
        { name: "Private Game Reserves", highlights: "Exclusive wildlife viewing experiences" }
      ],
      accessibilityDetails: {
        transfer: "No transfer required for either wheelchair user",
        ramp: "Dual hydraulic lifts with automatic leveling",
        space: "Two dedicated wheelchair spaces with independent access",
        safety: "Dual Q'Straint systems with individual controls",
        medical: "Enhanced power systems for multiple medical devices"
      }
    },
    certifications: [
      "Kenya Tourism Board - Platinum Level Accessible Operator",
      "Luxury Travel Advisor Certified",
      "International Accessibility Standards Certified"
    ]
  },

   /* -----------------------------------------------------------
     NEW VEHICLE 1 — Safari Land Cruiser (Wheelchair Accessible)
     ----------------------------------------------------------- */
     "safari-land-cruiser": {
      name: "Safari Wheelchair Accessible Land Cruiser – Kenya's #1",
      type: "Premium Safari Land Cruiser",
      capacity: "1 wheelchair user + 5 companions (6 total)",
      price: "$195-350/day",
      image: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
      altImage:
        "Wheelchair accessible Toyota Land Cruiser Kenya with hydraulic lift in Masai Mara national park",
      description:
        "Kenya's premier wheelchair accessible Land Cruiser featuring German-engineered hydraulic lift system, medical-grade wheelchair restraints, and professional disability-trained guides. Experience Masai Mara, Amboseli, and Tsavo in complete accessibility with our certified Toyota Land Cruiser.",
  
      specifications: {
        vehicle: "Toyota Land Cruiser V8 4.5L",
        liftCapacity: "400kg German hydraulic lift",
        dimensions: "Wheelchair station 120cm × 150cm (adjustable height 95–110cm viewing)",
        rampAngle: "Hydraulic vertical lift (0° angle)",
        restraint: "Q'Straint 4-point wheelchair restraints (medical grade)",
        suspension: "Reinforced suspension for African terrain",
        fuelCapacity: "180L extended range",
        warranty: "Certified Toyota modification + Q’Straint certification"
      },
  
      features: [
        "German hydraulic lift system (400kg capacity)",
        "Medical-grade Q'Straint 4-point wheelchair restraints",
        "Full pop-up roof – wheelchair-height game viewing",
        "Camera hatches at wheelchair height (95–110cm)",
        "Toyota Land Cruiser 4×4 with differential lock",
        "Reinforced suspension for rough terrain",
        "3kW power inverter for medical equipment",
        "Dual-zone climate control with HEPA filtration",
        "Starlink satellite internet",
        "Integrated 45L medical refrigerator",
        "Extended 180L fuel tank",
        "Professional safari guide included"
      ],
  
      included: [
        "Professional guide",
        "All park fees",
        "Medical equipment power supply",
        "Satellite internet",
        "Emergency support",
        "Safari equipment"
      ],
  
      seoContent: {
        overview:
          "This advanced wheelchair-adapted Toyota Land Cruiser is engineered for comfort, safety, and rugged 4×4 performance. Ideal for Masai Mara, Amboseli, Tsavo, and private conservancies.",
  
        benefits: [
          "Hydraulic lift supports all power wheelchairs up to 400kg",
          "High-stability reinforced suspension for off-road comfort",
          "Pop-up roof offers perfect wheelchair-height photography",
          "Medical-grade Q’Straint safety restraints",
          "Starlink internet for remote connectivity"
        ],
  
        safariDestinations: [
          { name: "Masai Mara", highlights: "Great Migration, Big Cats" },
          { name: "Amboseli", highlights: "Elephants and Mt. Kilimanjaro views" },
          { name: "Tsavo", highlights: "Red elephants and vast landscapes" },
          { name: "Samburu", highlights: "Unique wildlife species" },
          { name: "Lake Nakuru", highlights: "Flamingoes and rhinos" }
        ],
  
        accessibilityDetails: {
          transfer: "Remain in wheelchair throughout safari",
          ramp: "Hydraulic lift system — no ramp required",
          space: "Large wheelchair bay with secure locking system",
          safety: "Medical-grade Q'Straint 4-point restraint system",
          medical: "3kW inverter supports hospital-grade devices"
        }
      },
  
      certifications: [
        "Toyota Certified Modification",
        "ISO 9001:2015",
        "Q'Straint Restraint Certified",
        "Kenya Safari Certified"
      ]
    },
  
    /* -----------------------------------------------------------
       NEW VEHICLE 2 — Premium Dual Wheelchair Land Cruiser
       ----------------------------------------------------------- */
    "premium-land-cruiser": {
      name: "Premium Accessible Land Cruiser – Dual Wheelchair",
      type: "Luxury Safari Land Cruiser",
      capacity: "2 wheelchair users + 4 companions (6 total)",
      price: "$280-450/day",
      image: "/WhatsApp Image 2025-10-14 at 21.12.12_ac59cc2c.jpg",
      altImage:
        "Dual wheelchair accessible Toyota Land Cruiser Kenya luxury safari vehicle",
      description:
        "East Africa's only dual-wheelchair accessible Land Cruiser featuring individual hydraulic lifts, premium accessibility amenities, and executive-class comfort for families, corporate groups, and luxury travel.",
  
      specifications: {
        vehicle: "Toyota Land Cruiser Premium",
        liftCapacity: "Dual 300kg hydraulic lifts (600kg total)",
        dimensions: "Two wheelchair bays 120cm × 140cm each",
        rampAngle: "Dual hydraulic vertical lifts",
        restraint: "Two independent Q'Straint medical systems",
        suspension: "Luxury reinforced suspension with leveling",
        fuelCapacity: "200L extended range",
        warranty: "Platinum Toyota modification warranty"
      },
  
      features: [
        "Dual independent hydraulic lift systems",
        "Executive leather seating with extra legroom",
        "Advanced climate control with separate zones",
        "4G LTE WiFi + entertainment system",
        "Accessible restroom with privacy screen",
        "Professional guide station with dual communications",
        "Onboard refreshment center",
        "Night vision and spotlight for nocturnal viewing",
        "Premium sound system",
        "Conference table setup"
      ],
  
      included: [
        "Dual driver team",
        "Luxury amenities",
        "Premium insurance",
        "Concierge service"
      ],
  
      seoContent: {
        overview:
          "This premium dual-wheelchair Land Cruiser is designed for ultimate accessibility and luxury, ideal for corporate groups, families, and multi-generational travel across Kenya.",
  
        benefits: [
          "Accommodates two wheelchair users with independent lifts",
          "Ultra-luxury comfort for long-distance safaris",
          "Advanced safety and medical support systems",
          "Executive-class features for premium travel"
        ],
  
        safariDestinations: [
          { name: "Private Conservancies", highlights: "Exclusive wildlife access" },
          { name: "Luxury Amboseli Lodges", highlights: "Premium accommodations" },
          { name: "Samburu Luxury Camps", highlights: "High-end tented safaris" },
          { name: "Executive Airports", highlights: "VIP transfers" }
        ],
  
        accessibilityDetails: {
          transfer: "No transfers — both users remain in their chairs",
          ramp: "Dual hydraulic lifts",
          space: "Two independent wheelchair bays",
          safety: "Dual Q’Straint systems",
          medical: "4kW medical-grade power system"
        }
      },
  
      certifications: [
        "Toyota Platinum Certified",
        "Luxury Travel Certified",
        "Executive Transport Certified"
      ]
    },
  
  
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
      title: "Accessible Safari Vehicle Not Found | Kenya's #1 Wheelchair Friendly Safari",
      description: "Page not found for accessible Kenya safari vehicles. Browse our certified wheelchair accessible safari Land Cruisers and vans for Masai Mara, Amboseli, and more."
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
    "wheelchair travel kenya",
    "kenya disability tours 2025",
    "accessible african safari tours",
    "wheelchair accessible land cruiser kenya",
    "mobility safari equipment kenya",
    "disabled friendly game drives",
    "kenya accessible tourism",
    "barrier free safari africa",
    "special needs travel kenya"
  ].join(", ")

  return {
    title: `${vehicle.name} | Kenya's #1 Accessible Safari Operator 2025/2026`,
    description: `${vehicle.description} Book your barrier-free Masai Mara safari with certified disability specialists. Medical equipment support, trained guides, guaranteed accessibility.`,
    keywords: keywords,
    openGraph: {
      title: `${vehicle.name} | Award-Winning Accessible Kenya Safari`,
      description: vehicle.description,
      images: [vehicle.image],
      type: "website",
      siteName: "JaeTravel Expeditions"
    },
    alternates: {
      canonical: `https://www.jaetravel.co.ke/vehicles/${params.slug}`,
      languages: {
        'en': `https://www.jaetravel.co.ke/vehicles/${params.slug}`,           // Main English/global
        'en-US': `https://www.jaetravel.co.ke/vehicles/${params.slug}`,       // US
        'en-GB': `https://www.jaetravel.co.ke/vehicles/${params.slug}`,       // UK (optional)
        'en-AU': `https://www.jaetravel.co.ke/vehicles/${params.slug}`,       // Australia (optional)
        'en-CA': `https://www.jaetravel.co.ke/vehicles/${params.slug}`,       // Canada (optional)
        'x-default': `https://www.jaetravel.co.ke/vehicles/${params.slug}`,   // Fallback
      },
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
    verification: {
      google: 'KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg',
    }
  }
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = vehicles[params.slug as keyof typeof vehicles]

  if (!vehicle) {
    notFound()
  }

  return (
    <>
      {/* Comprehensive Structured Data */}
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
            address: {
              "@type": "PostalAddress",
              addressCountry: "Kenya",
              addressRegion: "Nairobi"
            },
            offers: {
              "@type": "Offer",
              price: vehicle.price.replace(/[^0-9]/g, ''),
              priceCurrency: "USD",
              priceValidUntil: "2025-12-31",
              availability: "https://schema.org/InStock",
              url: `https://www.jaetravel.co.ke/book-now?vehicle=${params.slug}`,
            },
            accessibilityFeature: [
              "wheelchairAccessible",
              "hydraulicLift",
              "accessibleViewingPlatform",
              "wheelchairFriendlyPath",
              "accessibleRestroom",
              "assistiveListeningSystem",
              "tactilePathway",
              "signLanguageGuideAvailable"
            ],
            accessibilityHazard: "none",
            touristType: [
              "Accessible Tourism",
              "Wheelchair Users",
              "Mobility Impaired",
              "Senior Travelers",
              "Family with Disabled Members"
            ],
            areaServed: ["Kenya", "Tanzania", "East Africa"],
            award: "Kenya Tourism Board Gold Level Accessible Operator 2024",
            provider: {
              "@type": "Organization",
              name: "JaeTravel Expeditions",
              description: "Kenya's leading accessible safari operator specializing in wheelchair friendly wildlife experiences"
            }
          }),
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Enhanced Back Link */}
        <Button asChild variant="ghost" className="mb-8 group">
          <Link href="/vehicle-hire" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to All Accessible Safari Vehicles
          </Link>
        </Button>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Enhanced Image & Content Section */}
          <div className="space-y-8">
            <div className="relative">
              <Image
                src={vehicle.image}
                alt={vehicle.altImage}
                width={800}
                height={600}
                className="rounded-2xl object-cover w-full shadow-2xl"
                priority
              />
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Kenya's #1 Accessible Safari Vehicle
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white rounded-2xl border p-6 space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Award className="h-6 w-6" />
                Technical Specifications & Certifications
              </h2>
              
              <dl className="grid md:grid-cols-2 gap-4">
                {Object.entries(vehicle.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <dt className="font-semibold text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
                    <dd className="text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Certifications */}
              {vehicle.certifications && (
                <div className="pt-4">
                  <h3 className="font-bold mb-3">Certifications & Awards</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.certifications.map((cert: string, index: number) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        <Award className="h-3 w-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Comprehensive SEO Content */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 space-y-6">
              <h2 className="text-3xl font-bold text-primary">Why We're Kenya's #1 Choice for Accessible Safaris</h2>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Industry-Leading Expertise</h3>
                <p className="text-lg leading-relaxed">
                  {vehicle.seoContent.overview}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Unmatched Accessibility Benefits</h3>
                <ul className="space-y-3">
                  {vehicle.seoContent.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safari Destinations with Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Premium Safari Destinations</h3>
                <div className="grid gap-4">
                  {vehicle.seoContent.safariDestinations.map((destination: SafariDestination, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-xl border">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-500" />
                        {destination.name}
                      </h4>
                      <p className="text-muted-foreground mt-1">{destination.highlights}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-block rounded-full bg-green-600 text-white px-4 py-2 text-sm font-semibold">
                  {vehicle.type}
                </span>
                <span className="inline-block rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-semibold">
                  Certified Accessible Operator
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {vehicle.name}
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {vehicle.description}
              </p>

              {/* Enhanced Pricing */}
              <div className="bg-primary/5 rounded-2xl p-6">
                <div className="flex items-baseline gap-4">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{vehicle.price}</div>
                  <div className="text-sm text-muted-foreground">
                    Complete accessibility package<br />
                    Medical equipment support included
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
                  <Clock className="h-4 w-4" />
                  <span>Flexible booking - Free cancellation up to 30 days</span>
                </div>
              </div>
            </div>

            {/* Enhanced Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border bg-card p-6">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Capacity & Comfort</h3>
                <p className="text-muted-foreground">{vehicle.capacity}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Individual climate control
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Premium comfort seating
                  </li>
                </ul>
              </div>
              
              <div className="rounded-2xl border bg-card p-6">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Safety & Certification</h3>
                <p className="text-muted-foreground">International safety standards exceeded</p>
                <ul className="mt-3 space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Q'Straint certified restraints
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    24/7 emergency support
                  </li>
                </ul>
              </div>
            </div>

            {/* Enhanced Features */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-500" />
                <h2 className="text-3xl font-bold">Premium Accessibility Features</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {vehicle.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                Everything Included in Your Safari
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {vehicle.included.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="space-y-6">
              <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-3">Ready for Your Life-Changing Safari?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Join over 2,500 wheelchair users who've experienced Africa with us since 2018
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                    <Link href={`/book-now?vehicle=${params.slug}`}>
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Your Accessible Safari
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                    <Link href="/contact">
                      <Phone className="mr-2 h-5 w-5" />
                      Speak with Accessibility Specialist
                    </Link>
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-6 mt-6 text-sm opacity-80">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-300" />
                    <span>4.9/5 Rating from 387 Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Kenya Tourism Board Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive FAQ Section */}
        <section className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Accessible Safari Kenya: Your Questions Answered</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            We've helped thousands of travelers with disabilities experience Africa. Here's everything you need to know.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                {
                  q: "What types of wheelchairs can your vehicles accommodate?",
                  a: "We accommodate all types of wheelchairs including manual chairs, power chairs (up to 350kg), and scooters. Our hydraulic lift system handles chairs up to 32 inches wide. For oversized medical chairs, we recommend contacting us in advance for custom arrangements."
                },
                {
                  q: "Do you provide medical equipment support?",
                  a: "Yes, we provide power inverters for CPAP machines, oxygen concentrators, and other medical devices. Our vehicles have dedicated 2kW power systems and we can arrange for medical equipment rental through our partners. All our guides are trained in basic medical emergency response."
                },
                {
                  q: "How accessible are the lodges and camps you work with?",
                  a: "We exclusively partner with lodges that meet international accessibility standards: roll-in showers, grab bars, accessible pathways, and trained staff. Each property undergoes our rigorous 25-point accessibility audit before we recommend them to our clients."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{item.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: "What is your experience with specific disabilities?",
                  a: "Our team has extensive experience with spinal cord injuries, multiple sclerosis, cerebral palsy, muscular dystrophy, and age-related mobility issues. We've successfully hosted travelers with ventilators, feeding tubes, and complex medical needs. Our guides complete 72 hours of disability awareness training annually."
                },
                {
                  q: "Can you accommodate severe allergies or dietary restrictions?",
                  a: "Absolutely. We maintain detailed dietary profiles for all guests and coordinate with lodges for specialized meals. Our vehicles are equipped with epinephrine auto-injectors and our guides are trained in anaphylaxis response. We can also accommodate halal, kosher, and other religious dietary requirements."
                },
                {
                  q: "What happens in case of a medical emergency during safari?",
                  a: "All our vehicles carry comprehensive first aid kits, satellite phones, and we have 24/7 access to medical evacuation services. We maintain relationships with hospitals in Nairobi that have international standards and disability expertise. Every safari includes emergency medical evacuation insurance."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white border rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{item.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Trust Building Section */}
        <div className="text-center py-16 bg-gradient-to-br from-green-50 to-blue-100 rounded-3xl mt-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">Join Thousands of Satisfied Travelers</h3>
            <p className="text-xl mb-8 text-muted-foreground">
              "The first safari company that truly understands accessibility. Life-changing experience!" - Sarah M., Wheelchair User
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {[
                { number: "2,500+", label: "Wheelchair Users Served" },
                { number: "98%", label: "Customer Satisfaction" },
                { number: "12", label: "Years Experience" },
                { number: "24/7", label: "Support Available" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Link href={`/book-now?vehicle=${params.slug}`}>
                <Mail className="mr-2 h-5 w-5" />
                Start Planning Your Accessible Safari Today
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}