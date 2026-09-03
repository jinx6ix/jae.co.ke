'use client'

/**
 * useConsent — React hook for components that need to react to the
 * user's cookie choice. Returns the current `ConsentSelection` from
 * `localStorage`, or `null` if the user hasn't decided yet (the
 * cookie banner is still showing). Subscribes to the `consentchange`
 * and `storage` window events so the returned value stays in sync
 * with `localStorage` and with the footer's "Cookie settings" reopen
 * action.
 *
 * Kept in its own file (not in `lib/consent.ts`) so that the core
 * consent helpers stay free of React imports and remain usable from
 * server components, middleware, and the Payload collection hooks.
 *
 * Usage:
 *   const consent = useConsent()
 *   if (consent === null) return null   // hide while banner is up
 */

import { useEffect, useState } from 'react'
import { getConsent, type ConsentSelection } from './consent'

export function useConsent(): ConsentSelection | null {
  // On the server, localStorage doesn't exist — report "no consent
  // yet" so the first client render shows the banner, then the
  // hydration pass decides whether to hide it.
  const [consent, setConsent] = useState<ConsentSelection | null>(() =>
    typeof window === 'undefined' ? null : getConsent(),
  )

  useEffect(() => {
    const sync = () => setConsent(getConsent())
    window.addEventListener('consentchange', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('consentchange', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return consent
}
