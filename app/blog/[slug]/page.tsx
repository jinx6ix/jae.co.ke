import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover brightness-75"
          priority
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
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
              <p>{post.content}</p>
              <p>
                East Africa offers some of the world's most spectacular wildlife viewing opportunities. Whether you're
                planning your first safari or returning for another adventure, understanding the best times to visit,
                what to pack, and how to prepare can make all the difference in your experience.
              </p>
              <p>
                Our team of expert guides has decades of combined experience leading safaris across Kenya, Tanzania,
                Rwanda, and Uganda. We've compiled this comprehensive guide to help you plan the perfect safari
                adventure, whether you're interested in the Great Migration, gorilla trekking, or accessible travel
                options.
              </p>
            </div>
          </article>

          {/* Share */}
          <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
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
  )
}
