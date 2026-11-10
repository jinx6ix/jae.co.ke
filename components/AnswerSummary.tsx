// components/AnswerSummary.tsx
// 40-60 word concise direct answer for search engines, LLMs, speakable readers, and users

import React from "react"

interface AnswerSummaryProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export function AnswerSummary({
  children,
  id = "answer-summary",
  className = "",
}: AnswerSummaryProps) {
  return (
    <section
      id={id}
      aria-label="Quick Answer Summary"
      className={`my-6 rounded-xl border border-primary/20 bg-primary/5 p-5 md:p-6 text-base md:text-lg leading-relaxed text-foreground shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
          aria-hidden="true"
        >
          ✓
        </span>
        <div className="answer-summary-text font-normal">{children}</div>
      </div>
    </section>
  )
}

export default AnswerSummary
