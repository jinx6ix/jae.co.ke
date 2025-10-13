import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import Script from "next/script"
import { Suspense } from "react"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://jaetravel.com"),
  title: {
    default: "JaeTravel Expeditions | East Africa Safari Tours & Accessible Travel",
    template: "%s | JaeTravel Expeditions",
  },
  description:
    "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda. Specializing in accessible tours, gorilla trekking, and luxury wildlife adventures.",
  keywords: [
    "East Africa Safari",
    "Kenya Tours",
    "Tanzania Safari",
    "Rwanda Gorilla Trekking",
    "Uganda Safari",
    "Accessible Safari",
    "Disability Travel",
    "Wildlife Tours",
    "Masai Mara",
    "Serengeti",
  ],
  authors: [{ name: "JaeTravel Expeditions" }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jaetravel.com",
    siteName: "JaeTravel Expeditions",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description: "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JaeTravel Expeditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description: "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "hFLRkNLTiWW_pvLuqqXe-gZjop_3rJtLqKtpuxkByMc",
  },
  alternates: {
    canonical: "https://jaetravel.com",
    types: {
      "application/rss+xml": "https://jaetravel.com/blog/rss.xml",
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "JaeTravel Expeditions",
    description:
      "East Africa safari tours specializing in accessible travel, gorilla trekking, and wildlife adventures across Kenya, Tanzania, Rwanda, and Uganda.",
    url: "https://jaetravel.com",
    logo: "https://jaetravel.com/logo.png",
    image: "https://jaetravel.com/og-image.jpg",
    telephone: "+1234567890",
    email: "info@jaetravel.co.ke",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Kenya",
      addressLocality: "Nairobi",
    },
    sameAs: ["https://facebook.com/jaetravel", "https://instagram.com/jaetravel", "https://twitter.com/jaetravel"],
    priceRange: "$$-$$$",
    areaServed: ["Kenya", "Tanzania", "Rwanda", "Uganda"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Safari Tours",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Wildlife Safari Tours",
            description: "Experience the Big Five and Great Migration",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Gorilla Trekking",
            description: "Mountain gorilla encounters in Rwanda and Uganda",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Accessible Safari Tours",
            description: "Wheelchair-adapted vehicles and inclusive travel experiences",
          },
        },
      ],
    },
  }

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <Script id="google-analytics" strategy="afterInteractive">
        <meta name="google-site-verification" content="hFLRkNLTiWW_pvLuqqXe-gZjop_3rJtLqKtpuxkByMc" />
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <link rel="canonical" href="https://jaetravel.com" />
      </head>
      <body className="font-sans antialiased">
        <Suspense>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AnalyticsTracker />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
