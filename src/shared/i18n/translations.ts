import { en } from './en'
import { ar } from './ar'

export const translations = {
  en,
  ar,
}

export type TranslationKey = keyof typeof en
export type Locale = keyof typeof translations

// Helper function to get nested translation value
export function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const value = path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
  
  return typeof value === 'string' ? value : path
}
