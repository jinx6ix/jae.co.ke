import { notFound } from 'next/navigation';
import { tours } from '@/data/tours';
import BookingForm from '@/components/BookingForm';
import TourDetails from '@/components/TourDetails';

interface BookingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.bookingSlug,
  }));
}

export async function generateMetadata({ params }: BookingPageProps) {
  const resolvedParams = await params;
  const tour = tours.find((t) => t.bookingSlug === resolvedParams.slug);

  if (!tour) {
    return { title: 'Tour Not Found' };
  }

  return {
    title: `Book ${tour.title} | Jae Travel Expeditions`,
    description: tour.metaDescription,
    keywords: tour.keywords,
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const resolvedParams = await params;
  const tour = tours.find((t) => t.bookingSlug === resolvedParams.slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Adventure</h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete your booking for {tour.title}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="lg:order-2">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900">{tour.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {tour.currency} {tour.price.toLocaleString()}
                    </span>
                    {tour.isOnOffer && tour.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {tour.currency} {tour.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <span className="flex items-center">
                      ⭐ {tour.rating} ({tour.reviewCount} reviews)
                    </span>
                    <span className="mx-2">•</span>
                    <span>{tour.country}</span>
                  </div>
                </div>
              </div>

              <BookingForm tour={tour} />
            </div>
          </div>

          {/* Tour Details */}
          <div className="lg:order-1">
            <TourDetails tour={tour} />
          </div>
        </div>
      </div>
    </div>
  );
}
