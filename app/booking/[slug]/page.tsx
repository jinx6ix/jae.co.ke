import { notFound } from 'next/navigation';
import { tours } from '@/data/tours';
import { toPlainString } from '@/lib/util';
import BookingForm from '@/components/BookingForm';
import TourDetails from '@/components/TourDetails';
import { Metadata } from 'next';

interface BookingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// DYNAMIC RICH RESULTS SCHEMA — FULLY COMPATIBLE WITH generateStaticParams
function generateTourSchema(tour: typeof tours[0]) {
  const resolvedSlug = tour.bookingSlug
  const pageUrl = `https://jaetravel.co.ke/${resolvedSlug}/book`

  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://www.jaetravel.co.ke/#organization",
        "name": "JAE Travel Expeditions",
        "url": "https://www.jaetravel.co.ke",
        "logo": "https://www.jaetravel.co.ke/logo.png",
        "telephone": "+254726485228",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "reviewCount": "723"
        }
      },

      // 2. TouristTrip + Offer — THIS GETS PRICE RICH RESULTS
      {
        "@type": "TouristTrip",
        "@id": `${pageUrl}#tour`,
        "name": tour.title,
        "description": tour.description || `Book ${tour.title} in ${tour.country}`,
        "url": pageUrl,
        "image": tour.image?.[0],
        "offers": {
          "@type": "Offer",
          "name": `Book ${tour.title}`,
          "price": tour.price,
          "priceCurrency": tour.currency || "USD",
          "availability": tour.isOnOffer ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
          "url": pageUrl,
          "validFrom": "2025-01-01",
          "priceValidUntil": "2026-12-31",
          "seller": { "@id": "https://www.jaetravel.co.ke/#organization" }
        },
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": tour.highlights?.slice(0, 5).map((h: string, i: number) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": h
          }))
        }
      },

      // 3. WebPage + Breadcrumb
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": `Book ${tour.title} | JaeTravel Expeditions`,
        "description": `Secure your ${tour.title} safari starting from ${tour.currency} ${tour.price.toLocaleString()}`
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaetravel.co.ke" },
          { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://jaetravel.co.ke/tours" },
          { "@type": "ListItem", "position": 3, "name": tour.title, "item": `https://jaetravel.co.ke/tours/${tour.slug}` },
          { "@type": "ListItem", "position": 4, "name": "Book Now", "item": pageUrl }
        ]
      },

      // 4. FAQ
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How do I book the ${tour.title}?`,
            "acceptedAnswer": { "@type": "Answer", "text": "Fill out the booking form on this page. We’ll confirm availability and send your invoice within 24 hours." }
          },
          {
            "@type": "Question",
            "name": "Is a deposit required?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes — a 30% deposit secures your booking. The balance is due 30 days before departure." }
          },
          {
            "@type": "Question",
            "name": "Can I customize this tour?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! Every safari is 100% customizable. Contact us to add days, change lodges, or include accessibility features." }
          },
          {
            "@type": "Question",
            "name": "What is your cancellation policy?",
            "acceptedAnswer": { "@type": "Answer", "text": "Free cancellation up to 60 days before departure. 50% refund 30–60 days. No refund within 30 days." }
          }
        ]
      }
    ]
  }
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.bookingSlug,
  }));
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tour = tours.find((t) => t.bookingSlug === resolvedParams.slug);

  if (!tour) {
    return { title: 'Tour Not Found | JaeTravel Expeditions' };
  }

  return {
    title: `Book ${tour.title} | Starting from ${tour.currency} ${tour.price.toLocaleString()} | JaeTravel Expeditions`,
    description: `Secure your ${tour.title} adventure in ${tour.country}. ${tour.duration} tour starting from ${tour.currency} ${tour.price.toLocaleString()}. Book now for ${tour.isOnOffer ? 'exclusive discounts' : 'best prices'}!`,
    keywords: `${tour.title}, ${tour.country} tour, ${tour.duration}, ${tour.currency} ${tour.price}, safari booking, adventure travel`,
    openGraph: {
      title: `Book ${tour.title} | JaeTravel Expeditions`,
      description: `Secure your ${tour.title} adventure in ${tour.country}`,
      images: [tour.image?.[0] || '/api/placeholder/1200/630'],
      url: `https://jaetravel.co.ke/${resolvedParams.slug}/book`,
    },
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const resolvedParams = await params;
  const tour = tours.find((t) => t.bookingSlug === resolvedParams.slug);

  if (!tour) {
    notFound();
  }

  return (
    <>
      {/* DYNAMIC RICH RESULTS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateTourSchema(tour)) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Book Your Adventure</h1>
                <p className="mt-1 text-lg text-gray-600">
                  Secure your spot for <span className="font-semibold text-blue-600">{tour.title}</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {tour.currency} {tour.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
                {tour.isOnOffer && tour.originalPrice && (
                  <div className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                    💰 {((1 - tour.price / tour.originalPrice) * 100).toFixed(0)}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form - Full width on mobile, 2/3 on desktop */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 sticky top-24 lg:top-8 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Details</h2>
                  <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-200/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-1">{tour.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 items-center">
                          <span className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            {tour.rating} ({tour.reviewCount} reviews)
                          </span>
                          <span>•</span>
                          <span>{tour.duration} • {tour.country}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {tour.currency} {tour.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pass individual props, NOT the whole tour object */}
                <BookingForm 
                  tourTitle={tour.title}
                  tourPrice={tour.price}
                  tourDuration={toPlainString(tour.duration)}   // Fixed!
                  serviceType="tour"
                />
              </div>
            </div>

            {/* Tour Details Sidebar */}
            <div className="lg:order-first">
              <div className="space-y-6">
                {/* Tour Images */}
                {tour.image && tour.image.length > 0 && (
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20">
                    <div className="relative h-64 overflow-hidden rounded-t-2xl">
                      <img
                        src={tour.image[0]}
                        alt={tour.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">Tour Highlights</h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {/* ✅ FIXED: Proper typing for map callback */}
                        {tour.highlights?.slice(0, 3).map((highlight: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-emerald-500 text-xl">🗓️</span>
                      <span className="font-semibold text-emerald-800">Duration</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{tour.duration}</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-500 text-xl">👥</span>
                      <span className="font-semibold text-amber-800">Group Size</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">2-12 people</p>
                  </div>
                </div>

                {/* Tour Details Component */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                  <TourDetails tour={tour} />
                </div>

                {/* WhatsApp Quick Action */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center shadow-lg">
                  <div className="mb-3">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Questions? Chat Now!</h3>
                  <p className="text-green-100 mb-4 text-sm">Get instant answers from our team</p>
                  <a
                    href={`https://wa.me/+254726485228?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(tour.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                  >
                    <span>📱 WhatsApp</span>
                    <span className="text-sm">+254 726 485 228</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/50 backdrop-blur-sm border-t border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">🔒</div>
                <h3 className="font-semibold text-gray-900">Secure Booking</h3>
                <p className="text-sm text-gray-600">SSL Encrypted</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">📧</div>
                <h3 className="font-semibold text-gray-900">Instant Email</h3>
                <p className="text-sm text-gray-600">Confirmation & PDF</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">⭐</div>
                <h3 className="font-semibold text-gray-900">Expert Guides</h3>
                <p className="text-sm text-gray-600">Licensed & Experienced</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">💳</div>
                <h3 className="font-semibold text-gray-900">Flexible Payment</h3>
                <p className="text-sm text-gray-600">30 days before departure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}