import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY!);

function extractPhoneNumber(phone: string): string {
  let cleanNumber = phone.replace(/[^\d+]/g, '');
  if (cleanNumber.startsWith('0')) cleanNumber = '+254' + cleanNumber.substring(1);
  if (!cleanNumber.startsWith('+') && cleanNumber.length === 10 && cleanNumber.startsWith('7')) {
    cleanNumber = '+254' + cleanNumber;
  }
  return cleanNumber;
}

async function generatePDF(bookingData: any, bookingId: string, recipient: string): Promise<string> {
  const doc = new PDFDocument();
  const pdfPath = path.join(process.cwd(), 'tmp', `${bookingId}_${recipient === 'info@jaetravel.co.ke' ? 'admin' : 'client'}.pdf`);
  
  const tmpDir = path.dirname(pdfPath);
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  
  return new Promise((resolve, reject) => {
    doc.pipe(fs.createWriteStream(pdfPath));
    
    // Header
    doc.fontSize(24).fillColor('#1e40af').text('Booking Confirmation', 50, 50);
    doc.fontSize(10).fillColor('#666').text('Jae Travel Expeditions', 50, 80);
    doc.text('Nairobi, Kenya | +254 726 485 228', 50, 95);
    
    // Booking ID
    doc.fontSize(14).fillColor('#dc2626').text(`Booking ID: ${bookingId}`, 50, 120);
    doc.moveDown();
    
    // Customer Details
    doc.fontSize(16).fillColor('#1e40af').text('Customer Information:', 50, 170);
    doc.fontSize(12).text(`Name: ${bookingData.name}`, 70, 195);
    doc.text(`Email: ${bookingData.email}`, 70, 210);
    doc.text(`Phone: ${bookingData.phone}`, 70, 225);
    
    // WhatsApp Link (Dynamic based on recipient)
    let whatsappNumber = '';
    let whatsappMessage = '';
    let whatsappUrl = '';
    
    if (recipient === 'info@jaetravel.co.ke') {
      // Admin PDF: Link to client's number
      whatsappNumber = extractPhoneNumber(bookingData.phone);
      whatsappMessage = `Hi, this is regarding ${bookingData.name}'s booking (${bookingId}) for ${bookingData.serviceName}`;
      whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      doc.fontSize(12).fillColor('#059669').text('Contact WhatsApp:', 70, 245);
      doc.fillColor('#059669').text(bookingData.phone, 160, 245);
    } else {
      // Client PDF: Link to admin's number
      whatsappNumber = '+254726485228';
      whatsappMessage = `Hi, this is ${bookingData.name} regarding my booking (${bookingId}) for ${bookingData.serviceName}`;
      whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      doc.fontSize(12).fillColor('#059669').text('Contact WhatsApp:', 70, 245);
      doc.fillColor('#059669').text('+254 726 485 228', 160, 245);
    }
    
    // Add clickable link
    const textWidth = doc.widthOfString(whatsappNumber);
    doc.link(160, 238, textWidth, 12, whatsappUrl);
    
    // Booking Details
    doc.moveDown(2);
    doc.fontSize(16).fillColor('#1e40af').text('Booking Details:', 50, 300);
    doc.fontSize(12).text(`Service: ${bookingData.serviceName}`, 70, 325);
    doc.text(`Start Date: ${bookingData.startDate || bookingData.date}`, 70, 340);
    doc.text(`Travelers: ${bookingData.travelers}`, 70, 355);
    doc.text(`Total: $${bookingData.totalPrice?.toLocaleString()}`, 70, 370);
    
    if (bookingData.specialRequirements) {
      doc.moveDown();
      doc.fontSize(16).fillColor('#1e40af').text('Special Requirements:', 50, 410);
      doc.fontSize(11).text(bookingData.specialRequirements, 70, 435, { width: 500, align: 'left' });
    }
    
    // Footer
    doc.moveDown(3);
    doc.fontSize(10).fillColor('#666')
      .text('Jae Travel Expeditions', 50, 650);
    doc.text('Licensed Tour Operator | TTA/0036', 50, 665);
    doc.text('+254 726 485 228 | info@jaetravel.co.ke', 50, 680);

    doc.end();
    
    doc.on('end', () => {
      const pdfBuffer = fs.readFileSync(pdfPath);
      const base64PDF = pdfBuffer.toString('base64');
      fs.unlinkSync(pdfPath); // Clean up
      resolve(base64PDF);
    });
    
    doc.on('error', reject);
  });
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    const bookingId = bookingData.bookingId || `BK${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    console.log('[Booking API] Received:', bookingData);
    
    // Generate PDFs for both client and admin
    const clientPdfBase64 = await generatePDF(bookingData, bookingId, bookingData.email);
    const adminPdfBase64 = await generatePDF(bookingData, bookingId, 'info@jaetravel.co.ke');
    
    // Customer Email Template
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmed: ${bookingData.serviceName}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; margin: -40px -20px 30px -20px;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: 700;">✅ Booking Confirmed!</h1>
                  <p style="margin: 5px 0 0 0; opacity: 0.9;">Your adventure with Jae Travel Expeditions</p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 25px;">
                  <h2 style="color: #059669; font-size: 20px; margin: 0 0 20px 0;">Booking Details</h2>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
                      <div><strong>Booking ID:</strong><br><code style="background: #d1fae5; padding: 6px 12px; border-radius: 6px; color: #065f46;">${bookingId}</code></div>
                      <div><strong>Service:</strong><br><span style="color: #059669;">${bookingData.serviceName}</span></div>
                      <div><strong>Start Date:</strong><br><span style="color: #dc2626;">${bookingData.startDate || bookingData.date}</span></div>
                      <div><strong>Travelers:</strong><br><span style="color: #059669;">${bookingData.travelers}</span></div>
                      <div><strong>Total:</strong><br><span style="color: #059669; font-size: 18px; font-weight: 700;">$${bookingData.totalPrice?.toLocaleString()}</span></div>
                  </div>
              </div>
              
              ${bookingData.specialRequirements ? `
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 25px;">
                  <h2 style="color: #1e40af; font-size: 20px; margin: 0 0 20px 0;">💬 Special Requirements</h2>
                  <div style="background: #eff6ff; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 8px;">
                      <p style="margin: 0; color: #1e40af;">${bookingData.specialRequirements}</p>
                  </div>
              </div>
              ` : ''}
              
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 25px;">
                  <h2 style="color: #1e40af; font-size: 20px; margin: 0 0 20px 0;">📋 Next Steps</h2>
                  <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px;">
                      <li>✅ Your booking is confirmed!</li>
                      <li>📧 This email serves as your official confirmation</li>
                      <li>💳 We'll contact you within 24 hours for payment details</li>
                      <li>📄 Download your PDF confirmation below</li>
                  </ul>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); text-align: center;">
                  <a href="https://jaetravel.co.ke/api/bookings/${bookingId}/download?recipient=${encodeURIComponent(bookingData.email)}&name=${encodeURIComponent(bookingData.name)}&email=${encodeURIComponent(bookingData.email)}&phone=${encodeURIComponent(bookingData.phone)}&service=${encodeURIComponent(bookingData.serviceName)}&startDate=${encodeURIComponent(bookingData.startDate || bookingData.date)}&travelers=${bookingData.travelers}&total=${bookingData.totalPrice}" 
                     style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                      📄 Download PDF Confirmation
                  </a>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); text-align: center; font-size: 12px; color: #6b7280;">
                  <p><strong>Jae Travel Expeditions</strong></p>
                  <p>+254 726 485 228 | info@jaetravel.co.ke</p>
                  <p>Nairobi, Kenya | Licensed Tour Operator</p>
              </div>
          </div>
      </body>
      </html>
    `;
    
    // Admin Email Template
    const customerWhatsApp = extractPhoneNumber(bookingData.phone);
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking: ${bookingData.serviceName}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; margin: -40px -20px 30px -20px;">
                  <h1 style="margin: 0; font-size: 28px; font-weight: 700;">🆕 New Booking Received</h1>
                  <p style="margin: 5px 0 0 0; opacity: 0.9;">Booking ID: <strong style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px;">${bookingId}</strong></p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 25px;">
                  <h2 style="color: #1e40af; font-size: 20px; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 24px;">👤</span> Customer Information
                  </h2>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
                      <div>
                          <strong>Name:</strong><br>
                          <span style="color: #059669;">${bookingData.name}</span>
                      </div>
                      <div>
                          <strong>Booking ID:</strong><br>
                          <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 6px; color: #6b7280;">${bookingId}</code>
                      </div>
                      <div>
                          <strong>Email:</strong><br>
                          <a href="mailto:${bookingData.email}" style="color: #3b82f6; text-decoration: none;">${bookingData.email}</a>
                      </div>
                      <div>
                          <strong>Phone:</strong><br>
                          <a href="https://wa.me/${customerWhatsApp}?text=Hi%20${bookingData.name}%2C%20I'm%20calling%20about%20your%20${bookingData.serviceName}%20booking%20(${bookingId})" 
                             style="display: inline-flex; align-items: center; gap: 6px; color: #059669; text-decoration: none; background: #d1fae5; padding: 6px 12px; border-radius: 6px; font-weight: 500;">
                              <span style="font-size: 16px;">📱</span> WhatsApp ${bookingData.phone}
                          </a>
                      </div>
                  </div>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 25px;">
                  <h2 style="color: #1e40af; font-size: 20px; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 24px;">🏕️</span> Booking Details
                  </h2>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
                      <div>
                          <strong>Service:</strong><br>
                          <span style="color: #059669; font-weight: 600;">${bookingData.serviceName}</span>
                      </div>
                      <div>
                          <strong>Start Date:</strong><br>
                          <span style="color: #dc2626;">${bookingData.startDate || bookingData.date}</span>
                      </div>
                      <div>
                          <strong>Travelers:</strong><br>
                          <span style="color: #059669;">${bookingData.travelers} person/people</span>
                      </div>
                      <div>
                          <strong>Total Amount:</strong><br>
                          <span style="color: #059669; font-size: 18px; font-weight: 700;">$${bookingData.totalPrice?.toLocaleString()}</span>
                      </div>
                  </div>
              </div>
              
              ${bookingData.specialRequirements ? `
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 25px;">
                  <h2 style="color: #1e40af; font-size: 20px; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 24px;">💬</span> Special Requirements
                  </h2>
                  <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 8px;">
                      <p style="margin: 0; color: #374151;">${bookingData.specialRequirements}</p>
                  </div>
              </div>
              ` : ''}
              
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 25px;">
                  <h2 style="color: #1e40af; font-size: 20px; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 24px;">⚡</span> Quick Actions
                  </h2>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                      <a href="https://jaetravel.co.ke/api/bookings/${bookingId}/download?recipient=${encodeURIComponent('info@jaetravel.co.ke')}&name=${encodeURIComponent(bookingData.name)}&email=${encodeURIComponent(bookingData.email)}&phone=${encodeURIComponent(bookingData.phone)}&service=${encodeURIComponent(bookingData.serviceName)}&startDate=${encodeURIComponent(bookingData.startDate || bookingData.date)}&travelers=${bookingData.travelers}&total=${bookingData.totalPrice}" 
                         style="display: inline-flex; align-items: center; gap: 10px; justify-content: center; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 14px 20px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                          <span style="font-size: 18px;">📄</span> Download Admin PDF
                      </a>
                      <a href="https://wa.me/${customerWhatsApp}?text=Hi%20${bookingData.name}%2C%20this%20is%20Jae%20Travel%20Expeditions%20confirming%20your%20booking%20(${bookingId})%20for%20${bookingData.serviceName}.%20We'll%20contact%20you%20soon!" 
                         style="display: inline-flex; align-items: center; gap: 10px; justify-content: center; background: linear-gradient(135deg, #059669, #047857); color: white; padding: 14px 20px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
                          <span style="font-size: 18px;">💬</span> WhatsApp Customer
                      </a>
                      <a href="tel:${bookingData.phone}" 
                         style="display: inline-flex; align-items: center; gap: 10px; justify-content: center; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 14px 20px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
                          <span style="font-size: 18px;">📞</span> Call Customer
                      </a>
                  </div>
              </div>
              
              <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                  <h3 style="margin: 0 0 10px 0; color: #d97706; font-size: 16px; font-weight: 600;">📋 Next Steps:</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 14px;">
                      <li>✅ Reply to customer within 24 hours</li>
                      <li>💳 Request 50% deposit to secure booking</li>
                      <li>📄 Send detailed itinerary & invoice</li>
                      <li>🛡️ Confirm travel insurance & visa requirements</li>
                  </ul>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); text-align: center; font-size: 12px; color: #6b7280;">
                  <p><strong>Jae Travel Expeditions</strong></p>
                  <p>+254 726 485 228 | info@jaetravel.co.ke</p>
                  <p>Nairobi, Kenya | Licensed Tour Operator</p>
              </div>
          </div>
      </body>
      </html>
    `;
    
    // Send Customer Email
    const customerEmailSent = await resend.emails.send({
      from: 'Jae Travel Expeditions <info@jaetravel.co.ke>',
      to: [bookingData.email],
      subject: `✅ Booking Confirmed: ${bookingData.serviceName}`,
      html: customerEmailHtml,
      attachments: [{
        filename: `Booking_Confirmation_${bookingId}_client.pdf`,
        content: clientPdfBase64,
        contentType: 'application/pdf'
      }]
    }).then(() => true).catch(() => false);
    
    // Send Admin Email
    const adminEmailSent = await resend.emails.send({
      from: 'Jae Travel Expeditions <info@jaetravel.co.ke>',
      to: ['info@jaetravel.co.ke'],
      subject: `🆕 NEW BOOKING: ${bookingData.serviceName} (${bookingId})`,
      html: adminEmailHtml,
      attachments: [{
        filename: `Booking_${bookingId}_admin.pdf`,
        content: adminPdfBase64,
        contentType: 'application/pdf'
      }]
    }).then(() => true).catch(() => false);
    
    const responseData = {
      success: true,
      bookingId,
      message: "Booking confirmed successfully!",
      emailsSent: customerEmailSent && adminEmailSent,
      customerEmailSent,
      adminEmailSent,
      whatsappLink: `https://wa.me/+254726485228?text=🆕%20NEW%20BOOKING%20${bookingId}%0A%0A👤%20${bookingData.name}%0A📧%20${bookingData.email}%0A📞%20${bookingData.phone}%0A🏕️%20${bookingData.serviceName}%0A💰%20$${bookingData.totalPrice?.toLocaleString()}%0A📅%20${bookingData.startDate || bookingData.date}`,
      customerWhatsApp: `https://wa.me/${extractPhoneNumber(bookingData.phone)}?text=${encodeURIComponent(
        `Hi ${bookingData.name.split(' ')[0]}, this is Jae Travel confirming your ${bookingData.serviceName} booking (${bookingId})!`
      )}`,
      pdfUrl: `/api/bookings/${bookingId}/download?recipient=${encodeURIComponent(bookingData.email)}`
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('[Booking API] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Booking failed. Please try again.' },
      { status: 500 }
    );
  }
}