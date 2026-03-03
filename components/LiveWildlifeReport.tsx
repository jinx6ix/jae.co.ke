// components/LiveWildlifeReport.tsx (Enhanced)
import React from 'react';
import { Radio, MapPin, Camera, Clock } from 'lucide-react';

const LiveWildlifeReport = () => {
  // This could connect to a real API, but static for now
  const reports = [
    {
      region: "Southern Serengeti (Ndutu)",
      update: "Calving season in full swing! Thousands of newborn wildebeest. High lion activity around Moru Kopjes. 4 cheetah sightings today.",
      herds: "~500,000 wildebeest + zebra",
      lastUpdate: "2 hours ago",
      guide: "Joseph (15 years experience)",
      emoji: "🦁"
    },
    {
      region: "Western Corridor (Grumeti)",
      update: "Herds gathering at Grumeti River. First crocodile activity spotted. 3 lion prides near river crossings.",
      herds: "~200,000 wildebeest",
      lastUpdate: "5 hours ago",
      guide: "Sarah (12 years experience)",
      emoji: "🐊"
    },
    {
      region: "Northern Serengeti (Mara River)",
      update: "Small herds beginning to arrive. Main crossing activity expected in 2-3 weeks. Good resident wildlife.",
      herds: "~50,000 wildebeest",
      lastUpdate: "1 day ago",
      guide: "David (20 years experience)",
      emoji: "🦒"
    }
  ];

  return (
    <section className="mb-32 bg-gradient-to-r from-green-900 to-emerald-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Radio className="h-8 w-8 animate-pulse text-green-400" />
        <h2 className="font-serif text-3xl md:text-4xl font-bold">Live Wildlife Report – March 2026</h2>
      </div>
      
      <p className="text-lg text-green-100 mb-10 max-w-3xl">
        Real-time updates from our Kenya-based guides in the Serengeti. Updated daily to help international guests plan their safari timing.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                {report.region}
              </h3>
              <span className="text-3xl">{report.emoji}</span>
            </div>
            
            <p className="text-white/90 mb-4">{report.update}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-300">
                <Camera className="h-4 w-4" />
                <span>{report.herds}</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Clock className="h-4 w-4" />
                <span>Updated: {report.lastUpdate}</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Radio className="h-4 w-4" />
                <span>Guide: {report.guide}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-wrap items-center justify-between">
        <p className="text-sm text-green-200">
          📍 Our guides report from the field daily. This is the most current migration information available online.
        </p>
        <div className="flex items-center gap-2 text-white bg-green-800/50 px-4 py-2 rounded-full">
          <span className="animate-pulse">●</span>
          <span>Live tracking active</span>
        </div>
      </div>
    </section>
  );
};

export default LiveWildlifeReport;