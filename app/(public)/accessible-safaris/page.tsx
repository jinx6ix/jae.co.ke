import type { Metadata } from 'next';
import { AccessibleNav } from '@/components/AccessibleNav';
import { CitationWidget } from '@/components/CitationWidget';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Accessible Safaris Directory',
  description: 'Verified accessible safari packages for travellers with mobility limitations.',
  alternates: {
      canonical: 'https://www.jaetravel.co.ke/accessible-safaris',
  },
};

export default function AccessibleSafarisPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <JsonLd data={{
          "@type": "Dataset",
          "name": "Accessible Safaris Directory",
          "description": "Verified accessible safari packages for travellers with mobility limitations.",
          "url": "https://www.jaetravel.co.ke/accessible-safaris",
      }} />
      <AccessibleNav />
      <h1 className="text-4xl font-bold mb-6">Accessible Safaris</h1>
      <p className="text-lg text-gray-700 mb-6">
        Discover safari packages tailored for travellers with mobility limitations. These include vehicles verified for accessibility.
      </p>

      <div className="bg-amber-50 p-6 rounded border border-amber-200">
        <h2 className="text-xl font-semibold mb-2">Research Insight</h2>
        <p>Our database of accessible safari vehicles and destinations is growing. We prioritize evidence-based verification for all listings.</p>
      </div>

      <CitationWidget
        title="Accessible Safaris Data Overview"
        source="JaeTravel Internal Dataset"
        date="2026-09-24"
      />
    </div>
  );
}
