import type { Metadata } from 'next';
import { AccessibleNav } from '@/components/AccessibleNav';
import { CitationWidget } from '@/components/CitationWidget';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Accessible Tourism Research Kenya',
  description: 'Evidence-based research on accessibility in the Kenya safari ecosystem.',
  alternates: {
      canonical: 'https://www.jaetravel.co.ke/accessible-tourism-research',
  },
};

export default function AccessibleTourismResearchPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <JsonLd data={{
          "@type": "WebPage",
          "name": "Accessible Tourism Research Kenya",
          "description": "Evidence-based research on accessibility in the Kenya safari ecosystem.",
          "url": "https://www.jaetravel.co.ke/accessible-tourism-research"
      }} />
      <AccessibleNav />
      <h1 className="text-4xl font-bold mb-6">Accessible Tourism Research</h1>
      <p className="text-lg text-gray-700 mb-4">
        Our research platform is dedicated to evidence-based documentation of wheelchair access in the Kenya safari ecosystem.
      </p>
      <h2 className="text-2xl font-semibold mb-3">Our Objective</h2>
      <p className="text-gray-700 mb-6">
        To provide accurate, verified information about accessibility for travellers with mobility limitations in Kenya&apos;s tourism infrastructure.
      </p>

      <CitationWidget
        title="JaeTravel Verification Methodology (JASM-1.0)"
        source="Internal Research Document"
        date="2026-09-24"
      />
    </div>
  );
}
