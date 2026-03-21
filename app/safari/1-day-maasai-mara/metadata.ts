// app/safari/1-day-maasai-mara/metadata.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  // Primary title with keyword-rich format
  title: "1 Day Maasai Mara Safari from Nairobi (2026) | Best Day Trip Kenya",
  
  // Meta description with keywords, emojis, and CTAs (160 chars optimal)
  description: "✓ Book the best 1 day Maasai Mara safari from Nairobi. Full-day game drive ✓ Big Five guaranteed ✓ Packed lunch included ✓ Free cancellation. From $180.",
  
  // Keywords for search engines (comma-separated)
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
    "Maasai Mara game drive"
  ].join(", "),

  // Authorship
  authors: [{ name: "Jae Travel Expeditions", url: "https://jaetravel.co.ke" }],
  
  // Publisher
  publisher: "Jae Travel Expeditions",

  // Open Graph for social media
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
        alt: "1 Day Maasai Mara Safari - Game drive with lions",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "1 Day Maasai Mara Safari from Nairobi",
    description: "Book your 1-day Maasai Mara safari. Best price guaranteed!",
    images: ["https://jaetravel.co.ke/images/twitter/1-day-maasai-mara.jpg"],
    creator: "@jaetravel",
    site: "@jaetravel",
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
    },
  },

  // Canonical URL
  alternates: {
    canonical: "https://jaetravel.co.ke/safari/1-day-maasai-mara",
    languages: {
      'en-US': 'https://jaetravel.co.ke/safari/1-day-maasai-mara',
    },
  },

  // Verification for Google Search Console
  verification: {
    google: "KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg",
  },

  // Category
  category: "travel",

  // Other metadata
  applicationName: "Jae Travel Expeditions",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  // Theme color
  themeColor: "#f97316",
};