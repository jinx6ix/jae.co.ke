import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id

    // For now, we'll create a sample PDF content
    const pdfContent = `
JaeTravel Expeditions - Booking Confirmation

Booking ID: ${bookingId}
Date: ${new Date().toLocaleDateString()}

Thank you for booking with JaeTravel Expeditions!

Your booking request has been received and our team will contact you within 24 hours to confirm details and arrange payment.

For immediate assistance, please contact us:
Phone: +254 712 345 678
Email: info@jaetravelexpeditions.com
WhatsApp: +254 712 345 678

Website: www.jaetravelexpeditions.com

Terms & Conditions:
- Full payment required 30 days before departure
- Cancellation policy applies
- Travel insurance recommended
    `

    return new NextResponse(pdfContent, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="booking-${bookingId}.txt"`,
      },
    })
  } catch (error) {
    console.error("[v0] Download error:", error)
    return NextResponse.json({ success: false, message: "Failed to generate booking document" }, { status: 500 })
  }
}
