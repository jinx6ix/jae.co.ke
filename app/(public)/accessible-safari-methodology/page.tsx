import type { Metadata } from 'next';
import { AccessibleNav } from '@/components/AccessibleNav';
import { CitationWidget } from '@/components/CitationWidget';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'JaeTravel Accessible Safari Verification Methodology (JASM-1.0)',
  description: 'Rigorous verification methodology for accessibility claims in the Kenya safari ecosystem.',
  alternates: {
      canonical: 'https://www.jaetravel.co.ke/accessible-safari-methodology',
  },
};

export default function AccessibleSafariMethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <JsonLd data={{
          "@type": "WebPage",
          "name": "JaeTravel Accessible Safari Verification Methodology (JASM-1.0)",
          "description": "Rigorous verification methodology for accessibility claims in the Kenya safari ecosystem.",
          "url": "https://www.jaetravel.co.ke/accessible-safari-methodology"
      }} />
      <AccessibleNav />
      <h1 className="text-4xl font-bold mb-6">JaeTravel Accessible Safari Verification Methodology (JASM-1.0)</h1>
      <p className="text-lg text-gray-700 mb-6">
        Our verification methodology ensures that accessibility claims are backed by rigorous, evidence-based assessment.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Verification Levels</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>A: On-Site</strong> - JaeTravel representative physically verified accessibility.</li>
            <li><strong>B: Documentary</strong> - Evidence (e.g. photos/videos/floorplans) reviewed.</li>
            <li><strong>C: Operator Confirmed</strong> - Reliable local operators confirmed specific accessibility features.</li>
            <li><strong>D: Third-Party</strong> - Vetted reports from verified third-party accessibility specialists.</li>
            <li><strong>E: Traveler Report</strong> - First-hand experience reported by mobility-impaired traveler.</li>
            <li><strong>F: Unknown</strong> - Preliminary data, pending verification.</li>
        </ul>
      </section>

      <CitationWidget
        title="JASM-1.0 Technical Specification"
        source="Internal Research Document"
        date="2026-09-24"
      />
    </div>
  );
}
