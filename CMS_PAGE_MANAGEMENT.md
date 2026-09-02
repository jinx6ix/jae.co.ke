# CMS Page Management System

## Overview

Every page on the frontend can now be created and managed entirely through the Payload CMS admin panel at `/admin`, without touching code.

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  User visits: /about, /contact, /pricing, etc.         │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Next.js Route: app/(marketing)/[...slug]/page.tsx     │
│  - Catch-all route for any unmatched URL               │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Fetch page from Payload CMS by slug                   │
│  lib/payload-pages.ts → getPageBySlugArray()           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Page not found? Return 404                            │
│  Otherwise: Render hero + content blocks dynamically  │
└─────────────────────────────────────────────────────────┘
```

### Reserved Routes

Some routes are **reserved** and won't use the CMS catch-all:
- Language prefixes: `de/`, `fr/`, `it/`, `hi/`, `ar/`, `zh/`
- Dynamic routes with complex logic: `/tours/[slug]`, `/vehicles/[slug]`
- Special features: `/itinerary-builder`, `/login`, `/dashboard`
- Existing hardcoded pages: `/about`, `/contact`, etc. (for now)

These routes have dedicated `page.tsx` files and take precedence over the catch-all.

## Creating a New Page in the CMS

### Step 1: Go to the Payload Admin

1. Navigate to `https://yoursite.com/admin`
2. Log in with your admin credentials
3. Click **Pages** in the left sidebar

### Step 2: Create a New Page

1. Click **Create new**
2. Fill in:
   - **Title**: Page heading (e.g., "About Us", "Testimonials")
   - **Slug**: URL path (e.g., `about`, `testimonials`) — this becomes the page URL
   - **Hero**: Choose a hero style and add your banner content
   - **Content**: Add layout blocks

### Step 3: Design with Blocks

The **Content** tab has a "Layout" section where you can add blocks:

| Block Type | Use Case |
|-----------|----------|
| **Content** | Text columns with rich text formatting, links |
| **Call To Action** | Promotional section with buttons |
| **Media Block** | Images with optional captions |
| **Archive** | Blog post or content listings |
| **Form Block** | Contact forms (requires Form Builder) |

### Step 4: Add SEO Metadata

In the **SEO** tab:
- **Meta Title**: What appears in browser tabs and Google results
- **Meta Description**: The snippet under your title in search results
- **Meta Image**: Social sharing image (OG image)

### Step 5: Publish

1. Set **Published At** date (leave blank for immediate publish)
2. Click **Publish**
3. The page is **live immediately** at `yoursite.com/<slug>`

---

## Examples

### Example 1: Simple "Team" Page

| Field | Value |
|-------|-------|
| Title | Our Team |
| Slug | `team` |
| Hero Type | Low Impact (simple banner) |
| Hero Text | "Meet the people behind Jae Travel" |
| Content Block 1 | Content block with team bio |
| Content Block 2 | Media block with team photo |
| SEO Title | "Our Team — JaeTravel Expeditions" |

**Result**: Page live at `/team`

### Example 2: Multi-section Landing Page

| Section | Type |
|---------|------|
| Hero | High Impact with background image |
| Features | Content block (3 columns) |
| CTA | Call To Action block with buttons |
| Recent Blog Posts | Archive block (auto-fetches latest posts) |
| Contact Form | Form Block |

**Result**: Full custom page with no code required

---

## File Structure

**New Files Created:**

```
lib/
├── payload-pages.ts           ← Server-side CMS page fetching
│
app/(marketing)/
└── [...slug]/
    └── page.tsx              ← Catch-all route (renders any CMS page)
```

**Updated Files:**

```
app/(marketing)/
└── sitemap.xml/
    └── route.tsx             ← Now includes CMS pages in sitemap
```

---

## How It Prevents Conflicts

### Reserved Slugs List

The catch-all route has a `RESERVED_SLUGS` Set that prevents CMS pages from overriding system routes:

```typescript
const RESERVED_SLUGS = new Set([
  // Language variants won't match
  'de', 'fr', 'it', 'hi', 'ar', 'zh',
  
  // Dynamic routes won't match
  'tours', 'tour', 'vehicles', 'vehicle-hire',
  
  // Special pages won't match
  'itinerary-builder', 'login', 'dashboard',
  
  // ... etc
])
```

**How it works:**
- User visits `/about`
- Catch-all checks if `about` is in `RESERVED_SLUGS` → it is (hardcoded page exists)
- Returns 404 (the hardcoded page handles it separately)
- User visits `/testimonials` (no reserved route)
- Fetches from CMS and renders dynamically

### Priority Order

1. **First**: Check if URL matches a reserved route
2. **Second**: Check if a hardcoded `page.tsx` file exists (takes precedence)
3. **Third**: Fetch from CMS and render dynamically (catch-all)
4. **Fourth**: If CMS has no page, return 404

---

## Performance

### Static Generation

Pages are pre-rendered at build time:

```typescript
export const revalidate = 60  // Regenerate every 60 seconds
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map(slug => ({ slug: slug.split('/') }))
}
```

- **First request**: Fast (uses pre-rendered static page)
- **After 60 seconds**: Background revalidation picks up CMS changes
- **No database calls on requests**: All queries happen at build time

### ISR (Incremental Static Regeneration)

When you publish a new page in `/admin`:
- Next.js regenerates it in the background
- Existing pages stay fast
- New pages appear within 60 seconds

---

## Migrating Existing Hardcoded Pages to CMS

You can gradually migrate pages as needed:

### Option 1: Keep Hardcoded (Current)

Keep pages like `/about` as hardcoded `page.tsx` files. They take precedence and you maintain full control over styling and functionality.

### Option 2: Migrate to CMS

1. Create a new page in Payload CMS with the same slug
2. Delete the hardcoded `page.tsx` file
3. Remove the slug from `RESERVED_SLUGS`
4. The CMS page takes over

---

## API Reference

### `lib/payload-pages.ts`

```typescript
// Get a single page by slug
async function getPageBySlug(slug: string): Promise<CMSPage | null>

// Get a page by slug array (for nested paths)
async function getPageBySlugArray(slugArray: string[]): Promise<CMSPage | null>

// Get all published page slugs (for static generation)
async function getAllPageSlugs(): Promise<string[]>

// Get all published pages with content
async function getAllPages(): Promise<CMSPage[]>
```

---

## Troubleshooting

### "Page not found" when it should exist

**Check:**
1. Is the page **published** in Payload? (Check `Published At` field)
2. Is the **slug** correct? (Check URL and slug field match)
3. Did you recently publish? (Pages cache for 60 seconds)
4. Is the slug in `RESERVED_SLUGS`? (Change the slug or remove from reserved list)

### Page shows old content

**Solution:**
- Pages regenerate every 60 seconds
- Or manually redeploy to force immediate regeneration
- Or clear Next.js cache: `rm -rf .next`

### Can't create a page with slug "about"

**Reason:** `about` is likely in `RESERVED_SLUGS` (hardcoded page exists)

**Solutions:**
- Use a different slug like `about-us` or `our-story`
- Or delete the hardcoded `/about/page.tsx` and remove from `RESERVED_SLUGS`

---

## What's Next

### Future Enhancements

1. **Internationalization**: Create page variants per language in the CMS
2. **Page scheduling**: Schedule pages to go live at specific dates/times
3. **Analytics**: Track which CMS pages get the most visits
4. **Redirects**: Use Payload's redirects plugin to manage old URLs
5. **Page preview**: Live preview in `/admin` before publishing

---

## Summary

✅ **You can now:**
- Create unlimited pages in `/admin` without code
- Design with drag-and-drop content blocks
- Manage SEO metadata for each page
- Publish/unpublish instantly
- See pages live within 60 seconds

✅ **The system:**
- Prevents conflicts with hardcoded routes
- Regenerates every 60 seconds for freshness
- Includes all CMS pages in sitemap automatically
- Returns proper 404 for non-existent pages

✅ **Reserved routes still work:**
- Language pages, dynamic routes, special features all unchanged
- You can migrate pages gradually as needed
