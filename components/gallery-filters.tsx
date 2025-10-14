"use client"

import { Button } from "@/components/ui/button"

interface GalleryFiltersProps {
  categories: string[]
  countries: string[]
  selectedCategory: string
  selectedCountry: string
  onCategoryChange: (category: string) => void
  onCountryChange: (country: string) => void
}

export function GalleryFilters({
  categories,
  countries,
  selectedCategory,
  selectedCountry,
  onCategoryChange,
  onCountryChange,
}: GalleryFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Filter by Country</h3>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <Button
              key={country}
              variant={selectedCountry === country ? "default" : "outline"}
              size="sm"
              onClick={() => onCountryChange(country)}
              className="transition-all duration-200"
            >
              {country}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== "All" || selectedCountry !== "All") && (
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <span className="text-sm font-medium text-foreground">Active Filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <div className="flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                <span>{selectedCategory}</span>
                <button
                  onClick={() => onCategoryChange("All")}
                  className="ml-1 hover:text-primary/70 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
            {selectedCountry !== "All" && (
              <div className="flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                <span>{selectedCountry}</span>
                <button
                  onClick={() => onCountryChange("All")}
                  className="ml-1 hover:text-primary/70 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange("All")
              onCountryChange("All")
            }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}