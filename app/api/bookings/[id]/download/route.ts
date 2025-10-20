import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

function extractPhoneNumber(phone: string): string {
  let cleanNumber = phone.replace(/[^\d+]/g, '');
  if (cleanNumber.startsWith('0')) cleanNumber = '+254' + cleanNumber.substring(1);
  if (!cleanNumber.startsWith('+') && cleanNumber.length === 10 && cleanNumber.startsWith('7')) {
    cleanNumber = '+254' + cleanNumber;
  }
  return cleanNumber;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || 'Customer';
    const email = searchParams.get('email') || '';
    const phone = searchParams.get('phone') || '';
    const service = searchParams.get('service') || 'Booking';
    const startDate = searchParams.get('startDate') || '';
    const travelers = searchParams.get('travelers') || '1';
    const total = parseFloat(searchParams.get('total') || '0');

    const doc = new PDFDocument({ 
      layout: 'portrait',
      size: 'A4',
      margin: 50
    });
    
    const chunks: Uint8Array[] = [];

    return new Promise((resolve, reject) => {
      doc.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        
        const headers = new Headers();
        headers.set('Content-Type', 'application/pdf');
        headers.set('Content-Disposition', `attachment; filename="Booking_Confirmation_${params.id}.pdf"`);
        headers.set('Content-Length', pdfBuffer.length.toString());
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

        resolve(NextResponse.json(pdfBuffer, { 
          status: 200, 
          headers 
        }));
      });
      doc.on('error', reject);

      // Header Section
      try {
        const logoPath = path.join(process.cwd(), 'public', 'logo.png');
        if (fs.existsSync(logoPath)) {
          doc.image(logoPath, 50, 30, { width: 80, height: 80 });
        }
      } catch (logoError) {
        console.warn('[PDF] Logo not found, continuing without logo');
      }

      // Title
      doc.fontSize(24)
        .fillColor('#1e40af')
        .text('Booking Confirmation', 160, 50, { 
          align: 'left',
          lineGap: 5 
        });

      // Company Info
      doc.fontSize(10)
        .fillColor('#666')
        .text('Jae Travel Expeditions', 160, 85);
      doc.text('Nairobi, Kenya', 160, 100);
      doc.text('+254 726 485 228 | info@jaetravel.co.ke', 160, 115);
      doc.text('Licensed Tour Operator | TTA/0036', 160, 130);

      // Horizontal Line
      doc.moveTo(50, 160)
        .lineTo(550, 160)
        .strokeColor('#e5e7eb')
        .lineWidth(2)
        .stroke();

      let yPosition = 190;

      // Booking ID Section
      doc.fontSize(16)
        .fillColor('#dc2626')
        .text('Booking ID:', 50, yPosition);
      doc.fontSize(14)
        .fillColor('#b91c1c')
        .text(params.id, 120, yPosition);
      
      yPosition += 40;

      // Customer Information Section
      doc.fontSize(16)
        .fillColor('#1e40af')
        .text('Customer Information', 50, yPosition);
      
      yPosition += 30;
      
      // Name
      doc.fontSize(12)
        .fillColor('#374151')
        .text('Name:', 70, yPosition);
      doc.fillColor('#059669')
        .text(name, 120, yPosition);
      
      yPosition += 20;
      
      // Email
      doc.fillColor('#374151')
        .text('Email:', 70, yPosition);
      doc.fillColor('#3b82f6')
        .text(email, 120, yPosition);
      
      yPosition += 20;
      
      // Phone
      doc.fillColor('#374151')
        .text('Phone:', 70, yPosition);
      doc.fillColor('#059669')
        .text(phone, 120, yPosition);
      
      yPosition += 25;

      // WhatsApp Section with LINK ANNOTATION
      // Determine recipient based on email in query (simplified check for admin)
      const recipientEmail = searchParams.get('recipient') || email;
      const isAdmin = recipientEmail === 'info@jaetravel.co.ke';
      
      doc.fillColor('#059669')
        .text('Contact WhatsApp:', 70, yPosition);
      
      const whatsappTextX = 160;
      const whatsappTextY = yPosition;
      let whatsappNumber = '';
      let whatsappMessage = '';
      let whatsappUrl = '';

      if (isAdmin) {
        // Admin PDF: Link to client's number
        whatsappNumber = extractPhoneNumber(phone);
        whatsappMessage = `Hi, this is regarding ${name}'s booking (${params.id}) for ${service}`;
        whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        doc.text(phone, whatsappTextX, whatsappTextY); // Show client's number
      } else {
        // Client PDF: Link to admin's number
        whatsappNumber = '+254726485228';
        whatsappMessage = `Hi, this is ${name} regarding my booking (${params.id}) for ${service}`;
        whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        doc.text('+254 726 485 228', whatsappTextX, whatsappTextY); // Show admin's number
      }
      
      // Calculate text width and height for link rectangle
      const textWidth = doc.widthOfString(isAdmin ? phone : '+254 726 485 228');
      const textHeight = doc.currentLineHeight();
      const linkRect = [whatsappTextX, whatsappTextY - textHeight, whatsappTextX + textWidth, whatsappTextY];
      
      // Add link annotation to PDF using simplified approach
      doc.annotate(
        linkRect[0], // x
        linkRect[1], // y
        linkRect[2] - linkRect[0], // width
        linkRect[3] - linkRect[1], // height
        {
          Type: 'Link',
          Border: [0, 0, 0],
          A: {
            Type: 'Action',
            S: 'URI',
            URI: whatsappUrl
          }
        }
      );

      yPosition += 40;

      // Booking Details Section
      doc.fontSize(16)
        .fillColor('#1e40af')
        .text('Booking Details', 50, yPosition);
      
      yPosition += 30;
      
      // Service
      doc.fontSize(12)
        .fillColor('#374151')
        .text('Service:', 70, yPosition);
      doc.fillColor('#059669')
        .text(service, 120, yPosition);
      
      yPosition += 20;
      
      // Start Date
      doc.fillColor('#374151')
        .text('Start Date:', 70, yPosition);
      doc.fillColor('#dc2626')
        .text(startDate, 120, yPosition);
      
      yPosition += 20;
      
      // Travelers
      doc.fillColor('#374151')
        .text('Travelers:', 70, yPosition);
      doc.fillColor('#059669')
        .text(`${travelers} person${parseInt(travelers) > 1 ? 's' : ''}`, 120, yPosition);
      
      yPosition += 20;
      
      // Total Amount
      doc.fillColor('#374151')
        .text('Total Amount:', 70, yPosition);
      doc.fillColor('#059669')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(`$${total.toLocaleString()}`, 120, yPosition);
      
      yPosition += 60;

      // Terms & Next Steps
      doc.fontSize(12)
        .fillColor('#1e40af')
        .text('Next Steps:', 50, yPosition);
      
      yPosition += 20;
      
      const terms = [
        '• Your booking is confirmed and secured',
        '• Full payment due 30 days before departure',
        '• Contact us for detailed itinerary',
        '• Travel insurance recommended'
      ];
      
      terms.forEach((term) => {
        doc.fillColor('#374151')
          .fontSize(10)
          .text(term, 70, yPosition);
        yPosition += 15;
      });

      // Footer
      yPosition = 720;
      
      doc.moveTo(50, yPosition - 20)
        .lineTo(550, yPosition - 20)
        .strokeColor('#e5e7eb')
        .lineWidth(1)
        .stroke();
      
      doc.fontSize(9)
        .fillColor('#6b7280')
        .text('Jae Travel Expeditions', 50, yPosition, { align: 'left' });
      doc.text('Licensed Tour Operator | TTA/0036', 50, yPosition + 15, { align: 'left' });
      doc.text('Nairobi, Kenya • +254 726 485 228 • info@jaetravel.co.ke', 50, yPosition + 30, { align: 'left' });
      doc.text('This is an official booking confirmation document', 50, yPosition + 45, { 
        align: 'center',
        width: 500
      });

      doc.end();
    });
  } catch (error) {
    console.error('[PDF Download] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}