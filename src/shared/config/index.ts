export { SITE, symbolPageTitle } from './site'

export const APP_NAME = 'LongShort AI'
export const CONTACT_EMAIL = 'show2585@gmail.com'

// Binance USDT-M 선물 공개 API. 개발 환경에서는 vite proxy(/binance)를 통해 CORS 를 우회하고,
// 프로덕션에서는 동일 경로로 리버스 프록시를 두는 것을 전제로 합니다.
export const BINANCE_FAPI_URL = import.meta.env.VITE_BINANCE_FAPI_URL || '/binance'

// true 이면 실제 API 대신 합성 데이터를 사용합니다 (UI 개발/데모 전용).
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Google AdSense (미설정 시 광고 영역을 렌더링하지 않음)
export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || ''
export const AD_SLOTS = {
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || '',
  content: import.meta.env.VITE_ADSENSE_SLOT_CONTENT || '',
}
