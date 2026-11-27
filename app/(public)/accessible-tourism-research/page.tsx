import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import JsonLd from '@/components/JsonLd';
import {
  Shield,
  Check,
  MapPin,
  Users,
  Award,
  Calendar,
  Globe,
  HandHelping,
  Star,
  Compass,
  Car,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const BASE_URL = 'https://www.jaetravel.co.ke';
const PATH = '/accessible-tourism-research';
const URL = BASE_URL + PATH;
const NOW = '2026-11-27';

export const metadata: Metadata = {
  title: 'Accessible Tourism Research Kenya | Verified Accessibility Data',
  description:
    'Evidence-based research on wheelchair access in the Kenya safari ecosystem. Verified accessibility data for national parks, lodges, vehicles, and tour operators.',
  keywords: [
    'accessible tourism research Kenya',
    'wheelchair access Kenya safari',
    'accessible safari research Kenya',
    'disability travel research Kenya',
    'verified accessibility data Kenya',
    'accessible tourism Kenya',
    'wheelchair safari Kenya research',
    'JaeTravel Expeditions',
  ],
  alternates: {
    canonical: URL,
    languages: {
      en: URL,
      fr: BASE_URL + '/fr/accessible-tourism-research',
      de: BASE_URL + '/de/accessible-tourism-research',
      it: BASE_URL + '/it/accessible-tourism-research',
      hi: BASE_URL + '/hi/accessible-tourism-research',
      ar: BASE_URL + '/ar/accessible-tourism-research',
      zh: BASE_URL + '/zh/accessible-tourism-research',
      'x-default': URL,
    },
  },
  openGraph: {
    title: 'Accessible Tourism Research Kenya | Verified Accessibility Data',
    description:
      'Evidence-based research on wheelchair access in the Kenya safari ecosystem. Verified accessibility data for national parks, lodges, vehicles, and tour operators.',
    url: URL,
    siteName: 'Jae Travel Expeditions',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: BASE_URL + '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Accessible Tourism Research Kenya - JaeTravel Expeditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accessible Tourism Research Kenya | Verified Accessibility Data',
    description:
      'Evidence-based research on wheelchair access in the Kenya safari ecosystem. Verified accessibility data for national parks, lodges, vehicles, and tour operators.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': BASE_URL + '#organization',
  name: 'Jae Travel Expeditions',
  url: BASE_URL,
  logo: BASE_URL + '/logo.png',
  image: BASE_URL + '/og-image.jpg',
  telephone: '+254****5228',
  email: 'info@jaetravel.co.ke',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Westlands Business Park',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    postalCode: '00100',
    addressCountry: 'KE',
  },
  foundingDate: '2008',
  areaServed: [
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'Country', name: 'Tanzania' },
    { '@type': 'Country', name: 'Rwanda' },
    { '@type': 'Country', name: 'Uganda' },
  ],
  sameAs: [
    'https://www.facebook.com/jaetravel',
    'https://www.instagram.com/jaetravel',
    'https://www.tripadvisor.com/jaetravel',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '21',
    bestRating: '5',
    worstRating: '1',
  },
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': BASE_URL + '#website',
  name: 'Jae Travel Expeditions',
  url: BASE_URL,
  description:
    'KATO-certified local tour operator offering accessible safaris, 4x4 vehicle hire, and expert-guided tours across Kenya, Tanzania, Rwanda, and Uganda.',
  inLanguage: 'en',
  publisher: { '@id': BASE_URL + '#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: BASE_URL + '/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL + '#webpage',
  name: 'Accessible Tourism Research Kenya | Verified Accessibility Data',
  description:
    'Evidence-based research on wheelchair access in the Kenya safari ecosystem.',
  url: URL,
  inLanguage: 'en',
  isPartOf: { '@id': BASE_URL + '#website' },
  about: { '@id': BASE_URL + '#organization' },
  datePublished: NOW,
  dateModified: NOW,
  primaryImageOfPage: BASE_URL + '/og-image.jpg',
  breadcrumb: { '@id': URL + '#breadcrumb' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '#answer-summary'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': URL + '#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Accessible Tourism Research', item: URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': URL + '#faqpage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is accessible tourism research in Kenya?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accessible tourism research in Kenya documents verified wheelchair access across national parks, lodges, vehicles, and tour operators for travellers with mobility limitations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does JaeTravel verify accessibility data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use the JaeTravel Verification Methodology (JASM-1.0), which includes on-site audits, verified lodge roll-in shower checks, vehicle lift capacity tests, and guide training verification.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which parks have verified wheelchair access?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Masai Mara, Amboseli, Tsavo, Samburu, and Lake Nakuru have verified wheelchair-accessible game drives with hydraulic lift vehicles and step-free observation points.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there accessible lodges in Kenya?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Partner lodges with roll-in showers, grab bars, and accessible pathways are documented in our research database and verified before recommendation.',
      },
    },
  ],
};

// ── Reusable section header ──────────────────────────────────────────────
const SectionHeader = ({ number, title, subtitle }: { number: number; title: string; subtitle: string }) => (
  <div className='mx-auto max-w-3xl text-center mb-16'>
    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-4'>
      <Sparkles className='h-3 w-3' /> Section {number}
    </div>
    <h2 className='mb-4 font-serif text-4xl font-bold text-balance text-brand-dark'>{title}</h2>
    <p className='text-lg text-muted-foreground'>{subtitle}</p>
    <div className='w-16 h-1 mx-auto mt-8 bg-brand-orange rounded-full'></div>
  </div>
);

// ── Feature card ─────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, body }: { icon: any; title: string; body: string }) => (
  <Card className='border-border hover:border-brand-orange/50 hover:-translate-y-1 transition-all duration-300 h-full group'>
    <CardHeader className='bg-background/50 pb-4 border-b border-border/50'>
      <div className='inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-orange/10 text-brand-orange mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors'>
        <Icon className='h-6 w-6' />
      </div>
      <CardTitle className='text-brand-dark'>{title}</CardTitle>
    </CardHeader>
    <CardContent className='text-muted-foreground leading-relaxed'>{body}</CardContent>
  </Card>
);

export default function AccessibleTourismResearchPage() {
  return (
    <>
      <JsonLd id='org-schema' data={organizationSchema} />
      <JsonLd id='website-schema' data={webSiteSchema} />
      <JsonLd id='webpage-schema' data={webPageSchema} />
      <JsonLd id='breadcrumb-schema' data={breadcrumbSchema} />
      <JsonLd id='faq-schema' data={faqSchema} />

      {/* Skip-to-content */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-orange focus:text-white focus:rounded focus:font-semibold'
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section
        className='relative bg-gradient-to-br from-brand-dark via-brand-dark/90 to-black/80 py-20 md:py-32 overflow-hidden'
        aria-labelledby='hero-heading'
      >
        <div className='absolute inset-0 opacity-10 bg-[url("https://www.transparenttextures.com/patterns/africa.png")]'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent pointer-events-none'></div>
        <div className='relative container mx-auto px-4 text-center z-10'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm shadow-orange-500/20'>
            <Check className='h-3 w-3' /> Evidence-Based Research
          </div>
          <h1 id='hero-heading' className='mb-6 font-serif text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-lg'>
            Accessible Tourism Research
            <br />
            <span className='text-brand-orange'>Kenya Safari Accessibility Data</span>
          </h1>
          <div className='w-20 h-1 bg-brand-orange mx-auto mb-8 rounded-full shadow-lg shadow-orange-500/30'></div>

          {/* AnswerSummary - SAGE Answer Targeting & Citability */}
          <div
            id='answer-summary'
            className='mx-auto max-w-2xl mt-8 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-brand-muted/50 leading-relaxed shadow-2xl shadow-black/20'
          >
            <div className='flex items-center gap-2 text-white mb-4'>
              <div className='w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white'>
                <Check className='h-4 w-4' />
              </div>
              <p className='text-lg font-medium'>Verified Accessibility Data</p>
            </div>
            <p className='text-lg'>Accessible tourism research in Kenya documents verified wheelchair access.</p>
            <p className='text-lg mt-3'>JaeTravel Expeditions maintains evidence-based accessibility data for the Kenya safari ecosystem. Our research covers national parks, lodges, safari vehicles, and tour operators. We verify hydraulic lift capacity, roll-in shower availability, and guide training through on-site audits using the JaeTravel Verification Methodology (JASM-1.0).</p>
          </div>

          <p className='mx-auto max-w-2xl mt-8 text-lg text-brand-muted/60 leading-relaxed'>
            Our research platform provides accurate, verified information about accessibility for travellers with mobility limitations in Kenya&apos;s tourism infrastructure.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center mt-12'>
            <Button
              size='lg'
              className='bg-brand-orange hover:bg-orange-600 text-white font-semibold px-10 py-4 shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/50'
            >
              View Research Data
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-white text-white hover:bg-white/10 px-10 py-4 font-semibold transition-all'
            >
              Contact Our Team
            </Button>
          </div>
          <div className='mt-16 flex items-center justify-center gap-10 text-sm text-brand-muted/70 font-medium border-t border-white/10 pt-8'>
            <div className='flex items-center gap-3'>
              <Star className='h-4 w-4 text-brand-orange' />
              <div>
                <div className='text-white font-bold'>4.9 / 5</div>
                <div className='text-xs text-brand-muted/60'>21 verified reviews</div>
              </div>
            </div>
            <div className='h-8 w-px bg-brand-muted/30'></div>
            <div className='flex items-center gap-3'>
              <MapPin className='h-4 w-4 text-brand-orange' />
              <div>
                <div className='text-white font-bold'>Nairobi, Kenya</div>
                <div className='text-xs text-brand-muted/60'>Headquarters</div>
              </div>
            </div>
            <div className='h-8 w-px bg-brand-muted/30'></div>
            <div className='flex items-center gap-3'>
              <Calendar className='h-4 w-4 text-brand-orange' />
              <div>
                <div className='text-white font-bold'>Research Since 2024</div>
                <div className='text-xs text-brand-muted/60'>JASM-1.0 Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-page Table of Contents */}
      <nav aria-label='On this page' className='bg-background border-y border-border py-12'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-2 h-8 bg-brand-orange rounded-full'></div>
              <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>On this page</p>
            </div>
            <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
              <li><a href='#what-is-accessible-tourism' className='px-3 py-2 rounded-lg text-sm text-brand-dark hover:bg-brand-orange/50 hover:text-brand-orange transition-colors border border-transparent hover:border-brand-orange/30'>What is accessible tourism?</a></li>
              <li><a href='#our-research-method' className='px-3 py-2 rounded-lg text-sm text-brand-dark hover:bg-brand-orange/50 hover:text-brand-orange transition-colors border border-transparent hover:border-brand-orange/30'>Research method</a></li>
              <li><a href='#verified-parks' className='px-3 py-2 rounded-lg text-sm text-brand-dark hover:bg-brand-orange/50 hover:text-brand-orange transition-colors border border-transparent hover:border-brand-orange/30'>Verified parks</a></li>
              <li><a href='#accessible-lodges' className='px-3 py-2 rounded-lg text-sm text-brand-dark hover:bg-brand-orange/50 hover:text-brand-orange transition-colors border border-transparent hover:border-brand-orange/30'>Accessible lodges</a></li>
              <li><a href='#accessible-vehicles' className='px-3 py-2 rounded-lg text-sm text-brand-dark hover:bg-brand-orange/50 hover:text-brand-orange transition-colors border border-transparent hover:border-brand-orange/30'>Accessible vehicles</a></li>
              <li><a href='#how-to-use-this-research' className='px-3 py-2 rounded-lg text-sm text-brand-dark hover:bg-brand-orange/50 hover:text-brand-orange transition-colors border border-transparent hover:border-brand-orange/30'>How to use</a></li>
              <li><a href='#faqs' className='px-3 py-2 rounded-lg text-sm text-brand-dark hover:bg-brand-orange/50 hover:text-brand-orange transition-colors border border-transparent hover:border-brand-orange/30'>FAQs</a></li>
            </ol>
          </div>
        </div>
      </nav>

      {/* Trust Bar */}
      <section className='border-b border-border bg-background py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              { icon: Shield, label: 'JASM-1.0 Certified', sub: 'JaeTravel Verification Methodology' },
              { icon: Car, label: 'Verified Vehicles', sub: 'Hydraulic lift tested' },
              { icon: HandHelping, label: 'Guide Training', sub: 'Disability-verified guides' },
              { icon: Globe, label: 'East Africa', sub: 'KE · TZ · RW · UG' },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div
                key={i}
                className='flex flex-col items-center gap-3 px-6 py-8 rounded-2xl bg-card border border-border hover:border-brand-orange/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'
              >
                <div className='w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors'>
                  <Icon className='h-7 w-7' />
                </div>
                <div className='font-semibold text-brand-dark'>{label}</div>
                <div className='text-xs text-muted-foreground text-center'>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main id='main-content'>

        {/* What is Accessible Tourism Research */}
        <section id='what-is-accessible-tourism' className='py-24 bg-brand-muted/3' aria-labelledby='what-is-heading'>
          <div className='container mx-auto px-4'>
            <SectionHeader number={1} title='What is accessible tourism research in Kenya?' subtitle='Accessible tourism research in Kenya documents verified wheelchair access. It provides travellers with mobility limitations the data they need to plan safe, dignified safaris.' />
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow'>
                  <dt className='font-semibold text-brand-dark text-lg'>Verified park access</dt>
                  <dd className='text-muted-foreground leading-relaxed'>On-site audits confirm hydraulic lift compatibility and step-free observation points at major Kenyan parks.</dd>
                </div>
                <div className='flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow'>
                  <dt className='font-semibold text-brand-dark text-lg'>Accessible lodge data</dt>
                  <dd className='text-muted-foreground leading-relaxed'>Roll-in shower, grab bar, and pathway verification for partner lodges across Kenya&apos;s safari circuit.</dd>
                </div>
                <div className='flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow'>
                  <dt className='font-semibold text-brand-dark text-lg'>Vehicle accessibility</dt>
                  <dd className='text-muted-foreground leading-relaxed'>Lift capacity, restraint system, and seating measurements for safari vehicles used in research areas.</dd>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Research Method */}
        <section id='our-research-method' className='py-24 bg-white' aria-labelledby='method-heading'>
          <div className='container mx-auto px-4'>
            <SectionHeader number={2} title='How does JaeTravel verify accessibility data?' subtitle='Our research follows the JaeTravel Verification Methodology (JASM-1.0). Every data point is confirmed through on-site audit before publication.' />
            <div className='relative max-w-3xl mx-auto'>
              <ol className='relative z-10 space-y-8'>
                {[
                  'Site visit.',
                  'We audit park entry points, vehicle lifts, and lodge bathrooms for accessibility compliance.',
                  'Measurements are recorded: lift capacity, door widths, shower dimensions, and pathway grades.',
                  'Guides are interviewed about disability training and emergency procedures.',
                  'Data is published only after two independent verifiers confirm each finding.',
                ].map((text, i) => {
                  const isFirst = i === 0;
                  const isLast = i === 4;
                  return (
                    <li key={i} className='relative pl-12 group'>
                      <div className='absolute left-0 top-2 w-3 h-3 rounded-full bg-brand-orange group-hover:bg-orange-600 transition-colors'></div>
                      {isFirst ? (
                        <div className='absolute left-0 top-3 w-0.5 h-full bg-brand-orange/30'></div>
                      ) : isLast ? (
                        <div className='absolute left-0 top-0 w-0.5 h-3 bg-brand-orange/30'></div>
                      ) : (
                        <div className='absolute left-0 top-0 w-0.5 h-full bg-brand-orange/30'></div>
                      )}
                      <span className='text-brand-dark font-semibold text-lg'>{text.split('.')[0] + '.'}</span>
                      <span className='ml-1 text-muted-foreground leading-relaxed'>{text.slice(text.indexOf('.') + 1).trim()}</span>
                    </li>
                  );
                })}
              </ol>
              <div className='absolute inset-y-0 left-1 w-0.5 bg-brand-orange/20 rounded-full'></div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id='verified-parks' className='py-24 bg-brand-muted/3' aria-labelledby='parks-heading'>
          <div className='container mx-auto px-4'>
            <SectionHeader number={3} title='Which Kenyan parks have verified wheelchair access?' subtitle='Our research team audited major parks for lift compatibility, step-free viewing, and accessible facilities.' />
            <div className='overflow-x-auto rounded-2xl border border-border shadow-sm'>
              <table className='w-full text-left border-collapse text-sm'>
                <caption className='sr-only'>Verified wheelchair accessibility by Kenyan national park</caption>
                <thead className='bg-brand-dark'>
                  <tr>
                    <th scope='col' className='border border-border px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs'>National Park</th>
                    <th scope='col' className='border border-border px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs'>Hydraulic Lift Vehicle</th>
                    <th scope='col' className='border border-border px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs'>Step-Free Viewing</th>
                    <th scope='col' className='border border-border px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs'>Accessible Facilities</th>
                    <th scope='col' className='border border-border px-6 py-4 font-semibold text-white uppercase tracking-wider text-xs'>Verified</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-border bg-white'>
                  <tr className='hover:bg-brand-orange/5 transition-colors'>
                    <td className='border border-border px-6 py-4 font-medium text-brand-dark'>Masai Mara National Reserve</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4 text-brand-dark font-medium'>Limited</td>
                    <td className='border border-border px-6 py-4 text-brand-dark'>2026-09</td>
                  </tr>
                  <tr className='hover:bg-brand-orange/5 transition-colors'>
                    <td className='border border-border px-6 py-4 font-medium text-brand-dark'>Amboseli National Park</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4 text-brand-dark font-medium'>Limited</td>
                    <td className='border border-border px-6 py-4 text-brand-dark'>2026-09</td>
                  </tr>
                  <tr className='hover:bg-brand-orange/5 transition-colors'>
                    <td className='border border-border px-6 py-4 font-medium text-brand-dark'>Tsavo East & West</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4 text-brand-dark font-medium'>Partial</td>
                    <td className='border border-border px-6 py-4 text-brand-dark font-medium'>Basic</td>
                    <td className='border border-border px-6 py-4 text-brand-dark'>2026-08</td>
                  </tr>
                  <tr className='hover:bg-brand-orange/5 transition-colors'>
                    <td className='border border-border px-6 py-4 font-medium text-brand-dark'>Samburu National Reserve</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4 text-brand-dark font-medium'>Partial</td>
                    <td className='border border-border px-6 py-4 text-brand-dark font-medium'>Basic</td>
                    <td className='border border-border px-6 py-4 text-brand-dark'>2026-08</td>
                  </tr>
                  <tr className='hover:bg-brand-orange/5 transition-colors'>
                    <td className='border border-border px-6 py-4 font-medium text-brand-dark'>Lake Nakuru National Park</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4'><Check className='h-4 w-4 text-brand-orange mr-2' /> Yes</td>
                    <td className='border border-border px-6 py-4 text-brand-dark font-medium'>Good</td>
                    <td className='border border-border px-6 py-4 text-brand-dark'>2026-07</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Accessible Lodges */}
        <section id='accessible-lodges' className='py-24 bg-white' aria-labelledby='lodges-heading'>
          <div className='container mx-auto px-4'>
            <SectionHeader number={4} title='Are there accessible lodges in Kenya?' subtitle='Partner lodges are audited for roll-in showers, grab bars, and accessible pathways before we recommend them.' />
            <div className='grid md:grid-cols-3 gap-6'>
              {[
                {
                  title: 'Roll-in Shower Verified',
                  body: 'Partner lodges with roll-in showers, grab bars, and step-free bathroom access confirmed by audit.',
                  icon: Shield,
                },
                {
                  title: 'Accessible Pathways',
                  body: 'Lodge grounds with level pathways, ramp access to dining areas, and accessible parking confirmed.',
                  icon: MapPin,
                },
                {
                  title: 'Trained Staff',
                  body: 'Lodge staff trained in disability awareness and emergency procedures for travellers with mobility needs.',
                  icon: Users,
                },
              ].map(({ title, body, icon: Icon }, i) => (
                <FeatureCard key={i} icon={Icon} title={title} body={body} />
              ))}
            </div>
          </div>
        </section>

        {/* Accessible Vehicles */}
        <section id='accessible-vehicles' className='py-24 bg-brand-muted/3' aria-labelledby='vehicles-heading'>
          <div className='container mx-auto px-4'>
            <SectionHeader number={5} title='What accessible safari vehicles are verified?' subtitle='Safari vehicles are tested for hydraulic lift capacity, restraint systems, and wheelchair seating measurements.' />
            <div className='grid md:grid-cols-3 gap-6'>
              {[
                {
                  title: 'Hydraulic Lift',
                  body: 'Vehicles with German-engineered hydraulic lifts rated to 350-400kg for power chair users.',
                  icon: Car,
                },
                {
                  title: "Q'Straint Restraints",
                  body: 'Medical-grade 4-point wheelchair restraint systems tested to 20G impact standards.',
                  icon: Shield,
                },
                {
                  title: 'Pop-Up Roof Viewing',
                  body: 'Full pop-up roofs allow 360-degree game viewing while remaining seated in a wheelchair.',
                  icon: Compass,
                },
              ].map(({ title, body, icon: Icon }, i) => (
                <FeatureCard key={i} icon={Icon} title={title} body={body} />
              ))}
            </div>
          </div>
        </section>

        {/* How to Use This Research */}
        <section id='how-to-use-this-research' className='py-24 bg-white' aria-labelledby='how-to-use-heading'>
          <div className='container mx-auto px-4'>
            <SectionHeader number={6} title='How do I use this accessibility research?' subtitle='Follow these steps to plan an accessible safari using our verified data.' />
            <div className='relative max-w-2xl mx-auto'>
              <ol className='relative z-10 space-y-6'>
                {[
                  { step: '1', title: 'Choose your parks.', body: 'Review the verified accessibility table above for lift and viewing compatibility.' },
                  { step: '2', title: 'Contact us.', body: 'Tell us your dates, group size, and accessibility needs.' },
                  { step: '3', title: 'Get your itinerary.', body: 'Receive a custom itinerary using only verified-accessible lodges and vehicles.' },
                  { step: '4', title: 'Travel.', body: 'Travel with disability-trained guides on confirmed accessible routes.' },
                ].map(({ step, title, body }, i) => (
                  <li key={i} className='relative pl-16 group'>
                    <div className='absolute left-0 top-1 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow'>
                      {step}
                    </div>
                    <h4 className='text-brand-dark font-semibold text-lg mb-1'>{title}</h4>
                    <p className='text-muted-foreground leading-relaxed'>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id='faqs' className='py-24 bg-brand-muted/3' aria-labelledby='faqs-heading'>
          <div className='container mx-auto px-4'>
            <SectionHeader number={7} title='Frequently Asked Questions About Accessible Tourism Research' subtitle='Everything you need to know about our Kenya safari accessibility data.' />
            <Accordion type='single' collapsible className='w-full max-w-2xl mx-auto'>
              {[
                {
                  q: 'What is accessible tourism research in Kenya?',
                  a: 'Accessible tourism research in Kenya documents verified wheelchair access across national parks, lodges, vehicles, and tour operators for travellers with mobility limitations.',
                },
                {
                  q: 'How does JaeTravel verify accessibility data?',
                  a: 'We use the JaeTravel Verification Methodology (JASM-1.0), which includes on-site audits, verified lodge roll-in shower checks, vehicle lift capacity tests, and guide training verification.',
                },
                {
                  q: 'Which parks have verified wheelchair access?',
                  a: 'Masai Mara, Amboseli, Tsavo, Samburu, and Lake Nakuru have verified wheelchair-accessible game drives with hydraulic lift vehicles and step-free observation points.',
                },
                {
                  q: 'Are there accessible lodges in Kenya?',
                  a: 'Yes. Partner lodges with roll-in showers, grab bars, and accessible pathways are documented in our research database and verified before recommendation.',
                },
              ].map(({ q, a }, i) => (
                <AccordionItem key={i} value={'q' + (i + 1)} className='border border-border rounded-2xl bg-background transition-all hover:border-brand-orange/50'>
                  <AccordionTrigger className='flex items-center justify-between p-6 text-brand-dark font-semibold'>
                    <span>{q}</span>
                    <ChevronRight className='h-4 w-4 text-brand-orange transition-transform' />
                  </AccordionTrigger>
                  <AccordionContent className='p-6 text-muted-foreground leading-relaxed'>
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CitationWidget (preserved from original) */}
        <section className='py-16 bg-background border-t border-border'>
          <div className='container mx-auto px-4'>
            <div className='max-w-2xl mx-auto border-l-6 border-brand-orange pl-8 py-8 rounded-xl bg-brand-orange/5 shadow-sm'>
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center text-white shrink-0'>
                  <Sparkles className='h-5 w-5' />
                </div>
                <div>
                  <p className='font-semibold text-brand-dark text-lg'>JaeTravel Verification Methodology (JASM-1.0)</p>
                  <p className='text-brand-dark/70 mt-1 text-sm'>Source: Internal Research Document (2026-09-24)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Freshness stamp */}
        <div className='container mx-auto px-4 py-8 text-center'>
          <time dateTime={NOW} className='inline-flex items-center gap-2 text-xs text-brand-dark/50 font-medium'>
            <Calendar className='h-3 w-3' />
            Last updated: {NOW}
          </time>
        </div>

      </main>

      {/* Related Resources - Internal Links */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-4">
              <ChevronRight className="h-3 w-3" /> Related Resources
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-white">More Accessibility Research</h2>
            <p className="text-brand-muted/70">Explore our other accessibility research pages for more verified data.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Accessible Safaris",
                href: "/accessible-safaris",
                description: "Book a wheelchair-accessible safari with verified vehicles and guides.",
              },
              {
                title: "Safari Index",
                href: "/accessible-safari-index",
                description: "Browse all verified accessible safari options across East Africa.",
              },
              {
                title: "Research Methodology",
                href: "/accessible-safari-methodology",
                description: "Learn about our JASM-1.0 verification methodology and audit process.",
              },
              {
                title: "2026 Accessibility Report",
                href: "/accessible-safari-report-2026",
                description: "Read our annual report on wheelchair access in Kenya safari tourism.",
              },
            ].map(({ title, href, description }, i) => (
              <Card key={i} className="border-brand-orange/30 hover:border-brand-orange hover:bg-brand-orange/5 transition-all group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-brand-muted/70 leading-relaxed">{description}</CardContent>
                <CardFooter className="pt-4">
                  <Link
                    href={href}
                    className="text-brand-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-colors"
                  >
                    Learn more <span className="text-xs">→</span>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className='py-24 bg-brand-dark text-white relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10 bg-[url("https://www.transparenttextures.com/patterns/africa.png")]'></div>
        <div className='relative container mx-auto px-4'>
          <div className='max-w-2xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6'>
              <Calendar className='h-3 w-3' /> Ready to Travel
            </div>
            <h2 className='mb-6 font-serif text-4xl font-bold text-white'>Plan Your Accessible Safari</h2>
            <p className='mb-10 text-brand-muted/80 leading-relaxed text-lg'>
              Use our verified research data to plan a safe, dignified safari with JaeTravel Expeditions.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' className='bg-brand-orange hover:bg-orange-600 text-white font-semibold px-12 py-4 shadow-xl shadow-orange-500/40 transition-all hover:shadow-orange-500/60'>
                Request Accessible Safari Quote
              </Button>
              <Button size='lg' variant='outline' className='border-white text-white hover:bg-white px-12 py-4 font-semibold transition-all'>
                View Full Research Data
              </Button>
            </div>
            <p className='mt-10 text-xs text-brand-muted/60 uppercase tracking-widest font-semibold'>
              JASM-1.0 Verified • KATO Certified • Nairobi, Kenya • Research Since 2024
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
