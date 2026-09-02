// app/de/layout.tsx — German locale layout
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "JaeTravel Expeditionen | Ostafrika Safari", template: "%s | JaeTravel Expeditionen" },
  description: "Erleben Sie unvergessliche Safaris in Kenia, Tansania, Ruanda und Uganda. Spezialist für Gorilla-Trekking, Große Migration und barrierefreie Touren.",
  alternates: { canonical: `${BASE_URL}/de`, languages: buildHreflangAlternates("/") },
  openGraph: { locale: "de_DE", siteName: "JaeTravel Expeditionen", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "JaeTravel Expeditionen - Ostafrika Safari" }] },
}
export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" dir="ltr"><head>
      <link rel="alternate" hrefLang="en" href={BASE_URL} />
      <link rel="alternate" hrefLang="fr" href={`${BASE_URL}/fr`} />
      <link rel="alternate" hrefLang="de" href={`${BASE_URL}/de`} />
      <link rel="alternate" hrefLang="it" href={`${BASE_URL}/it`} />
      <link rel="alternate" hrefLang="hi" href={`${BASE_URL}/hi`} />
      <link rel="alternate" hrefLang="ar" href={`${BASE_URL}/ar`} />
      <link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} />
      <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
    </head><body>{children}</body></html>
  )
}
