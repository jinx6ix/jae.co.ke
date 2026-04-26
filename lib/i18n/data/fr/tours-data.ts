// lib/i18n/data/fr/tours-data.ts
// Translated tour metadata for French — core tours that drive French search traffic
// Full content is in the page component; this file provides SEO metadata + translated fields

export interface TranslatedTour {
  slug: string
  title: string
  shortDescription: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  highlights: string[]
  included: string[]
  excluded: string[]
}

export const frTours: TranslatedTour[] = [
  {
    slug: "masai-mara-luxury-safari",
    title: "Safari de Luxe au Masai Mara",
    shortDescription: "Safari de luxe de 5 jours dans la réserve animalière la plus célèbre du Kenya",
    metaTitle: "Safari Masai Mara Luxe 2026 | JaeTravel Expéditions",
    metaDescription: "Réservez votre safari de luxe au Masai Mara avec JaeTravel. Profitez de game drives, lodges de luxe et guides experts au Kenya. À partir de 3 500 USD.",
    keywords: ["safari masai mara luxe", "safari kenya luxe", "masai mara 2026", "circuit safari kenya", "grande migration kenya"],
    highlights: ["Game drives dans la Réserve Nationale du Masai Mara","Hébergement en camp de tente de luxe","Ballon safari optionnel","Guide animalier professionnel","Tous les repas inclus"],
    included: ["Hébergement dans des lodges de luxe","Tous les repas et boissons","Game drives en 4x4","Services de guide professionnel","Droits d'entrée dans le parc"],
    excluded: ["Vols internationaux","Assurance voyage","Pourboires","Dépenses personnelles","Frais de visa"],
  },
  {
    slug: "gorilla-trekking-experience",
    title: "Expérience de Trekking avec les Gorilles",
    shortDescription: "Rencontrez les gorilles de montagne dans leur habitat naturel au Rwanda ou en Ouganda",
    metaTitle: "Trekking Gorilles Rwanda & Ouganda 2026 | JaeTravel",
    metaDescription: "Vivez le trekking des gorilles de montagne au Rwanda et en Ouganda avec JaeTravel. Permis, lodges de luxe et guides certifiés inclus.",
    keywords: ["trekking gorilles rwanda", "gorilles montagne ouganda", "safari gorilles afrique", "bwindi forêt impénétrable", "parc volcans rwanda"],
    highlights: ["Rencontre avec les gorilles de montagne","Forêt de Bwindi Impénétrable","Parc National des Volcans","Guide certifié gorilles","Maximum 8 personnes par groupe"],
    included: ["Permis de trekking gorilles","Hébergement luxury lodge","Tous les repas","Transport 4x4","Guide spécialisé gorilles"],
    excluded: ["Vols internationaux","Visa Rwanda/Ouganda","Assurance voyage","Pourboires","Dépenses personnelles"],
  },
  {
    slug: "serengeti-migration-tour",
    title: "Tour de la Grande Migration du Serengeti",
    shortDescription: "Témoin de la Grande Migration dans le Serengeti tanzanien",
    metaTitle: "Grande Migration Serengeti Tanzanie 2026 | JaeTravel",
    metaDescription: "Assistez à la Grande Migration des gnous dans le Serengeti avec JaeTravel. Game drives, traversées de rivières et logement de luxe inclus.",
    keywords: ["grande migration serengeti", "safari tanzanie serengeti", "migration gnous afrique", "serengeti 2026", "traversée rivière mara"],
    highlights: ["Grande Migration des gnous","Traversées dramatiques de la rivière Mara","Plus de 1,5 million de gnous","Game drives aube et crépuscule","Photographie animalière exceptionnelle"],
    included: ["Hébergement en lodge/camp","Tous les repas","Game drives en véhicule pop-up roof","Guide expert","Droits d'entrée parc national"],
    excluded: ["Vols internationaux","Visa Tanzanie","Assurance","Pourboires","Dépenses personnelles"],
  },
  {
    slug: "amboseli-safari",
    title: "Safari Aventure à Amboseli",
    shortDescription: "Safari de 4 jours avec vues spectaculaires sur le Kilimandjaro",
    metaTitle: "Safari Amboseli Kenya avec Vue Kilimandjaro 2026 | JaeTravel",
    metaDescription: "Explorez le Parc National d'Amboseli avec game drives guidés et vues sur le Mont Kilimandjaro. Éléphants, lions et Big Five.",
    keywords: ["safari amboseli kenya", "kilimandjaro vue safari", "éléphants amboseli", "parc national amboseli", "safari big five kenya"],
    highlights: ["Vue panoramique sur le Kilimandjaro","Grandes hardes d'éléphants","Big Five sightings","Flamants roses du Lac Amboseli","Couchers de soleil spectaculaires"],
    included: ["Hébergement lodge","Repas inclus","Game drives 4x4","Guide expert","Droits d'entrée"],
    excluded: ["Vols","Visa","Assurance","Pourboires","Dépenses personnelles"],
  },
  {
    slug: "bwindi-gorilla-trek",
    title: "Trekking des Gorilles de Bwindi",
    shortDescription: "Rencontre inoubliable avec les gorilles de montagne dans la Forêt de Bwindi",
    metaTitle: "Trekking Gorilles Forêt Bwindi Ouganda 2026 | JaeTravel",
    metaDescription: "Trekking des gorilles dans la Forêt Impénétrable de Bwindi. Permis, logement et guide certifié inclus. Réservez votre aventure ougandaise.",
    keywords: ["gorilles bwindi ouganda", "forêt impénétrable bwindi", "trekking gorilles ouganda", "safari ouganda", "gorilles montagne"],
    highlights: ["Forêt Impénétrable de Bwindi UNESCO","Gorilles de montagne en liberté","Petits groupes max 8 personnes","Guides certifiés UWA","Expérience de vie sauvage unique"],
    included: ["Permis gorilles","Lodge de luxe","Repas","Transport","Guide UWA certifié"],
    excluded: ["Vols","Visa ougandais","Assurance","Pourboires","Extras personnels"],
  },
]

export function getFrTourBySlug(slug: string): TranslatedTour | undefined {
  return frTours.find(t => t.slug === slug)
}
