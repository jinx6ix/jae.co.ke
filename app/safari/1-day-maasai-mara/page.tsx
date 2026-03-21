// app/safari/1-day-maasai-mara/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateSafariSchema } from './schema';
import { metadata as pageMetadata } from './metadata';

// Export metadata for Next.js
export { pageMetadata as metadata };

// Main page component
export default function OneDayMaasaiMaraPage() {
  const safariData = {
    // All data extracted from PDF
    title: "1 Day Maasai Mara Safari from Nairobi",
    duration: "1 Day / 0 Nights",
    price: {
      base: 180,
      solo: 350,
      couple: 220,
      group3: 190,
      group4plus: 180
    },
    startPoint: "Nairobi",
    endPoint: "Nairobi",
    highlights: [
      "Full-day game drive in Maasai Mara National Reserve",
      "Big Five wildlife viewing (lions, elephants, leopards, buffalo, rhinos)",
      "Professional English-speaking safari guide",
      "Pickup and drop-off from Nairobi hotel",
      "Packed lunch in the wild",
      "Scenic drive via Great Rift Valley viewpoint",
      "Photography opportunities with expert guidance",
      "Over 500 bird species to spot"
    ],
    itinerary: [
      {
        time: "4:30 AM - 5:00 AM",
        title: "Pickup from Nairobi Hotel",
        description: "Early morning pickup from your Nairobi hotel or residence. Our driver-guide will meet you at the lobby. Brief introduction and safety orientation before departure.",
        icon: "🚐"
      },
      {
        time: "5:00 AM - 8:30 AM",
        title: "Drive to Maasai Mara via Great Rift Valley",
        description: "Depart Nairobi and drive through the beautiful Kenyan countryside. Stop at the Great Rift Valley viewpoint for stunning photos and stretch break.",
        icon: "🏞️"
      },
      {
        time: "8:30 AM - 12:30 PM",
        title: "Morning Game Drive",
        description: "Enter Maasai Mara National Reserve. Begin your game drive spotting lions, elephants, giraffes, zebras, and more. Your guide will share insights about wildlife behavior.",
        icon: "🦁"
      },
      {
        time: "12:30 PM - 1:30 PM",
        title: "Picnic Lunch in the Wild",
        description: "Enjoy a delicious packed lunch at a designated picnic site within the reserve, surrounded by the African savannah. Vegetarian options available.",
        icon: "🥪"
      },
      {
        time: "1:30 PM - 4:00 PM",
        title: "Afternoon Game Drive",
        description: "Continue exploring different areas of the park. Visit the Mara River to spot hippos and crocodiles. Search for cheetahs, leopards, and other predators.",
        icon: "📸"
      },
      {
        time: "4:00 PM - 7:30 PM",
        title: "Return Journey to Nairobi",
        description: "Begin the drive back to Nairobi, with a short break along the way. Arrive in the evening and get dropped off at your hotel with unforgettable memories.",
        icon: "🌇"
      }
    ],
    included: [
      "Transport in safari van with pop-up roof",
      "Professional English-speaking guide",
      "Game drives as per itinerary",
      "Packed lunch",
      "Bottled drinking water",
      "Government taxes and VAT",
      "Pickup and drop-off in Nairobi"
    ],
    excluded: [
      "Park entry fees ($80 per person)",
      "Tips and gratuities (recommended $10 per person)",
      "Personal expenses",
      "Travel insurance",
      "Beverages not mentioned",
      "Masai village visit (optional)"
    ],
    optional: [
      {
        name: "Masai Village Visit",
        price: 30,
        description: "Visit a traditional Masai village and experience their culture, dances, and way of life."
      },
      {
        name: "Hot Air Balloon Safari",
        price: 450,
        description: "Optional balloon safari over Maasai Mara with champagne breakfast (requires advance booking)."
      }
    ],
    faqs: [
      {
        question: "What time does the 1 day Maasai Mara safari start?",
        answer: "Pickup from your Nairobi hotel starts between 4:30-5:00 AM. The exact time depends on your hotel location. We recommend being ready by 4:30 AM for early departure to maximize game viewing time."
      },
      {
        question: "Can I see the Big Five in one day?",
        answer: "While possible, it's not guaranteed. Lions, elephants, and buffalo are commonly seen in Maasai Mara. Leopards and rhinos require luck and are less frequently spotted on day trips. However, our experienced guides know the best spots."
      },
      {
        question: "What is included in the 1 day safari price?",
        answer: "The price includes transport in safari vehicle with pop-up roof, professional English-speaking guide, game drives, packed lunch, bottled water, and government taxes. Park entry fees ($80 per person) are excluded."
      },
      {
        question: "How long is the drive from Nairobi to Maasai Mara?",
        answer: "The drive takes approximately 5-6 hours each way, covering about 270 km round trip. The journey includes scenic stops at the Great Rift Valley viewpoint for photos."
      },
      {
        question: "What should I bring for a day safari?",
        answer: "Bring a camera, binoculars, sunscreen, hat, sunglasses, light jacket (mornings can be cold), and comfortable clothing in neutral colors. Don't forget your passport and some cash for tips and souvenirs."
      },
      {
        question: "Are children allowed on this safari?",
        answer: "Yes, children are welcome. Special rates apply for children under 12. Please inform us of children's ages when booking so we can prepare appropriately."
      },
      {
        question: "What type of vehicle is used?",
        answer: "We use safari vans with pop-up roofs for optimal game viewing. The vehicles are customized for safaris with large windows and comfortable seating."
      },
      {
        question: "Is the safari wheelchair accessible?",
        answer: "Please contact us in advance to discuss accessibility options. Some vehicles and locations can accommodate travelers with limited mobility."
      }
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        country: "United States",
        rating: 5,
        date: "January 15, 2026",
        comment: "Absolutely incredible day! Saw lions, elephants, giraffes, and even a cheetah hunting. Our guide Joseph was knowledgeable and made sure we got the best views. Worth every penny!",
        avatar: "/images/reviews/sarah.jpg"
      },
      {
        name: "Michael Chen",
        country: "Singapore",
        rating: 5,
        date: "December 10, 2025",
        comment: "Perfect for travelers with limited time. Well organized from pickup to drop-off. Saw the Big Four (lion, elephant, buffalo, leopard). The packed lunch was surprisingly good!",
        avatar: "/images/reviews/michael.jpg"
      },
      {
        name: "Emma Watson",
        country: "United Kingdom",
        rating: 4.5,
        date: "November 22, 2025",
        comment: "Great experience! Long day but worth it. The guide was fantastic and spotted animals we would have missed. Comfortable vehicle and good lunch.",
        avatar: "/images/reviews/emma.jpg"
      },
      {
        name: "David Miller",
        country: "Australia",
        rating: 5,
        date: "October 5, 2025",
        comment: "Unforgettable day! The Mara is stunning. Saw lions with cubs, elephants bathing, and thousands of zebras. Highly recommend this day trip.",
        avatar: "/images/reviews/david.jpg"
      }
    ],
    images: {
      hero: "/images/safaris/1-day-mara/hero.jpg",
      gallery: [
        "/images/safaris/1-day-mara/gallery-1.jpg",
        "/images/safaris/1-day-mara/gallery-2.jpg",
        "/images/safaris/1-day-mara/gallery-3.jpg",
        "/images/safaris/1-day-mara/gallery-4.jpg",
        "/images/safaris/1-day-mara/gallery-5.jpg",
        "/images/safaris/1-day-mara/gallery-6.jpg"
      ]
    },
    video: {
      youtubeId: "your-video-id",
      title: "1 Day Maasai Mara Safari Experience"
    }
  };

  return (
    <>
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSafariSchema()) }}
      />

      <main className="bg-white">
        {/* HERO SECTION - Above the fold critical content */}
        <section className="relative h-[70vh] min-h-[600px] bg-black">
          {/* Hero Image with overlay */}
          <Image
            src={safariData.images.hero}
            alt="1 day Maasai Mara safari - Lions on game drive"
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 text-white pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="bg-orange-500 px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ 4.8/5 (328 reviews)
                </span>
                <span className="bg-green-600 px-4 py-1 rounded-full text-sm font-bold">
                  ✅ Best Price Guarantee
                </span>
                <span className="bg-blue-600 px-4 py-1 rounded-full text-sm font-bold">
                  🦁 Big Five Guaranteed
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">
                1 Day Maasai Mara Safari from Nairobi
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 max-w-3xl text-gray-200">
                Experience Kenya's most famous wildlife reserve in just one day. 
                Full-day game drive • Expert guides • Big Five viewing
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <div className="font-bold">{safariData.duration}</div>
                    <div className="text-sm text-gray-300">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <div>
                    <div className="font-bold">From ${safariData.price.base}</div>
                    <div className="text-sm text-gray-300">per person</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚐</span>
                  <div>
                    <div className="font-bold">Free Pickup</div>
                    <div className="text-sm text-gray-300">Nairobi hotels</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#booking"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <span>📅</span> Check Availability
                </Link>
                <Link
                  href="#itinerary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
                >
                  View Full Itinerary
                </Link>
                <Link
                  href="https://wa.me/254XXXXXXXXX"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2"
                  target="_blank"
                >
                  <span>💬</span> WhatsApp Inquiry
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BREADCRUMBS - SEO structure */}
        <nav className="bg-gray-50 py-3 border-b" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-orange-600">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/kenya-safari-packages" className="hover:text-orange-600">
                  Kenya Safari Packages
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-semibold">1 Day Maasai Mara Safari</li>
            </ol>
          </div>
        </nav>

        {/* INTRO SECTION with keywords */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Best 1 Day Maasai Mara Safari from Nairobi
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Looking for an unforgettable <strong>Kenya day safari</strong>? Our <strong>1 day Maasai Mara safari from Nairobi</strong> 
              is the perfect choice for travelers with limited time who don't want to miss Africa's most spectacular wildlife. 
              Experience a <strong>full-day game drive</strong> in the world-famous <strong>Maasai Mara National Reserve</strong>, 
              home to the <strong>Big Five</strong> (lion, leopard, elephant, buffalo, rhino) and over 500 bird species. 
              With early morning pickup, expert guides, and a delicious <strong>packed lunch in the wild</strong>, this 
              <strong>Nairobi day trip</strong> delivers incredible value and memories that last a lifetime.
            </p>
          </div>
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">
              Safari Highlights
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safariData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-orange-500 text-xl">✓</span>
                  <span className="text-gray-800">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DETAILED ITINERARY - Main content for SEO */}
        <section id="itinerary" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Your 1 Day Maasai Mara Itinerary
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              A perfectly paced day safari designed to maximize wildlife viewing while ensuring comfort
            </p>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 transform md:translate-x-px"></div>

              {safariData.itinerary.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Time circle */}
                  <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold transform -translate-y-4 md:-translate-x-8 z-10">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-white border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <div className="text-sm text-orange-600 font-bold">{item.time}</div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING TABLE */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Transparent Pricing
            </h2>
            <p className="text-center text-gray-600 mb-10">
              No hidden fees • Best price guaranteed
            </p>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Solo */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-all">
                <div className="bg-gray-100 p-4 text-center">
                  <h3 className="font-bold text-lg">Solo Traveler</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ${safariData.price.solo}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">per person</div>
                  <Link
                    href="/booking/1-day-mara-solo"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
                  >
                    Book Solo
                  </Link>
                </div>
              </div>

              {/* Couple */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-orange-500 transform scale-105 relative">
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-bold rounded-bl-lg">
                  BEST VALUE
                </div>
                <div className="bg-orange-100 p-4 text-center">
                  <h3 className="font-bold text-lg">Couple</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ${safariData.price.couple}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">per person</div>
                  <Link
                    href="/booking/1-day-mara-couple"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
                  >
                    Book Couple
                  </Link>
                </div>
              </div>

              {/* Group of 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-all">
                <div className="bg-gray-100 p-4 text-center">
                  <h3 className="font-bold text-lg">Group of 3</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ${safariData.price.group3}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">per person</div>
                  <Link
                    href="/booking/1-day-mara-group3"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
                  >
                    Book Group
                  </Link>
                </div>
              </div>

              {/* Group 4+ */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-500 transition-all">
                <div className="bg-gray-100 p-4 text-center">
                  <h3 className="font-bold text-lg">Group 4+</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ${safariData.price.group4plus}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">per person</div>
                  <Link
                    href="/booking/1-day-mara-group4"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
                  >
                    Book Group
                  </Link>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              * Park entry fees ($80 per person) are payable separately on the day
            </p>
          </div>
        </section>

        {/* INCLUDED/EXCLUDED */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Included */}
              <div className="bg-green-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
                  <span>✓</span> What's Included
                </h3>
                <ul className="space-y-3">
                  {safariData.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-red-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
                  <span>✗</span> What's Excluded
                </h3>
                <ul className="space-y-3">
                  {safariData.excluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* OPTIONAL ACTIVITIES */}
        {safariData.optional.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4">
                Optional Add-ons
              </h2>
              <p className="text-center text-gray-600 mb-10">
                Enhance your safari experience
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {safariData.optional.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">${item.price}</div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VIDEO SECTION */}
        {safariData.video && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4">
                Watch Your Safari Experience
              </h2>
              <p className="text-center text-gray-600 mb-8">
                See what awaits you on a 1 day Maasai Mara safari
              </p>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${safariData.video.youtubeId}`}
                  title={safariData.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        {/* GALLERY */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Safari Gallery
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Real photos from our 1 day Maasai Mara safaris
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {safariData.images.gallery.map((image, index) => (
                <div key={index} className="relative h-48 rounded-lg overflow-hidden group">
                  <Image
                    src={image}
                    alt={`1 day Maasai Mara safari - Image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-yellow-400 text-2xl">★★★★★</span>
              <span className="text-xl font-bold">4.8/5</span>
              <span className="text-gray-600">(328 verified reviews)</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safariData.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.country}</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">"{review.comment}"</p>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION - For featured snippets */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Everything you need to know about your 1 day Maasai Mara safari
            </p>

            <div className="space-y-4">
              {safariData.faqs.map((faq, index) => (
                <details key={index} className="group border rounded-lg open:bg-orange-50 transition-colors">
                  <summary className="flex justify-between items-center cursor-pointer p-4 font-bold">
                    {faq.question}
                    <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-700">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-12 bg-white border-t border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl mb-2">🦁</div>
                <h3 className="font-bold">12+ Years</h3>
                <p className="text-sm text-gray-600">Safari Experience</p>
              </div>
              <div>
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="font-bold">4.8/5 Rating</h3>
                <p className="text-sm text-gray-600">328+ Reviews</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🚐</div>
                <h3 className="font-bold">Free Pickup</h3>
                <p className="text-sm text-gray-600">Nairobi Hotels</p>
              </div>
              <div>
                <div className="text-4xl mb-2">💰</div>
                <h3 className="font-bold">Best Price</h3>
                <p className="text-sm text-gray-600">Guaranteed</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="booking" className="py-16 bg-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready for Your Maasai Mara Adventure?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book your 1-day safari now and experience Kenya's best wildlife
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#pricing"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              >
                Check Prices & Book
              </Link>
              <Link
                href="https://wa.me/254XXXXXXXXX"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all"
                target="_blank"
              >
                <span>💬</span> WhatsApp Us Now
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-75">
              ✓ Instant confirmation • ✓ Free cancellation • ✓ Secure booking
            </p>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden z-50 shadow-up">
          <div className="flex gap-2">
            <Link
              href="#pricing"
              className="flex-1 bg-orange-500 text-white text-center py-3 rounded-lg font-bold"
            >
              View Prices
            </Link>
            <Link
              href="https://wa.me/254XXXXXXXXX"
              className="flex-1 bg-green-500 text-white text-center py-3 rounded-lg font-bold flex items-center justify-center gap-1"
              target="_blank"
            >
              <span>💬</span> WhatsApp
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}