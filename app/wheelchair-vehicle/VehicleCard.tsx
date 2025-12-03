'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Award, MapPin, Users, Shield, Phone, Calendar, Heart, Zap } from "lucide-react"

// Comprehensive Kenya-focused vehicle data
const vehicles = [
  {
    id: "masai-mara-accessible",
    name: "Masai Mara Accessible 4×4 Land Cruiser – Kenya's #1 Wheelchair Safari Vehicle",
    type: "Premium Kenya Safari Tours",
    capacity: "1 wheelchair user + 5 companions (6 total)",
    features: [
      "German hydraulic lift system (400kg capacity)",
      "Medical-grade Q'Straint 4-point wheelchair restraints",
      "Full pop-up roof - remain seated for 360° Masai Mara game viewing", 
      "Camera hatches at wheelchair eye-level (95-110cm height)",
      "4×4 all-terrain capability for Kenya's rough roads",
      "Raised heavy-duty suspension for Masai Mara terrain",
      "3kW power inverter for medical equipment",
      "Dual-zone climate control with HEPA filtration",
      "Starlink satellite internet for remote Kenya parks",
      "Integrated 45L medical refrigerator",
      "Emergency oxygen and Kenya Red Cross first aid",
      "Professional Kenya wildlife guide included"
    ],
    description: "Kenya's most advanced wheelchair accessible Land Cruiser featuring German-engineered hydraulic lift system, medical-grade wheelchair restraints, and professional Kenya-trained guides. Experience the Great Migration in Masai Mara without accessibility limitations.",
    image: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
    alt: "Wheelchair accessible Land Cruiser with hydraulic lift in Masai Mara Kenya national park",
    price: "$195-350/day",
    bestFor: ["Masai Mara game drives", "Great Migration safaris", "Amboseli elephant viewing", "Tsavo National Park", "Family accessible Kenya safaris", "Photography wildlife tours"],
    certifications: ["Kenya Tourism Board Gold Certified", "ISO 9001:2015 Quality Certified", "Q'Straint Restraint Certified"],
    stats: {
      usersServed: "2,800+",
      satisfaction: "99.2%",
      experience: "8 years Kenya",
      support: "24/7 Kenya"
    },
    coverage: ["Masai Mara Reserve", "Amboseli Park", "Tsavo East & West", "Samburu", "Lake Nakuru", "Aberdare"],
    included: ["Professional Kenya guide", "All Kenya park fees", "Medical equipment power", "Satellite internet", "Kenya emergency support"],
    kenyaSpecific: ["Masai Mara certified", "Kenya Red Cross trained", "Local Kenya operator"]
  },
  {
    id: "nairobi-accessible",
    name: "Nairobi Accessible Land Cruiser – City & Airport Transport",
    type: "Kenya Urban Transport", 
    capacity: "1 wheelchair user + 3 companions (4 total)",
    features: [
      "Side-mounted hydraulic lift system",
      "Q'Straint wheelchair securement",
      "Airport meet-and-greet service",
      "JKIA Nairobi terminal access",
      "City navigation expertise",
      "Climate control system",
      "Luggage capacity for 4 suitcases",
      "English-speaking Kenya driver",
      "Flight delay monitoring",
      "Hotel transfer coordination"
    ],
    description: "Reliable wheelchair accessible Land Cruiser for Nairobi city transport, JKIA airport transfers, and urban exploration. Perfect for business travel, medical appointments, and city tours in Kenya's capital.",
    image: "/wheelchair-accessible-tanzania-safari.webp",
    alt: "Wheelchair accessible Land Cruiser for Nairobi city transport and airport transfers Kenya",
    price: "$120-180/day", 
    bestFor: ["JKIA airport transfers", "Nairobi city tours", "Business meetings", "Medical appointments", "Hotel transfers", "Urban exploration"],
    certifications: ["Kenya Transport Board", "Nairobi County Licensed", "Insurance Certified"],
    stats: {
      usersServed: "1,200+",
      satisfaction: "98.8%", 
      experience: "5 years Nairobi",
      support: "24/7 Nairobi"
    },
    coverage: ["JKIA Airport", "Wilson Airport", "Nairobi CBD", "Westlands", "Karen", "Langata"],
    included: ["Airport meet-greet", "Flight tracking", "Hotel coordination", "City navigation"],
    kenyaSpecific: ["Nairobi certified", "Local traffic expertise", "Kenya airport protocols"]
  },
  {
    id: "premium-kenya-safari",
    name: "Premium Kenya Safari Land Cruiser – Dual Wheelchair Luxury",
    type: "Luxury Kenya Safari Tours", 
    capacity: "2 wheelchair users + 2 companions (4 total)",
    features: [
      "Dual independent hydraulic lift systems",
      "Executive leather seating with extra legroom",
      "Advanced climate control with separate zones",
      "4G LTE WiFi and entertainment system",
      "Accessible restroom with privacy screen",
      "Professional guide station with communications",
      "Onboard refreshment center",
      "Night vision for nocturnal Kenya game viewing",
      "Premium sound system",
      "Conference table setup"
    ],
    description: "Kenya's only dual-wheelchair accessible luxury Land Cruiser featuring individual hydraulic lifts, premium accessibility features, and executive-class comfort for group travel and family safaris across Kenya's premium parks.",
    image: "/waaa.jpg",
    alt: "Luxury wheelchair accessible Land Cruiser with dual wheelchair capacity in Kenya",
    price: "$280-450/day", 
    bestFor: ["Family group Kenya safaris", "Luxury Masai Mara tours", "Corporate accessible travel", "Multi-generational Kenya trips", "Special event transport"],
    certifications: ["Kenya Tourism Board Platinum", "Luxury Travel Advisor Certified", "Executive Transport Certified"],
    stats: {
      usersServed: "850+",
      satisfaction: "99.5%", 
      experience: "6 years Kenya",
      support: "24/7 Kenya"
    },
    coverage: ["Masai Mara Private Conservancies", "Luxury Kenya Lodges", "Wilson Airport", "Premium Nairobi Hotels"],
    included: ["Dual driver team", "Luxury Kenya amenities", "Premium insurance", "Concierge service"],
    kenyaSpecific: ["Kenya luxury certified", "Private conservancy access", "Premium lodge partnerships"]
  }
]

type Vehicle = typeof vehicles[0]

export default function VehicleCard() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Kenya Vehicles', count: vehicles.length },
    { id: 'safari', name: 'Kenya Safari Vehicles', count: vehicles.filter(v => v.type.includes('Safari')).length },
    { id: 'urban', name: 'Nairobi Transport', count: vehicles.filter(v => v.type.includes('Urban')).length },
    { id: 'luxury', name: 'Luxury Kenya', count: vehicles.filter(v => v.type.includes('Luxury')).length }
  ]

  const filteredVehicles = selectedCategory === 'all' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.type.toLowerCase().includes(selectedCategory))

  return (
    <section className="mb-20">
      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8">Our Kenya Accessible Land Cruiser Fleet</h2>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full border transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white border-gray-200 hover:border-primary'
              }`}
            >
              <span className="font-semibold">{category.name}</span>
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-2xl">
            <div className="relative aspect-[16/10]">
              <Image
                src={vehicle.image}
                alt={vehicle.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-110 duration-700"
                priority={vehicle.id === "masai-mara-accessible"}
              />
              
              {/* Badges */}
              <div className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                {vehicle.type}
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-bold backdrop-blur-sm">
                {vehicle.price}
              </div>
              
              {/* Kenya Certifications */}
              {vehicle.kenyaSpecific && (
                <div className="absolute bottom-4 left-4 flex gap-1">
                  {vehicle.kenyaSpecific.slice(0, 2).map((cert, index) => (
                    <div key={index} className="flex items-center gap-1 bg-red-600/90 rounded-full px-2 py-1">
                      <Award className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-white">{cert}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Header */}
              <h3 className="mb-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {vehicle.name}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                {vehicle.capacity}
              </p>
              
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                {vehicle.description}
              </p>

              {/* Stats */}
              {vehicle.stats && (
                <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-primary/5 p-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.usersServed}</div>
                    <div className="text-xs text-muted-foreground">Kenya Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.satisfaction}</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.experience}</div>
                    <div className="text-xs text-muted-foreground">Kenya Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.support}</div>
                    <div className="text-xs text-muted-foreground">Support</div>
                  </div>
                </div>
              )}

              {/* Kenya Coverage Areas */}
              {vehicle.coverage && (
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Kenya Service Coverage:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.coverage.slice(0, 3).map((area, i) => (
                      <span key={i} className="rounded-full bg-blue-50 text-blue-700 px-2 py-1 text-xs">
                        {area}
                      </span>
                    ))}
                    {vehicle.coverage.length > 3 && (
                      <span className="rounded-full bg-gray-100 text-gray-600 px-2 py-1 text-xs">
                        +{vehicle.coverage.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Best For Kenya */}
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Perfect For Kenya:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {vehicle.bestFor.map((use, i) => (
                    <span key={i} className="rounded-full bg-secondary px-2 py-1 text-xs">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  Kenya Key Features:
                </h4>
                <ul className="space-y-2">
                  {vehicle.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {vehicle.features.length > 4 && (
                    <li className="text-sm text-muted-foreground">
                      +{vehicle.features.length - 4} more Kenya features...
                    </li>
                  )}
                </ul>
              </div>

              {/* Included Kenya Services */}
              {vehicle.included && (
                <div className="mb-6 p-3 bg-green-50 rounded-lg">
                  <h4 className="mb-2 font-semibold text-sm text-green-800">Included Kenya Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.included.map((service, i) => (
                      <span key={i} className="rounded-full bg-green-100 text-green-800 px-2 py-1 text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                  <Link href={`/vehicles/${vehicle.id}`} className="flex items-center justify-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Kenya Details
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/book-now?vehicle=${vehicle.id}`} className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Book Kenya
                  </Link>
                </Button>
              </div>

              {/* Kenya Trust Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Kenya Certified Vehicle</span>
                <Heart className="h-3 w-3 ml-2" />
                <span>{vehicle.stats?.satisfaction} Kenya Satisfaction</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🇰🇪</div>
          <h3 className="text-xl font-bold mb-2">No Kenya vehicles found</h3>
          <p className="text-muted-foreground">Try selecting a different category or contact us for custom Kenya solutions</p>
        </div>
      )}
    </section>
  )
}