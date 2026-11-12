// components/Breadcrumbs.tsx
// Universal breadcrumb component with proper accessibility and JSON-LD schema

import Link from "next/link"

export interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  /**
   * "overlay" renders the links in white, for use on top of a dark
   * hero image.
   */
  variant?: "default" | "overlay"
  /**
   * Emit the BreadcrumbList JSON-LD. Set to false when the page already
   * publishes a BreadcrumbList in its own schema graph — two nodes with
   * the same content is a duplicate that validators flag.
   */
  schema?: boolean
}

export function Breadcrumbs({
  items,
  className = "",
  variant = "default",
  schema = true,
}: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null
  }

  const linkClass =
    variant === "overlay"
      ? "text-white/90 hover:text-white transition-colors"
      : "text-muted-foreground hover:text-primary transition-colors"
  const currentClass =
    variant === "overlay"
      ? "text-white font-medium"
      : "text-foreground font-medium"
  const separatorClass =
    variant === "overlay" ? "mx-2 text-white/60" : "mx-2 text-muted-foreground"

  // Build JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`mb-4 text-sm ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li className="flex items-center">
            <Link href="/" className={linkClass}>
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center">
              <span className={separatorClass} aria-hidden="true">/</span>
              {index === items.length - 1 ? (
                <span className={currentClass} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className={linkClass}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs