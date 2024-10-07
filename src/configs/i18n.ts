export const i18n = {
  defaultLocale: 'uz',
  locales: ['en', 'ru', 'uz'],
  langDirection: {
    en: 'ltr',
    ru: 'ltr',
    uz: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
