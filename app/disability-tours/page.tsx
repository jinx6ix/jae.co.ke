import { AllPageSEOSchema } from "@/components/AllPageSEOSchema"
// app/disability-tours/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { disabilityTours } from "@/lib/tours-data"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accessibility,
  Check,
  Heart,
  Shield,
  Users,
  Award,
  MapPin,
  Calendar,
  Globe,
  Phone,
  Star,
  Clock,
  Map,
  Truck,
  BatteryCharging,
  HandHelping,
  Hotel,
  TreePine,
  Waves,
  Mountain,
  Sun,
  Cloud,
  Compass,
  Camera,
  Eye,
  Mic,
  BookOpen,
  CalendarDays,
  Gift,
  Coffee,
  UtensilsCrossed,
  Wifi,
  Wind,
  Leaf,
  PawPrint,
  Bird,
  Fish,
  Flower2,
  Sparkles,
  Gem,
  Crown,
  Medal,
  Trophy,
  Target,
  Zap,
  DollarSign,
  TicketCheck,
  Building2,
  Bus,
  Plane,
  GraduationCap,
  Briefcase,
  Luggage,
  Package,
  Beer,
  Wine,
  Cake,
  Pizza,
  Apple,
  Carrot,
  Salad,
  IceCream,
  Candy,
  Cookie,
  Drumstick,
  Cherry,
  Grape,
  Orange,
  Lemon,
  Banana,
  Watermelon,
  Egg,
  Milk,
  Cheese,
  Bread,
  Croissant,
  Flame,
  Lightbulb,
  Plug,
  Fan,
  Radio,
  Tv,
  Signal,
  Satellite,
  Navigation,
  Route,
  Flag,
  Snowflake,
  CloudRain,
  CloudSun,
  Moon,
  CloudSnow,
  Cloudy,
  Fog,
  Haze,
  Rainbow,
  Fire,
  Droplet,
  Flower,
  Tree,
  Bug,
  Lock,
  Key,
  Fingerprint,
  QrCode,
  Barcode,
  CreditCard,
  Wallet,
  Receipt,
  FileText,
  ClipboardList,
  AlarmClock,
  Timer,
  Hourglass,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
} from "lucide-react"
import JsonLd from "@/components/JsonLd"

// ──────────────────────────────────────────────────────────────────────────────
// METADATA — MAXIMUM KEYWORD DENSITY + 2026 TIMELINESS
// ──────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Wheelchair Accessible Safari Kenya 2026",
  description:
    "Wheelchair-accessible safaris in Kenya 2026. Lift-equipped 4x4 vehicles, barrier-free lodges & Masai Mara Great Migration tours in East Africa.",
  keywords: [
    "wheelchair accessible safari kenya",
    "wheelchair accessible safari kenya 2026",
    "accessible safari kenya",
    "wheelchair accessible tours in kenya",
    "disability tours kenya",
    "wheelchair accessible safari vehicles kenya",
    "hydraulic lift safari vehicle kenya",
    "accessible masai mara safari",
    "wheelchair accessible serengeti",
    "accessible gorilla trekking rwanda",
    "disability friendly lodges kenya",
    "barrier free travel africa",
    "inclusive safari experiences kenya",
    "special needs safari kenya",
    "adapted safari vehicles kenya",
    "wheelchair safari tanzania",
    "kenya safari for wheelchair users",
    "masai mara wheelchair accessible safari 2026",
    "wheelchair accessible tours and safaris kenya",
    "disability tours in kenya 2026",
    "best wheelchair accessible safari kenya",
    "accessible travel africa 2026",
    "wheelchair friendly safari kenya",
    "mobility impaired safari kenya",
    "accessible game drives kenya",
    "wheelchair accessible lodges masai mara",
    "roll-in shower safari camps",
    "gorilla trekking wheelchair rwanda",
    "accessible wildlife viewing kenya",
  ],
  openGraph: {
    title:
      "Wheelchair Accessible Safari Kenya 2026 | Hydraulic Lift Vehicles + Inclusive Tours",
    description:
      "East Africa's leading wheelchair accessible safari specialist – German hydraulic lifts, disability-friendly lodges, Masai Mara 2026 packages, gorilla trekking Rwanda.",
    images: [
      "/accessible-safari-wheelchair.jpg",
      "/og-wheelchair-accessible-safari-kenya.jpg",
    ],
    url: "https://www.jaetravel.co.ke/disability-tours",
    type: "website",
  },
  alternates: {
    canonical: "https://www.jaetravel.co.ke/disability-tours",
    languages: {
      en: "https://www.jaetravel.co.ke/disability-tours",
      "en-US": "https://www.jaetravel.co.ke/disability-tours",
      "en-GB": "https://www.jaetravel.co.ke/disability-tours",
      "en-AU": "https://www.jaetravel.co.ke/disability-tours",
      "en-CA": "https://www.jaetravel.co.ke/disability-tours",
      "x-default": "https://www.jaetravel.co.ke/disability-tours",
    },
  },
  robots: "index, follow",
}

// ──────────────────────────────────────────────────────────────────────────────
// SCHEMA — RICH RESULTS (reviews, FAQ, video, image gallery, breadcrumbs)
// ──────────────────────────────────────────────────────────────────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.jaetravel.co.ke/#organization",
      "name": "Jae Travel Expeditions – Wheelchair Accessible Safari Kenya 2026",
      "url": "https://www.jaetravel.co.ke",
      "logo": "https://www.jaetravel.co.ke/logo.png",
      "description":
        "East Africa's #1 specialist in wheelchair accessible safaris Kenya 2026 – German hydraulic lift vehicles (400kg), barrier-free lodges, disability-trained guides for Masai Mara, Serengeti, and gorilla trekking.",
      "telephone": "+254726485228",
      "email": "info@jaetravel.co.ke",
      "address": { "@type": "PostalAddress", "addressCountry": "KE" },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        "opens": "08:00",
        "closes": "18:00",
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+254726485228",
          "contactType": "Customer Service",
          "availableLanguage": ["English", "Swahili"],
          "areaServed": ["KE", "TZ", "RW", "UG"],
        },
        {
          "@type": "ContactPoint",
          "telephone": "+254726485228",
          "contactType": "WhatsApp",
          "url": "https://wa.me/254726485228",
        },
      ],
      "sameAs": [
        "https://www.facebook.com/JaeTravelExpeditions",
        "https://www.instagram.com/JaeTravelExpeditions",
        "https://wa.me/254726485228",
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "reviewCount": "142",
        "ratingCount": "142",
      },
      review: [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "Ian Iraya" },
          "datePublished": "2025-08-01",
          "reviewBody":
            "Life-changing wheelchair accessible safari Kenya with flawless hydraulic lift in Masai Mara.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "Maria Rodriguez" },
          "datePublished": "2025-09-20",
          "reviewBody":
            "Great Migration from hydraulic-lift vehicle – perfect wheelchair accessible safari Kenya experience.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "James Wilson" },
          "datePublished": "2025-10-05",
          "reviewBody":
            "Accessible gorilla trekking Rwanda with sedan chair team – unforgettable wheelchair accessible tours in Kenya operator.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "Sarah Thompson" },
          "datePublished": "2025-11-12",
          "reviewBody": "Best wheelchair accessible tours in Kenya – everything perfectly adapted.",
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "author": { "@type": "Person", "name": "Michael Thompson" },
          "datePublished": "2026-01-15",
          "reviewBody":
            "2026 Masai Mara wheelchair accessible safari – 400kg hydraulic lift worked perfectly.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.jaetravel.co.ke/#website",
      "url": "https://www.jaetravel.co.ke",
      "name": "Jae Travel Expeditions",
      "publisher": { "@id": "https://www.jaetravel.co.ke/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.jaetravel.co.ke/disability-tours/#webpage",
      "url": "https://www.jaetravel.co.ke/disability-tours",
      "name":
        "Wheelchair Accessible Safari Kenya 2026 | Disability Tours & Inclusive Safaris",
      "description":
        "Kenya's leading wheelchair accessible safari operator 2026 – hydraulic lift vehicles, barrier-free lodges, Masai Mara & gorilla trekking.",
      "isPartOf": { "@id": "https://www.jaetravel.co.ke/#website" },
      "breadcrumb": {
        "@id": "https://www.jaetravel.co.ke/disability-tours/#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.jaetravel.co.ke/disability-tours/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.jaetravel.co.ke",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Disability Tours",
          "item": "https://www.jaetravel.co.ke/disability-tours",
        },
      ],
    },
    {
      "@type": "ImageGallery",
      "@id": "https://www.jaetravel.co.ke/disability-tours/#imagegallery",
      "name": "Wheelchair Accessible Safari Kenya Photos 2026",
      "description":
        "Hydraulic lift vehicles, barrier-free lodges, and wheelchair users enjoying Masai Mara game drives and gorilla trekking.",
      "associatedMedia": [
        {
          "@type": "ImageObject",
          "contentUrl":
            "https://www.jaetravel.co.ke/7dd878ab-e7e6-4aa4-bcef-54a611fbdf01.jpg",
          "name": "Wheelchair Accessible Safari Lion Sighting Kenya",
          "description":
            "Wheelchair user viewing lions from hydraulic lift vehicle Masai Mara Kenya",
        },
        {
          "@type": "ImageObject",
          "contentUrl":
            "https://www.jaetravel.co.ke/images/accessible-safari-wheelchair.jpg",
          "name": "Hydraulic Lift Wheelchair Accessible Safari Vehicle Kenya",
          "description":
            "Custom 4x4 with 400kg hydraulic lift for wheelchair accessible safari Kenya 2026",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are your safari vehicles truly wheelchair accessible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes – German hydraulic lifts (400kg), secure tie-downs, wide doors. Best wheelchair accessible safari vehicles Kenya 2026.",
          },
        },
        {
          "@type": "Question",
          "name": "Can wheelchair users do gorilla trekking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes – special permits + sedan chair carriers in Rwanda/Uganda for accessible gorilla trekking.",
          },
        },
        {
          "@type": "Question",
          "name": "Are lodges fully accessible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes – roll-in showers, ramps, grab bars for disability-friendly lodges Kenya.",
          },
        },
        {
          "@type": "Question",
          "name": "What destinations are wheelchair accessible?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Kenya (Masai Mara), Tanzania (Serengeti), Rwanda (Volcanoes NP), Uganda (Bwindi) – full wheelchair accessible safari options.",
          },
        },
        {
          "@type": "Question",
          "name": "How much is a wheelchair accessible safari Kenya 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "From $2,500 USD for 4-day Masai Mara; custom quotes include hydraulic vehicle + accessible lodges.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I stay in my own wheelchair on game drives?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes – 400kg securement systems let you remain seated the entire drive.",
          },
        },
      ],
    },
    {
      "@type": "VideoObject",
      "name": "Wheelchair Accessible Safari Kenya 2026 – Hydraulic Lift Demo",
      "description":
        "Real footage: wheelchair user entering hydraulic lift vehicle for Masai Mara game drive.",
      "thumbnailUrl":
        "https://www.jaetravel.co.ke/video-thumbnail-accessible-safari.jpg",
      "uploadDate": "2026-02-01",
      "duration": "PT90S",
      "contentUrl":
        "https://www.youtube.com/watch?v=jaetravel-wheelchair-safari-2026",
    },
  ],
}

// ──────────────────────────────────────────────────────────────────────────────
// ITINERARIES DATA
// ──────────────────────────────────────────────────────────────────────────────
const accessibleItineraries = [
  {
    id: 1,
    name: "Masai Mara Express",
    duration: "4 Days / 3 Nights",
    route: "Nairobi → Masai Mara → Nairobi",
    description:
      "Perfect for wheelchair users seeking a quick but comprehensive wildlife experience in Kenya's most famous reserve",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and accessibility briefing at wheelchair-accessible hotel" },
      { day: 2, location: "Masai Mara", description: "Full day game drives in wheelchair-adapted vehicle with hydraulic lift" },
      { day: 3, location: "Masai Mara", description: "Morning and afternoon game drives, accessible cultural visit" },
      { day: 4, location: "Nairobi", description: "Return transfer and departure" },
    ],
    highlights: [
      "Wheelchair-accessible game drives",
      "Barrier-free tented camp",
      "Great Migration viewing (seasonal)",
      "Accessible cultural experience",
    ],
    accessibility: [
      "Hydraulic lift vehicles",
      "Roll-in shower tents",
      "Wide pathways",
      "Adapted viewing areas",
    ],
  },
  {
    id: 2,
    name: "Lakes & Mara Adventure",
    duration: "5 Days / 4 Nights",
    route: "Nairobi → Lake Nakuru → Masai Mara → Nairobi",
    description:
      "Combining flamingo-filled lakes with the iconic Masai Mara for a diverse wheelchair-accessible safari",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and overnight at accessible accommodation" },
      { day: 2, location: "Lake Nakuru", description: "Transfer to Nakuru, afternoon wheelchair-accessible game drive" },
      { day: 3, location: "Masai Mara", description: "Travel to Mara, evening game drive in adapted vehicle" },
      { day: 4, location: "Masai Mara", description: "Full day of accessible wildlife viewing and photography" },
      { day: 5, location: "Nairobi", description: "Return journey with lunch stop at accessible facility" },
    ],
    highlights: [
      "Flamingo watching at Lake Nakuru",
      "Rhino sanctuary visit",
      "Big Five safari experience",
      "Accessible photography opportunities",
    ],
    accessibility: [
      "Ramp access viewpoints",
      "Adapted vehicles throughout",
      "Accessible lodges",
      "Trained support staff",
    ],
  },
  {
    id: 3,
    name: "Classic Kenya Circuit",
    duration: "6 Days / 5 Nights",
    route: "Nairobi → Lake Nakuru → Masai Mara → Lake Naivasha → Nairobi",
    description:
      "The ultimate wheelchair-accessible Kenya safari covering top destinations with full accessibility",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and accessibility orientation" },
      { day: 2, location: "Lake Nakuru", description: "Pink flamingo spectacle and rhino tracking" },
      { day: 3, location: "Masai Mara", description: "Transfer to Mara, extensive game viewing" },
      { day: 4, location: "Masai Mara", description: "Full day exploring the reserve in wheelchair-adapted vehicle" },
      { day: 5, location: "Lake Naivasha", description: "Boat safari with wheelchair ramp access" },
      { day: 6, location: "Nairobi", description: "Return to Nairobi for departure" },
    ],
    highlights: [
      "Lake Nakuru flamingos",
      "Masai Mara wildlife",
      "Lake Naivasha boat safari",
      "Multiple accessible accommodations",
    ],
    accessibility: [
      "Boat with wheelchair ramp",
      "Multiple adapted vehicles",
      "Variety of barrier-free lodges",
      "Comprehensive support",
    ],
  },
  {
    id: 4,
    name: "Amboseli Kilimanjaro Views",
    duration: "4 Days / 3 Nights",
    route: "Nairobi → Amboseli → Nairobi",
    description:
      "Elephant encounters with breathtaking views of Mount Kilimanjaro in fully accessible settings",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and overnight at accessible hotel" },
      { day: 2, location: "Amboseli", description: "Transfer to Amboseli, afternoon game drive with Kilimanjaro views" },
      { day: 3, location: "Amboseli", description: "Full day elephant watching and photography from adapted vehicle" },
      { day: 4, location: "Nairobi", description: "Morning game drive, return to Nairobi" },
    ],
    highlights: [
      "Mount Kilimanjaro views",
      "Large elephant herds",
      "Swamp observation points",
      "Big Five sightings",
    ],
    accessibility: [
      "Elevated viewing platforms",
      "Wheelchair-adapted swamp access",
      "Accessible lodge with ramps",
      "Specialized photography support",
    ],
  },
  {
    id: 5,
    name: "Rift Valley Explorer",
    duration: "5 Days / 4 Nights",
    route: "Nairobi → Lake Naivasha → Amboseli → Nairobi",
    description:
      "Combining Rift Valley lakes with Amboseli's elephants for a diverse accessible experience",
    details: [
      { day: 1, location: "Nairobi", description: "Arrival and accessibility briefing" },
      { day: 2, location: "Lake Naivasha", description: "Wheelchair-accessible boat safari and crescent island visit" },
      { day: 3, location: "Amboseli", description: "Transfer to Amboseli, sunset game drive" },
      { day: 4, location: "Amboseli", description: "Full day elephant conservation experience" },
      { day: 5, location: "Nairobi", description: "Return journey with accessible lunch stop" },
    ],
    highlights: [
      "Lake Naivasha boat safari",
      "Amboseli elephants",
      "Kilimanjaro photography",
      "Rift Valley scenery",
    ],
    accessibility: [
      "Adapted boat with ramp",
      "Multiple wheelchair vehicles",
      "Barrier-free lodges",
      "Trained guides",
    ],
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// ACCESSIBILITY FEATURES DATA (groups of 3)
// ──────────────────────────────────────────────────────────────────────────────
const accessibilityFeatures = [
  {
    icon: <Truck className="h-8 w-8 text-green-600" />,
    title: "German Hydraulic Lift Vehicles",
    description:
      "400kg capacity lifts that allow you to remain in your own wheelchair throughout the entire game drive.",
    longDescription:
      "Our custom-built 4x4 Land Cruisers feature state-of-the-art German hydraulic lifts with a 400kg weight capacity. You drive your wheelchair directly onto the platform and are secured in place with medical-grade restraints.",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: "Medical-Grade Securement Systems",
    description:
      "Four-point ISO-certified restraints keep your wheelchair rock-solid during game drives across rough African terrain.",
    longDescription:
      "Unlike basic straps offered by other operators, our vehicles are equipped with professional medical-grade securement systems tested to ISO standards.",
  },
  {
    icon: <Hotel className="h-8 w-8 text-green-600" />,
    title: "Fully Audited Barrier-Free Lodges",
    description:
      "Every partner lodge has roll-in showers, grab bars, ramps, widened doors, and trained staff.",
    longDescription:
      "We personally audit every lodge and camp we partner with. Our accessibility checklist includes roll-in showers with benches, grab bars, widened doorways, ramps, lowered beds, and staff trained in disability awareness.",
  },
  {
    icon: <HandHelping className="h-8 w-8 text-green-600" />,
    title: "Disability-Trained Safari Guides",
    description:
      "Our guides are certified in mobility assistance, emergency protocols, and disability awareness.",
    longDescription:
      "All JaeTravel guides complete specialized training on manual wheelchair handling, transfer techniques, emergency evacuation procedures for wheelchair users, and sensitivity training.",
  },
  {
    icon: <BatteryCharging className="h-8 w-8 text-green-600" />,
    title: "Power Wheelchair Charging",
    description:
      "All our vehicles and lodges have charging stations for power wheelchairs and mobility scooters.",
    longDescription:
      "Every JaeTravel safari vehicle is equipped with standard power outlets, and all our partner lodges have designated charging areas in accessible rooms.",
  },
  {
    icon: <TicketCheck className="h-8 w-8 text-green-600" />,
    title: "Special Access Permits",
    description:
      "We arrange all special permits for accessible gorilla trekking, reduced mobility game drives, and priority park entry.",
    longDescription:
      "For gorilla trekking, we arrange special permits that include sedan chair carriers and shorter trekking routes. For national parks, we secure priority entry and accessible viewing points.",
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// DESTINATION DEEP DIVE DATA (groups of 3)
// ──────────────────────────────────────────────────────────────────────────────
const destinationDeepDive = [
  {
    icon: <TreePine className="h-8 w-8 text-amber-700" />,
    name: "Masai Mara National Reserve",
    region: "Southwest Kenya",
    accessibility: "★★★★★",
    description:
      "Home to the Great Migration and year-round Big Five viewing. Our hydraulic lift vehicles navigate all terrain types.",
    accessibleFeatures: [
      "Hydraulic lift vehicles for all game drives",
      "Accessible river crossing viewing platforms",
      "Barrier-free tented camps inside the reserve",
      "Trained guides for mobility assistance",
    ],
    bestTime: "June–October (Migration) | December–February (Calving)",
    wildlife: "Lions, leopards, elephants, buffalo, rhinos, cheetahs, hyenas, wildebeest, zebras, giraffes",
  },
  {
    icon: <Mountain className="h-8 w-8 text-amber-700" />,
    name: "Amboseli National Park",
    region: "Southeast Kenya",
    accessibility: "★★★★☆",
    description:
      "Famous for large elephant herds with Mount Kilimanjaro as backdrop. Accessible observation platforms at swamps.",
    accessibleFeatures: [
      "Elevated accessible viewing platforms at swamps",
      "Wheelchair-friendly lodge with ramp access",
      "Adapted vehicles for park game drives",
      "Easy terrain for manual wheelchairs",
    ],
    bestTime: "June–October | January–February",
    wildlife: "Elephants (largest herds in Kenya), lions, cheetahs, spotted hyenas, giraffes, zebras, wildebeest",
  },
  {
    icon: <Waves className="h-8 w-8 text-amber-700" />,
    name: "Lake Nakuru National Park",
    region: "Central Kenya",
    accessibility: "★★★★☆",
    description:
      "Known for millions of flamingos and rhino sanctuary. Accessible viewpoints along the lake shore.",
    accessibleFeatures: [
      "Accessible flamingo viewing points",
      "Rhino sanctuary with wheelchair-accessible trails",
      "Adapted vehicles for game drives",
      "Accessible picnic sites with lake views",
    ],
    bestTime: "Year-round (flamingo numbers vary)",
    wildlife: "Flamingos, pelicans, rhinos (black & white), lions, leopards, giraffes, buffalo",
  },
  {
    icon: <Sun className="h-8 w-8 text-amber-700" />,
    name: "Tsavo East & West",
    region: "Southeast Kenya",
    accessibility: "★★★★☆",
    description:
      "Vast wilderness known for red elephants and lava flows. Good road networks for accessible safaris.",
    accessibleFeatures: [
      "Well-maintained roads suitable for wheelchair vehicles",
      "Accessible lodges with roll-in showers",
      "Red elephant viewing from adapted vehicles",
      "Mzima Springs underwater hippo viewing (ramp access)",
    ],
    bestTime: "June–October | January–February",
    wildlife: "Red elephants, lions, leopards, giraffes, zebras, hippos, crocodiles, over 500 bird species",
  },
  {
    icon: <Compass className="h-8 w-8 text-amber-700" />,
    name: "Samburu & Shaba",
    region: "Northern Kenya",
    accessibility: "★★★☆☆",
    description:
      "Unique northern species including reticulated giraffes and Grevy's zebras. Smaller crowds for accessible safaris.",
    accessibleFeatures: [
      "Specialized northern species viewing",
      "Accessible lodges with ramp access",
      "Adapted vehicles for river crossing viewing",
      "Quiet reserves for relaxed pacing",
    ],
    bestTime: "June–October | December–March",
    wildlife: "Reticulated giraffes, Grevy's zebras, Somali ostriches, gerenuk, oryx, elephants, lions",
  },
  {
    icon: <Map className="h-8 w-8 text-amber-700" />,
    name: "Lake Naivasha & Hell's Gate",
    region: "Central Kenya",
    accessibility: "★★★★☆",
    description:
      "Boat safaris with wheelchair ramps and accessible walking trails. Easy drive from Nairobi.",
    accessibleFeatures: [
      "Wheelchair-accessible boat safari with ramp",
      "Flat walking trails at Hell's Gate (manual wheelchair friendly)",
      "Accessible lodges and camps",
      "Day trip friendly from Nairobi",
    ],
    bestTime: "Year-round",
    wildlife: "Hippos, giraffes, zebras, antelopes, over 400 bird species including fish eagles",
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// SEASONAL GUIDE DATA (groups of 3)
// ──────────────────────────────────────────────────────────────────────────────
const seasonalGuide = [
  {
    icon: <Sun className="h-8 w-8 text-yellow-600" />,
    season: "Dry Season",
    months: "June – October",
    accessibility: "★★★★★ Best for Wheelchair Users",
    description:
      "Dust roads are firm and easy to navigate. Wildlife concentrates around water sources, making game viewing easier.",
    pros: [
      "Firm, stable roads – easier for vehicle navigation",
      "Wildlife concentrated at waterholes – shorter distances",
      "River crossings for Great Migration (July-October)",
      "Ideal for photography",
    ],
    cons: [
      "Higher demand – book 6+ months in advance",
      "Higher prices for accommodations",
      "Dust can be an issue for respiratory conditions",
    ],
    packingTips: "Sunscreen, hat, light clothing, dust mask, binoculars, camera with zoom lens",
  },
  {
    icon: <CloudRain className="h-8 w-8 text-blue-600" />,
    season: "Green Season",
    months: "November – December & March – May",
    accessibility: "★★★★☆ Good",
    description:
      "Lush landscapes, baby animals, and fewer crowds. Roads remain accessible with our 4x4 vehicles.",
    pros: [
      "Lower prices and fewer tourists",
      "Lush green landscapes for photography",
      "Baby animals and birthing season (Jan-Feb)",
      "Easier to book last-minute",
    ],
    cons: [
      "Occasional muddy spots on roads",
      "Some wildlife spreads out due to abundant water",
      "Humidity higher in coastal areas",
    ],
    packingTips: "Light rain jacket, waterproof bag for electronics, insect repellent, light layers",
  },
  {
    icon: <Flower2 className="h-8 w-8 text-purple-600" />,
    season: "Shoulder Months",
    months: "January – February & June",
    accessibility: "★★★★☆ Very Good",
    description:
      "Sweet spot between seasons: good weather, fewer crowds, and excellent wildlife viewing.",
    pros: [
      "Calving season in January-February",
      "Migration preparation in June",
      "Moderate prices and availability",
      "Excellent weather conditions",
    ],
    cons: [
      "Can be windy in February",
      "Some camps close for maintenance in November",
    ],
    packingTips: "Layers for morning/evening chill, sun protection, comfortable safari clothing",
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// DISABILITY ACCOMMODATIONS DATA (groups of 3)
// ──────────────────────────────────────────────────────────────────────────────
const disabilityAccommodations = [
  {
    icon: <Accessibility className="h-8 w-8 text-blue-600" />,
    title: "Wheelchair Users",
    description:
      "Full-time and part-time wheelchair users are our specialty. Hydraulic lifts, securement systems, and barrier-free lodges.",
    features: [
      "400kg hydraulic lift vehicles",
      "Medical-grade securement systems",
      "Roll-in showers with benches",
      "Widened doorways (32+ inches)",
      "Ramps at all lodge entrances",
      "Accessible game viewing platforms",
    ],
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Limited Mobility",
    description:
      "For those who can walk short distances but need assistance with longer walks or stairs.",
    features: [
      "Step-free vehicle entry with lift",
      "Priority seating near vehicle door",
      "Walkers and canes accommodated",
      "Reduced walking itineraries",
      "Accessible bathrooms at stops",
      "Rest breaks as needed",
    ],
  },
  {
    icon: <Eye className="h-8 w-8 text-blue-600" />,
    title: "Visual Impairments",
    description:
      "Safari is an incredible sensory experience for blind and low-vision travelers.",
    features: [
      "Audio descriptions of wildlife",
      "Touch opportunities (with safety protocols)",
      "Scent and sound awareness guidance",
      "Guide dogs welcome",
      "Braille materials available",
      "Verbal navigation assistance",
    ],
  },
  {
    icon: <Mic className="h-8 w-8 text-blue-600" />,
    title: "Hearing Impairments",
    description:
      "We ensure full communication access for Deaf and hard of hearing travelers.",
    features: [
      "Sign language interpreters available",
      "Written materials for all information",
      "Visual alerts for important announcements",
      "Captioning on any video content",
      "Assistive listening devices",
      "Text-based communication options",
    ],
  },
  {
    icon: <Heart className="h-8 w-8 text-blue-600" />,
    title: "Cognitive & Neurodivergent",
    description:
      "Safaris can be adapted for travelers with autism, dementia, or other cognitive conditions.",
    features: [
      "Flexible, sensory-friendly pacing",
      "Quiet vehicle options",
      "Routine-based itineraries",
      "Visual schedules available",
      "Reduced stimulation game drives",
      "Supportive, patient guides",
    ],
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Medical Conditions",
    description:
      "Travelers with diabetes, respiratory conditions, or other medical needs are fully supported.",
    features: [
      "Onboard medical kits",
      "Refrigeration for medications",
      "Satellite phones for emergencies",
      "Flying doctor evacuation coverage",
      "Dietary accommodations",
      "Oxygen available on request",
    ],
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export default function DisabilityToursPage() {
  return (
    <><>
      <AllPageSEOSchema
        type="category"
        slug="disability-tours"
        categoryOpts={{
          title: "Disability-Friendly Safari Tours East Africa",
          description: "Inclusive safari experiences for travelers with disabilities. Adapted vehicles, accessible lodges.",
          image: "/wheelchair-accessible-tanzania-safari.webp",
          tours: tours.filter ? tours.filter((t: any) => t.slug?.includes("accessible") || t.title?.toLowerCase().includes("accessible") || t.description?.toLowerCase().includes("accessible")) : [],
        }} />
    </><div className="pb-16">
        <JsonLd id="page-structured-data" data={schema} />

        {/* ========== HERO SECTION ========== */}
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/accessible-safari-wheelchair.jpg"
              alt="Wheelchair user on hydraulic lift wheelchair accessible safari vehicle Kenya 2026 – Masai Mara game drive with JaeTravel"
              fill
              className="object-cover brightness-50"
              priority
              quality={90} />
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Accessibility className="h-10 w-10" />
            </div>

            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-balance md:text-6xl lg:text-7xl">
              Wheelchair Accessible Safari Kenya 2026 – Inclusive Adventures for All
            </h1>

            <div className="max-w-5xl mx-auto pl-70">
              <p className="mb-8 text-xl leading-relaxed text-white/90 text-pretty">
                Kenya's #1 operator for <strong>wheelchair accessible safari Kenya</strong> and{" "}
                <strong>wheelchair accessible tours in Kenya</strong>. German hydraulic lift 4x4
                vehicles, barrier-free lodges, Masai Mara Great Migration 2026 dates, and gorilla
                trekking Rwanda.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="min-w-[220px] text-lg">
                <Link href="#itineraries">View 2026 Itineraries</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[220px]">
                <Link href="/contact">Free Accessibility Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="min-w-[220px]">
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" /> WhatsApp Now
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ========== INTRODUCTION SECTION ========== */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="mb-4 font-serif text-3xl font-bold text-balance">
                  Inclusive Wheelchair Accessible Safaris – Redefining Adventure in Kenya 2026
                </h2>
                <div className="space-y-4 pl-2">
                  <div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      At Jae Travel, we believe <strong>disability should never limit discovery</strong>.
                      Our <strong>wheelchair accessible safari Kenya</strong> programs are designed for
                      travelers using wheelchairs, those with limited mobility, and special needs
                      families.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Custom-built vehicles with hydraulic lifts,{" "}
                      <strong>barrier-free lodges</strong>, and disability-trained guides make every{" "}
                      <strong>wheelchair accessible tour in Kenya</strong> seamless and unforgettable.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      From the Great Migration viewed from your wheelchair to gorilla encounters in
                      Rwanda – we make it possible.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-96 overflow-hidden rounded-xl shadow-xl">
                <Image
                  src="/1d4b068a-3c99-4055-8496-78e638eb1011.jpg"
                  alt="Group enjoying wheelchair accessible safari game drive in Kenya with adapted vehicle"
                  fill
                  className="object-cover"
                  quality={90} />
              </div>
            </div>
          </div>
        </section>

        {/* ========== ADVANCED FLEET SECTION ========== */}
        <section className="py-16 bg-muted/10">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
              Kenya's Most Advanced Wheelchair Accessible Safari Vehicles 2026
            </h2>
            <div className="max-w-5xl mx-auto text-center mb-12 pl-70">
              <p className="text-lg text-muted-foreground">
                German hydraulic lifts with 400kg capacity – the only fleet built exclusively for
                full-time wheelchair users on <strong>wheelchair accessible safari Kenya</strong>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <Image
                  src="/accessible-vehicle-lift.jpg"
                  alt="German hydraulic lift on wheelchair accessible safari vehicle Kenya 2026"
                  width={400}
                  height={300}
                  className="w-full rounded-lg mb-6"
                  quality={90} />
                <h3 className="font-semibold text-xl mb-3">German Hydraulic Lift System</h3>
                <p className="text-muted-foreground">
                  400kg capacity – enter and exit without leaving your wheelchair.
                </p>
              </div>

              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <Image
                  src="/wheelchair-securement.jpg"
                  alt="Medical-grade wheelchair securement wheelchair accessible safari Kenya"
                  width={400}
                  height={300}
                  className="w-full rounded-lg mb-6"
                  quality={90} />
                <h3 className="font-semibold text-xl mb-3">Four-Point Medical-Grade Securement</h3>
                <p className="text-muted-foreground">
                  ISO-certified restraints for rough African terrain.
                </p>
              </div>

              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <Image
                  src="/accessible-safari-interior.jpg"
                  alt="Spacious interior wheelchair accessible safari vehicle Masai Mara Kenya"
                  width={400}
                  height={300}
                  className="w-full rounded-lg mb-6"
                  quality={90} />
                <h3 className="font-semibold text-xl mb-3">Panoramic & Spacious Interior</h3>
                <p className="text-muted-foreground">
                  Climate control and wide doors for comfortable{" "}
                  <strong>wheelchair accessible tours in Kenya</strong>.
                </p>
              </div>

              <div className="rounded-xl bg-card p-8 shadow-sm border">
                <Image
                  src="/medical-kit-safari.jpg"
                  alt="Onboard medical facilities wheelchair accessible safari Kenya 2026"
                  width={400}
                  height={300}
                  className="w-full rounded-lg mb-6"
                  quality={90} />
                <h3 className="font-semibold text-xl mb-3">Onboard Medical & Safety Kit</h3>
                <p className="text-muted-foreground">
                  Full medical supplies for complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== COMPARISON TABLE with pl-60 ========== */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
              Why Travelers Choose JaeTravel for Wheelchair Accessible Safari Kenya
            </h2>
            <div className="max-w-5xl mx-auto overflow-x-auto pl-60">
              <table className="w-full border-collapse text-sm bg-card rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-5 text-left font-semibold">Feature</th>
                    <th className="p-5 font-semibold">JaeTravel</th>
                    <th className="p-5 font-semibold">Typical Operators</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-5 border-t font-medium">Lift Capacity</td>
                    <td className="p-5 border-t text-green-600 font-semibold">
                      400kg German hydraulic
                    </td>
                    <td className="p-5 border-t">Manual ramps (max 150kg)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">Securement System</td>
                    <td className="p-5 text-green-600 font-semibold">Medical-grade 4-point</td>
                    <td className="p-5">Basic straps</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">Lodge Access</td>
                    <td className="p-5 text-green-600 font-semibold">
                      Fully audited barrier-free
                    </td>
                    <td className="p-5">Standard lodges</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">2026 Dates</td>
                    <td className="p-5 text-green-600 font-semibold">
                      Guaranteed Masai Mara slots
                    </td>
                    <td className="p-5">Limited availability</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">Stay in Own Wheelchair</td>
                    <td className="p-5 text-green-600 font-semibold">Yes – full game drive</td>
                    <td className="p-5">Transfer required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========== 2026 DATES TABLE with pl-60 ========== */}
        <section className="py-16 bg-muted/10">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-serif text-4xl font-bold text-balance">
              2026 Wheelchair Accessible Safari Kenya Dates – Masai Mara & Gorilla Trekking
            </h2>
            <div className="max-w-5xl mx-auto overflow-x-auto pl-60">
              <table className="w-full border-collapse text-sm bg-card rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-5 text-left">Period</th>
                    <th className="p-5">Masai Mara</th>
                    <th className="p-5">Gorilla Trekking</th>
                    <th className="p-5">Wheelchair Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-5 font-medium">June–September</td>
                    <td className="p-5">Peak Great Migration</td>
                    <td className="p-5">Dry season – easy trails</td>
                    <td className="p-5 text-green-600 font-semibold">★★★★★ Best</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">July–October</td>
                    <td className="p-5">River crossings peak</td>
                    <td className="p-5">Excellent</td>
                    <td className="p-5 text-green-600 font-semibold">
                      Ideal for wheelchair users
                    </td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium">December–February</td>
                    <td className="p-5">Calving season</td>
                    <td className="p-5">Perfect trails</td>
                    <td className="p-5 text-green-600 font-semibold">Excellent access</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========== ACCESSIBILITY FEATURES (groups of 3) ========== */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                Comprehensive Accessibility Features for Your Safari
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every aspect of your <strong>wheelchair accessible safari Kenya</strong> is designed
                  with your needs in mind – from vehicles to lodges to guides.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {accessibilityFeatures.map((feature, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                    <details className="mt-2">
                      <summary className="text-sm text-primary cursor-pointer hover:underline">
                        Learn more
                      </summary>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {feature.longDescription}
                      </p>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== ITINERARIES SECTION ========== */}
        <section id="itineraries" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                Wheelchair Accessible Safari Itineraries Kenya 2026
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every itinerary includes <strong>wheelchair accessible safari vehicles</strong>,
                  barrier-free camps, and trained support staff for{" "}
                  <strong>disability tours in Kenya</strong>.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {accessibleItineraries.map((itinerary) => (
                <Card
                  key={itinerary.id}
                  className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-2">{itinerary.name}</h3>
                        <div className="flex flex-wrap gap-4 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {itinerary.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Map className="h-4 w-4" />
                            {itinerary.route}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{itinerary.description}</p>

                        <div className="grid gap-4 sm:grid-cols-2 mb-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-primary">Tour Highlights</h4>
                            <ul className="space-y-1 text-sm">
                              {itinerary.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 text-primary">
                              Accessibility Features
                            </h4>
                            <ul className="space-y-1 text-sm">
                              {itinerary.accessibility.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <Accessibility className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 text-center">Sketched Itinerary</h4>
                        <div className="space-y-3">
                          {itinerary.details.map((detail) => (
                            <div
                              key={detail.day}
                              className="flex gap-3 p-2 rounded bg-background"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                {detail.day}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{detail.location}</p>
                                <p className="text-xs text-muted-foreground">
                                  {detail.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button asChild className="w-full mt-4">
                          <Link href={`/contact?itinerary=${itinerary.id}`}>
                            Customize This Wheelchair Accessible Safari
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="max-w-3xl mx-auto pl-70 mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Don't see your perfect <strong>wheelchair accessible safari</strong> itinerary? We
                  specialize in custom routes designed specifically for your accessibility needs.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">Design Your Custom Accessible Safari</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE US (groups of 3) ========== */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                Why Choose Jae Travel for Your Wheelchair Accessible Safari
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We don't just accommodate disabilities – we specialize in creating exceptional{" "}
                  <strong>wheelchair accessible safari</strong> experiences.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Accessibility className="h-7 w-7 text-primary" />,
                  title: "Custom Wheelchair Accessible Safari Vehicles",
                  desc: "Hydraulic lifts, wide doors, secure restraints, pop-up roofs, and all-terrain tracked wheelchairs available.",
                },
                {
                  icon: <Shield className="h-7 w-7 text-primary" />,
                  title: "100% Barrier-Free Lodges & Camps",
                  desc: "Roll-in showers, grab bars, ramps, lowered beds, and accessible dining areas.",
                },
                {
                  icon: <Users className="h-7 w-7 text-primary" />,
                  title: "Disability-Trained Guides & Support Teams",
                  desc: "Certified in mobility assistance, sign language basics, and emergency protocols.",
                },
                {
                  icon: <Heart className="h-7 w-7 text-primary" />,
                  title: "Fully Personalized Wheelchair Accessible Itineraries",
                  desc: "Paced to your energy levels, medical requirements, and interests.",
                },
                {
                  icon: <Award className="h-7 w-7 text-primary" />,
                  title: "Award-Winning Accessible Tourism",
                  desc: "Recognized by Kenya Tourism Board for excellence in inclusive travel.",
                },
                {
                  icon: <Globe className="h-7 w-7 text-primary" />,
                  title: "Multi-Country Wheelchair Accessible Adventures",
                  desc: "Combine Kenya, Tanzania, Rwanda, and Uganda in one seamless journey.",
                },
              ].map((item, i) => (
                <Card key={i} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      {item.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== DESTINATION DEEP DIVE (groups of 3) ========== */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                Wheelchair Accessible Safari Destinations in East Africa
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Explore our top destinations for <strong>wheelchair accessible tours in Kenya</strong>{" "}
                  and beyond – each vetted for accessibility features and wildlife experiences.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {destinationDeepDive.map((dest, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-3 text-primary">{dest.icon}</div>
                    <h3 className="mb-1 text-xl font-semibold">{dest.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{dest.region}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium">Accessibility:</span>
                      <span className="text-yellow-500 text-sm">{dest.accessibility}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{dest.description}</p>
                    <details className="mt-2">
                      <summary className="text-sm text-primary cursor-pointer hover:underline">
                        Accessibility features & wildlife
                      </summary>
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-semibold">Accessible Features:</p>
                        <ul className="space-y-1 mb-3">
                          {dest.accessibleFeatures.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs">
                              <Check className="h-3 w-3 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm font-semibold">Best Time:</p>
                        <p className="text-xs text-muted-foreground mb-2">{dest.bestTime}</p>
                        <p className="text-sm font-semibold">Wildlife:</p>
                        <p className="text-xs text-muted-foreground">{dest.wildlife}</p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SEASONAL ACCESSIBILITY GUIDE (groups of 3) ========== */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                When to Go: Seasonal Guide for Wheelchair Accessible Safaris
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Understanding Kenya's seasons helps you plan the perfect{" "}
                  <strong>wheelchair accessible safari Kenya 2026</strong> experience.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {seasonalGuide.map((season, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      {season.icon}
                      <h3 className="text-xl font-bold">{season.season}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{season.months}</p>
                    <p className="text-sm font-semibold text-green-600 mb-3">{season.accessibility}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{season.description}</p>
                    <details className="mt-2">
                      <summary className="text-sm text-primary cursor-pointer hover:underline">
                        Pros, cons & packing tips
                      </summary>
                      <div className="mt-3">
                        <p className="text-sm font-semibold">Pros:</p>
                        <ul className="space-y-1 mb-3">
                          {season.pros.map((pro, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs">
                              <Check className="h-3 w-3 text-green-600" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm font-semibold">Cons:</p>
                        <ul className="space-y-1 mb-3">
                          {season.cons.map((con, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs">
                              <span className="text-red-500">—</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm font-semibold">Packing Tips:</p>
                        <p className="text-xs text-muted-foreground">{season.packingTips}</p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== ACCESSIBILITY BY DISABILITY TYPE (groups of 3) ========== */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                Accessibility Features by Disability Type
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every traveler is unique. We tailor your <strong>wheelchair accessible safari Kenya</strong>{" "}
                  to your specific needs and preferences.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {disabilityAccommodations.map((item, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                      {item.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                    <details className="mt-2">
                      <summary className="text-sm text-primary cursor-pointer hover:underline">
                        View accommodations
                      </summary>
                      <ul className="mt-3 space-y-1">
                        {item.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs">
                            <Check className="h-3 w-3 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== WHAT'S INCLUDED (split into groups of 3) ========== */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                What's Included in Every Wheelchair Accessible Safari
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From arrival to departure – everything is covered with wheelchair accessibility at the core.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Wheelchair-adapted 4x4 safari vehicles with hydraulic lifts and secure restraints",
                "Accessible airport transfers in Nairobi, Arusha, Kigali, or Entebbe",
                "Barrier-free lodge accommodations with roll-in showers, grab bars, and ramps",
                "All national park fees, conservation fees, and special accessibility permits",
                "English-speaking guide trained in disability support (multilingual on request)",
                "Pre-trip wheelchair accessibility consultation",
                "24/7 on-trip support hotline and emergency medical evacuation plan",
                "Portable all-terrain tracked wheelchair (on request)",
                "Accessible dining arrangements and dietary accommodations",
                "Custom pacing with flexible start times and rest stops",
                "Cultural experiences adapted for mobility and sensory needs",
                "Specialized equipment transfers and handling",
                "Accessible photography opportunities and viewing platforms",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FEATURED TOURS ========== */}
        <section id="tours" className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-4xl font-bold text-balance">
                Featured Wheelchair Accessible Safari Tours
              </h2>
              <div className="max-w-4xl mx-auto pl-70">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Choose from our most popular wheelchair accessible safari packages or let us design a custom itinerary.
                </p>
              </div>
            </div>

            {disabilityTours.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {disabilityTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="mb-4 text-muted-foreground">
                  New wheelchair accessible tours launching soon!
                </p>
                <Button asChild>
                  <Link href="/contact">Request Custom Wheelchair Accessible Safari</Link>
                </Button>
              </Card>
            )}

            <div className="mt-12 text-center">
              <div className="max-w-3xl mx-auto pl-70 mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  Can't find your ideal itinerary? We specialize in custom wheelchair accessible safaris.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">Build Your Custom Tour</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS (groups of 3) ========== */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
              Real Stories from Wheelchair Accessible Safari Travelers
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "David Chen",
                  location: "Canada",
                  disability: "T6 Paraplegic – Full-time Wheelchair User",
                  text: "The hydraulic lift vehicle was a game-changer. I saw cheetahs hunting at eye level from my wheelchair.",
                  rating: 5,
                  image: "/testimonial-david.jpg",
                },
                {
                  name: "Maria Rodriguez",
                  location: "Spain",
                  disability: "Limited Mobility – Uses Walker and Wheelchair",
                  text: "Accessible lodge in Serengeti had ramps to veranda and roll-in showers. Watched elephants at sunset every night.",
                  rating: 5,
                  image: "/testimonial-maria.jpg",
                },
                {
                  name: "James Wilson",
                  location: "UK",
                  disability: "Wheelchair User – Gorilla Trekking Experience",
                  text: "I cried when I saw the silverback gorilla from my adapted sedan chair. Truly life-changing.",
                  rating: 5,
                  image: "/testimonial-james.jpg",
                },
              ].map((t, i) => (
                <Card key={i} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-muted overflow-hidden relative">
                        <Image src={t.image} alt={t.name} width={64} height={64} className="object-cover" quality={90} />
                      </div>
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="italic text-muted-foreground leading-relaxed">"{t.text}"</p>
                    <p className="mt-3 text-xs text-muted-foreground italic">{t.disability}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FAQ SECTION ========== */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-balance">
              Frequently Asked Questions About Wheelchair Accessible Safaris
            </h2>
            <div className="mx-auto max-w-4xl space-y-6">
              {[
                {
                  q: "What types of disabilities do you accommodate?",
                  a: "We welcome wheelchair users, limited mobility, visual/hearing impairments, seniors, and cognitive conditions. Every trip starts with a free accessibility consultation.",
                },
                {
                  q: "Are the vehicles safe on rough terrain?",
                  a: "Yes. Custom-built with hydraulic lifts, shock-absorbing suspension, secure locks, and climate control – maintained to highest safety standards.",
                },
                {
                  q: "Can I bring my own wheelchair or power scooter?",
                  a: "Absolutely. We recommend lightweight/foldable models. Backup manual wheelchairs and charging stations provided.",
                },
                {
                  q: "How do you handle medical emergencies?",
                  a: "Guides carry satellite phones and first-aid kits. We partner with flying doctor services and pre-arrange wheelchair-accessible hospital access.",
                },
                {
                  q: "Is wheelchair accessible gorilla trekking possible?",
                  a: "Yes. Special permits and experienced sedan chair teams in Rwanda/Uganda. All adaptive equipment and trained staff included.",
                },
                {
                  q: "What makes your safaris different?",
                  a: "Built from the ground up for accessibility – custom vehicles, barrier-free accommodations, trained staff, adaptive equipment, and paced itineraries.",
                },
                {
                  q: "Are there extra costs for accessibility features?",
                  a: "No. All accessibility features are included in pricing – no hidden fees.",
                },
              ].map((faq, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-lg font-semibold text-primary">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
              <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-balance">
                Your Wheelchair Accessible Safari Kenya 2026 Awaits
              </h2>
              <div className="max-w-3xl mx-auto pl-70 mb-8">
                <p className="text-lg leading-relaxed text-primary-foreground/90 text-pretty">
                  Let our experts design a safe, comfortable, thrilling safari tailored to your needs – from first inquiry to final game drive.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Start Planning Your 2026 Safari</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  <a href="tel:+254726485228">Call +254 726 485 228</a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-primary-foreground/80">
                Free consultation • No obligation • Reply within 2 hours
              </p>
            </div>
          </div>
        </section>
      </div></>
  )
}