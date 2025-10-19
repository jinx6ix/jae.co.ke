// app/6-sustainable-travel-tips-2/page.tsx
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "6 Sustainable Travel Tips | Jae Travel Expeditions",
  description:
    "Travel smarter and more responsibly with these 6 sustainable travel tips. Discover how to reduce your footprint and protect the places you explore.",
  openGraph: {
    title: "6 Sustainable Travel Tips | Jae Travel Expeditions",
    description:
      "Travel smarter and more responsibly with these 6 sustainable travel tips. Discover how to reduce your footprint and protect the places you explore.",
    images: ["/blog/sustainable-travel-tips.jpg"],
    url: "https://jaetravel.co.ke/6-sustainable-travel-tips-2",
  },
}

export default function SustainableTravelTips() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 prose prose-lg">
      <h1>6 Sustainable Travel Tips</h1>
      <Image
        src="/blog/sustainable-travel-tips.jpg"
        alt="Sustainable travel"
        width={1000}
        height={600}
        className="rounded-2xl my-6"
      />

      <p>
        Sustainable travel is about minimizing your environmental impact while
        supporting local communities and preserving natural beauty for future
        generations. Here are six simple but powerful ways to travel more
        responsibly.
      </p>

      <h2>1. Choose Eco-Friendly Accommodations</h2>
      <p>
        Look for lodges and hotels that use renewable energy, reduce waste, and
        employ local staff. Many eco-lodges in Kenya and East Africa are doing
        an incredible job in conservation and community support.
      </p>

      <h2>2. Support Local Businesses</h2>
      <p>
        Buy local crafts, eat at local restaurants, and book experiences run by
        residents. This ensures your money stays within the community and
        benefits the people who make your trip special.
      </p>

      <h2>3. Reduce Plastic Waste</h2>
      <p>
        Carry a reusable water bottle, shopping bag, and utensils. Many
        destinations are banning single-use plastics, and you can lead by
        example.
      </p>

      <h2>4. Respect Wildlife and Nature</h2>
      <p>
        Observe animals from a safe distance and never feed them. Stick to
        designated trails to avoid damaging fragile ecosystems.
      </p>

      <h2>5. Travel Light and Efficiently</h2>
      <p>
        Pack only what you need to reduce emissions from transportation.
        Lightweight luggage makes your travel easier and greener.
      </p>

      <h2>6. Offset Your Carbon Footprint</h2>
      <p>
        Many airlines and organizations allow you to offset your emissions by
        supporting reforestation and clean energy projects.
      </p>

      <p>
        By traveling sustainably, you’re helping to ensure that future
        generations can enjoy the same natural wonders we cherish today.
      </p>
    </main>
  )
}
