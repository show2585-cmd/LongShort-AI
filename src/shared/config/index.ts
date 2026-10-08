import { SITE } from './site'

export { SITE, symbolPageTitle } from './site'

export const APP_NAME = 'LongShort AI'
export const CONTACT_EMAIL = 'show2585@gmail.com'

// Binance USDT-M 선물 공개 API. 개발 환경에서는 vite proxy(/binance)를 통해 CORS 를 우회하고,
// 프로덕션에서는 동일 경로로 리버스 프록시를 두는 것을 전제로 합니다.
export const BINANCE_FAPI_URL = import.meta.env.VITE_BINANCE_FAPI_URL || '/binance'

// true 이면 실제 API 대신 합성 데이터를 사용합니다 (UI 개발/데모 전용).
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// 개발자 후원(카카오페이 송금 링크). 비어 있으면 후원 팝업에 "준비 중" 표시
export const KAKAOPAY_URL = 'https://qr.kakaopay.com/Ej9JEsKht'

// Google AdSense (광고 단위 ID 미설정 시 해당 광고 영역을 렌더링하지 않음)
export const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || SITE.adsenseClient
export const AD_SLOTS = {
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || '',
  content: import.meta.env.VITE_ADSENSE_SLOT_CONTENT || '',
}
