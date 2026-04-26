// app/ar/tours/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { tours } from "@/lib/i18n/data/ar/tours-data"; // Import from your Arabic tours data
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TourCard } from "@/components/tour-card";
import { TourReviews } from "@/components/tour-reviews";
import { BookingForm } from "@/components/booking-form";
import { TourStructuredData } from "@/components/tour-structured-data";
import { Star, MapPin, Clock, Users, Check, ArrowRight, ChevronRight } from "lucide-react";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params from the Arabic tours data
export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke";

  if (!tour) {
    return {
      title: "الجولة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = tour.metaTitle || tour.title;
  const description = tour.metaDescription || tour.description;

  const image = tour.image
    ? tour.image.startsWith("http")
      ? tour.image
      : `${baseUrl}${tour.image}`
    : `${baseUrl}/placeholder.svg?key=tour-${tour.id}`;

  return {
    title,
    description,
    keywords: tour.keywords,
    alternates: {
      canonical: `${baseUrl}/ar/tours/${tour.slug}`,
      languages: {
        ar: `${baseUrl}/ar/tours/${tour.slug}`,
        en: `${baseUrl}/tours/${tour.slug}`,
        "x-default": `${baseUrl}/tours/${tour.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/ar/tours/${tour.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "رحلات جي تريل",
      locale: "ar_AR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
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
  };
}

export default async function TourPage(props: TourPageProps) {
  const { slug } = await props.params;
  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  // Safely handle optional properties with defaults (Arabic messages)
  const itineraryDays = tour.itinerary ? tour.itinerary.split(".").filter((day: string) => day.trim()) : [];
  const highlights = tour.highlights || [];
  const included = tour.included || [];
  const excluded = tour.excluded || [];
  const duration = tour.duration || "غير محدد";
  const difficulty = tour.difficulty || "معتدل";
  const groupSize = tour.groupSize || "مجموعة صغيرة";
  const category = tour.category || "سفاري";
  const rating = tour.rating || 4.5;
  const reviewCount = tour.reviewCount || 0;

  // Related tours: from the same Arabic data source
  const relatedTours = tours.filter((t) => t.country === tour.country && t.id !== tour.id).slice(0, 3);

  return (
    <>
      <TourStructuredData tour={{ ...tour, duration: String(tour.duration || "غير محدد") }} />

      <div className="pb-16" dir="rtl">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/ar" className="hover:text-foreground">
                الرئيسية
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/ar/tours" className="hover:text-foreground">
                الجولات
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/ar/destinations/${tour.country.toLowerCase()}`} className="hover:text-foreground">
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
          <div className="container absolute bottom-0 left-0 right-0 mx-auto px-4 pb-12 text-right">
            <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl text-balance">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white justify-end">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{rating}</span>
                <span className="text-white/80">({reviewCount} تقييم)</span>
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
                <h2 className="mb-4 font-serif text-3xl font-bold">نبذة عامة</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{tour.description}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  انطلق في رحلة لا تُنسى عبر أروع المناظر الطبيعية وموائل الحياة البرية في {tour.country}. تجمع تجربة السفاري
                  المصممة بعناية بين التوجيه الخبير والإقامة المريحة ولقاءات الحياة البرية الرائعة لخلق ذكريات تدوم مدى الحياة.
                  سواء كنت مسافرًا لأول مرة أو خبيرًا، تقدم هذه الجولة توازنًا مثاليًا بين المغامرة والاسترخاء والانغماس الثقافي.
                </p>
              </section>

              {/* Highlights */}
              {highlights.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-6 font-serif text-3xl font-bold">أبرز معالم الجولة</h2>
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
                  <h2 className="mb-6 font-serif text-3xl font-bold">البرنامج التفصيلي يوماً بيوم</h2>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    عش كل لحظة من مغامرتك لمدة {duration} من خلال برنامجنا الشامل. كل يوم مخطط بعناية لتعظيم فرص مشاهدة الحياة البرية
                    مع ضمان الراحة والانغماس الثقافي.
                  </p>
                  <div className="space-y-4">
                    {itineraryDays.map((day: string, index: number) => {
                      const dayNumber = index + 1;
                      const dayTitle = day.includes("اليوم") ? day.split(":")[0] : `اليوم ${dayNumber}`;
                      const dayContent = day.includes(":") ? day.split(":").slice(1).join(":").trim() : day.trim();

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
                                <span>أنشطة طوال اليوم</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>مرشد محترف مشمول</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
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
                          <h3 className="mb-4 text-xl font-bold text-primary">ما تشمله الجولة</h3>
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
                          <h3 className="mb-4 text-xl font-bold text-destructive">ما لا تشمله الجولة</h3>
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
                <h2 className="mb-6 font-serif text-3xl font-bold">معلومات مهمة</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-semibold">متطلبات السفر</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                          <li>• يجب أن يكون جواز السفر صالحًا لمدة 6 أشهر على الأقل من تاريخ السفر</li>
                          <li>• تختلف متطلبات التأشيرة حسب الجنسية – يرجى التحقق قبل الحجز</li>
                          <li>• قد تكون شهادة تطعيم الحمى الصفراء مطلوبة</li>
                          <li>• تأمين السفر موصى به بشدة</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">ما يجب إحضاره</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                          <li>• ملابس سفاري مريحة بألوان محايدة (كاكي، بيج، زيتوني)</li>
                          <li>• قبعة عريضة الحواف ونظارات شمسية للحماية من الشمس</li>
                          <li>• منظار وكاميرا مع بطاريات إضافية وبطاقات ذاكرة</li>
                          <li>• سترة خفيفة أو صوف لرحلات الصباح الباكر</li>
                          <li>• أحذية مشي مريحة وصنادل</li>
                          <li>• واقي شمس (SPF 30+) وطارد للحشرات</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">المتطلبات البدنية</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          هذه الجولة ذات مستوى صعوبة {difficulty.toLowerCase()} . يلزم مستوى لياقة معتدل لبعض المشي والصعود/النزول من
                          مركبات السفاري. يرجى إبلاغنا بأي مخاوف تتعلق بالحركة أو متطلبات خاصة عند الحجز.
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
                    <h3 className="mb-3 font-semibold">هل تحتاج مساعدة في التخطيط؟</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      خبراء السفاري لدينا متاحون 24/7 لمساعدتك في تخصيص هذه الجولة أو الإجابة عن أي أسئلة.
                    </p>
                    <Button asChild variant="outline" className="w-full mb-2 bg-transparent">
                      <Link href="/ar/contact">اتصل بنا</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20">
                      <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                        راسلنا على واتساب
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Facts */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">معلومات سريعة</h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">المدة</dt>
                        <dd className="font-semibold">{duration}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">حجم المجموعة</dt>
                        <dd className="font-semibold">{groupSize}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">الصعوبة</dt>
                        <dd className="font-semibold">{difficulty}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">الفئة</dt>
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
                <h2 className="font-serif text-3xl font-bold">المزيد من الجولات في {tour.country}</h2>
                <Button asChild variant="ghost">
                  <Link href={`/ar/destinations/${tour.country.toLowerCase()}`}>
                    عرض الكل <ArrowRight className="mr-2 h-4 w-4" />
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
  );
}