// app/(marketing)/layout.tsx
//
// Root layout for the public marketing tree (/, /tours, /blog,
// /itinerary-builder, …). Server Component.
//
// What this layout owns:
//   * Fonts (Playfair Display + Inter via next/font).
//   * Static metadata (title/description, OpenGraph, Twitter,
//     hreflang alternates, geo meta). Kept as a static `metadata`
//     export so it serialises into the HTML <head> at build /
//     revalidate time without any per-request work.
//   * The brand shell — JSON-LD TravelAgency + WebSite graph, and
//     the canonical / hreflang <link> tags — via the
//     `BrandShell` server component, which resolves the live
//     logo + og-image URLs through `getBrandUrl` (1h
//     `unstable_cache`, tag `media`).
//   * GTM, GA4, Ahrefs scripts (head-only, afterInteractive).
//   * The client `Header` for nav (the logo block inside it
//     is fine; the heavy `HeaderWithLogo` is available for
//     places that need a true server-rendered logo).
//   * The two floating buttons: Create Quotation (bottom-right)
//     and Google Preferred Source (bottom-right, 4rem above
//     it). Both are mounted at the root so they appear on every
//     marketing page without each route having to remember.
//   * Sonner Toaster for the toasts the floating buttons throw.

import type React from "react"
import type { Viewport } from "next"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Suspense } from "react"
import { OrderProvider } from "@/components/OrderContext"
import DynamicScripts from "@/components/DynamicScripts"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { GooglePreferredSource } from "@/components/GooglePreferredSource"
import { CreateQuotationButton } from "@/components/create-quotation-button"
import { BrandShell } from "./_components/BrandShell"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
    { media: "(prefers-color-scheme: dark)", color: "#ea580c" },
  ],
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const BASE = "https://www.jaetravel.co.ke"

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
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
    "Great Migration",
    "wheelchair safari Kenya",
  ],
  authors: [{ name: "JaeTravel Expeditions", url: BASE }],
  creator: "JaeTravel Expeditions",
  publisher: "JaeTravel Expeditions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "JaeTravel Expeditions",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description:
      "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    images: [
      {
        url: `${BASE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "JaeTravel Expeditions - East Africa Safari Tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jaetravelkenya",
    creator: "@jaetravelkenya",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description:
      "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    images: [`${BASE}/og-image.jpg`],
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
  verification: { google: "KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg" },
  alternates: {
    canonical: BASE,
    languages: {
      en: BASE,
      fr: `${BASE}/fr`,
      de: `${BASE}/de`,
      it: `${BASE}/it`,
      hi: `${BASE}/hi`,
      ar: `${BASE}/ar`,
      zh: `${BASE}/zh`,
      "x-default": BASE,
    },
    types: { "application/rss+xml": `${BASE}/blog/rss.xml` },
  },
  other: {
    "geo.region": "KE-30",
    "geo.placename": "Nairobi, Kenya",
    "geo.position": "-1.286389;36.817223",
    ICBM: "-1.286389, 36.817223",
    "og:locale:alternate": ["fr_FR", "de_DE", "it_IT", "hi_IN", "ar_AE", "zh_CN"].join(", "),
  },
}

const GTM_ID = "GTM-52G2X6L5"
const GA_ID = "G-2YLERP8F8B"

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />

                {/* ---------------------------------------------------------------- */}
        {/* GOOGLE PREFERRED SOURCE                                           */}
        {/* ---------------------------------------------------------------- */}

        <Script
          id="google-preferred-source"
          strategy="afterInteractive"
          src="https://news.google.com/swg/js/v1/publisher.js"
          {...{
            "preferred-sources-control": "manual",
          }}
        />


        {/* Brand JSON-LD + canonical / hreflang tags.
            Server-rendered so the live logo / og URLs are baked in. */}
        <Suspense fallback={null}>
          <BrandShell />
        </Suspense>

        {/* Google site verification */}
        <meta
          name="google-site-verification"
          content="KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg"
        />

        {/* Ahrefs Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="q74t4ci2dZznctEH4t8jCA"
          defer
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true,transport_type:'beacon'});`,
          }}
        />

        {/* Subscribe-with-Google publisher client. Loaded with
            `data-preferred-sources-control="manual"` so the SwG
            library doesn't auto-open the opt-in — our
            `GooglePreferredSource` button calls
            `addPreferredSource()` on click. */}
        <Script
          id="swg-publisher"
          src="https://news.google.com/swg/js/v1/swg.js"
          data-preferred-sources-control="manual"
          strategy="afterInteractive"
        />
      </head>

      <body className="font-sans antialiased bg-background text-foreground">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <OrderProvider>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
              </div>
            }
          >
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

            {/* Floating buttons — z-index 2147483600 lives in
                each component, so they sit on top of the Sonner
                Toaster and the Google merchant widget. */}
            <CreateQuotationButton />
            <GooglePreferredSource />

            <Toaster position="top-center" richColors />
          </Suspense>
        </OrderProvider>
      </body>
    </html>
  )
}
