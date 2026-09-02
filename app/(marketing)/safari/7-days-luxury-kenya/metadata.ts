import { Metadata } from "next";

export const metadata: Metadata = {
  title: "7 Days Budget Kenya Safari 2026 | Mara, Nakuru & Amboseli",
  
  description:
    "7-day Kenya safari: Maasai Mara, Lake Nakuru, Naivasha & Amboseli. Game drives, boat safari & park fees included. From $1,355.",

  keywords: [
    "7 days Kenya safari",
    "Kenya safari package",
    "Africa safari 7 days",
    "Masai Mara safari tour",
    "Amboseli safari package",
    "budget African safari",
    "Kenya safari cost",
    "group safari Africa",
    "wildlife safari Kenya",
    "7 day safari itinerary Africa",
  ].join(", "),

  alternates: {
    canonical: "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
    languages: {
      en: "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
      "en-US": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
      "en-GB": "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
      es: "https://www.jaetravel.co.ke/es/safari/7-days-budget-kenya",
      fr: "https://www.jaetravel.co.ke/fr/safari/7-days-budget-kenya",
      de: "https://www.jaetravel.co.ke/de/safari/7-days-budget-kenya",
    },
  },

  openGraph: {
    title: "7 Days Kenya Safari | Maasai Mara to Amboseli",
    description:
      "Explore Maasai Mara, Lake Nakuru, Naivasha & Amboseli on a 7-day safari. Wildlife, game drives & iconic landscapes.",
    url: "https://www.jaetravel.co.ke/safari/7-days-budget-kenya",
    siteName: "Jae Travel Expeditions",
    images: [
      {
        url: "https://www.jaetravel.co.ke/images/og/7-days-budget-kenya.jpg",
        width: 1200,
        height: 630,
        alt: "Kenya safari with elephants in Amboseli and Kilimanjaro",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "7 Days Kenya Safari | Budget Package",
    description:
      "Affordable 7-day African safari with Maasai Mara, Nakuru & Amboseli. From $1,355.",
    images: [
      "https://www.jaetravel.co.ke/images/og/7-days-budget-kenya.jpg",
    ],
    creator: "@jaetravel",
    site: "@jaetravel",
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
};