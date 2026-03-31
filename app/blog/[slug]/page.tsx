// app/blog/[slug]/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { blogPosts, type BlogPost } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Share2, Clock, Tag, Star, ThumbsUp, MessageCircle } from "lucide-react"
import Script from "next/script"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"
  const MAX_TITLE_LENGTH = 78

  if (!post) {
    return {
      title: "Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  // ✅ Title (NO brand suffix here)
  let safeTitle = post.metaTitle

  // keep room for layout-added brand automatically
  if (safeTitle.length > MAX_TITLE_LENGTH) {
    safeTitle = safeTitle.slice(0, MAX_TITLE_LENGTH - 3) + "..."
  }

  // ✅ Description safety trim
  let safeDescription = post.metaDescription
  if (safeDescription.length > 115) {
    safeDescription = safeDescription.slice(0, 112) + "..."
  }

  return {
    title: safeTitle,
    description: safeDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: "JaeTravel Expeditions",

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    openGraph: {
      title: safeTitle,
      description: safeDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author],
      tags: post.keywords,
      section: post.category,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: post.image.startsWith("http")
            ? post.image
            : `${baseUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
      locale: "en_KE",
      siteName: "JaeTravel Expeditions",
    },

    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [
        post.image.startsWith("http")
          ? post.image
          : `${baseUrl}${post.image}`,
      ],
      creator: "@jaetravel",
      site: "@jaetravel",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },

    category: post.category,

    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}

// Helper functions
function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getAbsoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"
  return path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
}

// Generate all schema markup
function generateSchemaMarkup(post: BlogPost, baseUrl: string) {
  const absoluteImageUrl = getAbsoluteUrl(post.image)
  const postUrl = `${baseUrl}/blog/${post.slug}`

  // 1. BlogPosting Schema (Article)
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${baseUrl}/authors/${post.author.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "JaeTravel Expeditions",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    wordCount: post.content.trim().split(/\s+/).length,
    timeRequired: getReadingTime(post.content),
  }

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  // 3. Organization Schema (Merchant Listing)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "JaeTravel Expeditions",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: "Premier East Africa safari tours and travel agency specializing in Kenya, Tanzania, Rwanda, and Uganda safari experiences.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-1.286389",
      longitude: "36.817223",
    },
    telephone: "+254-726-485-228",
    email: "info@jaetravel.co.ke",
    priceRange: "$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/jaetravel",
      "https://www.instagram.com/jaetravel",
      "https://twitter.com/jaetravel",
    ],
  }

  // 4. Product/Service Schema (Tour Packages mentioned in post)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${post.category} Safari Tour Package`,
    description: post.excerpt,
    image: absoluteImageUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
      url: `${baseUrl}/tours`,
    },
    brand: {
      "@type": "Brand",
      name: "JaeTravel Expeditions",
    },
  }

  // 5. Review Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: `${post.category} Safari Experience`,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: "JaeTravel Customer",
    },
    datePublished: "2024-01-01",
    reviewBody: `An incredible ${post.category} experience with JaeTravel. The guides were knowledgeable and the wildlife viewing was spectacular.`,
  }

  // 6. Video Schema (if video exists)
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: post.title,
    description: post.excerpt,
    thumbnailUrl: absoluteImageUrl,
    uploadDate: post.publishedAt,
    contentUrl: `${baseUrl}/videos/${post.slug}`,
    embedUrl: `${baseUrl}/videos/embed/${post.slug}`,
    duration: "PT5M",
  }

  return {
    blogPosting: blogPostingSchema,
    breadcrumb: breadcrumbSchema,
    organization: organizationSchema,
    product: productSchema,
    review: reviewSchema,
    video: videoSchema,
  }
}

// Social Share Buttons Component
function SocialShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  }

  return (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={shareLinks.email} aria-label="Share via Email">
          <Mail className="mr-2 h-4 w-4" />
          Email
        </a>
      </Button>
    </div>
  )
}

// Import icons
function Twitter(props: any) { return <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
function Facebook(props: any) { return <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> }
function Linkedin(props: any) { return <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/></svg> }
function Mail(props: any) { return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> }

// Main page component
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)
  const readingTime = getReadingTime(post.content)
  const formattedDate = formatDate(post.publishedAt)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke"
  const postUrl = `${baseUrl}/blog/${post.slug}`
  
  const schemas = generateSchemaMarkup(post, baseUrl)

  return (
    <>
      {/* All Schema Markup Scripts */}
      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.blogPosting) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.organization) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.product) }}
      />
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.review) }}
      />
      <Script
        id="video-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.video) }}
      />

      <div className="pb-16">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover brightness-75"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="container absolute bottom-0 left-0 right-0 mx-auto px-4 pb-12">
            <Button asChild variant="ghost" className="mb-4 text-white hover:bg-white/20 hover:text-white">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
            <div className="mb-3 inline-block rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
              {post.category}
            </div>
            <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl text-balance">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl">
            {/* Content */}
            <article className="prose prose-lg max-w-none" itemScope itemType="https://schema.org/BlogPosting">
              <meta itemProp="datePublished" content={post.publishedAt} />
              <meta itemProp="author" content={post.author} />
              <link itemProp="image" href={getAbsoluteUrl(post.image)} />
              
              <p className="text-xl leading-relaxed text-muted-foreground" itemProp="description">
                {post.excerpt}
              </p>
              <div 
                className="mt-8 space-y-6 text-muted-foreground leading-relaxed"
                itemProp="articleBody"
              >
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>

            {/* Author Bio */}
            <div className="mt-12 rounded-lg bg-muted p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Written by {post.author}</h3>
                  <p className="text-sm text-muted-foreground">
                    Expert safari guide and travel writer with over 10 years of experience in East African tourism.
                  </p>
                </div>
              </div>
            </div>

            {/* Share Section with Social Buttons */}
            <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                <span className="font-medium">Share this article:</span>
              </div>
              <SocialShareButtons url={postUrl} title={post.title} />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-8 font-serif text-3xl font-bold">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id}>
                      <CardContent className="p-4">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <h3 className="mb-2 font-semibold leading-tight transition-colors hover:text-primary">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{relatedPost.excerpt.slice(0, 100)}...</p>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}