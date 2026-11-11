// app/(marketing)/_components/BrandShell.tsx
//
// Server-rendered shell for the marketing layout. Emits the canonical
// Organization + WebSite JSON-LD nodes for the whole site.
//
// IMPORTANT
// ---------
// This component deliberately does NOT emit <link rel="alternate">
// hreflang tags. The layout metadata already emits exactly ONE
// hreflang set per page (via `alternates.languages`), and the previous
// version emitted a SECOND static set here that always pointed at the
// homepage — which is why SAGE reported "missing self-referencing
// hreflang" on every non-home page and "two overlapping sets" on the
// homepage.
//
// The Organization/WebSite nodes live in lib/schema.ts so every page's
// own JSON-LD can reference them by @id instead of re-declaring an
// incomplete inline copy (the source of "Organization: missing url"
// and "WebSite: missing name, url").

import { getBrandUrl } from "@/lib/brand-media"
import { buildOrganizationNode, buildWebsiteNode, BASE as SITE_BASE } from "@/lib/schema"

const BASE = "https://www.jaetravel.co.ke"

export async function BrandShell() {
  // Resolve the live logo + OG URLs. Falls back to the public
  // media file route if a Media doc isn't found yet, so this
  // never throws and the page still renders.
  const [logoUrl, ogUrl] = await Promise.all([
    getBrandUrl("logo", SITE_BASE),
    getBrandUrl("ogImage", SITE_BASE),
  ])

  const schema = {
    "@context": "https://schema.org",
    "@graph": [buildOrganizationNode(logoUrl, ogUrl), buildWebsiteNode()],
  }

  return (
    <script
      type="application/ld+json"
      id="org-schema"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default BrandShell
