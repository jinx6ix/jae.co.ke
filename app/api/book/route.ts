import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Map the incoming form data to the exact JSON shape expected by n8n
    // Form fields (from components/booking-form.tsx):
    // - name -> name
    // - email -> email
    // - phone -> phone
    // - serviceName -> tourName
    // - startDate -> dates
    // - specialRequirements -> message
    const n8nPayload = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      tourName: String(body.serviceName || '').trim(),
      dates: String(body.startDate || '').trim(),
      message: String(body.specialRequirements || '').trim(),
    };

    const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[api/book] N8N_BOOKING_WEBHOOK_URL is not defined in environment variables');
      return NextResponse.json(
        { success: false, message: 'Webhook configuration is missing.' },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(n8nPayload),
    });

    if (!response.ok) {
      console.error(`[api/book] n8n webhook responded with status: ${response.status}`);
      return NextResponse.json(
        { success: false, message: 'Webhook forwarder failed to deliver data.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: 'Booking forwarded to n8n successfully.' });
  } catch (error: any) {
    console.error('[api/book] Fatal Error:', error);
    return NextResponse.json(
      { success: false, message: 'An internal error occurred while forwarding the booking.' },
      { status: 500 }
    );
  }
}
