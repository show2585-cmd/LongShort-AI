import 'i18next'
import type { ko } from './locales/ko'

// t('...') 키를 ko.ts 구조로 타입 검사
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: typeof ko }
  }
}
