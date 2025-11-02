// app/api/pdf/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const id = params.id;

  // Extract and sanitize query params
  const get = (key: string, fallback: string = '') =>
    searchParams.get(key)?.trim() || fallback;

  const name = get('name', 'Customer');
  const email = get('email');
  const phone = get('phone');
  const service = get('service', 'Booking');
  const startDate = get('startDate');
  const travelers = get('travelers', '1');
  const total = get('total', '0');
  const recipient = get('recipient'); // client email or 'info@jaetravel.co.ke'

  const isAdmin = recipient === 'info@jaetravel.co.ke';

  // Create PDF
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    layout: 'portrait',
  });

  const chunks: Buffer[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  // Helper: Add line
  const line = (y: number) => {
    doc.moveTo(50, y).lineTo(550, y).strokeColor('#e5e7eb').lineWidth(1).stroke();
  };

  // === Header ===
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, 50, 30, { width: 80 });
    } catch (e) {
      console.warn('Logo not found or invalid:', e);
    }
  }

  doc.fontSize(24)
     .fillColor('#1e40af')
     .text(isAdmin ? 'Booking Record (Admin)' : 'Booking Confirmation', 160, 50);

  doc.fontSize(10)
     .fillColor('#666')
     .text('Jae Travel Expeditions', 160, 85)
     .text('Nairobi, Kenya', 160, 100)
     .text('+254 726 485 228 | info@jaetravel.co.ke', 160, 115)
     .text('Licensed Tour Operator | TTA/0036', 160, 130);

  line(160);

  let y = 190;

  // === Booking ID ===
  doc.fontSize(16).fillColor('#dc2626').text('Booking ID:', 50, y);
  doc.fontSize(14).fillColor('#b91c1c').text(id, 130, y);
  y += 40;

  // === Customer Info ===
  doc.fontSize(16).fillColor('#1e40af').text('Customer Information', 50, y);
  y += 30;

  const addField = (label: string, value: string, color = '#059669') => {
    doc.fontSize(12).fillColor('#374151').text(`${label}:`, 70, y);
    doc.fillColor(color).text(value, 130, y);
    y += 22;
  };

  addField('Name', name);
  addField('Email', email, '#3b82f6');
  addField('Phone', phone);

  // === WhatsApp Link (clickable) ===
  const waNumber = isAdmin ? phone.replace(/[^\d+]/g, '') : '+254726485228';
  const waMessage = encodeURIComponent(
    isAdmin
      ? `Hi, this is regarding ${name}'s booking (${id}) for ${service}`
      : `Hi, this is ${name} regarding my booking (${id}) for ${service}`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  doc.fillColor('#059669').text('WhatsApp:', 70, y);
  const waText = isAdmin ? phone : '+254 726 485 228';
  const waTextWidth = doc.widthOfString(waText);
  const waY = y;
  doc.text(waText, 140, y);

  // Add clickable link
  doc.annotate(
    140,
    waY - 12,
    waTextWidth,
    16,
    {
      Type: 'Link',
      Border: [0, 0, 0],
      A: { Type: 'Action', S: 'URI', URI: waUrl },
    }
  );
  y += 40;

  // === Booking Details ===
  doc.fontSize(16).fillColor('#1e40af').text('Booking Details', 50, y);
  y += 30;

  addField('Service', service);
  addField('Start Date', startDate, '#dc2626');
  addField('Travelers', `${travelers} person${parseInt(travelers) > 1 ? 's' : ''}`);
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#059669').text(`$${parseFloat(total).toLocaleString()}`, 130, y - 22);
  doc.fontSize(12).fillColor('#374151').text('Total Amount:', 70, y - 22);
  y += 40;

  // === Next Steps ===
  doc.fontSize(12).fillColor('#1e40af').text('Next Steps:', 50, y);
  y += 20;

  const steps = [
    '• Your booking is confirmed and secured',
    '• Full payment due 30 days before departure',
    '• Contact us for detailed itinerary',
    '• Travel insurance recommended',
  ];

  steps.forEach((step) => {
    doc.fillColor('#374151').fontSize(10).text(step, 70, y);
    y += 15;
  });

  // === Footer ===
  const footerY = 720;
  line(footerY - 20);

  doc.fontSize(9)
     .fillColor('#6b7280')
     .text('Jae Travel Expeditions', 50, footerY, { align: 'left' })
     .text('Licensed Tour Operator | TTA/0036', 50, footerY + 15, { align: 'left' })
     .text('Nairobi, Kenya • +254 726 485 228 • info@jaetravel.co.ke', 50, footerY + 30, { align: 'left' })
     .text('This is an official booking confirmation document', 50, footerY + 50, {
       align: 'center',
       width: 500,
     });

  doc.end();

  // === Stream to buffer ===
  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  // === Response ===
  const headers = new Headers();
  headers.set('Content-Type', 'application/pdf');
  headers.set('Content-Disposition', `attachment; filename="JaeTravel_${id}.pdf"`);
  headers.set('Content-Length', pdfBuffer.length.toString());
  headers.set('Cache-Control', 'no-store');

  return new NextResponse(pdfBuffer, { status: 200, headers });
}