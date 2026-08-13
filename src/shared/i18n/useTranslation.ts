import { useLocale } from '../contexts/LocaleContext'
import { translations, getNestedValue } from './translations'

export function useTranslation() {
  const { locale } = useLocale()

  const t = (key: string, replacements?: Record<string, string>): string => {
    let text = getNestedValue(translations[locale], key)
    
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        text = text.replace(`{${placeholder}}`, value)
      })
    }
    
    return text
  }

  return { t, locale }
}
