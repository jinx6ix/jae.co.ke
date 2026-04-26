// lib/i18n/data/de/budget-tours-data.ts — stub, extend with translations
export interface TranslatedBudgetTour { slug: string; title: string; metaTitle: string; metaDescription: string; keywords: string[]; shortDescription: string }
export const budgetTours_de: TranslatedBudgetTour[] = []
export function getBudgetTourBySlug_de(slug: string) { return budgetTours_de.find((t) => t.slug === slug) }
