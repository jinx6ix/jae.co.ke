// app/api/bookings/[id]/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id;
    const { searchParams } = new URL(request.url);
    
    // Mock booking data (in production, fetch from database)
    const bookingData = {
      id: bookingId,
      customerName: searchParams.get("name") || "Customer Name",
      email: searchParams.get("email") || "customer@example.com",
      phone: searchParams.get("phone") || "+254 700 000 000",
      serviceName: searchParams.get("service") || "Masai Mara Safari",
      startDate: searchParams.get("startDate") || "2025-01-15",
      travelers: parseInt(searchParams.get("travelers") || "2"),
      totalPrice: parseFloat(searchParams.get("total") || "2500"),
      submittedAt: new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" })
    };

    // ✅ FIXED: Create PDF with explicit page size
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    
    // ✅ Use standard A4 size: [595.28, 841.89]
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width: pageWidth, height: pageHeight } = page.getSize();

    // Header
    page.drawText("JAE TRAVEL EXPEDITIONS", {
      x: 50,
      y: pageHeight - 80,
      size: 24,
      font: timesRomanFont,
      color: rgb(0.2, 0.2, 0.8),
    });

    page.drawText("BOOKING CONFIRMATION", {
      x: 50,
      y: pageHeight - 110,
      size: 18,
      font: timesRomanFont,
      color: rgb(0, 0.6, 0),
    });

    // Booking ID Box
    page.drawRectangle({
      x: 50,
      y: pageHeight - 140,
      width: 200,
      height: 25,
      color: rgb(0.9, 0.95, 1),
      borderWidth: 1,
      borderColor: rgb(0.2, 0.4, 0.8),
    });
    page.drawText(`Booking ID: ${bookingId}`, {
      x: 55,
      y: pageHeight - 135,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.2, 0.4, 0.8),
    });

    // Customer Info
    let yPosition = pageHeight - 200;
    page.drawText("CUSTOMER INFORMATION", {
      x: 50,
      y: yPosition,
      size: 14,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;

    page.drawText(`Name: ${bookingData.customerName}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
    });
    yPosition -= 20;

    page.drawText(`Email: ${bookingData.email}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
    });
    yPosition -= 20;

    page.drawText(`Phone: ${bookingData.phone}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
    });
    yPosition -= 40;

    // Booking Details
    page.drawText("BOOKING DETAILS", {
      x: 50,
      y: yPosition,
      size: 14,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 25;

    page.drawText(`Tour: ${bookingData.serviceName}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
    });
    yPosition -= 20;

    page.drawText(`Start Date: ${bookingData.startDate}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
    });
    yPosition -= 20;

    page.drawText(`Travelers: ${bookingData.travelers}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
    });
    yPosition -= 20;

    // Total Price (Highlighted)
    page.drawRectangle({
      x: 50,
      y: yPosition - 5,
      width: pageWidth - 100,
      height: 30,
      color: rgb(0.95, 1, 0.95),
      borderWidth: 2,
      borderColor: rgb(0, 0.6, 0),
    });
    page.drawText("TOTAL PRICE: $", {
      x: 70,
      y: yPosition,
      size: 14,
      font: timesRomanFont,
      color: rgb(0, 0.6, 0),
    });
    page.drawText(bookingData.totalPrice.toLocaleString(), {
      x: 200,
      y: yPosition,
      size: 20,
      font: timesRomanFont,
      color: rgb(0, 0.6, 0),
    });
    yPosition -= 50;

    // Footer Line
    page.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: pageWidth - 50, y: yPosition },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });
    yPosition -= 20;

    page.drawText("Next Steps:", {
      x: 50,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });
    yPosition -= 15;

    page.drawText("• Our team will contact you within 24 hours", {
      x: 70,
      y: yPosition,
      size: 11,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });
    yPosition -= 15;

    page.drawText("• Full payment required 30 days before departure", {
      x: 70,
      y: yPosition,
      size: 11,
      font: timesRomanFont,
      color: rgb(0.3, 0.3, 0.3),
    });
    yPosition -= 30;

    page.drawText("Contact Information:", {
      x: 50,
      y: yPosition,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 15;

    page.drawText("📞 +254 726 485 228", {
      x: 70,
      y: yPosition,
      size: 11,
      font: timesRomanFont,
      color: rgb(0, 0.5, 0),
    });
    yPosition -= 15;

    page.drawText("✉️ info@jaetravel.co.ke", {
      x: 70,
      y: yPosition,
      size: 11,
      font: timesRomanFont,
      color: rgb(0, 0.5, 0),
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="booking-confirmation-${bookingId}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });

  } catch (error) {
    console.error("[PDF Download] Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to generate PDF. Please try again or contact support." 
      }, 
      { status: 500 }
    );
  }
}