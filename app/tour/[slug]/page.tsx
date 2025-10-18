import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Tour, tours } from "@/lib/tours-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TourCard } from "@/components/tour-card"
import { TourReviews } from "@/components/tour-reviews"
import fs from "fs/promises"
import { BookingForm } from "@/components/booking-form"
import { TourStructuredData } from "@/components/tour-structured-data"
import { Star, MapPin, Clock, Users, Check, ArrowRight, ChevronRight } from "lucide-react"
import path from "path"

interface TourPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }))
}

// Read the JSON file from the /data/ directory
async function getTourData(slug: string): Promise<Tour | undefined> {
  const filePath = path.join(process.cwd(), 'data', 'query_based_posts.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const tours: Tour[] = JSON.parse(jsonData);
  return tours.find((tour) => tour.slug === slug);
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = tours.find((t) => t.slug === slug)

  if (!tour) {
    return {
      title: "Tour Not Found",
    }
  }

  return {
    title: tour.metaTitle || tour.title,
    description: tour.metaDescription || tour.description,
    keywords: tour.keywords,
    openGraph: {
      title: tour.metaTitle || tour.title,
      description: tour.metaDescription || tour.description,
      images: [tour.image || `/placeholder.svg?key=tour-${tour.id}`],
    },
  }
}

export default async function TourPage(props: TourPageProps) {
  const { slug } = await props.params
  const tour = tours.find((t) => t.slug === slug)

  if (!tour) {
    notFound()
  }

  // Safely handle optional properties with defaults
  const itineraryDays = tour.itinerary ? tour.itinerary.split(".").filter((day: string) => day.trim()) : []
  const highlights = tour.highlights || []
  const included = tour.included || []
  const excluded = tour.excluded || []
  const duration = tour.duration || "Not specified"
  const difficulty = tour.difficulty || "Moderate"
  const groupSize = tour.groupSize || "Small group"
  const category = tour.category || "Safari"
  const rating = tour.rating || 4.5
  const reviewCount = tour.reviewCount || 0

  const relatedTours = tours.filter((t) => t.country === tour.country && t.id !== tour.id).slice(0, 3)

  return (
    <>
      <TourStructuredData tour={{ ...tour, duration: String(tour.duration || "Not specified") }} />

      <div className="pb-16">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/tours" className="hover:text-foreground">
                Tours
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/destinations/${tour.country.toLowerCase()}`} className="hover:text-foreground">
                {tour.country}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{tour.title}</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src={tour.image || `/placeholder.svg?height=800&width=1600&query=${encodeURIComponent(tour.title + " safari landscape")}`}
            alt={tour.title}
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="container absolute bottom-0 left-0 right-0 mx-auto px-4 pb-12">
            <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl text-balance">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{rating}</span>
                <span className="text-white/80">({reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{tour.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Overview */}
              <section className="mb-12">
                <h2 className="mb-4 font-serif text-3xl font-bold">Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{tour.description}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Embark on an unforgettable journey through {tour.country}'s most spectacular landscapes and wildlife
                  habitats. This carefully crafted safari experience combines expert guidance, comfortable
                  accommodations, and incredible wildlife encounters to create memories that will last a lifetime.
                  Whether you're a first-time safari-goer or a seasoned traveler, this tour offers the perfect balance
                  of adventure, relaxation, and cultural immersion.
                </p>
              </section>

              {/* Highlights */}
              {highlights.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-6 font-serif text-3xl font-bold">Tour Highlights</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg bg-muted/30 p-4">
                        <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                        <span className="text-sm leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Detailed Itinerary */}
              {itineraryDays.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-6 font-serif text-3xl font-bold">Detailed Day-by-Day Itinerary</h2>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    Experience every moment of your {duration} adventure with our comprehensive itinerary. Each day
                    is carefully planned to maximize wildlife viewing opportunities while ensuring comfort and cultural
                    immersion.
                  </p>
                  <div className="space-y-4">
                    {itineraryDays.map((day: string, index: number) => {
                      const dayNumber = index + 1
                      const dayTitle = day.includes("Day") ? day.split(":")[0] : `Day ${dayNumber}`
                      const dayContent = day.includes(":") ? day.split(":").slice(1).join(":").trim() : day.trim()

                      return (
                        <Card key={index} className="overflow-hidden">
                          <div className="bg-primary/5 px-6 py-4 border-b border-border">
                            <h3 className="text-xl font-bold text-primary">{dayTitle}</h3>
                          </div>
                          <CardContent className="p-6">
                            <p className="mb-4 text-muted-foreground leading-relaxed">{dayContent}</p>
                            <div className="grid gap-3 sm:grid-cols-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Full day activities</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>Professional guide included</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* What's Included */}
              {(included.length > 0 || excluded.length > 0) && (
                <section className="mb-12">
                  <div className="grid gap-6 md:grid-cols-2">
                    {included.length > 0 && (
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="mb-4 text-xl font-bold text-primary">What's Included</h3>
                          <ul className="space-y-3">
                            {included.map((item: string, index: number) => (
                              <li key={index} className="flex items-start gap-3">
                                <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                                <span className="text-sm text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {excluded.length > 0 && (
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="mb-4 text-xl font-bold text-destructive">What's Not Included</h3>
                          <ul className="space-y-3">
                            {excluded.map((item: string, index: number) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-destructive mt-0.5">✕</span>
                                <span className="text-sm text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </section>
              )}

              {/* Important Information */}
              <section className="mb-12">
                <h2 className="mb-6 font-serif text-3xl font-bold">Important Information</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">Travel Requirements</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                          <li>• Passport must be valid for at least 6 months from travel date</li>
                          <li>• Visa requirements vary by nationality - please check before booking</li>
                          <li>• Yellow fever vaccination certificate may be required</li>
                          <li>• Travel insurance is highly recommended</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">What to Bring</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                          <li>• Comfortable safari clothing in neutral colors (khaki, beige, olive)</li>
                          <li>• Wide-brimmed hat and sunglasses for sun protection</li>
                          <li>• Binoculars and camera with extra batteries and memory cards</li>
                          <li>• Light jacket or fleece for early morning game drives</li>
                          <li>• Comfortable walking shoes and sandals</li>
                          <li>• Sunscreen (SPF 30+) and insect repellent</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">Physical Requirements</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          This tour has a {difficulty.toLowerCase()} difficulty level. Moderate fitness is required
                          for some walking and getting in/out of safari vehicles. Please inform us of any mobility
                          concerns or special requirements when booking.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Reviews Section */}
              <TourReviews tourId={Number(tour.id)} tourTitle={tour.title} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Booking Card */}
                <BookingForm 
                  tourTitle={String(tour.title)} 
                  tourPrice={Number(tour.price)} 
                  tourDuration={String(duration)} 
                />

                {/* Contact Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-3 font-semibold">Need Help Planning?</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      Our safari experts are available 24/7 to help you customize this tour or answer any questions.
                    </p>
                    <Button asChild variant="outline" className="w-full mb-2 bg-transparent">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20">
                      <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                        WhatsApp Us
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Facts */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">Quick Facts</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">Duration</dt>
                        <dd className="font-semibold">{duration}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">Group Size</dt>
                        <dd className="font-semibold">{groupSize}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">Difficulty</dt>
                        <dd className="font-semibold">{difficulty}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">Category</dt>
                        <dd className="font-semibold capitalize">{category}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Tours */}
          {relatedTours.length > 0 && (
            <section className="mt-16">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-serif text-3xl font-bold">More Tours in {tour.country}</h2>
                <Button asChild variant="ghost">
                  <Link href={`/destinations/${tour.country.toLowerCase()}`}>
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedTours.map((relatedTour) => (
                  <TourCard key={relatedTour.id} tour={relatedTour} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}