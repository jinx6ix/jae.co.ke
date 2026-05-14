// Blog Post Template for JaeTravel Expeditions
// Copy this file to create new blog posts in app/blog/

export interface BlogPostTemplate {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

// ——————————————————————————————————————————————————
// TEMPLATE USAGE INSTRUCTIONS
// ——————————————————————————————————————————————————
// 1. Copy this file and rename with your post slug
// 2. Update all fields with your content
// 3. Add the post to lib/blog-data.ts
// 4. Create the dynamic route: app/blog/[slug]/page.tsx
// ——————————————————————————————————————————————————

export const blogPostTemplate: BlogPostTemplate = {
  id: "XX", // Next sequential number
  slug: "your-post-slug-here", // URL-friendly: use-dashes-not-spaces
  title: "Your Compelling Title with Primary Keyword [2026]", // Include target keyword + year
  excerpt: "A compelling 2-3 sentence summary that includes your primary keyword and encourages users to read more. Make it benefit-driven.",
  content: `
Write your blog post content here. Structure it with clear sections using H2 and H3 tags.

## Introduction

Start with a hook that captures attention. Include your primary keyword in the first 100 words.

Example: "Planning a safari in Kenya in 2026? This comprehensive guide covers everything from the best times to visit, to costs, and insider tips from experts who've spent years in the bush."

## Section 1: Target Secondary Keyword

Use H2 for main sections. Include related keywords naturally throughout.

### Subsection with H3

Break down complex topics into smaller subsections for better readability and keyword distribution.

## Section 2: Another Target Keyword

Continue providing valuable information. Use bullet points for lists:

- Benefit 1 with keyword
- Benefit 2 with keyword
- Benefit 3 with keyword

## Section 3: Address Common Questions

Use this section to naturally include FAQ-style content that will help with featured snippets.

## Conclusion

Summarize key takeaways and include a clear CTA. Link to your tour packages or relevant resources.

Example: "Ready to experience [topic]? JaeTravel Expeditions offers custom safari packages..."

Tips for writing:
- Target 1,500-2,500 words per post
- Include images with descriptive alt text
- Add internal links to 3-5 related pages
- Use tables for comparisons (great for SEO)
- Include real examples and specific details
`,
  author: "Author Name", // Update with actual author
  publishedAt: "2026-MM-DD", // Today's date
  category: "Category", // Travel Tips, Wildlife, Destinations, etc.
  image: "/your-image.jpg", // Use existing images or add new ones
  metaTitle: "Primary Keyword | Secondary | JaeTravel Expeditions 2026", // 50-60 chars
  metaDescription: "Compelling description with primary keyword. Include year. 150-160 characters that makes users want to click.", // 150-160 chars
  keywords: [
    "primary keyword",
    "secondary keyword",
    "long-tail keyword 1",
    "long-tail keyword 2",
    "related keyword",
    "brand mention keyword",
  ],
};

// ——————————————————————————————————————————————————
// QUICK TEMPLATE - FILL IN THE BLANKS
// ——————————————————————————————————————————————————

export const quickTemplate = {
  // Step 1: SLUG (URL)
  slug: "your-slug-here",

  // Step 2: TITLE (Include target keyword + year)
  title: "Target Keyword: The Ultimate Guide [2026]",

  // Step 3: EXCERPT (150-200 chars, includes keyword)
  excerpt: "Brief summary explaining what readers will learn and why they need this guide. Include primary keyword.",

  // Step 4: PRIMARY KEYWORD
  primaryKeyword: "target keyword",

  // Step 5: SECONDARY KEYWORDS (3-5)
  secondaryKeywords: [
    "related keyword 1",
    "related keyword 2",
    "long-tail variation",
    "question format keyword",
  ],

  // Step 6: CONTENT OUTLINE
  outline: [
    "Introduction - Hook + keyword in first 100 words",
    "Section 1 - About [primary keyword]",
    "Section 2 - Benefits/Features of [keyword]",
    "Section 3 - How to [action verb] [keyword]",
    "Section 4 - Tips/Best practices",
    "Section 5 - FAQs (5-8 questions)",
    "Conclusion + CTA",
  ],

  // Step 7: CTA (Call to Action)
  cta: "Ready to experience [topic]? [View our tours](/tours) or [contact us](/contact) for a custom itinerary.",
};

// ——————————————————————————————————————————————————
// BLOG POST CATEGORIES
// ——————————————————————————————————————————————————

export const categories = [
  "Travel Tips",
  "Wildlife",
  "Destinations",
  "Accessibility",
  "Luxury Travel",
  "Budget Travel",
  "Family Travel",
  "Photography",
  "Conservation",
  "Safari Guides",
  "Adventure",
  "Cultural",
];

// ——————————————————————————————————————————————————
// CONTENT IDEAS - FILL THESE IN (Priority Order)
// ——————————————————————————————————————————————————

export const contentIdeas2026 = [
  // HIGH PRIORITY - Quick wins
  {
    title: "Kenya Safari Cost 2026: Complete Budget Guide",
    keywords: ["kenya safari cost 2026", "safari price kenya", "how much does kenya safari cost"],
    category: "Budget Travel",
    priority: 1,
    outline: [
      "Average costs breakdown by category",
      "Budget vs mid-range vs luxury comparison",
      "Hidden costs to budget for",
      "Money-saving tips",
      "Sample itineraries by budget",
    ]
  },
  {
    title: "Best Time to Visit Kenya Safari 2026-2027",
    keywords: ["best time kenya safari", "kenya weather safari", "when to visit masai mara"],
    category: "Destinations",
    priority: 2,
    outline: [
      "Monthly weather breakdown",
      "Wildlife seasons (migration, calving, etc.)",
      "Crowd levels by month",
      "Price variations by season",
      "Best time for specific activities",
    ]
  },
  {
    title: "Wheelchair Accessible Safari: A Complete Guide 2026",
    keywords: ["wheelchair safari kenya", "accessible safari africa", "disability travel africa"],
    category: "Accessibility",
    priority: 3,
    outline: [
      "What makes a safari accessible",
      "Our adapted vehicles explained",
      "Accessible accommodations",
      "Planning tips for wheelchair users",
      "Real guest experiences",
    ]
  },

  // MEDIUM PRIORITY
  {
    title: "Masai Mara vs Serengeti: The Real Differences",
    keywords: ["masai mara vs serengeti", "kenya or tanzania safari", "best safari destination"],
    category: "Destinations",
    priority: 4,
  },
  {
    title: "7-Day Kenya Safari Itinerary: Ultimate 2026 Guide",
    keywords: ["7 day kenya safari", "kenya safari itinerary", "kenya circuit tour"],
    category: "Safari Guides",
    priority: 5,
  },
  {
    title: "First Time Safari: Everything You Need to Know",
    keywords: ["first time safari", "safari tips beginners", "what to expect safari"],
    category: "Travel Tips",
    priority: 6,
  },

  // CONTENT CLUSTERS - Expand these topics
  {
    title: "Complete Packing List for African Safari",
    keywords: ["safari packing list", "what pack kenya safari", "safari essentials"],
    category: "Travel Tips",
    priority: 7,
  },
  {
    title: "Safari Safety: Essential Tips for Africa",
    keywords: ["safari safety", "kenya safari safety", "africa travel safety"],
    category: "Travel Tips",
    priority: 8,
  },
  {
    title: "Photography Tips for Wildlife Safari",
    keywords: ["safari photography tips", "wildlife photography kenya", "camera settings safari"],
    category: "Photography",
    priority: 9,
  },
  {
    title: "Gorilla Trekking Rwanda vs Uganda: Complete Guide",
    keywords: ["gorilla trekking rwanda uganda", "best place gorilla trekking", "gorilla permit cost"],
    category: "Wildlife",
    priority: 10,
  },
  {
    title: "Kenya vs Tanzania Safari: Which Should You Choose?",
    keywords: ["kenya vs tanzania safari", "safari comparison", "best safari country"],
    category: "Destinations",
    priority: 11,
  },
  {
    title: "Big Five Safari: Where to See Each Animal",
    keywords: ["big five safari", "where see big five", "africa wildlife viewing"],
    category: "Wildlife",
    priority: 12,
  },
];