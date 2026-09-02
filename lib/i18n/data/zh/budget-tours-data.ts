// lib/i18n/data/zh/budget-tours-data.ts — stub, extend with translations
export interface TranslatedBudgetTour { slug: string; title: string; metaTitle: string; metaDescription: string; keywords: string[]; shortDescription: string }
export const budgetTours_zh: TranslatedBudgetTour[] = []
export function getBudgetTourBySlug_zh(slug: string) { return budgetTours_zh.find((t) => t.slug === slug) }
