// lib/i18n/config.ts — MASTER MULTILINGUAL CONFIG — JaeTravel Expeditions
export const BASE_URL = "https://www.jaetravel.co.ke"
export type Locale = "en" | "fr" | "de" | "it" | "hi" | "ar" | "zh"
export const locales: Locale[] = ["en", "fr", "de", "it", "hi", "ar", "zh"]
export const defaultLocale: Locale = "en"

export interface LocaleConfig {
  code: Locale; hreflang: string; name: string; nativeName: string
  urlPrefix: string; googleLocale: string; dir: "ltr" | "rtl"
  countries: string[]; flag: string
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  en: { code:"en", hreflang:"en", name:"English", nativeName:"English", urlPrefix:"", googleLocale:"en_US", dir:"ltr", countries:["US","GB","AU","CA","ZA","KE","NZ","IE"], flag:"🇬🇧" },
  fr: { code:"fr", hreflang:"fr", name:"French", nativeName:"Français", urlPrefix:"/fr", googleLocale:"fr_FR", dir:"ltr", countries:["FR","BE","CH","CA","SN"], flag:"🇫🇷" },
  de: { code:"de", hreflang:"de", name:"German", nativeName:"Deutsch", urlPrefix:"/de", googleLocale:"de_DE", dir:"ltr", countries:["DE","AT","CH"], flag:"🇩🇪" },
  it: { code:"it", hreflang:"it", name:"Italian", nativeName:"Italiano", urlPrefix:"/it", googleLocale:"it_IT", dir:"ltr", countries:["IT","CH"], flag:"🇮🇹" },
  hi: { code:"hi", hreflang:"hi", name:"Hindi", nativeName:"हिंदी", urlPrefix:"/hi", googleLocale:"hi_IN", dir:"ltr", countries:["IN"], flag:"🇮🇳" },
  ar: { code:"ar", hreflang:"ar", name:"Arabic", nativeName:"العربية", urlPrefix:"/ar", googleLocale:"ar_AE", dir:"rtl", countries:["AE","SA","QA","KW","EG","JO"], flag:"🇦🇪" },
  zh: { code:"zh", hreflang:"zh", name:"Chinese", nativeName:"中文", urlPrefix:"/zh", googleLocale:"zh_CN", dir:"ltr", countries:["CN","SG","MY","TW","HK"], flag:"🇨🇳" },
}

export function getLocalizedUrl(path: string, locale: Locale): string {
  const prefix = localeConfig[locale].urlPrefix
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return locale === "en" ? `${BASE_URL}${cleanPath}` : `${BASE_URL}${prefix}${cleanPath}`
}

export function buildHreflangAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}
  locales.forEach(locale => { alternates[localeConfig[locale].hreflang] = getLocalizedUrl(path, locale) })
  alternates["x-default"] = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
  return alternates
}

export function getLocaleFromPath(pathname: string): Locale {
  for (const locale of locales) {
    if (locale === "en") continue
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) return locale
  }
  return "en"
}
