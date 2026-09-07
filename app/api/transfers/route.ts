// app/api/transfers/route.ts
//
// Airport / vehicle transfer endpoint. POSTed by the public site's
// transfer form. Confirmation copies are sent to:
//   - the customer
//   - info@jaetravel.co.ke
//   - it@jaetravel.co.ke
// via the shared helper at lib/email/booking-emails.ts.

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sendBookingEmails } from '@/lib/email/booking-emails';

export async function POST(request: NextRequest) {
  let bookingData: any;

  try {
    bookingData = await request.json();
    const bookingId = `TR${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`; // TR = Transfer
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const totalPrice = parseFloat(bookingData.totalPrice || bookingData.price) || 0;

    // === PDF URLs (transfer-specific; the helper just receives the rendered link) ===
    const clientPdfUrl = `${baseUrl}/api/transfers/download?${new URLSearchParams({
      bookingId,
      name: encodeURIComponent(bookingData.name),
      email: encodeURIComponent(bookingData.email),
      phone: encodeURIComponent(bookingData.phone),
      service: encodeURIComponent(bookingData.serviceName),
      date: encodeURIComponent(bookingData.date),
      pickup: encodeURIComponent(bookingData.pickupLocation),
      dropoff: encodeURIComponent(bookingData.dropoffLocation),
      travelers: bookingData.travelers.toString(),
      total: totalPrice.toString(),
      recipient: bookingData.email,
    })}`;

    const adminPdfUrl = `${baseUrl}/api/transfers/download?${new URLSearchParams({
      bookingId,
      name: encodeURIComponent(bookingData.name),
      email: encodeURIComponent(bookingData.email),
      phone: encodeURIComponent(bookingData.phone),
      service: encodeURIComponent(bookingData.serviceName),
      date: encodeURIComponent(bookingData.date),
      pickup: encodeURIComponent(bookingData.pickupLocation),
      dropoff: encodeURIComponent(bookingData.dropoffLocation),
      travelers: bookingData.travelers.toString(),
      total: totalPrice.toString(),
      recipient: 'info@jaetravel.co.ke',
    })}`;

    const adminWhatsApp = `https://wa.me/254726485228`;
    const customerWhatsApp = `https://wa.me/${bookingData.phone.replace(/[^0-9]/g, '').replace(/^0/, '254')}`;

    const emailStatus = await sendBookingEmails({
      bookingId,
      bookingKind: 'transfer',
      customer: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
      },
      service: {
        name: bookingData.serviceName,
        startDate: bookingData.date,
        travelers: Number(bookingData.travelers) || 1,
        totalPrice,
        specialRequirements: bookingData.message,
      },
      transfer: {
        pickup: bookingData.pickupLocation,
        dropoff: bookingData.dropoffLocation,
      },
      pdfUrl: clientPdfUrl,
      adminPdfUrl,
      customerWhatsApp,
      adminWhatsApp,
    });

    const customerEmailSent = emailStatus.client === 'sent';
    const adminEmailSent = emailStatus.info === 'sent' || emailStatus.it === 'sent';

    return NextResponse.json({
      success: true,
      bookingId,
      message: customerEmailSent ? 'Check your email!' : 'Booking saved!',
      customerEmailSent,
      adminEmailSent,
      emailStatus,
      pdfUrl: clientPdfUrl,
      whatsappLink: adminWhatsApp,
    });
  } catch (error: any) {
    console.error('[Transfer API] ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Booking failed.' },
      { status: 500 },
    );
  }
}
