// lib/render-post-content.tsx
//
// Lightweight inline link parser for blog post content. Handles:
//
//   [anchor text](https://example.com)
//   [anchor text](/tours/some-slug)
//   bare https://example.com or /tours/some-slug
//
// Used by the static-fallback path in app/(marketing)/blog/[slug]/page.tsx
// when a post's content is a plain `\n\n`-separated string (e.g. entries
// in lib/blog-data.ts or content ingested from data/query_based_posts*.json
// before the CMS-author path takes over). CMS-authored posts that go
// through the Lexical pipeline render via their own lexical-to-React layer
// elsewhere; this is only for the static / fallback render path.
//
// Intentionally minimal — no headings, no lists, no images, no emphasis.
// Paragraph-level markdown features are NOT supported.

import type { ReactNode } from "react"
import Link from "next/link"

type Token =
  | { kind: "text"; value: string }
  | { kind: "link"; label: string; href: string }

const MARKDOWN_LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g
const BARE_URL_RE = /((?:https?:\/\/|www\.)[^\s<]+|\/[a-z0-9][a-z0-9/_\-.]*)/gi

function tokenize(input: string): Token[] {
  const out: Token[] = []
  let cursor = 0

  // First pass: extract [label](url) pairs
  MARKDOWN_LINK_RE.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = MARKDOWN_LINK_RE.exec(input)) !== null) {
    const [whole, label, href] = match
    if (match.index > cursor) {
      out.push({ kind: "text", value: input.slice(cursor, match.index) })
    }
    out.push({ kind: "link", label, href })
    cursor = match.index + whole.length
  }
  if (cursor < input.length) {
    out.push({ kind: "text", value: input.slice(cursor) })
  }

  // Second pass: inside each text token, extract bare URLs
  const withBareLinks: Token[] = []
  for (const tok of out) {
    if (tok.kind !== "text") {
      withBareLinks.push(tok)
      continue
    }
    let i = 0
    BARE_URL_RE.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = BARE_URL_RE.exec(tok.value)) !== null) {
      if (m.index > i) {
        withBareLinks.push({ kind: "text", value: tok.value.slice(i, m.index) })
      }
      const url = m[0]
      const href = url.startsWith("www.") ? `https://${url}` : url
      withBareLinks.push({ kind: "link", label: url, href })
      i = m.index + url.length
    }
    if (i < tok.value.length) {
      withBareLinks.push({ kind: "text", value: tok.value.slice(i) })
    }
  }

  return withBareLinks
}

function isInternal(href: string): boolean {
  return href.startsWith("/")
}

function renderTokens(tokens: Token[]): ReactNode {
  return tokens.map((tok, idx) => {
    if (tok.kind === "text") return <span key={idx}>{tok.value}</span>
    if (isInternal(tok.href)) {
      return (
        <Link
          key={idx}
          href={tok.href}
          className="text-primary underline-offset-4 hover:underline"
        >
          {tok.label}
        </Link>
      )
    }
    return (
      <a
        key={idx}
        href={tok.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline-offset-4 hover:underline"
      >
        {tok.label}
      </a>
    )
  })
}

/**
 * Render a plain-string blog post body. Splits on blank lines into
 * paragraphs; each paragraph runs through the inline link parser.
 * Returns a React fragment ready to be dropped into a `<div>`.
 */
export function renderPostContent(content: string): ReactNode {
  const paragraphs = content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i}>{renderTokens(tokenize(para))}</p>
      ))}
    </>
  )
}
