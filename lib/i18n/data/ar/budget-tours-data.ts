// lib/i18n/data/ar/budget-tours-data.ts — stub, extend with translations
export interface TranslatedBudgetTour { slug: string; title: string; metaTitle: string; metaDescription: string; keywords: string[]; shortDescription: string }
export const budgetTours_ar: TranslatedBudgetTour[] = []
export function getBudgetTourBySlug_ar(slug: string) { return budgetTours_ar.find((t) => t.slug === slug) }
