import type { Metadata } from "next"
import Link from "next/link"
import { Shield, Eye, Lock, Users, Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | JaeTravel Expeditions",
  description: "JaeTravel Expeditions privacy policy covering data collection, usage, cookies, social media integration, and your rights regarding personal information.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "cookies",
    "GDPR",
    "travel privacy"
  ],
  alternates: {
    canonical: "https://www.jaetravel.co.ke/privacy",
    languages: {
      'en': 'https://www.jaetravel.co.ke/privacy',
      'x-default': 'https://www.jaetravel.co.ke/privacy',
    },
  },
  openGraph: {
    title: "Privacy Policy | JaeTravel Expeditions",
    description: "JaeTravel Expeditions privacy policy covering data collection, usage, cookies, social media integration, and your rights regarding personal information.",
    url: "https://www.jaetravel.co.ke/privacy",
    siteName: "JaeTravel Expeditions",
    type: "website",
    images: [{ url: "https://www.jaetravel.co.ke/og-image.jpg", width: 1200, height: 630, alt: "JaeTravel Expeditions Privacy Policy" }],
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | JaeTravel Expeditions",
    description: "JaeTravel Expeditions privacy policy covering data collection, usage, cookies, social media integration, and your rights regarding personal information.",
    images: ["https://www.jaetravel.co.ke/og-image.jpg"],
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Quick Navigation */}
            <nav className="bg-muted/30 rounded-xl p-6 mb-12">
              <h2 className="font-semibold mb-4">Quick Navigation</h2>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li><a href="#information" className="text-primary hover:underline">1. Information We Collect</a></li>
                <li><a href="#usage" className="text-primary hover:underline">2. How We Use Your Information</a></li>
                <li><a href="#cookies" className="text-primary hover:underline">3. Cookies & Tracking</a></li>
                <li><a href="#third-party" className="text-primary hover:underline">4. Third-Party Services</a></li>
                <li><a href="#social" className="text-primary hover:underline">5. Social Media Integration</a></li>
                <li><a href="#sharing" className="text-primary hover:underline">6. Data Sharing</a></li>
                <li><a href="#security" className="text-primary hover:underline">7. Data Security</a></li>
                <li><a href="#rights" className="text-primary hover:underline">8. Your Rights</a></li>
                <li><a href="#retention" className="text-primary hover:underline">9. Data Retention</a></li>
                <li><a href="#contact" className="text-primary hover:underline">10. Contact Us</a></li>
              </ul>
            </nav>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="lead text-xl text-muted-foreground">
                JaeTravel Expeditions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link href="https://www.jaetravel.co.ke" className="text-primary">www.jaetravel.co.ke</Link>, book our services, or interact with our social media content.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our services.
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <div id="information" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">1</span>
                Information We Collect
              </h2>

              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h3 className="font-semibold text-xl mb-3">Personal Information You Provide</h3>
                  <p className="text-muted-foreground mb-4">We may collect the following information when you book a tour, request a quote, or contact us:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Full name, email address, and phone number</li>
                    <li>Physical address and passport details (for tour bookings)</li>
                    <li>Date of birth and nationality</li>
                    <li>Dietary requirements and accessibility needs</li>
                    <li>Emergency contact information</li>
                    <li>Payment information (processed securely through third-party payment providers)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h3 className="font-semibold text-xl mb-3">Information Collected Automatically</h3>
                  <p className="text-muted-foreground mb-4">When you visit our website, we automatically collect certain information, including:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Website referring to our site</li>
                    <li>Geographic location (general, based on IP)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div id="usage" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">2</span>
                How We Use Your Information
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>To process bookings and provide requested services</li>
                  <li>To communicate with you about your bookings and inquiries</li>
                  <li>To send travel updates, itineraries, and important notices</li>
                  <li>To improve our website, services, and user experience</li>
                  <li>To respond to customer service requests and inquiries</li>
                  <li>To send marketing communications (only with your consent)</li>
                  <li>To comply with legal obligations and protect our rights</li>
                  <li>To prevent fraud and ensure security</li>
                  <li>To analyze website usage and trends</li>
                </ul>
              </div>
            </div>

            {/* Section 3: Cookies & Tracking */}
            <div id="cookies" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">3</span>
                Cookies & Tracking Technologies
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <h3 className="font-semibold text-lg mb-3">Types of Cookies We Use:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="text-muted-foreground">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of the site may not function properly.
                </p>
              </div>
            </div>

            {/* Section 4: Third-Party Services */}
            <div id="third-party" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">4</span>
                Third-Party Services
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">We may use third-party services that collect, monitor, and analyze information to improve our services:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li><strong>Google Analytics:</strong> Website analytics and user behavior tracking</li>
                  <li><strong>Google Merchant Center:</strong> Product feed integration for tour listings</li>
                  <li><strong>Payment Processors:</strong> Secure processing of booking payments</li>
                  <li><strong>Email Service Providers:</strong> Booking confirmations and customer communications</li>
                  <li><strong>Cloud Storage:</strong> Secure data storage and backup</li>
                </ul>
                <p className="text-muted-foreground">
                  These third parties have their own privacy policies governing the use of your information. We are not responsible for the privacy practices of these third-party services.
                </p>
              </div>
            </div>

            {/* Section 5: Social Media Integration */}
            <div id="social" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">5</span>
                Social Media Integration
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">
                  Our website integrates with social media platforms including Facebook, Instagram, TikTok, and YouTube. These integrations may allow us to display content from our social media accounts and enable social sharing features.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Social media platforms may set their own cookies and collect information</li>
                  <li>We may display our social media feeds and content on our website</li>
                  <li>You can share our content on social media platforms</li>
                  <li>Each social media platform has its own privacy policy</li>
                </ul>
                <p className="text-muted-foreground">
                  We recommend reviewing the privacy policies of the social media platforms you use.
                </p>
              </div>
            </div>

            {/* Section 6: Data Sharing */}
            <div id="sharing" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">6</span>
                Data Sharing and Disclosure
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li><strong>Service Providers:</strong> With trusted partners who help us operate our business (hotels, lodges, transport companies)</li>
                  <li><strong>Legal Compliance:</strong> When required by law, court order, or government authority</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent</li>
                  <li><strong>Protection:</strong> To protect our rights, property, or safety</li>
                </ul>
                <p className="text-muted-foreground">
                  We do not sell, trade, or rent your personal information to third parties.
                </p>
              </div>
            </div>

            {/* Section 7: Data Security */}
            <div id="security" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">7</span>
                Data Security
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure data storage with access controls</li>
                  <li>Regular security assessments and updates</li>
                  <li>Employee training on data protection</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                </ul>
              </div>
            </div>

            {/* Section 8: Your Rights */}
            <div id="rights" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">8</span>
                Your Rights
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise any of these rights, please contact us using the information provided in Section 10.
                </p>
              </div>
            </div>

            {/* Section 9: Data Retention */}
            <div id="retention" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">9</span>
                Data Retention
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Booking records: 7 years for legal and tax purposes</li>
                  <li>Marketing data: Until you unsubscribe or request deletion</li>
                  <li>Website analytics: 26 months (Google Analytics default)</li>
                  <li>Customer service records: 3 years after last interaction</li>
                </ul>
              </div>
            </div>

            {/* Section 10: Contact Us */}
            <div id="contact" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">10</span>
                Contact Us
              </h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground text-sm">Karen Roundabout, Nairobi, Kenya</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground text-sm">+254 726 485 228</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground text-sm">info@jaetravel.co.ke</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-muted-foreground text-sm">www.jaetravel.co.ke</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
                    Contact us through our form
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}