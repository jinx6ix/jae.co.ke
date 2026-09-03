// app/(marketing)/privacy/page.tsx
//
// Public-facing privacy policy. Required by Kenya's Data Protection
// Act 2019, the EU GDPR (for EEA visitors), and the UK GDPR. Lives at
// the canonical /privacy URL so the cookie consent banner, footer
// links, and any "I want to know more" point at a single source of
// truth.
//
// Update this file when:
//   - A new third-party service is added that processes personal data.
//   - A new cookie or localStorage key is set by the app.
//   - The data retention period changes for any system.
// Last reviewed: 2026-09.

import type { Metadata } from "next"
import Link from "next/link"
import JsonLd from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Privacy Policy | JaeTravel Expeditions",
  description:
    "How JaeTravel Expeditions collects, uses, and protects your personal data — including our use of cookies, analytics, and third-party services.",
  alternates: {
    canonical: "https://www.jaetravel.co.ke/privacy",
  },
  robots: { index: true, follow: true },
}

const lastUpdated = "2026-09-02"

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.jaetravel.co.ke/privacy/#webpage",
  url: "https://www.jaetravel.co.ke/privacy",
  name: "Privacy Policy | JaeTravel Expeditions",
  description:
    "How JaeTravel Expeditions collects, uses, and protects your personal data.",
  dateModified: lastUpdated,
  isPartOf: { "@id": "https://www.jaetravel.co.ke/#website" },
  publisher: { "@id": "https://www.jaetravel.co.ke/#organization" },
}

export default function PrivacyPage() {
  return (
    <>
      <JsonLd id="privacy-webpage-schema" data={webPageSchema} />
      <div className="mx-auto w-full max-w-4xl px-4 py-12 md:py-16">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Who we are</h2>
            <p>
              JaeTravel Expeditions (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a safari tour
              operator registered in Kenya. Our website is operated from
              Nairobi, Kenya, and is hosted on Vercel&apos;s global edge
              network. For any privacy question, email{" "}
              <a className="text-primary underline underline-offset-2" href="mailto:info@jaetravel.co.ke">
                info@jaetravel.co.ke
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. What data we collect</h2>
            <p>We collect personal data in three ways:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Data you give us directly</strong> — when you submit a
                booking enquiry, sign up for a quotation, or contact us. This
                typically includes your name, email, phone number, country,
                travel dates, party size, accessibility requirements, and any
                message you send.
              </li>
              <li>
                <strong>Data we collect automatically</strong> — when you visit
                the site, we (and our analytics providers) may record your IP
                address, device type, browser, pages visited, time on page,
                scroll depth, and the site you came from. See the Cookies
                section below for what we use and how to opt out.
              </li>
              <li>
                <strong>Data from third parties</strong> — when you log in via a
                social provider (where offered) or when a payment processor
                returns a transaction status.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. How we use your data</h2>
            <p>We use the data above to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to enquiries and prepare quotations.</li>
              <li>Operate, secure, and improve the website.</li>
              <li>Measure traffic and engagement (only if you consent).</li>
              <li>
                Comply with legal obligations (record-keeping, tax, anti-fraud).
              </li>
            </ul>
            <p>
              We never sell your personal data. We do not use your data for
              automated decision-making that produces legal effects.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Cookies and consent</h2>
            <p>
              The site uses cookies and local storage. On your first visit, a
              banner asks for your consent. You can change your choice at any
              time using the &ldquo;Cookie settings&rdquo; link in the footer.
            </p>
            <p>The categories we use:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential</strong> (always on) — the <code>payload-token</code>{" "}
                cookie is used by our CMS to keep administrators signed in.
                <code> jaetravel-consent</code> in <code>localStorage</code>{" "}
                records your cookie choice.
              </li>
              <li>
                <strong>Analytics</strong> (opt-in) — Google Analytics 4
                (<code>G-2YLERP8F8B</code>) and Google Tag Manager (
                <code>GTM-52G2X6L5</code>) record page views, scroll depth, and
                booking-funnel events. Google sets cookies such as{" "}
                <code>_ga</code> and <code>_ga_*</code>. Data is sent to Google
                Ireland / Google LLC.{" "}
                <a
                  className="text-primary underline underline-offset-2"
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&apos;s cookie policy
                </a>
                .
              </li>
              <li>
                <strong>Marketing</strong> (opt-in) — Ahrefs Analytics records
                aggregated referral and traffic data.{" "}
                <a
                  className="text-primary underline underline-offset-2"
                  href="https://ahrefs.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ahrefs privacy policy
                </a>
                .
              </li>
            </ul>
            <p>
              We do not load Google Analytics, Google Tag Manager, or Ahrefs
              scripts until you grant consent. If you reject, those scripts
              never run and no analytics cookies are set on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Third-party services</h2>
            <p>
              In addition to the analytics providers above, the following
              services process data on our behalf:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Vercel</strong> — hosting, edge caching, and cookieless
                aggregated analytics.{" "}
                <a
                  className="text-primary underline underline-offset-2"
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel privacy policy
                </a>
                .
              </li>
              <li>
                <strong>MongoDB Atlas</strong> — Payload CMS data (pages, posts,
                bookings, enquiries). Data is stored in a region selected at
                project setup.
              </li>
              <li>
                <strong>PostgreSQL (Neon)</strong> — operational data
                (bookings, vouchers, hotel inventory). Connection is encrypted
                in transit.
              </li>
              <li>
                <strong>YouTube</strong> — embedded videos on the site. Loading
                a YouTube embed may send your IP and page context to Google
                even before you press play. We use{" "}
                <code>youtube-nocookie.com</code> where possible to limit this.
              </li>
              <li>
                <strong>Instagram</strong> — embedded Instagram posts. Meta may
                receive your IP and page context when an embed loads.
              </li>
              <li>
                <strong>WhatsApp / phone</strong> — when you choose to contact
                us via these channels, your message is delivered to our team
                and stored in our normal business records.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. How long we keep your data</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Enquiry and quotation records: 3 years from last contact.</li>
              <li>Booking records: 7 years (tax and accounting law).</li>
              <li>Analytics data: 14 months (Google Analytics default).</li>
              <li>Server logs: up to 30 days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Your rights</h2>
            <p>
              Depending on where you live, you may have the right to:
              access the personal data we hold about you; correct inaccurate
              data; request deletion; restrict or object to certain processing;
              request a portable copy; and lodge a complaint with a data
              protection authority.
            </p>
            <p>
              To exercise any of these rights, email{" "}
              <a className="text-primary underline underline-offset-2" href="mailto:info@jaetravel.co.ke">
                info@jaetravel.co.ke
              </a>
              . We respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Children</h2>
            <p>
              The site is not directed at children under 16. We do not
              knowingly collect personal data from children. If you believe a
              child has provided us with personal data, please contact us so we
              can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. International transfers</h2>
            <p>
              Some of our processors (Google, Vercel, MongoDB) are based
              outside Kenya. Where your data is transferred internationally,
              we rely on the processor&apos;s standard contractual clauses or
              equivalent safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The &ldquo;Last
              updated&rdquo; date at the top will always reflect when the most
              recent change was made. Material changes will be announced on
              the homepage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. Contact</h2>
            <p>
              JaeTravel Expeditions
              <br />
              Nairobi, Kenya
              <br />
              Email:{" "}
              <a className="text-primary underline underline-offset-2" href="mailto:info@jaetravel.co.ke">
                info@jaetravel.co.ke
              </a>
              <br />
              Phone:{" "}
              <a className="text-primary underline underline-offset-2" href="tel:+254726485228">
                +254 726 485 228
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              See also:{" "}
              <Link className="text-primary underline underline-offset-2" href="/contact">
                Contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
