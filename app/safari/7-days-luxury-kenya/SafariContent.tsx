// app/safari/7-days-budget-kenya/SafariContent.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Users, Camera, Sun, Coffee, Utensils, Bed, TreePine, Mountain, Ship, Eye, ChevronDown, ChevronUp } from 'lucide-react';

export default function SafariContent() {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const days = [
    {
      day: 1,
      title: "Masai Mara National Reserve",
      destination: "Masai Mara",
      accommodation: "Rhino Tourist Camp - Tented camp",
      meals: "Lunch",
      activities: ["Transfer by Road from Nairobi via Rift Valley Viewpoint", "Afternoon guided game drive in Masai Mara"],
      description: "This is where it all begins, where you join us on the first step of our journey together. Kenya has some incredible wildlife destinations, but the Masai Mara National Reserve may well be the best of them all. This classic East African landscape of savannah grasslands, rolling hills, acacia woodlands and distant escarpments is itself impressive. The Mara is known for its big cats, and this is certainly one of the best places to see lion, leopard and cheetah.",
      image: "/images/masai-mara.jpg",
      icon: <TreePine className="w-6 h-6" />
    },
    {
      day: 2,
      title: "Full Day Masai Mara Exploration",
      destination: "Masai Mara",
      accommodation: "Rhino Tourist Camp - Tented camp",
      meals: "Breakfast, Lunch & Dinner",
      activities: ["Full day guided game drive in Masai Mara National Reserve", "Wildlife viewing including Big Five"],
      description: "Spend more time exploring the stunning natural landscapes and extraordinary wildlife of the Masai Mara National Reserve. Stay in simple safari tents with canvas walls at Rhino Tourist Camp, in the Ololaimutiek region. The beds here have mosquito nets, and you're staying in an area dominated by local Maasai communities.",
      icon: <Sun className="w-6 h-6" />
    },
    {
      day: 3,
      title: "Nakuru - Lake Nakuru National Park",
      destination: "Nakuru",
      accommodation: "Buraha Zenoni Hotel & Resort",
      meals: "Breakfast, Lunch & Dinner (Packed lunch)",
      activities: ["Transfer from Masai Mara to Nakuru", "Optional: Maasai Village visit ($30 per person)"],
      description: "An important provincial city next to Lake Nakuru National Park, Nakuru is a busy place with decent restaurants and interesting street life. Buraha Zenoni Hotel & Resort combines a convenient city location with proximity to Lake Nakuru National Park; it's a less-than-ten-minute drive from the door of the hotel to the park's Lanet Gate.",
      icon: <Mountain className="w-6 h-6" />
    },
    {
      day: 4,
      title: "Naivasha - Lake Nakuru & Crescent Island",
      destination: "Naivasha",
      accommodation: "Leisure Apex Resort",
      meals: "Breakfast, Lunch & Dinner (Packed lunch)",
      activities: ["Early morning game drive in Lake Nakuru National Park", "Transfer to Naivasha", "Boat ride on Lake Naivasha", "Guided walking safari at Crescent Island"],
      description: "Combine gorgeous scenery (waterfalls, escarpment, acacia forests and a pretty lake) with amazing wildlife at Lake Nakuru National Park. Among the animals you might see are rhinos, flamingos, Rothschild's giraffes and tree-climbing lions.",
      icon: <Ship className="w-6 h-6" />
    },
    {
      day: 5,
      title: "Amboseli National Park - Land of Giants",
      destination: "Amboseli",
      accommodation: "Manjaro Tented Camp",
      meals: "Breakfast, Lunch & Dinner (Packed lunch)",
      activities: ["Morning boat ride on Lake Naivasha", "Guided walk at Crescent Island Game Park", "Transfer to Amboseli National Park"],
      description: "It's possible that you'll never want to leave Amboseli National Park. It's a remarkable place that combines wonderful wildlife viewing with astonishing views of Mt Kilimanjaro (5895m), Africa's tallest mountain. Amboseli is known for its population of big-tusked elephants that you can often get really close to.",
      icon: <Eye className="w-6 h-6" />
    },
    {
      day: 6,
      title: "Full Day Amboseli Exploration",
      destination: "Amboseli",
      accommodation: "Manjaro Tented Camp",
      meals: "Breakfast, Lunch & Dinner",
      activities: ["Full day game drive in Amboseli National Park", "Elephant viewing with Kilimanjaro backdrop", "Bird watching - over 400 species"],
      description: "You'll return to Amboseli National Park for more wildlife photos with Mt Kilimanjaro as a backdrop. Look for lions and cheetahs, zebras and giraffes, spotted hyenas and wildebeest. Best of all when it comes to animals, Amboseli is known for its population of big-tusked elephants.",
      icon: <Camera className="w-6 h-6" />
    },
    {
      day: 7,
      title: "Journey Back to Nairobi",
      destination: "Nairobi",
      accommodation: "No accommodation",
      meals: "Breakfast & Lunch (Packed lunch)",
      activities: ["Transfer by Road from Amboseli to Nairobi", "Drop-off at hotel or airport"],
      description: "It's a pity that it has to end, but this is where your safari will draw to a close. We're sure that you will return home with so many exciting and happy memories, and we hope that you will join us again on safari sometime in the future.",
      icon: <Calendar className="w-6 h-6" />
    }
  ];

  const itinerary = [
    { day: 1, destination: "Masai Mara National Reserve", accommodation: "Rhino Tourist Camp (Tented camp, 4x Double Room)", meals: "Lunch" },
    { day: 2, destination: "Masai Mara National Reserve", accommodation: "Rhino Tourist Camp (Tented camp, 4x Double Room)", meals: "Breakfast, Lunch & Dinner" },
    { day: 3, destination: "Nakuru", accommodation: "Buraha Zenoni Hotel & Resort (Hotel, 4x Double Room)", meals: "Breakfast, Lunch & Dinner (Packed lunch)" },
    { day: 4, destination: "Naivasha", accommodation: "Leisure Apex Resort (Hotel, 4x Double Room)", meals: "Breakfast, Lunch & Dinner (Packed lunch)" },
    { day: 5, destination: "Amboseli National Park", accommodation: "Manjaro Tented Camp (Tented camp, 4x Double Room)", meals: "Breakfast, Lunch & Dinner (Packed lunch)" },
    { day: 6, destination: "Amboseli National Park", accommodation: "Manjaro Tented Camp (Tented camp, 4x Double Room)", meals: "Breakfast, Lunch & Dinner" },
    { day: 7, destination: "Nairobi", accommodation: "No accommodation", meals: "Breakfast & Lunch (Packed lunch)" }
  ];

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Letter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-8 border-orange-400 transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Dear Mr/Ms,</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Thank you for giving us the opportunity to prepare this custom-made quote for your Best of Kenya 7 Days Budget Shared Safari 2026-August.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          As you can see from our detailed proposal, your tour begins in Nairobi on <span className="font-bold text-green-700">August 12, 2026</span> and runs for 7 days and 6 nights.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Please let us know if you have any questions, or if you would like any further details.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed">We hope to hear from you soon.</p>
        <p className="mt-6 font-bold text-green-800">Best regards,</p>
        <p className="text-gray-600">Jae Travel Expeditions Team</p>
      </div>

      {/* Tour Dates Banner */}
      <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-xl p-6 mb-8 flex flex-wrap justify-between items-center animate-pulse-slow">
        <div className="flex items-center gap-2">
          <Calendar className="text-green-700" />
          <span className="font-semibold text-gray-800">Start Tour:</span>
          <span className="text-gray-700">Wednesday, August 12, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-orange-600" />
          <span className="font-semibold text-gray-800">End Tour:</span>
          <span className="text-gray-700">Tuesday, August 18, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="text-green-700" />
          <span className="font-semibold text-gray-800">Group Size:</span>
          <span className="text-gray-700">4-8 Travelers</span>
        </div>
      </div>

      {/* Day by Day Interactive Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
          <h2 className="text-2xl font-bold">Day by Day Itinerary</h2>
          <p className="text-green-100 text-sm">Start Destination: Nairobi | End Destination: Nairobi</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800">Days</th>
                <th className="p-3 text-left font-semibold text-gray-800">Main Destination</th>
                <th className="p-3 text-left font-semibold text-gray-800">Accommodation</th>
                <th className="p-3 text-left font-semibold text-gray-800">Meal Plan</th>
              </tr>
            </thead>
            <tbody>
              {itinerary.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-green-50/30 transition-colors cursor-pointer" onClick={() => toggleDay(item.day)}>
                  <td className="p-3 font-medium text-green-700">Day {item.day}</td>
                  <td className="p-3">{item.destination}</td>
                  <td className="p-3 text-sm">{item.accommodation}</td>
                  <td className="p-3 text-sm">{item.meals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Days with Accordion */}
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <TreePine className="text-orange-500" />
          Detailed Safari Experience
        </h2>
        {days.map((day) => (
          <div key={day.day} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full p-5 text-left flex justify-between items-center bg-gradient-to-r from-white to-green-50/30 hover:to-green-100/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">{day.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {day.destination} | <Bed className="w-3 h-3" /> {day.accommodation}
                  </p>
                </div>
              </div>
              {expandedDay === day.day ? <ChevronUp className="text-orange-500" /> : <ChevronDown className="text-orange-500" />}
            </button>
            {expandedDay === day.day && (
              <div className="p-5 border-t border-gray-100 animate-fadeIn">
                <p className="text-gray-700 leading-relaxed mb-4">{day.description}</p>
                <div className="bg-orange-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <Utensils className="w-4 h-4" /> Meal Plan
                  </h4>
                  <p className="text-gray-700">{day.meals}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Activities
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {day.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Map and Route Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <MapPin className="text-orange-500" />
          Safari Route Map
        </h3>
        <div className="bg-gradient-to-br from-green-100 to-orange-100 rounded-xl h-64 flex items-center justify-center relative overflow-hidden">
          <div className="text-center">
            <TreePine className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="text-gray-600">Interactive route map placeholder</p>
            <p className="text-sm text-gray-500">Nairobi → Masai Mara → Nakuru → Naivasha → Amboseli → Nairobi</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-orange-500 to-green-500"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="font-bold text-green-800">Start Point</p>
            <p className="text-gray-700">Nairobi</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="font-bold text-orange-800">Key Destinations</p>
            <p className="text-gray-700">Masai Mara (2 nights) → Nakuru (1 night) → Naivasha (1 night) → Amboseli (2 nights)</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="font-bold text-green-800">End Point</p>
            <p className="text-gray-700">Nairobi</p>
          </div>
        </div>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">✓</span> Included
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ All accommodations (6 nights)</li>
            <li>✓ All activities as indicated in itinerary</li>
            <li>✓ All transportation in safari Land Cruiser (shared basis)</li>
            <li>✓ Meals as specified (6 Breakfasts, 6 Lunches, 5 Dinners)</li>
            <li>✓ All park entry fees</li>
            <li>✓ Boat ride on Lake Naivasha</li>
            <li>✓ Guided walking safari at Crescent Island</li>
            <li>✓ Drinking water throughout the safari</li>
            <li>✓ Taxes and VAT</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">✗</span> Excluded
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>✗ International flights</li>
            <li>✗ Additional accommodation before/after tour</li>
            <li>✗ Personal items (souvenirs, travel insurance, visa fees)</li>
            <li>✗ Tips (guideline: $10 per person per day)</li>
            <li>✗ Optional activities (Maasai Village visit - $30)</li>
          </ul>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4">
          <h3 className="text-xl font-bold">Pricing Breakdown</h3>
          <p className="text-orange-100">7 Days / 6 Nights | Valid for August 12-18, 2026</p>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Option</th>
              <th className="p-3 text-left">Per Person Rate</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">4x Per Person Sharing rate</td>
              <td className="p-3">$1,490.00</td>
              <td className="p-3">$5,960.00</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">6x Per Person Sharing rate</td>
              <td className="p-3 font-bold text-green-700">$1,355.00</td>
              <td className="p-3">$8,130.00</td>
            </tr>
            <tr className="border-t bg-green-50">
              <td className="p-3 font-bold" colSpan={2}>Total in USD</td>
              <td className="p-3 font-bold text-green-700">$14,090.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Details */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-800 mb-4">Payment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Account Name:</p>
            <p className="text-gray-700">Jae Travel Expeditions Ltd</p>
          </div>
          <div>
            <p className="font-semibold">Account No.:</p>
            <p className="text-gray-700">0730285271126</p>
          </div>
          <div>
            <p className="font-semibold">Bank Name:</p>
            <p className="text-gray-700">Equity Bank</p>
          </div>
          <div>
            <p className="font-semibold">Branch:</p>
            <p className="text-gray-700">Ngong</p>
          </div>
          <div>
            <p className="font-semibold">Swift Code:</p>
            <p className="text-gray-700">EQBLKENA</p>
          </div>
          <div>
            <p className="font-semibold">Bank Code / Branch:</p>
            <p className="text-gray-700">68 / 073</p>
          </div>
        </div>
      </div>

      {/* Optional Activities */}
      <div className="bg-orange-50 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-orange-800 mb-4">Optional Activities (Not Included)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-100">
                <th className="p-3 text-left">Option</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">How to Book</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-orange-200">
                <td className="p-3">Day 3: Visit Maasai Village</td>
                <td className="p-3">Maasai Village</td>
                <td className="p-3 font-semibold">$30.00 Per person</td>
                <td className="p-3">Book with us anytime</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}