import type { Metadata } from "next"
import BlogClient from "./BlogClient"
import { blogPosts } from "@/lib/blog-data"

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
    <BlogClient 
      blogPosts={blogPosts}
      faqs={faqs}
    />
  )
}