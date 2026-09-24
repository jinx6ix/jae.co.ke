import type { Metadata } from 'next';
import { AccessibleNav } from '@/components/AccessibleNav';
import { CitationWidget } from '@/components/CitationWidget';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Kenya Accessible Safari Report 2026',
  description: 'The state of accessible safari tourism in Kenya: challenges, and emerging solutions.',
  alternates: {
      canonical: 'https://www.jaetravel.co.ke/accessible-safari-report-2026',
  },
};

export default function AccessibleSafariReport2026Page() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <JsonLd data={{
          "@type": "Article",
          "name": "Kenya Accessible Safari Report 2026",
          "description": "The state of accessible safari tourism in Kenya: challenges, and emerging solutions.",
          "url": "https://www.jaetravel.co.ke/accessible-safari-report-2026"
      }} />
      <AccessibleNav />
      <h1 className="text-4xl font-bold mb-6">Kenya Accessible Safari Report 2026</h1>
      <p className="text-lg text-gray-700 mb-6">
        The state of accessible tourism in Kenya's safari sector: gaps, challenges, and emerging solutions for mobility-impaired travellers.
      </p>

      <div className="border border-gray-200 p-6 rounded mb-6">
        <h2 className="text-2xl font-semibold mb-3">Key Themes</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Physical accessibility of game drive vehicles</li>
          <li>Lodge and camp infrastructure</li>
          <li>Staff training and assistance capabilities</li>
          <li>Regulatory landscape and standards in Kenya</li>
        </ul>
      </div>

      <CitationWidget
        title="Kenya Accessible Safari Report (Draft)"
        source="JaeTravel Research"
        date="2026-09-24"
      />
    </div>
  );
}
