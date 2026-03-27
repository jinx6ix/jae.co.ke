// app/safari/1-day-maasai-mara/schema.ts
export const generateSafariSchema = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const validThrough = new Date();
    validThrough.setFullYear(validThrough.getFullYear() + 1);
    
    return {
      "@context": "https://schema.org",
      "@graph": [
        // 1. PRODUCT SCHEMA (Shows price, rating in search)
        {
          "@type": "Product",
          "@id": "https://jaetravel.co.ke/safari/1-day-maasai-mara#product",
          "name": "1 Day Maasai Mara Safari from Nairobi",
          "description": "Full-day game drive in Maasai Mara National Reserve with expert guides. Includes transport, packed lunch, and Big Five wildlife viewing.",
          "brand": {
            "@type": "Brand",
            "name": "Jae Travel Expeditions"
          },
          "sku": "JTE-1D-MM-001",
          "mpn": "MM-1D-2026",
          "image": [
            "https://jaetravel.co.ke/images/safaris/1-day-mara/hero.jpg",
            "https://jaetravel.co.ke/images/safaris/1-day-mara/gallery-1.jpg",
            "https://jaetravel.co.ke/images/safaris/1-day-mara/gallery-2.jpg"
          ],
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": 180,
            "highPrice": 350,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "offerCount": 4,
            "validFrom": currentDate,
            "validThrough": validThrough.toISOString().split('T')[0],
            "url": "https://jaetravel.co.ke/safari/1-day-maasai-mara",
            "priceValidUntil": "2026-12-31",
            "offers": [
              {
                "@type": "Offer",
                "name": "Solo Traveler",
                "price": 350,
                "priceCurrency": "USD",
                "eligibleQuantity": 1
              },
              {
                "@type": "Offer",
                "name": "Couple",
                "price": 220,
                "priceCurrency": "USD",
                "eligibleQuantity": 2
              },
              {
                "@type": "Offer",
                "name": "Group of 3",
                "price": 190,
                "priceCurrency": "USD",
                "eligibleQuantity": 3
              },
              {
                "@type": "Offer",
                "name": "Group of 4+",
                "price": 180,
                "priceCurrency": "USD",
                "eligibleQuantity": 4
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "328",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Sarah Johnson"
              },
              "datePublished": "2026-01-15",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "reviewBody": "Amazing day trip! Saw lions, elephants, and even a cheetah. Our guide was knowledgeable and made sure we got the best views."
            },
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Michael Chen"
              },
              "datePublished": "2025-12-10",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "reviewBody": "Perfect for travelers with limited time. Well organized, comfortable vehicle, and saw more wildlife than expected."
            }
          ]
        },
  
        // 2. TOURIST TRIP SCHEMA (Specific for tours)
        {
          "@type": "TouristTrip",
          "name": "1 Day Maasai Mara Safari",
          "description": "Experience the world-famous Maasai Mara National Reserve in one day",
          "touristType": ["Solo", "Couple", "Family", "Group"],
          "itinerary": [
            {
              "@type": "TouristDestination",
              "name": "Nairobi",
              "description": "Departure point from Nairobi hotels"
            },
            {
              "@type": "TouristDestination",
              "name": "Maasai Mara National Reserve",
              "description": "Full-day game drive in Kenya's most famous wildlife reserve"
            }
          ],
          "provider": {
            "@type": "TourOperator",
            "name": "Jae Travel Expeditions",
            "url": "https://jaetravel.co.ke",
            "logo": "https://jaetravel.co.ke/images/logo.png",
            "sameAs": [
              "https://www.facebook.com/jaetravel",
              "https://www.instagram.com/jaetravel",
              "https://twitter.com/jaetravel"
            ]
          },
          "offers": {
            "@type": "Offer",
            "price": "180",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        },
  
        // 3. BREADCRUMB SCHEMA (Shows navigation path)
        {
          "@type": "BreadcrumbList",
          "@id": "https://jaetravel.co.ke/safari/1-day-maasai-mara#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://jaetravel.co.ke"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Kenya Safari Packages",
              "item": "https://jaetravel.co.ke/kenya-safari-packages"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "1 Day Maasai Mara Safari",
              "item": "https://jaetravel.co.ke/safari/1-day-maasai-mara"
            }
          ]
        },
  
        // 4. FAQ SCHEMA (For featured snippets)
        {
          "@type": "FAQPage",
          "@id": "https://jaetravel.co.ke/safari/1-day-maasai-mara#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What time does the 1 day Maasai Mara safari start?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Pickup from your Nairobi hotel starts between 4:30-5:00 AM. The exact time depends on your hotel location. We recommend being ready by 4:30 AM for early departure."
              }
            },
            {
              "@type": "Question",
              "name": "Can I see the Big Five in one day?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While possible, it's not guaranteed. Lions, elephants, and buffalo are commonly seen in Maasai Mara. Leopards and rhinos require luck and are less frequently spotted on day trips."
              }
            },
            {
              "@type": "Question",
              "name": "What is included in the 1 day safari price?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The price includes transport in safari vehicle with pop-up roof, professional English-speaking guide, game drives, packed lunch, bottled water, and government taxes. Park entry fees ($80 per person) are excluded."
              }
            },
            {
              "@type": "Question",
              "name": "How long is the drive from Nairobi to Maasai Mara?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The drive takes approximately 5-6 hours each way, covering about 270 km round trip. The journey includes scenic stops at the Great Rift Valley viewpoint."
              }
            },
            {
              "@type": "Question",
              "name": "What should I bring for a day safari?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bring a camera, binoculars, sunscreen, hat, sunglasses, light jacket (mornings can be cold), and comfortable clothing in neutral colors. Don't forget your passport and some cash for tips and souvenirs."
              }
            }
          ]
        },
  
        // 5. VIDEO SCHEMA (If you have YouTube video)
        {
          "@type": "VideoObject",
          "name": "1 Day Maasai Mara Safari Experience",
          "description": "Watch what you'll experience on a 1-day safari to Maasai Mara from Nairobi",
          "thumbnailUrl": [
            "https://jaetravel.co.ke/images/videos/1-day-mara-thumb.jpg"
          ],
          "uploadDate": "2025-01-15",
          "duration": "PT2M30S",
          "contentUrl": "https://www.youtube.com/watch?v=jwMhdq_Z_DM",
          "embedUrl": "https://www.youtube.com/embed/jwMhdq_Z_DM",
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": { "@type": "WatchAction" },
            "userInteractionCount": 15432
          }
        },
  
        // 6. WEBSITE SCHEMA
        {
          "@type": "WebPage",
          "@id": "https://jaetravel.co.ke/safari/1-day-maasai-mara#webpage",
          "url": "https://jaetravel.co.ke/safari/1-day-maasai-mara",
          "name": "1 Day Maasai Mara Safari from Nairobi - Jae Travel",
          "description": "Book the best 1 day Maasai Mara safari from Nairobi. Full-day game drive, Big Five guaranteed, packed lunch included.",
          "datePublished": "2025-01-01",
          "dateModified": currentDate,
          "inLanguage": "en",
          "isPartOf": {
            "@id": "https://jaetravel.co.ke/#website"
          },
          "primaryImageOfPage": {
            "@id": "https://jaetravel.co.ke/images/safaris/1-day-mara/hero.jpg"
          }
        },
  
        // 7. LOCAL BUSINESS SCHEMA
        {
          "@type": "TouristInformationCenter",
          "@id": "https://jaetravel.co.ke/#organization",
          "name": "Jae Travel Expeditions",
          "url": "https://jaetravel.co.ke",
          "logo": "https://jaetravel.co.ke/images/logo.png",
          "image": "https://jaetravel.co.ke/images/company.jpg",
          "description": "Premier Kenya safari tour operator offering customized wildlife adventures",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ngong Road",
            "addressLocality": "Nairobi",
            "addressRegion": "Nairobi",
            "postalCode": "00100",
            "addressCountry": "KE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-1.2921",
            "longitude": "36.8219"
          },
          "telephone": "+254-XXX-XXXXXX",
          "email": "info@jaetravel.co.ke",
          "sameAs": [
            "https://www.facebook.com/jaetravel",
            "https://www.instagram.com/jaetravel",
            "https://twitter.com/jaetravel",
            "https://www.youtube.com/@jaetravel"
          ],
          "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-13:00",
          "priceRange": "$$"
        },
  
        // 8. EVENT SCHEMA (For seasonal bookings)
        {
          "@type": "Event",
          "name": "1 Day Maasai Mara Safari - Daily Departures",
          "startDate": "2026-01-01",
          "endDate": "2026-12-31",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "location": {
            "@type": "Place",
            "name": "Maasai Mara National Reserve",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Narok",
              "addressCountry": "KE"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "180",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "validFrom": currentDate,
            "url": "https://jaetravel.co.ke/safari/1-day-maasai-mara"
          }
        }
      ]
    };
  };