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
  metadataBase: new URL("https://jaetravel.co.ke"),
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
    url: "https://jaetravel.co.ke",
    siteName: "JaeTravel Expeditions",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description:
      "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
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
    description:
      "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
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
    google: "KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg",
  },
  alternates: {
    canonical: "https://jaetravel.co.ke",
    types: {
      "application/rss+xml": "https://jaetravel.co.ke/blog/rss.xml",
    },
  },
  generator: "v0.app",
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
    url: "https://jaetravel.co.ke",
    logo: "https://jaetravel.co.ke/logo.png",
    image: "https://jaetravel.co.ke/og-image.jpg",
    telephone: "+254726485228",
    email: "info@jaetravel.co.ke",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Kenya",
      addressLocality: "Nairobi",
    },
    sameAs: [
      "https://www.facebook.com/JaeTravelExpeditions",
      "https://www.instagram.com/jaetravelexpeditions/",
      "https://www.tiktok.com/@jaetravelexpeditions",
    ],
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
            description:
              "Wheelchair-adapted vehicles and inclusive travel experiences",
          },
        },
      ],
    },
  }

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="q74t4ci2dZznctEH4t8jCA" async></script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-52G2X6L5');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Optional: Google Analytics (if using GA4) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2YLERP8F8B"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2YLERP8F8B', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <meta
          name="google-site-verification"
          content="KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg"
        />
        <link rel="canonical" href="https://jaetravel.co.ke" />
      </head>

      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52G2X6L5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
