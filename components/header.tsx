"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* Replace with your logo image if available */}
          <Image src="/logo.png" alt="JaeTravel Expeditions" width={40} height={40} />
          <span className="text-2xl font-bold text-primary pl-10">
            JaeTravel
            <br/>Expeditions
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/tours" className="text-sm font-medium transition-colors hover:text-primary">
            Tours
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              Destinations <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/destinations/kenya">Kenya</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/destinations/tanzania">Tanzania</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/destinations/rwanda">Rwanda</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/destinations/uganda">Uganda</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/vehicle-hire" className="text-sm font-medium transition-colors hover:text-primary">
            Vehicle Hire
          </Link>
          <Link href="/disability-tours" className="text-sm font-medium transition-colors hover:text-primary">
            Disability Tours
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
              Blog <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/blog">Blog Posts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog/gallery">Photo & Video Gallery</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
              🇺🇸 English <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>🇺🇸 English</DropdownMenuItem>
              <DropdownMenuItem>🇫🇷 Français</DropdownMenuItem>
              <DropdownMenuItem>🇪🇸 Español</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20BA5A]">
            <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link href="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/tours" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Tours
            </Link>
            <div className="flex flex-col gap-2 pl-4">
              <Link href="/destinations/kenya" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                Kenya
              </Link>
              <Link href="/destinations/tanzania" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                Tanzania
              </Link>
              <Link href="/destinations/rwanda" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                Rwanda
              </Link>
              <Link href="/destinations/uganda" className="text-sm" onClick={() => setMobileMenuOpen(false)}>
                Uganda
              </Link>
            </div>
            <Link href="/vehicle-hire" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Vehicle Hire
            </Link>
            <Link href="/disability-tours" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Disability Tours
            </Link>
            <Link href="/about" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/blog" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/blog/gallery" className="pl-4 text-sm" onClick={() => setMobileMenuOpen(false)}>
              Photo & Video Gallery
            </Link>
            <Link href="/contact" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20BA5A]">
              <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
