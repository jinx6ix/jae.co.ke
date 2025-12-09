import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Star, Award, Users, Shield, Heart, Zap, Globe, CheckCircle, Phone, Camera, TreePine, Droplets, Sun, CloudRain, Binoculars, Mountain, Waves } from "lucide-react"
import { faqSchema } from "./faq-schema"
import GreatMigrationVehicleCard from "./GreatMigrationVehicleCard"

// app/maasai-mara-great-migration/schema.ts
export const greatMigrationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization
    {
      "@type": "Organization",
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "JAE Travel Expeditions",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "telephone": "+254726485228",
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228"
      ]
    },

    // 2. LocalBusiness – This gives you the 5-star review rich snippet
    {
      "@type": "LocalBusiness",
      "@id": "https://www.jaetravel.co.ke/#business",
      "name": "JAE Travel – Wheelchair Accessible Great Migration Safaris Kenya",
      "description": "Kenya's only safari operator with custom wheelchair-accessible vehicles featuring hydraulic lifts for witnessing the Maasai Mara Great Wildebeest Migration river crossings.",
      "url": "https://www.jaetravel.co.ke/maasai-mara-great-migration",
      "telephone": "+254726485228",
      "image": "https://www.jaetravel.co.ke/masai-mara-migration.jpg",
      "address": { "@type": "PostalAddress", "addressCountry": "KE" },

      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "723",
        "ratingCount": "723"
      },

      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sarah M." },
          "datePublished": "2024-09-15",
          "reviewBody": "As a paraplegic, I never thought I'd see a Mara River crossing live. JAE Travel's hydraulic lift vehicle worked perfectly on steep banks. I saw three crossings in one morning — life-changing."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "James K." },
          "datePublished": "2025-08-20",
          "reviewBody": "The medical fridge kept my medication perfect. The pop-up roof gave me 360° views from my wheelchair. Witnessed a crocodile take down a wildebeest — unreal experience made possible."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Maria R." },
          "datePublished": "2025-07-30",
          "reviewBody": "Multiple sclerosis makes heat dangerous — their climate-controlled vehicle was a lifesaver. The guides understood my needs perfectly. Best accessible safari in Africa."
        }
      ]
    },

    // 3. WebPage
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#webpage",
      "url": "https://www.jaetravel.co.ke/maasai-mara-great-migration",
      "name": "Maasai Mara Great Migration 2026 | Wheelchair Accessible Safari Kenya",
      "description": "Witness the predicted record-breaking 2026 Great Migration with Kenya's only wheelchair-accessible safari operator. Hydraulic lift vehicles, pop-up roofs, medical facilities.",
      "inLanguage": "en-KE"
    },

    // 4. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.jaetravel.co.ke" },
        { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://www.jaetravel.co.ke/tours" },
        { "@type": "ListItem", "position": 3, "name": "Great Migration 2026", "item": "https://www.jaetravel.co.ke/maasai-mara-great-migration" }
      ]
    },

    // 5. FAQPage – 10 perfect questions (max visibility)
    {
      "@type": "FAQPage",
      "@id": "https://www.jaetravel.co.ke/maasai-mara-great-migration/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When is the Great Migration in Maasai Mara in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "Main herds arrive early July to late October 2026. Peak river crossings: August–September." }
        },
        {
          "@type": "Question",
          "name": "Can wheelchair users witness Mara River crossings?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — JAE Travel operates Kenya’s only wheelchair-accessible migration vehicles with hydraulic lifts and pop-up roofs." }
        },
        {
          "@type": "Question",
          "name": "What is the best month for river crossings in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "August and September 2026 — predicted record herd sizes and multiple daily crossings." }
        },
        {
          "@type": "Question",
          "name": "How many animals are in the Great Migration?",
          "acceptedAnswer": { "@type": "Answer", "text": "1.7–2 million wildebeest, 500,000 gazelles, 200,000 zebras." }
        },
        {
          "@type": "Question",
          "name": "Is 2026 expected to be an exceptional migration year?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — strongest calving season in a decade means larger herds and more predator action." }
        },
        {
          "@type": "Question",
          "name": "Are accessible lodges available during peak season?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — Governors’ Camp, Mara Serena, &Beyond Kichwa Tembo all have fully accessible rooms secured for our guests." }
        },
        {
          "@type": "Question",
          "name": "How far in advance should I book for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "12–18 months. Only 18 accessible vehicles exist — they sell out faster than standard ones." }
        },
        {
          "@type": "Question",
          "name": "What makes JAE Travel different?",
          "acceptedAnswer": { "@type": "Answer", "text": "Only operator with hydraulic lift vehicles, medical power, satellite internet, and 100+ hours disability-trained guides." }
        },
        {
          "@type": "Question",
          "name": "Which predators are most active?",
          "acceptedAnswer": { "@type": "Answer", "text": "Marsh Pride lions, 5m+ Nile crocodiles, cheetah coalitions, leopards — highest density in Africa." }
        },
        {
          "@type": "Question",
          "name": "Is travel insurance required?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — mandatory with wheelchair-accessible flying doctor evacuation coverage." }
        }
      ]
    },

    // 6. TouristTrip Offers – price & offer rich results
    {
      "@type": "TouristTrip",
      "@id": "https://www.jaetravel.co.ke/tours/masai-mara-luxury-safari/#trip",
      "name": "Luxury Wheelchair Accessible Great Migration Safari 2026",
      "description": "Private 7–12 day accessible safari with daily river crossing focus",
      "url": "https://www.jaetravel.co.ke/tours/masai-mara-luxury-safari",
      "offers": {
        "@type": "Offer",
        "price": "6800",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/LimitedAvailability"
      }
    },
    {
      "@type": "TouristTrip",
      "@id": "https://www.jaetravel.co.ke/booking/masai-mara-safari-adventure/#trip",
      "name": "Accessible Group Great Migration Safari 2026",
      "description": "Joining 5–9 day safari with fixed dates and full accessibility",
      "url": "https://www.jaetravel.co.ke/booking/masai-mara-safari-adventure",
      "offers": {
        "@type": "Offer",
        "price": "3450",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
}

export const generateMetadata = (): Metadata => ({
  title: "Maasai Mara Great Migration 2026 | #1 Wheelchair Accessible River Crossing Safari Kenya | JAE Travel",
  description: "Experience the 2026 Maasai Mara Great Migration with Kenya's only wheelchair-accessible safari operator. Witness dramatic Mara River crossings from custom Land Cruisers with hydraulic lifts. Over 720 wheelchair users served since 2018. Book your accessible African safari adventure today.",
  keywords: "maasai mara great migration, great migration masai mara 2026, wildebeest migration masai mara, wheelchair accessible safari kenya, accessible african safari, maasai mara river crossing, disability friendly safari kenya, great migration safari packages, masai mara accessible tours, kenya wheelchair travel, adaptive safari vehicles, hydraulic lift safari, accessible travel africa, maasai mara national reserve, serengeti migration cycle, nile crocodile attacks, accessible wildlife photography, kenya safari for disabled",
  openGraph: {
    title: "Maasai Mara Great Migration 2026 | Fully Accessible Safari Kenya | JAE Travel",
    description: "Kenya's only wheelchair-accessible Great Migration safari operator. Custom Land Cruisers with hydraulic lifts, pop-up roofs, and medical equipment. Witness Mara River crossings from your wheelchair.",
    images: [{ 
      url: "https://www.jaetravel.co.ke/masai-mara-migration.jpg", 
      width: 1200, 
      height: 630, 
      alt: "Wheelchair accessible safari vehicle at 2026 Maasai Mara Great Migration river crossing with wildebeest herds" 
    }]
  },
  alternates: { canonical: "https://www.jaetravel.co.ke/maasai-mara-great-migration" },
  robots: "index, follow, max-image-preview:large",
  authors: [{ name: "JAE Travel Accessibility Team" }],
  publisher: "JAE Travel Kenya",
  category: "Accessible Travel",
})

const sections = [
  {
    h2: "The Maasai Mara Great Migration 2026: Why This Year Will Be Legendary",
    content: `As of November 21, 2025, satellite tracking and ranger reports confirm that the 2025–2026 wildebeest calving season in the southern Serengeti has been one of the strongest in a decade, with over 550,000 calves born. This means the 2026 migration into the Masai Mara will feature larger-than-average herds and increased predator activity, making it one of the most spectacular wildlife events of the century.

The Maasai Mara Great Migration represents the largest terrestrial mammal migration on planet Earth. Annually, approximately 1.7–2 million wildebeest, 500,000 Thomson's gazelles, 200,000 plains zebras, and tens of thousands of eland and topi follow an ancient 800–1,000 km clockwise circuit between the Serengeti ecosystem in Tanzania and the Maasai Mara ecosystem in Kenya. This incredible natural phenomenon has been documented by National Geographic, BBC Earth, and Discovery Channel, but nothing compares to witnessing it firsthand.

This is not a singular event but rather a continuous, year-round cycle driven by rainfall patterns and the search for fresh grazing lands. The most photographed and filmed moments typically occur between July and October when the massive herds confront the treacherous Mara River and Talek River crossings. These crossings represent nature's ultimate survival drama: 5-meter Nile crocodiles launch coordinated attacks, lion prides and leopards strategically position themselves on exit banks, and the river waters churn with the panic of thousands of animals fighting for survival.

For travelers with mobility impairments, witnessing this spectacle has historically been nearly impossible due to inaccessible vehicles and infrastructure. JAE Travel has revolutionized accessible African tourism by pioneering Kenya's first and only fleet of fully wheelchair-accessible Great Migration safari vehicles. Our 18 custom-modified Toyota Land Cruisers feature German-engineered hydraulic lifts with 400 kg capacity, full pop-up roofs allowing 360° game viewing while remaining seated in your wheelchair, medical-grade Q'Straint 4-point restraint systems tested to 20G impact standards, 3kW pure sine wave inverters for medical equipment, 45L medical refrigerators, Starlink satellite internet for connectivity, and drivers who have completed an intensive 100-hour disability-specialist training program.

Since our founding in 2018, we have successfully guided over 720 wheelchair users and travelers with limited mobility to witness multiple Mara River crossings per day. Many of our clients describe their experience as life-changing, having never imagined they could witness Africa's greatest wildlife spectacle firsthand. Our commitment to accessibility extends beyond vehicles to include partnerships with accessible lodges, trained staff, and comprehensive emergency protocols.`
  },
  {
    h2: "Maasai Mara Great Migration 2026: Complete Month-by-Month Timeline & Expert Predictions",
    content: `Our 2026 migration forecast integrates 15 years of daily GPS collar data, historical rainfall patterns, and real-time intelligence from our extensive ranger networks across the Serengeti-Mara ecosystem:

<strong>January – March 2026:</strong> Peak calving season unfolds across the southern Serengeti plains (Ndutu, Kusini, Hidden Valley regions). Over 8,000 wildebeest calves are born daily, creating unparalleled predator viewing opportunities. Lion prides, spotted hyena clans, and cheetah coalitions concentrate in these areas to capitalize on the abundance of vulnerable newborns.

<strong>April 2026:</strong> The massive herds begin their northwest movement toward the Western Corridor. Aerial surveys reveal spectacular columns of animals stretching over 40 kilometers across the plains, creating one of Africa's most breathtaking wildlife panoramas.

<strong>May 2026:</strong> Herds reach the Grumeti River in Tanzania's Western Corridor – their first major aquatic obstacle. This river hosts some of Africa's largest crocodile populations, with specimens exceeding 5 meters in length. Initial crossings here test the herds before the main Mara River challenges.

<strong>June 2026:</strong> Migration fronts arrive in the northern Serengeti, with advance scouts reaching the Sand River marking the Kenya-Tanzania border. Tension builds dramatically as animals assess crossing points and gather courage for the plunge into Maasai Mara territory.

<strong>July 2026:</strong> Based on current rainfall patterns, we predict the first significant herds will cross into Kenya's Maasai Mara around July 5–10 – slightly earlier than historical averages due to strong 2025 long rains. Initial small-scale crossings of the Mara River typically begin mid-July, building in frequency and intensity throughout the month.

<strong>August 2026:</strong> Peak migration season commences with herds fully committed to the Maasai Mara ecosystem. Multiple daily crossings occur at prime locations including Paradise, Lookout, and Main crossing points. This month typically offers the highest concentration of dramatic river crossing events.

<strong>September 2026:</strong> The absolute climax of the migration spectacle. Due to excellent 2025–2026 rainfall patterns, we anticipate record-breaking herd concentrations. River crossings can occur 3–5 times daily at various locations, with the largest single crossings often involving 20,000+ animals.

<strong>October 2026:</strong> Herds begin their southward return journey to the Serengeti. Final dramatic crossings occur as receding water levels create different challenges and opportunities for predators.

For real-time migration updates and detailed seasonal analysis, read our comprehensive guide: <Link href="/blog/best-time-visit-masai-mara" className="font-bold text-primary underline hover:no-underline">Best Time to Visit Masai Mara for the Great Migration – 2026 Expert Update</Link>.`
  },
  {
    h2: "The Mara River Crossings: Nature's Most Intense Survival Drama",
    content: `There is simply no comparable wildlife spectacle on Earth to a full-scale Mara River crossing during the peak of the Great Migration. The experience combines raw nature, high-stakes survival, and breathtaking scale in a way that leaves even seasoned safari guides speechless.

The psychological buildup to a crossing can last hours – sometimes days. Tens of thousands of wildebeest accumulate along the riverbanks, their characteristic grunts creating a constant background chorus of nervous energy. Zebras intermingle, adding their distinctive barking calls to the symphony of anticipation. A palpable tension hangs thick in the air, visible in the animals' restless pacing along the water's edge.

Then, in an instant that defies prediction, one "brave" animal commits. It leaps from a 3–4 meter cliff into the chocolate-brown, crocodile-infested waters below. This single act of courage triggers an immediate chain reaction. Within seconds, the entire bank erupts into chaos as hundreds – then thousands – of animals follow in a blind, thundering stampede. The river transforms into a churning maelstrom of black bodies and white stripes, creating a spectacle of nature that must be seen to be believed.

Our wheelchair-accessible vehicles are strategically positioned hours in advance at prime vantage points selected by our expert guides. The full pop-up roof elevates to 3.2 meters, providing perfect eye-level panoramic views directly from your wheelchair. Specially designed camera hatches are positioned at exact seated eye level (95–110 cm) for optimal photography. Our guides maintain constant radio communication with an extensive network of spotters and other safari operators, enabling us to predict crossing locations and timing with remarkable accuracy – maximizing your opportunities to witness multiple dramatic events in a single day.`
  },
  {
    h2: "Top 15 Best River Crossing Locations in Masai Mara for 2026",
    content: `Our senior guides possess intimate knowledge of every crossing point gained through decades of combined experience. Here are the top 15 locations ranked by drama, reliability, and wheelchair accessibility for the 2026 season:

<strong>1. Paradise Crossing</strong> – The most famous location featuring massive herds, steep cliffs, and high drama. Excellent wheelchair positioning available.<br/>
<strong>2. Lookout Hill</strong> – Elevated panoramic views perfect for wheelchair users. Multiple crossing points within visual range.<br/>
<strong>3. Main Crossing</strong> – Near Mara Serena Lodge, consistently high animal volume throughout peak season.<br/>
<strong>4. Cul-de-sac Crossing</strong> – Unique dead-end geography creates compressed, intense crossing drama.<br/>
<strong>5. No. 7 Crossing</strong> – Frequent intimate crossings ideal for photography with smaller crowds.<br/>
<strong>6. Bila Shaka Riverbank</strong> – Excellent post-crossing lion action as exhausted animals become vulnerable.<br/>
<strong>7. Talek River Confluence</strong> – Smaller but highly reliable crossings with good predator activity.<br/>
<strong>8. Fig Tree Crossing</strong> – Scenic location with ancient fig trees providing shade and photographic framing.<br/>
<strong>9. Intiakintiak River</strong> – Remote location offering uncrowded viewing experiences.<br/>
<strong>10. Musiara Marsh Exit Points</strong> – Predator-rich area with high lion and hyena concentrations.<br/>
<strong>11. Rekero Crossing</strong> – Classic migration location with deep cultural significance to local Maasai communities.<br/>
<strong>12. Ntiakatiak Gorge</strong> – Dramatic gorge setting creating spectacular photographic opportunities.<br/>
<strong>13. Kichwa Tembo Area</strong> – Luxury camp proximity with well-maintained access roads.<br/>
<strong>14. Singita Mara River Camp Stretch</strong> – Private conservancy access ensuring exclusive, low-density viewing.<br/>
<strong>15. Offbeat Mara North Bank</strong> – Exclusive sightings in less-visited regions of the reserve.

We strategically rotate between these prime locations daily based on real-time herd movements reported by our extensive network of spotters, rangers, and aerial surveillance.`
  },
  {
    h2: "Predators of the Great Migration: The Deadliest Season in Africa",
    content: `The Maasai Mara National Reserve already boasts the highest lion density in Africa (documenting over 850 individuals across multiple prides), but during the Great Migration, predator activity reaches unprecedented levels of intensity and frequency.

<strong>Famous Lion Prides and Individual Predators to Watch in 2026:</strong>

- <strong>The Marsh Pride</strong> – Legendary pride featured extensively in BBC's Big Cat Diary, known for their river crossing ambush techniques<br/>
- <strong>The Paradise Pride</strong> – Massive 35+ member pride dominating the prime crossing territories<br/>
- <strong>The Rekero Pride</strong> – Highly successful hunters with distinctive hunting strategies<br/>
- <strong>The Offbeat Pride</strong> – Younger, agile pride specializing in zebra predation<br/>
- <strong>The Rongai Pride</strong> – Large territory holders with exceptional stalking abilities<br/>
- <strong>The Moniko Pride</strong> – Known for their unique social structure and hunting cooperation<br/>
- <strong>Fig the Leopard</strong> and her sub-adult cubs – Frequently observed in the Musiara area<br/>
- <strong>The Sala's Camp Cheetah Coalition</strong> – Remarkable group hunting partnership<br/>
- <strong>The Five Musketeers Cheetah Brothers</strong> – Unprecedented five-male coalition demonstrating complex cooperative hunting

The Nile crocodiles inhabiting the Mara River represent some of the largest and oldest specimens in Africa – many individuals exceed 60 years in age and 1,000 kg in weight. The August–September period typically offers the highest probability of witnessing dramatic crocodile attacks at river exit points where exhausted animals are most vulnerable. Our guides possess extensive knowledge of individual crocodile territories and hunting patterns, enhancing your opportunities to observe these ancient reptiles in action.`
  },
  {
    h2: "How Wheelchair Users Experience the Great Migration – No Barriers, No Compromises",
    content: `Traditional safari vehicles systematically exclude wheelchair users from the Great Migration experience due to rough terrain requirements, extended hours in the field, and the necessity of standing for optimal game viewing. JAE Travel has eliminated every accessibility barrier through innovative engineering and specialized training:

<strong>Vehicle Accessibility Features:</strong><br/>
- German-engineered hydraulic side lifts with 400 kg capacity that operate reliably even on 30° riverbank slopes<br/>
- Full pop-up roof systems allowing complete 360° viewing while remaining securely seated in your wheelchair<br/>
- Medical-grade Q'Straint 4-point restraint systems tested to rigorous 20G crash safety standards<br/>
- 3kW pure sine wave inverters providing stable power for ventilators, CPAP machines, and powered wheelchairs<br/>
- 45L medical refrigerators maintaining precise 2–8°C temperature ranges for medication storage<br/>
- Starlink satellite internet enabling remote medical consultations and emergency communications<br/>
- Hospital-grade HEPA filtration and climate control systems for health protection<br/>

<strong>Specialized Guide Training:</strong><br/>
- All drivers and guides complete 100+ hours of disability-specialist training including wheelchair securement protocols, emergency evacuation procedures, and inclusive guiding techniques<br/>
- Comprehensive understanding of various mobility conditions and appropriate assistance methods<br/>
- Medical emergency response training in remote wilderness settings<br/>

<strong>Proven Experience:</strong><br/>
We have successfully accommodated travelers with spinal cord injuries (C4–T12), multiple sclerosis, muscular dystrophy, cerebral palsy, amputees, and elderly guests with limited mobility. Many clients describe witnessing their first river crossing as the most empowering and transformative moment of their lives, finally accessing an experience they believed would remain forever beyond their reach.`
  },
  {
    h2: "Photography & Filmmaking Tips for the 2026 Great Migration",
    content: `Our accessible vehicles incorporate multiple features specifically designed for wildlife photographers and videographers:

<strong>Vehicle Photography Enhancements:</strong><br/>
- Camera hatches positioned at exact wheelchair eye level (95–110 cm) for comfortable extended shooting<br/>
- Professional gimbal mounts and bean bags provided at no additional cost<br/>
- Silent electric pop-up roof mechanism eliminating vibration during critical shots<br/>
- Priority positioning at crossing locations ensuring optimal angles and lighting<br/>
- Guides with professional photography experience understanding composition, lighting, and animal behavior prediction<br/>

<strong>Recommended Equipment for 2026 Migration:</strong><br/>
- <strong>Primary Camera Body:</strong> Weather-sealed DSLR or mirrorless with high burst rate (10+ fps)<br/>
- <strong>Telephoto Lenses:</strong> 70–200mm f/2.8 for animal portraits, 100–400mm or 200–600mm for crossing action<br/>
- <strong>Secondary Body:</strong> With 24–70mm for landscape and environmental context shots<br/>
- <strong>Support Equipment:</strong> Sturdy tripod/monopod, multiple high-capacity memory cards, portable power banks<br/>

<strong>Technical Shooting Recommendations:</strong><br/>
Golden hour (6:30–8:00 AM & 4:30–6:30 PM) produces magical warm light illuminating dust clouds during crossings. Use continuous burst mode and fast shutter speeds (1/2000s+) to freeze splashing water and dynamic action. Pre-focus on known crossing exit points and utilize back-button focusing for rapid response to unpredictable movement.`
  },
  {
    h2: "Weather, Packing List & Health Preparations for 2026 Migration Season",
    content: `The July–October period represents the dry season in the Maasai Mara, offering generally favorable conditions for safari activities:

<strong>Climate Conditions:</strong><br/>
- Average temperatures: 12–28°C (cool mornings and evenings, warm daytime periods)<br/>
- Rainfall: Minimal precipitation (<20mm monthly average)<br/>
- Visibility: Excellent due to short grass conditions improving animal spotting<br/>
- Mosquito activity: Significantly lower than wet season months<br/>
- Dust levels: Considerable during crossings and vehicle movement (we provide N95 masks)<br/>

<strong>Essential Packing Checklist:</strong><br/>
- <strong>Clothing:</strong> Layering system including thermal base layers, fleece mid-layers, and waterproof outer shell<br/>
- <strong>Sun Protection:</strong> Wide-brimmed safari hat, high-SPF sunscreen, and quality sunglasses<br/>
- <strong>Optics:</strong> Image-stabilized binoculars for detailed wildlife observation<br/>
- <strong>Power Solutions:</strong> High-capacity power bank for electronic devices<br/>
- <strong>Medical Preparation:</strong> Medication cooler bag, comprehensive travel insurance documents<br/>
- <strong>Health Protection:</strong> DEET-based insect repellent, anti-malarial prophylaxis as recommended<br/>
- <strong>Documentation:</strong> Camera equipment, multiple memory cards, equipment cleaning supplies<br/>

<strong>Health Considerations:</strong><br/>
Consult with a travel medicine specialist 6–8 weeks before departure regarding recommended vaccinations (typhoid, hepatitis A, etc.). Ensure adequate supplies of regular medications with accompanying physician documentation. Discuss altitude considerations (Maasai Mara averages 1,500–2,200 meters) if relevant to your health condition.`
  },
  {
    h2: "Conservation & Responsible Tourism During the Great Migration",
    content: `The Maasai Mara faces increasing environmental pressure from growing tourism numbers. JAE Travel operates under strict, scientifically-informed low-impact guidelines:

<strong>Environmental Protection Protocols:</strong><br/>
- Maximum 5 vehicles permitted per crossing event (we often secure exclusive access in private conservancies)<br/>
- Off-road driving only when essential and specifically permitted by reserve management<br/>
- Comprehensive carbon offsetting program for all safari operations<br/>
- Partnership with local anti-poaching units and wildlife conservation organizations<br/>
- Active participation in habitat restoration and wildlife corridor protection initiatives<br/>

<strong>Community Engagement & Ethical Tourism:</strong><br/>
- Priority employment of local Maasai guides and support staff<br/>
- Fair wage policies exceeding industry standards by 25–40%<br/>
- Cultural preservation programs supporting traditional Maasai practices<br/>
- Educational sponsorship programs for local school children<br/>
- Transparent revenue sharing with neighboring Maasai communities<br/>

<strong>Accessibility Advocacy:</strong><br/>
We actively campaign for improved accessibility standards across African tourism infrastructure, sharing our engineering innovations and training protocols with other operators to expand accessible travel opportunities throughout the continent.`
  },
  {
    h2: "Client Stories: Real Experiences from Wheelchair Users Who Witnessed the Great Migration",
    content: `<strong>Sarah M., United Kingdom – September 2024:</strong> "As a paraplegic for 25 years following a car accident, I had resigned myself to watching wildlife documentaries from my living room. JAE Travel transformed this limitation – I witnessed three separate river crossings in one incredible morning. The hydraulic lift worked flawlessly on steep riverbanks, and being able to photograph from my wheelchair through the pop-up roof was liberating. This experience redefined what I believed was possible with my mobility challenges."

<strong>James K., Australia – August 2025:</strong> "Twelve years in a wheelchair hadn't dimmed my childhood dream of seeing the Great Migration. When the first wildebeest leaped into the Mara River, tears streamed down my face – not just from the spectacle, but from the realization that JAE Travel had made the impossible accessible. The medical refrigeration for my medication, the secure wheelchair restraints, and the knowledgeable guides who understood both wildlife and accessibility needs created a seamless experience."

<strong>Maria R., Canada – July 2025:</strong> "Traveling with multiple sclerosis requires careful planning, but JAE Travel anticipated every need. The climate-controlled vehicle prevented overheating, the comfortable seating reduced fatigue, and the ability to remain in my power chair throughout game drives preserved my energy. Witnessing a crocodile attack mere meters from our vehicle was simultaneously terrifying and exhilarating – an experience I'll cherish forever."

<strong>Additional testimonials and detailed case studies available upon request, including videos and photography from our accessibility-focused safaris.</strong>`
  }
]

export default function MaasaiMaraGreatMigrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(greatMigrationSchema) }}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <header className="text-center mb-24">
          <div className="mb-8 flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white font-bold">
              <Star className="h-5 w-5" /> #1 Accessible Migration Safari Operator
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-bold">
              <Award className="h-5 w-5" /> 720+ Wheelchair Users Successfully Served
            </div>
            <div className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-white font-bold">
              <Shield className="h-5 w-5" /> Kenya's Only Accessible Safari Specialist
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-10">
            Maasai Mara Great Migration<br />
            <span className="text-primary">2026 Safari</span>
          </h1>

          <p className="mx-auto max-w-6xl text-xl md:text-3xl text-muted-foreground mb-12 leading-relaxed">
            The 2026 Great Migration is predicted to be one of the most spectacular in a decade with record herd sizes. Secure your place now with Kenya's premier wheelchair-accessible safari operator featuring custom-engineered vehicles and disability-specialist guides.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button asChild size="lg" className="text-xl px-12 py-8 bg-green-600 hover:bg-green-700">
              <Link href="/tours/masai-mara-luxury-safari">
                <Calendar className="mr-3 h-7 w-7" /> Book Luxury Accessible Safari
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-xl px-12 py-8">
              <Link href="/booking/masai-mara-safari-adventure">
                <Zap className="mr-3 h-7 w-7" /> View Budget Migration Tour
              </Link>
            </Button>
          </div>
        </header>

        {sections.map((section, index) => (
          <section key={index} className="mb-32 scroll-mt-32">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-12 text-balance">{section.h2}</h2>
            <div className="prose prose-lg max-w-none text-lg leading-relaxed text-muted-foreground space-y-6">
              {section.content.split("\n").map((paragraph, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          </section>
        ))}

        <GreatMigrationVehicleCard />

        <section className="my-40">
          <h2 className="text-center font-serif text-5xl md:text-7xl font-bold mb-20">Choose Your 2026 Great Migration Safari Experience</h2>
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <div className="border rounded-3xl p-12 hover:shadow-2xl transition bg-gradient-to-br from-green-50 to-blue-50">
              <h3 className="text-4xl font-bold mb-8">Masai Mara Luxury Accessible Migration Safari</h3>
              <ul className="space-y-6 text-lg mb-10">
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> 7–12 day private accessible safari with personalized itinerary</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Multiple river crossings daily with guaranteed optimal positioning</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Luxury accessible lodges & camps with roll-in showers</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Private accessible Land Cruiser with hydraulic lift and medical facilities</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Dedicated disability-specialist guide and driver team</li>
              </ul>
              <Button asChild size="lg" className="w-full text-xl py-8">
                <Link href="/tours/masai-mara-luxury-safari">View Full Itinerary & Book 2026 Dates</Link>
              </Button>
            </div>

            <div className="border rounded-3xl p-12 hover:shadow-2xl transition bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-4xl font-bold mb-8">Masai Mara Safari Adventure (Accessible Group Tour)</h3>
              <ul className="space-y-6 text-lg mb-10">
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> 5–9 day joining group safari with fixed departure dates</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Same accessible vehicles & expert disability-trained guides</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Comfortable accessible camps with adapted facilities</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Maximum 6 guests per vehicle ensuring personal attention</li>
                <li className="flex gap-4"><CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" /> Cost-effective option with full accessibility features</li>
              </ul>
              <Button asChild size="lg" className="w-full text-xl py-8">
                <Link href="/booking/masai-mara-safari-adventure">Check 2026 Dates & Availability</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 rounded-3xl p-20 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-bold mb-10">Only 18 Accessible Vehicles Available for 2026 Peak Season</h2>
          <p className="text-2xl mb-12 max-w-5xl mx-auto opacity-95 leading-relaxed">
            Our custom-engineered wheelchair-accessible Land Cruisers are in extremely high demand for the predicted record-breaking 2026 migration season. Early booking is essential to guarantee your place at the greatest wildlife spectacle on Earth.
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-2xl px-16 py-10">
            <Link href="/tours/masai-mara-luxury-safari">Secure Your 2026 Safari Dates Now</Link>
          </Button>
        </section>
      </div>
    </>
  )
}