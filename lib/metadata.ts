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
  type?: 'website' | 'article' | 'blog' | 'product' | 'tour' | 'vehicle'
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

// ─────────────────────────────────────────────────────────────────────────────
// Title / description length control
//
// SAGE flagged every audited page for a title longer than 60 characters
// (home 73, tour 73, blog 82, vehicle 75) and the home page for a 163
// character description. The layout's title template (" | JaeTravel
// Expeditions") is what pushed the per-page titles over the limit, so
// the template is only applied when the caller did not supply an
// absolute title.
// ─────────────────────────────────────────────────────────────────────────────

export const TITLE_MAX = 60
export const TITLE_MIN = 45
export const DESC_MAX = 155
export const DESC_MIN = 120

/**
 * Build a title that fits the 45-60 character window. When the title
 * already carries the brand suffix we leave it alone (it was written
 * that way deliberately); otherwise we append the brand and trim.
 */
export function buildTitle(title: string, brand = "JaeTravel Expeditions"): string {
  const clean = title.trim()
  if (clean.length <= TITLE_MAX && clean.length >= TITLE_MIN) return clean
  if (clean.length > TITLE_MAX) {
    // Prefer cutting at a word boundary.
    const cut = clean.slice(0, TITLE_MAX)
    const lastSpace = cut.lastIndexOf(" ")
    const trimmed = lastSpace > TITLE_MIN ? cut.slice(0, lastSpace) : cut
    return trimmed.replace(/[\s\-–—|,]+$/, "")
  }
  return `${clean} | ${brand}`
}

/** Build a meta description that fits the 120-155 character window. */
export function buildDescription(description: string): string {
  const clean = description.trim().replace(/\s+/g, " ")
  if (clean.length <= DESC_MAX && clean.length >= DESC_MIN) return clean
  if (clean.length > DESC_MAX) {
    const cut = clean.slice(0, DESC_MAX)
    const lastSpace = cut.lastIndexOf(" ")
    const trimmed = lastSpace > DESC_MIN ? cut.slice(0, lastSpace) : cut
    return `${trimmed.replace(/[\s\-–—|,]+$/, "")}.`
  }
  return clean
}

/**
 * Build ONE hreflang set for a page, including a self-referencing
 * entry for the current page.
 *
 * The previous implementation shipped a single static set on every
 * page (en -> homepage, fr -> /fr, ...) so no non-home page ever
 * self-referenced and the home page emitted two overlapping sets.
 * SAGE reported exactly that: "Note: missing self-referencing
 * hreflang" on all four audited pages.
 *
 * `path` is the English path of the current page, e.g.
 * "/tours/masai-mara-luxury-safari". `availableLocales` restricts the
 * set to locales that actually publish that route — only URLs that
 * return 200 and reciprocate belong in the set.
 */
export function buildPageHreflang(
  path: string,
  options: {
    /**
     * Locales (without prefix) that publish this exact route.
     * Only URLs that return 200 and reciprocate belong in the set.
     */
    availableLocales?: string[]
    /** The current page's locale. Always self-referencing. */
    currentLocale?: string
    /**
     * Per-locale path overrides, keyed by locale WITHOUT the prefix.
     *
     * The localized routes do not always mirror the English path:
     * a tour detail page is /tours/<slug> in English but
     * /<locale>/tour/<slug> in every other language. Prefixing the
     * English path blindly produced URLs that the catch-all route
     * swallowed with a 200 but the homepage's title — a soft 404,
     * which is worse than having no hreflang at all.
     *
     * A locale omitted from this map is skipped, so a route that
     * does not exist in a language (there are no localized blog
     * routes) simply is not advertised there.
     */
    localePaths?: Record<string, string>
  } = {}
): Record<string, string> {
  const { availableLocales, currentLocale = "en", localePaths } = options
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  const base = "https://www.jaetravel.co.ke"

  const alternates: Record<string, string> = {}

  // The current page always self-references.
  alternates[currentLocale] = `${base}${cleanPath}`

  if (availableLocales) {
    for (const locale of availableLocales) {
      if (locale === currentLocale) continue
      const localized = localePaths?.[locale]
      // Without an explicit mapping, the English path is used as-is.
      if (localePaths && localized === undefined) continue
      const target = localized ?? cleanPath
      alternates[locale] = `${base}/${locale}${target.startsWith("/") ? target : `/${target}`}`
    }
  }

  alternates["x-default"] = `${base}${cleanPath}`
  return alternates
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