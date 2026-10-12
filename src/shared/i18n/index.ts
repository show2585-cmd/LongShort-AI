import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next, useTranslation } from 'react-i18next'
import { en } from './locales/en'
import { ko } from './locales/ko'

export const LOCALES = ['ko', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export type { Messages } from './locales/ko'

const detector = new LanguageDetector()
// 검색엔진 크롤러는 브라우저 언어가 영어로 잡히므로, 정적 SEO(index.html·site.ts)와 같은 한국어로 렌더링한다
detector.addDetector({
  name: 'crawler',
  lookup: () =>
    /bot|crawl|spider|slurp|yeti|daum|mediapartners/i.test(navigator.userAgent) ? 'ko' : undefined,
})

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: { ko: { translation: ko }, en: { translation: en } },
    supportedLngs: LOCALES,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React 가 이스케이프 처리
    detection: {
      // ?lang=en 으로 공유 링크에서 언어 지정 가능. 사용자가 고른 언어는 localStorage 에 기억
      order: ['querystring', 'crawler', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

const syncHtmlLang = (lng: string) => document.documentElement.setAttribute('lang', lng)
syncHtmlLang(i18n.resolvedLanguage ?? 'ko')
i18n.on('languageChanged', () => syncHtmlLang(i18n.resolvedLanguage ?? 'ko'))

export function useLocale(): Locale {
  const { i18n } = useTranslation()
  return i18n.resolvedLanguage === 'en' ? 'en' : 'ko'
}

const DATE_LOCALE: Record<Locale, string> = { ko: 'ko-KR', en: 'en-US' }

// 2026-10-08 → "2026년 10월 8일" / "October 8, 2026"
export function formatLongDate(isoDate: string, locale: Locale) {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString(DATE_LOCALE[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export { i18n }
