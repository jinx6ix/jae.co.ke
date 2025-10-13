import { Tour } from '@/data/tours';

interface TourDetailsProps {
  tour: Tour;
}

export default function TourDetails({ tour }: TourDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Tour Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
        <p className="text-gray-600 mb-4">{tour.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h3 className="font-semibold text-gray-900">Destination</h3>
            <p className="text-gray-600">{tour.country}, {tour.region}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Rating</h3>
            <p className="text-gray-600">⭐ {tour.rating} ({tour.reviewCount} reviews)</p>
          </div>
          {tour.duration && (
            <div>
              <h3 className="font-semibold text-gray-900">Duration</h3>
              <p className="text-gray-600">{tour.duration}</p>
            </div>
          )}
          {tour.difficulty && (
            <div>
              <h3 className="font-semibold text-gray-900">Difficulty</h3>
              <p className="text-gray-600">{tour.difficulty}</p>
            </div>
          )}
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
        <div className="prose prose-sm max-w-none">
          {tour.itinerary.split('.').filter(day => day.trim()).map((day, index) => (
            <div key={index} className="mb-3">
              <strong>Day {index + 1}:</strong> {day.trim()}.
            </div>
          ))}
        </div>
      </div>

      {/* What's Included */}
      {(tour.included || tour.excluded) && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tour.included && (
              <div>
                <h3 className="font-semibold text-green-600 mb-2">Included</h3>
                <ul className="space-y-2">
                  {Array.isArray(tour.included) ? (
                    tour.included.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600">{tour.included}</li>
                  )}
                </ul>
              </div>
            )}
            
            {tour.excluded && (
              <div>
                <h3 className="font-semibold text-red-600 mb-2">Not Included</h3>
                <ul className="space-y-2">
                  {Array.isArray(tour.excluded) ? (
                    tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-red-500 mr-2">✗</span>
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600">{tour.excluded}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Highlights */}
      {tour.highlights && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(tour.highlights) ? (
              tour.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">★</span>
                  <span className="text-gray-600">{highlight}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">{tour.highlights}</p>
            )}
          </div>
        </div>
      )}

      {/* Accessibility Features for Disability Tours */}
      {(tour.slug.includes('accessible') || tour.slug.includes('disability')) && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-3">♿ Accessibility Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-blue-800">Wheelchair-accessible vehicles</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-blue-800">Accessible accommodations</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-blue-800">Adapted facilities</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">✓</span>
              <span className="text-blue-800">Trained staff</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}