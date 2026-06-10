"use client";

import { Calendar, Users, MapPin, Clock, DollarSign } from "lucide-react";

export default function TourOverview({ tour }: { tour: any }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Tour-Übersicht</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-600">
          <DollarSign className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium">Preis</p>
            <p className="text-2xl font-bold text-gray-900">${tour.price}</p>
            {tour.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                ${tour.originalPrice}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Clock className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium">Dauer</p>
            <p>{tour.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Users className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium">Gruppengröße</p>
            <p>{tour.groupSize}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium">Land</p>
            <p>{tour.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium">Abfahrt</p>
            <p>{tour.departure}</p>
          </div>
        </div>
      </div>
    </div>
  );
}