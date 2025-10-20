import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book Now | Vehicle Rental & Transfers | JaeTravel Expeditions',
  description: 'Book luxury vehicle rentals, airport transfers, and private transportation across East Africa. 24/7 service with professional drivers.',
  keywords: 'vehicle rental, airport transfer, private driver, East Africa transport, luxury cars, Nairobi transfers',
};

export default function BookNowPage() {
  const services = [
    {
      title: 'Airport Transfers',
      description: 'Nairobi Wilson & JKIA to any destination',
      icon: '✈️',
      price: 'From $50',
    },
    {
      title: 'Vehicle Rental',
      description: 'Luxury SUVs, Minivans & 4x4s',
      icon: '🚙',
      price: 'From $120/day',
    },
    {
      title: 'Private Driver',
      description: 'Professional English-speaking drivers',
      icon: '👨‍💼',
      price: 'From $80/day',
    },
    {
      title: 'Corporate Travel',
      description: 'Group transfers & executive service',
      icon: '🏢',
      price: 'Custom Quote',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Button asChild variant="ghost" className="mb-8 text-white hover:bg-white/20">
            <Link href="/" className="flex items-center gap-2 hover:text-white/90">
              <ArrowLeft className="h-4 w-4" />
              Back to Tours
            </Link>
          </Button>

          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Vehicle Rental & Transfers
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Luxury vehicles • Professional drivers • 24/7 service across East Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-white/90 text-lg px-8 py-3 font-semibold shadow-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: +254 726 485 228
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3">
                <Mail className="w-5 h-5 mr-2" />
                Email Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Services Grid */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/50">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Transportation Services</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Need reliable transportation? We offer luxury vehicles with professional drivers for airport transfers, 
                private tours, corporate events, and long-distance travel across Kenya, Tanzania, and Uganda.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="font-semibold text-green-600 text-lg">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Get Your Free Quote</h3>
                  <p className="text-purple-100 mb-6">Response within 15 minutes</p>
                  <div className="space-y-3 text-purple-100">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <span>+254 726 485 228</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      <span>info@jaetravel.co.ke</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" />
                      <span>24/7 Service</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      <span>Nairobi, Kenya</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-white/90 shadow-lg"
                  >
                    <Link href="https://wa.me/+254726485228?text=Hi!%20I%20need%20transportation%20services">
                      WhatsApp Quote
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/30 hover:bg-white/10"
                  >
                    <Link href="/contact">Contact Form</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/50">
              <div className="relative h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-6">🚙</div>
                    <h2 className="text-4xl font-bold mb-4">Luxury Fleet</h2>
                    <p className="text-xl opacity-90">Mercedes, Toyota Land Cruiser, Toyota Hiace</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🔒',
                  title: 'Fully Insured',
                  description: 'Comprehensive vehicle & passenger coverage',
                },
                {
                  icon: '🧹',
                  title: 'Clean & Sanitized',
                  description: 'Daily deep cleaning & disinfection',
                },
                {
                  icon: '⭐',
                  title: '5-Star Drivers',
                  description: 'Professional, licensed, English-speaking',
                },
                {
                  icon: '⚡',
                  title: '24/7 Availability',
                  description: 'Emergency roadside assistance included',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Book Your Transfer?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Get instant confirmation and track your driver in real-time
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-600 hover:bg-white/90 text-xl px-12 py-4 font-semibold shadow-2xl"
            >
              <Link href="tel:+254726485228">
                <Phone className="w-6 h-6 mr-2" />
                Call Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 hover:bg-white/10 text-xl px-12 py-4"
            >
              <Link href="https://wa.me/+254726485228">
                WhatsApp
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-green-100 text-sm">
            📍 Pick-up anywhere in Nairobi • 🚙 Luxury vehicles • ⭐ 5-star service
          </p>
        </div>
      </div>
    </div>
  );
}