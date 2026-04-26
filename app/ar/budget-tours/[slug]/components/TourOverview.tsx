// app/budget-tours/[slug]/components/TourOverview.tsx

interface TourOverviewProps {
    tour: {
      shortDescription: string;
    };
  }
  
  export default function TourOverview({ tour }: TourOverviewProps) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center font-serif text-3xl font-bold">
              Tour Overview
            </h2>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <p className="text-lg leading-relaxed text-gray-700">
                {tour.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }