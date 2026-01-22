// app/budget-tours/[slug]/components/TourItinerary.tsx

interface TourItineraryProps {
    tour: {
      duration: string;
      itinerary: Array<{
        day: number;
        title: string;
        content: string;
      }>;
    };
  }
  
  export default function TourItinerary({ tour }: TourItineraryProps) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Detailed Itinerary - {tour.duration}
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {tour.itinerary.map((day) => (
                <div key={day.day} className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 md:left-8" />
                  
                  {/* Day card */}
                  <div className="relative ml-12 md:ml-16">
                    {/* Day number circle */}
                    <div className="absolute -left-12 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white md:-left-16 md:h-16 md:w-16">
                      <span className="text-lg font-bold md:text-xl">Day {day.day}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                      <h3 className="mb-4 text-2xl font-bold text-gray-900">
                        {day.title}
                      </h3>
                      <div className="space-y-4 text-gray-700">
                        {day.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }