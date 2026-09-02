// app/budget-tours/[slug]/components/TourDescription.tsx

interface TourDescriptionProps {
    tour: {
      longDescription: string;
    };
  }
  
  export default function TourDescription({ tour }: TourDescriptionProps) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Detailed Tour Description
            </h2>
            <div className="prose prose-lg mx-auto max-w-none">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                {tour.longDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }