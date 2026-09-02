'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Award, MapPin, Users, Shield, Phone, Calendar, Heart, Zap, Car } from "lucide-react"

// COMPREHENSIVE VEHICLE DATA - LAND CRUISER FOCUS
const vehicles = [
  {
    id: "safari-land-cruiser",
    name: "Safari Wheelchair Accessible Land Cruiser – Kenya's #1",
    type: "Premium Safari Land Cruiser",
    capacity: "1 wheelchair user + 5 companions (6 total)",
    features: [
      "German hydraulic lift system (400kg capacity)",
      "Medical-grade Q'Straint 4-point wheelchair restraints", 
      "Full pop-up roof - wheelchair level game viewing",
      "Camera hatches at wheelchair eye-level (95-110cm)",
      "Toyota Land Cruiser 4×4 with differential lock",
      "Reinforced suspension for Kenyan terrain",
      "3kW power inverter for medical equipment",
      "Dual-zone climate control with HEPA filtration",
      "Starlink satellite internet for remote areas",
      "Integrated 45L medical refrigerator",
      "Extended 180L fuel tank for full-day safaris",
      "Professional safari guide included"
    ],
    description: "Kenya's premier wheelchair accessible Land Cruiser featuring German-engineered hydraulic lift system, medical-grade wheelchair restraints, and professional disability-trained guides. Experience Masai Mara, Amboseli, and Tsavo in complete accessibility with our certified Toyota Land Cruiser.",
    image: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
    alt: "Wheelchair accessible Toyota Land Cruiser Kenya with hydraulic lift in Masai Mara national park",
    price: "$195-350/day",
    bestFor: ["Masai Mara Great Migration", "Amboseli elephant viewing", "Tsavo National Park", "Samburu wildlife", "Lake Nakuru flamingoes", "Photography safaris"],
    certifications: ["Toyota Certified Modification", "ISO 9001:2015", "Q'Straint Restraint Certified", "Kenya Safari Certified"],
    stats: {
      usersServed: "2,800+",
      satisfaction: "99.2%",
      experience: "8 years",
      support: "24/7"
    },
    coverage: ["Masai Mara", "Amboseli", "Tsavo", "Samburu", "Lake Nakuru", "Private Conservancies"],
    included: ["Professional guide", "All park fees", "Medical equipment power", "Satellite internet", "Emergency support", "Safari equipment"],
    specifications: {
      vehicle: "Toyota Land Cruiser V8 4.5L",
      lift: "German hydraulic 400kg",
      viewing: "Pop-up roof wheelchair height",
      power: "3kW medical inverter",
      fuel: "180L extended range",
      communication: "Starlink satellite"
    }
  },
  {
    id: "premium-land-cruiser",
    name: "Premium Accessible Land Cruiser – Dual Wheelchair",
    type: "Luxury Safari Land Cruiser", 
    capacity: "2 wheelchair users + 4 companions (6 total)",
    features: [
      "Dual independent hydraulic lift systems",
      "Executive leather seating with extra legroom",
      "Advanced climate control with separate zones",
      "4G LTE WiFi and entertainment system",
      "Accessible restroom with privacy screen",
      "Professional guide station with communications",
      "Onboard refreshment center",
      "Night vision and spotlight for nocturnal viewing",
      "Premium sound system",
      "Conference table setup"
    ],
    description: "East Africa's only dual-wheelchair accessible Land Cruiser featuring individual hydraulic lifts, premium accessibility features, and executive-class comfort for group travel and family safaris across Kenya.",
    image: "/WhatsApp Image 2025-10-14 at 21.12.12_ac59cc2c.jpg",
    alt: "Dual wheelchair accessible Toyota Land Cruiser Kenya luxury safari vehicle",
    price: "$280-450/day", 
    bestFor: ["Family group safaris", "Luxury Kenya tours", "Corporate accessible travel", "Multi-generational trips", "Special event transport"],
    certifications: ["Toyota Platinum Certified", "Luxury Travel Certified", "Executive Transport Certified"],
    stats: {
      usersServed: "1,450+",
      satisfaction: "99.5%", 
      experience: "6 years",
      support: "24/7"
    },
    coverage: ["Private conservancies", "Luxury lodges", "Executive airports", "Business districts"],
    included: ["Dual driver team", "Luxury amenities", "Premium insurance", "Concierge service"],
    specifications: {
      vehicle: "Toyota Land Cruiser Premium",
      lift: "Dual hydraulic 300kg each",
      viewing: "Extended pop-up roof",
      power: "4kW medical inverter",
      fuel: "200L extended range", 
      communication: "Dual satellite system"
    }
  }
]

type Vehicle = typeof vehicles[0]

export default function VehicleCard() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Vehicles', count: vehicles.length },
    { id: 'land-cruiser', name: 'Land Cruisers', count: vehicles.filter(v => v.type.includes('Land Cruiser')).length },
    { id: 'safari', name: 'Safari Vehicles', count: vehicles.filter(v => v.type.includes('Safari')).length },
    { id: 'premium', name: 'Premium', count: vehicles.filter(v => v.type.includes('Premium')).length }
  ]

  const filteredVehicles = selectedCategory === 'all' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.type.toLowerCase().includes(selectedCategory))

  return (
    <section className="mb-20">
      {/* CATEGORY FILTER */}
      <div className="mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8">Our Wheelchair Accessible Land Cruiser Fleet</h2>
        
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

      {/* VEHICLES GRID */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-2xl">
            <div className="relative aspect-[16/10]">
              <Image
                src={vehicle.image}
                alt={vehicle.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-110 duration-700"
                priority={vehicle.id === "safari-land-cruiser"}
              />
              
              {/* BADGES */}
              <div className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                {vehicle.type}
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-bold backdrop-blur-sm">
                {vehicle.price}
              </div>
              
              {/* CERTIFICATIONS */}
              {vehicle.certifications && (
                <div className="absolute bottom-4 left-4 flex gap-1">
                  {vehicle.certifications.slice(0, 2).map((cert, index) => (
                    <div key={index} className="flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
                      <Award className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-white">{cert.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* TOYOTA BADGE */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                TOYOTA LAND CRUISER
              </div>
            </div>

            <div className="p-6">
              {/* HEADER */}
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

              {/* SPECIFICATIONS */}
              {vehicle.specifications && (
                <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-primary/5 p-4">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STATS */}
              {vehicle.stats && (
                <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-blue-50 p-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.usersServed}</div>
                    <div className="text-xs text-muted-foreground">Users Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.satisfaction}</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              )}

              {/* COVERAGE AREAS */}
              {vehicle.coverage && (
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Kenya Safari Coverage:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.coverage.slice(0, 4).map((area, i) => (
                      <span key={i} className="rounded-full bg-blue-50 text-blue-700 px-2 py-1 text-xs">
                        {area}
                      </span>
                    ))}
                    {vehicle.coverage.length > 4 && (
                      <span className="rounded-full bg-gray-100 text-gray-600 px-2 py-1 text-xs">
                        +{vehicle.coverage.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* BEST FOR */}
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

              {/* KEY FEATURES */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  Land Cruiser Features:
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
                      +{vehicle.features.length - 4} more Land Cruiser features...
                    </li>
                  )}
                </ul>
              </div>

              {/* INCLUDED SERVICES */}
              {vehicle.included && (
                <div className="mb-6 p-3 bg-green-50 rounded-lg">
                  <h4 className="mb-2 font-semibold text-sm text-green-800">Included in Kenya:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.included.map((service, i) => (
                      <span key={i} className="rounded-full bg-green-100 text-green-800 px-2 py-1 text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA BUTTONS */}
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                  <Link href={`/vehicles/${vehicle.id}`} className="flex items-center justify-center">
                    <Car className="mr-2 h-4 w-4" />
                    View Land Cruiser Details
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/book-now?vehicle=${vehicle.id}`} className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Book Now
                  </Link>
                </Button>
              </div>

              {/* TRUST BADGE */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Certified Toyota Land Cruiser</span>
                <Heart className="h-3 w-3 ml-2" />
                <span>{vehicle.stats?.satisfaction} Satisfaction</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-bold mb-2">No Land Cruisers found</h3>
          <p className="text-muted-foreground">Try selecting a different category or contact us for custom Land Cruiser solutions</p>
        </div>
      )}
    </section>
  )
}