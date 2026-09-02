// app/it/layout.tsx — Italian locale layout
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "JaeTravel Spedizioni | Safari Africa Orientale", template: "%s | JaeTravel Spedizioni" },
  description: "Scopri safari indimenticabili in Kenya, Tanzania, Ruanda e Uganda. Specialisti nel trekking gorilla, Grande Migrazione e tour accessibili.",
  alternates: { canonical: `${BASE_URL}/it`, languages: buildHreflangAlternates("/") },
  openGraph: { locale: "it_IT", siteName: "JaeTravel Spedizioni", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "JaeTravel Spedizioni - Safari Africa Orientale" }] },
}
export default function ItalianLayout({ children }: { children: React.ReactNode }) {
  return <html lang="it" dir="ltr"><head><link rel="alternate" hrefLang="en" href={BASE_URL} /><link rel="alternate" hrefLang="fr" href={`${BASE_URL}/fr`} /><link rel="alternate" hrefLang="de" href={`${BASE_URL}/de`} /><link rel="alternate" hrefLang="it" href={`${BASE_URL}/it`} /><link rel="alternate" hrefLang="hi" href={`${BASE_URL}/hi`} /><link rel="alternate" hrefLang="ar" href={`${BASE_URL}/ar`} /><link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} /><link rel="alternate" hrefLang="x-default" href={BASE_URL} /></head><body>{children}</body></html>
}
