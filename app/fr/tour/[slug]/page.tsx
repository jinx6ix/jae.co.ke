// app/fr/tour/[slug]/page.tsx
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { Tour } from '@/types/tour';

// Read the JSON file from the /data/ directory
async function getTourData(slug: string): Promise<Tour | undefined> {
  const filePath = path.join(process.cwd(), 'data', 'french_tour_pages.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const tours: Tour[] = JSON.parse(jsonData);
  return tours.find((tour) => tour.slug === slug);
}

// Generate static paths for each tour
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'french_tour_pages.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const tours: Tour[] = JSON.parse(jsonData);
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = await getTourData(params.slug);

  if (!tour) {
    return {
      title: 'Tour non trouvé',
      description: 'La page demandée n’existe pas.',
    };
  }

  return {
    title: tour.metaTitle,
    description: tour.metaDescription,
    keywords: tour.keywords.join(', '),
  };
}

// Dynamic page component
export default async function TourPage({ params }: { params: { slug: string } }) {
  const tour = await getTourData(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="tour-page container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
      {tour.image && (
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-64 object-cover mb-4"
        />
      )}
      <p className="text-lg mb-4">{tour.description}</p>
      <p className="mb-2">
        <strong>Prix :</strong> {tour.price} {tour.currency}
      </p>
      <p className="mb-2">
        <strong>Note :</strong> {tour.rating} ({tour.reviewCount} avis)
      </p>
      <p className="mb-2">
        <strong>Itinéraire :</strong> {tour.itinerary}
      </p>
      <p className="mb-2">
        <strong>Région :</strong> {tour.region}
      </p>
      <p className="mb-2">
        <strong>Pays :</strong> {tour.country}
      </p>
      <a
        href={tour.bookingUrl}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Réserver maintenant
      </a>
    </div>
  );
}