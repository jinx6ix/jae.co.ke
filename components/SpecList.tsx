// components/SpecList.tsx
// Semantic definition list for vehicle specs, tour inclusions, and glossaries

import React from "react"

export interface SpecItem {
  term: string
  detail: string | React.ReactNode
}

interface SpecListProps {
  title?: string
  items: SpecItem[]
  className?: string
}

export function SpecList({ title, items, className = "" }: SpecListProps) {
  return (
    <div className={`my-6 rounded-xl border border-border bg-card p-6 shadow-sm ${className}`}>
      {title && <h3 className="mb-4 text-xl font-bold text-foreground">{title}</h3>}
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="border-b border-border/50 pb-3 last:border-none">
            <dt className="text-sm font-medium text-muted-foreground">{item.term}</dt>
            <dd className="mt-1 text-base font-semibold text-foreground">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default SpecList
