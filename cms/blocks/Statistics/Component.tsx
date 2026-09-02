import React from 'react'

import type { StatisticsBlock as StatisticsBlockProps } from '@cms/payload-types'

export const StatisticsBlock: React.FC<
  StatisticsBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, items, disableInnerContainer }) => {
  if (!items || items.length === 0) return null

  return (
    <section className={disableInnerContainer ? 'my-16 bg-accent/5 py-12' : 'container my-16'}>
      {heading && (
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
      )}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((item, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-bold text-primary md:text-5xl">{item.value}</div>
            <div className="mt-2 text-sm text-muted-foreground md:text-base">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
