// app/api/transfers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((err) => {
  if (err) console.error('SMTP FAILED:', err.message);
  else console.log('SMTP READY – Transfer emails will send!');
});

export async function POST(request: NextRequest) {
  let bookingData: any;

  try {
    bookingData = await request.json();
    const bookingId = `TR${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`; // TR = Transfer
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const totalPrice = parseFloat(bookingData.totalPrice || bookingData.price);

    // === PDF URLs ===
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

    // === CUSTOMER EMAIL (Orange) ===
    const customerEmail = {
      from: `"JaeTravel Expeditions" <${process.env.SMTP_USER}>`,
      to: bookingData.email,
      subject: `Transfer Booking #${bookingId} – ${bookingData.serviceName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transfer #${bookingId}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; color: #1f2937; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #f97316, #fb923c); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .card { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 25px; margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; font-size: 15px; }
    td { padding: 10px 0; vertical-align: top; }
    .label { font-weight: 600; color: #92400e; width: 140px; }
    .value { color: #1f2937; }
    .highlight { background: #fef3c7; padding: 6px 12px; border-radius: 6px; font-family: 'Courier New'; font-size: 14px; }
    .btn { display: inline-block; background: #f97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 10px 0; box-shadow: 0 4px 12px rgba(249,115,22,0.3); }
    .btn-wa { background: #25D366; }
    .footer { background: #f3f4f6; padding: 30px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmed!</h1>
      <p style="margin: 8px 0 0; opacity: 0.95;">JaeTravel Expeditions</p>
    </div>
    <div class="content">
      <p style="font-size: 18px; margin-bottom: 25px;">Dear <strong>${bookingData.name}</strong>,</p>
      <p>Your <strong>${bookingData.serviceName}</strong> transfer is confirmed! We’ll contact you within <strong>1 hour</strong>.</p>

      <div class="card">
        <h2 style="margin: 0 0 15px; color: #92400e; font-size: 20px; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">Transfer Summary</h2>
        <table>
          <tr><td class="label">Booking ID:</td><td class="value"><span class="highlight">${bookingId}</span></td></tr>
          <tr><td class="label">Service:</td><td class="value">${bookingData.serviceName}</td></tr>
          <tr><td class="label">Date:</td><td class="value">${bookingData.date}</td></tr>
          <tr><td class="label">Pickup:</td><td class="value">${bookingData.pickupLocation}</td></tr>
          <tr><td class="label">Drop-off:</td><td class="value">${bookingData.dropoffLocation}</td></tr>
          <tr><td class="label">Travelers:</td><td class="value">${bookingData.travelers}</td></tr>
          <tr><td class="label">Total:</td><td class="value" style="font-weight:700; color:#dc2626; font-size:18px;">$${totalPrice.toLocaleString()}</td></tr>
          <tr><td class="label">Requests:</td><td class="value" style="font-style:italic; color:#6b7280;">${bookingData.message || 'None'}</td></tr>
        </table>
      </div>

      <div style="text-align:center; margin:30px 0;">
        <a href="${clientPdfUrl}" class="btn">Download PDF</a>
      </div>

      <div style="background:#ecfdf5; border:1px solid #bbf7d0; border-radius:12px; padding:25px; text-align:center;">
        <h3 style="margin:0 0 15px; color:#059669; font-size:18px;">Need Help?</h3>
        <p>Chat with us:</p>
        <a href="${adminWhatsApp}?text=${encodeURIComponent(`Hi, I have transfer #${bookingId}`)}" class="btn btn-wa" target="_blank">
          Chat on WhatsApp
        </a>
      </div>
    </div>
    <div class="footer">
      <p style="margin:0;">© 2025 JaeTravel Expeditions | TTA/0036 | Nairobi, Kenya</p>
      <p style="margin:8px 0 0; opacity:0.8;">
        <a href="tel:+254726485228" style="color:#f97316; text-decoration:none;">+254 726 485 228</a> | 
        <a href="mailto:info@jaetravel.co.ke" style="color:#f97316; text-decoration:none;">info@jaetravel.co.ke</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };

    // === ADMIN EMAIL (Green) ===
    const adminEmail = {
      from: `"Transfer Booking" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Transfer #${bookingId} – ${bookingData.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Transfer #${bookingId}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; color: #1f2937; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 25px; margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; font-size: 15px; }
    td { padding: 10px 0; vertical-align: top; }
    .label { font-weight: 600; color: #166534; width: 120px; }
    .value { color: #065f46; }
    .highlight { background: #d1fae5; padding: 6px 12px; border-radius: 6px; font-family: 'Courier New'; }
    .btn { display: inline-block; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 8px 4px; }
    .btn-wa { background: #25D366; }
    .btn-pdf { background: #f97316; }
    .footer { background: #f3f4f6; padding: 25px; text-align: center; font-size: 13px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Transfer!</h1>
      <p style="margin: 8px 0 0; opacity: 0.95;">JaeTravel Expeditions</p>
    </div>
    <div class="content">
      <h2 style="margin:0 0 20px; color:#059669; font-size:24px;">Customer</h2>
      <div class="card">
        <table>
          <tr><td class="label">Name:</td><td class="value"><strong>${bookingData.name}</strong></td></tr>
          <tr><td class="label">Email:</td><td class="value"><a href="mailto:${bookingData.email}" style="color:#059669;">${bookingData.email}</a></td></tr>
          <tr><td class="label">Phone:</td><td class="value"><a href="tel:${bookingData.phone}" style="color:#059669;">${bookingData.phone}</a></td></tr>
        </table>
      </div>

      <h2 style="margin:0 0 20px; color:#059669; font-size:24px;">Transfer Details</h2>
      <div class="card">
        <table>
          <tr><td class="label">ID:</td><td class="value"><span class="highlight">${bookingId}</span></td></tr>
          <tr><td class="label">Service:</td><td class="value"><strong>${bookingData.serviceName}</strong></td></tr>
          <tr><td class="label">Date:</td><td class="value">${bookingData.date}</td></tr>
          <tr><td class="label">Pickup:</td><td class="value">${bookingData.pickupLocation}</td></tr>
          <tr><td class="label">Drop-off:</td><td class="value">${bookingData.dropoffLocation}</td></tr>
          <tr><td class="label">Travelers:</td><td class="value">${bookingData.travelers}</td></tr>
          <tr><td class="label">Total:</td><td class="value" style="font-weight:700; color:#059669; font-size:18px;">$${totalPrice.toLocaleString()}</td></tr>
          <tr><td class="label">Requests:</td><td class="value" style="font-style:italic; color:#6b7280;">${bookingData.message || 'None'}</td></tr>
        </table>
      </div>

      <div style="text-align:center; margin:30px 0;">
        <a href="${adminPdfUrl}" class="btn btn-pdf" target="_blank">Download PDF</a>
        <a href="${customerWhatsApp}?text=${encodeURIComponent(`Hi ${bookingData.name}, your transfer #${bookingId} is confirmed!`)}" class="btn btn-wa" target="_blank">
          Contact Customer
        </a>
      </div>
    </div>
    <div class="footer">
      <p>JaeTravel Transfer System</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    // === SEND EMAILS ===
    const [custRes, adminRes] = await Promise.allSettled([
      transporter.sendMail(customerEmail),
      transporter.sendMail(adminEmail),
    ]);

    const customerSent = custRes.status === 'fulfilled';
    const adminSent = adminRes.status === 'fulfilled';

    return NextResponse.json({
      success: true,
      bookingId,
      message: customerSent ? 'Check your email!' : 'Booking saved!',
      customerEmailSent: customerSent,
      adminEmailSent: adminSent,
      pdfUrl: clientPdfUrl,
      whatsappLink: adminWhatsApp,
    });

  } catch (error: any) {
    console.error('[Transfer API] ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Booking failed.' },
      { status: 500 }
    );
  }
}