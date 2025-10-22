import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title:
    "About JaeTravel Expeditions | East Africa Safari Experts & Accessible Travel Specialists",
  description:
    "Learn about JaeTravel Expeditions, your trusted partner for East African safaris since 2008. Specializing in accessible travel, conservation tourism, and unforgettable wildlife experiences across Kenya, Tanzania, Rwanda, and Uganda.",
  keywords: [
    "about jaetravel expeditions",
    "safari company east africa",
    "accessible safari experts",
    "conservation tourism",
    "safari specialists kenya",
    "tanzania tour operator",
    "rwanda gorilla trekking company",
    "uganda safari operator",
    "sustainable safari tourism",
    "inclusive travel company",
    "african safari experts",
    "wildlife tour specialists",
    "east africa travel company",
    "trusted safari operator",
    "award winning safari company",
  ],
}

// FAQ data that can be shared between server and client
const faqs = [
  {
    question: "What makes JaeTravel Expeditions unique?",
    answer:
      "We specialize in accessible and sustainable safaris across East Africa, ensuring travelers of all abilities can enjoy authentic wildlife experiences while supporting local communities and conservation.",
  },
  {
    question: "Do you offer customized safari packages?",
    answer:
      "Yes! Every trip we organize is fully customizable to match your interests, travel dates, accessibility needs, and budget.",
  },
  {
    question: "Are your safaris suitable for travelers with disabilities?",
    answer:
      "Absolutely. We're pioneers in accessible safaris, offering wheelchair-friendly vehicles, lodges, and expert support staff to ensure comfort and safety.",
  },
  {
    question: "Which countries do you operate in?",
    answer:
      "We currently operate across Kenya, Tanzania, Rwanda, and Uganda — offering everything from classic safaris to gorilla trekking adventures.",
  },
  {
    question: "How do you support local communities?",
    answer:
      "We work with local guides, artisans, and conservation projects, ensuring tourism directly benefits the communities that make East Africa so special.",
  },
]

// Team data
const teamMembers = [
  {
    name: "James Kimani",
    role: "Founder & Lead Guide",
    bio: "With over 20 years of safari experience, James founded JaeTravel to share his love of East African wildlife.",
  },
  {
    name: "Sarah Mwangi",
    role: "Accessibility Specialist",
    bio: "Sarah pioneered our accessible safari program, ensuring every traveler can experience the magic of Africa.",
  },
  {
    name: "David Ochieng",
    role: "Conservation Director",
    bio: "David leads our conservation initiatives, working with local communities and wildlife organizations.",
  },
]

// Values data
const values = [
  { icon: "Heart", title: "Accessibility for All", text: "We believe everyone deserves to experience the wonder of an African safari, regardless of physical ability." },
  { icon: "Leaf", title: "Conservation First", text: "We're committed to sustainable tourism that protects wildlife and supports local conservation efforts." },
  { icon: "Users", title: "Community Support", text: "We partner with local communities, ensuring tourism benefits the people who call East Africa home." },
  { icon: "Shield", title: "Safety & Quality", text: "Your safety and comfort are our top priorities, with rigorous standards for all our services." },
  { icon: "Award", title: "Excellence", text: "We strive for excellence in every detail, from planning to execution, ensuring unforgettable experiences." },
  { icon: "Globe", title: "Cultural Respect", text: "We honor and celebrate the diverse cultures of East Africa, promoting authentic cultural exchanges." },
]

export default function AboutPage() {
  return (
    <AboutClient 
      faqs={faqs}
      teamMembers={teamMembers}
      values={values}
    />
  )
}