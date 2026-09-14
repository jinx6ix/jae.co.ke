// app/api/vehicle-hire/[vehicleId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendBookingEmails, BookingEmailInput } from '@/lib/email/booking-emails';
import { v4 as uuidv4 } from 'uuid';


export async function POST(request: NextRequest) {
  let bookingData: any;

  try {
    bookingData = await request.json();
    const { searchParams } = new URL(request.url);
    const vehicleId = searchParams.get('vehicleId') || bookingData.vehicleId?.toString();

    const bookingId = `VH${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`; // VH = Vehicle Hire
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // === CALCULATE DAYS & TOTAL ===
    const pickup = new Date(bookingData.pickupDate);
    const returnDate = new Date(bookingData.returnDate);
    const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerDay = parseFloat(bookingData.pricePerDay || bookingData.totalPrice / days);
    const totalPrice = days * pricePerDay;

    // === PDF URLs ===
    const clientPdfUrl = `${baseUrl}/api/vehicle-hire/${vehicleId}/download?${new URLSearchParams({
      bookingId,
      name: encodeURIComponent(bookingData.name),
      email: encodeURIComponent(bookingData.email),
      phone: encodeURIComponent(bookingData.phone),
      vehicle: encodeURIComponent(bookingData.vehicleName),
      pickupDate: bookingData.pickupDate,
      returnDate: bookingData.returnDate,
      pickupLocation: encodeURIComponent(bookingData.pickupLocation),
      days: days.toString(),
      total: totalPrice.toString(),
      recipient: bookingData.email,
    })}`;

    const adminPdfUrl = `${baseUrl}/api/vehicle-hire/${vehicleId}/download?${new URLSearchParams({
      bookingId,
      name: encodeURIComponent(bookingData.name),
      email: encodeURIComponent(bookingData.email),
      phone: encodeURIComponent(bookingData.phone),
      vehicle: encodeURIComponent(bookingData.vehicleName),
      pickupDate: bookingData.pickupDate,
      returnDate: bookingData.returnDate,
      pickupLocation: encodeURIComponent(bookingData.pickupLocation),
      days: days.toString(),
      total: totalPrice.toString(),
      recipient: 'info@jaetravel.co.ke',
    })}`;

    // === WhatsApp Links ===
    const adminWhatsApp = `https://wa.me/254726485228`;
    const customerWhatsApp = `https://wa.me/${bookingData.phone.replace(/[^0-9]/g, '').replace(/^0/, '254')}`;

    // === SEND EMAILS ===
    const emailStatus = await sendBookingEmails({
      bookingId,
      bookingKind: 'vehicle',
      customer: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
      },
      service: {
        name: bookingData.vehicleName,
        startDate: bookingData.pickupDate,
        travelers: 1,
        totalPrice: totalPrice,
        specialRequirements: bookingData.message,
      },
      pdfUrl: clientPdfUrl,
      adminPdfUrl: adminPdfUrl,
      customerWhatsApp: customerWhatsApp,
      adminWhatsApp: adminWhatsApp,
    });

    console.log(`Vehicle Booking ${bookingId} COMPLETE → Status:`, emailStatus);

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking request received!',
      emailStatus,
      pdfUrl: clientPdfUrl,
      whatsappLink: adminWhatsApp,
    });

  } catch (error: any) {
    console.error('[Vehicle Hire API] ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Booking failed. Contact us.' },
      { status: 500 }
    );
  }
}
