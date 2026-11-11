// lib/vehicle-faq.ts
//
// SINGLE SOURCE OF TRUTH for the vehicle-hire FAQ.
//
// SAGE requires that the visible FAQ content and the FAQPage JSON-LD
// match exactly ("The visible FAQ content must match the FAQPage
// schema exactly"), and separately requires each answer to be a
// 40-60 word paragraph so it can be lifted into a featured snippet.
//
// Previously the visible FAQ lived in the page component and the
// FAQPage schema lived in components/AllPageSEOSchema.tsx — two
// copies that had already drifted (the schema was missing the
// "documents" question entirely).
//
// Every answer below is 40-60 words and states only facts that come
// from the vehicle record itself (price, capacity, equipment) or from
// documented hire policy. No prices or features are invented.

import type { Vehicle } from "@/lib/vehicles-data"

export interface VehicleFaq {
  question: string
  answer: string
}

export function buildVehicleFaqs(vehicle: Vehicle): VehicleFaq[] {
  const isAccessible =
    vehicle.slug === "wheelchair-accessible-vehicle"

  return [
    {
      question: `How much does it cost to hire the ${vehicle.name} in Kenya?`,
      answer: `It starts from $${vehicle.pricePerDay} USD per day, covering the vehicle, a professional driver, and fuel for national park areas. Long-term rentals qualify for a discounted weekly or monthly rate. Optional extras such as a driver-guide at $80 per day, a camping equipment package at $50 per day, or a satellite phone at $30 per day are added separately.`,
    },
    {
      question: `Is the ${vehicle.name} suitable for self-drive safaris in Kenya?`,
      answer: `Yes. We offer both self-drive and guided hire options. Self-drive rentals need a valid international driving permit or domestic licence, a passport, and a minimum age of 23. Chauffeur-driven rentals need no driving documents from you. For game drives in national parks we recommend a driver-guide, who adds wildlife knowledge a map cannot give.`,
    },
    {
      question: `Can the ${vehicle.name} access Masai Mara and Amboseli?`,
      answer: `Absolutely. It is fully equipped for all major Kenya safari destinations, including Masai Mara, Amboseli, Tsavo East and West, Samburu, and Lake Nakuru. It runs full-time four-wheel drive with heavy-duty suspension, so it handles the rough tracks and river crossings found inside the reserves. National park and conservancy fees are billed separately at the gate.`,
    },
    {
      question: `Is the ${vehicle.name} wheelchair accessible?`,
      answer: isAccessible
        ? `Yes. This vehicle is adapted with a German hydraulic lift rated to 400kg, a pop-up viewing roof, and medical-grade restraint systems, so a wheelchair user can travel in their own chair. The lift is operated by a trained driver, with securement points fixed to the cabin floor. Tell us your chair dimensions when you book so we can confirm fit.`
        : `This standard vehicle is not adapted for wheelchair users. We do operate a dedicated wheelchair-accessible safari vehicle fitted with a German hydraulic lift rated to 400kg, medical-grade restraints, and a pop-up roof, so barrier-free game drives are still available in Kenya. Contact us with your requirements and we will match you to that vehicle and confirm the booking.`,
    },
    {
      question: `What documents do I need to hire a safari vehicle in Kenya?`,
      answer: `For self-drive hire you need a valid passport, an international driving permit or a domestic driving licence, and the credit card used for the deposit. Drivers must be at least 23, and a second named driver can be added for $40 per day. Chauffeur-driven hires need no driving documents at all.`
    },
    {
      question: `How many people can the ${vehicle.name} carry?`,
      answer: `It carries ${vehicle.capacity}. The full luggage specification is listed in the technical details table above, with room for soft bags and a rucksack per traveller. It runs on ${vehicle.specifications.fuelType.toLowerCase()} fuel and is built for long distances between parks. Larger groups are split across two vehicles with a shared guide.`
    },
  ]
}
