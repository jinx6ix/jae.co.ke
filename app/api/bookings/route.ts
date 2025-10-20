// app/api/bookings/route.ts
import { type NextRequest, NextResponse } from "next/server";
import nodemailer, { Transporter } from "nodemailer";
import { v4 as uuidv4 } from "uuid";

// Create transporter with cPanel SMTP (SSL/Port 465)
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

// Verify SMTP connection on startup
transporter.verify((error: Error | null, success: boolean) => {
  if (error) {
    console.error("[SMTP] ❌ Connection failed:", error.message);
  } else {
    console.log("[SMTP] ✅ Server is ready to send emails");
  }
});

export async function POST(request: NextRequest) {
  let bookingData: any;
  
  try {
    bookingData = await request.json();
    const bookingId = bookingData.bookingId || `BK${Date.now()}-${uuidv4().slice(0, 8)}`;
    
    const fullName = `${bookingData.firstName || ''} ${bookingData.lastName || ''}`.trim();
    const emailData = {
      ...bookingData,
      name: fullName || bookingData.name || 'Customer',
      bookingId,
      totalPrice: Number(bookingData.totalPrice) || 0,
      travelers: Number(bookingData.travelers) || 1,
      submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })
    };

    console.log(`\n🚀 [Booking] Processing ${bookingId} for ${emailData.name}`);

    // ✅ FULL CUSTOMER EMAIL HTML
    const customerEmail: nodemailer.SendMailOptions = {
      from: `"JaeTravel Expeditions" <${process.env.FROM_EMAIL}>`,
      to: bookingData.email,
      subject: `Booking Confirmation #${bookingId} - JaeTravel Expeditions`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation #${bookingId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f8fa; color: #333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 40px 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Booking Confirmed! 🎉</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">JaeTravel Expeditions</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 16px; margin-bottom: 30px;">
        Dear <strong>${emailData.name}</strong>,
      </p>
      
      <p style="font-size: 16px; margin-bottom: 30px;">
        Thank you for choosing <strong>JaeTravel Expeditions</strong>! 
        Your booking request has been received and our team will contact you within <strong>24 hours</strong> to finalize the details.
      </p>
      
      <!-- Booking Details Card -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
        <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Booking Details</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #475569; width: 120px;">Booking ID:</td>
            <td style="padding: 8px 0;"><span style="background: #dbeafe; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 14px; color: #1e40af;">${bookingId}</span></td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Tour:</td>
            <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${bookingData.serviceName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Start Date:</td>
            <td style="padding: 8px 0;">${bookingData.startDate || bookingData.date}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Travelers:</td>
            <td style="padding: 8px 0;">${emailData.travelers} ${emailData.travelers === 1 ? 'person' : 'people'}</td>
          </tr>
          ${bookingData.endDate ? `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">End Date:</td>
            <td style="padding: 8px 0;">${bookingData.endDate}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #475569;">Total Price:</td>
            <td style="padding: 8px 0; color: #059669; font-weight: 700; font-size: 18px;">$${emailData.totalPrice.toLocaleString()}</td>
          </tr>
        </table>
      </div>
      
      <!-- Download PDF -->
      <div style="text-align: center; margin-bottom: 30px;">
        // In customerEmail.html (inside the booking API)
        <a href="${request.nextUrl.origin}/api/bookings/${bookingId}/download?name=${encodeURIComponent(emailData.name)}&email=${encodeURIComponent(bookingData.email)}&phone=${encodeURIComponent(bookingData.phone)}&service=${encodeURIComponent(bookingData.serviceName)}&startDate=${encodeURIComponent(bookingData.startDate || bookingData.date)}&travelers=${emailData.travelers}&total=${emailData.totalPrice}" 
           style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">
          📄 Download PDF Confirmation
        </a>
      </div>
      
      <!-- Contact Info -->
      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px;">Need Help?</h3>
        <p style="margin: 0 0 10px 0; font-size: 16px;">
          📞 <strong>+254 726 485 228</strong>
        </p>
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          ✉️ <a href="mailto:${process.env.FROM_EMAIL}" style="color: #1e40af;">${process.env.FROM_EMAIL}</a>
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; font-size: 13px; color: #64748b;">
      <p style="margin: 0 0 10px 0;">
        This is an automated confirmation email. Please don't reply directly to this email.
      </p>
      <p style="margin: 0; opacity: 0.7;">
        © 2025 JaeTravel Expeditions. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`
    };

    // ✅ FULL ADMIN EMAIL HTML (abbreviated for brevity)
    const adminEmail: nodemailer.SendMailOptions = {
      from: `"JaeTravel Booking System" <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `🆕 New Booking Request #${bookingId} - ${emailData.name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Request #${bookingId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f8fa; color: #333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 40px 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">New Booking Request! 🚀</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">JaeTravel Expeditions</p>
    </div>
    
    <div style="padding: 30px;">
      <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px;">Customer Information</h2>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 0; font-weight: 600; color: #166534; width: 100px;">Name:</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${emailData.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #166534;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${bookingData.email}" style="color: #1e40af;">${bookingData.email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #166534;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${bookingData.phone}" style="color: #059669;">${bookingData.phone}</a></td></tr>
        </table>
      </div>
      
      <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 22px;">Booking Details</h2>
      <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 0; font-weight: 600; color: #92400e; width: 120px;">Booking ID:</td><td style="padding: 8px 0;"><span style="background: #fef3c7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${bookingId}</span></td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #92400e;">Tour:</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${bookingData.serviceName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #92400e;">Travelers:</td><td style="padding: 8px 0;">${emailData.travelers}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #92400e;">Start Date:</td><td style="padding: 8px 0;">${bookingData.startDate || bookingData.date}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #92400e;">Total:</td><td style="padding: 8px 0; color: #b45309; font-weight: 700; font-size: 18px;">$${emailData.totalPrice.toLocaleString()}</td></tr>
        </table>
      </div>
      
      <!-- Quick Actions -->
      <div style="background: #dbeafe; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; text-align: center;">
        <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px;">Quick Actions</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; font-size: 14px;">
          <a href="https://wa.me/+254726485228?text=${encodeURIComponent(`New Booking ${bookingId} - ${emailData.name}`)}" 
             style="background: #10b981; color: white; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-weight: 600;">
            📱 WhatsApp
          </a>
          <a href="mailto:${bookingData.email}?subject=Re:%20Booking%20${bookingId}" 
             style="background: #3b82f6; color: white; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-weight: 600;">
            ✉️ Reply
          </a>
        </div>
      </div>
      
      <p style="margin: 20px 0 0 0; font-size: 14px; color: #64748b; text-align: center;">
        <strong>Submitted:</strong> ${emailData.submittedAt} (EAT)
      </p>
    </div>
    
    <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; font-size: 13px; color: #64748b;">
      <p style="margin: 0;">JaeTravel Expeditions Booking System</p>
    </div>
  </div>
</body>
</html>`
    };

    // Send emails
    console.log("📤 Sending emails...");
    const [customerResult, adminResult] = await Promise.allSettled([
      transporter.sendMail(customerEmail),
      transporter.sendMail(adminEmail)
    ]);

    const customerEmailSent = customerResult.status === 'fulfilled';
    const adminEmailSent = adminResult.status === 'fulfilled';

    console.log(`\n✅ Booking ${bookingId} COMPLETE:`);
    console.log(`   👤 Customer → ${bookingData.email}: ${customerEmailSent ? '✅ SENT' : '❌ FAILED'}`);
    console.log(`   📧 Admin   → ${process.env.ADMIN_EMAIL}: ${adminEmailSent ? '✅ SENT' : '❌ FAILED'}`);

    if (!customerEmailSent) {
      console.error("❌ Customer email FAILED:", (customerResult as any).reason?.message);
    }
    if (!adminEmailSent) {
      console.error("❌ Admin email FAILED:", (adminResult as any).reason?.message);
    }

    const whatsappMessage = encodeURIComponent(
      `🆕 *New Booking!*\n\n👤 ${emailData.name}\n📧 ${bookingData.email}\n💰 $${emailData.totalPrice.toLocaleString()}\n*ID:* ${bookingId}`
    );

    return NextResponse.json({
      success: true,
      bookingId,
      message: customerEmailSent ? "Booking confirmed! Check your email." : "Booking received! We'll contact you soon.",
      emailsSent: customerEmailSent && adminEmailSent,
      customerEmailSent,
      adminEmailSent,
      whatsappLink: `https://wa.me/+254726485228?text=${whatsappMessage}`,
      pdfUrl: `/api/bookings/${bookingId}/download`,
    });

  } catch (error: any) {
    console.error("[Booking API] 💥 Error:", error);
    const bookingId = bookingData?.bookingId || `BK${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      bookingId,
      message: "Booking received! We'll contact you within 24 hours.",
      emailsSent: false,
      whatsappLink: `https://wa.me/+254726485228`,
      pdfUrl: `/api/bookings/${bookingId}/download`,
    }, { status: 200 });
  }
}