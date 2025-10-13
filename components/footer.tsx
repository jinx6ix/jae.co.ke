import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">JaeTravel Expeditions</h3>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for unforgettable safari experiences across East Africa. Specializing in accessible
              and inclusive travel.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tours" className="text-muted-foreground transition-colors hover:text-primary">
                  All Tours
                </Link>
              </li>
              <li>
                <Link href="/disability-tours" className="text-muted-foreground transition-colors hover:text-primary">
                  Accessible Tours
                </Link>
              </li>
              <li>
                <Link href="/vehicle-hire" className="text-muted-foreground transition-colors hover:text-primary">
                  Vehicle Hire
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations/kenya" className="text-muted-foreground transition-colors hover:text-primary">
                  Kenya Safaris
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/tanzania"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Tanzania Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/rwanda"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Rwanda Gorillas
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/uganda"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Uganda Adventures
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+254726485228" className="text-muted-foreground transition-colors hover:text-primary">
                  +254 726 485 228
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href="mailto:info@jaetravel.co.ke"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  info@jaetravel.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JaeTravel Expeditions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
