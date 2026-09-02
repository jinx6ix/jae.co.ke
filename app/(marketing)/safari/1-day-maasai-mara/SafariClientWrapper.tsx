'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaDownload, FaCalendarAlt, FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SafariData {
  title: string;
  duration: string;
  price: {
    base: number;
    solo: number;
    couple: number;
    group3: number;
    group4plus: number;
  };
  startPoint: string;
  endPoint: string;
  highlights: string[];
  itinerary: Array<{
    day: number;
    time: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    imageAlt: string;
  }>;
  included: string[];
  excluded: string[];
  optional: Array<{
    name: string;
    price: number;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  reviews: Array<{
    name: string;
    country: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
  }>;
  images: {
    hero: string;
    gallery: string[];
  };
  video: {
    youtubeId: string;
    title: string;
  };
  pdfUrl: string;
}

interface SafariClientWrapperProps {
  safariData: SafariData;
}

export default function SafariClientWrapper({ safariData }: SafariClientWrapperProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(safariData.pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '1-day-maasai-mara-itinerary.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download itinerary. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] bg-black">
        <Image
          src={safariData.images.hero}
          alt="1 day Maasai Mara safari from Nairobi - Lions on game drive at sunrise in Kenya"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 text-white pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-orange-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <FaStar className="text-yellow-300" /> 4.8/5 (328 reviews)
                </span>
                <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-bold">
                  ✅ Best Price Guarantee
                </span>
                <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-bold">
                  🦁 Big Five Guaranteed
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl leading-tight">
                {safariData.title}
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 max-w-3xl text-gray-200">
                Experience Kenya's most famous wildlife reserve in just one day. 
                Full-day game drive • Expert guides • Big Five viewing
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">⏱️</span>
                  <div>
                    <div className="font-bold text-xl">{safariData.duration}</div>
                    <div className="text-sm text-gray-300">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">💰</span>
                  <div>
                    <div className="font-bold text-xl">From ${safariData.price.base}</div>
                    <div className="text-sm text-gray-300">per person</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🚐</span>
                  <div>
                    <div className="font-bold text-xl">Free Pickup</div>
                    <div className="text-sm text-gray-300">Nairobi hotels</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaDownload /> {isDownloading ? 'Downloading...' : 'Download Itinerary PDF'}
                </button>
                <Link
                  href="https://wa.me/254726485228"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={24} /> WhatsApp Inquiry
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {['overview', 'itinerary', 'pricing', 'gallery', 'reviews', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Section */}
      {activeTab === 'overview' && (
        <>
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Best 1 Day Maasai Mara Safari from Nairobi
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Looking for an unforgettable <strong>Kenya day safari</strong>? Our <strong>1 day Maasai Mara safari from Nairobi</strong> 
                is the perfect choice for travelers with limited time who don't want to miss Africa's most spectacular wildlife. 
                Experience a <strong>full-day game drive</strong> in the world-famous <strong>Maasai Mara National Reserve</strong>, 
                home to the <strong>Big Five</strong> (lion, leopard, elephant, buffalo, rhino) and over 500 bird species.
              </p>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center mb-12">
                Safari Highlights
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safariData.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-orange-500 text-2xl">✓</span>
                    <span className="text-gray-800 font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
                    <FaCheck className="text-green-600" /> What's Included
                  </h3>
                  <ul className="space-y-3">
                    {safariData.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
                    <FaTimes className="text-red-600" /> What's Excluded
                  </h3>
                  <ul className="space-y-3">
                    {safariData.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaTimes className="text-red-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Itinerary Section with Images */}
      {activeTab === 'itinerary' && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4">
              Your Safari Journey
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              A perfectly paced day safari designed to maximize wildlife viewing while ensuring comfort
            </p>

            <div className="space-y-12">
              {safariData.itinerary.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Step {index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{item.icon}</span>
                        <div>
                          <div className="text-sm text-orange-600 font-bold">{item.time}</div>
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">{item.description}</p>
                      <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaCalendarAlt />
                          <span>Day {item.day}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {activeTab === 'pricing' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4">
              Transparent Pricing
            </h2>
            <p className="text-center text-gray-600 mb-12">
              No hidden fees • Best price guaranteed
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Solo Traveler', price: safariData.price.solo, desc: 'Perfect for solo adventurers' },
                { label: 'Couple', price: safariData.price.couple, desc: 'Best for romantic getaways', best: true },
                { label: 'Group of 3', price: safariData.price.group3, desc: 'Great for small groups' },
                { label: 'Group 4+', price: safariData.price.group4plus, desc: 'Best value for groups' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                    item.best ? 'border-2 border-orange-500 transform scale-105 relative' : ''
                  }`}
                >
                  {item.best && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                      BEST VALUE
                    </div>
                  )}
                  <div className={`p-6 text-center ${item.best ? 'bg-orange-50' : 'bg-gray-50'}`}>
                    <h3 className="font-bold text-xl">{item.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <div className="p-8 text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      ${item.price}
                    </div>
                    <div className="text-sm text-gray-500 mb-6">per person</div>
                    <Link
                      href={`/booking/1-day-mara-${item.label.toLowerCase().replace(' ', '-')}`}
                      className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              * Park entry fees ($80 per person) are payable separately on the day
            </p>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {activeTab === 'gallery' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4">
              Safari Gallery
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Real moments from our 1 day Maasai Mara safaris
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {safariData.images.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`1 day Maasai Mara safari - Kenya wildlife safari photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-2xl">🔍</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {activeTab === 'reviews' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-2">
              Guest Reviews
            </h2>
            <div className="flex items-center justify-center gap-2 mb-12">
              <div className="flex text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-xl font-bold">4.8/5</span>
              <span className="text-gray-600">(328 verified reviews)</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safariData.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.country}</div>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-3">"{review.comment}"</p>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {activeTab === 'faq' && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Everything you need to know about your 1 day Maasai Mara safari
            </p>

            <div className="space-y-4">
              {safariData.faqs.map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group border rounded-lg open:bg-orange-50 transition-colors"
                >
                  <summary className="flex justify-between items-center cursor-pointer p-4 font-bold text-lg">
                    {faq.question}
                    <span className="text-orange-500 group-open:rotate-180 transition-transform text-xl">▼</span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Gallery image"
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-orange-500 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden z-50 shadow-lg">
        <div className="flex gap-2">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex-1 bg-orange-500 text-white text-center py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaDownload /> PDF
          </button>
          <Link
            href="https://wa.me/254726485228"
            className="flex-1 bg-green-500 text-white text-center py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </Link>
        </div>
      </div>
    </main>
  );
}