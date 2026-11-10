// components/PageDate.tsx
// Displays published and last modified dates with proper schema.org markup

interface PageDateProps {
  publishedAt?: string | Date
  updatedAt?: string | Date
  className?: string
}

export function PageDate({ publishedAt, updatedAt, className = "" }: PageDateProps) {
  // If neither date is provided, don't render anything
  if (!publishedAt && !updatedAt) {
    return null
  }

  const formatDate = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatISO = (date: string | Date) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toISOString().split('T')[0]
  }

  const published = publishedAt ? formatDate(publishedAt) : null
  const updated = updatedAt ? formatDate(updatedAt) : null
  const hasBoth = published && updated && published !== updated

  return (
    <div className={`flex flex-wrap items-center gap-3 text-sm text-muted-foreground ${className}`}>
      {published && (
        <div className="flex items-center gap-1">
          <span className="sr-only">Published:</span>
          <time dateTime={formatISO(publishedAt!)}>
            <span className="font-medium">Published:</span> {published}
          </time>
        </div>
      )}

      {hasBoth && (
        <span aria-hidden="true" className="text-border">|</span>
      )}

      {updated && (
        <div className="flex items-center gap-1">
          <span className="sr-only">Last updated:</span>
          <time dateTime={formatISO(updatedAt!)}>
            <span className="font-medium">Last updated:</span> {updated}
          </time>
        </div>
      )}
    </div>
  )
}

export default PageDate