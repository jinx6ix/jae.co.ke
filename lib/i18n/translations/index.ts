// lib/i18n/translations/index.ts — Translation loader
import { en } from "./en"
import { fr } from "./fr"
import { de } from "./de"
import { it } from "./it"
import { hi } from "./hi"
import { ar } from "./ar"
import { zh } from "./zh"
import type { Locale } from "../config"

export const translations = { en, fr, de, it, hi, ar, zh }

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en
}

export type { Translations } from "./en"
