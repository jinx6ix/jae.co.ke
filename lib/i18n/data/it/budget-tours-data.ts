// lib/i18n/data/it/budget-tours-data.ts — stub, extend with translations
export interface TranslatedBudgetTour { slug: string; title: string; metaTitle: string; metaDescription: string; keywords: string[]; shortDescription: string }
export const budgetTours_it: TranslatedBudgetTour[] = []
export function getBudgetTourBySlug_it(slug: string) { return budgetTours_it.find((t) => t.slug === slug) }
