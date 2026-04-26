// app/ar/budget-tours/[slug]/components/TourCTA.tsx

interface TourCTAProps {
  tour: any;
  variant?: 'desktop' | 'mobile' | 'sticky';
}

export default function TourCTA({ tour, variant = 'desktop' }: TourCTAProps) {
  if (variant === 'mobile') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50 flex justify-between items-center gap-3">
        <div>
          <p className="text-xs text-gray-500">تبدأ من</p>
          <p className="text-xl font-bold">${tour.price}</p>
        </div>
        <a href={tour.bookingUrl} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">احجز الآن</a>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 bg-white border-t p-4 shadow-md flex justify-between items-center flex-wrap gap-3">
      <div>
        <p className="text-sm text-gray-500">سعر الباقة</p>
        <p className="text-2xl font-bold">${tour.price} <span className="text-sm font-normal">للفرد</span></p>
      </div>
      <a href={tour.bookingUrl} className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700">
        احجز هذه الرحلة
      </a>
    </div>
  );
}