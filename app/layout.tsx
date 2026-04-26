// app/layout.tsx — reads x-locale header from custom server
import type React from "react";
import type { Viewport } from "next";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import Script from "next/script";
import { Suspense } from "react";
import AsyncCSSInitializer from "@/components/AsyncCSSInitializer";
import { OrderProvider } from "@/components/OrderContext";
import DynamicScripts from "@/components/DynamicScripts";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { headers } from "next/headers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#ea580c" },
  ],
};

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", preload: true });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: true });

const BASE = "https://www.jaetravel.co.ke";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "JaeTravel Expeditions | East Africa Safari Tours & Accessible Travel",
    template: "%s | JaeTravel Expeditions",
  },
  description: "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda. Specializing in accessible tours, gorilla trekking, and luxury wildlife adventures.",
  keywords: ["East Africa Safari","Kenya Tours","Tanzania Safari","Rwanda Gorilla Trekking","Uganda Safari","Accessible Safari","Disability Travel","Wildlife Tours","Masai Mara","Serengeti","Great Migration","wheelchair safari Kenya"],
  authors: [{ name: "JaeTravel Expeditions", url: BASE }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "JaeTravel Expeditions",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description: "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    images: [{ url: `${BASE}/og-image.jpg`, width: 1200, height: 630, alt: "JaeTravel Expeditions - East Africa Safari Tours" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jaetravelkenya",
    creator: "@jaetravelkenya",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description: "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    images: [`${BASE}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg" },
  alternates: {
    canonical: BASE,
    languages: {
      "en":       BASE,
      "fr":       `${BASE}/fr`,
      "de":       `${BASE}/de`,
      "it":       `${BASE}/it`,
      "hi":       `${BASE}/hi`,
      "ar":       `${BASE}/ar`,
      "zh":       `${BASE}/zh`,
      "x-default": BASE,
    },
    types: { "application/rss+xml": `${BASE}/blog/rss.xml` },
  },
  other: {
    "geo.region": "KE-30",
    "geo.placename": "Nairobi, Kenya",
    "geo.position": "-1.286389;36.817223",
    "ICBM": "-1.286389, 36.817223",
    "og:locale:alternate": ["fr_FR", "de_DE", "it_IT", "hi_IN", "ar_AE", "zh_CN"].join(", "),
  },
};

const GTM_ID = "GTM-52G2X6L5";
const GA_ID = "G-2YLERP8F8B";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${BASE}/#organization`,
      name: "JaeTravel Expeditions",
      alternateName: ["Jae Travel Kenya","JaeTravel Safaris","JaeTravel Accessible Safari"],
      description: "East Africa safari tours specializing in accessible travel, gorilla trekking, and wildlife adventures across Kenya, Tanzania, Rwanda, and Uganda.",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png`, width: 512, height: 512 },
      image: `${BASE}/og-image.jpg`,
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: { "@type": "PostalAddress", addressCountry: "KE", addressLocality: "Nairobi", addressRegion: "Nairobi County" },
      geo: { "@type": "GeoCoordinates", latitude: -1.286389, longitude: 36.817223 },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "07:00", closes: "20:00",
      },
      sameAs: [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/jaetravelexpeditions/",
        "https://www.tiktok.com/@jaetravelexpeditions",
        "https://wa.me/254726485228",
      ],
      priceRange: "$$-$$$",
      currenciesAccepted: "USD, EUR, GBP, KES",
      paymentAccepted: "Cash, Credit Card, Bank Transfer, PayPal",
      areaServed: ["Kenya","Tanzania","Rwanda","Uganda","South Africa","UAE","India","UK","USA","France","Germany","Italy","China"],
      knowsLanguage: ["English","French","German","Italian","Hindi","Arabic","Chinese","Swahili"],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5", reviewCount: "723" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "East Africa Safari Tours",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Wildlife Safari Tours", description: "Big Five and Great Migration" } },
          { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Gorilla Trekking", description: "Mountain gorilla encounters in Rwanda and Uganda" } },
          { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Accessible Safari Tours", description: "Wheelchair-adapted vehicles and inclusive travel" } },
          { "@type": "Offer", itemOffered: { "@type": "TouristTrip", name: "Budget Safari Tours", description: "Affordable Kenya safaris from $450" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "JaeTravel Expeditions",
      publisher: { "@id": `${BASE}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE}/tours?search={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["en","fr","de","it","hi","ar","zh"],
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "en";
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />

        <link rel="alternate" hrefLang="en" href={BASE} />
        <link rel="alternate" hrefLang="fr" href={`${BASE}/fr`} />
        <link rel="alternate" hrefLang="de" href={`${BASE}/de`} />
        <link rel="alternate" hrefLang="it" href={`${BASE}/it`} />
        <link rel="alternate" hrefLang="hi" href={`${BASE}/hi`} />
        <link rel="alternate" hrefLang="ar" href={`${BASE}/ar`} />
        <link rel="alternate" hrefLang="zh" href={`${BASE}/zh`} />
        <link rel="alternate" hrefLang="x-default" href={BASE} />

        <JsonLd id="org-schema" data={organizationSchema} />

        <script src="https://analytics.ahrefs.com/analytics.js" data-key="q74t4ci2dZznctEH4t8jCA" defer />

        <meta name="google-site-verification" content="KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg" />

        <Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');` }} />
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <Script id="ga4-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true,transport_type:'beacon'});` }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
        </noscript>
        <AsyncCSSInitializer />
        <OrderProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" /></div>}>
            <div className="header-wrapper">
              <Header />
            </div>
            <main className="min-h-screen flex justify-center">
              <div className="w-full max-w-7xl">{children}</div>
            </main>
            <Footer />
            <AnalyticsTracker />
            <Analytics />
            <DynamicScripts />
          </Suspense>
        </OrderProvider>
      </body>
    </html>
  );
}