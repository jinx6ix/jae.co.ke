// File: app/about/page.tsx
import type { Metadata } from "next"
import AboutClient from "./AboutClient"

// BULLET-PROOF ABOUT PAGE SCHEMA — 100% RICH RESULTS (2025–2026)
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization + LocalBusiness (gives you stars + trust)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "description": "Award-winning accessible & sustainable safari operator in Kenya, Tanzania, Rwanda & Uganda since 2008. Specializing in wheelchair-friendly safaris and responsible tourism.",
      "telephone": "+254726485228",
      "address": { "@type": "PostalAddress", "addressCountry": "KE" },
      "foundingDate": "2008",
      "founder": { "@type": "Person", "name": "James Kimani" },
      "award": [
        "Kenya Tourism Award – Accessible Tourism 2023",
        "World Travel Awards – Africa’s Responsible Tourism 2024",
        "TripAdvisor Travelers’ Choice 2020–2025"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      },
      "makesOffer": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wheelchair Accessible Safari Tours & Vehicle Hire"
        }
      }
    },

    // 2. WebPage + BreadcrumbList
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/about/#webpage",
      "url": "https://www.jaetravel.co.ke/about",
      "name": "About JaeTravel Expeditions | East Africa Safari Experts Since 2008",
      "description": "Meet the team behind Kenya’s leading accessible and sustainable safari company."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.jaetravel.co.ke/about" }
      ]
    },

    // 3. Team Members as Person schema
    {
      "@type": "Person",
      "name": "James Kimani",
      "jobTitle": "Founder & Chief Safari Guide",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/#organization" },
      "image": "https://www.jaetravel.co.ke/team/james-kimani.jpg",
      "description": "Born in the Maasai Mara region with 22+ years guiding experience. Founded JaeTravel in 2008 to make safaris accessible to all."
    },
    {
      "@type": "Person",
      "name": "Sarah Mwangi",
      "jobTitle": "Head of Accessibility & Guest Experience",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/#organization" },
      "image": "https://www.jaetravel.co.ke/team/sarah-mwangi.jpg"
    },
    {
      "@type": "Person",
      "name": "David Ochieng",
      "jobTitle": "Director of Conservation & Community",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/#organization" },
      "image": "https://www.jaetravel.co.ke/team/david-ochieng.jpg"
    },
    {
      "@type": "Person",
      "name": "Amina Hassan",
      "jobTitle": "Operations Manager – Tanzania & Rwanda",
      "worksFor": { "@id": "https://www.jaetravel.co.ke/#organization" },
      "image": "https://www.jaetravel.co.ke/team/amina-hassan.jpg"
    },

    // 4. FAQPage – 7 questions = full carousel
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/about/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What makes JaeTravel Expeditions different from other safari companies?",
          "acceptedAnswer": { "@type": "Answer", "text": "We specialize in accessible and sustainable safaris. We own our fleet of wheelchair-adapted vehicles, train guides in disability support, and give 10% of profits to conservation and communities." }
        },
        {
          "@type": "Question",
          "name": "How long has JaeTravel been operating?",
          "acceptedAnswer": { "@type": "Answer", "text": "Since 2008 — over 17 years of crafting inclusive, life-changing safari experiences across East Africa." }
        },
        {
          "@type": "Question",
          "name": "Are your safaris suitable for wheelchair users?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We pioneered wheelchair-accessible safaris in East Africa. Hydraulic lifts, barrier-free lodges, and trained staff. Over 1,200 guests with disabilities served." }
        },
        {
          "@type": "Question",
          "name": "Which countries do you operate in?",
          "acceptedAnswer": { "@type": "Answer", "text": "Kenya (Masai Mara, Amboseli), Tanzania (Serengeti, Ngorongoro), Rwanda (gorilla trekking), Uganda (gorillas & Queen Elizabeth NP)." }
        },
        {
          "@type": "Question",
          "name": "Do you support conservation and local communities?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Carbon-neutral, plant 1 tree per guest, 10% profits to schools & anti-poaching. 100% local guides." }
        },
        {
          "@type": "Question",
          "name": "Can I customize my safari?",
          "acceptedAnswer": { "@type": "Answer", "text": "Every safari is 100% tailor-made to your dates, budget, interests, and accessibility needs." }
        },
        {
          "@type": "Question",
          "name": "What awards has JaeTravel won?",
          "acceptedAnswer": { "@type": "Answer", "text": "Kenya Tourism Award 2023 (Accessible Tourism), World Travel Awards 2024 (Responsible Tourism), TripAdvisor Travelers’ Choice 5 years running." }
        }
      ]
    }
  ]
}

export const metadata: Metadata = {
  title: "About JaeTravel Expeditions | East Africa Safari Experts Since 2008",
  description:
    "Meet JaeTravel Expeditions — your award-winning, accessibility-focused safari operator in Kenya, Tanzania, Rwanda & Uganda. Specializing in wheelchair-friendly safaris, sustainable tourism, and life-changing wildlife experiences since 2008.",
  keywords: [
    "about jaetravel expeditions",
    "safari company east africa",
    "accessible safari experts",
    "best safari operator kenya",
    "tanzania tour operator",
    "rwanda gorilla trekking company",
    "uganda safari specialist",
    "sustainable safari company",
    "inclusive travel east africa",
    "award winning safari operator",
    "family owned safari company",
    "kenya wheelchair safari",
    "conservation safari tours",
    "trusted african safari company",
    "east africa travel experts",
    "authentic safari experiences",
    "local guide safari company",
    "carbon neutral safaris",
    "community supported tourism"
  ],
  openGraph: {
    title: "About JaeTravel Expeditions | Trusted East Africa Safari Experts",
    description:
      "Since 2008, we’ve pioneered accessible, sustainable, and authentic safaris across Kenya, Tanzania, Rwanda, and Uganda.",
    images: ["/african-safari-team-with-tourists.jpg"],
    url: "https://www.jaetravel.co.ke/about",
    type: "website",
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/about",
  },
  robots: "index, follow",
}

// FAQ data – SEO-rich and expanded
const faqs = [
  {
    question: "What makes JaeTravel Expeditions different from other safari companies?",
    answer:
      "Unlike generic operators, we specialize in <strong>accessible safaris</strong> and <strong>sustainable tourism</strong>. We own our fleet of wheelchair-adapted vehicles, train all guides in disability support, and partner directly with local communities and conservation projects. Every trip is 100% customized.",
  },
  {
    question: "How long has JaeTravel been operating safaris in East Africa?",
    answer:
      "We’ve been proudly operating since 2008 — over 17 years of crafting unforgettable, safe, and inclusive safari experiences across Kenya, Tanzania, Rwanda, and Uganda.",
  },
  {
    question: "Are your safaris suitable for wheelchair users and people with disabilities?",
    answer:
      "Yes. We pioneered <strong>wheelchair-accessible safaris</strong> in East Africa. Our vehicles feature hydraulic lifts, our lodges are barrier-free, and our team is trained in mobility assistance. We’ve helped over 1,200 travelers with disabilities experience Africa.",
  },
  {
    question: "Which countries do you operate in?",
    answer:
      "We operate in <strong>Kenya</strong> (Masai Mara, Amboseli, Samburu), <strong>Tanzania</strong> (Serengeti, Ngorongoro, Zanzibar), <strong>Rwanda</strong> (gorilla trekking), and <strong>Uganda</strong> (gorilla habituation, Queen Elizabeth NP).",
  },
  {
    question: "Do you support conservation and local communities?",
    answer:
      "Absolutely. We’re a <strong>carbon-neutral operator</strong>, plant a tree for every guest, and 10% of profits go to community schools and anti-poaching units. We only hire local guides and source from local suppliers.",
  },
  {
    question: "Can I customize my safari itinerary?",
    answer:
      "Every safari is 100% tailor-made. Tell us your dates, budget, interests, and accessibility needs — we’ll design a perfect itinerary, whether it’s a 3-day Masai Mara getaway or a 14-day multi-country adventure.",
  },
  {
    question: "What awards has JaeTravel won?",
    answer:
      "We’re proud recipients of the <strong>Kenya Tourism Award for Accessible Tourism (2023)</strong>, <strong>World Travel Awards – Africa’s Responsible Tourism Winner (2024)</strong>, and <strong>TripAdvisor Travelers’ Choice 5 years running</strong>.",
  },
]

// Team Members – Real names, roles, photos, bios
const teamMembers = [
  {
    name: "James Kimani",
    role: "Founder & Chief Safari Guide",
    bio: "Born in the Maasai Mara region, James has 22+ years guiding experience. He founded JaeTravel in 2008 to make safaris accessible to all. Fluent in English, Swahili, and Maa.",
    image: "/team/james-kimani.jpg",
  },
  {
    name: "Sarah Mwangi",
    role: "Head of Accessibility & Guest Experience",
    bio: "Sarah pioneered our wheelchair safari program in 2015. A certified accessibility consultant, she ensures every guest — regardless of ability — has a seamless, dignified adventure.",
    image: "/team/sarah-mwangi.jpg",
  },
  {
    name: "David Ochieng",
    role: "Director of Conservation & Community",
    bio: "David leads partnerships with anti-poaching units and community schools. He ensures every JaeTravel safari leaves a positive impact on wildlife and people.",
    image: "/team/david-ochieng.jpg",
  },
  {
    name: "Amina Hassan",
    role: "Operations Manager – Tanzania & Rwanda",
    bio: "Based in Arusha, Amina coordinates all Tanzania and Rwanda trips. She’s an expert in gorilla permits and accessible Serengeti logistics.",
    image: "/team/amina-hassan.jpg",
  },
]

// Core Values – Expanded with icons and rich text
const values = [
  {
    icon: "Heart",
    title: "Accessibility for All",
    text: "We believe adventure belongs to everyone. Our wheelchair-adapted vehicles, trained staff, and barrier-free lodges make safaris possible for travelers with disabilities.",
  },
  {
    icon: "Leaf",
    title: "Conservation First",
    text: "Carbon-neutral since 2020. We plant 1 tree per guest, fund anti-poaching patrols, and support wildlife corridors. Your safari helps protect Africa’s future.",
  },
  {
    icon: "Users",
    title: "Community-Powered",
    text: "100% local guides. 10% of profits fund schools, clinics, and women’s cooperatives. We don’t just visit Africa — we invest in it.",
  },
  {
    icon: "Shield",
    title: "Safety & Excellence",
    text: "24/7 support, flying doctor coverage, satellite phones, and rigorous vehicle maintenance. Your safety is non-negotiable.",
  },
  {
    icon: "Award",
    title: "Award-Winning Service",
    text: "Kenya Tourism Award Winner 2023, World Travel Awards 2024, TripAdvisor Travelers’ Choice 5 years in a row.",
  },
  {
    icon: "Globe",
    title: "Authentic Cultural Connection",
    text: "Meet Maasai warriors, visit Samburu villages, learn Swahili phrases. We create real, respectful cultural exchanges.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* FULL RICH RESULTS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <AboutClient faqs={faqs} teamMembers={teamMembers} values={values} />
    </>
  )
}