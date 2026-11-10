# JaeTravel SAGE 90+ Fix: Prompts by Workstream

Run these in order. Each prompt is self-contained: paste the **Shared context** block at the top of each one, then the prompt body. Wait for each to finish and review before running the next.

Baseline (SAGE, 10 Nov 2026): `/` = 70, `/tours` = 67, `/vehicle-hire/toyota-landcruiser` = 69.

---

## Shared context (paste at the top of every prompt)

```
You are a senior Next.js (App Router) + Payload CMS engineer and technical SEO/AEO/GEO specialist working on jaetravel.co.ke.
Stack: Next.js App Router, Payload CMS, Neon DB, Cloudflare R2 media, SSG with generateStaticParams, on-demand revalidation (afterChange/afterDelete hooks + secured /api/revalidate), next.config images unoptimized, forms are client components calling external APIs (/api/site-inquiries). Keep the existing theme, the /dashboard pages and all existing API routes. No time-based revalidate.
Goal: every public page, including slugs I have not listed, scores 90+ overall in SAGE, with no category below 85. Fix in shared templates, shared components and CMS fields so every current and future page inherits the fix.
Hard rules:
1. Never fabricate: no fake ratings, reviews, upvoteCount, prices, VideoObjects, awards or accreditations. Prices come from jaedb season/rate data. If real data is missing, omit the property and list it for me.
2. Do not change facts or brand voice when rewriting copy.
3. /dashboard/* and /api/* are noindex and excluded from audits, sitemap and llms.txt.
4. Work in small reviewable steps, keep changes reversible, show before/after numbers.
```

---

## Prompt 0: Route inventory and open questions (run first)

```
[Paste Shared context]

TASK: Do NOT implement anything yet. Produce:
1. A complete route inventory from the codebase and Payload collections: home, /tours and categories (main, budget, wheelchair-accessible, specialty), every tour detail slug, vehicle-hire index and every vehicle detail slug (Land Cruiser, Prado, vans, others), destinations, blog index and posts, about, contact, FAQ, terms, privacy, all dynamic generateStaticParams routes, and all language variants (EN, FR, DE, IT, HI, AR, ZH).
2. A page-type map: which template/component renders each route, and which Payload collection or global feeds it.
3. For each page type, list which of these exist today: single H1, breadcrumbs UI, BreadcrumbList schema, FAQ visible + FAQPage schema, tables with <th>, <time> dates, speakable, hreflang self-reference.
4. Where each of these currently comes from in the code, so later prompts can fix them at the source:
   - the Google star-rating widget images (ssl.gstatic.com/.../bubblev1/spacer.gif and border_3.gif; 16 images with no alt on every page)
   - the duplicate H1s (home hero slides; duplicated H1 on /vehicle-hire/*)
   - the duplicated hreflang sets on the home page
   - the 3 duplicate Organization JSON-LD nodes on vehicle pages
   - any RDFa/microdata markup
5. A list of missing facts you need from me before implementing (real street address, postal code, phone, email, opening hours, geo coordinates, price range, social and directory URLs such as TripAdvisor/Google Business Profile, guide/staff profile pages and accreditations, rate source fields).
Stop after delivering this and wait for my answers.
```

---

## Prompt 1: Sitewide template, accessibility, headings, head/meta

```
[Paste Shared context]

TASK: Fix the sitewide template issues found in all three SAGE reports. Implement in shared layout/components and in one shared buildMetadata() helper used by every route.

1. Reviews widget (biggest single loss; 16 images without alt on every page)
   - Replace the Google star-rating widget with a native server-rendered stars component: inline SVG stars with aria-hidden="true" plus one visually hidden text label ("Rated X out of 5 from N Google reviews"). Use only real values stored in the CMS or fetched from a real source.
   - If the widget must stay, load it client-only via next/script strategy="lazyOnload", and ensure its decorative images get alt="" and role="presentation". Make sure it adds no RDFa/microdata conflicting with JSON-LD.
   - Target: zero gstatic images in server HTML, zero images without alt.

2. Global chrome
   - Skip-to-content link as the first focusable element, targeting id="main-content" on <main>.
   - Footer social links (Facebook, Instagram, YouTube, TikTok) are empty/unlabeled: add aria-label ("JaeTravel on Facebook"), visible or visually hidden text, rel="noopener noreferrer", icons aria-hidden.
   - Add a Terms & Conditions footer link (missing on / and /tours). Keep Privacy.
   - Exactly one <header>, one <nav aria-label="Primary">, one <main>, one <footer>.

3. Breadcrumbs
   - One <Breadcrumbs> component on every non-home page: <nav aria-label="Breadcrumb"><ol>. It must also generate the BreadcrumbList JSON-LD from the same CMS data. Breadcrumb data editable in Payload.

4. Headings and in-page navigation
   - Exactly one H1 per page, in server HTML. Home: hero carousel slide titles ("Gorilla Trekking in Rwanda") must become <p> or <h2>; the real H1 ("Wheelchair Accessible Safari Kenya…") becomes the AI-view topic. /vehicle-hire/*: remove the duplicated H1 (probably mobile/desktop duplicate trees; render one and switch with CSS).
   - No skipped levels (home has H1→H3).
   - Add stable, de-duplicated slug ids on every H2/H3 and an auto-generated "On this page" table of contents (in-page anchor links) for pages with 4+ sections. Add scroll-margin-top for the sticky header.

5. Freshness
   - Visible <time datetime="YYYY-MM-DD"> "Last updated" (and "Published" where relevant) on every content page, from Payload createdAt/updatedAt. Emit the same values as datePublished/dateModified in WebPage schema and as meta article:published_time/article:modified_time. (Home currently has no dateModified; /tours has no date at all.)

6. Head/meta via buildMetadata()
   - Title 45–60 chars, primary keyword first, brand last (landcruiser is 90, home is 73). Suggested: Home "Wheelchair Accessible Safaris in Kenya | JaeTravel"; Landcruiser "Toyota Land Cruiser Hire Kenya | 4x4 Safari Vehicle".
   - Meta description 120–155 chars with primary keyword and a call to action (home is 163).
   - Canonical absolute URL everywhere.
   - Open Graph complete and de-duplicated: og:title, og:description, og:url, og:site_name, og:locale, og:type, og:image (+width/height/alt). Twitter card complete. (/tours lacks og:url, site_name, type, locale; home has duplicate og:image.)
   - hreflang: exactly ONE set per page with a self-referencing entry, every real translation and x-default. Home currently emits two overlapping sets (en, en-US, en-GB, en-AU, en-CA, then en, fr, de, it, hi, ar, zh, x-default twice): merge and de-duplicate. Every other page lacks the self-reference. Only list URLs that return 200 and reciprocate.
   - <link rel="sitemap" type="application/xml" href="/sitemap.xml"> in the head.
   - Add Payload validation with live character counters for seoTitle and metaDescription so editors cannot publish out-of-range values.

Deliver: changed files, before/after for each item above, and a note on anything you could not fix.
```

---

## Prompt 2: Images and performance

```
[Paste Shared context]

TASK: Fix the image pipeline and performance findings. Current state: 0% of images use modern formats on every page; the Landcruiser page has a 631 KB image and 4.2 MB total image weight; 16–27 images lack loading="lazy"; 11–19 render-blocking scripts per page; text-to-HTML ratio is 1–5%.

1. Image pipeline (images are unoptimized in next.config, so convert at upload time)
   - Add a Payload upload hook using sharp to generate AVIF + WebP variants at 480/768/1200/1920 widths, upload them to R2, keep the original as fallback.
   - Render with <picture> (AVIF → WebP → original) with width/height, sizes and decoding="async". Alternatively use Cloudflare Image Resizing/Polish URLs if available.
   - LCP/hero image: loading="eager", fetchpriority="high", preloaded. All other images loading="lazy".
   - Budgets: no image over 200 KB; under 1 MB total image weight on first load.
   - alt is a REQUIRED Payload field on every media item and image block. Validation blocks publishing if empty or filename-like. Backfill existing media with descriptive alt (subject, location, species/vehicle, accessibility feature); alt="" only for decorative images.
   - Write a one-off script to re-encode and re-upload existing R2 media, update DB URLs, and keep old URLs working through redirects or fallbacks.

2. Scripts and render performance
   - Audit every "use client" boundary; move anything non-interactive to server components.
   - dynamic() import below-the-fold and interactive-only components (carousels, maps, booking modals, chat widgets).
   - Load every third-party script via next/script with lazyOnload or afterInteractive. Remove unused ones.
   - Check next.config and layout for anything causing script tags to be emitted without async/defer, and fix what is controllable. If remaining /_next/static/chunks tags are framework-controlled, document that and show before/after counts.
   - Use next/font (or self-hosted @font-face) with font-display: swap and subsets.

3. Markup weight (text-to-HTML ratio)
   - Remove duplicated mobile/desktop DOM trees, repeated inline SVG (use a sprite with <use>), large inline JSON/style blobs. Target 10%+ on content pages. Keep DOM under ~1,200 elements.

Deliver: changed files, the migration script, before/after image counts and weights, script counts and the ratio per audited page (/, /tours, /vehicle-hire/toyota-landcruiser).
```

---

## Prompt 3: Structured data (one CMS-managed graph)

```
[Paste Shared context]

TASK: Replace scattered JSON-LD with ONE <script type="application/ld+json"> @graph per page, built by a shared buildSchemaGraph(pageType, data) helper with stable @id references, all managed in Payload (a "Site/Organization" global plus a per-page SEO tab with overrides). Remove duplicate Organization nodes (Landcruiser has 3, each missing url) and any RDFa/microdata duplicates.

1. Organization node (@id https://www.jaetravel.co.ke/#organization), referenced from every page. @type ["TravelAgency","LocalBusiness","Organization"]. Include: name, url, logo (ImageObject with url/width/height), image, description, telephone, email, full PostalAddress (street, locality, region, country KE, postal code), geo, openingHoursSpecification, priceRange, areaServed (Kenya, Tanzania, Rwanda, Uganda), sameAs (all four social profiles plus real directories), contactPoint (telephone, contactType, availableLanguage, areaServed), knowsAbout / hasOfferCatalog for wheelchair-accessible safaris. (/tours LocalBusiness fails validation: missing address.) Use real values from the site or ask me.
2. WebSite node (@id #website): name, url, description, inLanguage, publisher → organization @id, potentialAction SearchAction (keep). (WebSite is missing name/url on the Landcruiser page.)
3. WebPage/CollectionPage on every page: name, description, url, inLanguage, datePublished, dateModified, isPartOf, about, primaryImageOfPage, breadcrumb → BreadcrumbList @id, and speakable (SpeakableSpecification, cssSelector for the H1 and the AnswerSummary block). Speakable is missing on / and /tours.
4. Type-specific nodes:
   - Tours: TouristTrip; Product/Offer only with real prices, priceCurrency, availability, priceValidUntil; itinerary as ItemList; provider → organization.
   - Vehicles: Product with brand, model, description, image, offers (real daily rate), specs as additionalProperty.
   - List pages (/tours, /vehicle-hire, destinations): CollectionPage + ItemList (position, url, name).
   - FAQPage wherever FAQs are visible: Question with name, text, acceptedAnswer (Answer.text). Generate from ONE shared function so /tours' 78 repeated recommendations disappear. Add dateCreated only if real. No upvoteCount or invented values.
   - VideoObject only for real videos: name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl (embedUrl missing on Landcruiser).
   - Person (guides/staff, e.g. Antony Waititu, Safari Specialist; KWS-accredited guides): name, jobTitle, url, image, sameAs, worksFor → organization @id. (Missing url/sameAs/jobTitle/image on every page; 5 Person nodes on home.)
   - Blog: BlogPosting with author Person, datePublished, dateModified, image, publisher.
5. The visible FAQ content must match the FAQPage schema exactly. (The Landcruiser has FAQPage schema but no visible FAQ detected.)
6. Add a CI check that parses every page's JSON-LD and fails on: invalid JSON, duplicate @id, missing required properties, missing recommended properties listed above, or schema content that is not on the page.

Deliver: helper, Payload fields/migrations, per-page-type examples, validator output for /, /tours and the Landcruiser, and a list of properties omitted because real data is missing.
```

---

## Prompt 4: Content structure for answer engines, voice and citability

```
[Paste Shared context]

TASK: Build reusable Payload blocks and React components so editors fill fields and the correct markup comes out. Then rewrite the copy for the three audited pages and give a content template per page type. This lifts Answer Targeting (0 on /tours and Landcruiser, 56 home), Voice (28–51), Citability (43–64) and Keyword Density (/tours 63, home 88).

COMPONENTS / BLOCKS
1. <AnswerSummary> directly under the H1: a 40–60 word self-contained answer in the definition pattern ("A wheelchair-accessible safari in Kenya is a guided game-drive holiday that uses hydraulic-lift vehicles and step-free lodges…"). Replaces the current 31–35 character lead lines. It is also the speakable target and the meta description source.
2. <QAHeading> blocks: 6–10 question-form H2/H3 per page, each immediately followed by a 40–60 word answer. Examples:
   - Home: What is a wheelchair-accessible safari? / Do you offer wheelchair-accessible safari vehicles? / How much does an accessible safari in Kenya cost? / When is the best time to visit the Masai Mara?
   - /tours: What safari tours does JaeTravel offer in East Africa? / How long are the tours? / Which tour is best for first-time visitors? / What is included? / How do I book?
   - Vehicle pages: What is a Toyota Land Cruiser safari vehicle? / How much does it cost to hire one in Kenya? / How many people does it seat? / Is a driver included? / What do I need to hire one?
   Answers must be factual and match CMS prices.
3. <HowTo>: an ordered list under a "How to…" heading on each page type ("How to book a wheelchair-accessible safari in 5 steps", "How to hire a safari vehicle in Kenya").
4. <ComparisonTable>: 3+ columns and 3+ rows with <caption>, <thead>, <th scope="col"> and <th scope="row">. Fix the existing tables missing <th> (two on /tours, two on the Landcruiser). Examples: tour comparison (days, destinations, price from, accessibility); vehicle comparison (Land Cruiser vs Prado vs van: seats, roof, transmission, daily rate).
5. <SpecList> using <dl><dt><dd>, for specs, inclusions/exclusions and a glossary (game drive, Great Migration, hydraulic lift, pop-up roof).
6. <FAQ>: 5–8 related questions with concise answers, visible and matching the FAQPage schema.
7. <AuthorLine>: named guide/safari specialist with profile link; accreditation badges only if real. Outbound links to authoritative sources (Kenya Wildlife Service, Uganda Wildlife Authority, Rwanda Development Board, Tanzania National Parks) with descriptive anchors.

COPY RULES
- Voice and reading ease (Flesch is 12–47 now): in answer blocks and intros use sentences of 12–16 words, plain words (about 1.5 syllables per word or fewer), active voice, no stacked adjectives or superlatives. Break detail into short paragraphs of roughly 20–45 words and lists. No one-line orphan paragraphs.
- Keyword density: Home "safari" is 4.8% (76 uses), "accessible" 3.85%, "wheelchair" 3.66%. Bring each single keyword under 3% and each phrase under 2% by rewriting repeated headings, card titles and alt text with natural variants (trip, tour, expedition, game drive, wildlife holiday, adapted vehicle, step-free lodge). /tours: "safari" is 3.72% and the card boilerplate "Arrival / Lodge check-in / Book" repeats on every card ("lodge check-in book" 7 times): move it to one "How every tour works" section and vary card text.
- Primary keywords appear in title, H1 and meta description of every page.

REWRITES NEEDED
- Landcruiser: replace the dense keyword-stuffed intro ("Experience the ultimate East African safari adventure…") with plain factual copy; write the AnswerSummary, 5+ visible FAQs and the vehicle comparison table.
- /tours: AnswerSummary, question headings, tables with headers, de-duplicated card copy.
- Home: AnswerSummary (replace the 31-character lead), reduced keyword repetition.
- Translate the new blocks/FAQs in the existing data files for FR, DE, IT, HI, ZH and AR. Set html lang and dir="rtl" for Arabic.
- Internal links: 6+ contextual links per page to related tours, vehicles, destinations, FAQ and contact, with descriptive anchors.

Deliver: components, Payload block definitions, the rewritten copy for the three audited pages (titles, descriptions, H1, AnswerSummary, FAQs, intro), a template per page type, and a readability/keyword-density check on each rewritten page.
```

---

## Prompt 5: Agent interactivity (WebMCP)

```
[Paste Shared context]

TASK: Raise the WebMCP score (18–19 today) safely.

1. Add @mcp-b/global (or @mcp-b/react-webmcp) as a lazy, client-only module. Register imperative tools with navigator.modelContext.registerTool(), with clear names, descriptions and JSON-schema params, feature-detected so nothing breaks if the API is absent:
   - searchTours (destination, days, accessibility need, budget)
   - getTourDetails (slug)
   - searchFAQ (query)
   - listVehicles / getVehicleRate (vehicle, dates)
   - requestQuote (name, email, dates, group size, accessibility needs)
   - submitQuestion (name, email, question)
2. Add declarative attributes (toolname, tooldescription, toolparamdescription) to the real forms: booking, quote, contact, search. Every input needs a name, correct type (email, tel, date, number), a visible label and autocomplete. Fix the Landcruiser's "form #1: missing input types". Keep form IDs stable.
3. Add a real search form and a short quote/enquiry form on /, /tours and the FAQ page so tools have something to bind to. Point the SearchAction target to the same search endpoint.
4. Safety: write tools (requestQuote, submitQuestion) go through the existing /api/site-inquiries with validation, rate limiting and a spam check (honeypot or Turnstile). No tool takes payment or confirms a booking autonomously. Read-only tools stay open. Document the tool list in the repo.

Deliver: module, form changes, tool documentation, and a manual test showing tools registered on /, /tours and a vehicle page.
```

---

## Prompt 6: Machine-readable files, guardrails and verification

```
[Paste Shared context]

TASK: Ship the discoverability files and the guardrails that stop regressions. Complete this after Prompts 1–5.

1. /robots.txt
   - Disallow /dashboard and /api. Add the Sitemap line.
   - Explicitly allow search/answer bots: OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-Web/ClaudeBot (ask me first before allowing training crawlers such as GPTBot, Google-Extended, Applebot-Extended, CCBot).
2. /sitemap.xml: all public URLs, accurate lastmod, hreflang alternates, no /dashboard or /api.
3. /llms.txt (concise map: wheelchair-accessible safaris, tours, vehicle hire, destinations, contact, one-line descriptions) and /llms-full.txt (expanded content). Generate both from CMS data so they stay current.
4. Confirm no unintended X-Robots-Tag noindex headers on public pages.
5. Payload publish validation: block publishing if alt is missing, title/description are out of range, AnswerSummary is missing, fewer than 6 question headings, FAQ missing, breadcrumb missing, or required schema fields are missing.
6. "seo-guard" automated test (Playwright or a Node crawler reading sitemap.xml against a preview build), run in CI and failing the build on regressions. Assert for every public URL:
   - exactly one H1; no skipped heading levels; heading ids present
   - every <img> has alt; every link has an accessible name; skip link present
   - title 45–60 chars, description 120–155 chars, canonical present
   - hreflang self-reference and reciprocity, one set only
   - JSON-LD parses, no duplicate @id, required/recommended properties present
   - visible <time>, breadcrumbs, FAQ present, speakable present
   - no image over 200 KB; images lazy except the LCP image; AVIF/WebP in use
   - robots.txt, llms.txt, sitemap.xml return 200
7. Final verification report: seo-guard output; before/after table of SAGE category scores for /, /tours and /vehicle-hire/toyota-landcruiser; an honest note for any category that could not reach 90 and why (for example framework-controlled render-blocking chunk tags). Remind me to grant SAGE host permission and re-run it on every public URL.
```
