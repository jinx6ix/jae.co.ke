// app/safari/7-days-budget-kenya/BookingWidget.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, DollarSign, Phone, MessageCircle, Send, CheckCircle } from 'lucide-react';

export default function BookingWidget() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    travelers: '2',
    date: '2026-08-12'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="text-orange-400" />
              Ready for Your Safari Adventure?
            </h2>
            <p className="text-green-200 text-lg">
              Book your Best of Kenya 7 Days Budget Shared Safari today. Limited spots available for August 2026!
            </p>
            <div className="bg-green-700/50 rounded-lg p-4 inline-block">
              <p className="text-sm text-green-200">Reference Number: #2026-0089.1</p>
              <p className="text-2xl font-bold text-orange-300">From $1,355 per person</p>
            </div>
            <div className="flex gap-4 pt-4">
              <Link
                href="https://wa.me/254700000000"
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Link>
              <Link
                href="mailto:jaetravelexpeditions@gmail.com"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
                Email Us
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-800">
            {isSubmitted ? (
              <div className="text-center py-8 animate-fadeIn">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700">Request Sent!</h3>
                <p className="text-gray-600 mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-green-800 mb-4">Request a Booking</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Users className="w-4 h-4" /> Travelers
                      </label>
                      <select
                        title='Number of Travelers'
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="1">1 Traveler</option>
                        <option value="2">2 Travelers</option>
                        <option value="3">3 Travelers</option>
                        <option value="4">4 Travelers</option>
                        <option value="5">5 Travelers</option>
                        <option value="6">6 Travelers</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Start Date
                      </label>
                      <input
                        title='Start Date'
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02]"
                  >
                    Send Request
                  </button>
                </form>
                <p className="text-xs text-gray-500 text-center mt-4">
                  No commitment. We'll send you a confirmation and payment details.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </section>
  );
}