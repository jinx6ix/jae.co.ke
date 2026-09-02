// lib/i18n/data/hi/budget-tours-data.ts — stub, extend with translations
export interface TranslatedBudgetTour { slug: string; title: string; metaTitle: string; metaDescription: string; keywords: string[]; shortDescription: string }
export const budgetTours_hi: TranslatedBudgetTour[] = []
export function getBudgetTourBySlug_hi(slug: string) { return budgetTours_hi.find((t) => t.slug === slug) }
