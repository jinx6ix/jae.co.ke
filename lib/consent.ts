
export type ConsentSelection = {
  necessary: true // Always true
  analytics: boolean
  marketing: boolean
  updatedAt: number
  version: 1
}

const STORAGE_KEY = 'jaetravel-consent'

export const getConsent = (): ConsentSelection | null => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as ConsentSelection
  } catch {
    return null
  }
}

export const setConsent = (selection: Omit<ConsentSelection, 'necessary' | 'updatedAt' | 'version'>): void => {
  if (typeof window === 'undefined') return
  const consent: ConsentSelection = {
    ...selection,
    necessary: true,
    updatedAt: Date.now(),
    version: 1,
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    window.dispatchEvent(new Event('consentchange'))
  } catch (e) {
    console.error('Failed to set consent:', e)
  }
}

export const hasConsentedTo = (category: 'analytics' | 'marketing'): boolean => {
  const consent = getConsent()
  return consent ? consent[category] : false
}

/**
 * Clear the saved consent and notify listeners. The CookieConsent
 * component re-shows the banner when it sees no stored consent. Used
 * by the footer "Cookie settings" link so visitors can change their
 * mind after the initial banner is gone.
 */
export const reopenConsent = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('consentchange'))
}
