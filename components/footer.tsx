"use client"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { YouTubeSubscribe } from "./YouTubeSubscribe"
import { StarRating } from "./StarRating"
import {
  SAFARI_BOOKINGS_RATING,
  SAFARI_BOOKINGS_REVIEW_COUNT,
  TRIP_ADVISOR_RATING,
  TRIP_ADVISOR_REVIEW_COUNT,
} from "@/lib/reviews-data"
import { reopenConsent } from "@/lib/consent"

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-muted/30">
      {/* NOTE: the previous SafariBookings + YourAfricanSafari third-party
          review widgets were removed. Both injected a Google star-rating
          badge into the DOM, which produced 16 `ssl.gstatic.com` images
          with no `alt` attribute on every page plus conflicting RDFa
          markup. The native server-rendered <StarRating> below replaces
          them with accessible inline SVG and a single text label, and
          adds no third-party JavaScript. */}

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
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.facebook.com/JaeTravelExpeditions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JaeTravel Expeditions on Facebook"
                title="Follow on Facebook"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/jaetravelexpeditions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JaeTravel Expeditions on Instagram"
                title="Follow on Instagram"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={
                  (process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ||
                    "https://www.youtube.com/@jaetravelexpeditions") + "?sub_confirmation=1"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JaeTravel Expeditions on YouTube"
                title="Subscribe on YouTube"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@jaetravelexpeditions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JaeTravel Expeditions on TikTok"
                title="Follow on TikTok"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
              <YouTubeSubscribe className="ml-1" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tour-operators-in-kenya" className="text-muted-foreground transition-colors hover:text-primary">
                  Tour Operators in Kenya
                </Link>
              </li>
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

        {/* Native server-rendered star rating using the site's own
            verified review data. Replaces the third-party Google rating
            badge, which injected 16 alt-less `ssl.gstatic.com` images
            into every page. */}
        <div className="flex justify-center my-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">SafariBookings:</span>
              <StarRating
                rating={SAFARI_BOOKINGS_RATING}
                reviewCount={SAFARI_BOOKINGS_REVIEW_COUNT}
                source="safaribookings"
              />
            </div>
            <div className="hidden sm:block text-muted-foreground">|</div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">TripAdvisor:</span>
              <StarRating
                rating={TRIP_ADVISOR_RATING}
                reviewCount={TRIP_ADVISOR_REVIEW_COUNT}
                source="tripadvisor"
              />
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-lg font-semibold">Official Partners & Affiliations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            <a
              title="Kenya Wildlife Service"
              aria-label="Kenya Wildlife Service (opens in a new tab)"
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
              title="Tourism Authority Kenya"
              aria-label="Tourism Authority of Kenya (opens in a new tab)"
              href="https://www.tourismauthority.go.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/download.png"
                alt="Tourism Authority Kenya"
                width={150}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
            {/* The third-party rating iframe was removed: it rendered a
                Google star badge as 16 alt-less `ssl.gstatic.com` images
                on every page. The native <StarRating> component above
                replaces it with accessible inline SVG and one text label. */}
            <a
              title="SafariGo"
              aria-label="SafariGo (opens in a new tab)"
              href="https://www.safarigo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/images.png"
                alt="SafariGo"
                width={100}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
            <a
              title="SafariBookings"
              aria-label="Read our SafariBookings reviews (opens in a new tab)"
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
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p>&copy; {new Date().getFullYear()} JaeTravel Expeditions. All rights reserved.</p>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms & Conditions
            </Link>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy policy
            </Link>
            <button
              type="button"
              onClick={reopenConsent}
              className="transition-colors hover:text-primary"
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
