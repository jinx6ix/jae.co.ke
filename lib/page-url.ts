// lib/page-url.ts
//
// Helpers for safely using a page URL submitted by the browser in admin/customer
// emails. The form client sends `window.location.href` so the email can link
// back to the exact page the customer submitted the form from. But a malicious
// client could send any URL — including an attacker-controlled phishing URL —
// which the admin would then click on from a "New Booking" email.
//
// We defend by validating that the submitted URL is on a host we trust. The
// allowlist is intentionally narrow:
//   - the production canonical host (with and without www)
//   - the canonical host over http (for staging / previews that mirror prod)
//   - localhost (for local dev only — never reachable in prod)
//
// Anything else is dropped and the caller falls back to a server-derived URL.

import { BASE_URL } from "@/lib/i18n/config"

// Trusted host roots. Match is performed against `url.host` (no scheme, no port).
// We deliberately keep this list short and explicit — adding a new domain should
// be a code change, not an env var, so it can be reviewed.
const TRUSTED_HOSTS = new Set<string>([
  "jaetravel.co.ke",
  "www.jaetravel.co.ke",
  "localhost",
  "127.0.0.1",
])

/**
 * Returns the canonical origin to use for absolute URLs in server-rendered
 * content (emails, metadata, structured data). Prefers the env var so a
 * custom deployment domain works; falls back to the canonical BASE_URL.
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || BASE_URL
}

/**
 * Returns true if the given URL string is a syntactically valid http(s) URL
 * whose host is in our trusted allowlist. Anything else returns false.
 *
 * Use this BEFORE rendering a user-submitted URL in an admin email.
 */
export function isTrustedPageUrl(raw: unknown): raw is string {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > 2048) {
    return false
  }
  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    return false
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false
  }
  return TRUSTED_HOSTS.has(parsed.hostname)
}

/**
 * Returns a normalized absolute URL suitable for embedding in an email.
 * - Strips the hash fragment (it doesn't belong in an email link).
 * - Trusts only URLs on our allowlist; everything else returns null.
 * - The path is kept as-is (including any query string the user landed on),
 *   so the admin can see e.g. /tours?destination=accessible.
 */
export function sanitizeTrustedPageUrl(raw: unknown): string | null {
  if (!isTrustedPageUrl(raw)) return null
  const parsed = new URL(raw as string)
  parsed.hash = ""
  return parsed.toString()
}
