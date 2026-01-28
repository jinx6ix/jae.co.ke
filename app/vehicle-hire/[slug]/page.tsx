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

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
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

  // Group vehicles by type for fleet gallery
  const vehicleTypes = ["SUV", "Sedan", "Luxury"];
  const vehiclesByType = vehicleTypes
    .map((type) => ({
      type,
      vehicles: vehicles.filter((v) => v.type === type).slice(0, 4),
    }))
    .filter((group) => group.vehicles.length > 0);

  const relatedVehicles = vehicles.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <>
      <VehicleStructuredData vehicle={vehicle} />

      <div className="min-h-screen bg-background pb-20">
        {/* Breadcrumb */}
        <section className="border-b border-border bg-muted/40 py-4 sticky top-0 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/vehicle-hire" className="hover:text-foreground transition-colors">
                Vehicle Hire
              </Link>
              <ChevronRight className="h-4 w-4" />
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
              <Button asChild variant="ghost" className="mb-6 -ml-4">
                <Link href="/vehicle-hire">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Fleet
                </Link>
              </Button>

              <h1 className="mb-5 font-serif text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight text-center md:text-left">
                {vehicle.name}
              </h1>

              <p className="mb-8 text-lg md:text-xl leading-relaxed text-muted-foreground text-center md:text-left max-w-3xl">
                {vehicle.description}
              </p>

              <div className="mb-10 flex flex-col sm:flex-row items-center sm:items-end justify-center md:justify-start gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-extrabold text-primary">
                    ${vehicle.pricePerDay}
                  </span>
                  <span className="text-2xl text-muted-foreground">/day</span>
                </div>
              </div>

              <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-4">
                  <Users className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Capacity</div>
                    <div className="text-xl font-bold">{vehicle.capacity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Luggage className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Luggage</div>
                    <div className="text-xl font-bold">{vehicle.specifications.luggage}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Fuel className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Fuel</div>
                    <div className="text-xl font-bold">{vehicle.specifications.fuelType}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Settings className="h-7 w-7 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Gearbox</div>
                    <div className="text-xl font-bold">{vehicle.specifications.transmission}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center md:text-left">
                <p className="text-xl font-semibold text-primary">{vehicle.ideal}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Specifications */}
        <section className="py-16 border-t border-border bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-3xl font-bold">Features & Equipment</h2>
                  <ul className="space-y-4">
                    {vehicle.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4 text-lg">
                        <Check className="mt-1.5 h-6 w-6 flex-shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-3xl font-bold">Technical Specifications</h2>
                  <dl className="space-y-5 text-lg">
                    <div className="flex justify-between border-b pb-3">
                      <dt className="text-muted-foreground">Engine</dt>
                      <dd className="font-semibold">{vehicle.specifications.engine}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <dt className="text-muted-foreground">Transmission</dt>
                      <dd className="font-semibold">{vehicle.specifications.transmission}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <dt className="text-muted-foreground">Fuel Type</dt>
                      <dd className="font-semibold">{vehicle.specifications.fuelType}</dd>
                    </div>
                    <div className="flex justify-between border-b pb-3">
                      <dt className="text-muted-foreground">Luggage Capacity</dt>
                      <dd className="font-semibold">{vehicle.specifications.luggage}</dd>
                    </div>
                    {vehicle.specifications.fuelEfficiency && (
                      <div className="flex justify-between pb-3">
                        <dt className="text-muted-foreground">Fuel Efficiency</dt>
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
                  <h2 className="mb-6 text-3xl font-bold">Optional Extras</h2>
                  <ul className="space-y-4">
                    {Object.entries(vehicle.extras).map(([key, value]) => (
                      <li
                        key={key}
                        className="flex items-center justify-between border-b pb-4 last:border-b-0 text-lg"
                      >
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-bold text-primary">{value}</span>
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
              <h2 className="text-4xl font-bold text-center mb-12">
                Available Fleet
              </h2>
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
                Ready to Book {vehicle.name}?
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
                Other Vehicles You May Like
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
                      <h3 className="mb-3 text-2xl font-bold">{v.name}</h3>
                      <p className="mb-5 line-clamp-2 text-muted-foreground">
                        {v.description}
                      </p>
                      <div className="mb-6 flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-primary">${v.pricePerDay}</span>
                        <span className="text-lg text-muted-foreground">/day</span>
                      </div>
                      <Button asChild size="lg" className="w-full">
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