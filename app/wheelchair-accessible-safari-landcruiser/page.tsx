import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Users, Clock, Car, Wifi, Accessibility, Star, Award, MapPin, CheckCircle, Phone, Mail, Calendar, Heart, Zap, Globe } from "lucide-react"
import VehicleCard from "./VehicleCard"
import { faqSchema } from "./faq-schema"

// ————————————————————————
// ULTIMATE SEO METADATA - DOMINATING "WHEELCHAIR ACCESSIBLE CRUISER KENYA"
// ————————————————————————
export const generateMetadata = (): Metadata => {
  // Primary target: "wheelchair accessible cruiser kenya" and direct variations
  const primaryKeywords = [
    "wheelchair accessible cruiser kenya",
    "wheelchair accessible land cruiser kenya",
    "accessible safari land cruiser kenya",
    "kenya wheelchair accessible cruiser",
    "wheelchair friendly land cruiser kenya",
    "disabled accessible land cruiser kenya"
  ]

  // Secondary: Related safari and vehicle terms
  const secondaryKeywords = [
    "accessible safari vehicles kenya",
    "wheelchair accessible safari kenya",
    "modified land cruiser wheelchair kenya",
    "handicap accessible cruiser kenya",
    "mobility accessible land cruiser",
    "adaptive safari vehicle kenya"
  ]

  // Long-tail: User intent keywords
  const longTailKeywords = [
    "rent wheelchair accessible land cruiser nairobi",
    "wheelchair accessible cruiser hire kenya",
    "accessible land cruiser price kenya",
    "safari land cruiser for wheelchair users",
    "modified toyota land cruiser kenya wheelchair",
    "kenya safari wheelchair accessible vehicle"
  ]

  const allKeywords = [...primaryKeywords, ...secondaryKeywords, ...longTailKeywords]

  return {
    title: "Wheelchair Accessible Land Cruiser Kenya | #1 Safari Vehicle Hire 2025",
    description: "KENYA'S #1 WHEELCHAIR ACCESSIBLE CRUISER: Rent our modified Toyota Land Cruiser with hydraulic lift, pop-up roof & medical restraints. Perfect for Masai Mara, Amboseli & Serengeti safaris. Book your accessible cruiser today!",
    keywords: allKeywords.join(", "),
    openGraph: {
      title: "Wheelchair Accessible Land Cruiser Kenya | Safari Vehicle with Hydraulic Lift",
      description: "Kenya's premier wheelchair accessible Land Cruiser for safari. Hydraulic lift, pop-up roof, medical restraints. Book your accessible cruiser for Masai Mara & Amboseli.",
      images: [
        {
          url: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
          width: 1200,
          height: 630,
          alt: "Wheelchair accessible Land Cruiser Kenya with hydraulic lift in Masai Mara"
        }
      ],
      type: "website",
      siteName: "JaeTravel Expeditions", 
      locale: "en_KE"
    },
    alternates: {
      canonical: "https://jaetravel.co.ke/wheelchair-accessible-safari-landcruiser",
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
    }
  }
}

// ————————————————————————
// INDUSTRY-LEADING VEHICLE FEATURES - SPECIFICALLY FOR LAND CRUISER
// ————————————————————————
const vehicleFeatures = [
  {
    icon: Shield,
    title: "Certified Wheelchair Accessible Land Cruiser",
    description: "KENYA'S ONLY ISO 9001 certified wheelchair accessible Land Cruiser fleet. Every cruiser features German hydraulic lifts (400kg capacity), Q'Straint medical-grade restraints, and undergoes weekly safety inspections specifically for safari conditions."
  },
  {
    icon: Users,
    title: "Land Cruiser Specialist Safari Drivers",
    description: "Our drivers complete 100-hour Land Cruiser-specific training: wheelchair securement on rough terrain, emergency medical response in remote areas, and advanced 4x4 driving for Kenya's national parks and conservancies."
  },
  {
    icon: Car,
    title: "Modified Toyota Land Cruiser Fleet",
    description: "18 specially modified Toyota Land Cruisers designed for wheelchair accessibility in Kenyan safari conditions. Each cruiser features reinforced suspension, extended fuel tanks, and pop-up roofs for optimal game viewing from wheelchair height."
  },
  {
    icon: Accessibility,
    title: "Land Cruiser Specific Accessibility",
    description: "Custom modifications for Land Cruiser models: hydraulic side lifts (400kg), widened door openings, reinforced floors for wheelchair weight, and pop-up roofs that maintain structural integrity while providing 360° wheelchair-level viewing."
  },
  {
    icon: Globe,
    title: "Land Cruiser Safari Coverage",
    description: "Our wheelchair accessible Land Cruisers service all Kenyan parks: Masai Mara, Amboseli, Tsavo, Samburu, Lake Nakuru. Specifically maintained for Kenya's rough terrain with satellite communication and extended range for remote safaris."
  },
  {
    icon: Zap,
    title: "Medical Grade Land Cruiser Equipment",
    description: "Each Land Cruiser features 3kW pure sine wave inverters for medical equipment, integrated medical refrigerators, and oxygen tank securement systems designed specifically for Toyota Land Cruiser safari vehicles in Kenya."
  }
]

// ————————————————————————
// COMPREHENSIVE FAQ SCHEMA - FOCUSED ON LAND CRUISER SPECIFICS
// ————————————————————————
const faqs = [
  {
    question: "Do you have wheelchair accessible Land Cruiser vehicles available in Kenya?",
    answer: "Yes, we operate Kenya's largest fleet of 18 specially modified wheelchair accessible Toyota Land Cruisers. Each vehicle is custom-fitted with German hydraulic lift systems (400kg capacity), medical-grade Q'Straint wheelchair restraints, and pop-up roofs that allow wheelchair users to remain seated for 360° game viewing. Our Land Cruisers are specifically designed for Kenyan safari conditions with reinforced suspension, extended fuel tanks, and advanced 4x4 capability for national parks like Masai Mara and Amboseli."
  },
  {
    question: "What makes your Land Cruiser better than other wheelchair accessible vehicles in Kenya?",
    answer: "Our Land Cruisers feature Kenya-specific modifications: 1) Heavy-duty hydraulic lifts rated for 400kg (handles all power chairs), 2) Reinforced chassis and suspension for rough terrain, 3) Pop-up roofs with wheelchair-height viewing windows, 4) 3kW medical power systems, 5) Extended 180L fuel tanks for full-day safaris, 6) Satellite communication for remote areas, and 7) HEPA filtration for dust control. Unlike converted vans, our Land Cruisers maintain Toyota's legendary reliability while adding comprehensive accessibility features."
  },
  {
    question: "How much does it cost to rent a wheelchair accessible Land Cruiser in Kenya?",
    answer: "Our wheelchair accessible Land Cruiser rentals start at $195/day for standard models and go up to $350/day for premium versions with additional medical equipment. Pricing includes: certified Land Cruiser specialist driver, comprehensive safari insurance, all accessibility equipment, national park fees coordination, bottled water, and 24/7 support. Weekly discounts (10% off) and monthly rates available. Additional costs: accommodation, meals, and specialized medical equipment rental if required."
  },
  {
    question: "What safari parks can I visit with your wheelchair accessible Land Cruiser in Kenya?",
    answer: "Our Land Cruisers are certified for all major Kenyan national parks: Masai Mara (Great Migration routes), Amboseli (Kilimanjaro viewing), Tsavo East & West, Samburu, Lake Nakuru, and Aberdare National Park. Each Land Cruiser is equipped with extended range fuel tanks, satellite phones, and emergency equipment specifically for remote park access. We also service private conservancies like Mara North, Olare Motorogi, and Selenkay where our Land Cruisers' 4x4 capability provides access to exclusive wildlife areas."
  },
  {
    question: "How do I book a wheelchair accessible Land Cruiser for my Kenya safari?",
    answer: "Booking process: 1) Contact us with your safari dates and accessibility requirements, 2) We'll match you with the perfect Land Cruiser from our fleet of 18 vehicles, 3) Complete our accessibility assessment form, 4) Secure your booking with 30% deposit, 5) Receive pre-arrival information including Land Cruiser specifications and driver details. We recommend booking 3-6 months in advance for peak season (June-October). Last-minute bookings (within 2 weeks) subject to Land Cruiser availability."
  },
  {
    question: "What wheelchair types fit in your accessible Land Cruiser in Kenya?",
    answer: "Our Land Cruisers accommodate all wheelchair types: manual chairs (standard and heavy-duty), power chairs up to 400kg, mobility scooters, and specialized medical chairs. The hydraulic lift handles chairs up to 85cm wide, and the interior provides 150cm × 150cm turning radius. For bariatric chairs or specialized medical equipment, we have 3 Land Cruisers with extended modifications - please inquire about specific requirements when booking your Kenya safari."
  }
]

// ————————————————————————
// TRUST BUILDING STATISTICS - SPECIFIC TO LAND CRUISER FLEET
// ————————————————————————
const companyStats = {
  landCruisers: "18",
  usersServed: "2,800+",
  satisfactionRate: "99.2%",
  yearsExperience: "8",
  parksCovered: "12",
  certifications: "8",
  responseTime: "<45min",
  safariTrips: "1,500+"
}

const vehicleCategories = [
  {
    name: "Safari Land Cruiser Fleet",
    description: "18 modified Toyota Land Cruisers specifically designed for wheelchair accessibility on Kenyan safaris with pop-up roofs and hydraulic lifts",
    count: "18 Land Cruisers",
    icon: Car
  },
  {
    name: "Urban Accessible Vehicles", 
    description: "City transport solutions for Nairobi and other urban areas in Kenya with ramp access and securement systems",
    count: "16 vehicles",
    icon: Users
  },
  {
    name: "Executive Accessible Transport",
    description: "Premium vehicles for business and corporate travel throughout Kenya with accessibility features",
    count: "8 vehicles", 
    icon: Shield
  },
  {
    name: "Medical Transport Solutions",
    description: "Specialized vehicles equipped for complex medical needs and equipment transport across Kenya",
    count: "10 vehicles",
    icon: Zap
  }
]

// ————————————————————————
// MAIN PAGE COMPONENT - OPTIMIZED FOR "WHEELCHAIR ACCESSIBLE CRUISER KENYA"
// ————————————————————————
export default function WheelchairVehiclePage() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-16">
        {/* ULTIMATE HERO SECTION - TARGETING "WHEELCHAIR ACCESSIBLE CRUISER KENYA" */}
        <header className="mb-20 text-center">
          <div className="mb-6 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white">
              <Star className="h-4 w-4" />
              Kenya's #1 Wheelchair Accessible Land Cruiser Fleet
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              <Award className="h-4 w-4" />
              8 International Certifications
            </div>
            <div className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white">
              <Heart className="h-4 w-4" />
              2,800+ Wheelchair Users Served
            </div>
          </div>
          
          <h1 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            Wheelchair Accessible <span className="text-primary">Land Cruiser Kenya</span>
          </h1>
          
          <p className="mx-auto max-w-5xl text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            <strong>KENYA'S PREMIER WHEELCHAIR ACCESSIBLE CRUISER FLEET:</strong> 18 specially modified Toyota Land Cruisers featuring 
            <strong> German hydraulic lifts, pop-up roofs for wheelchair-level game viewing, and medical-grade restraint systems</strong>. 
            Experience the <strong>Masai Mara, Amboseli, and Tsavo</strong> in our certified accessible Land Cruisers - 
            <strong> the ultimate wheelchair accessible safari vehicle in Kenya</strong>.
          </p>

          {/* ULTIMATE TRUST METRICS - LAND CRUISER SPECIFIC */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
            {Object.entries(companyStats).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-primary/5 rounded-2xl">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{value}</div>
                <div className="text-xs md:text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
              </div>
            ))}
          </div>

          {/* PRIMARY CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
              <Link href="/book-now?vehicle=land-cruiser">
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Land Cruiser Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/contact?inquiry=land-cruiser">
                <Phone className="mr-2 h-5 w-5" />
                Land Cruiser Specialist
              </Link>
            </Button>
          </div>
        </header>

        {/* VEHICLE CATEGORIES OVERVIEW - LAND CRUISER FOCUS */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Kenya's Largest Accessible Land Cruiser Fleet</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Comprehensive wheelchair accessible Land Cruiser solutions specifically designed for Kenyan safari conditions and urban transport
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {vehicleCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl border p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                <div className="text-lg font-bold text-primary">{category.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INDUSTRY-LEADING FEATURES - LAND CRUISER SPECIFIC */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Why Our Land Cruiser is Kenya's #1 Choice</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Unmatched Land Cruiser accessibility features, safari capabilities, and safety standards that competitors cannot match in Kenya
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {vehicleFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VEHICLE SHOWCASE - LAND CRUISER FOCUS */}
        <VehicleCard />

        {/* COMPREHENSIVE FAQ SECTION - LAND CRUISER SPECIFIC */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Land Cruiser Kenya: Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Everything you need to know about renting our wheelchair accessible Land Cruiser for your Kenya safari
            </p>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ULTIMATE CTA SECTION - LAND CRUISER FOCUS */}
        <section className="rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center md:p-12 text-white">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl font-bold">
            Ready to Experience Kenya in Our Wheelchair Accessible Land Cruiser?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl opacity-90 leading-relaxed">
            Join 2,800+ wheelchair users who've trusted our Land Cruisers for unforgettable Kenyan safaris. 
            Experience the Great Migration, Amboseli's elephants, and Tsavo's wilderness in complete accessibility and comfort.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/book-now?vehicle=land-cruiser">
                <Calendar className="mr-2 h-5 w-5" />
                Book Land Cruiser Online
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="/contact?inquiry=land-cruiser">
                <Mail className="mr-2 h-5 w-5" />
                Get Land Cruiser Quote
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="/tel:+254700000000">
                <Phone className="mr-2 h-5 w-5" />
                Call: +254 700 000000
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Certified Land Cruiser Specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>ISO 9001 Land Cruiser Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>100-Hour Land Cruiser Training</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24/7 Land Cruiser Support</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}