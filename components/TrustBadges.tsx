// components/TrustBadges.tsx
import React from 'react';

const TrustBadges = () => {
  const badges = [
    { name: 'Kenya Tourism Board', logo: '/logos/ktb.svg', description: 'Licensed Tour Operator' },
    { name: 'TATO', logo: '/logos/tato.svg', description: 'Tanzania Association' },
    { name: 'SafariBookings', logo: '/logos/safaribookings.svg', description: 'Excellent Rated 4.9' },
    { name: 'Tripadvisor', logo: '/logos/tripadvisor.svg', description: 'Certificate of Excellence' },
    { name: 'Ecotourism Kenya', logo: '/logos/ecotourism.svg', description: 'Sustainable Tourism' },
    { name: 'IATA', logo: '/logos/iata.svg', description: 'Accredited Travel Agent' },
  ];

  return (
    <section className="mb-20 py-12 border-y border-gray-200">
      <h3 className="text-center text-gray-600 mb-8">Trusted by global travelers — Licensed & Accredited</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {badges.map((badge, index) => (
          <div key={index} className="text-center group">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl p-4 mb-2 mx-auto group-hover:shadow-md transition">
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                {badge.name}
              </div>
            </div>
            <p className="text-xs font-medium text-gray-700">{badge.name}</p>
            <p className="text-xs text-gray-500">{badge.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;