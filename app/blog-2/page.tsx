import type { Metadata } from "next"
import BlogClient from "./BlogClient"
import { blogPosts } from "@/lib/blog-data"

// BULLET-PROOF BLOG PAGE SCHEMA — MAXIMUM RICH RESULTS (2025–2026)
const blogPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization + LocalBusiness (trust signals + star ratings)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "description": "East Africa’s leading operator of accessible, sustainable, and responsible safaris in Kenya, Tanzania, Rwanda, and Uganda.",
      "telephone": "+254726485228",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      }
    },

    // 2. WebSite
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "JAE Travel Expeditions",
      "publisher": {
        "@id": "https://www.jaetravel.co.ke/#organization"
      }
    },

    // 3. WebPage (main blog listing page)
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/blog/#webpage",
      "url": "https://www.jaetravel.co.ke/blog",
      "name": "Safari Travel Blog | Tips, Guides & Stories | JAE Travel Expeditions",
      "description": "Expert safari tips, destination guides, wildlife stories, and accessible travel advice from East Africa’s leading inclusive safari operator.",
      "isPartOf": {
        "@id": "https://www.jaetravel.co.ke/#website"
      },
      "breadcrumb": {
        "@id": "https://www.jaetravel.co.ke/blog/#breadcrumb"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.jaetravel.co.ke/blog/blog-hero.jpg",
        "width": 1200,
        "height": 630
      },
      "mainEntity": {
        "@id": "https://www.jaetravel.co.ke/blog/#blog"
      }
    },

    // 4. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/blog/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jaetravel.co.ke"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.jaetravel.co.ke/blog"
        }
      ]
    },

    // 5. Blog (main entity with BlogPosting items – optimized for rich results)
    {
      "@type": "Blog",
      "@id": "https://www.jaetravel.co.ke/blog/#blog",
      "url": "https://www.jaetravel.co.ke/blog",
      "name": "JAE Travel Safari Blog",
      "description": "Weekly insights, safari tips, wildlife stories, and accessible travel guides from East Africa.",
      "blogPost": blogPosts.slice(0, 10).map(post => ({
        "@type": "BlogPosting",
        "@id": `https://www.jaetravel.co.ke/blog/${post.slug}#post`,
        "headline": post.title,
        "image": {
          "@type": "ImageObject",
          "url": post.image.startsWith('http') ? post.image : `https://www.jaetravel.co.ke${post.image}`,
          "width": 1200,
          "height": 630
        },
        "url": `https://www.jaetravel.co.ke/blog/${post.slug}`,
        "datePublished": post.publishedAt,
        "dateModified": post.publishedAt || post.publishedAt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@id": "https://www.jaetravel.co.ke/#organization"
        },
        "description": post.excerpt,
        "keywords": post.keywords?.join(", ") || "safari, East Africa, wildlife, travel tips, accessible travel, sustainable tourism"
      }))
    },

    // Add this Review schema markup to your existing @graph array
// Best placed right after the Organization/LocalBusiness entity for maximum impact

    {
      "@type": "Review",
      "@id": "https://www.jaetravel.co.ke/#featured-review-1",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": "David Chen",
        "affiliation": {
          "@type": "Organization",
          "name": "JAE Travel Expeditions Guest"
        }
      },
      "datePublished": "2025-08-20",
      "reviewBody": "As a full-time wheelchair user, I never imagined seeing lions in the Masai Mara. The hydraulic lift vehicle was flawless — life-changing experience. JAE Travel made the impossible possible. Highly recommend!",
      "itemReviewed": {
        "@id": "https://www.jaetravel.co.ke/#organization"
      },
      "publisher": {
        "@id": "https://www.jaetravel.co.ke/#organization"
      }
    },
    {
      "@type": "Review",
      "@id": "https://www.jaetravel.co.ke/#featured-review-2",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Johnson"
      },
      "datePublished": "2025-07-15",
      "reviewBody": "Rented their accessible Land Cruiser for a private safari — best decision ever. Professional driver, perfect vehicle, unforgettable trip. 10/10 service and accessibility.",
      "itemReviewed": {
        "@id": "https://www.jaetravel.co.ke/#organization"
      },
      "publisher": {
        "@id": "https://www.jaetravel.co.ke/#organization"
      }
    },
    {
      "@type": "Review",
      "@id": "https://www.jaetravel.co.ke/#featured-review-3",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": "Michael Thompson"
      },
      "datePublished": "2025-09-05",
      "reviewBody": "The most responsible and sustainable safari we've ever done. Our guide was incredibly knowledgeable about conservation, and the eco-lodge was outstanding. Truly felt like we were giving back to the community and wildlife.",
      "itemReviewed": {
        "@id": "https://www.jaetravel.co.ke/#organization"
      },
      "publisher": {
        "@id": "https://www.jaetravel.co.ke/#organization"
      }
    },

    // 6. FAQPage – 5 optimized questions for rich FAQ carousel
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/blog/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How often do you publish new blog posts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We publish fresh safari tips, destination guides, and wildlife stories every week to keep our readers inspired and informed."
          }
        },
        {
          "@type": "Question",
          "name": "Can I request specific topics for your blog?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We love reader suggestions. Feel free to contact us with any safari, wildlife, accessibility, or sustainable travel topic you’d like covered."
          }
        },
        {
          "@type": "Question",
          "name": "Do you share personal safari experiences?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely — many of our posts feature real stories and insights from our expert guides and past guests for authentic East African perspectives."
          }
        },
        {
          "@type": "Question",
          "name": "Are your blog posts suitable for first-time safari travelers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer beginner-friendly guides on packing, safari etiquette, photography tips, accessibility considerations, and more to help first-timers plan confidently."
          }
        },
        {
          "@type": "Question",
          "name": "Can I share your blog posts on social media?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Please do! Every post includes easy social share buttons. Sharing helps us inspire more travelers to explore East Africa responsibly."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Safari Travel Blog | Tips, Guides & Stories | JaeTravel Expeditions",
  description:
    "Read our safari travel blog for expert tips, destination guides, wildlife stories, and accessible travel advice for East Africa. Plan your perfect safari adventure.",
  keywords: [
    "Safari Blog",
    "Travel Tips",
    "East Africa Travel",
    "Safari Guide",
    "Wildlife Stories",
    "Accessible Travel Blog",
    "Kenya Travel Tips",
    "Tanzania Safari Guide",
  ],
}

// FAQ data for the blog page
const faqs = [
  {
    question: "How often do you publish new blog posts?",
    answer: "We publish new content weekly, featuring safari tips, destination guides, wildlife updates, and travel stories from across East Africa."
  },
  {
    question: "Can I request specific topics for your blog?",
    answer: "Absolutely! We welcome topic suggestions from our readers. Feel free to contact us with any specific safari or travel questions you'd like us to cover."
  },
  {
    question: "Do you share personal safari experiences in your blog?",
    answer: "Yes, many of our posts feature real experiences from our guides and travelers, offering authentic insights into safari life and East African culture."
  },
  {
    question: "Are your blog posts helpful for first-time safari travelers?",
    answer: "Definitely! We have comprehensive guides for first-timers covering everything from packing tips to wildlife etiquette and cultural norms."
  },
  {
    question: "Can I share your blog posts on social media?",
    answer: "Please do! We encourage sharing our content to help other travelers discover the wonders of East Africa. Social share buttons are available on each post."
  }
]

export default function BlogPage() {
  return (
    <>
      {/* FULL RICH RESULTS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
      />
      <BlogClient 
        blogPosts={blogPosts}
        faqs={faqs}
      />
    </>
  )
}