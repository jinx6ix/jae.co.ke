// lib/i18n/data/it/tours-data.ts — Italian tour data
export interface TranslatedTour {
  slug: string; title: string; shortDescription: string
  metaTitle: string; metaDescription: string; keywords: string[]
  highlights: string[]; included: string[]; excluded: string[]
}

export const itTours: TranslatedTour[] = [
  {
    slug: "masai-mara-luxury-safari",
    title: "Safari di Lusso al Masai Mara",
    shortDescription: "Safari di lusso di 5 giorni nella riserva naturale più famosa del Kenya",
    metaTitle: "Safari Masai Mara Lusso 2026 | JaeTravel Spedizioni",
    metaDescription: "Prenota il tuo safari di lusso al Masai Mara con JaeTravel. Game drive, lodge di lusso e guide esperte in Kenya. Da 3.500 USD.",
    keywords: ["safari masai mara lusso", "safari kenya lusso", "masai mara 2026", "grande migrazione kenya", "tour safari kenya"],
    highlights: ["Game drive nella Riserva Nazionale del Masai Mara","Alloggio in campo tenda di lusso","Safari in mongolfiera opzionale","Guida naturalistica professionista","Tutti i pasti inclusi"],
    included: ["Alloggio in lodge di lusso","Tutti i pasti e bevande","Game drive in 4x4","Servizi guida professionista","Quote d'ingresso al parco"],
    excluded: ["Voli internazionali","Assicurazione viaggio","Mance","Spese personali","Tasse visto"],
  },
  {
    slug: "gorilla-trekking-experience",
    title: "Esperienza di Trekking con i Gorilla",
    shortDescription: "Incontra i gorilla di montagna nel loro habitat naturale in Ruanda o Uganda",
    metaTitle: "Trekking Gorilla Ruanda & Uganda 2026 | JaeTravel",
    metaDescription: "Vivi il trekking dei gorilla di montagna in Ruanda e Uganda con JaeTravel. Permessi, lodge di lusso e guide certificate inclusi.",
    keywords: ["trekking gorilla ruanda", "gorilla montagna uganda", "safari gorilla africa", "foresta bwindi", "parco vulcani ruanda"],
    highlights: ["Incontro con gorilla di montagna","Foresta Impenetrabile di Bwindi","Parco Nazionale dei Vulcani","Guida certificata gorilla","Massimo 8 persone per gruppo"],
    included: ["Permesso trekking gorilla","Alloggio lodge lusso","Tutti i pasti","Trasporto 4x4","Guida specializzata gorilla"],
    excluded: ["Voli internazionali","Visto Ruanda/Uganda","Assicurazione","Mance","Spese personali"],
  },
  {
    slug: "serengeti-migration-tour",
    title: "Tour della Grande Migrazione del Serengeti",
    shortDescription: "Testimone della Grande Migrazione nel Serengeti tanzaniano",
    metaTitle: "Grande Migrazione Serengeti Tanzania 2026 | JaeTravel",
    metaDescription: "Assisti alla Grande Migrazione degli gnu nel Serengeti con JaeTravel. Game drive, attraversamenti del fiume e alloggio di lusso inclusi.",
    keywords: ["grande migrazione serengeti", "safari tanzania serengeti", "migrazione gnu africa", "serengeti 2026", "attraversamento fiume mara"],
    highlights: ["Grande Migrazione degli gnu","Drammatici attraversamenti del fiume Mara","Oltre 1,5 milioni di gnu","Game drive alba e tramonto","Fotografia naturalistica eccezionale"],
    included: ["Alloggio lodge/camp","Tutti i pasti","Veicoli con tetto apribile","Guida esperta","Quote parco nazionale"],
    excluded: ["Voli internazionali","Visto Tanzania","Assicurazione","Mance","Spese personali"],
  },
]

export function getItTourBySlug(slug: string): TranslatedTour | undefined {
  return itTours.find(t => t.slug === slug)
}
