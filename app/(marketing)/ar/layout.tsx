// app/ar/layout.tsx — Arabic locale layout (RTL)
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "جيه تريفل للرحلات | سفاري شرق أفريقيا", template: "%s | جيه تريفل للرحلات الاستكشافية" },
  description: "اكتشف سفاري لا تُنسى في كينيا وتنزانيا ورواندا وأوغندا. متخصصون في تتبع الغوريلا والهجرة الكبرى والرحلات الميسرة.",
  alternates: { canonical: `${BASE_URL}/ar`, languages: buildHreflangAlternates("/") },
  openGraph: { locale: "ar_AE", siteName: "جيه تريفل للرحلات الاستكشافية", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "جيه تريفل - سفاري شرق أفريقيا" }] },
}
export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><head><link rel="alternate" hrefLang="en" href={BASE_URL} /><link rel="alternate" hrefLang="fr" href={`${BASE_URL}/fr`} /><link rel="alternate" hrefLang="de" href={`${BASE_URL}/de`} /><link rel="alternate" hrefLang="it" href={`${BASE_URL}/it`} /><link rel="alternate" hrefLang="hi" href={`${BASE_URL}/hi`} /><link rel="alternate" hrefLang="ar" href={`${BASE_URL}/ar`} /><link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} /><link rel="alternate" hrefLang="x-default" href={BASE_URL} /></head><body className="font-sans" style={{direction:"rtl"}}>{children}</body></html>
}
