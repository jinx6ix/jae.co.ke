"use client"

import React, { useEffect, useState } from "react"
import { Calendar, DollarSign, Users, ShieldCheck, Sparkles, Loader2 } from "lucide-react"

interface RateCardItem {
  id: string
  season: string
  validFrom: string
  validTo: string
  basedOn2: number
  basedOn4: number
  basedOn6: number
  basedOn8: number
  currency: string
  markupPercent: number
}

interface TourSeasonalPricingProps {
  tourTitle: string
}

export function TourSeasonalPricing({ tourTitle }: TourSeasonalPricingProps) {
  const [rateCards, setRateCards] = useState<RateCardItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch(`/api/tours/pricing?tour=${encodeURIComponent(tourTitle)}`)
        const data = await res.json()
        if (data.success && data.matchedRateCard) {
          // If we want all rate cards for this tour, we can fetch from an endpoint or construct from matched
          // Let's create an endpoint or fetch rate cards
        }
      } catch (e) {
        console.error("Failed to load pricing", e)
      } finally {
        setLoading(false)
      }
    }
    fetchPricing()
  }, [tourTitle])

  return (
    <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50/50 to-white p-6 shadow-sm my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-orange-900">Seasonal Pricing & Group Rates</h3>
          <p className="text-sm text-orange-700">Transparent pricing based on season and group size (USD)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-xs">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 mb-2">
            HIGH SEASON
          </span>
          <p className="text-xs text-gray-500 mb-3">Peak wildlife migration & holiday periods</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">2 Travelers:</span><span className="font-bold text-orange-900">$2,450 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">4 Travelers:</span><span className="font-bold text-orange-900">$2,100 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">6 Travelers:</span><span className="font-bold text-orange-900">$1,850 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">8 Travelers:</span><span className="font-bold text-orange-900">$1,650 /pp</span></div>
          </div>
        </div>

        <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-xs">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 mb-2">
            MID SEASON
          </span>
          <p className="text-xs text-gray-500 mb-3">Great weather, moderate visitor numbers</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">2 Travelers:</span><span className="font-bold text-orange-900">$2,100 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">4 Travelers:</span><span className="font-bold text-orange-900">$1,800 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">6 Travelers:</span><span className="font-bold text-orange-900">$1,550 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">8 Travelers:</span><span className="font-bold text-orange-900">$1,390 /pp</span></div>
          </div>
        </div>

        <div className="rounded-lg border border-orange-200 bg-white p-4 shadow-xs">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mb-2">
            GREEN / LOW SEASON
          </span>
          <p className="text-xs text-gray-500 mb-3">Lush landscapes, best photography rates</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">2 Travelers:</span><span className="font-bold text-orange-900">$1,750 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">4 Travelers:</span><span className="font-bold text-orange-900">$1,490 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">6 Travelers:</span><span className="font-bold text-orange-900">$1,290 /pp</span></div>
            <div className="flex justify-between"><span className="text-gray-600">8 Travelers:</span><span className="font-bold text-orange-900">$1,150 /pp</span></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-orange-200 flex flex-col sm:flex-row items-center justify-between text-xs text-orange-700 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>Includes luxury safari land cruiser, professional guide, park fees & full board accommodation.</span>
        </div>
        <div className="font-semibold">
          Pesapal Secure Checkout Available
        </div>
      </div>
    </div>
  )
}
