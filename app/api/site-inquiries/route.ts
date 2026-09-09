// app/api/site-inquiries/route.ts
//
// Tour booking endpoint. POSTed by the <BookingForm> components on the
// public site.
//
// Email notifications are sent to:
//   - the customer
//   - info@jaetravel.co.ke
//   - it@jaetravel.co.ke
//
// SMTP sending is handled by:
//   lib/email/booking-emails.ts

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sendBookingEmails } from '@/lib/email/booking-emails';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  let bookingData: any;

  try {
    // ---------------------------------------------------------------
    // 1. Parse request
    // ---------------------------------------------------------------
    bookingData = await request.json();

    console.log('[site-inquiries] Received booking request');

    // ---------------------------------------------------------------
    // 2. Basic validation
    // ---------------------------------------------------------------
    const name = String(bookingData.name || 'Customer').trim();
    const email = String(bookingData.email || '').trim();
    const phone = String(bookingData.phone || '').trim();
    const serviceName = String(bookingData.serviceName || '').trim();
    const startDate = String(bookingData.startDate || '').trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email address is required.',
        },
        { status: 400 },
      );
    }

    if (!serviceName) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tour/service is required.',
        },
        { status: 400 },
      );
    }

    // Basic email validation.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address.',
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------------
    // 3. Generate booking ID
    // ---------------------------------------------------------------
    const bookingId = `BK${Date.now()}-${uuidv4()
      .slice(0, 8)
      .toUpperCase()}`;

    console.log(`[site-inquiries] Processing ${bookingId} for ${email}`);

    // ---------------------------------------------------------------
    // 4. Normalize booking values
    // ---------------------------------------------------------------
    const travelers = Number(bookingData.travelers) || 1;
    const totalPrice = Number(bookingData.totalPrice) || 0;

    // ---------------------------------------------------------------
    // 5. Base URL
    // ---------------------------------------------------------------
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';

    // Remove trailing slash to avoid //api/...
    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');

    // ---------------------------------------------------------------
    // 6. Customer PDF URL
    // ---------------------------------------------------------------
    const clientPdfParams = new URLSearchParams({
      name,
      email,
      phone,
      service: serviceName,
      startDate,
      travelers: travelers.toString(),
      total: totalPrice.toString(),
      recipient: email,
    });

    const clientPdfUrl =
      `${normalizedBaseUrl}/api/bookings/${bookingId}/download?` +
      clientPdfParams.toString();

    // ---------------------------------------------------------------
    // 7. Admin PDF URL
    // ---------------------------------------------------------------
    const adminPdfParams = new URLSearchParams({
      name,
      email,
      phone,
      service: serviceName,
      startDate,
      travelers: travelers.toString(),
      total: totalPrice.toString(),
      recipient: 'info@jaetravel.co.ke',
    });

    const adminPdfUrl =
      `${normalizedBaseUrl}/api/bookings/${bookingId}/download?` +
      adminPdfParams.toString();

    // ---------------------------------------------------------------
    // 8. WhatsApp links
    // ---------------------------------------------------------------
    const adminWhatsApp = 'https://wa.me/254726485228';

    const normalizedCustomerPhone = phone
      .replace(/[^0-9]/g, '')
      .replace(/^0/, '254');

    const customerWhatsApp = normalizedCustomerPhone
      ? `https://wa.me/${normalizedCustomerPhone}`
      : undefined;

    // ---------------------------------------------------------------
    // 9. Send customer + admin emails + WhatsApp
    // ---------------------------------------------------------------
    const emailStatus = await sendBookingEmails({
      bookingId,
      bookingKind: 'tour',

      customer: {
        name,
        email,
        phone,
      },

      service: {
        name: serviceName,
        startDate,
        travelers,
        totalPrice,
        specialRequirements: bookingData.specialRequirements,
      },

      pdfUrl: clientPdfUrl,
      adminPdfUrl,

      customerWhatsApp,
      adminWhatsApp,
    });

    // ---------------------------------------------------------------
    // 10. Determine notification status
    // ---------------------------------------------------------------
    const customerEmailSent = emailStatus.client === 'sent';

    const adminEmailSent =
      emailStatus.info === 'sent' ||
      emailStatus.it === 'sent';

    const whatsappSent = emailStatus.whatsapp === 'sent';

    const anyEmailSent =
      customerEmailSent ||
      emailStatus.info === 'sent' ||
      emailStatus.it === 'sent';

    const allEmailFailed =
      emailStatus.client === 'failed' &&
      emailStatus.info === 'failed' &&
      emailStatus.it === 'failed';

    // ---------------------------------------------------------------
    // 11. Detailed server-side logging
    // ---------------------------------------------------------------
    console.log(
      `[site-inquiries] ${bookingId} notification status: ` +
        `client=${emailStatus.client} ` +
        `info=${emailStatus.info} ` +
        `it=${emailStatus.it} ` +
        `whatsapp=${emailStatus.whatsapp}`,
    );

    if (emailStatus.errors) {
      if (emailStatus.errors.client) {
        console.error(
          `[site-inquiries] ${bookingId} CLIENT SMTP ERROR:`,
          JSON.stringify(emailStatus.errors.client),
        );
      }

      if (emailStatus.errors.info) {
        console.error(
          `[site-inquiries] ${bookingId} INFO SMTP ERROR:`,
          JSON.stringify(emailStatus.errors.info),
        );
      }

      if (emailStatus.errors.it) {
        console.error(
          `[site-inquiries] ${bookingId} IT SMTP ERROR:`,
          JSON.stringify(emailStatus.errors.it),
        );
      }
    }

    // ---------------------------------------------------------------
    // 12. If every email failed, report an actual failure
    // ---------------------------------------------------------------
    if (allEmailFailed) {
      console.error(
        `[site-inquiries] ${bookingId}: ALL EMAIL DELIVERIES FAILED`,
      );

      return NextResponse.json(
        {
          success: false,
          bookingId,

          message:
            'Your booking could not be confirmed because the email notification service is currently unavailable. Please contact us on WhatsApp.',

          customerEmailSent,
          adminEmailSent,
          whatsappSent,

          emailStatus,

          // Keep PDF/WhatsApp available so the customer can still
          // contact the company even when SMTP is unavailable.
          pdfUrl: clientPdfUrl,
          whatsappLink: adminWhatsApp,
        },
        { status: 502 },
      );
    }

    // ---------------------------------------------------------------
    // 13. Partial email failure
    // ---------------------------------------------------------------
    if (!anyEmailSent && whatsappSent) {
      return NextResponse.json({
        success: true,
        bookingId,

        message:
          'Your request was received. Please contact us on WhatsApp for confirmation.',

        customerEmailSent,
        adminEmailSent,
        whatsappSent,

        emailStatus,

        pdfUrl: clientPdfUrl,
        whatsappLink: adminWhatsApp,
      });
    }

    // ---------------------------------------------------------------
    // 14. Normal successful response
    // ---------------------------------------------------------------
    return NextResponse.json({
      success: true,
      bookingId,

      message: customerEmailSent
        ? 'Booking received. Please check your email for confirmation.'
        : adminEmailSent
          ? 'Booking received. Our team has been notified.'
          : 'Booking request received.',

      customerEmailSent,
      adminEmailSent,
      whatsappSent,

      emailStatus,

      pdfUrl: clientPdfUrl,
      whatsappLink: adminWhatsApp,
    });
  } catch (error: any) {
    // ---------------------------------------------------------------
    // 15. Unexpected server error
    // ---------------------------------------------------------------
    console.error('[site-inquiries] FATAL ERROR:', {
      name: error?.name,
      code: error?.code,
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      {
        success: false,
        message:
          'Booking failed. Please contact JaeTravel Expeditions on WhatsApp.',
      },
      { status: 500 },
    );
  }
}