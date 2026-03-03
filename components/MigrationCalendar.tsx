// components/MigrationCalendar.tsx
import React from 'react';
import { CalendarDays, MapPin, Users, Sun, Cloud, CloudRain, Info } from 'lucide-react';

interface MonthData {
  month: string;
  region: string;
  event: string;
  density: 'Low' | 'Medium' | 'High' | 'Very High';
  rating: number;
  weather: string;
  temp: string;
  highlights: string[];
}

const MigrationCalendar = () => {
  const months: MonthData[] = [
    { 
      month: 'January', 
      region: 'Southern Serengeti / Ndutu', 
      event: 'Calving Season Peak', 
      density: 'High',
      rating: 5,
      weather: 'Short rains, green landscapes',
      temp: '25°C / 77°F',
      highlights: ['Thousands of newborns', 'High predator action', 'Lush green plains', 'Excellent photography']
    },
    { 
      month: 'February', 
      region: 'Southern Serengeti / Ndutu', 
      event: 'Calving Continues', 
      density: 'High',
      rating: 5,
      weather: 'Warm, isolated showers',
      temp: '26°C / 79°F',
      highlights: ['Peak calving', 'Lion prides hunting', 'Cheetah sightings', 'Fewer crowds']
    },
    { 
      month: 'March', 
      region: 'Southern/Central Serengeti', 
      event: 'Herds Begin Moving West', 
      density: 'Medium',
      rating: 4,
      weather: 'End of rains, lush',
      temp: '27°C / 81°F',
      highlights: ['Calving ends', 'Herds gathering', 'Green scenery', 'Good resident wildlife']
    },
    { 
      month: 'April', 
      region: 'Western Corridor', 
      event: 'Grumeti River Arrivals', 
      density: 'Low',
      rating: 3,
      weather: 'Long rains, green',
      temp: '25°C / 77°F',
      highlights: ['Lush landscapes', 'Fewer tourists', 'Bird watching peak', 'Dramatic skies']
    },
    { 
      month: 'May', 
      region: 'Western Corridor', 
      event: 'Grumeti River Gatherings', 
      density: 'Medium',
      rating: 3,
      weather: 'Rains ending',
      temp: '24°C / 75°F',
      highlights: ['Herds concentrate', 'First crossings试探', 'Lush vegetation', 'Good value rates']
    },
    { 
      month: 'June', 
      region: 'Western Corridor', 
      event: 'Grumeti Crossings Begin', 
      density: 'Medium',
      rating: 4,
      weather: 'Dry season starts',
      temp: '25°C / 77°F',
      highlights: ['First river crossings', 'Crocodile action', 'Clear skies', 'Good game viewing']
    },
    { 
      month: 'July', 
      region: 'Northern Serengeti', 
      event: 'Mara River Arrivals', 
      density: 'High',
      rating: 5,
      weather: 'Dry, cool mornings',
      temp: '24°C / 75°F',
      highlights: ['Mara crossings start', 'Dramatic river action', 'Excellent predator viewing', 'Peak season begins']
    },
    { 
      month: 'August', 
      region: 'Northern Serengeti', 
      event: 'Peak Mara Crossings', 
      density: 'Very High',
      rating: 5,
      weather: 'Dry, clear',
      temp: '25°C / 77°F',
      highlights: ['DRAMATIC CROSSINGS', 'Crocodile ambushes', 'Massive herds', 'World-class spectacle']
    },
    { 
      month: 'September', 
      region: 'Northern Serengeti', 
      event: 'Peak Crossings Continue', 
      density: 'Very High',
      rating: 5,
      weather: 'Dry, warm',
      temp: '27°C / 81°F',
      highlights: ['Peak drama continues', 'Non-stop action', 'Best photography', 'Premium camps']
    },
    { 
      month: 'October', 
      region: 'Northern/Central Serengeti', 
      event: 'Crossings Continue', 
      density: 'High',
      rating: 4,
      weather: 'Hot, dry',
      temp: '29°C / 84°F',
      highlights: ['Last crossings', 'Herds start moving south', 'Excellent game viewing', 'Good availability']
    },
    { 
      month: 'November', 
      region: 'Central/Eastern Serengeti', 
      event: 'Herds Spread Out', 
      density: 'Medium',
      rating: 3,
      weather: 'Short rains begin',
      temp: '27°C / 81°F',
      highlights: ['Herds dispersing', 'Green season starts', 'Fewer crowds', 'Budget-friendly']
    },
    { 
      month: 'December', 
      region: 'Southern Serengeti / Ndutu', 
      event: 'Return South, Calving Begins', 
      density: 'Medium',
      rating: 4,
      weather: 'Green season',
      temp: '26°C / 79°F',
      highlights: ['Herds return south', 'First newborns', 'Green landscapes', 'Holiday atmosphere']
    },
  ];

  const getDensityColor = (density: string) => {
    switch(density) {
      case 'Very High': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeatherIcon = (weather: string) => {
    if (weather.includes('rain')) return <CloudRain className="h-4 w-4" />;
    if (weather.includes('Dry')) return <Sun className="h-4 w-4" />;
    return <Cloud className="h-4 w-4" />;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <CalendarDays className="h-8 w-8" />
          <h3 className="text-2xl font-bold">Great Migration Calendar 2026</h3>
        </div>
        <p className="text-amber-100 max-w-3xl">
          Track the wildebeest herds month-by-month. Plan your safari for river crossings (Aug-Sep) or calving season (Jan-Mar).
        </p>
      </div>

      {/* Legend */}
      <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span>Very High Season</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          <span>High Season</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span>Medium Season</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span>Low Season</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-amber-600 font-semibold">★</span>
          <span>Rating: 1-5 stars</span>
        </div>
      </div>

      {/* Calendar Grid - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="text-left py-5 px-6 font-bold text-gray-900">Month 2026</th>
              <th className="text-left py-5 px-6 font-bold text-gray-900">Primary Region</th>
              <th className="text-left py-5 px-6 font-bold text-gray-900">Key Event</th>
              <th className="text-left py-5 px-6 font-bold text-gray-900">Crowd Density</th>
              <th className="text-left py-5 px-6 font-bold text-gray-900">Weather</th>
              <th className="text-left py-5 px-6 font-bold text-gray-900">Rating</th>
            </tr>
          </thead>
          <tbody>
            {months.map((month, index) => (
              <tr 
                key={index} 
                className={`
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                  hover:bg-amber-50/50 transition-colors border-b border-gray-100
                `}
              >
                <td className="py-5 px-6 font-semibold text-gray-900">{month.month}</td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span>{month.region}</span>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <span className="font-medium text-amber-700">{month.event}</span>
                </td>
                <td className="py-5 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDensityColor(month.density)}`}>
                    {month.density}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(month.weather)}
                    <span className="text-sm">{month.temp}</span>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < month.rating ? 'text-amber-500' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card Grid */}
      <div className="lg:hidden p-6 space-y-4">
        {months.map((month, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-xl font-bold text-gray-900">{month.month}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDensityColor(month.density)}`}>
                {month.density}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{month.region}</span>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-xl">
                <p className="font-semibold text-amber-800 text-sm">{month.event}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {getWeatherIcon(month.weather)}
                  <span>{month.temp}</span>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < month.rating ? 'text-amber-500' : 'text-gray-300'}>★</span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">HIGHLIGHTS</p>
                <div className="flex flex-wrap gap-2">
                  {month.highlights.slice(0, 3).map((highlight, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Notes */}
      <div className="px-8 py-5 bg-amber-50/50 border-t border-amber-100">
        <div className="flex items-start gap-3 text-sm text-gray-700">
          <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-1">Important Notes for 2026 Planning:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Migration patterns are natural and may vary slightly year-to-year based on rainfall</li>
              <li>Book peak months (July-October) 8-10 months in advance for best camp availability</li>
              <li>Our Kenya-based guides track daily movements and provide real-time updates</li>
              <li>Combine with Ngorongoro Crater and Tarangire for complete Northern Circuit experience</li>
              <li>Flights from Nairobi to Serengeti available daily (1.5 hours)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 border-t border-gray-200">
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">1.5M+</div>
          <div className="text-xs text-gray-600">Wildebeest</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">2X</div>
          <div className="text-xs text-gray-600">Peak vs Low Season</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">8-10</div>
          <div className="text-xs text-gray-600">Months Advance Booking</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">30+</div>
          <div className="text-xs text-gray-600">Countries Served</div>
        </div>
      </div>
    </div>
  );
};

export default MigrationCalendar;