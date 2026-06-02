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
    canonical: "https://www.jaetravel.co.ke/privacy-policy",
    languages: {
      'en': 'https://www.jaetravel.co.ke/privacy-policy',
      'x-default': 'https://www.jaetravel.co.ke/privacy-policy',
    },
  },
  openGraph: {
    title: "Privacy Policy | JaeTravel Expeditions",
    description: "JaeTravel Expeditions privacy policy covering data collection, usage, cookies, social media integration, and your rights regarding personal information.",
    url: "https://www.jaetravel.co.ke/privacy-policy",
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

export default function PrivacyPolicyPage() {
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
                    <li>Referring website or source</li>
                    <li>Geographic location (country/region)</li>
                    <li>Safari preferences and accessibility requirements (if disclosed)</li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h3 className="font-semibold text-xl mb-3">Social Media Information</h3>
                  <p className="text-muted-foreground">
                    When you interact with our social media content on Instagram, YouTube, Facebook, or TikTok through our website gallery, we may collect publicly available information you choose to share, including profile information and engagement with our content.
                  </p>
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
                <p className="text-muted-foreground mb-4">We use the collected information for the following purposes:</p>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Processing and managing tour bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Responding to inquiries and providing customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ExternalLink className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Sending booking confirmations and travel documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Personalizing your experience and safari recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Ensuring accessibility accommodations are properly arranged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Improving our website and services based on analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Preventing fraud and ensuring transaction security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Marketing communications (only with your consent)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3: Cookies & Tracking */}
            <div id="cookies" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">3</span>
                Cookies & Tracking Technologies
              </h2>
              
              <div className="bg-card rounded-xl p-6 border mb-6">
                <h3 className="font-semibold text-xl mb-3">What Are Cookies?</h3>
                <p className="text-muted-foreground">
                  Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly. These cannot be disabled as they are necessary for core functionality like booking processing and security.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website through tools like Google Analytics. This information is used to improve our services and user experience.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Used to track visitors across websites for advertising purposes. We may use these to display relevant advertisements based on your interests.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Social Media Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable integration with social media platforms like Instagram, YouTube, Facebook, and TikTok for sharing content and accessing social media feeds on our website.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-muted-foreground">
                <strong>Managing Cookies:</strong> Most web browsers allow you to control cookies through their settings. However, disabling cookies may affect website functionality.
              </p>
            </div>

            {/* Section 4: Third-Party Services */}
            <div id="third-party" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">4</span>
                Third-Party Services
              </h2>
              
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">
                  We use trusted third-party services to operate our business:
                </p>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Payment Processing</h4>
                    <p className="text-sm text-muted-foreground">Secure payment processing through payment providers. We do not store your complete payment card details.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Analytics & Performance</h4>
                    <p className="text-sm text-muted-foreground">Google Analytics and Vercel Analytics help us understand website traffic and improve performance.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Email Communications</h4>
                    <p className="text-sm text-muted-foreground">Email service providers for sending booking confirmations, newsletters, and marketing communications.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Social Media APIs</h4>
                    <p className="text-sm text-muted-foreground">APIs from Instagram (Meta), YouTube (Google), Facebook (Meta), and TikTok to display social media content on our gallery page.</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Accommodation & Tour Partners</h4>
                    <p className="text-sm text-muted-foreground">Lodges, camps, and local tour operators who fulfill booked safari services.</p>
                  </div>
                </div>
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
                  Our website features a social media gallery that displays content from our official social media accounts on Instagram, YouTube, Facebook, and TikTok. This integration:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Fetches publicly available posts and videos from our social media accounts via their official APIs</li>
                  <li>Displays thumbnails, captions, and metadata from these posts</li>
                  <li>Allows you to view original posts on the respective social media platforms</li>
                  <li>Does not access your personal social media data unless you voluntarily interact with our content</li>
                </ul>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Social Media Platforms We Use:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                      Instagram (Meta)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      YouTube (Google)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Facebook (Meta)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-black"></span>
                      TikTok
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">
                  When you click on social media content, you will be redirected to the respective platform. Their privacy policies apply to any interactions on those platforms.
                </p>
              </div>
            </div>

            {/* Section 6: Data Sharing */}
            <div id="sharing" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">6</span>
                Data Sharing & Disclosure
              </h2>
              
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-4">We do not sell your personal information. We may share your data in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                  <li><strong>Tour Fulfillment:</strong> Sharing necessary information with lodges, camps, guides, and transport providers to deliver booked safari services.</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government request.</li>
                  <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property, and to comply with legal processes.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>With Your Consent:</strong> Any other sharing of personal information will only occur with your explicit consent.</li>
                </ul>
              </div>
            </div>

            {/* Section 7: Data Security */}
            <div id="security" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">7</span>
                Data Security
              </h2>
              
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-start gap-4">
                  <Lock className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground mb-4">
                      We implement industry-standard security measures to protect your personal information, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>HTTPS encryption for all data transmission</li>
                      <li>Secure servers with firewall protection</li>
                      <li>Regular security updates and monitoring</li>
                      <li>Access controls limiting employee access to personal data</li>
                      <li>Secure payment processing through trusted payment providers</li>
                      <li>Staff training on data protection and privacy</li>
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground">
                      While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8: Your Rights */}
            <div id="rights" className="mb-12 scroll-mt-20">
              <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold">8</span>
                Your Rights
              </h2>
              
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground mb-6">
                  You have the following rights regarding your personal data:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Access</h4>
                    <p className="text-sm text-muted-foreground">Request a copy of the personal data we hold about you.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Rectification</h4>
                    <p className="text-sm text-muted-foreground">Request correction of inaccurate or incomplete data.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Erasure</h4>
                    <p className="text-sm text-muted-foreground">Request deletion of your personal data (subject to legal requirements).</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Portability</h4>
                    <p className="text-sm text-muted-foreground">Receive your data in a structured, commonly used format.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Objection</h4>
                    <p className="text-sm text-muted-foreground">Object to processing of your personal data for marketing purposes.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Withdraw Consent</h4>
                    <p className="text-sm text-muted-foreground">Withdraw consent for data processing at any time (where consent is the basis).</p>
                  </div>
                </div>
                
                <p className="mt-6 text-sm text-muted-foreground">
                  <strong>GDPR Note:</strong> For users in the European Economic Area (EEA), these rights are protected under the General Data Protection Regulation.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>CCPA Note:</strong> California residents have additional rights including the right to know, delete, and opt-out of the sale of personal information.
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
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Booking Data:</strong> Retained for at least 7 years for accounting and legal compliance purposes.</li>
                  <li><strong>Communication Records:</strong> Retained for 3 years after the last communication.</li>
                  <li><strong>Marketing Data:</strong> Retained until you unsubscribe or withdraw consent.</li>
                  <li><strong>Analytics Data:</strong> Retained for a maximum of 26 months in anonymized form.</li>
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
                  If you have questions, concerns, or requests related to your personal data or this Privacy Policy, please contact us:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-sm text-muted-foreground">info@jaetravel.co.ke</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Phone / WhatsApp</h4>
                      <p className="text-sm text-muted-foreground">+254 726 485 228</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  We aim to respond to all privacy-related requests within 30 days.
                </p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="font-serif text-3xl font-bold mb-6">Updates to This Policy</h2>
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Any updates will be posted on this page with a revised "Last updated" date.
                </p>
                <p className="mt-4 text-muted-foreground">
                  For significant changes, we will provide more prominent notice, such as email notification or a notice on our website homepage.
                </p>
              </div>
            </div>

            {/* Related Policies */}
            <div className="border-t pt-12">
              <h3 className="font-semibold text-lg mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/terms" className="px-4 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors">
                  Terms & Conditions
                </Link>
                <Link href="/contact" className="px-4 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}