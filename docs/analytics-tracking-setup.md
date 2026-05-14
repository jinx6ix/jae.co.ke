# Google Analytics 4 - Event Tracking Setup Guide

## Event Structure

All events should follow this naming convention: `category_action`

### Core Events to Track

```javascript
// ——————————————————————————————————————————————————
// CONVERSION EVENTS (Most Important)
// ——————————————————————————————————————————————————

// Contact Form Submissions
gtag('event', 'generate_lead', {
  currency: 'USD',
  value: 1,
  event_category: 'lead',
  event_label: 'contact_form'
});

// WhatsApp Clicks
gtag('event', 'generate_lead', {
  currency: 'USD',
  value: 0.5,
  event_category: 'lead',
  event_label: 'whatsapp_click'
});

// Phone Clicks
gtag('event', 'generate_lead', {
  currency: 'USD',
  value: 0.5,
  event_category: 'lead',
  event_label: 'phone_click'
});

// Email Clicks
gtag('event', 'generate_lead', {
  currency: 'USD',
  value: 0.25,
  event_category: 'lead',
  event_label: 'email_click'
});

// Booking Button Clicks
gtag('event', 'select_content', {
  content_type: 'booking_button',
  event_category: 'engagement',
  event_label: 'book_now_click'
});

// Tour Page Views (with value)
gtag('event', 'view_item', {
  currency: 'USD',
  value: 1,
  items: [{
    item_id: 'TOUR_ID',
    item_name: 'Tour Name',
    item_category: 'Safari',
    price: 1500,
    quantity: 1
  }]
});

// ——————————————————————————————————————————————————
// ENGAGEMENT EVENTS
// ——————————————————————————————————————————————————

// Page Scroll Depth
gtag('event', 'scroll', {
  percent_scrolled: 25, // 25, 50, 75, 100
  event_category: 'engagement',
  event_label: window.location.pathname
});

// Time on Page
gtag('event', 'timing_complete', {
  name: 'read',
  value: timeInMilliseconds,
  event_category: 'engagement',
  event_label: window.location.pathname,
  metric1: bounce || false
});

// Video Views (if you add video)
gtag('event', 'video_progress', {
  video_title: 'Tour Preview Video',
  video_percent: 50,
  event_category: 'video'
});

// File Downloads
gtag('event', 'file_download', {
  file_name: 'safari-guide-2026.pdf',
  file_extension: 'pdf',
  event_category: 'download',
  event_label: 'lead_magnet'
});

// ——————————————————————————————————————————————————
// TRAFFIC SOURCE EVENTS
// ——————————————————————————————————————————————————

// UTM Parameter Tracking (automatic with GA4)
gtag('event', 'campaign_tracking', {
  source: 'google',
  medium: 'cpc',
  campaign: 'kenya_safari_2026',
  event_category: 'campaign'
});

// ——————————————————————————————————————————————————
// E-COMMERCE EVENTS (If Booking System)
// ——————————————————————————————————————————————————

// Add to Cart (Tour Inquiry)
gtag('event', 'add_to_cart', {
  currency: 'USD',
  value: 1500,
  items: [{
    item_id: '7DAY_SAFARI',
    item_name: '7-Day Kenya Safari',
    item_category: 'Safari Package',
    price: 1500,
    quantity: 1
  }]
});

// Begin Checkout
gtag('event', 'begin_checkout', {
  currency: 'USD',
  value: 1500,
  event_category: 'booking',
  event_label: 'inquiry_started'
});

// Purchase/Booking Complete
gtag('event', 'purchase', {
  transaction_id: 'BOOKING_ID',
  currency: 'USD',
  value: 1500,
  items: [{
    item_id: '7DAY_SAFARI',
    item_name: '7-Day Kenya Safari',
    item_category: 'Safari Package',
    price: 1500,
    quantity: 1
  }]
});
```

## Goals to Set in GA4

### 1. Lead Generation Goals
```
Goal 1: Contact Form Submission
- Event: generate_lead
- Filter: event_label = "contact_form"

Goal 2: WhatsApp Click
- Event: generate_leand
- Filter: event_label = "whatsapp_click"

Goal 3: Phone Call Click
- Event: generate_lead
- Filter: event_label = "phone_click"
```

### 2. Engagement Goals
```
Goal 4: High-Value Page View
- Condition: page_path contains "/tour/"
- Time on page > 2 minutes

Goal 5: Blog Engagement
- Condition: page_path contains "/blog/"
- Scroll depth > 75%
```

### 3. Conversion Funnel
```
Funnel:
1. Homepage → Tour Page → Contact → Submission
2. Homepage → Vehicle Hire → WhatsApp
3. Blog Post → Tour Page → Booking Request
```

## Implementation in Next.js

Create a tracking hook:

```typescript
// hooks/useAnalytics.ts
'use client';

export function useAnalytics() {
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', eventName, params);
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', 'G-2YLERP8F8B', {
        page_path: url,
      });
    }
  };

  const trackScrollDepth = (depth: number) => {
    trackEvent('scroll', {
      percent_scrolled: depth,
      page_path: window.location.pathname,
    });
  };

  return { trackEvent, trackPageView, trackScrollDepth };
}
```

## Dashboard Reports to Create

### 1. Overview Dashboard
- Total users
- Sessions by channel
- Top pages
- Conversion rate
- Bounce rate

### 2. Traffic Analysis
- Traffic by source/medium
- Geographic breakdown
- Device categories
- User flow visualization

### 3. Content Performance
- Page views by content
- Average time on page
- Scroll depth
- Exit rate by page

### 4. Conversion Tracking
- Goal completions
- Conversion funnel visualization
- Revenue/economic value
- Assisted conversions

### 5. Campaign Performance
- UTM-tracked campaigns
- Ad performance
- Email campaign results
- Social media traffic

## Weekly SEO Report Metrics

Track these metrics weekly:

| Metric | Target | Last Week | This Week | Change |
|--------|--------|-----------|-----------|--------|
| Organic Users | +10% | ? | ? | ? |
| Top Keyword Rankings | +5 positions | ? | ? | ? |
| Pages Indexed | 100% | ? | ? | ? |
| Core Web Vitals | Pass | ? | ? | ? |
| Backlinks Gained | +3/week | ? | ? | ? |
| Form Submissions | +10% | ? | ? | ? |
| WhatsApp Clicks | +10% | ? | ? | ? |

---

# Google Search Console Setup

## Essential Reports to Check Weekly

1. **Performance Report**
   - Queries bringing traffic
   - Click-through rates
   - Average positions
   - Pages with most clicks

2. **Index Coverage**
   - Errors requiring fixes
   - Pages excluded
   - Sitemap submission status

3. **URL Inspection**
   - Test individual URLs
   - Request indexing
   - Check Core Web Vitals

4. **Links Report**
   - Top linking sites
   - Top linking pages
   - Internal links

## Queries to Monitor

Track these query groups:
- Brand terms (jaetravel, kenya safari, etc.)
- Niche terms (wheelchair safari, accessible travel)
- Destination terms (masai mara, serengeti, etc.)
- Transactional terms (hire, book, price, cost)
- Informational terms (how to, what is, best time)

---

# Microsoft Clarity Setup

Enable these in Clarity:
- [ ] Heatmaps (all pages)
- [ ] Session recordings
- [ ] Scroll maps
- [ ] Click maps
- [ ] Rage clicks detection
- [ ] Dead clicks detection
- [ ] Form abandonment tracking

Create views for:
1. Homepage
2. Tour pages
3. Vehicle hire pages
4. Contact page
5. Blog posts

---

## Monthly Audit Checklist

- [ ] Check all tracked events are firing
- [ ] Verify conversions are recorded
- [ ] Review top performing pages
- [ ] Check for crawl errors
- [ ] Review and update tracking code
- [ ] Check Core Web Vitals
- [ ] Review Search Console for issues
- [ ] Analyze competitor changes
- [ ] Update keyword rankings
- [ ] Generate monthly report

---

*Document created: May 2026*