// lib/page-seo.ts
//
// ─────────────────────────────────────────────────────────────────────────────
// Shared metadata helpers for the remaining public page types.
//
// The four pages audited in the original SAGE reports (home, tour detail,
// blog post, vehicle detail) each carried their own hand-written metadata
// block, and each one had the same three defects:
//
//   1. the layout title template appended the brand to a title that already
//      ended with it, producing a 73-82 character title;
//   2. the description was either too short (under 120 characters) or too
//      long (over 155);
//   3. the hreflang set was a literal object with no self-referencing
//      entry on non-home pages.
//
// These helpers fix all three at once so the remaining page types cannot
// drift the same way.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import { buildTitle, buildDescription, buildPageHreflang } from "@/lib/metadata"

export const SITE_BASE = "https://www.jaetravel.co.ke"

/**
 * Build a metadata block with a length-checked title and description and
 * a self-referencing hreflang set.
 *
 * `title` is passed through `buildTitle`, which trims it to the 45-60
 * character window SAGE asks for. `absolute` is used so the layout's
 * title template is not applied on top — otherwise the brand appears
 * twice.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords,
  type = "website",
  availableLocales,
  localePaths,
  publishedTime,
  modifiedTime,
  noindex = false,
  extra = {},
}: {
  title: string
  description: string
  /** Site-relative path, e.g. "/vehicle-hire". */
  path: string
  /** Absolute or site-relative OG image URL. */
  image?: string
  imageAlt?: string
  keywords?: string[] | string
  type?: "website" | "article"
  availableLocales?: string[]
  localePaths?: Record<string, string>
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  extra?: Partial<Metadata>
}): Metadata {
  const url = `${SITE_BASE}${path.startsWith("/") ? path : `/${path}`}`
  const finalTitle = buildTitle(title)
  const finalDescription = buildDescription(description)
  // Prefer the dynamic OG route: the static per-page images this used
  // to reference (/og-vehicle-hire.jpg and friends) do not exist in
  // /public, so every share of those pages rendered a broken preview.
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_BASE}${image}`
    : `${SITE_BASE}/api/og?title=${encodeURIComponent(buildTitle(title))}`

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    keywords,
    alternates: {
      canonical: url,
      languages: buildPageHreflang(path, { availableLocales, localePaths }),
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      type,
      url,
      siteName: "JaeTravel Expeditions",
      locale: "en_KE",
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? finalTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
      creator: "@jaetravel",
      site: "@jaetravel",
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    ...(extra.other ? { other: extra.other } : {}),
    ...extra,
  }
}
