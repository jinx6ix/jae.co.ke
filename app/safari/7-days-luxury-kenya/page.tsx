// app/safari/7-days-budget-kenya/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Best of Kenya 7 Days Budget Shared Safari 2026-August | Jae Travel",
  description: "Book Best of Kenya 7 days budget shared safari. Maasai Mara, Nakuru, Naivasha, Amboseli. Game drives, boat ride, walking safari. From $1,355.",
};

export default function SevenDaysBudgetKenyaPage() {
  return (
    <main className="bg-white">
      {/* ===== EXACT PDF HEADER ===== */}
      <div className="bg-gray-50 py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm text-gray-600 mb-2">2026-0089.1 Mr. Ian Iraya</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Best of Kenya 7 Days Budget Shared Safari 2026-August
          </h1>
        </div>
      </div>

      {/* ===== EXACT PDF LETTER ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Dear Mr. Ian Iraya,</h2>
          <p className="mb-4 text-gray-700">
            Thank you for giving us the opportunity to prepare this custom-made quote for your Best of Kenya 7 Days Budget Shared Safari 2026-August.
          </p>
          <p className="mb-4 text-gray-700">
            As you can see from our detailed proposal, your tour begins in Nairobi on August 12, 2026 and runs for 7 days and 6 nights.
          </p>
          <p className="mb-4 text-gray-700">
            Please let us know if you have any questions, or if you would like any further details.
          </p>
          <p className="mb-4 text-gray-700">
            We hope to hear from you soon.
          </p>
          <p className="mt-6 font-semibold">Best regards,</p>
          <p className="text-gray-600">Jae Travel Expeditions Team</p>
        </div>
      </section>

      {/* ===== EXACT PDF TOUR DATES ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2"><span className="font-semibold">Start Tour</span> Wednesday, August 12, 2026</p>
          <p className="mb-4"><span className="font-semibold">End Tour</span> Tuesday, August 18, 2026</p>
        </div>
      </section>

      {/* ===== EXACT PDF DAY BY DAY TABLE ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Day by Day</h2>
          
          <div className="mb-4">
            <span className="font-semibold">Start Destination:</span> Nairobi
          </div>
          
          <div className="text-sm text-gray-600 mb-4">See your full itinerary on Page 5-12</div>

          {/* Exact table from PDF */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Days</th>
                  <th className="border p-3 text-left">Main Destination</th>
                  <th className="border p-3 text-left">Accommodation</th>
                  <th className="border p-3 text-left">Meal Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Day 1</td>
                  <td className="border p-3">Masai Mara National Reserve</td>
                  <td className="border p-3">Rhino Tourist Camp<br />Tented camp | 4x Double Room</td>
                  <td className="border p-3">Lunch</td>
                </tr>
                <tr>
                  <td className="border p-3">Day 2</td>
                  <td className="border p-3">Masai Mara National Reserve</td>
                  <td className="border p-3">Rhino Tourist Camp<br />Tented camp | 4x Double Room</td>
                  <td className="border p-3">Breakfast, Lunch & Dinner</td>
                </tr>
                <tr>
                  <td className="border p-3">Day 3</td>
                  <td className="border p-3">Nakuru</td>
                  <td className="border p-3">Buraha Zenoni Hotel & Resort<br />Hotel | 4x Double Room</td>
                  <td className="border p-3">Breakfast, Lunch & Dinner<br />Packed lunch</td>
                </tr>
                <tr>
                  <td className="border p-3">Day 4</td>
                  <td className="border p-3">Naivasha</td>
                  <td className="border p-3">Leisure Apex Resort<br />Hotel | 4x Double Room</td>
                  <td className="border p-3">Breakfast, Lunch & Dinner<br />Packed lunch</td>
                </tr>
                <tr>
                  <td className="border p-3">Day 5</td>
                  <td className="border p-3">Amboseli National Park</td>
                  <td className="border p-3">Manjaro Tented Camp<br />Tented camp | 4x Double Room</td>
                  <td className="border p-3">Breakfast, Lunch & Dinner<br />Packed lunch</td>
                </tr>
                <tr>
                  <td className="border p-3">Day 6</td>
                  <td className="border p-3">Amboseli National Park</td>
                  <td className="border p-3">Manjaro Tented Camp<br />Tented camp | 4x Double Room</td>
                  <td className="border p-3">Breakfast, Lunch & Dinner</td>
                </tr>
                <tr>
                  <td className="border p-3">Day 7</td>
                  <td className="border p-3">Nairobi</td>
                  <td className="border p-3">No accommodation</td>
                  <td className="border p-3">Breakfast & Lunch<br />Packed lunch</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <span className="font-semibold">End Destination:</span> Nairobi
          </div>
        </div>
      </section>

      {/* ===== EXACT PDF HIGHLIGHTS ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <p className="text-gray-600 italic">[List of highlights would appear here in PDF]</p>
        </div>
      </section>

      {/* ===== EXACT PDF MAP ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-bold mb-4">Tour itinerary map</h3>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Map image placeholder</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="font-semibold">Start Point</p>
              <p>Nairobi</p>
            </div>
            <div>
              <p className="font-semibold">Day Destination & Accommodation</p>
              <p>Day 1-2 Masai Mara NR Rhino Tourist Camp</p>
              <p>Day 3 Nakuru Buraha Zenoni Hotel & Resort</p>
              <p>Day 4 Naivasha Leisure Apex Resort</p>
              <p>Day 5-6 Amboseli NP Manjaro Tented Camp</p>
              <p>Day 7 Nairobi (No accommodation)</p>
            </div>
            <div>
              <p className="font-semibold">End Point</p>
              <p>Nairobi</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXACT PDF DAY 1 CONTENT ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Masai Mara National Reserve</h2>
          <p className="mb-4">
            This is where it all begins, where you join us on the first step of our journey together. You'll meet your friendly expert guide and we'll get the formalities out of the way quickly so that we can get out there and start enjoying the safari you've been dreaming of.
          </p>
          <p className="mb-4">
            Kenya has some incredible wildlife destinations, but the Masai Mara National Reserve may well be the best of them all. This classic East African landscape of savannah grasslands, rolling hills, acacia woodlands and distant escarpments is itself impressive. But it's also the backdrop to one of the densest concentrations of wildlife on the planet. The Mara is known for its big cats, and this is certainly one of the best places to see lion, leopard and cheetah. You're almost guaranteed to see elephant, giraffe, buffalo, Thomson's gazelle, hippo, wildebeest and zebra, while black rhinos are possible in the Mara Triangle. And that's just the start. The Masai Mara is home to over 500 bird species too.
          </p>

          <h3 className="font-bold text-xl mb-2">Nairobi</h3>
          <p className="mb-4">Get a taste of Kenyan life in Nairobi, with its wildlife, restaurants, nightlife and shopping.</p>

          <h3 className="font-bold text-lg mb-2">Activities Day 1</h3>
          <p className="ml-4 mb-2">→ Transfer by Road, Nairobi via Rift Valley Viewpoint to Rhino Tourist Camp</p>

          <h3 className="font-bold text-lg mb-2">Afternoon</h3>
          <p className="ml-4 mb-2">→ This afternoon you will go with us on a guided game drive through the Masai Mara. There's a chance you'll see big cats, elephants and more, not to mention the Mara's lovely landscapes.</p>

          <h3 className="font-bold text-lg mb-2">Meal Plan - Day 1</h3>
          <p className="ml-4">→ Lunch</p>

          <p className="text-center mt-4 font-semibold">Masai Mara National Reserve</p>
        </div>
      </section>

      {/* ===== EXACT PDF DAY 2 CONTENT ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm text-gray-500 mb-2">2026</p>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="mb-2">Stay in simple safari tents with canvas walls at Rhino Tourist Camp, in the Ololaimutiek region of the Masai Mara. The beds here have mosquito nets, and you're staying in an area dominated by local Maasai communities. It's also in a good location for exploring the wider Masai Mara region and all the wildlife it has to offer.</p>
          </div>

          <p className="text-sm text-gray-500 mb-4">Page 6 Ref. Number: #2026-0089.1 - Mr. Ian Iraya</p>

          <h2 className="text-2xl font-bold mb-4 mt-6">Masai Mara National Reserve</h2>
          <p className="mb-4">Spend more time exploring the stunning natural landscapes and extraordinary wildlife of the Masai Mara National Reserve.</p>

          <div className="mb-4">
            <p className="font-semibold">Accommodation | Day 2</p>
            <p>Rhino Tourist Camp Tented camp | Just outside Masai Mara National Reserve</p>
            <p>Return to Rhino Tourist Camp.</p>
          </div>

          <h3 className="font-bold text-lg mb-2">Activity Day 2</h3>
          <h4 className="font-semibold">Full day</h4>
          <p className="ml-4 mb-2">You'll be heading down more safari trails in search of animals in Masai Mara National Reserve when we take you on a guided game drive. This is the best thing about many safaris, and you'll hopefully see many animals.</p>

          <h3 className="font-bold text-lg mb-2">Meal Plan - Day 2</h3>
          <p className="ml-4">Breakfast, Lunch & Dinner</p>

          <p className="text-center mt-4 font-semibold">Masai Mara National Reserve</p>
        </div>
      </section>

      {/* ===== EXACT PDF DAY 3 CONTENT ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Nakuru</h2>
          <p className="mb-4">An important provincial city next to Lake Nakuru National Park, Nakuru is a busy place with decent restaurants and interesting street life.</p>

          <p className="mb-4">Buraha Zenoni Hotel & Resort combines a convenient city location with proximity to Lake Nakuru National Park; it's a less-than-ten-minute drive from the door of the hotel to the park's Lanet Gate. The hotel draws locals and international visitors, and it all comes together in the bar and restaurant, or around the swimming pool. Ask for a room on one of the upper floors, or spend lots of time on the rooftop enjoying the views.</p>

          <div className="mb-4">
            <p className="font-semibold">Accommodation | Day 3</p>
            <p>Buraha Zenoni Hotel & Resort Hotel</p>
          </div>

          <h3 className="font-bold text-lg mb-2">Activity Day 3</h3>
          <p className="ml-4 mb-2">⇒ Transfer by Road, Masai Mara National Reserve to Buraha Zenoni Hotel & Resort</p>
          <p className="ml-4 mb-2">⇒ Meal Plan - Day 3 ⇒ Breakfast, Lunch & Dinner ⇒ Packed lunch</p>

          <h3 className="font-bold text-lg mb-2">Optional for Day 3</h3>
          <p className="ml-4">Mid morning ⇒ Visit masai mara village, Maasai Village $30.00 Per person, Book with us at anytime</p>

          <p className="text-center mt-4 font-semibold">Nakuru</p>
        </div>
      </section>

      {/* ===== EXACT PDF DAY 4 CONTENT ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Naivasha</h2>

          <h3 className="font-bold text-xl mb-2">Lake Nakuru National Park</h3>
          <p className="mb-4">Combine gorgeous scenery (waterfalls, escarpment, acacia forests and a pretty lake) with amazing wildlife at Lake Nakuru National Park. Among the animals you might see are rhinos, flamingos, Rothschild's giraffes and tree-climbing lions.</p>

          <p className="mb-4">You're close to so many things during our stay at Leisure Apex Resort, including Naivasha city, Lake Naivasha and Hells Gate National Park. Rooms are simple, and the restaurant does a mix of local and international dishes. But it's above all a well-priced choice in a region known for its expensive resorts, which is why it draws a mixed crowd of locals and international visitors.</p>

          <div className="mb-4">
            <p className="font-semibold">Accommodation | Day 4</p>
            <p>Leisure Apex Resort Hotel</p>
          </div>

          <h3 className="font-bold text-lg mb-2">Activities Day 4</h3>
          
          <h4 className="font-semibold">Early Morning</h4>
          <p className="ml-4 mb-2">Early this morning you'll go on a guided game drive in Lake Nakuru National Park. An expert guide will show you the park's beautiful landscapes and help you look for lions, rhinos, flamingos and more.</p>

          <h4 className="font-semibold">Afternoon</h4>
          <p className="ml-4 mb-2">Transfer by Road, Lake Nakuru National Park to Leisure Apex Resort</p>

          <h3 className="font-bold text-lg mb-2">Meal Plan - Day 4</h3>
          <p className="ml-4">Breakfast, Lunch & Dinner Packed lunch</p>
        </div>
      </section>

      {/* ===== EXACT PDF DAY 5 CONTENT ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Amboseli National Park</h2>
          <p className="mb-4">It's possible that you'll never want to leave Amboseli National Park. It's a remarkable place that combines wonderful wildlife viewing with astonishing views, even though it's one of Kenya's smallest major parks. Look for lions and cheetahs, zebras and giraffes, spotted hyenas and wildebeest. Best of all when it comes to animals, Amboseli is known for its population of big-tusked elephants that you can often get really close to. Watching over it all is Mt Kilimanjaro (5895m), Africa's tallest mountain that towers over Amboseli's (and Kenya's) southern boundary.</p>

          <h3 className="font-bold text-xl mb-2">Lake Naivasha</h3>
          <p className="mb-4">Enjoy getting to know Lake Naivasha, with its hippos, zebras and giraffes.</p>

          <div className="mb-4">
            <p className="font-semibold">Accommodation | Day 5</p>
            <p>Manjaro Tented Camp Tented camp | Bordering Amboseli National Park without fences</p>
            <p>At Manjaro Tented Camp, you're perfectly placed to enjoy Amboseli National Park.</p>
          </div>

          <h3 className="font-bold text-lg mb-2">Activities Day 5</h3>
          
          <h4 className="font-semibold">Morning</h4>
          <p className="ml-4 mb-2">⇒ Boat Ride, Lake Naivasha</p>
          <p className="ml-4 mb-2">⇒ Experience Africa in a new way in Crescent Island Game Park on one of our guided walks, learning from our expert guide as you go.</p>

          <h4 className="font-semibold">Afternoon</h4>
          <p className="ml-4 mb-2">⇒ Transfer by Road, Lake Naivasha to Amboseli National Park</p>

          <h3 className="font-bold text-lg mb-2">Meal Plan - Day 5</h3>
          <p className="ml-4">⇒ Breakfast, Lunch & Dinner ⇒ Packed lunch</p>

          <p className="text-center mt-4 font-semibold">Amboseli National Park</p>
        </div>
      </section>

      {/* ===== EXACT PDF DAY 6 CONTENT ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Amboseli National Park</h2>
          <p className="mb-4">You'll return to Amboseli National Park for more wildlife photos with Mt Kilimanjaro as a backdrop.</p>

          <div className="mb-4">
            <p className="font-semibold">Accommodation | Day 6</p>
            <p>Manjaro Tented Camp Tented camp | Bordering Amboseli National Park without fences</p>
            <p>Stay for longer at Manjaro Tented Camp.</p>
          </div>

          <h3 className="font-bold text-lg mb-2">Activity Day 6</h3>
          <p className="ml-4 mb-2">Full day Game drive, Amboseli National Park</p>

          <h3 className="font-bold text-lg mb-2">Meal Plan - Day 6</h3>
          <p className="ml-4">Breakfast, Lunch & Dinner</p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-200 h-40 rounded"></div>
            <div className="bg-gray-200 h-40 rounded"></div>
          </div>
        </div>
      </section>

      {/* ===== EXACT PDF DAY 7 CONTENT ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Final day with us</h2>
          <p className="mb-4">It's a pity that it has to end, but this is where your safari will draw to a close. We're sure that you will return home with so many exciting and happy memories, and we hope that you will join us again on safari sometime in the future.</p>

          <h3 className="font-bold text-lg mb-2">Activity Day 7</h3>
          <p className="ml-4 mb-2">→ Transfer by Road, Amboseli National Park to Nairobi</p>

          <h3 className="font-bold text-lg mb-2">Meal Plan - Day 7</h3>
          <p className="ml-4">→ Breakfast & Lunch → Packed lunch</p>
        </div>
      </section>

      {/* ===== EXACT PDF INCLUSIONS TABLE ===== */}
      <section className="py-8 border-b">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">7 Days / 6 Nights 8x Non Residents August 12, 2026 August 18, 2026</p>

          <h3 className="font-bold text-lg mb-2">ⓘ Included</h3>
          <p className="mb-4">All accommodations, All activities, unless indicated as optional, All transportation (Unless labeled as optional), Meals (As specified in the day-by-day section), Taxes / VAT, Boatride, Guided walk at crescent island, Park entry fees, Tranportation on a safari landcruiser on shared basis, Drinking water (On all days)</p>

          <h3 className="font-bold text-lg mb-2">ⓘ Excluded</h3>
          <p className="mb-4">Additional accommodation before and at the end of the tour, International flights, Personal items (Souvenirs, travel insurance, visa fees, etc.), Tips (Tipping guideline US$10.00 pp per day)</p>

          <h3 className="font-bold text-lg mb-2">Breakdown of Costs</h3>
          <table className="w-full border-collapse border mb-6">
            <tbody>
              <tr>
                <td className="border p-3">4x Per Person Sharing rate</td>
                <td className="border p-3">$1,490.00</td>
                <td className="border p-3">$5,960.00</td>
              </tr>
              <tr>
                <td className="border p-3">6x Per Person Sharing rate</td>
                <td className="border p-3">$1,355.00</td>
                <td className="border p-3">$8,130.00</td>
              </tr>
              <tr>
                <td className="border p-3 font-bold" colSpan={2}>Total in USD</td>
                <td className="border p-3 font-bold">$14,090.00</td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-bold text-lg mb-2">Payment Details</h3>
          <p className="mb-2">Payment details</p>
          <p className="mb-2">Payment instruction</p>
          <p className="mb-1">Account Name: Jae Travel Expeditions Ltd</p>
          <p className="mb-1">Account No.: 0730285271126</p>
          <p className="mb-1">Bank Name: Equity Bank</p>
          <p className="mb-1">Branch: Ngong</p>
          <p className="mb-1">Swift: EQBLKENA</p>
          <p className="mb-1">Bank code: 68</p>
          <p className="mb-4">Branch code: 073</p>

          <h3 className="font-bold text-lg mb-2">Confirm Booking</h3>

          <h3 className="font-bold text-lg mb-2">Optional, not included</h3>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Option</th>
                <th className="border p-3">Destination</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">How to Book</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">Day 3: Visit masai mara village</td>
                <td className="border p-3">Maasai Village</td>
                <td className="border p-3">$30.00 Per person</td>
                <td className="border p-3">Book with us at anytime</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== EXACT PDF COMPANY INFO ===== */}
      <section className="py-8 border-b bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Jae Travel Expeditions</h2>
          <p className="mb-4">
            Our team of travel insiders is obsessed with finding the best things to do everywhere: we travel. From Paris to Phuket to Perth, from traditional tours to once-in-a-lifetime experiences, we have something for every kind of traveler. And we are proud to say that after 17 experience-packed years, we are the world leader.
          </p>
          
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="mb-1">Email: jaetravelexpeditions@gmail.com</p>
          <p className="mb-1">Website: www.jaetravel.co.ke</p>
        </div>
      </section>

      {/* ===== EXACT PDF QUOTE ===== */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl italic text-gray-700 mb-4">
            "Live life with no excuses, travel with no regret" - Oscar Wilde
          </p>

          <h3 className="font-bold text-lg mb-2">Colofon</h3>
          <p className="text-sm text-gray-600">
            Copyright Text Jae Travel Expeditions & SafariOffice Copyright Images SafariBookings.com, Jae Travel Expeditions & SafariOffice View copyright per photographer
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Antony Waititu from Jae Travel Expeditions used the SafariOffice App to create this unique proposal especially for you.
          </p>
        </div>
      </section>

      {/* ===== SEO ENHANCEMENT SECTION ===== */}
      <section className="py-8 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-4 rounded-lg">
              <summary className="font-bold cursor-pointer">What's included in the 7 days budget safari?</summary>
              <p className="mt-2 text-gray-700">All accommodations, all activities, transportation, meals as specified, taxes/VAT, boat ride, guided walk at Crescent Island, park entry fees, and drinking water.</p>
            </details>
            <details className="bg-white p-4 rounded-lg">
              <summary className="font-bold cursor-pointer">What is the group size for shared safari?</summary>
              <p className="mt-2 text-gray-700">The safari operates on a shared basis with 4-8 travelers in a safari Land Cruiser.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ===== BOOKING CTA ===== */}
      <section className="py-8 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Book This Safari</h2>
          <p className="mb-4">Reference Number: #2026-0089.1 - Mr. Ian Iraya</p>
          <div className="flex justify-center gap-4">
            <Link href="/booking/7-days-budget-kenya" className="bg-white text-orange-500 px-6 py-3 rounded-lg font-bold">
              Confirm Booking
            </Link>
            <Link href="https://wa.me/254XXXXXXXXX" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}