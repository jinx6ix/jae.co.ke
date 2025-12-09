interface VehicleStructuredDataProps {
  vehicle: {
    name: string
    description: string
    pricePerDay: number
    capacity: string
    features: string[]
    slug: string
    image: string
  }
}

export function VehicleStructuredData({ vehicle }: VehicleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.image,
    brand: {
      "@type": "Brand",
      name: "JaeTravel Expeditions",
    },
    offers: {
      "@type": "Offer",
      price: vehicle.pricePerDay,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: vehicle.pricePerDay,
        priceCurrency: "USD",
        unitText: "per day",
      },
      seller: {
        "@type": "Organization",
        name: "JaeTravel Expeditions",
      },
      url: `https://www.jaetravel.co.ke/vehicle-hire/${vehicle.slug}`,
    },
    additionalProperty: vehicle.features.map((feature) => ({
      "@type": "PropertyValue",
      name: "Feature",
      value: feature,
    })),
    category: "Vehicle Rental",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
