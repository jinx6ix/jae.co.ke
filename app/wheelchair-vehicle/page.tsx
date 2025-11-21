import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Users, Clock, Car, Wifi, Accessibility, Star, Award, MapPin, CheckCircle, Phone, Mail, Calendar, Heart, Zap, Globe } from "lucide-react"
import VehicleCard from "./VehicleCard"
import { faqSchema } from "./faq-schema"

// ————————————————————————
// Ultimate SEO Metadata - Dominating 50+ Keywords
// ————————————————————————
export const generateMetadata = (): Metadata => {
  const primaryKeywords = [
    "wheelchair accessible landcruiser kenya",
    "wheelchair accessible safari land cruiser kenya",
    "wheelchair accessible cruiser kenya",
    "accessible safari vehicles kenya",
    "wheelchair friendly land cruiser nairobi",
    "disabled transport kenya safari",
    "wheelchair accessible vehicle rental kenya"
  ]

  const secondaryKeywords = [
    "masai mara wheelchair safari",
    "amboseli accessible vehicles",
    "nairobi wheelchair transport",
    "kenya disability travel",
    "accessible safari tours kenya",
    "wheelchair lift land cruiser",
    "kenya accessible tourism"
  ]

  const longTailKeywords = [
    "rent wheelchair accessible land cruiser nairobi",
    "safari vehicle for wheelchair users masai mara",
    "wheelchair accessible taxi nairobi prices",
    "modified land cruiser for disabled kenya",
    "accessible transport services kenya disability",
    "kenya safari wheelchair user price",
    "wheelchair friendly game drives kenya"
  ]

  const allKeywords = [...primaryKeywords, ...secondaryKeywords, ...longTailKeywords]

  return {
    title: "Wheelchair Accessible Land Cruiser Kenya | Safari Vehicles & Rentals 2025",
    description: "KENYA'S #1 WHEELCHAIR ACCESSIBLE LAND CRUISER FLEET: 18 certified safari vehicles with hydraulic lifts & medical equipment. Rent accessible safari Land Cruisers for Masai Mara, Amboseli & Tsavo. 24/7 support, disability-trained drivers, guaranteed accessibility.",
    keywords: allKeywords.join(", "),
    openGraph: {
      title: "Kenya's #1 Wheelchair Accessible Land Cruiser Fleet | Safari Vehicles 2025",
      description: "Kenya's largest accessible Land Cruiser fleet: hydraulic lifts, Q'Straint restraints, disability-trained drivers. Safari vehicles for Masai Mara, Amboseli, Tsavo & Nairobi transport.",
      images: [
        {
          url: "/wheelchair-accessible-land-cruiser-kenya.jpg",
          width: 1200,
          height: 630,
          alt: "Wheelchair accessible Land Cruiser with hydraulic lift in Masai Mara Kenya"
        }
      ],
      type: "website",
      siteName: "JAE Travel - Kenya's #1 Accessible Safari Company",
      locale: "en_KE"
    },
    alternates: {
      canonical: "https://www.jaetravel.co.ke/wheelchair-vehicle",
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

// ————————————————————————
// Industry-Leading Vehicle Features - Unmatched in Kenya
// ————————————————————————
const vehicleFeatures = [
  {
    icon: Shield,
    title: "Kenya Tourism Board Gold Certified & Fully Insured",
    description: "ALL vehicles certified by Kenya Tourism Board with ISO 9001:2015 standards. Q'Straint medical-grade restraint systems (20G impact tested), emergency oxygen tanks, and weekly Kenya Government safety inspections. Full comprehensive insurance covering disability equipment."
  },
  {
    icon: Users,
    title: "Kenya Disability Specialist Trained Drivers",
    description: "COMPREHENSIVE 100-hour Kenya-specific training: wheelchair securement (Q'Straint certified), CPR/first aid with Kenya Red Cross, disability awareness, and emergency medical response. All drivers background-checked with 5+ years Kenya safari experience."
  },
  {
    icon: Clock,
    title: "24/7 Emergency Support Across Kenya",
    description: "INSTANT response teams across Kenya with satellite communication, medical evacuation coordination with Flying Doctors Society. Average response time: 45 minutes Nairobi, 2 hours remote areas. Partnership with Kenya Red Cross."
  },
  {
    icon: Car,
    title: "Largest Certified Accessible Land Cruiser Fleet in Kenya",
    description: "18 SAFARI LAND CRUISERS specifically modified for Kenya's terrain including Masai Mara, Amboseli, and Tsavo. All maintained to manufacturer specifications with 3-month service intervals and real-time GPS tracking across Kenya."
  },
  {
    icon: Wifi,
    title: "Medical Grade Connectivity for Kenya Safaris",
    description: "STARLINK satellite internet for remote Kenya parks, 5G LTE backup in urban areas, 3kW pure sine wave inverters for medical equipment. Dedicated USB-C medical charging stations at each wheelchair position."
  },
  {
    icon: Accessibility,
    title: "Full International Accessibility Compliance for Kenya",
    description: "GERMAN-ENGINEERED hydraulic lifts (400kg capacity), ADA-compliant ramps, 150cm×150cm turning radius, Q'Straint restraints. Accommodates all mobility devices including bariatric chairs specifically tested for Kenya roads."
  }
]

// ————————————————————————
// Comprehensive FAQ Schema - Kenya Specific
// ————————————————————————
const faqs = [
  {
    question: "What types of wheelchair accessible Land Cruisers are available for safari in Kenya?",
    answer: "We offer Kenya's most comprehensive accessible Land Cruiser fleet: 12 Standard Safari Accessible Land Cruisers with pop-up roofs for Masai Mara game viewing, 6 Premium Safari Land Cruisers with enhanced medical features for Amboseli and Tsavo, all featuring German hydraulic lifts (400kg capacity), Q'Straint restraint systems, and maintained to international accessibility standards. All vehicles are 4×4 equipped for Kenya's rough terrain including Masai Mara, Amboseli, and Tsavo national parks."
  },
  {
    question: "How much does it cost to rent a wheelchair accessible Land Cruiser in Nairobi, Kenya?",
    answer: "Pricing for our Kenya accessible Land Cruisers starts from $150/day for standard models up to $350/day for premium safari vehicles. Nairobi city transport: $120-180/day, Masai Mara safari vehicles: $150-350/day. All Kenya rates include: certified driver, comprehensive insurance, 24/7 support in Kenya, accessibility equipment usage, and Kenya park entry coordination. Long-term discounts: 10% off weekly rentals, 15% off monthly contracts specifically for Kenya safaris."
  },
  {
    question: "What accessibility features do your safari Land Cruisers have for Masai Mara?",
    answer: "Our Kenya safari Land Cruisers feature: 1) German hydraulic side lifts (400kg capacity), 2) Full pop-up roofs allowing wheelchair users to remain seated for 360° game viewing in Masai Mara, 3) Camera hatches at wheelchair eye-level, 4) Medical-grade Q'Straint 4-point restraint systems, 5) 3kW power inverters for medical equipment, 6) Raised heavy-duty suspension for Kenya's rough terrain, and 7) HEPA filtration systems. Designed specifically for Masai Mara, Amboseli, and Tsavo national park conditions in Kenya."
  },
  {
    question: "How far in advance should I book accessible Land Cruiser for my Kenya safari?",
    answer: "For Kenya peak seasons (June-October Great Migration in Masai Mara, December-March dry season), we recommend booking 4-6 months in advance. Safari Land Cruisers are particularly high-demand for Masai Mara. Last-minute bookings (within 2 weeks) have limited availability. We maintain 2 emergency safari vehicles for last-minute medical travel requirements in Kenya."
  },
  {
    question: "Are your drivers trained for wheelchair users on Kenya safaris?",
    answer: "Yes, all our Kenya drivers complete comprehensive 100-hour Disability Specialist Training: 40 hours wheelchair securement (Q'Straint certified), 20 hours disability awareness, 16 hours emergency medical response with Kenya Red Cross, 12 hours cultural sensitivity for Kenya tourism, and specific training for Masai Mara, Amboseli, and Tsavo conditions. Average driver experience: 7 years in accessible Kenya transport."
  },
  {
    question: "What areas in Kenya do your accessible Land Cruisers service?",
    answer: "COMPREHENSIVE Kenya coverage: Nairobi, Mombasa, Kisumu, Nakuru and all national parks including Masai Mara, Amboseli, Tsavo East & West, Samburu, Lake Nakuru, and Aberdare. Remote Kenya access: 4×4 vehicles equipped for rough terrain, satellite communication for areas without signal. Airport services: JKIA Nairobi, Wilson, Mombasa with meet-and-greet service."
  }
]

// ————————————————————————
// Trust Building Statistics - Kenya Focused
// ————————————————————————
const companyStats = {
  totalLandCruisers: "18",
  kenyaUsersServed: "12,500+",
  satisfactionRate: "98.7%",
  yearsKenya: "13",
  responseTime: "<45min",
  kenyaParks: "12",
  certifications: "8",
  successfulSafaris: "2,800+"
}

const vehicleCategories = [
  {
    name: "Masai Mara Safari Land Cruisers",
    description: "4×4 Land Cruisers specifically modified for wheelchair users exploring Masai Mara, Amboseli and Kenya national parks",
    count: "12 vehicles",
    icon: Globe
  },
  {
    name: "Nairobi Accessible Transport", 
    description: "City Land Cruisers and vans for daily transport, airport transfers, and urban exploration in Nairobi",
    count: "6 vehicles",
    icon: Car
  }
]

// ————————————————————————
// Customer Testimonials - Real Kenya Experiences
// ————————————————————————
const testimonials = [
  {
    name: "Sarah Johnson",
    location: "London, UK",
    text: "Our wheelchair accessible Land Cruiser in Masai Mara was exceptional. The hydraulic lift worked perfectly and our driver James was incredibly knowledgeable about both wildlife and accessibility needs.",
    rating: 5
  },
  {
    name: "Michael Chen",
    location: "Nairobi, Kenya", 
    text: "As a local with mobility needs, I've used their Nairobi service multiple times. Reliable, professional, and the only company in Kenya with properly certified accessible vehicles.",
    rating: 5
  }
]

// ————————————————————————
// Main Page Component - Kenya Focused SEO
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
        {/* Ultimate Hero Section - Kenya Keyword Rich */}
        <header className="mb-20 text-center">
          <div className="mb-6 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white">
              <Star className="h-4 w-4" />
              Kenya's #1 Accessible Land Cruiser Fleet Since 2012
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              <Award className="h-4 w-4" />
              Kenya Tourism Board Gold Certified
            </div>
            <div className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white">
              <Heart className="h-4 w-4" />
              12,500+ Kenya Wheelchair Users Served
            </div>
          </div>
          
          <h1 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            Wheelchair Accessible Land Cruiser <span className="text-primary">Kenya</span>
          </h1>
          
          <p className="mx-auto max-w-5xl text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            <strong>KENYA'S LARGEST CERTIFIED LAND CRUISER FLEET:</strong> 18 wheelchair accessible safari vehicles featuring 
            <strong> German hydraulic lifts, medical-grade restraints, and Kenya-trained drivers</strong>. 
            Experience <strong>Masai Mara game drives</strong>, <strong>Amboseli elephant viewing</strong>, and <strong>Nairobi city transport</strong> - 
            guaranteed accessibility across Kenya with 24/7 emergency support.
          </p>

          {/* Ultimate Trust Metrics */}
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

          {/* Primary CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
              <Link href="/book-now">
                <Calendar className="mr-2 h-5 w-5" />
                Book Kenya Land Cruiser Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Speak to Kenya Specialist
              </Link>
            </Button>
          </div>
        </header>

        {/* Vehicle Categories Overview */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Kenya Accessible Land Cruiser Categories</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Comprehensive solutions for wheelchair accessible transport across Kenya's national parks and cities
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
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

        {/* Customer Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Real Kenya Experiences</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Hear from wheelchair users who've experienced Kenya with our accessible Land Cruisers
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl border p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                  <MapPin className="h-4 w-4 text-red-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry-Leading Features */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Why We're Kenya's #1 Choice</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Unmatched accessibility features, Kenya-specific safety standards, and service quality
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

        {/* Vehicle Showcase - Kenya Focused */}
        <VehicleCard />

        {/* Comprehensive FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Kenya Accessible Land Cruiser FAQs
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Everything you need to know about renting wheelchair accessible Land Cruisers in Kenya
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

        {/* Ultimate CTA Section */}
        <section className="rounded-2xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-center md:p-12 text-white">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl font-bold">
            Ready to Experience Kenya in an Accessible Land Cruiser?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl opacity-90 leading-relaxed">
            Join 12,500+ satisfied wheelchair users who've trusted us for accessible safaris in Masai Mara, 
            Amboseli, and transport across Kenya. Get instant pricing, custom Kenya safari quotes, or speak with 
            our certified accessibility specialists today.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/book-now">
                <Calendar className="mr-2 h-5 w-5" />
                Book Kenya Safari Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Get Kenya Quote
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
              <Link href="/tel:+254726485228">
                <Phone className="mr-2 h-5 w-5" />
                Call Kenya: +254 726 485 228
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Kenya Tourism Board Gold Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>ISO 9001:2015 Quality Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Kenya-Trained Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>24/7 Kenya Support</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}