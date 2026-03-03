"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Globe, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toursOpen, setToursOpen] = useState(false)
  const [destinationsOpen, setDestinationsOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
          <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
            <Image 
              src="/logo.png" 
              alt="JaeTravel Expeditions" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base md:text-xl font-bold text-gray-900">
              JaeTravel
            </span>
            <span className="text-[10px] md:text-xs font-medium text-amber-600 tracking-wider">
              EXPEDITIONS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Visible from lg breakpoint */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2">
          <Link href="/" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
              Tours <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/tours">All Tours</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/budget-tours">Budget Tours</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/disability-tours">Disability Tours</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/vehicle-hire">Vehicle Hire</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
              Destinations <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/destinations/kenya">🇰🇪 Kenya</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/destinations/tanzania">🇹🇿 Tanzania</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/destinations/rwanda">🇷🇼 Rwanda</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/destinations/uganda">🇺🇬 Uganda</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/about" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
            About
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
              Blog <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/blog">Blog Posts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog/blog-gallery">Photo & Video Gallery</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
            Contact
          </Link>
        </nav>

        {/* Desktop Right Section - Visible from lg breakpoint */}
        <div className="hidden lg:flex items-center justify-end gap-2 xl:gap-4 flex-shrink-0 min-w-[200px] xl:min-w-[240px]">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors border border-gray-200">
              <Globe className="h-4 w-4" />
              <span className="hidden xl:inline">EN</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <span>🇺🇸</span> English
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <span>🇫🇷</span> Français
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <span>🇪🇸</span> Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* WhatsApp Button */}
          <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium px-3 xl:px-4 py-2 rounded-full text-xs xl:text-sm whitespace-nowrap">
            <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 xl:gap-2">
              <Phone className="h-3 w-3 xl:h-4 xl:w-4" />
              <span className="hidden xl:inline">WhatsApp</span>
              <span className="xl:hidden">Chat</span>
            </a>
          </Button>

          {/* Phone Number */}
          <a href="tel:+254726485228" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors whitespace-nowrap">
            +254 726 485 228
          </a>
        </div>

        {/* Mobile Menu Button - Hidden from lg upwards */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation - Only shown when menu is open and screen is below lg */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <nav className="flex flex-col gap-3">
              {/* Main Links */}
              <Link 
                href="/" 
                className="text-base font-medium text-gray-900 hover:text-amber-600 py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Tours Section */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setToursOpen(!toursOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-900 hover:text-amber-600 py-2"
                >
                  <span>Tours</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${toursOpen ? 'rotate-180' : ''}`} />
                </button>
                {toursOpen && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link 
                      href="/tours" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Tours
                    </Link>
                    <Link 
                      href="/budget-tours" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Budget Tours
                    </Link>
                    <Link 
                      href="/disability-tours" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Disability Tours
                    </Link>
                    <Link 
                      href="/vehicle-hire" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Vehicle Hire
                    </Link>
                  </div>
                )}
              </div>

              {/* Destinations Section */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setDestinationsOpen(!destinationsOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-900 hover:text-amber-600 py-2"
                >
                  <span>Destinations</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${destinationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {destinationsOpen && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link 
                      href="/destinations/kenya" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🇰🇪 Kenya
                    </Link>
                    <Link 
                      href="/destinations/tanzania" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🇹🇿 Tanzania
                    </Link>
                    <Link 
                      href="/destinations/rwanda" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🇷🇼 Rwanda
                    </Link>
                    <Link 
                      href="/destinations/uganda" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      🇺🇬 Uganda
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                href="/about" 
                className="text-base font-medium text-gray-900 hover:text-amber-600 py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {/* Blog Section */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setBlogOpen(!blogOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-900 hover:text-amber-600 py-2"
                >
                  <span>Blog</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
                </button>
                {blogOpen && (
                  <div className="pl-4 pb-2 space-y-2">
                    <Link 
                      href="/blog" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog Posts
                    </Link>
                    <Link 
                      href="/blog/blog-gallery" 
                      className="block text-sm text-gray-600 hover:text-amber-600 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Photo & Video Gallery
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                href="/contact" 
                className="text-base font-medium text-gray-900 hover:text-amber-600 py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Contact Section */}
              <div className="mt-4 space-y-3">
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium w-full rounded-full">
                  <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </Button>
                
                <a 
                  href="tel:+254726485228" 
                  className="flex items-center justify-center gap-2 text-base font-medium text-gray-700 hover:text-amber-600 py-3 border border-gray-200 rounded-full"
                >
                  <Phone className="h-5 w-5" />
                  +254 726 485 228
                </a>

                {/* Mobile Language Options */}
                <div className="flex items-center justify-center gap-6 pt-2">
                  <button className="text-sm font-medium text-amber-600 border-b-2 border-amber-600 pb-1">EN</button>
                  <button className="text-sm font-medium text-gray-400 hover:text-gray-600 pb-1">FR</button>
                  <button className="text-sm font-medium text-gray-400 hover:text-gray-600 pb-1">ES</button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}