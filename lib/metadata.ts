// lib/metadata.ts
// Comprehensive metadata builder for all pages with SEO/AEO/GEO optimizations

const BASE = "https://www.jaetravel.co.ke"

export interface MetadataOptions {
  title: string
  description: string
  canonicalUrl?: string
  image?: string
  publishedAt?: string
  updatedAt?: string
  type?: 'website' | 'article' | 'product' | 'tour' | 'vehicle'
  locale?: string
  alternates?: Record<string, string>
  noindex?: boolean
  breadcrumbs?: Array<{ name: string; url: string }>
}

export interface BusinessInfo {
  name: string
  phone: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  openingHours: {
    dayOfWeek: string[]
    opens: string
    closes: string
  }[]
  geo: {
    latitude: string
    longitude: string
  }
  socialProfiles: {
    facebook?: string
    instagram?: string
    youtube?: string
    tiktok?: string
    safariBookings?: string
    tripAdvisor?: string
  }
  currencies: string[]
  priceRange?: string
}

// Verified business information from user input
export const BUSINESS_INFO: BusinessInfo = {
  name: "JaeTravel Expeditions",
  phone: "+254726485228",
  email: "info@jaetravel.co.ke",
  address: {
    streetAddress: "Karen Roundabout",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE"
  },
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00"
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00"
    }
  ],
  geo: {
    latitude: "-1.286389",
    longitude: "36.817223"
  },
  socialProfiles: {
    safariBookings: "https://www.safaribookings.com/p6888",
    tripAdvisor: "https://www.tripadvisor.com/JaeTravelExpeditions"
  },
  currencies: ["USD"],
  priceRange: "$$$"
}

export function buildMetadata(options: MetadataOptions) {
  const {
    title,
    description,
    canonicalUrl,
    image = "/og-image.jpg",
    publishedAt,
    updatedAt,
    type = 'website',
    locale = 'en_US',
    alternates,
    noindex = false,
    breadcrumbs = []
  } = options

  // Ensure title is 45-60 characters
  const optimizedTitle = title.length > 60
    ? title.substring(0, 57) + '...'
    : title.length < 45
    ? title + ' | JaeTravel Expeditions'
    : title

  // Ensure description is 120-155 characters
  const optimizedDescription = description.length > 155
    ? description.substring(0, 152) + '...'
    : description.length < 120
    ? description + ' Contact JaeTravel Expeditions for wheelchair accessible safaris in Kenya.'
    : description

  const url = canonicalUrl || BASE
  const fullImageUrl = image.startsWith('http') ? image : `${BASE}${image}`

  // Build alternates - only one set per page
  const languageAlternates = alternates || {
    'en': `${BASE}`,
    'fr': `${BASE}/fr`,
    'de': `${BASE}/de`,
    'it': `${BASE}/it`,
    'hi': `${BASE}/hi`,
    'ar': `${BASE}/ar`,
    'zh': `${BASE}/zh`,
    'x-default': `${BASE}`
  }

  const metadata: any = {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: [
      'wheelchair accessible safari Kenya',
      'accessible safari vehicles',
      'disabled friendly tours East Africa',
      'hydraulic lift safari vehicle',
      'Masai Mara accessible tours',
      'gorilla trekking wheelchair accessible',
      'JaeTravel Expeditions'
    ].join(', '),
    authors: [{ name: 'JaeTravel Expeditions' }],
    creator: 'JaeTravel Expeditions',
    publisher: 'JaeTravel Expeditions',
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          }
        },
    alternates: {
      canonical: url,
      languages: languageAlternates
    },
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: url,
      siteName: 'JaeTravel Expeditions',
      locale: locale,
      type: type,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: optimizedTitle,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
      images: [fullImageUrl],
      creator: '@JaeTravel',
      site: '@JaeTravel'
    },
    other: {
      'geo.region': 'KE-30',
      'geo.placename': 'Nairobi, Kenya',
      'geo.position': `${BUSINESS_INFO.geo.latitude};${BUSINESS_INFO.geo.longitude}`,
      ICBM: `${BUSINESS_INFO.geo.latitude}, ${BUSINESS_INFO.geo.longitude}`,
      'og:locale:alternate': ['fr_FR', 'de_DE', 'it_IT', 'hi_IN', 'ar_AE', 'zh_CN'].join(', ')
    }
  }

  // Add dates for articles/blog posts
  if (publishedAt) {
    metadata.publishedTime = publishedAt
    metadata.openGraph.publishedTime = publishedAt
  }

  if (updatedAt) {
    metadata.modifiedTime = updatedAt
    metadata.openGraph.modifiedTime = updatedAt
  }

  // Add article meta for blog posts
  if (type === 'article' || type === 'blog') {
    metadata.article = {
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      authors: ['JaeTravel Expeditions'],
      tags: ['safari', 'accessible travel', 'Kenya', 'wheelchair accessible']
    }
  }

  // Add breadcrumb structured data URL
  if (breadcrumbs.length > 0) {
    metadata.other = {
      ...metadata.other,
      'breadcrumb-jsonld': `${url}#breadcrumb`
    }
  }

  return metadata
}

// Helper to build organization schema
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness', 'Organization'],
    '@id': `${BASE}/#organization`,
    name: BUSINESS_INFO.name,
    url: BASE,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE}/logo.png`,
      width: 512,
      height: 512
    },
    image: `${BASE}/og-image.jpg`,
    description: 'East Africa\'s leading wheelchair accessible safari operator with German hydraulic lift vehicles, disability-friendly lodges, and expert guides.',
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_INFO.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude
    },
    openingHoursSpecification: BUSINESS_INFO.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      ...hours
    })),
    priceRange: BUSINESS_INFO.priceRange,
    areaServed: ['KE', 'TZ', 'RW', 'UG'],
    sameAs: Object.values(BUSINESS_INFO.socialProfiles).filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_INFO.phone,
      contactType: 'Customer Service',
      availableLanguage: ['English', 'French', 'German', 'Italian', 'Hindi', 'Arabic', 'Chinese'],
      areaServed: ['KE', 'TZ', 'RW', 'UG']
    }
  }
}

// Helper to build website schema
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: 'JaeTravel Expeditions',
    url: BASE,
    description: 'Wheelchair accessible safari tours and vehicle hire in Kenya, Tanzania, Rwanda, and Uganda.',
    inLanguage: ['en', 'fr', 'de', 'it', 'hi', 'ar', 'zh'],
    publisher: {
      '@id': `${BASE}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

// Helper to build breadcrumb schema
export function buildBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>, currentUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumb`,
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Helper to build webpage schema
export function buildWebPageSchema(options: {
  url: string
  title: string
  description: string
  publishedAt?: string
  updatedAt?: string
  breadcrumbId?: string
  primaryImageId?: string
  aboutId?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': options.url,
    url: options.url,
    name: options.title,
    description: options.description,
    inLanguage: 'en',
    isPartOf: {
      '@id': `${BASE}/#website`
    },
    about: options.aboutId ? { '@id': options.aboutId } : undefined,
    primaryImageOfPage: options.primaryImageId ? { '@id': options.primaryImageId } : undefined,
    breadcrumb: options.breadcrumbId ? { '@id': options.breadcrumbId } : undefined,
    datePublished: options.publishedAt,
    dateModified: options.updatedAt,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.answer-summary', '.content-intro']
    }
  }
}