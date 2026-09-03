'use client'

/**
 * Cookie consent banner.
 *
 * Shows a dismissible bottom bar on first visit. Stores the user's
 * choice in localStorage (`jaetravel-consent`) and dispatches a
 * `consentchange` window event when the choice changes so the footer
 * "Cookie settings" link can re-open it.
 *
 * When the user grants analytics/marketing consent, the GTM, GA4, and
 * Ahrefs scripts are injected programmatically. The original
 * unconditional <Script> tags in app/(marketing)/layout.tsx were
 * removed — this component is now the single point that loads them,
 * gated by consent.
 *
 * Payload's `payload-token` cookie is essential and is NOT gated.
 */

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { getConsent, setConsent, type ConsentSelection } from '@/lib/consent'

const GTM_ID = 'GTM-52G2X6L5'
const GA_ID = 'G-2YLERP8F8B'
const AHREFS_KEY = 'q74t4ci2dZznctEH4t8jCA'

const SCRIPT_IDS = {
  gtm: 'gtm-script',
  ga4Lib: 'ga4-lib',
  ga4Config: 'ga4-config',
  ahrefs: 'ahrefs-analytics',
} as const

const loadAnalytics = (): void => {
  if (typeof window === 'undefined') return

  // GTM bootstrap
  if (!document.getElementById(SCRIPT_IDS.gtm)) {
    const s = document.createElement('script')
    s.id = SCRIPT_IDS.gtm
    s.async = true
    s.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
    document.head.appendChild(s)
  }

  // GA4 library
  if (!document.getElementById(SCRIPT_IDS.ga4Lib)) {
    const s = document.createElement('script')
    s.id = SCRIPT_IDS.ga4Lib
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
  }

  // GA4 config + initial page_view
  if (!document.getElementById(SCRIPT_IDS.ga4Config)) {
    const s = document.createElement('script')
    s.id = SCRIPT_IDS.ga4Config
    s.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true,transport_type:'beacon'});`
    document.head.appendChild(s)
  }
}

const loadMarketing = (): void => {
  if (typeof window === 'undefined') return
  if (document.getElementById(SCRIPT_IDS.ahrefs)) return
  const s = document.createElement('script')
  s.id = SCRIPT_IDS.ahrefs
  s.defer = true
  s.src = `https://analytics.ahrefs.com/analytics.js`
  s.dataset.key = AHREFS_KEY
  document.head.appendChild(s)
}

const unloadScripts = (ids: readonly string[]): void => {
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el && el.parentNode) el.parentNode.removeChild(el)
  }
}

const unloadAnalytics = (): void => unloadScripts([SCRIPT_IDS.gtm, SCRIPT_IDS.ga4Lib, SCRIPT_IDS.ga4Config])
const unloadMarketing = (): void => unloadScripts([SCRIPT_IDS.ahrefs])

type View = 'banner' | 'customize' | 'hidden'

export function CookieConsent() {
  const [consent, setConsentState] = useState<ConsentSelection | null>(null)
  const [view, setView] = useState<View>('hidden')
  const [pendingAnalytics, setPendingAnalytics] = useState(true)
  const [pendingMarketing, setPendingMarketing] = useState(true)

  // Read consent on mount + listen for changes (footer link fires
  // a 'consentchange' event to re-open the bar).
  useEffect(() => {
    const sync = () => {
      const c = getConsent()
      setConsentState(c)
      if (!c) {
        setView('banner')
        setPendingAnalytics(true)
        setPendingMarketing(true)
      } else {
        setView('hidden')
      }
    }
    sync()
    window.addEventListener('consentchange', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('consentchange', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  // Load/unload scripts when consent changes.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (consent?.analytics) {
      loadAnalytics()
    } else {
      unloadAnalytics()
    }
    if (consent?.marketing) {
      loadMarketing()
    } else {
      unloadMarketing()
    }
  }, [consent])

  const acceptAll = useCallback(() => {
    setConsent({ analytics: true, marketing: true })
  }, [])

  const rejectAll = useCallback(() => {
    setConsent({ analytics: false, marketing: false })
  }, [])

  const saveCustom = useCallback(() => {
    setConsent({ analytics: pendingAnalytics, marketing: pendingMarketing })
  }, [pendingAnalytics, pendingMarketing])

  if (view === 'hidden' || consent) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[2147483647] border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-5">
        {view === 'banner' && (
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-foreground/90 max-w-2xl">
              <p>
                We use cookies to improve your experience, analyze traffic, and personalize content. By
                clicking &ldquo;Accept all&rdquo; you consent to our use of cookies.{' '}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
                  Read our privacy policy
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
              <button
                type="button"
                onClick={() => setView('customize')}
                className="rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Accept all
              </button>
            </div>
          </div>
        )}

        {view === 'customize' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Cookie preferences</h2>
              <button
                type="button"
                onClick={() => setView('banner')}
                aria-label="Back to summary"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4 rounded-md border border-border p-3">
                <div>
                  <p className="font-medium">Essential</p>
                  <p className="text-muted-foreground">
                    Required for sign-in and core site functionality. Always on.
                  </p>
                </div>
                <span className="mt-1 shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  Always on
                </span>
              </div>

              <label className="flex items-start justify-between gap-4 rounded-md border border-border p-3 cursor-pointer">
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-muted-foreground">
                    Google Analytics 4 and Google Tag Manager — page views, scroll depth, and booking
                    funnel events.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                  checked={pendingAnalytics}
                  onChange={(e) => setPendingAnalytics(e.target.checked)}
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-md border border-border p-3 cursor-pointer">
                <div>
                  <p className="font-medium">Marketing</p>
                  <p className="text-muted-foreground">
                    Ahrefs analytics — aggregated traffic and referral measurement.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-primary"
                  checked={pendingMarketing}
                  onChange={(e) => setPendingMarketing(e.target.checked)}
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-md border border-border bg-transparent px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={saveCustom}
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
