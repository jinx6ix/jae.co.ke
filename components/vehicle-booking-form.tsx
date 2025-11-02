"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

interface VehicleBookingFormProps {
  vehicleName: string;
  pricePerDay: number;
  vehicleId: string | number; // Accept string or number
}

export function VehicleBookingForm({ vehicleName, pricePerDay, vehicleId }: VehicleBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate rental days
  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      const diff = returnDate.getTime() - pickup.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const totalPrice = calculateDays() * pricePerDay;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Google Analytics: Begin Checkout
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "begin_checkout", {
          event_category: "Vehicle Booking",
          event_label: vehicleName,
          value: totalPrice,
          currency: "USD",
        });
      }

      // Send to correct API route: /api/vehicle-hire/[vehicleId]/route.ts
      const response = await fetch(`/api/vehicle-hire/${vehicleId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleName,
          vehicleId,
          ...formData,
          totalPrice,
          days: calculateDays(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit booking");
      }

      // Google Analytics: Purchase
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "purchase", {
          event_category: "Vehicle Booking",
          event_label: vehicleName,
          value: totalPrice,
          currency: "USD",
          transaction_id: result.bookingId,
        });
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Booking error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success UI
  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-green-800">Booking Request Sent!</h3>
        <p className="mb-4 text-green-700">
          Thank you, <strong>{formData.name}</strong>! We've received your request for the{" "}
          <strong>{vehicleName}</strong>.
        </p>
        <p className="mb-6 text-sm text-green-600">
          Our team will confirm availability and send you payment details within <strong>24 hours</strong>.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
          Book Another Vehicle
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-orange-200 bg-orange-50/50 p-6 shadow-sm">
      <div>
        <h3 className="mb-2 text-2xl font-bold text-orange-800">Book {vehicleName}</h3>
        <p className="text-sm text-orange-700">
          Fill in your details. We’ll confirm availability and send you a payment link.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 text-orange-800">
            <User className="h-4 w-4" />
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="mt-1 border-orange-300 focus:border-orange-500"
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 text-orange-800">
            <Mail className="h-4 w-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="mt-1 border-orange-300 focus:border-orange-500"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 text-orange-800">
            <Phone className="h-4 w-4" />
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+254 726 485 228"
            className="mt-1 border-orange-300 focus:border-orange-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="pickupDate" className="flex items-center gap-2 text-orange-800">
              <Calendar className="h-4 w-4" />
              Pickup Date *
            </Label>
            <Input
              id="pickupDate"
              name="pickupDate"
              type="date"
              value={formData.pickupDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="mt-1 border-orange-300 focus:border-orange-500"
            />
          </div>
          <div>
            <Label htmlFor="returnDate" className="flex items-center gap-2 text-orange-800">
              <Calendar className="h-4 w-4" />
              Return Date *
            </Label>
            <Input
              id="returnDate"
              name="returnDate"
              type="date"
              value={formData.returnDate}
              onChange={handleChange}
              required
              min={formData.pickupDate || new Date().toISOString().split("T")[0]}
              className="mt-1 border-orange-300 focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="pickupLocation" className="text-orange-800">
            Pickup Location *
          </Label>
          <Input
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            placeholder="Nairobi Airport, Serena Hotel, etc."
            className="mt-1 border-orange-300 focus:border-orange-500"
          />
        </div>

        <div>
          <Label htmlFor="message" className="flex items-center gap-2 text-orange-800">
            <MessageSquare className="h-4 w-4" />
            Special Requests (Optional)
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Driver needed, child seat, GPS, etc."
            className="mt-1 min-h-[100px] border-orange-300 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Price Summary */}
      {calculateDays() > 0 && (
        <div className="rounded-lg bg-orange-100 p-4 border border-orange-300">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-orange-700">Rental Duration:</span>
            <span className="font-semibold">{calculateDays()} day{calculateDays() > 1 ? "s" : ""}</span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-orange-700">Price per Day:</span>
            <span className="font-semibold">${pricePerDay}</span>
          </div>
          <div className="flex justify-between border-t border-orange-300 pt-2">
            <span className="font-bold text-orange-800">Total Estimate:</span>
            <span className="text-2xl font-bold text-orange-600">${totalPrice}</span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
        disabled={isSubmitting || calculateDays() === 0}
      >
        {isSubmitting ? "Sending Request..." : "Request Booking"}
      </Button>

      <p className="text-center text-xs text-orange-700">
        By submitting, you agree to our{" "}
        <a href="/terms" className="underline">
          terms
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        . Final price confirmed by team.
      </p>
    </form>
  );
}