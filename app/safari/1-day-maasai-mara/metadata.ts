// app/safari/1-day-maasai-mara/metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "1 Day Maasai Mara Safari from Nairobi (2026) | Best Kenya Day Trip",

  description: "Book the best 1 Day Maasai Mara Safari from Nairobi. Full-day game drive, Big Five wildlife, expert guide, packed lunch & hotel pickup. From $180.",

  keywords: [
    "1 day Maasai Mara safari", "Maasai Mara day trip", "Nairobi to Maasai Mara", "Kenya day safari",
    "one day safari Kenya", "Maasai Mara from Nairobi", "day safari Nairobi", "Maasai Mara game drive",
    "budget day safari Kenya", "Nairobi day trips", "Kenya safari day tour"
  ].join(", "),

  authors: [{ name: "Jae Travel Expeditions", url: "https://jaetravel.co.ke" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://jaetravel.co.ke"),
  category: "travel",
  classification: "Safari Tours",
  applicationName: "Jae Travel Expeditions",

  alternates: {
    canonical: "https://jaetravel.co.ke/safari/1-day-maasai-mara",
    languages: {
      'en-US': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
      'en-GB': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
      'x-default': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
    },
  },

  // Open Graph – Optimized for WhatsApp / Facebook rich preview (like Muthu hotel)
  openGraph: {
    title: "1 Day Maasai Mara Safari from Nairobi – Luxury Game Drive",
    description: "Unforgettable one-day safari in Kenya's Maasai Mara. See the Big Five, full game drive with expert guide, packed lunch & Nairobi hotel pickup. From $180.",
    url: "https://jaetravel.co.ke/safari/1-day-maasai-mara",
    siteName: "Jae Travel Expeditions",
    images: [
      {
        url: "https://jaetravel.co.ke/1-day-maasai-mara.jpg",
        width: 1200,
        height: 630,
        alt: "1 Day Maasai Mara Safari - Lions and wildlife on game drive in Kenya",
        type: "image/jpeg",
      },
      {
        url: "https://jaetravel.co.ke/1-day-maasai-mara-2.jpg",
        width: 1200,
        height: 630,
        alt: "Maasai Mara landscape with safari vehicle and elephants during day trip",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Kenya",
    emails: ["info@jaetravel.co.ke"],
    phoneNumbers: ["+254726485228"],
  },

  twitter: {
    card: "summary_large_image",
    title: "1 Day Maasai Mara Safari from Nairobi",
    description: "Big Five game drive + lunch included. From $180. Expert guide & hotel pickup.",
    images: ["https://jaetravel.co.ke/1-day-maasai-mara.jpg"],
  },

  // Additional meta for better indexing
  other: {
    "og:image:secure_url": "https://jaetravel.co.ke/1-day-maasai-mara.jpg",
    "og:image:alt": "1 Day Maasai Mara Safari Kenya Big Five",
    "twitter:label1": "Starting Price",
    "twitter:data1": "$180",
    "twitter:label2": "Duration",
    "twitter:data2": "1 Day",
  },

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

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },

  manifest: '/manifest.json',

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#ea580c" },
  ],
};