import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

async function generatePDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on('error', reject);

    // Add PDF content
    doc.fontSize(20).text('Booking Confirmation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Vehicle: ${data.vehicleName}`);
    doc.text(`Vehicle ID: ${data.vehicleId}`);
    doc.text(`Name: ${data.name}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`Pickup Date: ${data.pickupDate}`);
    doc.text(`Return Date: ${data.returnDate}`);
    doc.text(`Pickup Location: ${data.pickupLocation}`);
    doc.text(`Special Message: ${data.message || 'None'}`);
    doc.text(`Rental Duration: ${data.days} days`);
    doc.text(`Price per Day: $${data.pricePerDay}`);
    doc.text(`Total Price: $${data.totalPrice}`);
    doc.moveDown();
    doc.fontSize(10).text('Thank you for booking with JAE Travel.', { align: 'center' });

    doc.end();
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Calculate days and total (redundantly, in case not sent)
    const pickup = new Date(data.pickupDate);
    const returnDate = new Date(data.returnDate);
    const days = Math.ceil((returnDate.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days > 0 ? days * data.pricePerDay : 0;

    const pdfBuffer = await generatePDF({
      ...data,
      days,
      totalPrice,
    });

    // SMTP configuration from env (configure in .env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // Use SSL for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Client email
    const clientMailOptions = {
      from: 'info@jaetravel.co.ke',
      to: data.email,
      subject: 'Your Booking Confirmation - JAE Travel',
      html: `
        <p>Dear ${data.name},</p>
        <p>Thank you for your booking request for the ${data.vehicleName}.</p>
        <p>We will contact you within 24 hours to confirm availability and provide payment details.</p>
        <p>Attached is a PDF with your booking details.</p>
        <p>Best regards,<br>JAE Travel Team</p>
      `,
      attachments: [
        {
          filename: 'booking-confirmation.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(clientMailOptions);

    // Admin email with WhatsApp button
    const adminMailOptions = {
      from: 'info@jaetravel.co.ke',
      to: 'info@jaetravel.co.ke',
      subject: `New Booking Request: ${data.vehicleName} - ${data.name}`,
      html: `
        <p>New booking request received:</p>
        <p><strong>Vehicle:</strong> ${data.vehicleName} (ID: ${data.vehicleId})</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Pickup Date:</strong> ${data.pickupDate}</p>
        <p><strong>Return Date:</strong> ${data.returnDate}</p>
        <p><strong>Pickup Location:</strong> ${data.pickupLocation}</p>
        <p><strong>Special Message:</strong> ${data.message || 'None'}</p>
        <p><strong>Rental Duration:</strong> ${days} days</p>
        <p><strong>Total Estimate:</strong> $${totalPrice}</p>
        <p>
          <a href="https://wa.me/${encodeURIComponent(data.phone)}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Contact on WhatsApp
          </a>
        </p>
        <p>Attached is a PDF with the booking details.</p>
      `,
      attachments: [
        {
          filename: 'booking-details.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}