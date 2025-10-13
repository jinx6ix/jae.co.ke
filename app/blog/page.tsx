import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-data"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Camera, Video } from "lucide-react"

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

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Safari Travel Blog</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
          Expert tips, destination guides, and inspiring stories from our East African safari adventures. Learn
          everything you need to know to plan your perfect trip.
        </p>
      </div>

      <div className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground md:p-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
              <Camera className="h-6 w-6" />
              <Video className="h-6 w-6" />
            </div>
            <h2 className="mb-3 font-serif text-3xl font-bold text-balance">Explore Our Photo & Video Gallery</h2>
            <p className="text-lg leading-relaxed text-primary-foreground/90 text-pretty">
              Browse stunning safari photos and videos from Kenya, Tanzania, Rwanda, and Uganda. See the Great
              Migration, mountain gorillas, and breathtaking landscapes.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="shrink-0">
            <Link href="/blog/gallery">
              View Gallery <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader className="p-0">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-3 text-xl font-bold leading-tight transition-colors hover:text-primary">
                  {post.title}
                </h2>
              </Link>
              <p className="mb-3 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {post.category}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="ghost" className="w-full">
                <Link href={`/blog/${post.slug}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 rounded-2xl bg-muted/50 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Ready to Start Your Safari?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
          Turn your safari dreams into reality. Browse our tours or contact us to plan your perfect East African
          adventure.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/tours">Explore Tours</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
