"use client"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-muted/30">
      {/* SafariBookings Widget Script */}
      <Script
        id="safaribookings-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){var sb=document.createElement('script');sb.type='text/javascript';sb.async=true;sb.src='https://s3.amazonaws.com/z_437er23a/73f68887a.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(sb,s);})();`,
        }}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Top Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">JaeTravel Expeditions</h3>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for unforgettable safari experiences across East Africa. 
              Specializing in accessible and inclusive travel.
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

          {/* Quick Links */}
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

          {/* Destinations */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations/kenya" className="text-muted-foreground transition-colors hover:text-primary">
                  Kenya Safaris
                </Link>
              </li>
              <li>
                <Link href="/destinations/tanzania" className="text-muted-foreground transition-colors hover:text-primary">
                  Tanzania Tours
                </Link>
              </li>
              <li>
                <Link href="/destinations/rwanda" className="text-muted-foreground transition-colors hover:text-primary">
                  Rwanda Gorillas
                </Link>
              </li>
              <li>
                <Link href="/destinations/uganda" className="text-muted-foreground transition-colors hover:text-primary">
                  Uganda Adventures
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
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

        {/* Partner Logos */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-lg font-semibold">Official Partners & Affiliations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            <a
              href="https://www.kws.go.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/KWS-Logo-5e-2.png"
                alt="Kenya Wildlife Service"
                width={100}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
            <a
              href="https://www.tourismauthority.go.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/download.png"
                alt="Tourism Authority Kenya"
                width={100}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
            <a
              href="https://www.safaribookings.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/download (1).png"
                alt="SafariBookings"
                width={100}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
            {/* Your African Safari Widget */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-1 rounded hover:shadow-md transition-shadow">
                  <iframe 
                    scrolling="no" 
                    frameBorder="0" 
                    width="130" 
                    src="https://www.yourafricansafari.com/c/3443-jae-travel-expeditions/widget_1/"
                    title="Your African Safari Reviews"
                  ></iframe>
                </div>
                <p className="text-xs text-gray-400 mt-1">Customer Reviews</p>
              </div>
            <a
              href="https://www.safarigo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/images (2).jpeg"
                alt="SafariGo"
                width={100}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
            <a
              href="https://www.safaribookings.com/p6888?utm_source=jaetravel.com&utm_medium=reviewwidget"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/download.jpeg"
                alt="SafariBookings Widget"
                width={100}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JaeTravel Expeditions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
