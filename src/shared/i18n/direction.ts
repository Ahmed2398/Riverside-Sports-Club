export type Locale = 'en' | 'ar'

export function setDocumentDirection(locale: Locale): void {
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale
}
