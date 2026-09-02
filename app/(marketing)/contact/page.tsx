// app/contact/page.tsx
import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import JsonLd from "@/components/JsonLd";
import { CmsPage } from "@/app/(marketing)/_components/CmsPage";

export const metadata: Metadata = {
  title: "Contact Us | East Africa Accessible Safari Experts",
  description:
    "Contact East Africa's leading wheelchair-accessible safari operator. Book Kenya, Tanzania, Rwanda & Uganda safaris via WhatsApp, email or phone.",
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
      'en': 'https://www.jaetravel.co.ke/contact',
      'en-US': 'https://www.jaetravel.co.ke/contact',
      'en-GB': 'https://www.jaetravel.co.ke/contact',
      'en-AU': 'https://www.jaetravel.co.ke/contact',
      'en-CA': 'https://www.jaetravel.co.ke/contact',
      'x-default': 'https://www.jaetravel.co.ke/contact',
    },
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "Jae Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE"
      }
    },
    {
      "@type": "ContactPage",
      "@id": "https://www.jaetravel.co.ke/contact/#webpage",
      "url": "https://www.jaetravel.co.ke/contact",
      "name": "Contact Jae Travel Expeditions",
      "isPartOf": {
        "@id": "https://www.jaetravel.co.ke/#website"
      }
    }
  ]
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <CmsPage slug="contact" fallback={<ContactPageClient />} />
    </>
  );
}
