// app/fr/layout.tsx — French locale layout
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "JaeTravel Expéditions | Safaris Afrique de l'Est", template: "%s | JaeTravel Expéditions" },
  description: "Découvrez des safaris inoubliables au Kenya, Tanzanie, Rwanda et Ouganda. Spécialistes du trekking gorilles, de la Grande Migration et des voyages accessibles.",
  alternates: {
    canonical: `${BASE_URL}/fr`,
    languages: buildHreflangAlternates("/"),
  },
  openGraph: {
    locale: "fr_FR",
    siteName: "JaeTravel Expéditions",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "JaeTravel Expéditions - Safaris Afrique de l'Est" }],
  },
}

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        {/* French hreflang cluster */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="fr" href={`${BASE_URL}/fr`} />
        <link rel="alternate" hrefLang="de" href={`${BASE_URL}/de`} />
        <link rel="alternate" hrefLang="it" href={`${BASE_URL}/it`} />
        <link rel="alternate" hrefLang="hi" href={`${BASE_URL}/hi`} />
        <link rel="alternate" hrefLang="ar" href={`${BASE_URL}/ar`} />
        <link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
      </head>
      <body>{children}</body>
    </html>
  )
}
