import { accessibleTours, getTourBySlug } from "@/lib/accessiblemara"
import type { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import AccessibleTourClient from "./AccessibleTourClient"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const tour = getTourBySlug(params.slug)
  if (!tour) return {}

  const absoluteImageUrl = `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`

  return {
    title: tour.title,
    description: tour.metaDescription,
    keywords: tour.keywords,
    alternates: {
      canonical: `https://www.jaetravel.co.ke${tour.url}`,
      languages: {
        en: `https://www.jaetravel.co.ke${tour.url}`,
        "en-US": `https://www.jaetravel.co.ke${tour.url}`,
        "en-GB": `https://www.jaetravel.co.ke${tour.url}`,
        "x-default": `https://www.jaetravel.co.ke${tour.url}`,
      },
    },
    openGraph: {
      title: tour.title,
      description: tour.metaDescription,
      url: `https://www.jaetravel.co.ke${tour.url}`,
      siteName: "JaeTravel Expeditions",
      images: [{
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: tour.imageAlt || tour.title,
      }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.metaDescription,
      images: [absoluteImageUrl],
      creator: "@jaetravelke",
    },
    other: {
      "og:price:amount": tour.price.toString(),
      "og:price:currency": "USD",
    },
  }
}

export async function generateStaticParams() {
  return accessibleTours.map((tour) => ({ slug: tour.slug }))
}

export default async function AccessibleTourDetailPage(props: Props) {
  const params = await props.params
  const tour = getTourBySlug(params.slug)
  if (!tour) notFound()

  const absoluteUrl = `https://www.jaetravel.co.ke${tour.url}`
  const absoluteImageUrl = `https://www.jaetravel.co.ke${tour.image.startsWith('/') ? tour.image : `/${tour.image}`}`
  const hasDiscount = tour.originalPrice && tour.originalPrice > tour.price

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${absoluteUrl}#product`,
        "name": tour.title,
        "image": absoluteImageUrl,
        "description": tour.shortDescription,
        "sku": tour.id,
        "brand": { "@type": "Brand", "name": "JaeTravel Expeditions" },
        "offers": {
          "@type": "Offer",
          "url": tour.bookingUrl || absoluteUrl,
          "priceCurrency": "USD",
          "price": tour.price.toString(),
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": { "@type": "Organization", "name": "JaeTravel Expeditions", "url": "https://www.jaetravel.co.ke" }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tour.rating.toString(),
          "reviewCount": tour.reviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "TouristTrip",
        "@id": `${absoluteUrl}#tour`,
        "name": tour.title,
        "description": tour.longDescription,
        "image": absoluteImageUrl,
        "tourBookingPage": tour.bookingUrl || absoluteUrl,
        "itinerary": tour.itinerary.map((day: any) => ({
          "@type": "Trip",
          "name": `Day ${day.day}: ${day.title}`,
          "description": day.content
        })),
        "provider": { "@type": "Organization", "name": "JaeTravel Expeditions", "url": "https://www.jaetravel.co.ke" },
        "duration": tour.duration,
        "startLocation": { "@type": "Place", "name": "Nairobi, Kenya" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke/" },
          { "@type": "ListItem", "position": 2, "name": "Accessible Safaris", "item": "https://www.jaetravel.co.ke/accessible-migration" },
          { "@type": "ListItem", "position": 3, "name": tour.title, "item": absoluteUrl }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": tour.faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AccessibleTourClient
        tour={tour}
        absoluteUrl={absoluteUrl}
        absoluteImageUrl={absoluteImageUrl}
        hasDiscount={hasDiscount}
      />
    </>
  )
}