// app/6-sustainable-travel-tips-2/page.tsx
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "6 Sustainable Travel Tips for East Africa Safari | Eco-Friendly Kenya, Tanzania, Rwanda & Uganda",
  description:
    "Discover 6 proven sustainable travel tips for your East Africa safari. Reduce plastic waste, support local communities, choose eco-lodges, and offset carbon — all while enjoying Kenya, Tanzania, Rwanda & Uganda responsibly.",
  keywords: [
    "sustainable travel east africa",
    "eco friendly safari kenya",
    "responsible tourism tanzania",
    "green travel rwanda uganda",
    "carbon offset safari",
    "plastic free safari",
    "eco lodges masai mara serengeti",
    "sustainable tourism africa",
    "ethical wildlife tourism"
  ],
  openGraph: {
    title: "6 Sustainable Travel Tips for East Africa Safari",
    description: "Travel responsibly in Kenya, Tanzania, Rwanda & Uganda. Eco-friendly tips that protect wildlife and support local communities.",
    images: ["/blog/sustainable-travel-tips.jpg"],
    url: "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2",
    type: "article"
  },
  alternates: { 
    canonical: "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2",
    languages: {
      'en': 'https://www.jaetravel.co.ke/6-sustainable-travel-tips-2',           // Main English/global
      'en-US': 'https://www.jaetravel.co.ke/6-sustainable-travel-tips-2',       // US
      'en-GB': 'https://www.jaetravel.co.ke/6-sustainable-travel-tips-2',       // UK (optional)
      'en-AU': 'https://www.jaetravel.co.ke/6-sustainable-travel-tips-2',       // Australia (optional)
      'en-CA': 'https://www.jaetravel.co.ke/6-sustainable-travel-tips-2',       // Canada (optional)
      'x-default': 'https://www.jaetravel.co.ke/6-sustainable-travel-tips-2',   // Fallback
    },
   },
}

// FINAL BULLET-PROOF SCHEMA — NOW WITH BREADCRUMBS + ALL RICH RESULTS
const sustainableTravelSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228"
    },

    // 2. LocalBusiness (gives you 5-star rating)
    {
      "@type": "LocalBusiness",
      "@id": "https://www.jaetravel.co.ke/#business",
      "name": "JAE Travel – Sustainable & Accessible Safaris East Africa",
      "url": "https://www.jaetravel.co.ke",
      "telephone": "+254726485228",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      }
    },

    // 3. WebPage
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2/#webpage",
      "url": "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2",
      "name": "6 Sustainable Travel Tips for East Africa Safari",
      "description": "Learn how to travel responsibly in Kenya, Tanzania, Rwanda and Uganda with eco-friendly practices."
    },

    // 4. BreadcrumbList — NOW INCLUDED (Google loves this!)
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jaetravel.co.ke"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.jaetravel.co.ke/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "6 Sustainable Travel Tips for East Africa Safari",
          "item": "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2"
        }
      ]
    },

    // 5. Article
    {
      "@type": "Article",
      "@id": "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2/#article",
      "headline": "6 Sustainable Travel Tips for East Africa Safari Adventures",
      "image": "https://www.jaetravel.co.ke/blog/sustainable-travel-tips.jpg",
      "author": { "@type": "Organization", "name": "JAE Travel Expeditions" },
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" },
      "datePublished": "2025-06-15",
      "dateModified": "2025-12-03",
      "mainEntityOfPage": { "@id": "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2/#webpage" }
    },

    // 6. FAQPage (6 questions = full carousel)
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/6-sustainable-travel-tips-2/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is sustainable travel in East Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "Sustainable travel in East Africa means minimizing your environmental footprint while supporting local communities and preserving wildlife and ecosystems for future generations." }
        },
        {
          "@type": "Question",
          "name": "How can I reduce plastic waste while on safari?",
          "acceptedAnswer": { "@type": "Answer", "text": "Bring a reusable water bottle, shopping bag, and utensils. Many eco-lodges provide refill stations and have eliminated single-use plastics." }
        },
        {
          "@type": "Question",
          "name": "Are eco-friendly accommodations more expensive?",
          "acceptedAnswer": { "@type": "Answer", "text": "Not necessarily. Many sustainable lodges in Rwanda and Uganda offer competitive rates while funding conservation and community projects." }
        },
        {
          "@type": "Question",
          "name": "Why support local businesses on safari?",
          "acceptedAnswer": { "@type": "Answer", "text": "Your spending directly benefits East African communities, artisans, and guides — preserving authentic cultural experiences." }
        },
        {
          "@type": "Question",
          "name": "How do I offset my carbon footprint?",
          "acceptedAnswer": { "@type": "Answer", "text": "Offset emissions via verified programs supporting reforestation, renewable energy, or conservation projects in East Africa." }
        },
        {
          "@type": "Question",
          "name": "What are the best eco-lodges in East Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "Top eco-lodges use solar power, recycled materials, and fund gorilla conservation and anti-poaching initiatives across Kenya, Tanzania, Rwanda & Uganda." }
        }
      ]
    }
  ]
}

export default function SustainableTravelTips() {
  const faqs = [
    {
      question: "What is sustainable travel in East Africa?",
      answer: "Sustainable travel in East Africa means minimizing your environmental footprint while supporting local communities and preserving the incredible wildlife and ecosystems of Kenya, Tanzania, Rwanda, and Uganda for future generations of safari enthusiasts.",
    },
    {
      question: "How can I reduce plastic waste while on safari?",
      answer: "Bring a reusable water bottle, shopping bag, and utensils to avoid single-use plastics. Many eco-lodges in Kenya and Tanzania provide refill stations. Some safari camps have completely eliminated single-use plastics through innovative conservation programs.",
    },
    {
      question: "Are eco-friendly accommodations more expensive in East Africa?",
      answer: "Not necessarily. Many sustainable lodges in Rwanda and Uganda offer competitive rates while actively supporting conservation efforts and local communities. The long-term benefits to the environment and local economies make them excellent value.",
    },
    {
      question: "Why is it important to support local businesses on safari?",
      answer: "Spending money locally ensures your travel benefits East African communities directly, helping small business owners, artisans, and guides while preserving authentic cultural experiences in Maasai villages and local markets.",
    },
    {
      question: "How do I offset my carbon footprint from safari travel?",
      answer: "You can offset your emissions by donating to verified carbon offset programs that support reforestation in East Africa, renewable energy initiatives, or conservation projects in national parks across Kenya, Tanzania, Rwanda, and Uganda.",
    },
    {
      question: "What are the best eco-lodges in East Africa?",
      answer: "East Africa offers numerous exceptional eco-lodges that prioritize sustainability. In Kenya, look for camps in the Masai Mara with solar power and community partnerships. Tanzania has lodges using recycled materials and supporting anti-poaching units. Rwanda and Uganda feature eco-lodges that fund gorilla conservation and local education programs.",
    },
  ]

  return (
    <>
      {/* FULL RICH RESULTS SCHEMA — 5 stars + FAQ + Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sustainableTravelSchema) }}
      />

      <main className="max-w-4xl mx-auto px-6 py-16 prose prose-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-balance">
          6 Sustainable Travel Tips for East Africa Safari Adventures
        </h1>

        <Image
          src="/bwindi-forest-uganda-gorilla-safaris.jpg"
          alt="Eco-friendly sustainable safari in East Africa - responsible travel practices in Kenya, Tanzania, Rwanda and Uganda"
          width={1200}
          height={720}
          className="rounded-2xl my-10 w-full object-cover shadow-xl"
          priority
        />

        <p className="text-xl leading-relaxed text-muted-foreground">
          Sustainable travel in <strong>East Africa</strong> is about minimizing your environmental impact while 
          supporting local communities and preserving the incredible wildlife and natural beauty of 
          <strong> Kenya, Tanzania, Rwanda, and Uganda</strong> for future generations. Here are six essential 
          ways to travel more responsibly on your next safari.
        </p>

        <h2>1. Choose Eco-Friendly Accommodations</h2>
        <p>
          Look for lodges and camps that use renewable energy, reduce waste, and employ local staff. 
          Many <strong>eco-lodges in Kenya and Tanzania</strong> are leading the way in conservation and community support. 
          These establishments often partner with local villages, use solar power, and implement water conservation 
          measures that protect the fragile ecosystems of the <strong>Masai Mara</strong> and <strong>Serengeti</strong>.
        </p>

        <h2>2. Support Local East African Businesses</h2>
        <p>
          Buy local crafts from <strong>Maasai markets in Kenya</strong>, eat at locally-owned restaurants, and book 
          experiences run by community guides. This ensures your money stays within <strong>East African communities</strong> 
          and benefits the people who make your safari experience authentic and memorable.
        </p>

        <h2>3. Reduce Plastic Waste on Safari</h2>
        <p>
          Carry a reusable water bottle, shopping bag, and utensils to avoid single-use plastics. Many 
          <strong>safari camps in Uganda and Rwanda</strong> have implemented plastic-free policies and provide 
          refill stations. Some <strong>East Africa national parks</strong> are banning single-use plastics entirely.
        </p>

        <h2>4. Respect Wildlife and Natural Habitats</h2>
        <p>
          Observe animals from a safe distance and never feed wildlife. Stick to designated trails in 
          <strong>East Africa's national parks</strong> to avoid damaging fragile ecosystems. Follow your guide's 
          instructions carefully during <strong>gorilla trekking in Rwanda and Uganda</strong>.
        </p>

        <h2>5. Travel Light and Choose Efficient Routes</h2>
        <p>
          Pack only what you need to reduce emissions from transportation. Consider combining 
          <strong>Kenya and Tanzania safaris</strong> efficiently or exploring <strong>Rwanda and Uganda</strong> 
          together to minimize internal flights and reduce your overall carbon footprint.
        </p>

        <h2>6. Offset Your Safari Carbon Footprint</h2>
        <p>
          Many airlines and conservation organizations allow you to offset your emissions by supporting 
          reforestation projects in <strong>East Africa</strong> and clean energy initiatives. Your contributions 
          can help fund tree planting in <strong>Kenyan watersheds</strong> or support renewable energy in 
          <strong>Tanzanian communities</strong>.
        </p>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-10 rounded-3xl my-16 border">
          <h3 className="text-2xl font-bold mb-4">Why Sustainable Travel Matters in East Africa</h3>
          <p className="text-lg">
            The <strong>wildlife and ecosystems of East Africa</strong> face numerous challenges from climate change, 
            habitat loss, and human-wildlife conflict. By choosing <strong>sustainable travel practices</strong>, 
            you're directly contributing to conservation efforts that protect iconic species like elephants, 
            lions, and mountain gorillas.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 p-6 bg-muted/30 rounded-2xl hover:bg-muted/50 transition">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <div className="mt-20 p-12 bg-primary text-primary-foreground rounded-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for a Truly Sustainable Safari?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let us design an eco-friendly, community-supporting safari across Kenya, Tanzania, Rwanda, and Uganda — 
            with zero compromise on comfort or adventure.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-xl px-12 py-8">
            <Link href="/contact">Plan Your Sustainable Safari →</Link>
          </Button>
        </div>
      </main>
    </>
  )
}