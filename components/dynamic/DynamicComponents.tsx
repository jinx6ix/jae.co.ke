"use client"

import dynamic from "next/dynamic"
import { ReactNode } from "react"

// Dynamic imports with loading states
export const MigrationCalendar = dynamic(
  () => import("@/components/MigrationCalendar"),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />
  }
)

export const LiveWildlifeReport = dynamic(
  () => import("@/components/LiveWildlifeReport"),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
  }
)

export const FaqSection = dynamic(
  () => import("@/components/FaqSection"),
  {
    ssr: true,
    loading: () => <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />
  }
)

export const TrustBadges = dynamic(
  () => import("@/components/TrustBadges"),
  {
    ssr: true,
    loading: () => <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
  }
)

export const TourCard = dynamic(
  () => import("@/components/TourCard"),
  {
    ssr: true,
    loading: () => <div className="h-[400px] bg-gray-100 rounded-xl animate-pulse" />
  }
)