// app/contact/page.tsx
import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us | East Africa Accessible Safari Experts",
  description:
    "Contact East Africa’s leading wheelchair-accessible safari operator. Book Kenya, Tanzania, Rwanda & Uganda safaris via WhatsApp, email or phone.",
  keywords: [
    "contact Jae Travel",
    "accessible safari Kenya",
    "wheelchair safari booking",
    "safari operator Nairobi",
    "Rwanda gorilla trekking contact",
    "Tanzania safari inquiry",
  ],
  openGraph: {
    title: "Contact Jae Travel Expeditions - Accessible Safaris East Africa",
    description:
      "Ready for your dream safari? Our team responds within 24 hours. Specializing in wheelchair-accessible tours across Kenya, Tanzania, Rwanda & Uganda.",
    images: [
      {
        url: "https://www.jaetravel.co.ke/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Jae Travel Expeditions - Contact Us for Accessible Safaris",
      },
    ],
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/contact",
    languages: {
      'en': 'https://www.jaetravel.co.ke/contact',           // Main English/global
      'en-US': 'https://www.jaetravel.co.ke/contact',       // US
      'en-GB': 'https://www.jaetravel.co.ke/contact',       // UK (optional)
      'en-AU': 'https://www.jaetravel.co.ke/contact',       // Australia (optional)
      'en-CA': 'https://www.jaetravel.co.ke/contact',       // Canada (optional)
      'x-default': 'https://www.jaetravel.co.ke/contact',   // Fallback
    },
  },
};

// Server-side JSON-LD (recommended for better SEO)
const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      name: "Jae Travel Expeditions",
      url: "https://www.jaetravel.co.ke",
      logo: "https://www.jaetravel.co.ke/logo.png",
      description:
        "East Africa’s leading wheelchair-accessible safari operator. Kenya, Tanzania, Rwanda & Uganda.",
      telephone: "+254726485228",
      email: "info@jaetravel.co.ke",
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressLocality: "Nairobi",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "14:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        reviewCount: "723",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "David Chen" },
          datePublished: "2025-08-20",
          reviewBody:
            "Incredible response time from JaeTravel! Inquired via WhatsApp about an accessible safari and got a detailed quote within an hour.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Sarah Johnson" },
          datePublished: "2025-07-15",
          reviewBody:
            "Excellent support and patient answers. Helped us plan the perfect accessible safari.",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/contact/#webpage",
      url: "https://www.jaetravel.co.ke/contact",
      name: "Contact Us | Jae Travel Expeditions",
      description:
        "Get in touch for safari bookings, vehicle hire, or custom accessible tours. 24/7 support.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.jaetravel.co.ke/contact/contact-hero.jpg",
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        "@id": "https://www.jaetravel.co.ke/contact/#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/contact/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.jaetravel.co.ke",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://www.jaetravel.co.ke/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      "@id": "https://www.jaetravel.co.ke/contact/#contactpage",
      url: "https://www.jaetravel.co.ke/contact",
      name: "Contact Jae Travel Expeditions",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How quickly do you respond to inquiries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We reply to all messages within 24 hours — often within minutes on WhatsApp.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer wheelchair-accessible tours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — we specialize in fully accessible safaris with hydraulic-lift vehicles and barrier-free lodges.",
          },
        },
        {
          "@type": "Question",
          name: "What are your office hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Monday–Friday: 8am–6pm EAT, Saturday: 9am–2pm EAT. Emergency support available 24/7 via WhatsApp.",
          },
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      {/* Structured Data - Server Rendered */}
      <JsonLd data={contactPageSchema} id={"contact-schema"} />

      <ContactPageClient />
    </>
  );
}