// File: app/about/page.tsx
import type { Metadata } from "next"
import AboutClient from "./AboutClient"

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
    canonical: "https://jaetravel.co.ke/about",
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
    <AboutClient faqs={faqs} teamMembers={teamMembers} values={values} />
  )
}