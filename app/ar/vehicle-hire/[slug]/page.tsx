// app/ar/vehicle-hire/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { vehicles } from "@/lib/i18n/data/ar/vehicles-data"; // Arabic vehicles data
import { Check, ArrowLeft, Users, Luggage, Fuel, Settings, ChevronLeft } from "lucide-react";
import { VehicleBookingForm } from "@/components/vehicle-booking-form";
import { AllPageSEOSchema } from "@/components/AllPageSEOSchema";
import { VehicleStructuredData } from "@/components/vehicle-structured-data";
import { HeroSlider } from "./components/HeroSlider";
import { VehicleHighlightGallery } from "./components/VehicleHighlightGallery";
import { VehicleTypeGallery } from "./components/VehicleGallery";
import { FleetGallery } from "./components/FleetGallery";

// Force only known slugs to be generated
export const dynamicParams = false;

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.jaetravel.co.ke";

  if (!vehicle) {
    return {
      title: "المركبة غير موجودة",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = vehicle.metaTitle || vehicle.name;
  const description = vehicle.metaDescription || vehicle.description;

  const image = vehicle.image
    ? vehicle.image.startsWith("http")
      ? vehicle.image
      : `${baseUrl}${vehicle.image}`
    : `${baseUrl}/placeholder.svg?key=vehicle-${vehicle.slug}`;

  return {
    title,
    description,
    keywords: vehicle.keywords,
    alternates: {
      canonical: `${baseUrl}/ar/vehicle-hire/${vehicle.slug}`,
      languages: {
        ar: `${baseUrl}/ar/vehicle-hire/${vehicle.slug}`,
        en: `${baseUrl}/vehicle-hire/${vehicle.slug}`,
        "x-default": `${baseUrl}/vehicle-hire/${vehicle.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/ar/vehicle-hire/${vehicle.slug}`,
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

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);

  if (!vehicle) {
    notFound();
  }

  // Group vehicles by type for fleet gallery (if your data includes `type`)
  const vehicleTypes = ["SUV", "سيدان", "فاخر"]; // Arabic types
  const vehiclesByType = vehicleTypes
    .map((type) => ({
      type,
      vehicles: vehicles.filter((v) => v.type === type).slice(0, 4),
    }))
    .filter((group) => group.vehicles.length > 0);

  const relatedVehicles = vehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <>
      <AllPageSEOSchema type="vehicle" data={vehicle} slug={vehicle.slug} />
      <VehicleStructuredData vehicle={vehicle} />

      <div className="min-h-screen bg-background pb-20" dir="rtl">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-muted/40 py-4 sticky top-0 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/ar" className="hover:text-foreground transition-colors">
                الرئيسية
              </Link>
              <ChevronLeft className="h-4 w-4" />
              <Link href="/ar/vehicle-hire" className="hover:text-foreground transition-colors">
                تأجير مركبات
              </Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="font-medium text-foreground">{vehicle.name}</span>
            </div>
          </div>
        </section>

        {/* Hero Slider */}
        <section className="relative">
          <HeroSlider vehicle={vehicle} />
        </section>

        {/* Main Vehicle Overview */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <Button asChild variant="ghost" className="mb-6 -mr-4">
                <Link href="/ar/vehicle-hire">
                  <ArrowLeft className="ml-2 h-4 w-4" />
                  العودة إلى الأسطول
                </Link>
              </Button>

              <h1 className="mb-5 font-serif text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight text-center md:text-right">
                {vehicle.name}
              </h1>

              <p className="mb-8 text-lg md:text-xl leading-relaxed text-muted-foreground text-center md:text-right max-w-3xl mx-auto md:mx-0">
                {vehicle.description}
              </p>

              <div className="mb-10 flex flex-col sm:flex-row items-center sm:items-end justify-center md:justify-start gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-extrabold text-primary">
                    ${vehicle.pricePerDay}
                  </span>
                  <span className="text-2xl text-muted-foreground">/اليوم</span>
                </div>
              </div>

              <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <Users className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">السعة</div>
                    <div className="text-xl font-bold">{vehicle.capacity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Luggage className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">الأمتعة</div>
                    <div className="text-xl font-bold">{vehicle.specifications.luggage}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Fuel className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">الوقود</div>
                    <div className="text-xl font-bold">
                      {vehicle.specifications.fuelType || "ديزل"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Settings className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">ناقل الحركة</div>
                    <div className="text-xl font-bold">
                      {vehicle.specifications.transmission || "أوتوماتيك"}
                    </div>
                  </div>
                </div>
              </div>

              {vehicle.ideal && (
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center md:text-right">
                  <p className="text-xl font-semibold text-primary">{vehicle.ideal}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features & Specifications */}
        <section className="py-16 border-t border-border bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
              {vehicle.features && vehicle.features.length > 0 && (
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="mb-6 text-3xl font-bold text-right">الميزات والتجهيزات</h2>
                    <ul className="space-y-4">
                      {vehicle.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-4 text-lg">
                          <Check className="mt-1.5 h-6 w-6 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-3xl font-bold text-right">المواصفات الفنية</h2>
                  <dl className="space-y-5 text-lg">
                    {vehicle.specifications.engine && (
                      <div className="flex justify-between border-b pb-3">
                        <dt className="text-muted-foreground">المحرك</dt>
                        <dd className="font-semibold">{vehicle.specifications.engine}</dd>
                      </div>
                    )}
                    <div className="flex justify-between border-b pb-3">
                      <dt className="text-muted-foreground">ناقل الحركة</dt>
                      <dd className="font-semibold">
                        {vehicle.specifications.transmission || "أوتوماتيك"}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <dt className="text-muted-foreground">نوع الوقود</dt>
                      <dd className="font-semibold">
                        {vehicle.specifications.fuelType || "ديزل"}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <dt className="text-muted-foreground">سعة الأمتعة</dt>
                      <dd className="font-semibold">{vehicle.specifications.luggage}</dd>
                    </div>
                    {vehicle.specifications.fuelEfficiency && (
                      <div className="flex justify-between pb-3">
                        <dt className="text-muted-foreground">كفاءة الوقود</dt>
                        <dd className="font-semibold">{vehicle.specifications.fuelEfficiency}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </div>

            {vehicle.extras && Object.keys(vehicle.extras).length > 0 && (
              <Card className="mt-12 border-none shadow-lg max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-3xl font-bold text-right">إضافات اختيارية</h2>
                  <ul className="space-y-4">
                    {Object.entries(vehicle.extras).map(([key, value]) => (
                      <li
                        key={key}
                        className="flex items-center justify-between border-b pb-4 last:border-b-0 text-lg"
                      >
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-bold text-primary">{value as string}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Fleet Section */}
        {vehicle.fleetGalleries && (
          <section className="py-20 bg-muted/10">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">الأسطول المتاح</h2>
              <FleetGallery
                fleetGalleries={vehicle.fleetGalleries}
                vehicleName={vehicle.name}
              />
            </div>
          </section>
        )}

        {/* Booking Form */}
        <section className="py-20 bg-primary/5 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-10 font-serif text-4xl md:text-5xl font-bold">
                هل أنت مستعد لحجز {vehicle.name}؟
              </h2>
              <VehicleBookingForm
                vehicleName={vehicle.name}
                pricePerDay={vehicle.pricePerDay}
                vehicleId={vehicle.id}
              />
            </div>
          </div>
        </section>

        {/* Related Vehicles */}
        {relatedVehicles.length > 0 && (
          <section className="py-20 border-t border-border bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl font-bold">
                مركبات أخرى قد تعجبك
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedVehicles.map((v) => (
                  <Card
                    key={v.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-none"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={v.image || "/placeholder.svg"}
                        alt={v.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-3 text-2xl font-bold text-right">{v.name}</h3>
                      <p className="mb-5 line-clamp-2 text-muted-foreground text-right">
                        {v.description}
                      </p>
                      <div className="mb-6 flex items-baseline gap-3 justify-end">
                        <span className="text-lg text-muted-foreground">/اليوم</span>
                        <span className="text-3xl font-bold text-primary">${v.pricePerDay}</span>
                      </div>
                      <Button asChild size="lg" className="w-full">
                        <Link href={`/ar/vehicle-hire/${v.slug}`}>عرض التفاصيل</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}