'use client';

import { useState } from 'react';
import { Tour } from '@/data/tours';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  tour: Tour;
}

interface BookingResponse {
  success: boolean;
  bookingId: string;
  message: string;
  emailsSent?: boolean;
  whatsappLink?: string;
  pdfUrl?: string;
}

export default function BookingForm({ tour }: BookingFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelers: 1,
    startDate: '',
    specialRequirements: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceName: tour.title,
          serviceSlug: tour.bookingSlug,
          totalPrice: tour.price * formData.travelers,
          currency: tour.currency,
          country: tour.country,
          duration: tour.duration,
        }),
      });

      const result: BookingResponse = await response.json();

      if (result.success) {
        setMessage({
          type: 'success',
          text: result.message,
        });

        // Auto-redirect to confirmation page after 2 seconds
        setTimeout(() => {
          router.push(`/booking-confirmation/${result.bookingId}`);
        }, 2000);

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          travelers: 1,
          startDate: '',
          specialRequirements: '',
        });
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setMessage({
        type: 'error',
        text: 'Booking failed. Please try again or contact us directly.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = tour.price * formData.travelers;
  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.phone && formData.startDate && formData.travelers > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
          {message.type === 'success' && (
            <div className="mt-2 text-sm">
              <a
                href="https://wa.me/+254726485228"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline font-medium"
              >
                📱 Contact us on WhatsApp
              </a>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="+254 7xx xxx xxx"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travelers *
          </label>
          <select
            name="travelers"
            id="travelers"
            required
            value={formData.travelers}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'person' : 'people'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
            disabled={isLoading}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
          Special Requirements (Optional)
        </label>
        <textarea
          name="specialRequirements"
          id="specialRequirements"
          rows={3}
          value={formData.specialRequirements}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          placeholder="Dietary restrictions, accessibility needs, room preferences, etc..."
        />
      </div>

      {/* Price Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl">💰</span> Price Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 font-medium">{tour.title}</span>
            <span className="text-lg font-semibold text-gray-900">
              {tour.currency} {tour.price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-gray-200">
            <span className="text-gray-600">Travelers × {formData.travelers}</span>
            <span className="text-gray-700">× {tour.currency} {tour.price.toLocaleString()}</span>
          </div>
          <div className="border-t-2 border-blue-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total</span>
              <span className="text-3xl font-extrabold text-blue-600">
                {tour.currency} {totalPrice.toLocaleString()}
              </span>
            </div>
            {tour.isOnOffer && tour.originalPrice && (
              <p className="text-sm text-green-600 mt-1">
                💸 You save {tour.currency} {(tour.originalPrice - tour.price).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
          isFormValid && !isLoading
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing Booking...
          </>
        ) : (
          <>
            <span className="text-xl">✈️</span>
            Complete Booking - Secure & Fast
          </>
        )}
      </button>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          🔒 Secure booking powered by JaeTravel Expeditions
        </p>
        <p className="text-xs text-gray-400 mt-1">
          You'll receive a confirmation email and PDF within minutes
        </p>
      </div>
    </form>
  );
}