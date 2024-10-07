// Third-party Imports
import 'server-only'

// Type Imports
import type { Locale } from '@configs/i18n'

const dictionaries = {
  en: () => import('@/data/dictionaries/en.json').then(module => module.default),
  ru: () => import('@/data/dictionaries/ru.json').then(module => module.default),
  uz: () => import('@/data/dictionaries/uz.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
