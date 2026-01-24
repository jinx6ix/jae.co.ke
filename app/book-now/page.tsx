import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, Clock, MapPin } from 'lucide-react';

// BULLET-PROOF VEHICLE HIRE SCHEMA — MAXIMUM RICH RESULTS
const vehicleHireSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization + LocalBusiness (with reviews for rich star ratings)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions – Vehicle Hire & Transfers",
      "url": "https://www.jaetravel.co.ke/vehicle-hire",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "description": "Luxury vehicle rental and private transfers in Kenya. Airport transfers, 4x4 safari vehicles, minivans, and executive cars with professional drivers. 24/7 service.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE",
        "addressLocality": "Nairobi"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
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
          "reviewBody": "Booked an airport transfer and then a 4x4 for our Masai Mara trip — flawless service! The driver was punctual, professional, and extremely knowledgeable."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sarah Johnson" },
          "datePublished": "2025-07-15",
          "reviewBody": "Rented their luxury Land Cruiser with driver for a week-long safari — best decision ever. Vehicle was spotless, driver was amazing."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Michael Thompson" },
          "datePublished": "2025-09-05",
          "reviewBody": "Used them for corporate transfers in Nairobi and a group transfer to Amboseli. Professional, safe drivers and very comfortable vehicles."
        }
      ]
    },

    // 2. WebSite
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "JAE Travel Expeditions",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" }
    },

    // 3. WebPage
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#webpage",
      "url": "https://www.jaetravel.co.ke/vehicle-hire",
      "name": "Vehicle Rental & Airport Transfers | JAE Travel Kenya",
      "description": "Luxury car hire and private transfers in Nairobi and across Kenya. 24/7 service with professional drivers.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "breadcrumb": { "@id": "https://www.jaetravel.co.ke/vehicle-hire/#breadcrumb" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.jaetravel.co.ke/vehicle-hire/land-cruiser-safari-vehicle.jpg",
        "width": 1200,
        "height": 630
      },
      "mainEntity": [
        { "@id": "https://www.jaetravel.co.ke/vehicle-hire/#service" },
        { "@id": "https://www.jaetravel.co.ke/vehicle-hire/#products" }
      ]
    },

    // 4. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jaetravel.co.ke"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Vehicle Hire",
          "item": "https://www.jaetravel.co.ke/vehicle-hire"
        }
      ]
    },

    // 5. Service (main service description)
    {
      "@type": "Service",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#service",
      "serviceType": "Car Rental & Private Transfers",
      "provider": { "@id": "https://www.jaetravel.co.ke/#organization" },
      "areaServed": ["Kenya", "Nairobi", "Mombasa", "Masai Mara", "Amboseli"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Vehicle Hire & Transfer Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@id": "https://www.jaetravel.co.ke/vehicle-hire/#airport-transfer" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@id": "https://www.jaetravel.co.ke/vehicle-hire/#land-cruiser" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@id": "https://www.jaetravel.co.ke/vehicle-hire/#private-driver" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@id": "https://www.jaetravel.co.ke/vehicle-hire/#group-transfer" }
          }
        ]
      }
    },

    // 6. Product schemas for each vehicle type (added for rich product results, pricing & availability)
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#airport-transfer",
      "name": "Nairobi Airport Transfer (JKIA / Wilson)",
      "description": "Reliable door-to-door airport transfer service with meet & greet, professional driver, bottled water, and Wi-Fi.",
      "image": "https://www.jaetravel.co.ke/vehicle-hire/airport-transfer-vehicle.jpg",
      "brand": { "@type": "Brand", "name": "JAE Travel Expeditions" },
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/vehicle-hire",
        "priceCurrency": "USD",
        "price": "50",
        "availability": "https://schema.org/InStock",
        "seller": { "@id": "https://www.jaetravel.co.ke/#organization" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "723"
      }
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#land-cruiser",
      "name": "Luxury 4x4 Safari Vehicle Rental - Toyota Land Cruiser",
      "description": "Fully equipped Toyota Land Cruiser with pop-up roof, fridge, charging ports, and experienced driver-guide. Perfect for safaris and long-distance travel.",
      "image": "https://www.jaetravel.co.ke/vehicle-hire/land-cruiser-safari-vehicle.jpg",
      "brand": { "@type": "Brand", "name": "Toyota" },
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/vehicle-hire",
        "priceCurrency": "USD",
        "price": "120",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "unitText": "per day"
        },
        "availability": "https://schema.org/InStock",
        "seller": { "@id": "https://www.jaetravel.co.ke/#organization" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "723"
      }
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#private-driver",
      "name": "Private Driver Service",
      "description": "Professional English-speaking driver available for any vehicle type or duration. Safe, knowledgeable, and courteous.",
      "image": "https://www.jaetravel.co.ke/vehicle-hire/private-driver.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/vehicle-hire",
        "priceCurrency": "USD",
        "price": "80",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "unitText": "per day"
        },
        "availability": "https://schema.org/InStock",
        "seller": { "@id": "https://www.jaetravel.co.ke/#organization" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "723"
      }
    },
    {
      "@type": "Product",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#group-transfer",
      "name": "Corporate & Group Transfers",
      "description": "Minivans, minibuses, and coaches for groups of any size with professional drivers. Ideal for corporate events, tours, and large parties.",
      "image": "https://www.jaetravel.co.ke/vehicle-hire/group-minivan.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://www.jaetravel.co.ke/vehicle-hire",
        "priceCurrency": "USD",
        "price": "0",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "Custom Quote"
        },
        "availability": "https://schema.org/InStock",
        "seller": { "@id": "https://www.jaetravel.co.ke/#organization" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "723"
      }
    },

    // 7. FAQPage
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/vehicle-hire/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you offer airport transfers in Nairobi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — we provide 24/7 transfers from JKIA and Wilson Airport with meet & greet service, professional drivers, and comfortable vehicles."
          }
        },
        {
          "@type": "Question",
          "name": "Are drivers included with vehicle rental?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — all our rentals include a professional, English-speaking driver. Self-drive options are not available."
          }
        },
        {
          "@type": "Question",
          "name": "Can I book for multi-day safari transfers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! We specialize in long-distance transfers to Masai Mara, Amboseli, Samburu, Tsavo, and beyond with reliable 4x4 vehicles."
          }
        },
        {
          "@type": "Question",
          "name": "Do you have wheelchair-accessible vehicles?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — we offer adapted vehicles with ramps and space for wheelchairs. Please specify your requirements when booking."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in your vehicle rental packages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All rentals include a professional driver, fuel, insurance, bottled water, Wi-Fi, and comprehensive vehicle maintenance."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: 'Book Now | Vehicle Rental & Transfers | JaeTravel Expeditions',
  description: 'Book luxury vehicle rentals, airport transfers, and private transportation across East Africa. 24/7 service with professional drivers.',
  keywords: 'vehicle rental, airport transfer, private driver, East Africa transport, luxury cars, Nairobi transfers',
};

export default function BookNowPage() {
  const services = [
    {
      title: 'Airport Transfers',
      description: 'Nairobi Wilson & JKIA to any destination',
      icon: '✈️',
      price: 'From $50',
    },
    {
      title: 'Vehicle Rental',
      description: 'Luxury SUVs, Minivans & 4x4s',
      icon: '🚙',
      price: 'From $120/day',
    },
    {
      title: 'Private Driver',
      description: 'Professional English-speaking drivers',
      icon: '👨‍💼',
      price: 'From $80/day',
    },
    {
      title: 'Corporate Travel',
      description: 'Group transfers & executive service',
      icon: '🏢',
      price: 'Custom Quote',
    },
  ];

  return (
    <>
      {/* FULL RICH RESULTS SCHEMA */}            
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleHireSchema) }}
        />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <Button asChild variant="ghost" className="mb-8 text-white hover:bg-white/20">
              <Link href="/" className="flex items-center gap-2 hover:text-white/90">
                <ArrowLeft className="h-4 w-4" />
                Back to Tours
              </Link>
            </Button>

            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Vehicle Rental & Transfers
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                Luxury vehicles • Professional drivers • 24/7 service across East Africa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-white/90 text-lg px-8 py-3 font-semibold shadow-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +254 726 485 228
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Quote
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Services Grid */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Transportation Services</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Need reliable transportation? We offer luxury vehicles with professional drivers for airport transfers, 
                  private tours, corporate events, and long-distance travel across Kenya, Tanzania, and Uganda.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="font-semibold text-green-600 text-lg">{service.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Get Your Free Quote</h3>
                    <p className="text-purple-100 mb-6">Response within 15 minutes</p>
                    <div className="space-y-3 text-purple-100">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" />
                        <span>+254 726 485 228</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        <span>info@jaetravel.co.ke</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5" />
                        <span>24/7 Service</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5" />
                        <span>Nairobi, Kenya</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-white/90 shadow-lg"
                    >
                      <Link href="https://wa.me/+254726485228?text=Hi!%20I%20need%20transportation%20services">
                        WhatsApp Quote
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-white/30 hover:bg-white/10"
                    >
                      <Link href="/contact">Contact Form</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Section */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/50">
                <div className="relative h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-8xl mb-6">🚙</div>
                      <h2 className="text-4xl font-bold mb-4">Luxury Fleet</h2>
                      <p className="text-xl opacity-90">Mercedes, Toyota Land Cruiser, Toyota Hiace</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '🔒',
                    title: 'Fully Insured',
                    description: 'Comprehensive vehicle & passenger coverage',
                  },
                  {
                    icon: '🧹',
                    title: 'Clean & Sanitized',
                    description: 'Daily deep cleaning & disinfection',
                  },
                  {
                    icon: '⭐',
                    title: '5-Star Drivers',
                    description: 'Professional, licensed, English-speaking',
                  },
                  {
                    icon: '⚡',
                    title: '24/7 Availability',
                    description: 'Emergency roadside assistance included',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Book Your Transfer?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Get instant confirmation and track your driver in real-time
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-600 hover:bg-white/90 text-xl px-12 py-4 font-semibold shadow-2xl"
              >
                <Link href="tel:+254726485228">
                  <Phone className="w-6 h-6 mr-2" />
                  Call Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 hover:bg-white/10 text-xl px-12 py-4"
              >
                <Link href="https://wa.me/+254726485228">
                  WhatsApp
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-green-100 text-sm">
              📍 Pick-up anywhere in Nairobi • 🚙 Luxury vehicles • ⭐ 5-star service
            </p>
          </div>
        </div>
      </div>
    </>
  );
}