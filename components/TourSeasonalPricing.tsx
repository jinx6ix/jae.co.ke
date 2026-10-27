import React from "react"
import { Calendar, DollarSign, Users, ShieldCheck, Sparkles, AlertCircle } from "lucide-react"

interface RateCardItem {
  id: string
  season: string
  validFrom: string | Date
  validTo: string | Date
  basedOn2: number
  basedOn4: number
  basedOn6: number
  basedOn8: number
  basedOn9?: number | null
  basedOn10?: number | null
  basedOn12?: number | null
  currency: string
  markupPercent: number
  includes?: string | null
  excludes?: string | null
  notes?: string | null
}

interface TourSeasonalPricingProps {
  tourTitle?: string
  rateCards?: RateCardItem[]
}

export function TourSeasonalPricing({ tourTitle, rateCards = [] }: TourSeasonalPricingProps) {
  if (!rateCards || rateCards.length === 0) {
    return (
      <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50/50 to-white p-6 shadow-sm my-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-900">Seasonal Pricing & Group Rates</h3>
            <p className="text-sm text-orange-700">Transparent per-person sharing rates (USD)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-4 bg-white rounded-lg border border-orange-100 text-orange-800 text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600" />
          <span>Detailed seasonal rate cards for {tourTitle || 'this tour'} are currently being updated or require direct confirmation. Please contact our team for a custom quote.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50/50 to-white p-6 shadow-sm my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-orange-900">Seasonal Pricing & Group Rates</h3>
          <p className="text-sm text-orange-700">Transparent per-person sharing pricing (USD)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {rateCards.map((rc) => {
          const seasonName = rc.season || 'SEASON';
          const currency = rc.currency || 'USD';
          const fromDate = rc.validFrom ? new Date(rc.validFrom).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
          const toDate = rc.validTo ? new Date(rc.validTo).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

          return (
            <div key={rc.id} className="rounded-lg border border-orange-200 bg-white p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                    seasonName.toUpperCase() === 'HIGH' ? 'bg-red-100 text-red-700' :
                    seasonName.toUpperCase() === 'MID' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {seasonName.toUpperCase()} SEASON
                  </span>
                  {fromDate && toDate && (
                    <span className="text-[11px] text-gray-500 font-medium">
                      {fromDate} – {toDate}
                    </span>
                  )}
                </div>
                {rc.notes && (
                  <p className="text-xs text-gray-500 mb-3">{rc.notes}</p>
                )}

                <div className="space-y-1.5 text-sm mt-3">
                  {rc.basedOn2 != null && rc.basedOn2 > 0 ? (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">2 Travelers:</span>
                      <span className="font-bold text-orange-900">{currency} {rc.basedOn2.toLocaleString()} /pp</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 text-xs text-gray-400">
                      <span>2 Travelers:</span>
                      <span>Requires Quote</span>
                    </div>
                  )}

                  {rc.basedOn4 != null && rc.basedOn4 > 0 ? (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">4 Travelers:</span>
                      <span className="font-bold text-orange-900">{currency} {rc.basedOn4.toLocaleString()} /pp</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 text-xs text-gray-400">
                      <span>4 Travelers:</span>
                      <span>Requires Quote</span>
                    </div>
                  )}

                  {rc.basedOn6 != null && rc.basedOn6 > 0 ? (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">6 Travelers:</span>
                      <span className="font-bold text-orange-900">{currency} {rc.basedOn6.toLocaleString()} /pp</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 text-xs text-gray-400">
                      <span>6 Travelers:</span>
                      <span>Requires Quote</span>
                    </div>
                  )}

                  {rc.basedOn8 != null && rc.basedOn8 > 0 ? (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">8 Travelers:</span>
                      <span className="font-bold text-orange-900">{currency} {rc.basedOn8.toLocaleString()} /pp</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 text-xs text-gray-400">
                      <span>8 Travelers:</span>
                      <span>Requires Quote</span>
                    </div>
                  )}

                  {rc.basedOn10 != null && rc.basedOn10 > 0 && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">10 Travelers:</span>
                      <span className="font-bold text-orange-900">{currency} {rc.basedOn10.toLocaleString()} /pp</span>
                    </div>
                  )}

                  {rc.basedOn12 != null && rc.basedOn12 > 0 && (
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">12 Travelers:</span>
                      <span className="font-bold text-orange-900">{currency} {rc.basedOn12.toLocaleString()} /pp</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-orange-200 flex flex-col sm:flex-row items-center justify-between text-xs text-orange-700 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>Rates are per person sharing. Includes safari vehicle, professional guide, park fees & full board accommodation where specified.</span>
        </div>
        <div className="font-semibold">
          Pesapal Secure Checkout Available
        </div>
      </div>
    </div>
  )
}
