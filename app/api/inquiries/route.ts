// app/api/inquiries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  tls: { rejectUnauthorized: false },
});

transporter.verify((err) => {
  if (err) console.error('SMTP FAILED:', err);
  else console.log('SMTP READY – Inquiry emails');
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const inquiryId = `INQ${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const adminWhatsApp = `https://wa.me/254726485228`;
    const customerWhatsApp = `https://wa.me/${data.phone.replace(/[^0-9]/g, '').replace(/^0/, '254')}`;

    // === CUSTOMER EMAIL (Orange) ===
    const customerEmail = {
      from: `"JaeTravel Expeditions" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Inquiry Received #${inquiryId} – Thank You!`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry #${inquiryId}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9fafb; color: #1f2937; }
    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #f97316, #fb923c); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .card { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 25px; margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; font-size: 15px; }
    td { padding: 10px 0; vertical-align: top; }
    .label { font-weight: 600; color: #92400e; width: 120px; }
    .value { color: #1f2937; }
    .highlight { background: #fef3c7; padding: 6px 12px; border-radius: 6px; font-family: 'Courier New'; }
    .btn { display: inline-block; background: #f97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 10px 0; }
    .btn-wa { background: #25D366; }
    .footer { background: #f3f4f6; padding: 30px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Message Received!</h1>
      <p style="margin: 8px 0 0; opacity: 0.95;">JaeTravel Expeditions</p>
    </div>
    <div class="content">
      <p style="font-size: 18px; margin-bottom: 25px;">Hi <strong>${data.name}</strong>,</p>
      <p>Thank you for reaching out! We've received your inquiry and will get back to you within <strong>24 hours</strong>.</p>

      <div class="card">
        <h2 style="margin: 0 0 15px; color: #92400e; font-size: 20px; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">Your Inquiry</h2>
        <table>
          <tr><td class="label">ID:</td><td class="value"><span class="highlight">${inquiryId}</span></td></tr>
          <tr><td class="label">Interested In:</td><td class="value">${data.country || 'General'}</td></tr>
          <tr><td class="label">Message:</td><td class="value" style="font-style:italic; color:#6b7280;">${data.message}</td></tr>
        </table>
      </div>

      <div style="text-align:center; margin:30px 0;">
        <a href="${adminWhatsApp}?text=${encodeURIComponent(`Hi, I have inquiry #${inquiryId}`)}" class="btn btn-wa" target="_blank">
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
      from: `"Inquiry System" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Inquiry #${inquiryId} – ${data.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry #${inquiryId}</title>
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
    .footer { background: #f3f4f6; padding: 25px; text-align: center; font-size: 13px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Inquiry!</h1>
      <p style="margin: 8px 0 0; opacity: 0.95;">JaeTravel Expeditions</p>
    </div>
    <div class="content">
      <h2 style="margin:0 0 20px; color:#059669; font-size:24px;">Customer</h2>
      <div class="card">
        <table>
          <tr><td class="label">Name:</td><td class="value"><strong>${data.name}</strong></td></tr>
          <tr><td class="label">Email:</td><td class="value"><a href="mailto:${data.email}" style="color:#059669;">${data.email}</a></td></tr>
          <tr><td class="label">Phone:</td><td class="value"><a href="tel:${data.phone}" style="color:#059669;">${data.phone}</a></td></tr>
        </table>
      </div>

      <h2 style="margin:0 0 20px; color:#059669; font-size:24px;">Message</h2>
      <div class="card">
        <table>
          <tr><td class="label">ID:</td><td class="value"><span class="highlight">${inquiryId}</span></td></tr>
          <tr><td class="label">Interested In:</td><td class="value">${data.country || 'General'}</td></tr>
          <tr><td class="label">Message:</td><td class="value" style="font-style:italic; color:#6b7280;">${data.message}</td></tr>
        </table>
      </div>

      <div style="text-align:center; margin:30px 0;">
        <a href="${customerWhatsApp}?text=${encodeURIComponent(`Hi ${data.name}, thanks for your inquiry!`)}" class="btn btn-wa" target="_blank">
          Contact Customer
        </a>
      </div>
    </div>
    <div class="footer">
      <p>JaeTravel Inquiry System</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    const [custRes, adminRes] = await Promise.allSettled([
      transporter.sendMail(customerEmail),
      transporter.sendMail(adminEmail),
    ]);

    const customerSent = custRes.status === 'fulfilled';
    const adminSent = adminRes.status === 'fulfilled';

    return NextResponse.json({
      success: true,
      inquiryId,
      message: customerSent ? 'Check your email!' : 'Inquiry saved!',
      customerEmailSent: customerSent,
      adminEmailSent: adminSent,
    });

  } catch (error: any) {
    console.error('[Inquiry API] ERROR:', error);
    return NextResponse.json({ success: false, message: 'Failed to send.' }, { status: 500 });
  }
}