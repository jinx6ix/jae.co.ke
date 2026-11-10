// components/TableOfContents.tsx
// Auto-generated table of contents for pages with 4+ sections

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface TocItem {
  id: string
  text: string
  level: number // 2 for h2, 3 for h3
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  // Don't render if fewer than 4 items
  if (!items || items.length < 4) {
    return null
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      className={`sticky top-24 self-start rounded-lg border bg-card p-4 ${className}`}
      aria-label="Table of contents"
    >
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}
          >
            <Link
              href={`#${item.id}`}
              className={`block transition-colors hover:text-primary ${
                activeId === item.id
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground'
              }`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  const offset = 100 // Account for sticky header
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - offset

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents