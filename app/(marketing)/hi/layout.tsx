// app/hi/layout.tsx — Hindi locale layout
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "जेट्रेवल एक्सपीडिशन | पूर्वी अफ्रीका सफारी", template: "%s | जेट्रेवल एक्सपीडिशन" },
  description: "केन्या, तंजानिया, रवांडा और युगांडा में अविस्मरणीय सफारी की खोज करें। गोरिल्ला ट्रेकिंग, महान प्रवास और सुलभ पर्यटन के विशेषज्ञ।",
  alternates: { canonical: `${BASE_URL}/hi`, languages: buildHreflangAlternates("/") },
  openGraph: { locale: "hi_IN", siteName: "जेट्रेवल एक्सपीडिशन", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "जेट्रेवल एक्सपीडिशन - पूर्वी अफ्रीका सफारी" }] },
}
export default function HindiLayout({ children }: { children: React.ReactNode }) {
  return <html lang="hi" dir="ltr"><head><link rel="alternate" hrefLang="en" href={BASE_URL} /><link rel="alternate" hrefLang="fr" href={`${BASE_URL}/fr`} /><link rel="alternate" hrefLang="de" href={`${BASE_URL}/de`} /><link rel="alternate" hrefLang="it" href={`${BASE_URL}/it`} /><link rel="alternate" hrefLang="hi" href={`${BASE_URL}/hi`} /><link rel="alternate" hrefLang="ar" href={`${BASE_URL}/ar`} /><link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} /><link rel="alternate" hrefLang="x-default" href={BASE_URL} /></head><body>{children}</body></html>
}
