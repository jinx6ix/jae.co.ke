// app/api/inquiries/route.ts
//
// General "contact us" inquiry endpoint. POSTed by the public site's
// contact form. Confirmation copies are sent to:
//   - the customer
//   - info@jaetravel.co.ke
//   - it@jaetravel.co.ke
// via the shared helper at lib/email/booking-emails.ts.

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sendBookingEmails } from '@/lib/email/booking-emails';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const inquiryId = `INQ${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    const customerWhatsApp = `https://wa.me/${data.phone.replace(/[^0-9]/g, '').replace(/^0/, '254')}`;
    const adminWhatsApp = `https://wa.me/254726485228`;

    // For inquiries, the "service" is the topic they're interested in
    // and the free-text "message" goes in specialRequirements so the
    // helper can render the same orange + green templates.
    const emailStatus = await sendBookingEmails({
      bookingId: inquiryId,
      bookingKind: 'inquiry',
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      service: {
        name: data.country || 'General',
        startDate: '—',
        travelers: 1,
        totalPrice: 0,
        specialRequirements: data.message,
      },
      customerWhatsApp,
      adminWhatsApp,
    });

    // Backward-compat booleans for any existing UI that reads them.
    const customerEmailSent = emailStatus.client === 'sent';
    const adminEmailSent = emailStatus.info === 'sent' || emailStatus.it === 'sent';

    return NextResponse.json({
      success: true,
      inquiryId,
      message: customerEmailSent ? 'Check your email!' : 'Inquiry saved!',
      customerEmailSent,
      adminEmailSent,
      emailStatus,
    });
  } catch (error: any) {
    console.error('[Inquiry API] ERROR:', error);
    return NextResponse.json({ success: false, message: 'Failed to send.' }, { status: 500 });
  }
}
