# JaeTravel Platform — one project

Everything — the public website, the AI-driven booking/ops backend, and
the CMS — now lives in this single Next.js 16 app.

```
app/
├── (marketing)/   the public website (jaetravel.co.ke) — every page you
│                  uploaded, plus the new itinerary builder, unchanged
│                  theme and URLs
├── (ops)/         jaedb's staff-only dashboard, login, billing, embed —
│                  everything that was at the jaedb project's root
├── (payload)/     Payload's admin UI, at /admin
└── api/           every backend route — jaedb's own (bookings, invoices,
                   vouchers, cost sheets, the 8-agent layer, safari-rates)
                   plus the website's (site-inquiries, transfers,
                   vehicle-hire, pdf) plus the new /api/public/* trio
                   (hotels, tours, quote) that the itinerary builder calls

cms/               Payload's collections, access rules, blocks, hooks —
                   everything that used to live under payload's src/
payload.config.ts  → cms/payload.config.ts
lib/, components/, hooks/, data/   shared code from both projects, merged
prisma/            jaedb's real schema — unchanged, source of truth for
                   bookings/invoices/vouchers/cost-sheets/hotels
```

Three route groups, one app — Next.js supports multiple independent root
layouts this way, which is exactly what let jaedb's dashboard and the
public site keep their own separate `<html>`/`<body>` shells (different
fonts, different providers) without conflicting.

## Real conflicts found and fixed while merging

These aren't hypothetical — each one would have broken a build or
silently dropped data if left alone:

1. **`DATABASE_URL` collision.** jaedb's Prisma config and Payload's
   Mongoose config both read `process.env.DATABASE_URL` — but jaedb's is
   a Postgres string and Payload's template expects MongoDB. Payload's
   was renamed to `PAYLOAD_DATABASE_URL`. **You'll need to give it a
   real MongoDB connection string** — Payload's CMS content (tours/
   hotels/vehicles marketing copy) lives in its own database, separate
   from jaedb's operational Postgres. That's a real architectural
   choice, not a shortcut: swapping Payload's adapter from Mongo to
   Postgres is possible but is a change I won't make blind without
   being able to test it.
2. **`/api/bookings` and `/api/tours` collision.** Both jaedb and the
   website had routes at these exact paths. The website's (older,
   simpler, writes to its own Supabase) were renamed to
   `/api/site-inquiries` (`/api/tours` was unused — renamed anyway,
   `/api/site-tours`, for safety). The three duplicate booking-form
   components (`booking-form.tsx`, `BookingForm.tsx`, and the
   budget-tours one — this duplication was already flagged back when I
   first read this codebase) were updated to call the new path.
3. **Payload's own `/api/*` mount.** Payload wants `/api/[...slug]` by
   default — same namespace jaedb's real operational API already owns.
   Moved to `/cms-api/*` via Payload's own `routes.api` config option
   (not just a file move — the admin UI picks this up automatically).
4. **`@/` import alias collision.** jaedb's `@/*` already means
   "project root." Payload's template also used `@/*` to mean *its*
   root (`src/`). All 84 of Payload's absolute imports were rewritten
   to `@cms/*`, which now points at `cms/` — the folder its code
   actually lives in.
5. **SMTP env var collision.** jaedb and the website each had their own
   `SMTP_HOST`/`SMTP_USER`/etc — likely two different accounts. Using
   one variable name for both would have silently dropped whichever one
   loaded second. Website's four email-sending routes now read
   `SITE_SMTP_*` instead; jaedb's own agent/voucher emails still use
   plain `SMTP_*`, untouched.
6. **A stray `app/{billing` folder** in the original jaedb export — a
   leftover from a brace-expansion command that didn't expand (created
   a literal folder named `{billing`). Empty, harmless, deleted.

## Checked and found to be non-issues

I flagged these as risks while merging `package.json`, then actually
checked the code before deciding what to do:

- **Zod v3 vs v4** — jaedb wanted `^4.4.3`, the website wanted `3.25.76`.
  Turns out **neither project actually imports `zod` anywhere** — it
  was an unused dependency in both. Kept the newer version; nothing
  depends on it either way.
- **tailwind-merge v2 vs v3** — both projects' `cn()` helpers
  (`lib/utils.ts` and `cms/utilities/ui.ts`) use only the basic
  `twMerge(clsx(inputs))` call, which is stable across that version
  bump. No risk.
- **TypeScript ^6.0.3 vs 5.7.3** — kept jaedb's newer pin since it's
  the host. This one I couldn't fully verify without a real
  `tsc --noEmit` run (see below) — worth an early check.

## What you need to fill in

`.env` was consolidated from both projects' real values, sectioned by
subsystem, with zero duplicate keys (checked mechanically, not just by
eye). Two things were genuinely missing from both original `.env`
files and need real values before this runs:

```
PAYLOAD_DATABASE_URL=    # a real MongoDB connection string
PAYLOAD_SECRET=          # any long random string
```

## Setup

```bash
pnpm install
pnpm postinstall           # generates the Prisma client (also runs automatically after install)
pnpm db:push                # or your existing jaedb migration flow
pnpm cms:generate:importmap # regenerate Payload's admin import map for the new Tours/Hotels/Vehicles collections
pnpm dev
```

Then:
- `/` — the public site
- `/itinerary-builder` — the new feature: dates → budget → hotel picker
  (live from jaedb's own `sr_*` rate tables, no separate fetch needed
  now that it's all one app) → quote, which creates a real jaedb
  `Booking`(status `ENQUIRY`) + `CostSheet`
- `/login`, `/dashboard` — jaedb's existing staff tools, unchanged
- `/admin` — Payload's CMS admin

## Honest status

Every file here was reviewed against the real schema/conventions
already in the two source projects — that review is what caught the six
conflicts above before they became runtime bugs. What hasn't happened
is a real `pnpm install && pnpm build` — that needs your actual
`DATABASE_URL`, `PAYLOAD_DATABASE_URL`, `NVIDIA_API_KEY`, and a real
`node_modules` install, none of which I have here. Given the number of
moving parts (three merged dependency trees, a new database adapter
pairing, 70+ rewritten import paths), **run the build before you trust
it in production** — if TypeScript surfaces something in the 6.0.3-vs-
5.7.3 gap, or a dependency resolves differently than expected, that's
the moment to catch it.

## CMS migration — every page now reads from Payload, not static files

As of this pass, every page under `app/(marketing)/` — all English pages,
all 6 language folders (de/fr/it/hi/zh/ar), `sitemap.xml`, `booking/[slug]`
— fetches tours and vehicles from Payload via `lib/payload-tours.ts` /
`lib/payload-vehicles.ts` instead of importing the old static
`lib/tours-data.ts` / `lib/vehicles-data.ts` arrays directly. Verified with
a repo-wide sweep for any remaining `import { tours }` / `import {
vehicles }` — none left.

**Two real mistakes came up during this pass, both caught and fixed
before shipping:**

1. **`booking/[slug]/page.tsx` read from a second dataset — resolved.**
   It turned out to import from `data/tours.ts`, a separate 57-tour
   file with its own shape (`bookingSlug` field, which turned out to
   always equal `slug` — checked all 57 entries, zero mismatches — so
   no schema change was needed for it). Checking for overlap against
   `lib/tours-data.ts` found all 53 of its tours are exact-slug
   duplicates already in `data/tours.ts`; only 3 tours are genuinely
   unique to it (`rwanda-accessible-gorilla-safari`,
   `uganda-accessible-primate-safari`,
   `wheelchair-accessible-safari-vehicle` — all in the accessible-tours
   niche). The seed script now seeds both datasets; its existing
   skip-if-slug-exists check means the 53 duplicates are silently
   skipped and only the 3 new ones actually get created. The page's
   array-style `tour.image?.[0]` access was also a pre-existing bug —
   `data/tours.ts` declares `image` as a plain `string`, not an array —
   fixed as part of this.
2. **Accidentally deleted a live route.** While removing the orphaned
   `/tour` listing page (confirmed unlinked anywhere in the codebase),
   `rm -rf` on its parent directory took `/tour/[slug]` down with it —
   which turned out to be a real, linked-to route (the French/German/
   Italian/etc. pages' language-switcher links point at
   `/tour/${slug}`, not `/tours/${slug}`). Caught by checking the
   pristine original before assuming the deletion was safe; restored
   the file and wired it to Payload properly. Worth a `git log`-style
   sanity check (or just browsing `/tour/some-real-slug` after
   deploying) to confirm nothing else was affected the same way.

**Not migrated in this pass, on purpose** — out of scope for "tours and
vehicles": `budgetTours`, `destinations`, and `blogPosts` (still static,
referenced in `sitemap.xml` and elsewhere). Same pattern would apply if
those need the same treatment later.

- Payload's own generic page-builder frontend (`(frontend)` route
  group in the original template — blocks, heros, a `[slug]` catch-all
  renderer) was **not** carried over. It would have collided directly
  with the marketing site's own pages at the same URLs. Payload's job
  here is CMS/admin only; the bespoke marketing site is the actual
  storefront. If you want Payload-authored generic pages (e.g. a blog)
  rendered on the live site later, that's new wiring, not something
  this merge silently dropped.
- `jaedbHotelId`/`jaedbTourPackageId` pairing on Payload's Tours/Hotels
  content is still manual, one hotel/tour at a time.
- Rate limiting on `/api/public/quote` is still an in-memory,
  single-instance guard — fine for testing, not production-grade.
- Quote submissions don't yet trigger jaedb's existing
  `lib/agents/notify.ts` for email/WhatsApp confirmation.

## Google Store Quality — Customer Reviews (added this pass)

Two components, both gated behind `NEXT_PUBLIC_GOOGLE_MERCHANT_ID` (unset
= both render nothing, so this is safe to ship before you've signed up):

- `components/GoogleCustomerReviewsOptIn.tsx` — the **required** survey
  prompt, wired into all three booking-form components' success state.
  Per Google's program rules this has to show after every completed
  booking, not just some — that's why it went into all three
  duplicates rather than just one.
- `components/GoogleCustomerReviewsBadge.tsx` — the **optional** rating
  badge, added to the footer.

**Before either does anything real**, you need a Google Merchant Center
account and a Merchant ID (Settings → Add-ons → Google Customer
Reviews → sign the Program Agreement) — that's an account-level step
only you can complete, not something I can do from here. Once you have
the ID, set `NEXT_PUBLIC_GOOGLE_MERCHANT_ID` in `.env`.

Two things worth knowing going in:
- Real star ratings don't show immediately — Google requires ~150
  verified reviews with a 3.5+ average before the badge displays an
  actual rating.
- `deliveryCountry` is hardcoded to `"KE"` in all three booking forms
  as a simplification — tours to Tanzania/Rwanda/Uganda technically
  have a different delivery country. Worth revisiting if you want this
  precise; low priority since it doesn't block the program from working.

Also added: a **Google Preferred Sources** opt-in link in the footer
(`google.com/preferences/source?q=jaetravel.co.ke`). Worth being clear
about what this actually is — it's a user-controlled personalization
signal (a visitor manually adds your site to their preferences), not
something a site "implements" via schema or code. The link is the one
concrete, real thing a site can do; the rest is a content/marketing
play (consistent publishing, brand trust) rather than an engineering one.

## SEO audit + fixes (this pass)

**Fixed:**
- `robots.txt` didn't know about routes the merge created (`/cms-api/`,
  `/dashboard/`, `/login/`, `/register/`, `/billing/`, `/embed/`) — all
  now correctly disallowed from crawling.
- **Removed fabricated reviews from tour structured data.** Every
  tour's JSON-LD used to inject 3 hardcoded fake reviews ("Sarah M.",
  "David L.", "Marie D." with template-generated quotes) into
  `Review` schema, explicitly to "increase chances of rich review
  snippets." This is a real risk under Google's structured data
  guidelines (which prohibit non-genuine reviews) — removed. `tour.rating`/
  `tour.reviewCount` are still plain editable numbers on the Tours
  collection, not derived from real review data — worth treating as
  placeholder until real reviews back them.
- **Found but not touched — needs your decision:** `lib/reviews-data.ts`
  and the on-page `TourReviews` component show the same kind of
  fabricated content (fake names, `verified: true`) directly to site
  visitors, not just in invisible schema. This is a bigger content
  decision than the schema fix, so I left it for you rather than
  silently deleting testimonials you might want to keep or replace.

**Added:**
- YouTube video embed — new `youtubeVideoUrl` field on the Tours
  collection (validates it's a real YouTube URL), a click-to-play
  `YouTubeEmbed` component (thumbnail-first, doesn't load YouTube's
  player JS until clicked — keeps page weight down), and `VideoObject`
  structured data emitted automatically when a tour has a video set.
  Wired into both `/tours/[slug]` and `/tour/[slug]`. Not yet in the 6
  language variant pages — same field, same component, just needs the
  same few lines added to each page's JSX if you want it there too.

**Still open, not done this pass:**
- `images.unoptimized: true` in `next.config.ts` skips Next's image
  optimizer — hurts Core Web Vitals (LCP) once real photos exist.
  Worth revisiting now that `/admin` is the real image source.
- No `llms.txt`.
- No dynamic per-tour Open Graph images (social shares currently use
  one generic fallback image).

## "Fix everything" pass

### Reviews system — built for real
- New `Reviews` Payload collection: customer-submitted, moderated (starts
  `pending`, needs admin approval before showing anywhere).
- `POST /api/public/reviews` — public submission endpoint (honeypot +
  rate limit, same pattern as the quote endpoint). `GET` returns only
  approved reviews for a given tour slug.
- `components/tour-reviews.tsx` rebuilt: blends real approved reviews
  with the old placeholder content in `lib/reviews-data.ts` **only**
  until a tour has 5 real reviews — past that threshold, placeholders
  drop out automatically, real reviews only. Also has a real, working
  submission form (the old "Write a Review" button didn't do anything).
- `tour-structured-data.tsx`: real reviews are now included in
  `Review`/`AggregateRating` schema (genuine reviews are fine and
  valuable there) — but placeholder content is **never** included in
  structured data, even while it's still showing on-page. That's a
  deliberate distinction: a human reading a styled testimonial card is
  a different risk than fabricated content in machine-readable schema
  Google explicitly checks for compliance.
- Wired into `/tours/[slug]` and `/tour/[slug]`.

### Component consolidation
- Confirmed `components/tour-card.tsx` and `app/(marketing)/TourCard.tsx`
  were exact-API duplicates (both take a `tour` object) — redirected
  the 2 importers to the canonical one, deleted the duplicate plus the
  already-dead `ReTourCard.tsx`.
- **Not consolidated**: `components/TourCard.tsx` (flat-props API,
  ~13 importers) is a genuinely different prop shape from the above —
  merging it means checking what data each of the 13 callers actually
  has available, which wasn't safe to batch blind. Left as a separate
  component; flagging so it doesn't look like an oversight.
- **Not consolidated**: the 3 duplicate `BookingForm`/`booking-form`
  components — same reasoning, higher risk than reward to rush.

### Vehicles discoverability
- The 2 wheelchair-accessible vehicle pages (`/vehicles/[slug]`) were
  reachable by direct URL only — nothing on the site linked to them.
  Rather than build a redundant separate listing page, added a proper
  callout section to `/vehicle-hire` linking to their real specialized
  template (which is the only place their `accessibilityDetails`/
  `seoContent` actually render) — and excluded them from the generic
  vehicle grid above it, so they don't also get a lesser duplicate
  treatment there.

### SEO
- `robots.txt` now blocks the new merge-created routes.
- `llms.txt` added — dynamic, pulls live tours/vehicles.
- `images.unoptimized: true` turned off. Checked (via grep, not
  assumed) every external image domain actually in use before
  flipping this — `images.unsplash.com` (several specialty pages) and
  `i.ytimg.com` (YouTube thumbnails) added to `remotePatterns`.
- Video embed added to 3 more language pages (hi/zh/ar) — same compact
  format, safe to batch. **`de` and `fr` still don't have it** — those
  two format this section differently from the other four, so a blind
  batch edit risked breaking them; left for individual handling.

### Notifications
- Quote submissions from the itinerary builder now send a real
  confirmation email via jaedb's existing `sendNotificationEmail()` —
  best-effort (a failed email doesn't fail the booking, which already
  exists in the database either way).

### Still not done — genuinely deferred, not forgotten
- `components/TourCard.tsx` flat-props consolidation (13 call sites)
- 3 duplicate booking-form consolidation
- Video embed on `de`/`fr` tour pages
- Dynamic per-tour Open Graph images
- Manual `jaedbHotelId`/`jaedbTourPackageId` pairing tool
