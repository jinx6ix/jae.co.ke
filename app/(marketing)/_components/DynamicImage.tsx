// app/(marketing)/_components/DynamicImage.tsx
//
// Server component that resolves a hardcoded `/foo.jpg` path (or an
// absolute URL) against the Payload Media collection and renders a
// `next/image` with the resolved URL.
//
// Why this exists:
//   * Static page files reference paths like `/accessible-vehicle-lift.jpg`
//     that don't exist on disk in the dev environment. The file may or
//     may not exist as a Media doc — but a similar image usually does.
//   * The `fallbackSrc` prop lets the caller say "if the exact filename
//     isn't in the DB, use this similar file instead" — used for the
//     four hardcoded images on the homepage that were never uploaded.
//   * When every lookup fails, we render a labelled placeholder div
//     instead of a broken <img> icon so the layout doesn't collapse.

import Image from 'next/image'
import { resolveMarketingImage } from '@/lib/marketing-media'

type Props = {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  /** When `src` doesn't match a Media doc, look up this filename instead. */
  fallbackSrc?: string
  /** Override the broken image fallback with a specific URL or path. */
  ultimateFallback?: string
}

export async function DynamicImage({
  src,
  alt,
  fallbackSrc,
  ultimateFallback,
  width,
  height,
  className,
  ...imgProps
}: Props) {
  const resolved = await resolveMarketingImage(src, fallbackSrc)

  // If we got a working URL, render it.
  if (resolved && (resolved.startsWith('http') || resolved.startsWith('/'))) {
    return <Image src={resolved} alt={alt} width={width} height={height} className={className} {...imgProps} />
  }

  // If the caller supplied a hardcoded ultimate fallback, use it.
  if (ultimateFallback && (ultimateFallback.startsWith('http') || ultimateFallback.startsWith('/'))) {
    return <Image src={ultimateFallback} alt={alt} width={width} height={height} className={className} {...imgProps} />
  }

  // Render a labelled placeholder so the layout is preserved and a human
  // editor can see "image missing" in the dev/staging view.
  const style: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '12rem',
    background: 'repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 8px, #e2e8f0 8px, #e2e8f0 16px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
  }
  return (
    <div role="img" aria-label={alt} style={style} className={className}>
      Image not in Media collection
    </div>
  )
}
