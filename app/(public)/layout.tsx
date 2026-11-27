// app/(public)/layout.tsx
// Root layout for the public research tree (/accessible-tourism-research, ...).
// Provides <html> and <body> tags required by Next.js, plus shared chrome.

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
import { CookieConsent } from "@/components/CookieConsent"
import { BrandShell } from "@/app/(marketing)/_components/BrandShell"
import { getLiveSourceRatings } from "@/lib/reviews-live"
import { Toaster } from "@/components/ui/sonner"
import { WebMcpProvider } from "@/components/WebMcpProvider"
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jaetravel.co.ke"),
  title: {
    default: "JaeTravel Expeditions | Accessible Tourism Research",
    template: "%s | JaeTravel Expeditions",
  },
  description:
    "Evidence-based research on wheelchair access in the Kenya safari ecosystem. Verified accessibility data for national parks, lodges, vehicles, and tour operators.",
  alternates: {
    canonical: "https://www.jaetravel.co.ke",
  },
}

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sourceRatings = await getLiveSourceRatings()

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <Script
          id="google-preferred-source"
          strategy="lazyOnload"
          src="https://news.google.com/swg/js/v1/publisher.js"
          {...{
            "preferred-sources-control": "manual",
          }}
        />

        <Suspense fallback={null}>
          <BrandShell />
        </Suspense>

        <meta
          name="google-site-verification"
          content="KxqG_F7q2oNg53VVm3kfIKzr782vQl7AfAH7Q3X4Ssg"
        />

        <Script
          id="swg-publisher"
          src="https://news.google.com/swg/js/v1/swg.js"
          data-preferred-sources-control="manual"
          strategy="lazyOnload"
        />
      </head>

      <body className="font-sans antialiased bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Skip to main content
        </a>

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
            <main id="main-content" className="min-h-screen">
              <div className="w-full max-w-7xl">{children}</div>
            </main>
            <Footer sourceRatings={sourceRatings} />
            <AnalyticsTracker />
            <Analytics />
            <DynamicScripts />
            <CookieConsent />
            <WebMcpProvider />
            <Toaster position="top-center" richColors />
          </Suspense>
        </OrderProvider>
      </body>
    </html>
  )
}
