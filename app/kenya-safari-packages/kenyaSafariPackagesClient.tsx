// app/kenya-safari-packages/KenyaSafariPackagesClient.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, X, Phone } from 'lucide-react';

interface SafariPackage {
  id: number;
  title: string;
  slug: string;
  duration: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  highlights: string[];
  badge?: string;
  badgeColor?: string;
  destinations: string[];
  description: string;
}

interface KenyaSafariPackagesClientProps {
  packages: SafariPackage[];
  destinations: string[];
  durations: string[];
  budgets: string[];
}

// Helper function to get budget range from selection
const getBudgetRange = (budget: string): { min: number; max: number } | null => {
  if (budget === "Budget ($100-300/day)") return { min: 100, max: 300 };
  if (budget === "Mid-Range ($300-600/day)") return { min: 300, max: 600 };
  if (budget === "Luxury ($600+/day)") return { min: 600, max: Infinity };
  return null;
};

// Helper function to get duration range from selection
const getDurationRange = (duration: string): { min: number; max: number } | null => {
  if (duration === "1 Day") return { min: 1, max: 1 };
  if (duration === "2-3 Days") return { min: 2, max: 3 };
  if (duration === "4-5 Days") return { min: 4, max: 5 };
  if (duration === "6-7 Days") return { min: 6, max: 7 };
  if (duration === "8+ Days") return { min: 8, max: Infinity };
  return null;
};

// Helper to get numeric days from duration string
const getNumericDays = (duration: string): number => {
  const match = duration.match(/\d+/);
  if (match) return parseInt(match[0]);
  return 0;
};

export default function KenyaSafariPackagesClient({ 
  packages, 
  destinations, 
  durations, 
  budgets 
}: KenyaSafariPackagesClientProps) {
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [showFilters, setShowFilters] = useState(false);

  // Filter packages based on selections
  const filteredPackages = useMemo(() => {
    let filtered = [...packages];

    // Filter by destination
    if (selectedDestination !== "All") {
      filtered = filtered.filter(pkg => 
        pkg.destinations.includes(selectedDestination)
      );
    }

    // Filter by duration
    if (selectedDuration !== "All") {
      const durationRange = getDurationRange(selectedDuration);
      if (durationRange) {
        filtered = filtered.filter(pkg => {
          const days = getNumericDays(pkg.duration);
          return days >= durationRange.min && days <= durationRange.max;
        });
      } else {
        filtered = filtered.filter(pkg => pkg.duration === selectedDuration);
      }
    }

    // Filter by budget (price per day)
    if (selectedBudget !== "All Budgets") {
      const budgetRange = getBudgetRange(selectedBudget);
      if (budgetRange) {
        filtered = filtered.filter(pkg => {
          const days = getNumericDays(pkg.duration);
          const pricePerDay = pkg.price / days;
          return pricePerDay >= budgetRange.min && pricePerDay <= budgetRange.max;
        });
      }
    }

    return filtered;
  }, [packages, selectedDestination, selectedDuration, selectedBudget]);

  // Get counts for each filter option
  const getDestinationCount = (dest: string) => {
    if (dest === "All") return packages.length;
    return packages.filter(pkg => pkg.destinations.includes(dest)).length;
  };

  const getDurationCount = (dur: string) => {
    if (dur === "All") return packages.length;
    const durationRange = getDurationRange(dur);
    if (durationRange) {
      return packages.filter(pkg => {
        const days = getNumericDays(pkg.duration);
        return days >= durationRange.min && days <= durationRange.max;
      }).length;
    }
    return packages.filter(pkg => pkg.duration === dur).length;
  };

  const getBudgetCount = (budget: string) => {
    if (budget === "All Budgets") return packages.length;
    const budgetRange = getBudgetRange(budget);
    if (budgetRange) {
      return packages.filter(pkg => {
        const days = getNumericDays(pkg.duration);
        const pricePerDay = pkg.price / days;
        return pricePerDay >= budgetRange.min && pricePerDay <= budgetRange.max;
      }).length;
    }
    return 0;
  };

  const clearFilters = () => {
    setSelectedDestination("All");
    setSelectedDuration("All");
    setSelectedBudget("All Budgets");
  };

  const hasActiveFilters = selectedDestination !== "All" || selectedDuration !== "All" || selectedBudget !== "All Budgets";

  return (
    <>
      {/* ========== FILTER SECTION ========== */}
      <section className="py-6 bg-gray-50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                {/* Destination Filter */}
                <select
                  title="Filter by Destination"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
                >
                  {destinations.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest} ({getDestinationCount(dest)})
                    </option>
                  ))}
                </select>

                {/* Duration Filter */}
                <select
                  title="Filter by Duration"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
                >
                  {durations.map((dur) => (
                    <option key={dur} value={dur}>
                      {dur} ({getDurationCount(dur)})
                    </option>
                  ))}
                </select>

                {/* Budget Filter */}
                <select
                  title="Filter by Budget"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
                >
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget} ({getBudgetCount(budget)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-bold">{filteredPackages.length}</span> packages available
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="ml-3 text-orange-600 hover:text-orange-700 text-sm font-medium inline-flex items-center gap-1"
                  >
                    <X size={14} /> Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedDestination !== "All" && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                    Destination: {selectedDestination}
                    <button title='Clear this filter' onClick={() => setSelectedDestination("All")}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedDuration !== "All" && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                    Duration: {selectedDuration}
                    <button title='Clear this filter' onClick={() => setSelectedDuration("All")}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedBudget !== "All Budgets" && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                    Budget: {selectedBudget}
                    <button title='Clear this filter' onClick={() => setSelectedBudget("All Budgets")}>
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========== SAFARI PACKAGES GRID ========== */}
      <section id="packages" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Explore Our Kenya Safari Packages
          </h2>

          {filteredPackages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPackages.map((pkg) => (
                <article key={pkg.id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  
                  {/* Badge */}
                  {pkg.badge && (
                    <div className={`absolute top-4 left-4 z-10 ${pkg.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {pkg.badge}
                    </div>
                  )}

                  {/* Image */}
                  <Link href={`/safari/${pkg.slug}`} className="block relative h-48 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} - ${pkg.duration} Kenya safari package`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                      {pkg.duration}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <Link href={`/safari/${pkg.slug}`}>
                      <h3 className="text-lg font-bold mb-2 hover:text-orange-600 transition-colors line-clamp-2">
                        {pkg.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < Math.floor(pkg.rating) ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {pkg.rating} ({pkg.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {pkg.destinations.map((dest) => (
                        <span key={dest} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {dest}
                        </span>
                      ))}
                    </div>

                    <ul className="mb-4 space-y-1">
                      {pkg.highlights.slice(0, 3).map((item) => (
                        <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle2 className="text-green-500" size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        {pkg.oldPrice && (
                          <span className="text-sm text-gray-400 line-through mr-2">
                            ${pkg.oldPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold text-orange-600">
                          ${pkg.price}
                        </span>
                        <span className="text-sm text-gray-500">/person</span>
                      </div>
                      <Link
                        href={`/safari/${pkg.slug}`}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🦁</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No packages found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more options</p>
              <button
                onClick={clearFilters}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg"
            >
              <Phone size={20} /> Customize Your Safari Package
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}