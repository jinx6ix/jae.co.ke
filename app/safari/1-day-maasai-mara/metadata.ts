// app/safari/1-day-maasai-mara/metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Title: 60 characters max
  title: "1 Day Maasai Mara Safari from Nairobi (2026) | Best Kenya Day Trip",
  
  // Description: 115 characters max
  description: "Book the best 1 day Maasai Mara safari from Nairobi. Full-day game drive, Big Five guaranteed, packed lunch included. Free cancellation. From $180.",
  
  // Keywords - Comprehensive
  keywords: [
    "1 day Maasai Mara safari",
    "Maasai Mara day trip",
    "Nairobi to Maasai Mara day trip",
    "Kenya day safari",
    "one day safari Kenya",
    "Maasai Mara from Nairobi",
    "day safari Nairobi",
    "Maasai Mara day tour",
    "budget day safari Kenya",
    "Nairobi day trips",
    "Kenya day tours",
    "Maasai Mara game drive",
    "day trip to Maasai Mara",
    "1 day Kenya safari",
    "Nairobi day safari",
    "Mara day trip",
    "cheap day safari Kenya",
    "affordable Maasai Mara tour",
    "last minute Mara safari",
    "Maasai Mara day excursion"
  ].join(", "),

  authors: [{ name: "Jae Travel Expeditions", url: "https://jaetravel.co.ke" }],
  creator: "Jae Travel Expeditions",
  publisher: "Jae Travel Expeditions",
  metadataBase: new URL("https://jaetravel.co.ke"),
  category: "travel",
  classification: "Safari Tours",
  applicationName: "Jae Travel Expeditions",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // Alternative URLs
  alternates: {
    canonical: "https://jaetravel.co.ke/safari/1-day-maasai-mara",
    languages: {
      'en-US': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
      'en-GB': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
      'en-AU': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
      'en-CA': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
      'x-default': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
    },
  },

  // Open Graph
  openGraph: {
    title: "1 Day Maasai Mara Safari from Nairobi - Best Day Trip 2026",
    description: "Experience Kenya's famous Maasai Mara in just one day. Full-day game drive, expert guides, and Big Five sightings. Book online!",
    url: "https://jaetravel.co.ke/safari/1-day-maasai-mara",
    siteName: "Jae Travel Expeditions",
    images: [
      {
        url: "https://jaetravel.co.ke/images/og/1-day-maasai-mara.jpg",
        width: 1200,
        height: 630,
        alt: "1 Day Maasai Mara Safari - Game drive with lions in Kenya",
        type: "image/jpeg",
        secureUrl: "https://jaetravel.co.ke/images/og/1-day-maasai-mara.jpg",
      },
    ],
    locale: "en_US",
    type: "website",
    emails: ["info@jaetravel.co.ke"],
    phoneNumbers: ["+254726485228"],
    countryName: "Kenya",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "1 Day Maasai Mara Safari from Nairobi",
    description: "Book your 1-day Maasai Mara safari. Best price guaranteed!",
    images: ["https://jaetravel.co.ke/images/twitter/1-day-maasai-mara.jpg"],
    site: "@jaetravel",
    creator: "@jaetravel",
    siteId: "123456789",
    creatorId: "123456789",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      "noimageindex": false,
      "notranslate": false,
    },
    nocache: false,
  },

  // Verification
  verification: {
    google: "KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      "facebook-domain-verification": "facebook-verification-code",
    },
  },

  // Apple and mobile
  appleWebApp: {
    capable: true,
    title: "Jae Travel - 1 Day Mara Safari",
    statusBarStyle: "black-translucent",
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/shortcut-icon.png'],
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Other
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  
  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  
  // Theme color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#ea580c" },
  ],
  
  // Color scheme
  colorScheme: "light dark",
  
  // Other metadata
  assets: ["/images/safaris/1-day-mara/"],
  
  // Book information
 
};