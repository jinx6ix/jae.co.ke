"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  const pathname = usePathname();
  const lastScrollDepth = useRef<number>(0);

  // Track page views
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-2YLERP8F8B", {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      // Track at 25%, 50%, 75%, 100%
      const thresholds = [25, 50, 75, 100];
      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && lastScrollDepth.current < threshold) {
          trackEvent({
            action: "scroll",
            category: "engagement",
            label: `${threshold}%`,
            value: threshold,
          });
        }
      });

      lastScrollDepth.current = scrollPercent;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  }, []);

  const trackLead = useCallback((source: string, value?: number) => {
    trackEvent({
      action: "generate_lead",
      category: "lead",
      label: source,
      value: value ?? 1,
    });
  }, [trackEvent]);

  const trackClick = useCallback((element: string, location: string) => {
    trackEvent({
      action: "click",
      category: "engagement",
      label: `${location}:${element}`,
    });
  }, [trackEvent]);

  const trackFormStart = useCallback(() => {
    trackEvent({
      action: "begin_checkout",
      category: "booking",
      label: "form_started",
    });
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formType: string) => {
    trackEvent({
      action: "generate_lead",
      category: "lead",
      label: `form:${formType}`,
      value: 1,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackLead,
    trackClick,
    trackFormStart,
    trackFormSubmit,
  };
}

// ——————————————————————————————————————————————————
// TRACKING COMPONENTS
// ——————————————————————————————————————————————————

interface TrackClickProps {
  onClick: () => void;
  element: string;
  location: string;
  children: React.ReactNode;
  className?: string;
}

export function TrackClick({ onClick, element, location, children, className }: TrackClickProps) {
  const { trackClick } = useAnalytics();

  const handleClick = () => {
    trackClick(element, location);
    onClick();
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

// Pre-built tracking functions for common actions
export const trackingEvents = {
  // WhatsApp clicks
  whatsappHeader: () => ({
    action: "generate_lead",
    category: "lead",
    label: "whatsapp:header",
  }),
  whatsappFooter: () => ({
    action: "generate_lead",
    category: "lead",
    label: "whatsapp:footer",
  }),
  whatsappCTA: () => ({
    action: "generate_lead",
    category: "lead",
    label: "whatsapp:cta",
  }),

  // Phone clicks
  phoneHeader: () => ({
    action: "generate_lead",
    category: "lead",
    label: "phone:header",
  }),
  phoneFooter: () => ({
    action: "generate_lead",
    category: "lead",
    label: "phone:footer",
  }),

  // Email clicks
  emailClick: () => ({
    action: "generate_lead",
    category: "lead",
    label: "email:click",
  }),

  // Booking actions
  bookNowClick: (page: string) => ({
    action: "select_content",
    category: "booking",
    label: `book_now:${page}`,
    value: 1,
  }),
  inquiryClick: (tourName: string) => ({
    action: "select_content",
    category: "booking",
    label: `inquiry:${tourName}`,
    value: 1,
  }),

  // Engagement
  tourCardClick: (tourId: string) => ({
    action: "select_content",
    category: "engagement",
    label: `tour_card:${tourId}`,
  }),
  destinationClick: (destination: string) => ({
    action: "select_content",
    category: "engagement",
    label: `destination:${destination}`,
  }),
  blogClick: (postSlug: string) => ({
    action: "select_content",
    category: "engagement",
    label: `blog:${postSlug}`,
  }),

  // Outbound links
  outboundLink: (url: string) => ({
    action: "click",
    category: "outbound",
    label: url,
  }),
};