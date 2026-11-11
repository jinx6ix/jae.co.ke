// components/JsonLd.tsx
//
// Server-rendered JSON-LD <script> block.
//
// The `id` prop is optional and is emitted as the script element's
// `id` attribute so a page can reference a specific schema block
// (e.g. a validator looking for the BreadcrumbList by id). It is not
// part of the JSON-LD payload itself.

export default function JsonLd({
  data,
  id,
}: {
  data: object
  id?: string
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }) }}
    />
  )
}

export { JsonLd }
