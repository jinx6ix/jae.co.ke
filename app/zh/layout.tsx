// app/zh/layout.tsx — Chinese Simplified locale layout
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "捷旅探险 | 东非野生动物园旅游", template: "%s | 捷旅探险" },
  description: "探索肯尼亚、坦桑尼亚、卢旺达和乌干达令人难忘的野生动物园。大猩猩徒步、大迁徙和无障碍旅游专家。",
  alternates: { canonical: `${BASE_URL}/zh`, languages: buildHreflangAlternates("/") },
  openGraph: { locale: "zh_CN", siteName: "捷旅探险", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "捷旅探险 - 东非野生动物园" }] },
}
export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-Hans" dir="ltr"><head><link rel="alternate" hrefLang="en" href={BASE_URL} /><link rel="alternate" hrefLang="fr" href={`${BASE_URL}/fr`} /><link rel="alternate" hrefLang="de" href={`${BASE_URL}/de`} /><link rel="alternate" hrefLang="it" href={`${BASE_URL}/it`} /><link rel="alternate" hrefLang="hi" href={`${BASE_URL}/hi`} /><link rel="alternate" hrefLang="ar" href={`${BASE_URL}/ar`} /><link rel="alternate" hrefLang="zh" href={`${BASE_URL}/zh`} /><link rel="alternate" hrefLang="x-default" href={BASE_URL} /></head><body>{children}</body></html>
}
