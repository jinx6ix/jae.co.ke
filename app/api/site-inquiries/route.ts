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
import { prisma } from '@/lib/prisma';
import { resolveTourPricing } from '@/lib/seasonal-pricing';
import { generateBookingRef } from '@/lib/rates';

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
    const country = String(bookingData.country || 'Kenya').trim();

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
    // 3. Server-side price verification using seasonal pricing
    // ---------------------------------------------------------------
    const travelers = Number(bookingData.travelers) || 2;
    const resolvedPricing = await resolveTourPricing(serviceName, startDate, travelers);
    if (!resolvedPricing.success) {
      return NextResponse.json(
        { success: false, message: resolvedPricing.error || 'Failed to resolve pricing for booking' },
        { status: 400 }
      );
    }
    const totalPrice = resolvedPricing.totalPrice;

    // ---------------------------------------------------------------
    // 4. Generate booking reference & ID
    // ---------------------------------------------------------------
    const bookingRef = generateBookingRef();
    const bookingId = `BK${Date.now()}-${uuidv4()
      .slice(0, 8)
      .toUpperCase()}`;

    console.log(`[site-inquiries] Processing ${bookingRef} (${bookingId}) for ${email} — Season: ${resolvedPricing.season}, Total: $${totalPrice}`);

    // ---------------------------------------------------------------
    // 5. Persist client and booking in Prisma (Immutable snapshot)
    // ---------------------------------------------------------------
    try {
      // Find or create client
      let client = await prisma.client.findFirst({
        where: { email },
      });

      if (!client) {
        client = await prisma.client.create({
          data: {
            name,
            email,
            phone,
            nationality: country,
            address: country,
          },
        });
      } else {
        // Update phone or name if changed
        client = await prisma.client.update({
          where: { id: client.id },
          data: { name, phone, nationality: country },
        });
      }

      // Try to find matching tour package ID if available
      const tourPkg = await prisma.tourPackage.findFirst({
        where: { title: { contains: serviceName, mode: 'insensitive' } },
      });

      const parsedStartDate = startDate ? new Date(startDate) : new Date();
      const endDate = new Date(parsedStartDate);
      endDate.setDate(endDate.getDate() + 3); // default 3 days if duration not specified

      await prisma.booking.create({
        data: {
          bookingRef,
          clientId: client.id,
          tourPackageId: tourPkg ? tourPkg.id : null,
          status: 'ENQUIRY',
          startDate: parsedStartDate,
          endDate,
          numAdults: travelers,
          numChildren: 0,
          totalAmount: totalPrice,
          currency: resolvedPricing.currency || 'USD',
          specialRequirements: bookingData.specialRequirements || null,
          notes: `Booked via website public booking form. Season: ${resolvedPricing.season}. Rate Card ID: ${resolvedPricing.rateCardId || 'N/A'}`,
        },
      });
      console.log(`[site-inquiries] Successfully persisted booking ${bookingRef} to database`);
    } catch (dbError) {
      console.error('[site-inquiries] Database persistence error (non-fatal):', dbError);
    }

    // ---------------------------------------------------------------
    // 6. Base URL
    // ---------------------------------------------------------------
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';

    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');

    // ---------------------------------------------------------------
    // 7. Customer & Admin PDF URLs
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
    // 9.5. Forward to n8n Webhook
    // ---------------------------------------------------------------
    try {
      const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;
      if (webhookUrl) {
        const n8nPayload = {
          name: name,
          email: email,
          phone: phone,
          tourName: serviceName,
          dates: startDate,
          message: bookingData.specialRequirements || '',
          totalPrice,
          bookingRef,
        };

        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(n8nPayload),
        });
        console.log(`[site-inquiries] ${bookingId} forwarded to n8n`);
      } else {
        console.warn(`[site-inquiries] ${bookingId} n8n webhook URL missing`);
      }
    } catch (n8nError) {
      console.error(`[site-inquiries] ${bookingId} n8n webhook forward failed:`, n8nError);
    }

    // ---------------------------------------------------------------
    // 10. Determine notification status
    // ---------------------------------------------------------------
    const customerEmailSent = emailStatus.client === 'sent';
    const adminEmailSent = emailStatus.info === 'sent' || emailStatus.it === 'sent';
    const whatsappSent = emailStatus.whatsapp === 'sent';
    const anyEmailSent = customerEmailSent || emailStatus.info === 'sent' || emailStatus.it === 'sent';
    const allEmailFailed = emailStatus.client === 'failed' && emailStatus.info === 'failed' && emailStatus.it === 'failed';

    if (allEmailFailed) {
      console.error(`[site-inquiries] ${bookingId}: ALL EMAIL DELIVERIES FAILED`);
      return NextResponse.json(
        {
          success: false,
          bookingId,
          bookingRef,
          message: 'Your booking could not be confirmed because the email notification service is currently unavailable. Please contact us on WhatsApp.',
          customerEmailSent,
          adminEmailSent,
          whatsappSent,
          emailStatus,
          pdfUrl: clientPdfUrl,
          whatsappLink: adminWhatsApp,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      bookingId,
      bookingRef,
      totalPrice,
      season: resolvedPricing.season,
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
    console.error('[site-inquiries] FATAL ERROR:', {
      name: error?.name,
      code: error?.code,
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Booking failed. Please contact JaeTravel Expeditions on WhatsApp.',
      },
      { status: 500 },
    );
  }
}
