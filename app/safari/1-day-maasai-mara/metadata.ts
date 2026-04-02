import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1 Day Maasai Mara Safari (2026) | Best Kenya Day Trip",

  description:
    "Book the best 1 Day Maasai Mara Safari from Nairobi. Full-day game drive, Big Five wildlife, expert guide, packed lunch & hotel pickup. From $180.",

  keywords:
    "1 day Maasai Mara safari, Maasai Mara day trip, Nairobi to Maasai Mara, Kenya day safari, one day safari Kenya, Maasai Mara from Nairobi, day safari Nairobi, Maasai Mara game drive, budget day safari Kenya, Nairobi day trips, Kenya safari day tour",

  authors: [{ name: "JaeTravel Expeditions", url: "https://www.jaetravel.co.ke" }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  category: "travel",
  classification: "Safari Tours",
  applicationName: "Jae Travel Expeditions",

  alternates: {
    canonical: "https://www.jaetravel.co.ke/safari/1-day-maasai-mara",
    languages: {
      "en-US": "https://www.jaetravel.co.ke/safari/1-day-maasai-mara",
      "en-GB": "https://www.jaetravel.co.ke/safari/1-day-maasai-mara",
      "x-default": "https://www.jaetravel.co.ke/safari/1-day-maasai-mara",
    },
  },

  openGraph: {
    title: "1 Day Maasai Mara Safari from Nairobi – Luxury Game Drive",
    description:
      "Unforgettable one-day safari in Kenya's Maasai Mara. See the Big Five, full game drive with expert guide, packed lunch & Nairobi hotel pickup. From $180.",
    url: "https://www.jaetravel.co.ke/safari/1-day-maasai-mara",
    siteName: "Jae Travel Expeditions",
    images: [
      {
        url: "https://www.jaetravel.co.ke/1-day-maasai-mara.jpg",
        width: 1200,
        height: 630,
        alt: "Maasai Mara Safari",
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
    description:
      "Big Five game drive + lunch included. From $180. Expert guide & hotel pickup.",
    images: ["https://www.jaetravel.co.ke/1-day-maasai-mara.jpg"],
  },

  other: {
    "og:image:secure_url": "https://www.jaetravel.co.ke/1-day-maasai-mara.jpg",
    "og:image:alt": "1 Day Maasai Mara Safari Kenya Big Five",
    "twitter:label1": "Starting Price",
    "twitter:data1": "$180",
    "twitter:label2": "Duration",
    "twitter:data2": "1 Day",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  manifest: "/manifest.json",
};