"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface TourTabContainerProps {
  pricingContent: ReactNode;
  itineraryContent: ReactNode;
  inclusionsContent: ReactNode;
  exclusionsContent: ReactNode;
  bookingContent: ReactNode;
  defaultTab?: string;
}

const tabs = [
  { id: "pricing", label: "Pricing" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "exclusions", label: "Exclusions" },
  { id: "booking", label: "Booking" },
];

export function TourTabContainer({
  pricingContent,
  itineraryContent,
  inclusionsContent,
  exclusionsContent,
  bookingContent,
  defaultTab = "pricing",
}: TourTabContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam && tabs.some((t) => t.id === tabParam) ? tabParam : defaultTab
  );

  useEffect(() => {
    if (tabParam && tabs.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    router.replace(`?tab=${id}`, { scroll: false });
  };

  return (
    <div>
      {/* Tab Navigation Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex space-x-8 overflow-x-auto whitespace-nowrap scrollbar-none py-3"
            aria-label="Tour Sections"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <a
                  key={tab.id}
                  href={`?tab=${tab.id}`}
                  onClick={(e) => handleTabClick(e, tab.id)}
                  className={`relative py-2 text-sm md:text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "text-amber-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 -mb-3" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="tab-panels">
        <div className={activeTab === "pricing" ? "block" : "hidden"}>
          {pricingContent}
        </div>
        <div className={activeTab === "itinerary" ? "block" : "hidden"}>
          {itineraryContent}
        </div>
        <div className={activeTab === "inclusions" ? "block" : "hidden"}>
          {inclusionsContent}
        </div>
        <div className={activeTab === "exclusions" ? "block" : "hidden"}>
          {exclusionsContent}
        </div>
        <div className={activeTab === "booking" ? "block" : "hidden"}>
          {bookingContent}
        </div>
      </div>
    </div>
  );
}
