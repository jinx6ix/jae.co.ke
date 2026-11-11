"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      // Read the query string from the live URL instead of
      // `useSearchParams()`. `useSearchParams` opts the enclosing
      // Suspense boundary into client-side rendering, which stripped
      // every page's server-rendered HTML (0 <h1>/<img>/<nav> tags in
      // the built output). Reading `window.location` keeps the whole
      // page statically rendered and still reports the same path.
      const search = window.location.search
      window.gtag("config", "G-2YLERP8F8B", {
        page_path: pathname + (search ? search : ""),
      })
    }
  }, [pathname])

  useEffect(() => {
    // Track scroll depth
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      )

      if (scrollPercentage > maxScroll && scrollPercentage % 25 === 0) {
        maxScroll = scrollPercentage
        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "engagement",
            event_label: `${scrollPercentage}%`,
            value: scrollPercentage,
          })
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return null
}

export function trackBookingClick(tourName: string, tourPrice: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "booking_click", {
      event_category: "conversion",
      event_label: tourName,
      value: tourPrice,
    })
  }
}

export function trackTourView(tourName: string, tourCountry: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "tour_view", {
      event_category: "engagement",
      event_label: tourName,
      tour_country: tourCountry,
    })
  }
}
