"use client"

import { useState, useMemo } from "react"
import { tours } from "@/lib/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TOURS_PER_PAGE = 12

export default function ToursPage() {
  const [selectedCountry, setSelectedCountry] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 6000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const countries = ["All", "Kenya", "Tanzania", "Rwanda", "Uganda", "Multi-Country"]

  const tourTypes = useMemo(() => {
    const types = new Set<string>()
    tours.forEach((tour) => {
      if (tour.title.toLowerCase().includes("safari")) types.add("Safari")
      if (tour.title.toLowerCase().includes("gorilla") || tour.title.toLowerCase().includes("chimpanzee"))
        types.add("Primate Trekking")
      if (tour.title.toLowerCase().includes("beach") || tour.title.toLowerCase().includes("island"))
        types.add("Beach & Islands")
      if (
        tour.title.toLowerCase().includes("climbing") ||
        tour.title.toLowerCase().includes("hiking") ||
        tour.title.toLowerCase().includes("trek")
      )
        types.add("Mountain Trekking")
      if (tour.title.toLowerCase().includes("cultural") || tour.title.toLowerCase().includes("heritage"))
        types.add("Cultural")
      if (tour.title.toLowerCase().includes("accessible") || tour.title.toLowerCase().includes("disability"))
        types.add("Accessible Tours")
      if (tour.title.toLowerCase().includes("adventure") || tour.title.toLowerCase().includes("rafting"))
        types.add("Adventure")
    })
    return Array.from(types).sort()
  }, [])

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Country filter
      if (selectedCountry !== "All" && tour.country !== selectedCountry) return false

      // Price range filter
      if (tour.price < priceRange[0] || tour.price > priceRange[1]) return false

      // Tour type filter
      if (selectedTypes.length > 0) {
        const tourTitle = tour.title.toLowerCase()
        const matchesType = selectedTypes.some((type) => {
          if (type === "Safari") return tourTitle.includes("safari")
          if (type === "Primate Trekking")
            return tourTitle.includes("gorilla") || tourTitle.includes("chimpanzee") || tourTitle.includes("monkey")
          if (type === "Beach & Islands") return tourTitle.includes("beach") || tourTitle.includes("island")
          if (type === "Mountain Trekking")
            return tourTitle.includes("climbing") || tourTitle.includes("hiking") || tourTitle.includes("trek")
          if (type === "Cultural") return tourTitle.includes("cultural") || tourTitle.includes("heritage")
          if (type === "Accessible Tours") return tourTitle.includes("accessible") || tourTitle.includes("disability")
          if (type === "Adventure") return tourTitle.includes("adventure") || tourTitle.includes("rafting")
          return false
        })
        if (!matchesType) return false
      }

      return true
    })
  }, [selectedCountry, priceRange, selectedTypes])

  useMemo(() => {
    setCurrentPage(1)
  }, [selectedCountry, priceRange, selectedTypes])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearFilters = () => {
    setSelectedCountry("All")
    setPriceRange([0, 6000])
    setSelectedTypes([])
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE)
  const startIndex = (currentPage - 1) * TOURS_PER_PAGE
  const endIndex = startIndex + TOURS_PER_PAGE
  const currentTours = filteredTours.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">Explore Our Safari Tours</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed text-pretty">
          Discover unforgettable safari experiences across East Africa. From witnessing the Great Migration in Masai
          Mara to trekking mountain gorillas in Rwanda and Uganda, we offer expertly curated tours that showcase the
          best of African wildlife, landscapes, and culture.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Filter Tours</h2>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Country Filter */}
          <div className="space-y-2">
            <Label htmlFor="country-filter">Destination</Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger id="country-filter">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label>Price Range (USD)</Label>
              <span className="text-sm font-medium text-primary">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider min={0} max={6000} step={50} value={priceRange} onValueChange={setPriceRange} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$6,000</span>
            </div>
          </div>

          {/* Tour Type Filter */}
          <div className="space-y-3 md:col-span-3">
            <Label>Tour Type</Label>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {tourTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-foreground">{Math.min(endIndex, filteredTours.length)}</span> of{" "}
            <span className="font-semibold text-foreground">{filteredTours.length}</span> tours
          </p>
        </div>
      </div>

      {/* Tours Grid */}
      {currentTours.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPage =
                    page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)

                  if (!showPage) {
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-muted-foreground">
                          ...
                        </span>
                      )
                    }
                    return null
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(page)}
                      className="h-10 w-10"
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border bg-muted/50 p-12 text-center">
          <h3 className="mb-2 text-xl font-semibold">No tours found</h3>
          <p className="mb-4 text-muted-foreground">Try adjusting your filters to see more results.</p>
          <Button onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 rounded-2xl bg-primary/10 p-8 text-center md:p-12">
        <h2 className="mb-4 font-serif text-3xl font-bold text-balance">Can't Find What You're Looking For?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed text-pretty">
          We specialize in creating custom safari experiences tailored to your preferences, budget, and travel style.
          Contact us to design your perfect East African adventure.
        </p>
        <Button size="lg">Contact Us for Custom Tours</Button>
      </div>
    </div>
  )
}
