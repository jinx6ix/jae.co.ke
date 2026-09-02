// scripts/migrate-pages-to-cms.ts
//
// Run once after the CMS is up and connected to a real database:
//   pnpm cms:migrate-pages
//
// Creates a Payload Pages entry for every hardcoded page found in
// app/(marketing)/*/page.tsx, using the new block types added in
// Phase 1 of the migration plan. Pages that need heavy custom
// components (e.g. /about, /tours) get a minimal but functional CMS
// shell — the editor can then fill in the rest via /admin.
//
// Safe to re-run: skips any slug that already exists rather than
// creating duplicates.

import 'dotenv/config'

import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs/promises'
import path from 'path'

// Pages we'll create in the CMS. For each one we know the slug,
// the title, and a starting block layout. Anything not in this map
// (e.g. language variants, dynamic routes, error pages) is left to
// either a future migration batch or manual /admin work.
interface PageSeed {
  slug: string
  title: string
  description: string
  heroType: 'none' | 'lowImpact' | 'mediumImpact' | 'highImpact'
  blocks: Array<Record<string, any>>
  metaTitle?: string
}

const BASE = 'https://www.jaetravel.co.ke'

function contentBlock(html: string) {
  return {
    blockType: 'content',
    columns: [
      {
        size: 'full',
        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                textFormat: 0,
                children: [
                  {
                    mode: 'normal',
                    text: html,
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  }
}

function faqBlock(items: Array<{ question: string; answer: string }>) {
  return {
    blockType: 'faq',
    title: 'Frequently Asked Questions',
    layout: 'grid',
    showContactCta: true,
    contactCtaText: 'Ask Us Anything',
    contactCtaLink: '/contact',
    injectJsonLd: true,
    faqs: items.map((i) => ({ question: i.question, answer: i.answer })),
  }
}

function tourGridBlock(category: string, title: string, limit = 6) {
  return {
    blockType: 'tourGrid',
    title,
    source: 'static',
    category,
    limit,
    layout: 'grid',
    showFilters: false,
    showViewAll: true,
    viewAllLink: '/tours',
  }
}

function ctaBlock(title: string, subtitle: string, ctaText: string, ctaLink: string) {
  return {
    blockType: 'cta',
    richText: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            textFormat: 0,
            children: [
              {
                mode: 'normal',
                text: `${title} — ${subtitle}`,
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
          },
        ],
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          url: ctaLink,
          label: ctaText,
          appearance: 'default',
        },
      },
    ],
  }
}

function statisticsBlock() {
  return {
    blockType: 'statistics',
    title: 'Why Choose JaeTravel',
    background: 'light',
    columns: 4,
    stats: [
      { value: '17+', label: 'Years of Experience', icon: 'calendar' },
      { value: '50,000+', label: 'Happy Travelers', icon: 'users' },
      { value: '5.0', label: 'TripAdvisor Rating', icon: 'star' },
      { value: '4', label: 'East African Countries', icon: 'globe' },
    ],
  }
}

function testimonialsBlock() {
  return {
    blockType: 'testimonials',
    title: 'What Our Travelers Say',
    source: 'static',
    minRating: 5,
    limit: 6,
    layout: 'grid',
  }
}

// The actual page list. Each entry is a starting point — editors can
// add/remove blocks via /admin after the migration.
const PAGES: PageSeed[] = [
  {
    slug: 'about',
    title: 'About JaeTravel Expeditions',
    description:
      'Award-winning accessible & sustainable safari operator in Kenya, Tanzania, Rwanda & Uganda since 2008.',
    heroType: 'mediumImpact',
    metaTitle: 'About JaeTravel Expeditions | East Africa Safari Experts',
    blocks: [
      contentBlock(
        '<h2>Our Story</h2><p>JaeTravel Expeditions was founded in 2008 with one mission: make the magic of East Africa accessible to every traveler, regardless of ability. What began as a small team in Nairobi has grown into East Africa\'s leading accessible and sustainable safari operator.</p>',
      ),
      statisticsBlock(),
      {
        blockType: 'content',
        columns: [
          {
            size: 'full',
            richText: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    direction: 'ltr',
                    textFormat: 0,
                    children: [
                      {
                        mode: 'normal',
                        text: '<h2>Our Values</h2><p><strong>Accessibility for All</strong> — We believe adventure belongs to everyone. Our wheelchair-adapted vehicles, trained staff, and barrier-free lodges make safaris possible for travelers with disabilities.</p><p><strong>Conservation First</strong> — Carbon-neutral since 2020. We plant 1 tree per guest, fund anti-poaching patrols, and support wildlife corridors.</p><p><strong>Community-Powered</strong> — 100% local guides. 10% of profits fund schools, clinics, and women\'s cooperatives.</p>',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      testimonialsBlock(),
      faqBlock([
        {
          question: 'What makes JaeTravel Expeditions different from other safari companies?',
          answer:
            'Unlike generic operators, we specialize in accessible safaris and sustainable tourism. We own our fleet of wheelchair-adapted vehicles, train all guides in disability support, and partner directly with local communities and conservation projects.',
        },
        {
          question: 'How long has JaeTravel been operating safaris in East Africa?',
          answer:
            'We\'ve been proudly operating since 2008 — over 17 years of crafting unforgettable, safe, and inclusive safari experiences across Kenya, Tanzania, Rwanda, and Uganda.',
        },
        {
          question: 'Which countries do you operate in?',
          answer:
            'We operate in Kenya (Masai Mara, Amboseli, Samburu), Tanzania (Serengeti, Ngorongoro, Zanzibar), Rwanda (gorilla trekking), and Uganda (gorilla habituation, Queen Elizabeth NP).',
        },
        {
          question: 'Can I customize my safari itinerary?',
          answer:
            'Every safari is 100% tailor-made. Tell us your dates, budget, interests, and accessibility needs — we\'ll design a perfect itinerary, whether it\'s a 3-day Masai Mara getaway or a 14-day multi-country adventure.',
        },
      ]),
      ctaBlock('Ready to explore East Africa?', 'Our team is here to help you plan the perfect safari.', 'Start Planning', '/contact'),
    ],
  },
  {
    slug: 'contact',
    title: 'Contact JaeTravel',
    description: 'Get in touch with our safari experts — we respond within 2 hours during business hours.',
    heroType: 'lowImpact',
    metaTitle: 'Contact JaeTravel Expeditions | Safari Experts',
    blocks: [
      contentBlock(
        '<h2>Get in Touch</h2><p>Phone: +254 726 485 228</p><p>Email: info@jaetravel.co.ke</p><p>Office: Nairobi, Kenya</p><p>Hours: Mon-Sun, 8am-6pm EAT</p>',
      ),
      // Form block is omitted from the seed because it requires a Form
      // document to be created in /admin/forms first. Add a Form block
      // manually in /admin once you've created the contact form.
      ctaBlock('Prefer to chat?', 'WhatsApp us for the fastest response.', 'WhatsApp Us', 'https://wa.me/254726485228'),
    ],
  },
  {
    slug: 'tours',
    title: 'East Africa Safari Tours',
    description: 'Browse our full collection of safari tours across Kenya, Tanzania, Rwanda, and Uganda.',
    heroType: 'highImpact',
    metaTitle: 'Safari Tours | Kenya, Tanzania, Rwanda & Uganda',
    blocks: [
      tourGridBlock('all', 'All Safari Tours', 12),
      ctaBlock('Need help choosing?', 'Our safari experts will match you with the perfect tour.', 'Get Recommendations', '/contact'),
    ],
  },
  {
    slug: 'destinations',
    title: 'East Africa Destinations',
    description: 'Explore Kenya, Tanzania, Rwanda, and Uganda — the four jewels of East African safaris.',
    heroType: 'mediumImpact',
    metaTitle: 'East Africa Safari Destinations',
    blocks: [
      {
        blockType: 'destinationGrid',
        title: 'Where would you like to go?',
        countries: ['kenya', 'tanzania', 'rwanda', 'uganda'],
        layout: 'cards',
      },
    ],
  },
  {
    slug: 'amboseli-safaris',
    title: 'Amboseli National Park Safaris',
    description: 'Witness elephant herds with Mount Kilimanjaro as the backdrop in Kenya\'s iconic Amboseli.',
    heroType: 'highImpact',
    metaTitle: 'Amboseli Safaris | Kilimanjaro Views & Elephant Herds',
    blocks: [
      tourGridBlock('amboseli', 'Popular Amboseli Tours', 6),
      faqBlock([
        {
          question: 'When is the best time to visit Amboseli?',
          answer:
            'The best time to visit Amboseli is during the dry season from June to October and January to February, when wildlife congregates around the swamps and Kilimanjaro is most visible.',
        },
        {
          question: 'How many days do I need in Amboseli?',
          answer:
            '2-3 days is the sweet spot for Amboseli. This gives you enough time for multiple game drives, including sunrise views of Kilimanjaro.',
        },
        {
          question: 'What animals can I see in Amboseli?',
          answer:
            'Amboseli is famous for its large elephant herds, but you\'ll also see lions, cheetahs, buffalo, giraffes, zebras, and over 400 bird species.',
        },
      ]),
      ctaBlock('Ready for Amboseli?', 'Book your Kilimanjaro-view safari today.', 'View Tours', '/tours?category=amboseli'),
    ],
  },
  {
    slug: 'serengeti-safaris',
    title: 'Serengeti National Park Safaris',
    description: 'Experience the Great Migration, Big Five, and endless plains of Tanzania\'s Serengeti.',
    heroType: 'highImpact',
    metaTitle: 'Serengeti Safaris | Great Migration & Big Five',
    blocks: [
      tourGridBlock('serengeti', 'Popular Serengeti Tours', 6),
      faqBlock([
        {
          question: 'When is the Great Migration in the Serengeti?',
          answer:
            'The Great Migration is in the Serengeti year-round but moves to different areas. River crossings typically happen July-October, calving season is January-February in the southern Serengeti.',
        },
        {
          question: 'How much does a Serengeti safari cost?',
          answer:
            'Serengeti safaris range from $250/day for budget camping to $1,500+/day for luxury lodges. Most mid-range tours run 5-7 days and cost $3,000-$6,000 per person.',
        },
        {
          question: 'Should I combine the Serengeti with Ngorongoro?',
          answer:
            'Yes — the Serengeti and Ngorongoro Crater are typically combined in a 6-8 day northern Tanzania circuit. This gives you both the migration spectacle and the crater\'s unique ecosystem.',
        },
      ]),
      ctaBlock('Plan your Serengeti adventure', 'Let our Tanzania experts design your perfect safari.', 'Get Started', '/contact'),
    ],
  },
  {
    slug: 'gorilla-trekking-tours',
    title: 'Gorilla Trekking Tours',
    description: 'Trek to see endangered mountain gorillas in Rwanda and Uganda — a once-in-a-lifetime experience.',
    heroType: 'highImpact',
    metaTitle: 'Gorilla Trekking Tours | Rwanda & Uganda',
    blocks: [
      tourGridBlock('gorilla', 'Gorilla Trekking Tours', 6),
      contentBlock(
        '<h2>The Gorilla Trekking Experience</h2><p>Meeting a mountain gorilla in the wild is consistently rated one of the most profound wildlife experiences on Earth. You\'ll spend one hour with a habituated gorilla family, observing them in their natural habitat — feeding, playing, resting, and interacting just meters away.</p><p>Trekking can take anywhere from 30 minutes to 6 hours depending on where the gorillas are. You need to be reasonably fit, but the reward is immeasurable.</p>',
      ),
      faqBlock([
        {
          question: 'How much does a gorilla permit cost?',
          answer:
            'In Rwanda, permits are $1,500 per person. In Uganda, permits are $800 per person. Both include one hour with the gorillas and park entry.',
        },
        {
          question: 'Is gorilla trekking ethical?',
          answer:
            'Yes — only 12 visitors per day are allowed per gorilla family, visits are limited to one hour, and permit fees directly fund anti-poaching and conservation efforts.',
        },
        {
          question: 'What is the best time to go gorilla trekking?',
          answer:
            'Gorilla trekking is available year-round. The dry seasons (June-September, December-February) are most popular because trails are easier to walk. The wet seasons offer lower prices and lusher scenery.',
        },
        {
          question: 'How fit do I need to be for gorilla trekking?',
          answer:
            'Moderate fitness is required. The terrain is steep and muddy, and treks can last 2-6 hours. Porters are available ($15-20) to help carry your bag and provide a steady hand on slippery sections.',
        },
      ]),
      ctaBlock('Ready to meet the gorillas?', 'Permits sell out months in advance — book early.', 'Book Now', '/contact'),
    ],
  },
  {
    slug: 'maasai-mara-great-migration',
    title: 'Maasai Mara Great Migration Safaris',
    description: 'Witness one of nature\'s greatest spectacles — the annual wildebeest migration in Kenya\'s Maasai Mara.',
    heroType: 'highImpact',
    metaTitle: 'Maasai Mara Great Migration Safaris 2026',
    blocks: [
      tourGridBlock('maasai-mara', 'Maasai Mara Migration Tours', 6),
      contentBlock(
        '<h2>The Great Migration</h2><p>Every year, around 1.5 million wildebeest, 200,000 zebra, and 350,000 gazelle migrate in a clockwise loop through the Serengeti and Maasai Mara ecosystems. The most dramatic moments are the Mara River crossings, usually between July and October, when thousands of animals brave crocodile-infested waters.</p>',
      ),
      faqBlock([
        {
          question: 'When is the best time to see the migration in the Mara?',
          answer:
            'July through October is migration season in the Mara. The river crossings are most dramatic in August and September, but the herds are present for the full four months.',
        },
        {
          question: 'Where do I stay to see the migration?',
          answer:
            'Lodges along the Mara River (like Governor\'s Camp, Mara Serena) put you closest to the crossings. We work with a range of options from $300/night to $2,000+/night.',
        },
        {
          question: 'Can I combine the Mara with other parks?',
          answer:
            'Absolutely. The classic 7-day Kenya safari combines the Mara with Amboseli, Lake Nakuru, and often Samburu. We also offer Mara + Serengeti combinations crossing into Tanzania.',
        },
      ]),
      ctaBlock('Don\'t miss the 2026 migration', 'Mara camps fill up 6-12 months in advance.', 'Reserve Your Spot', '/contact'),
    ],
  },
  {
    slug: 'services',
    title: 'Our Safari Services',
    description: 'From luxury safaris to accessible tours, vehicle hire to itinerary planning — everything you need.',
    heroType: 'lowImpact',
    metaTitle: 'Safari Services | JaeTravel',
    blocks: [
      contentBlock(
        '<h2>What We Offer</h2><p><strong>Safari Tours</strong> — Group, private, and custom safaris across East Africa.</p><p><strong>Vehicle Hire</strong> — 4x4 Land Cruisers, Prado, and accessible vehicles with driver-guide.</p><p><strong>Accessible Safaris</strong> — Wheelchair-adapted vehicles and barrier-free lodges.</p><p><strong>Itinerary Planning</strong> — Custom trip design for any duration or budget.</p><p><strong>Group & Corporate</strong> — Special rates for 6+ travelers and corporate retreats.</p>',
      ),
      ctaBlock('Ready to start planning?', 'Tell us what you\'re looking for.', 'Get a Quote', '/contact'),
    ],
  },
  {
    slug: 'other-services',
    title: 'Other Services',
    description: 'Airport transfers, hotel bookings, and additional travel services across East Africa.',
    heroType: 'lowImpact',
    metaTitle: 'Other Travel Services | JaeTravel',
    blocks: [
      contentBlock(
        '<h2>Beyond Safaris</h2><p>We also arrange airport transfers, hotel reservations, and domestic flights. Whether you need a Jomo Kenyatta airport pickup, a Zanzibar beach extension, or a Nairobi city tour, we\'ve got you covered.</p>',
      ),
      ctaBlock('Need help with logistics?', 'We handle all the details.', 'Contact Us', '/contact'),
    ],
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    description: 'Booking terms, cancellation policy, and travel conditions for JaeTravel safaris.',
    heroType: 'none',
    metaTitle: 'Terms & Conditions | JaeTravel',
    blocks: [
      contentBlock(
        '<h2>Booking Terms</h2><p>A 30% deposit is required to confirm a booking. The balance is due 60 days before departure. Cancellations more than 90 days out are refundable minus a 10% admin fee. Within 90 days, deposits become non-refundable.</p><h2>Travel Insurance</h2><p>All travelers must have comprehensive travel insurance including medical evacuation. We can recommend policies from World Nomads, IMG, and SafetyWing.</p><h2>Liability</h2><p>JaeTravel Expeditions acts as an agent for transportation companies, hotels, and other suppliers. We are not liable for events beyond our control including weather, government actions, or supplier failures.</p>',
      ),
    ],
  },
  {
    slug: 'blog-2',
    title: 'Blog',
    description: 'Safari stories, travel tips, and East Africa travel guides from the JaeTravel team.',
    heroType: 'lowImpact',
    metaTitle: 'JaeTravel Blog | Safari Stories & Travel Tips',
    blocks: [
      {
        blockType: 'blogArchive',
        title: 'Latest Articles',
        source: 'static',
        limit: 9,
        showViewAll: false,
      },
    ],
  },
  {
    slug: 'disabilities',
    title: 'Accessible Safaris',
    description: 'Wheelchair-accessible safaris and tours for travelers with disabilities.',
    heroType: 'highImpact',
    metaTitle: 'Accessible Safaris & Disability Tours | JaeTravel',
    blocks: [
      tourGridBlock('accessible', 'Accessible Safari Tours', 6),
      contentBlock(
        '<h2>Why Travel With Us?</h2><p>JaeTravel pioneered wheelchair-accessible safaris in East Africa. Our vehicles feature German hydraulic lifts (400kg capacity), our lodges are barrier-free, and every guide is trained in mobility assistance. We\'ve helped over 1,200 travelers with disabilities experience Africa since 2015.</p>',
      ),
      faqBlock([
        {
          question: 'Are your safari vehicles wheelchair-accessible?',
          answer:
            'Yes — our Land Cruisers feature German-made hydraulic lifts (400kg capacity) that let you stay in your wheelchair throughout the game drive. No transfers, no lifting.',
        },
        {
          question: 'Which lodges are accessible?',
          answer:
            'We work with a network of vetted accessible lodges across Kenya, Tanzania, and Rwanda. All have roll-in showers, ramps, and trained staff. We can share the accessibility audit for any lodge before you book.',
        },
      ]),
      ctaBlock('Plan your accessible safari', 'Tell us about your needs — we\'ll handle the rest.', 'Get in Touch', '/contact'),
    ],
  },
]

async function migratePages() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0

  for (const page of PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    await payload.create({
      collection: 'pages',
      data: {
        title: page.title,
        slug: page.slug,
        hero: {
          // The hero config marks `media` as required when type is
          // highImpact or mediumImpact. For seed pages we don't have a
          // real image yet, so downgrade to lowImpact — it just shows
          // a simple text hero with no background. Editors can switch
          // back to mediumImpact/highImpact in /admin once they upload
          // a hero image.
          type: page.heroType === 'none' ? 'none' : 'lowImpact',
          richText: undefined,
        },
        layout: page.blocks,
        meta: {
          title: page.metaTitle || page.title,
          description: page.description,
        },
        _status: 'published',
      },
      // Disable Next.js revalidation hooks since we're running in a
      // standalone script (not inside a Next.js server context).
      // The revalidatePath() call in the afterChange hook would fail
      // with "static generation store missing" otherwise.
      context: { disableRevalidate: true },
    })
    created++
  }

  console.log(`\nMigration complete:`)
  console.log(`  ${created} pages created`)
  console.log(`  ${skipped} skipped (already existed)`)
  console.log(`\nNext steps:`)
  console.log(`  1. Visit /admin/collections/pages to review and refine`)
  console.log(`  2. Add hero images and content for each page`)
  console.log(`  3. Update links and SEO as needed`)
  console.log(`  4. As pages are polished, remove them from RESERVED_SLUGS in app/(marketing)/[...path]/page.tsx`)
  console.log(`  5. Eventually delete the hardcoded page.tsx files`)
}

migratePages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
