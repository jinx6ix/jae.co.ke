// lib/i18n/data/de/tours-data.ts
// German translated tour metadata

export interface TranslatedTour {
  slug: string; title: string; shortDescription: string
  metaTitle: string; metaDescription: string; keywords: string[]
  highlights: string[]; included: string[]; excluded: string[]
}

export const deTours: TranslatedTour[] = [
  {
    slug: "masai-mara-luxury-safari",
    title: "Luxus-Safari im Masai Mara",
    shortDescription: "5-tägige Luxussafari im berühmtesten Wildreservat Kenias",
    metaTitle: "Masai Mara Luxus Safari 2026 | JaeTravel Expeditionen",
    metaDescription: "Buchen Sie Ihre Masai Mara Luxussafari mit JaeTravel. Genießen Sie Pirschfahrten, Luxuslodges und Expertenführer in Kenia. Ab 3.500 USD.",
    keywords: ["masai mara luxus safari", "kenia safari luxus", "masai mara 2026", "große migration kenia", "safari kenia buchen"],
    highlights: ["Pirschfahrten im Masai-Mara-Nationalreservat","Unterkunft im Luxus-Zeltcamp","Optionale Heißluftballonfahrt","Professioneller Wildführer","Alle Mahlzeiten inklusive"],
    included: ["Unterkunft in Luxuslodges","Alle Mahlzeiten und Getränke","Pirschfahrten im 4x4","Professioneller Führerservice","Parkeintrittsgebühren"],
    excluded: ["Internationale Flüge","Reiseversicherung","Trinkgelder","Persönliche Ausgaben","Visagebühren"],
  },
  {
    slug: "gorilla-trekking-experience",
    title: "Gorilla-Trekking-Erlebnis",
    shortDescription: "Begegnen Sie Berggorillas in ihrem natürlichen Lebensraum in Ruanda oder Uganda",
    metaTitle: "Gorilla Trekking Ruanda & Uganda 2026 | JaeTravel",
    metaDescription: "Erleben Sie Berggorilla-Trekking in Ruanda und Uganda mit JaeTravel. Genehmigungen, Luxuslodges und zertifizierte Guides inklusive.",
    keywords: ["gorilla trekking ruanda", "berggorillas uganda", "gorilla safari afrika", "bwindi urwald", "vulkane nationalpark ruanda"],
    highlights: ["Begegnung mit Berggorillas","Bwindi Unzugänglicher Urwald","Virunga-Nationalpark","Zertifizierter Gorillaführer","Maximal 8 Personen pro Gruppe"],
    included: ["Gorilla-Trekkingerlaubnis","Luxuslodge-Unterkunft","Alle Mahlzeiten","4x4-Transport","Spezialisierter Gorillaführer"],
    excluded: ["Internationale Flüge","Visum Ruanda/Uganda","Reiseversicherung","Trinkgelder","Persönliche Ausgaben"],
  },
  {
    slug: "serengeti-migration-tour",
    title: "Serengeti Große Migration Tour",
    shortDescription: "Zeuge der Großen Migration in der tansanischen Serengeti werden",
    metaTitle: "Große Migration Serengeti Tansania 2026 | JaeTravel",
    metaDescription: "Erleben Sie die Große Gnu-Migration in der Serengeti mit JaeTravel. Pirschfahrten, Flussüberquerungen und Luxusunterkunft inklusive.",
    keywords: ["große migration serengeti", "tansania safari serengeti", "gnu migration afrika", "serengeti 2026", "mara fluss überquerung"],
    highlights: ["Große Gnu-Migration","Dramatische Mara-Flussüberquerungen","Über 1,5 Millionen Gnus","Morgen- und Abendpirsch","Außergewöhnliche Wildtierfotografie"],
    included: ["Lodge/Camp-Unterkunft","Alle Mahlzeiten","Pop-up-Dach-Fahrzeuge","Expertenführer","Nationalparkgebühren"],
    excluded: ["Internationale Flüge","Tansania-Visum","Versicherung","Trinkgelder","Persönliche Ausgaben"],
  },
  {
    slug: "amboseli-safari",
    title: "Amboseli Safari-Abenteuer",
    shortDescription: "4-tägige Safari mit spektakulärem Kilimandscharo-Blick",
    metaTitle: "Amboseli Safari Kenia mit Kilimandscharo-Blick 2026 | JaeTravel",
    metaDescription: "Erkunden Sie den Amboseli-Nationalpark mit geführten Pirschfahrten und Blick auf den Kilimandscharo. Elefanten, Löwen und Big Five.",
    keywords: ["amboseli safari kenia", "kilimandscharo aussicht safari", "elefanten amboseli", "amboseli nationalpark", "big five safari kenia"],
    highlights: ["Panoramablick auf den Kilimandscharo","Große Elefantenherden","Big-Five-Sichtungen","Flamingos am Amboseli-See","Spektakuläre Sonnenuntergänge"],
    included: ["Loge-Unterkunft","Mahlzeiten inklusive","4x4-Pirschfahrten","Expertenführer","Eintrittsgebühren"],
    excluded: ["Flüge","Visum","Versicherung","Trinkgelder","Persönliche Ausgaben"],
  },
  {
    slug: "wheelchair-accessible-safari",
    title: "Rollstuhlgerechte Safari Kenia",
    shortDescription: "Speziell adaptierte Safari für Rollstuhlfahrer mit deutschen Hydraulikliften",
    metaTitle: "Rollstuhlgerechte Safari Kenia 2026 | Hydrauliklift 4x4 | JaeTravel",
    metaDescription: "Kenia-Safari für Rollstuhlfahrer mit deutschen Hydraulikliften (400 kg). Masai Mara, barrierefreie Lodges. Buchen Sie jetzt Ihre inklusive Safari.",
    keywords: ["rollstuhl safari kenia", "barrierefreie safari afrika", "hydrauliklift safari fahrzeug", "inklusives reisen kenia", "behindertengerechte safari"],
    highlights: ["Deutsches Hydrauliklift-System (400 kg)","Angepasste 4x4-Fahrzeuge","Barrierefreie Lodge-Unterkunft","Medizinisch ausgestattetes Fahrzeug","Erfahrene inklusive Reiseführer"],
    included: ["Angepasster 4x4 mit Hydrauliklift","Barrierefreie Lodge","Alle Mahlzeiten","Spezialisierter Führer","Parkeintritt"],
    excluded: ["Flüge","Visum","Versicherung","Pourboires","Persönliche Extras"],
  },
]

export function getDeTourBySlug(slug: string): TranslatedTour | undefined {
  return deTours.find(t => t.slug === slug)
}
