// app/budget-tours/[slug]/components/ImageGallery.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="py-8">
        <h3 className="mb-6 text-center text-2xl font-bold">Tour Gallery</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((src, index) => (
            <button
              title="Open image in modal"
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsModalOpen(true);
              }}
              className="relative aspect-square overflow-hidden rounded-lg transition-transform hover:scale-105"
            >
              <Image
                src={src}
                alt={`Tour image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            title="Close modal"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 z-10 text-white"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            title="Previous image"
            onClick={prevImage}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <div className="relative h-[80vh] w-[90vw]">
            <Image
              src={images[currentIndex]}
              alt={`Tour image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          
          <button
            title="Next image"
            onClick={nextImage}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}