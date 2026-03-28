import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { generateSafariSchema } from './schema';
import { metadata as pageMetadata } from './metadata';
import SafariClientWrapper from './SafariClientWrapper';

// Export metadata for Next.js
export { pageMetadata as metadata };

// Generate static params for dynamic routes if needed
export async function generateStaticParams() {
  return [];
}

// Server component - fetches data and handles SEO
export default function OneDayMaasaiMaraPage() {
  const safariData = {
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
        day: 1,
        time: "4:30 AM - 5:00 AM",
        title: "Pickup from Nairobi Hotel",
        description: "Early morning pickup from your Nairobi hotel or residence. Our driver-guide will meet you at the lobby. Brief introduction and safety orientation before departure.",
        icon: "🚐",
        image: "/pickup.jpg",
        imageAlt: "Safari vehicle pickup from Nairobi hotel for Maasai Mara day trip"
      },
      {
        day: 1,
        time: "5:00 AM - 8:30 AM",
        title: "Drive to Maasai Mara via Great Rift Valley",
        description: "Depart Nairobi and drive through the beautiful Kenyan countryside. Stop at the Great Rift Valley viewpoint for stunning photos and stretch break.",
        icon: "🏞️",
        image: "/great-rift-valley.jpg",
        imageAlt: "Great Rift Valley viewpoint scenic stop on Nairobi to Maasai Mara drive"
      },
      {
        day: 1,
        time: "8:30 AM - 12:30 PM",
        title: "Morning Game Drive",
        description: "Enter Maasai Mara National Reserve. Begin your game drive spotting lions, elephants, giraffes, zebras, and more. Your guide will share insights about wildlife behavior.",
        icon: "🦁",
        image: "/morning-game-drive.jpg",
        imageAlt: "Lion in Maasai Mara during morning game drive safari"
      },
      {
        day: 1,
        time: "12:30 PM - 1:30 PM",
        title: "Picnic Lunch in the Wild",
        description: "Enjoy a delicious packed lunch at a designated picnic site within the reserve, surrounded by the African savannah. Vegetarian options available.",
        icon: "🥪",
        image: "/picnic-lunch.jpg",
        imageAlt: "Picnic lunch setup in Maasai Mara savannah with wildlife view"
      },
      {
        day: 1,
        time: "1:30 PM - 4:00 PM",
        title: "Afternoon Game Drive",
        description: "Continue exploring different areas of the park. Visit the Mara River to spot hippos and crocodiles. Search for cheetahs, leopards, and other predators.",
        icon: "📸",
        image: "/afternoon-game-drive.jpg",
        imageAlt: "Elephant herd at Mara River during afternoon game drive"
      },
      {
        day: 1,
        time: "4:00 PM - 7:30 PM",
        title: "Return Journey to Nairobi",
        description: "Begin the drive back to Nairobi, with a short break along the way. Arrive in the evening and get dropped off at your hotel with unforgettable memories.",
        icon: "🌇",
        image: "/sunset-return.jpg",
        imageAlt: "Sunset over African savannah during return journey from Maasai Mara"
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
      hero: "/hero.jpg",
      gallery: [
        "/gallery-1.jpg",
        "/gallery-2.jpg",
        "/gallery-3.jpg",
        "/gallery-4.jpg",
        "/gallery-5.jpg",
        "/gallery-6.jpg",
        "/gallery-7.jpg",
      ]
    },
    video: {
      youtubeId: "jwMhdq_Z_DM",
      title: "1 Day Maasai Mara Safari Experience"
    },
    pdfUrl: "/pdfs/1-day-maasai-mara-itinerary.pdf"
  };

  return (
    <>
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSafariSchema()) }}
      />
      
      <SafariClientWrapper safariData={safariData} />
    </>
  );
}