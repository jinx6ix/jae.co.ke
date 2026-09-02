// components/LanguageSwitcher.tsx
// Drop-in language switcher — add to Header component
"use client"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { localeConfig, locales, type Locale } from "@/lib/i18n/config"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Detect current locale from path
  function getCurrentLocale(): Locale {
    for (const locale of locales) {
      if (locale === "en") continue
      if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) return locale
    }
    return "en"
  }

  function getLocalizedPath(targetLocale: Locale): string {
    const current = getCurrentLocale()
    let path = pathname

    // Strip current locale prefix
    if (current !== "en") {
      path = path.replace(new RegExp(`^/${current}`), "") || "/"
    }

    // Add target locale prefix
    if (targetLocale === "en") return path
    return `/${targetLocale}${path}`
  }

  const currentLocale = getCurrentLocale()
  const currentConfig = localeConfig[currentLocale]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors text-sm font-medium"
        aria-label="Select language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{currentConfig.flag}</span>
        <span className="hidden sm:inline text-gray-700">{currentConfig.nativeName}</span>
        <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 z-50 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[180px]">
            <div className="py-1">
              {locales.map((locale) => {
                const config = localeConfig[locale]
                const isActive = locale === currentLocale
                return (
                  <button
                    key={locale}
                    onClick={() => { router.push(getLocalizedPath(locale)); setOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors ${isActive ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700"}`}
                    lang={locale}
                    hrefLang={locale}
                  >
                    <span className="text-lg leading-none">{config.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{config.nativeName}</div>
                      <div className="text-xs text-gray-400">{config.name}</div>
                    </div>
                    {isActive && (
                      <svg className="ml-auto w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
