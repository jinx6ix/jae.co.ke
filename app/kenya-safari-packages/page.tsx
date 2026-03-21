// app/kenya-safari-packages/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// ============================================
// 1. ADVANCED METADATA CONFIGURATION
// ============================================
export const metadata: Metadata = {
  title: "Kenya Safari Packages 2026 | Best Safari Tours & Wildlife Adventures",
  description: "Book authentic Kenya safari packages 2026. 🦁 Maasai Mara, Amboseli & Tsavo tours. Best prices, expert guides, and 5-star reviews. Custom itineraries available.",
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Kenya Safari Packages 2026 | Jae Travel Expeditions",
    description: "Experience the best Kenya safari packages. Maasai Mara, Amboseli, Tsavo. Book your African adventure today!",
    url: "https://jaetravel.co.ke/kenya-safari-packages",
    siteName: "Jae Travel Expeditions",
    images: [
      {
        url: "https://jaetravel.co.ke/images/kenya-safari-og.jpg",
        width: 1200,
        height: 630,
        alt: "Kenya Safari Packages - Maasai Mara Wildlife",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Kenya Safari Packages 2026 | Jae Travel",
    description: "Book your dream Kenya safari. Best prices, expert guides, amazing wildlife!",
    images: ["https://jaetravel.co.ke/images/kenya-safari-twitter.jpg"],
    creator: "@jaetravel",
  },

  // Additional SEO tags
  keywords: "Kenya safari packages, Maasai Mara safari, Amboseli safari, Tsavo safari, Kenya tours, African safari deals, luxury safari Kenya, budget safari Kenya, wildlife safaris, Kenya travel packages",
  authors: [{ name: "Jae Travel Expeditions", url: "https://jaetravel.co.ke" }],
  publisher: "Jae Travel Expeditions",
  
  // Verification for Google Search Console
  verification: {
    google: "your-google-verification-code",
  },

  // Canonical URL (prevents duplicate content)
  alternates: {
    canonical: "https://jaetravel.co.ke/kenya-safari-packages",
  },

  // Robots instructions
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
};

// ============================================
// 2. SCHEMA MARKUP GENERATOR (ALL RICH SNIPPETS)
// ============================================
const generateSchemaMarkup = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // ===== WEBSITE SCHEMA =====
      {
        "@type": "WebSite",
        "@id": "https://jaetravel.co.ke/#website",
        "url": "https://jaetravel.co.ke",
        "name": "Jae Travel Expeditions",
        "description": "Premium Kenya safari packages and tours",
        "publisher": {
          "@id": "https://jaetravel.co.ke/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://jaetravel.co.ke/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },

      // ===== ORGANIZATION SCHEMA =====
      {
        "@type": "Organization",
        "@id": "https://jaetravel.co.ke/#organization",
        "name": "Jae Travel Expeditions",
        "url": "https://jaetravel.co.ke",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jaetravel.co.ke/images/logo.png",
          "width": 600,
          "height": 60
        },
        "sameAs": [
          "https://www.facebook.com/jaetravel",
          "https://www.instagram.com/jaetravel",
          "https://twitter.com/jaetravel",
          "https://www.youtube.com/@jaetravel"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+254-XXX-XXXXXX",
            "contactType": "customer service",
            "availableLanguage": ["English", "Swahili"],
            "areaServed": "KE"
          },
          {
            "@type": "ContactPoint",
            "telephone": "+254-XXX-XXXXXX",
            "contactType": "reservations",
            "availableLanguage": ["English"],
            "areaServed": "KE"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Address",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi",
          "postalCode": "00100",
          "addressCountry": "KE"
        }
      },

      // ===== ITEM LIST (PRODUCT COLLECTION) =====
      {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "url": "https://jaetravel.co.ke/safari/1-day-maasai-mara",
            "name": "1 Day Maasai Mara Safari"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "url": "https://jaetravel.co.ke/safari/3-days-maasai-mara",
            "name": "3 Days Maasai Mara Safari"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "url": "https://jaetravel.co.ke/safari/5-days-amboseli-tsavo",
            "name": "5 Days Amboseli & Tsavo Safari"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "url": "https://jaetravel.co.ke/safari/7-days-kenya-safari",
            "name": "7 Days Kenya Safari Experience"
          }
        ]
      },

      // ===== AGGREGATE RATING (REVIEW SNIPPET) =====
      {
        "@type": "Product",
        "@id": "https://jaetravel.co.ke/kenya-safari-packages#product",
        "name": "Kenya Safari Packages",
        "description": "Premium Kenya safari experiences with expert guides",
        "brand": {
          "@type": "Brand",
          "name": "Jae Travel Expeditions"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "328",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "180",
          "highPrice": "3500",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "offerCount": "12"
        }
      },

      // ===== VIDEO SCHEMA (FOR YOUTUBE/TIKTOK) =====
      {
        "@type": "VideoObject",
        "name": "Kenya Safari Experience - Best Wildlife Moments",
        "description": "Experience the magic of Kenya safari. Watch lions, elephants, and the Great Migration.",
        "thumbnailUrl": [
          "https://jaetravel.co.ke/images/video-thumbnail.jpg"
        ],
        "uploadDate": "2024-01-15",
        "duration": "PT3M30S",
        "contentUrl": "https://www.youtube.com/watch?v=your-video-id",
        "embedUrl": "https://www.youtube.com/embed/your-video-id",
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": { "@type": "WatchAction" },
          "userInteractionCount": 15432
        }
      },

      // ===== BREADCRUMB SCHEMA =====
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jaetravel.co.ke"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Safari Packages",
            "item": "https://jaetravel.co.ke/kenya-safari-packages"
          }
        ]
      },

      // ===== FAQ SCHEMA =====
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the best time for a Kenya safari?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best time for Kenya safari is during the dry seasons: June to October and January to February. This is when wildlife viewing is optimal, especially for the Great Migration in Maasai Mara (July-October)."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a Kenya safari cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kenya safari packages range from $180 for a 1-day trip to $3,500+ for luxury 7-day safaris. Budget options start at $200/day, mid-range at $350/day, and luxury at $600+/day. All prices are per person."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need a visa for Kenya safari?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most visitors need a visa for Kenya. You can apply online for an eVisa before travel. The cost is approximately $50. Some nationalities may be exempt."
            }
          },
          {
            "@type": "Question",
            "name": "What should I pack for a Kenya safari?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Essential items include: lightweight clothing in neutral colors, warm jacket (mornings/evenings), comfortable walking shoes, hat, sunglasses, sunscreen, camera, binoculars, insect repellent, and any personal medications."
            }
          }
        ]
      },

      // ===== LOCAL BUSINESS SCHEMA =====
      {
        "@type": "TouristInformationCenter",
        "@id": "https://jaetravel.co.ke/#business",
        "name": "Jae Travel Expeditions",
        "description": "Premier Kenya safari tour operator",
        "url": "https://jaetravel.co.ke",
        "telephone": "+254-XXX-XXXXXX",
        "email": "info@jaetravel.co.ke",
        "areaServed": {
          "@type": "Country",
          "name": "Kenya"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Safari Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Maasai Mara Safari"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Amboseli Safari"
              }
            }
          ]
        }
      }
    ]
  };
};

// ============================================
// 3. MAIN PAGE COMPONENT
// ============================================
export default function KenyaSafariPackagesPage() {
  // Safari packages data
  const safariPackages = [
    {
      id: 1,
      title: "1 Day Maasai Mara Safari",
      slug: "1-day-maasai-mara",
      duration: "1 Day",
      price: "$180",
      oldPrice: "$220",
      image: "/images/1-day-mara.jpg",
      rating: 4.8,
      reviews: 124,
      highlights: ["Big Five Game Drive", "Nairobi Pickup", "Picnic Lunch"],
      badge: "Most Popular",
      destinations: ["Maasai Mara"]
    },
    {
      id: 2,
      title: "3 Days Maasai Mara Safari",
      slug: "3-days-maasai-mara",
      duration: "3 Days",
      price: "$650",
      oldPrice: "$750",
      image: "/images/3-days-mara.jpg",
      rating: 4.9,
      reviews: 256,
      highlights: ["Full Day Game Drives", "Great Migration", "Cultural Visit"],
      badge: "Best Value",
      destinations: ["Maasai Mara"]
    },
    {
      id: 3,
      title: "4 Days Amboseli & Tsavo Safari",
      slug: "4-days-amboseli-tsavo",
      duration: "4 Days",
      price: "$850",
      image: "/images/4-days-amboseli.jpg",
      rating: 4.7,
      reviews: 98,
      highlights: ["Kilimanjaro Views", "Elephant Herds", "Shetani Lava Flow"],
      badge: "Scenic",
      destinations: ["Amboseli", "Tsavo"]
    },
    {
      id: 4,
      title: "5 Days Kenya Safari (Mara + Amboseli)",
      slug: "5-days-mara-amboseli",
      duration: "5 Days",
      price: "$1,250",
      oldPrice: "$1,400",
      image: "/images/5-days-combo.jpg",
      rating: 5.0,
      reviews: 187,
      highlights: ["Two Parks", "Lake Naivasha", "Boat Ride"],
      badge: "Top Rated",
      destinations: ["Maasai Mara", "Amboseli", "Naivasha"]
    },
    {
      id: 5,
      title: "6 Days Amboseli, Nakuru & Mara",
      slug: "6-days-amboseli-nakuru-mara",
      duration: "6 Days",
      price: "$1,550",
      image: "/images/6-days-safari.jpg",
      rating: 4.9,
      reviews: 145,
      highlights: ["Lake Nakuru Flamingos", "Rhino Sanctuary", "Mara River"],
      badge: "Comprehensive",
      destinations: ["Amboseli", "Nakuru", "Maasai Mara"]
    },
    {
      id: 6,
      title: "7 Days Kenya Luxury Safari",
      slug: "7-days-luxury-kenya",
      duration: "7 Days",
      price: "$2,800",
      oldPrice: "$3,200",
      image: "/images/7-days-luxury.jpg",
      rating: 5.0,
      reviews: 92,
      highlights: ["Luxury Lodges", "Private Guide", "Hot Air Balloon"],
      badge: "Luxury",
      destinations: ["Maasai Mara", "Amboseli", "Nakuru"]
    },
    {
      id: 7,
      title: "8 Days Kenya Safari & Beach Holiday",
      slug: "8-days-safari-beach",
      duration: "8 Days",
      price: "$2,100",
      image: "/images/8-days-beach.jpg",
      rating: 4.8,
      reviews: 76,
      highlights: ["Safari + Beach", "Diani Beach", "Indian Ocean"],
      badge: "Combo",
      destinations: ["Tsavo", "Diani Beach"]
    },
    {
      id: 8,
      title: "10 Days Kenya Safari & Masai Mara",
      slug: "10-days-kenya-safari",
      duration: "10 Days",
      price: "$2,950",
      image: "/images/10-days-safari.jpg",
      rating: 4.9,
      reviews: 112,
      highlights: ["All Major Parks", "Great Migration", "Cultural Tours"],
      badge: "Ultimate",
      destinations: ["Nairobi", "Amboseli", "Nakuru", "Maasai Mara"]
    }
  ];

  // Destinations for filter
  const destinations = ["All", "Maasai Mara", "Amboseli", "Tsavo", "Nakuru", "Nairobi", "Beach"];
  
  // Durations for filter
  const durations = ["All", "1 Day", "2-3 Days", "4-5 Days", "6-7 Days", "8+ Days"];

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchemaMarkup()) }}
      />

      <main className="bg-white">
        {/* ===== HERO SECTION WITH VIDEO BACKGROUND ===== */}
        <section className="relative h-[600px] overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/images/safari-hero-poster.jpg"
            >
              <source src="/videos/kenya-safari-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Hero Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Kenya Safari Packages 2026
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-gray-200">
                Experience the magic of African wildlife with expertly crafted safari tours
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="font-semibold">4.9/5 (328 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦁</span>
                  <span className="font-semibold">12+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span className="font-semibold">Best Price Guarantee</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#packages"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                  View Packages
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
                >
                  Customize Your Safari
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* ===== BREADCRUMBS ===== */}
        <nav className="bg-gray-50 py-3" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-orange-600">Home</Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <span className="text-gray-900 font-semibold">Safari Packages</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* ===== INTRO TEXT WITH KEYWORDS ===== */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Discover the Best Kenya Safari Packages
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <strong>Jae Travel Expeditions</strong>, your gateway to unforgettable 
              <strong> Kenya safari experiences</strong>. Whether you're looking for a 
              <strong> 1-day Maasai Mara safari</strong> or a <strong>luxury 10-day Kenya tour</strong>, 
              we offer expertly crafted <strong>safari packages</strong> that showcase the best of 
              Kenyan wildlife. From the <strong>Great Migration in Maasai Mara</strong> to 
              <strong> elephant herds in Amboseli</strong> with <strong>Mount Kilimanjaro</strong> as 
              backdrop, our <strong>Kenya tours</strong> deliver authentic adventures at the best prices.
            </p>
          </div>
        </section>

        {/* ===== FILTER SECTION ===== */}
        <section className="py-6 bg-gray-50 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <select title="Destination" className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-orange-500">
                  {destinations.map((dest) => (
                    <option key={dest}>{dest}</option>
                  ))}
                </select>
                <select title="Duration" className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-orange-500">
                  {durations.map((dur) => (
                    <option key={dur}>{dur}</option>
                  ))}
                </select>
                <select title="Budget" className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-orange-500">
                  <option>Budget</option>
                  <option>Mid-Range ($200-400/day)</option>
                  <option>Luxury ($400+/day)</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-bold">{safariPackages.length} packages</span> available
              </div>
            </div>
          </div>
        </section>

        {/* ===== SAFARI PACKAGES GRID (ITEM LIST) ===== */}
        <section id="packages" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Explore Our Kenya Safari Packages
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {safariPackages.map((pkg) => (
                <article key={pkg.id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  
                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {pkg.badge}
                    </div>
                  )}

                  {/* Image with zoom effect */}
                  <Link href={`/safari/${pkg.slug}`} className="block relative h-48 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    
                    {/* Duration badge on image */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                      {pkg.duration}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <Link href={`/safari/${pkg.slug}`}>
                      <h3 className="text-lg font-bold mb-2 hover:text-orange-600 transition-colors line-clamp-2">
                        {pkg.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < Math.floor(pkg.rating) ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {pkg.rating} ({pkg.reviews} reviews)
                      </span>
                    </div>

                    {/* Destinations */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pkg.destinations.map((dest) => (
                        <span key={dest} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {dest}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="mb-4 space-y-1">
                      {pkg.highlights.map((item) => (
                        <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        {pkg.oldPrice && (
                          <span className="text-sm text-gray-400 line-through mr-2">
                            {pkg.oldPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold text-orange-600">
                          {pkg.price}
                        </span>
                        <span className="text-sm text-gray-500">/person</span>
                      </div>
                      <Link
                        href={`/safari/${pkg.slug}`}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== VIDEO SHOWCASE SECTION ===== */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Experience Kenya Safari in 3 Minutes
                </h2>
                <p className="text-gray-300 mb-6">
                  Watch our video to see what awaits you on a Kenya safari. From 
                  lions on the hunt to elephants at sunset, experience the magic 
                  of African wildlife.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-900" />
                    ))}
                  </div>
                  <span className="text-gray-300">1,500+ happy travelers</span>
                </div>
                <Link
                  href="/videos"
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold"
                >
                  Watch More Videos →
                </Link>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/your-video-id"
                  title="Kenya Safari Experience"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== REVIEWS SECTION WITH RICH SNIPPETS ===== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              What Our Safari Travelers Say
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  location: "United States",
                  rating: 5,
                  text: "Absolutely incredible! Our 7-day Kenya safari exceeded all expectations. Saw the Big Five, stayed in amazing lodges, and our guide was knowledgeable and fun.",
                  date: "January 2026",
                  image: "/images/reviewer1.jpg"
                },
                {
                  name: "Michael Chen",
                  location: "Singapore",
                  rating: 5,
                  text: "Booked the 5-day Maasai Mara and Amboseli combo. Perfectly organized from pickup to drop-off. The Great Migration was breathtaking!",
                  date: "December 2025",
                  image: "/images/reviewer2.jpg"
                },
                {
                  name: "Emma Watson",
                  location: "United Kingdom",
                  rating: 5,
                  text: "As a solo female traveler, I felt completely safe. The team was professional, and the experience was life-changing. Highly recommend!",
                  date: "November 2025",
                  image: "/images/reviewer3.jpg"
                }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.location}</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3">"{review.text}"</p>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/reviews"
                className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Read All 328 Reviews
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ SECTION ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Kenya Safari: Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  What is included in your Kenya safari packages?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  Our Kenya safari packages include: transportation in safari vehicles, professional English-speaking guide, game drives as per itinerary, park entry fees, accommodation (for multi-day safaris), meals as specified, and bottled water. International flights, visas, tips, and personal expenses are not included.
                </div>
              </details>

              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  How do I book a Kenya safari package?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  You can book directly through our website, contact us via WhatsApp at +254 XXX XXXXXX, or email us at info@jaetravel.co.ke. We require a 30% deposit to confirm your booking, with the balance due 30 days before departure.
                </div>
              </details>

              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  What is the best time for a Kenya safari?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  The best time for Kenya safari is during the dry seasons: June to October and January to February. For the Great Migration in Maasai Mara, July to October is ideal. However, Kenya offers excellent wildlife viewing year-round.
                </div>
              </details>

              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  Are your Kenya safari packages customizable?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  Yes! All our Kenya safari packages can be customized to match your preferences. You can adjust duration, destinations, accommodation level, and add activities like hot air balloon safaris, cultural visits, or beach extensions.
                </div>
              </details>

              <details className="group border rounded-lg open:bg-orange-50">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold">
                  What safety measures do you have for safaris?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-6 pt-0 text-gray-700">
                  Your safety is our priority. All our guides are professionally trained and certified. Vehicles are regularly maintained and equipped with first aid kits and communication devices. We follow all park regulations and safety protocols.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ===== DESTINATION HIGHLIGHTS ===== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Popular Safari Destinations in Kenya
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { name: "Maasai Mara", image: "/images/dest-mara.jpg", tours: 24 },
                { name: "Amboseli", image: "/images/dest-amboseli.jpg", tours: 18 },
                { name: "Tsavo", image: "/images/dest-tsavo.jpg", tours: 15 },
                { name: "Lake Nakuru", image: "/images/dest-nakuru.jpg", tours: 12 }
              ].map((dest) => (
                <Link
                  key={dest.name}
                  href={`/destinations/${dest.name.toLowerCase().replace(' ', '-')}`}
                  className="group relative h-48 rounded-xl overflow-hidden"
                >
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{dest.name}</h3>
                    <p className="text-sm">{dest.tours} packages</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Why Book Your Kenya Safari With Us?
            </h2>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl mb-4">🦁</div>
                <h3 className="font-bold mb-2">Expert Local Guides</h3>
                <p className="text-gray-600">Knowledgeable guides with 10+ years experience</p>
              </div>
              <div>
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-bold mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">Direct operator rates with no middlemen</p>
              </div>
              <div>
                <div className="text-5xl mb-4">📞</div>
                <h3 className="font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Assistance throughout your safari journey</p>
              </div>
              <div>
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="font-bold mb-2">4.9/5 Reviews</h3>
                <p className="text-gray-600">Trusted by 300+ happy travelers</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-16 bg-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for Your Kenya Safari Adventure?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book now and get 10% off on all 2026 packages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#packages"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                View Packages
              </Link>
              <Link
                href="https://wa.me/254XXXXXXXXX"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all"
              >
                <span>💬</span> Chat on WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}