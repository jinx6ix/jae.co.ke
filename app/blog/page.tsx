import type { Metadata } from "next"
import BlogClient from "./BlogClient"
import { blogPosts } from "@/lib/blog-data"

// BULLET-PROOF BLOG PAGE SCHEMA — MAXIMUM RICH RESULTS (2025–2026)
const blogPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization + LocalBusiness (trust + stars)
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAETravel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723"
      }
    },

    // 2. WebPage + BreadcrumbList
    {
      "@type": "WebPage",
      "@id": "https://jaetravel.co.ke/blog/#webpage",
      "url": "https://jaetravel.co.ke/blog",
      "name": "Safari Travel Blog | Tips, Guides & Stories | JaeTravel Expeditions",
      "description": "Expert safari tips, destination guides, wildlife stories, and accessible travel advice from East Africa’s leading inclusive safari operator."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://jaetravel.co.ke/blog" }
      ]
    },

    // 3. Blog (main entity)
    {
      "@type": "Blog",
      "@id": "https://jaetravel.co.ke/blog/#blog",
      "url": "https://jaetravel.co.ke/blog",
      "name": "JAETravel Safari Blog",
      "description": "Weekly insights, safari tips, wildlife stories, and accessible travel guides from East Africa.",
      "blogPost": blogPosts.slice(0, 10).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "url": `https://jaetravel.co.ke/blog/${post.slug}`,
        "datePublished": post.publishedAt,
        "dateModified": post.publishedAt,
        "author": { "@type": "Person", "name": post.author },
        "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" },
        "description": post.excerpt,
        "keywords": post.keywords?.join(", ")
      }))
    },

    // 4. FAQPage — 5 questions = full carousel
    {
      "@type": "FAQPage",
      "@id": "https://jaetravel.co.ke/blog/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How often do you publish new blog posts?",
          "acceptedAnswer": { "@type": "Answer", "text": "We publish fresh safari tips, destination guides, and wildlife stories every week." }
        },
        {
          "@type": "Question",
          "name": "Can I request specific topics for your blog?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! We love reader suggestions. Contact us with any safari or travel topic you’d like covered." }
        },
        {
          "@type": "Question",
          "name": "Do you share personal safari experiences?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — many posts feature real stories from our guides and guests for authentic East African insights." }
        },
        {
          "@type": "Question",
          "name": "Are your blog posts good for first-time safari travelers?",
          "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! We have beginner-friendly guides on packing, etiquette, photography, accessibility, and more." }
        },
        {
          "@type": "Question",
          "name": "Can I share your blog posts?",
          "acceptedAnswer": { "@type": "Answer", "text": "Please do! Every post has social share buttons. Help us inspire more travelers to visit East Africa responsibly." }
        }
      ]
    }
  ]
}

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