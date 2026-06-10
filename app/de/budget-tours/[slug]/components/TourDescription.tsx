"use client";

export default function TourDescription({ tour }: { tour: any }) {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="whitespace-pre-line text-gray-700 leading-relaxed">
        {tour.longDescription}
      </p>
    </div>
  );
}