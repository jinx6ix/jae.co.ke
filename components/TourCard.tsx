// components/TourCard.tsx (Enhanced version)
import React from 'react';
import Link from 'next/link';
import { Star, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';

interface TourCardProps {
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string;
  checkInText: string;
  href: string;
  badge?: string;

  showOriginalPrice?: boolean;
  pickup?: string;
}

const TourCard = ({ 
  title, 
  description, 
  price, 
  rating, 
  reviewCount, 
  location, 
  imageUrl, 
  checkInText, 
  href,
  badge,
  pickup
}: TourCardProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {badge && (
          <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {badge}
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {location}
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-300 text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm font-semibold">{rating}</span>
          <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        {pickup && (
          <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
            <Users className="h-4 w-4" />
            <span>Pickup: {pickup}</span>
          </div>
        )}
        
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold text-amber-600">${price}</span>
              <span className="text-gray-500 text-sm">/person</span>
            </div>
            <span className="text-sm text-gray-500">{checkInText}</span>
          </div>
          
          <Link href={href}>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;