"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface GalleryFiltersProps {
  categories: string[]
  countries: string[]
}

export function GalleryFilters({ categories, countries }: GalleryFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCountry, setSelectedCountry] = useState("All")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Filter by Country</h3>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <Button
              key={country}
              variant={selectedCountry === country ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCountry(country)}
            >
              {country}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
