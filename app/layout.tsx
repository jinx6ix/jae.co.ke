import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import Script from "next/script"
import { Suspense } from "react"

// Fonts with optimized loading
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jaetravel.co.ke"),
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
    url: "https://www.jaetravel.co.ke",
    siteName: "JaeTravel Expeditions",
    title: "JaeTravel Expeditions | East Africa Safari Tours",
    description:
      "Discover unforgettable safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
    images: [
      {
        url: "https://www.jaetravel.co.ke/og-image.jpg",
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
    images: ["https://www.jaetravel.co.ke/og-image.jpg"],
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
    canonical: "https://www.jaetravel.co.ke",
    languages: {
      'en': 'https://www.jaetravel.co.ke',
      'en-US': 'https://www.jaetravel.co.ke',
      'en-GB': 'https://www.jaetravel.co.ke',
      'en-AU': 'https://www.jaetravel.co.ke',
      'en-CA': 'https://www.jaetravel.co.ke',
      'x-default': 'https://www.jaetravel.co.ke',
    },
    types: {
      "application/rss+xml": "https://www.jaetravel.co.ke/blog/rss.xml",
    },
  },
  generator: "v0.app",
}

// Extract only critical CSS from your globals.css
const criticalCSS = `
  /* Critical Reset & Base Styles */
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; }
  body { 
    line-height: 1.5; 
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale;
    font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
    background-color: #ffffff;
    color: #1a202c;
  }
  img, picture, video, canvas, svg { display: block; max-width: 100%; }
  input, button, textarea, select { font: inherit; }
  p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
  
  /* Critical color variables for above-the-fold */
  :root {
    --font-playfair: ${playfair.style.fontFamily};
    --font-inter: ${inter.style.fontFamily};
    --background: #ffffff;
    --foreground: #1a202c;
    --primary: #f97316; /* Vibrant orange from your palette */
    --primary-foreground: #ffffff;
    --border: #e5e7eb;
    --muted: #f9fafb;
    --muted-foreground: #6b7280;
    --radius: 0.625rem;
  }
  
  /* Critical container & spacing */
  .min-h-screen { min-height: 100vh; }
  
  /* Critical header/navigation */
  .header-wrapper { 
    position: sticky; 
    top: 0; 
    z-index: 50; 
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }
  
  /* Critical typography */
  h1, h2, h3, h4, .font-serif { 
    font-family: var(--font-playfair), Georgia, serif; 
  }
  
  /* Critical buttons - above the fold */
  .btn-primary {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary);
    color: var(--primary-foreground);
    font-weight: 600;
    border-radius: var(--radius);
    text-decoration: none;
    transition: background-color 0.2s;
    border: none;
    cursor: pointer;
  }
  
  .btn-primary:hover { 
    background-color: #ea580c; /* Darker orange */
  }
  
  /* Critical skeleton loading */
  .skeleton-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes skeleton-pulse {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Critical navigation hover effects */
  .nav-item { position: relative; }
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    transition: width 0.3s ease;
  }
  
  .nav-item:hover::after { width: 100%; }
  
  /* Critical border styles */
  * { border-color: var(--border); }
  
  /* Mobile critical styles */
  @media (max-width: 768px) {
    .mobile-hidden { display: none; }
    .mobile-menu { transform: translateX(-100%); }
    .mobile-menu.active { transform: translateX(0); }
  }
`

// Component to handle async CSS loading
const AsyncCSS = () => (
  <>
    {/* Load globals.css asynchronously */}
    <link 
      rel="preload" 
      href="/_next/static/css/app/layout.css" 
      as="style"
      onLoad={(e: any) => {
        e.target.onload = null
        e.target.rel = 'stylesheet'
      }}
    />
    <noscript>
      <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
    </noscript>
  </>
)

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
    url: "https://www.jaetravel.co.ke",
    logo: "https://www.jaetravel.co.ke/logo.png",
    image: "https://www.jaetravel.co.ke/og-image.jpg",
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
    areaServed: ["Kenya", "Tanzania", "Rwanda", "Uganda", "South Africa", "UAE", "USA", "UK"],
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JaeTravel Expeditions",
    alternateName: "JaeTravel Expeditions",
    url: "https://www.jaetravel.co.ke",
  }

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Inline Critical CSS - Eliminates render-blocking */}
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{ __html: criticalCSS }}
        />
        
        {/* Async loading of non-critical CSS */}
        <AsyncCSS />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.jaetravel.co.ke" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Deferred Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          defer
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          defer
        />

        {/* Ahrefs Analytics - Deferred */}
        <script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="q74t4ci2dZznctEH4t8jCA" 
          defer 
        />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-52G2X6L5');
          `}
        </Script>

        {/* Google Analytics GA4 */}
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
              transport_type: 'beacon'
            });
          `}
        </Script>

        <meta name="google-site-verification" content="KxqG_F7q2oNg53VVm3kfIKz782vQl7AfAH7Q3X4Ssg" />
        
        {/* Preload hero image - Update with your actual hero image */}
        <link 
          rel="preload" 
          href="/images/hero-safari.jpg" 
          as="image" 
          type="image/jpeg"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        
        {/* Preload LCP image if different */}
        <link 
          rel="preload" 
          as="image"
          href="/images/hero-banner.jpg"
          imageSrcSet="/images/hero-banner.jpg 1920w, /images/hero-banner-mobile.jpg 768w"
          imageSizes="100vw"
        />
      </head>

      <body className="font-sans antialiased bg-background text-foreground">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52G2X6L5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm-noscript"
          />
        </noscript>

        <Suspense 
          fallback={
            <div className="min-h-screen flex flex-col items-center justify-center">
              <div className="skeleton-loading w-24 h-24 rounded-full mb-6"></div>
              <div className="text-center">
                <div className="skeleton-loading h-5 w-48 mb-3 rounded"></div>
                <div className="skeleton-loading h-3 w-32 rounded"></div>
              </div>
            </div>
          }
        >
          <div className="header-wrapper">
            <Header />
          </div>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <AnalyticsTracker />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}