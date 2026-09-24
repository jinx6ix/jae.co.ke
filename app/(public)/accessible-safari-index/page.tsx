import type { Metadata } from 'next';
import { AccessibleNav } from '@/components/AccessibleNav';
import { CitationWidget } from '@/components/CitationWidget';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Kenya Accessible Safari Index 2026',
  description: 'Evidence-based index of wheelchair accessible safari vehicles and destinations in Kenya.',
  alternates: {
      canonical: 'https://www.jaetravel.co.ke/accessible-safari-index',
  },
};

export default function AccessibleSafariIndexPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <JsonLd data={{
          "@type": "Dataset",
          "name": "Kenya Accessible Safari Index 2026",
          "description": "Evidence-based index of wheelchair accessible safari vehicles and destinations in Kenya.",
          "url": "https://www.jaetravel.co.ke/accessible-safari-index"
      }} />
      <AccessibleNav />
      <h1 className="text-4xl font-bold mb-6">Kenya Accessible Safari Index 2026</h1>
      <p className="text-lg text-gray-700 mb-6">
        A comprehensive index of safari destinations and vehicles in Kenya, mapped against accessibility verification criteria.
      </p>

      <div className="p-4 bg-gray-100 rounded">
        <p>Index data is currently being populated based on the JASM-1.0 Verification Methodology.</p>
      </div>

      <CitationWidget
        title="Kenya Accessible Safari Index Data"
        source="JaeTravel Internal Dataset"
        date="2026-09-24"
      />
    </div>
  );
}
