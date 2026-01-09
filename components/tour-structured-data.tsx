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
  const highlights = tour.highlights || []
  const included = tour.included || []

  // Main TouristTrip schema — keeps all your detailed fields
  const touristTripData = {
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
      price: tour.price.toString(),
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
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

  // Separate Product schema — only for valid aggregateRating support
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    description: tour.description,
    offers: {
      "@type": "Offer",
      price: tour.price.toString(),
      priceCurrency: "USD",
      url: `https://www.jaetravel.co.ke/tours/${tour.slug}`,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: tour.reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: tour.rating.toFixed(1),
      reviewCount: tour.reviewCount,
      bestRating: "5",
      worstRating: "1",
    } : undefined,
  }

  // Clean up undefined fields
  const cleanProductData = Object.fromEntries(
    Object.entries(productData).filter(([_, v]) => v !== undefined)
  )

  return (
    <>
      {/* Full TouristTrip with all original details */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripData) }}
      />

      {/* Separate Product block for valid star ratings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanProductData) }}
      />
    </>
  )
}