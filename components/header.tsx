// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Bird, Accessibility, DollarSign, Star, MapPin } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  const tourCategories = [
    { href: "/tours", label: "All Tours", icon: Star },
    { href: "/wildebeest-migration-safari-packages", label: "Migration Safaris", icon: Bird },
    { href: "/accessible-migration", label: "Accessible Tours", icon: Accessibility },
    { href: "/flamingo-safari-tours", label: "Flamingo Safaris", icon: MapPin },
    { href: "/budget-tours", label: "Budget Tours", icon: DollarSign },
  ];

  const destinationCategories = [
    { href: "/destinations/kenya", label: "Kenya", flag: "🇰🇪" },
    { href: "/destinations/tanzania", label: "Tanzania", flag: "🇹🇿" },
    { href: "/destinations/rwanda", label: "Rwanda", flag: "🇷🇼" },
    { href: "/destinations/uganda", label: "Uganda", flag: "🇺🇬" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Main Header Row */}
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* Logo */}
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
            <span className="text-base md:text-xl font-bold text-gray-900">JaeTravel</span>
            <span className="text-[10px] md:text-xs font-medium text-amber-600 tracking-wider">EXPEDITIONS</span>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden on mobile/tablet */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap focus:outline-none">
              Tours <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-64 p-2" align="center" sideOffset={8}>
              {tourCategories.map((tour) => (
                <DropdownMenuItem key={tour.href} asChild className="cursor-pointer">
                  <Link href={tour.href} className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-amber-50">
                    <tour.icon className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium">{tour.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/vehicle-hire" className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-amber-50">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Vehicle Hire</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap focus:outline-none">
              Destinations <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-56 p-2" align="center" sideOffset={8}>
              {destinationCategories.map((dest) => (
                <DropdownMenuItem key={dest.href} asChild className="cursor-pointer">
                  <Link href={dest.href} className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-amber-50">
                    <span className="text-lg">{dest.flag}</span>
                    <span className="text-sm font-medium">{dest.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
            About
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap focus:outline-none">
              Blog <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-48 p-2" align="center" sideOffset={8}>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/blog" className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-amber-50">
                  <span className="text-sm font-medium">Blog Posts</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/blog/blog-gallery" className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-amber-50">
                  <span className="text-sm font-medium">Photo & Video Gallery</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 rounded-md transition-colors whitespace-nowrap">
            Contact
          </Link>
        </nav>

        {/* Desktop Right Section - Hidden on mobile/tablet */}
        <div className="hidden lg:flex items-center justify-end gap-3 flex-shrink-0">
          <LanguageSwitcher />

          <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium px-3 py-2 rounded-full text-sm whitespace-nowrap">
            <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </Button>

          <a href="tel:+254726485228" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors whitespace-nowrap">
            +254 726 485 228
          </a>
        </div>

        {/* Mobile Menu Button - Hidden on desktop */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation - Only shown when menu is open */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white max-h-[85vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <nav className="flex flex-col gap-1">
              <Link 
                href="/" 
                className="text-base font-medium text-gray-900 hover:text-amber-600 py-3 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Tours Section */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setToursOpen(!toursOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-900 hover:text-amber-600 py-3"
                >
                  <span>Tours</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${toursOpen ? 'rotate-180' : ''}`} />
                </button>
                {toursOpen && (
                  <div className="pb-2 space-y-0.5">
                    {tourCategories.map((tour) => (
                      <Link 
                        key={tour.href} 
                        href={tour.href} 
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 py-2.5 px-2 rounded-lg hover:bg-amber-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <tour.icon className="h-4 w-4 text-amber-600" />
                        {tour.label}
                      </Link>
                    ))}
                    <Link 
                      href="/vehicle-hire" 
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 py-2.5 px-2 rounded-lg hover:bg-amber-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <DollarSign className="h-4 w-4 text-amber-600" />
                      Vehicle Hire
                    </Link>
                  </div>
                )}
              </div>

              {/* Destinations Section */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setDestinationsOpen(!destinationsOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-900 hover:text-amber-600 py-3"
                >
                  <span>Destinations</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${destinationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {destinationsOpen && (
                  <div className="pb-2 space-y-0.5">
                    {destinationCategories.map((dest) => (
                      <Link 
                        key={dest.href} 
                        href={dest.href} 
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 py-2.5 px-2 rounded-lg hover:bg-amber-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-base">{dest.flag}</span>
                        {dest.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" className="text-base font-medium text-gray-900 hover:text-amber-600 py-3 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>About</Link>

              {/* Blog Section */}
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => setBlogOpen(!blogOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-gray-900 hover:text-amber-600 py-3"
                >
                  <span>Blog</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
                </button>
                {blogOpen && (
                  <div className="pb-2 space-y-0.5">
                    <Link href="/blog" className="block text-sm text-gray-600 hover:text-amber-600 py-2.5 px-2 rounded-lg hover:bg-amber-50" onClick={() => setMobileMenuOpen(false)}>Blog Posts</Link>
                    <Link href="/blog/blog-gallery" className="block text-sm text-gray-600 hover:text-amber-600 py-2.5 px-2 rounded-lg hover:bg-amber-50" onClick={() => setMobileMenuOpen(false)}>Photo & Video Gallery</Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className="text-base font-medium text-gray-900 hover:text-amber-600 py-3 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

              {/* Mobile Contact Section */}
              <div className="mt-4 space-y-3">
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium w-full rounded-full">
                  <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </Button>
                
                <a href="tel:+254726485228" className="flex items-center justify-center gap-2 text-base font-medium text-gray-700 hover:text-amber-600 py-3 border border-gray-200 rounded-full">
                  <Phone className="h-5 w-5" />
                  +254 726 485 228
                </a>

                <div className="flex items-center justify-center pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}