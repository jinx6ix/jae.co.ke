import type { Metadata } from "next";
import Link from "next/link";
import { tours } from "@/lib/tours-data";
import { budgetTours } from "@/lib/budget-tours-data";
import { vehicles } from "@/lib/vehicles-data";
import { destinations } from "@/lib/destinations-data";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Sitemap | JaeTravel Expeditions",
  description: "Complete sitemap of JaeTravel Expeditions - Find all our safari tours, destinations, vehicle hire options, and travel resources.",
  alternates: {
    canonical: "https://www.jaetravel.co.ke/sitemap",
  },
};

const BASE = "https://www.jaetravel.co.ke";

export default function SitemapPage() {
  const safeTours = Array.isArray(tours) ? tours : [];
  const safeBudget = Array.isArray(budgetTours) ? budgetTours : [];
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const safeDests = Array.isArray(destinations) ? destinations : [];
  const safeBlog = Array.isArray(blogPosts) ? blogPosts : [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-serif font-bold text-center mb-4">Sitemap</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Browse all pages on JaeTravel Expeditions - East Africa's leading safari operator specializing in accessible travel.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main Pages */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Main Pages</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="text-primary hover:underline">Home</Link></li>
            <li><Link href="/tours" className="text-primary hover:underline">Safari Tours</Link></li>
            <li><Link href="/budget-tours" className="text-primary hover:underline">Budget Tours</Link></li>
            <li><Link href="/vehicle-hire" className="text-primary hover:underline">Vehicle Hire</Link></li>
            <li><Link href="/vehicles" className="text-primary hover:underline">Our Vehicles</Link></li>
            <li><Link href="/destinations" className="text-primary hover:underline">Destinations</Link></li>
            <li><Link href="/blog" className="text-primary hover:underline">Travel Blog</Link></li>
            <li><Link href="/about" className="text-primary hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="text-primary hover:underline">Contact Us</Link></li>
          </ul>
        </section>

        {/* Featured Pages */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Featured Safaris</h2>
          <ul className="space-y-2">
            <li><Link href="/maasai-mara-great-migration" className="text-primary hover:underline">Masai Mara Great Migration</Link></li>
            <li><Link href="/disability-tours" className="text-primary hover:underline">Accessible Tours</Link></li>
            <li><Link href="/gorilla-trekking-tours" className="text-primary hover:underline">Gorilla Trekking</Link></li>
            <li><Link href="/serengeti-safaris" className="text-primary hover:underline">Serengeti Safaris</Link></li>
            <li><Link href="/amboseli-safaris" className="text-primary hover:underline">Amboseli Safaris</Link></li>
            <li><Link href="/ngorongoro-safaris" className="text-primary hover:underline">Ngorongoro Safaris</Link></li>
            <li><Link href="/great-migration-safaris" className="text-primary hover:underline">Great Migration Safaris</Link></li>
            <li><Link href="/wheelchair-accessible-safari-landcruiser" className="text-primary hover:underline">Wheelchair Accessible Vehicle</Link></li>
            <li><Link href="/kenya-safari-packages" className="text-primary hover:underline">Kenya Safari Packages</Link></li>
          </ul>
        </section>

        {/* Specialized Pages */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Specialized Tours</h2>
          <ul className="space-y-2">
            <li><Link href="/kenya-circuit-safaris" className="text-primary hover:underline">Kenya Circuit Safaris</Link></li>
            <li><Link href="/tanzania-circuit-safaris" className="text-primary hover:underline">Tanzania Circuit Safaris</Link></li>
            <li><Link href="/uganda-circuit-safaris" className="text-primary hover:underline">Uganda Circuit Safaris</Link></li>
            <li><Link href="/adventure-trekking" className="text-primary hover:underline">Adventure Trekking</Link></li>
            <li><Link href="/beach-holidays" className="text-primary hover:underline">Beach Holidays</Link></li>
            <li><Link href="/cultural-tours" className="text-primary hover:underline">Cultural Tours</Link></li>
            <li><Link href="/birdwatching-safaris-east-africa" className="text-primary hover:underline">Birdwatching Safaris</Link></li>
            <li><Link href="/flamingo-safari-tours" className="text-primary hover:underline">Flamingo Tours</Link></li>
            <li><Link href="/short-safaris" className="text-primary hover:underline">Short Safaris</Link></li>
          </ul>
        </section>

        {/* Destinations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Destinations</h2>
          <ul className="space-y-2">
            {safeDests.map(dest => (
              <li key={dest.slug}>
                <Link href={`/destinations/${dest.country.toLowerCase()}`} className="text-primary hover:underline">
                  {dest.country}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Tour Packages */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Tour Packages</h2>
          <ul className="space-y-2">
            {safeTours.slice(0, 10).map(tour => (
              <li key={tour.id}>
                <Link href={`/tour/${tour.slug}`} className="text-primary hover:underline">
                  {tour.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Budget Tours */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Budget Tours</h2>
          <ul className="space-y-2">
            {safeBudget.slice(0, 10).map(tour => (
              <li key={tour.id}>
                <Link href={`/budget-tours/${tour.slug}`} className="text-primary hover:underline">
                  {tour.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Vehicle Hire */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Vehicle Hire</h2>
          <ul className="space-y-2">
            {safeVehicles.slice(0, 8).map(vehicle => (
              <li key={vehicle.id}>
                <Link href={`/vehicle-hire/${vehicle.slug}`} className="text-primary hover:underline">
                  {vehicle.name}
                </Link>
              </li>
            ))}
            <li><Link href="/wheelchair-vehicle" className="text-primary hover:underline">Wheelchair Accessible</Link></li>
            <li><Link href="/toyota-landcruiser" className="text-primary hover:underline">Toyota Landcruiser</Link></li>
            <li><Link href="/toyota-prado" className="text-primary hover:underline">Toyota Prado</Link></li>
          </ul>
        </section>

        {/* Blog */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Travel Blog</h2>
          <ul className="space-y-2">
            {safeBlog.slice(0, 8).map(post => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
            <li><Link href="/blog" className="text-primary hover:underline">View All Posts →</Link></li>
          </ul>
        </section>

        {/* Languages */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Language Versions</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="text-primary hover:underline">English</Link></li>
            <li><Link href="/fr" className="text-primary hover:underline">Français</Link></li>
            <li><Link href="/de" className="text-primary hover:underline">Deutsch</Link></li>
            <li><Link href="/it" className="text-primary hover:underline">Italiano</Link></li>
            <li><Link href="/hi" className="text-primary hover:underline">हिन्दी</Link></li>
            <li><Link href="/ar" className="text-primary hover:underline">العربية</Link></li>
            <li><Link href="/zh" className="text-primary hover:underline">中文</Link></li>
          </ul>
        </section>

        {/* Legal & Support */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Legal & Support</h2>
          <ul className="space-y-2">
            <li><Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/book-now" className="text-primary hover:underline">Book Now</Link></li>
            <li><Link href="/other-services" className="text-primary hover:underline">Other Services</Link></li>
          </ul>
        </section>
      </div>
    </div>
  );
}