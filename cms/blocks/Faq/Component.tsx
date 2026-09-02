import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@cms/payload-types'

export const FaqBlock: React.FC<FaqBlockProps & { disableInnerContainer?: boolean }> = ({
  heading,
  intro,
  items,
  disableInnerContainer,
}) => {
  if (!items || items.length === 0) return null

  return (
    <section className={disableInnerContainer ? 'my-16' : 'container my-16'}>
      {heading && (
        <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
      )}
      {intro && <p className="mb-10 max-w-3xl text-muted-foreground">{intro}</p>}

      <div className="grid gap-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border bg-card p-5 open:bg-accent/5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="shrink-0 text-xl text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            {item.answer && (
              <p className="mt-3 text-muted-foreground whitespace-pre-line">{item.answer}</p>
            )}
          </details>
        ))}
      </div>
    </section>
  )
}
