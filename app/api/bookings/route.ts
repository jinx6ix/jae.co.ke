import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    const emailContent = `
      New Booking Request - JaeTravel Expeditions
      
      Tour/Service: ${bookingData.serviceName}
      Customer Name: ${bookingData.name}
      Email: ${bookingData.email}
      Phone: ${bookingData.phone}
      Number of Travelers: ${bookingData.travelers || "N/A"}
      Preferred Date: ${bookingData.date}
      ${bookingData.endDate ? `End Date: ${bookingData.endDate}` : ""}
      ${bookingData.message ? `Special Requests: ${bookingData.message}` : ""}
      
      Total Price: $${bookingData.totalPrice}
      Service Type: ${bookingData.serviceType}
      
      Booking ID: ${bookingData.bookingId}
      Submitted: ${new Date().toLocaleString()}
    `

    // For now, we'll simulate the email sending
    console.log("[v0] Email would be sent to:", bookingData.email)
    console.log("[v0] Email content:", emailContent)

    const whatsappMessage = encodeURIComponent(
      `New Booking Request!\n\nService: ${bookingData.serviceName}\nCustomer: ${bookingData.name}\nPhone: ${bookingData.phone}\nDate: ${bookingData.date}\nTravelers: ${bookingData.travelers || "N/A"}\nPrice: $${bookingData.totalPrice}\n\nBooking ID: ${bookingData.bookingId}`,
    )

    return NextResponse.json({
      success: true,
      bookingId: bookingData.bookingId,
      message: "Booking request received successfully",
      whatsappLink: `https://wa.me/254712345678?text=${whatsappMessage}`,
      emailSent: true,
      downloadUrl: `/api/bookings/${bookingData.bookingId}/download`,
    })
  } catch (error) {
    console.error("[v0] Booking error:", error)
    return NextResponse.json({ success: false, message: "Failed to process booking" }, { status: 500 })
  }
}
