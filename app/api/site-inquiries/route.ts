// app/api/site-inquiries/route.ts
//
// Tour booking endpoint. POSTed by the <BookingForm> components on the
// public site. Confirmation copies are sent to:
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
    const bookingId = `BK${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // === PDF URLs (tour-specific; the helper just receives the rendered link) ===
    const clientPdfUrl = `${baseUrl}/api/bookings/${bookingId}/download?${new URLSearchParams({
      name: encodeURIComponent(bookingData.name || 'Customer'),
      email: encodeURIComponent(bookingData.email),
      phone: encodeURIComponent(bookingData.phone),
      service: encodeURIComponent(bookingData.serviceName),
      startDate: encodeURIComponent(bookingData.startDate),
      travelers: bookingData.travelers.toString(),
      total: bookingData.totalPrice.toString(),
      recipient: bookingData.email,
    })}`;

    const adminPdfUrl = `${baseUrl}/api/bookings/${bookingId}/download?${new URLSearchParams({
      name: encodeURIComponent(bookingData.name || 'Customer'),
      email: encodeURIComponent(bookingData.email),
      phone: encodeURIComponent(bookingData.phone),
      service: encodeURIComponent(bookingData.serviceName),
      startDate: encodeURIComponent(bookingData.startDate),
      travelers: bookingData.travelers.toString(),
      total: bookingData.totalPrice.toString(),
      recipient: 'info@jaetravel.co.ke',
    })}`;

    const adminWhatsApp = `https://wa.me/254726485228`;
    const customerWhatsApp = `https://wa.me/${bookingData.phone.replace(/[^0-9]/g, '').replace(/^0/, '254')}`;

    const emailStatus = await sendBookingEmails({
      bookingId,
      bookingKind: 'tour',
      customer: {
        name: bookingData.name || 'Customer',
        email: bookingData.email,
        phone: bookingData.phone,
      },
      service: {
        name: bookingData.serviceName,
        startDate: bookingData.startDate,
        travelers: Number(bookingData.travelers) || 1,
        totalPrice: Number(bookingData.totalPrice) || 0,
        specialRequirements: bookingData.specialRequirements,
      },
      pdfUrl: clientPdfUrl,
      adminPdfUrl,
      customerWhatsApp,
      adminWhatsApp,
    });

    // Backward-compat booleans for the existing <BookingForm> UI.
    const customerEmailSent = emailStatus.client === 'sent';
    const adminEmailSent = emailStatus.info === 'sent' || emailStatus.it === 'sent';
    const whatsappSent = emailStatus.whatsapp === 'sent';

    console.log(
      `[site-inquiries] ${bookingId} status: client=${emailStatus.client} info=${emailStatus.info} it=${emailStatus.it} whatsapp=${emailStatus.whatsapp}`,
    );
    // One-line per-recipient error summary so the cause is visible
    // in Vercel logs without needing to dive into the helper.
    if (emailStatus.errors) {
      if (emailStatus.errors.client) console.log(`[site-inquiries] client SMTP error: code=${emailStatus.errors.client.code} response=${emailStatus.errors.client.response} message=${emailStatus.errors.client.message}`);
      if (emailStatus.errors.info) console.log(`[site-inquiries] info@ SMTP error: code=${emailStatus.errors.info.code} response=${emailStatus.errors.info.response} message=${emailStatus.errors.info.message}`);
      if (emailStatus.errors.it) console.log(`[site-inquiries] it@ SMTP error: code=${emailStatus.errors.it.code} response=${emailStatus.errors.it.response} message=${emailStatus.errors.it.message}`);
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: customerEmailSent ? 'Check your email!' : 'Booking saved!',
      customerEmailSent,
      adminEmailSent,
      whatsappSent,
      emailStatus,
      pdfUrl: `/api/bookings/${bookingId}/download?...`, // same as clientPdfUrl
      whatsappLink: adminWhatsApp,
    });
  } catch (error: any) {
    console.error('[Booking API] ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Booking failed. Contact us.' },
      { status: 500 },
    );
  }
}
