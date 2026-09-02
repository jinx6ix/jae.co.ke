// app/(marketing)/_components/AccessibilityCards.tsx
//
// Server component used on the homepage to render the four
// "wheelchair accessible safari" feature cards. The original hardcoded
// image paths don't exist on disk in dev and aren't in the Media
// collection, so each card falls back to a similar Media doc that
// actually exists in MongoDB.

import { DynamicImage } from '@/app/(marketing)/_components/DynamicImage'

const CARDS = [
  {
    brokenSrc: '/accessible-vehicle-lift.jpg',
    fallbackFilename: 'wheelchair-accessible-vehicle-ramp.jpg',
    alt: 'German hydraulic lift on wheelchair accessible safari vehicle Kenya 2026',
    title: 'German Hydraulic Lift System',
    body: '400kg capacity lift — enter and exit your wheelchair accessible safari vehicle without leaving your own chair.',
  },
  {
    brokenSrc: '/wheelchair-securement.jpg',
    fallbackFilename: 'wheelchair-restraints-header-mobile.jpg',
    alt: 'Medical-grade wheelchair securement system wheelchair accessible safari Kenya',
    title: 'Four-Point Medical-Grade Securement',
    body: 'ISO-certified restraints keep your wheelchair rock-solid during game drives.',
  },
  {
    brokenSrc: '/accessible-safari-interior.jpg',
    fallbackFilename: 'accessible-safari-vehicle-interior-wheelchair-spac.jpg',
    alt: 'Spacious interior wheelchair accessible safari vehicle Masai Mara Kenya',
    title: 'Panoramic & Spacious Interior',
    body: 'Removable seats and climate control for comfortable wheelchair accessible tours in Kenya.',
  },
  {
    brokenSrc: '/medical-kit-safari.jpg',
    fallbackFilename: 'masai-mara-wheelchair-height.jpg',
    alt: 'Onboard medical facilities wheelchair accessible safari Kenya 2026',
    title: 'Onboard Medical & Safety Kit',
    body: 'Full medical supplies and trained drivers for complete peace of mind.',
  },
] as const

export async function AccessibilityCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {CARDS.map((card) => (
        <div key={card.title} className="rounded-xl bg-card p-8 shadow-sm border">
          <DynamicImage
            src={card.brokenSrc}
            alt={card.alt}
            fallbackSrc={card.fallbackFilename}
            width={400}
            height={300}
            className="w-full rounded-lg mb-6"
          />
          <h3 className="font-semibold text-xl mb-3">{card.title}</h3>
          <p className="text-muted-foreground">{card.body}</p>
        </div>
      ))}
    </div>
  )
}
