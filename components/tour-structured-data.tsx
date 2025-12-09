interface TourStructuredDataProps {
  tour: {
    title: string
    description: string
    price: number
    duration: string
    rating: number
    reviewCount: number
    country: string
    highlights: string[]
    included: string[]
    slug: string
  }
}

export function TourStructuredData({ tour }: TourStructuredDataProps) {
  // Safely handle arrays with defaults
  const highlights = tour.highlights || []
  const included = tour.included || []

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    touristType: "Safari enthusiasts, wildlife lovers, adventure travelers",
    itinerary: {
      "@type": "ItemList",
      itemListElement: highlights.map((highlight: string, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: highlight,
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      url: `https://www.jaetravel.co.ke/tours/${tour.slug}`,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: tour.price,
        priceCurrency: "USD",
        valueAddedTaxIncluded: true,
      },
    },
    provider: {
      "@type": "TravelAgency",
      name: "JaeTravel Expeditions",
      url: "https://www.jaetravel.co.ke",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    duration: tour.duration,
    location: {
      "@type": "Place",
      name: tour.country,
      address: {
        "@type": "PostalAddress",
        addressCountry: tour.country,
      },
    },
    includesObject: included.map((item: string) => ({
      "@type": "Thing",
      name: item,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}