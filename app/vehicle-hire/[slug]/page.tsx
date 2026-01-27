import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { vehicles } from "@/lib/vehicles-data";
import { Check, ArrowLeft, Users, Luggage, Fuel, Settings, ChevronRight } from "lucide-react";
import { VehicleBookingForm } from "@/components/vehicle-booking-form";
import { VehicleStructuredData } from "@/components/vehicle-structured-data";
import { VehicleGallery } from "./components/VehicleGallery"; // Adjust path if needed

// Force only known slugs to be generated (optional but recommended for performance)
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

  if (!vehicle) {
    return {
      title: "Vehicle Not Found",
    };
  }

  return {
    title: vehicle.metaTitle,
    description: vehicle.metaDescription,
    keywords: vehicle.keywords,
    openGraph: {
      title: vehicle.metaTitle,
      description: vehicle.metaDescription,
      images: [vehicle.image],
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

  const relatedVehicles = vehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <>
      <VehicleStructuredData vehicle={vehicle} />

      <div className="pb-16">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-muted/30 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/vehicle-hire" className="hover:text-foreground">
                Vehicle Hire
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{vehicle.name}</span>
            </div>
          </div>
        </section>

        {/* Hero Section – Gallery full width + info below */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="mb-6">
              <Link href="/vehicle-hire">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Fleet
              </Link>
            </Button>

            {/* Full-width Gallery */}
            <div className="mb-12 mr-5 flex justify-center ">
              <VehicleGallery
                mainImage={vehicle.image}
                gallery={vehicle.gallery?.slice(1) ?? []}
                name={vehicle.name}
              />
            </div>

            {/* Vehicle main info – centered/max-width for readability */}
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl text-center md:text-left">
                {vehicle.name}
              </h1>

              <p className="mb-6 text-lg leading-relaxed text-muted-foreground text-center md:text-left">
                {vehicle.description}
              </p>

              <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-baseline justify-center md:justify-start gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary">${vehicle.pricePerDay}</span>
                  <span className="text-xl text-muted-foreground">per day</span>
                </div>
                {/* You can add a small tag/badge here if desired */}
              </div>

              <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-xl border border-border bg-muted/30 p-6">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Capacity</div>
                    <div className="font-semibold text-lg">{vehicle.capacity}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Luggage className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Luggage</div>
                    <div className="font-semibold text-lg">{vehicle.specifications.luggage}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Fuel className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Fuel Type</div>
                    <div className="font-semibold text-lg">{vehicle.specifications.fuelType}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Transmission</div>
                    <div className="font-semibold text-lg">{vehicle.specifications.transmission}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center md:text-left">
                <p className="text-lg font-semibold text-primary">{vehicle.ideal}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Specifications */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Features & Equipment</h2>
                  <ul className="space-y-3">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Technical Specifications</h2>
                  <dl className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Engine</dt>
                      <dd className="font-semibold">{vehicle.specifications.engine}</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Transmission</dt>
                      <dd className="font-semibold">{vehicle.specifications.transmission}</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Fuel Type</dt>
                      <dd className="font-semibold">{vehicle.specifications.fuelType}</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Luggage Capacity</dt>
                      <dd className="font-semibold">{vehicle.specifications.luggage}</dd>
                    </div>
                    {vehicle.specifications.fuelEfficiency && (
                      <div className="flex justify-between border-b border-border pb-2">
                        <dt className="text-muted-foreground">Fuel Efficiency</dt>
                        <dd className="font-semibold">{vehicle.specifications.fuelEfficiency}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </div>

            {vehicle.extras && (
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Optional Extras</h2>
                  <ul className="space-y-2">
                    {Object.entries(vehicle.extras).map(([key, value]) => (
                      <li
                        key={key}
                        className="flex items-center justify-between border-b border-border pb-2"
                      >
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-semibold">{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
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
          <section className="border-t border-border bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center font-serif text-3xl font-bold">
                Other Vehicles You May Like
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedVehicles.map((v) => (
                  <Card key={v.id} className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={v.image || "/placeholder.svg"}
                        alt={v.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">{v.name}</h3>
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {v.description}
                      </p>
                      <div className="mb-4 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ${v.pricePerDay}
                        </span>
                        <span className="text-sm text-muted-foreground">per day</span>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/vehicle-hire/${v.slug}`}>View Details</Link>
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