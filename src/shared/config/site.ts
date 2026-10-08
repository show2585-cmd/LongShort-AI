// 사이트 메타데이터. vite.config.ts(빌드 시 index.html·robots·sitemap 생성)와 앱에서 함께 사용하므로
// import.meta.env 등 브라우저 전용 API 를 쓰지 않는다.
export const SITE = {
  name: 'LongShort AI',
  // 운영 도메인 (canonical · og:url · sitemap 기준). VITE_SITE_URL 로 덮어쓸 수 있음
  url: 'https://longshort-ai.com',
  title: 'LongShort AI - 코인 롱숏 추세 확률 · 롱숏 비율 · 청산맵',
  description:
    '비트코인·이더리움 등 코인 선물의 5분·15분·1시간·4시간·1일봉 롱/숏 추세를 확률로 보여주고, 바이낸스 실시간 롱숏 비율과 청산맵을 함께 제공하는 무료 분석 도구입니다. 레퍼럴·유료 멤버십 없이 운영합니다.',
  keywords: [
    '롱숏 비율',
    '비트코인 롱숏',
    '코인 추세',
    '청산맵',
    '청산 히트맵',
    '바이낸스 롱숏비율',
    '비트코인 선물',
    '롱 숏 확률',
    '코인 차트 분석',
  ],
  locale: 'ko_KR',
  themeColor: '#0a0b0d',
  ogImage: '/og-image.png',
} as const

export function symbolPageTitle(base: string, name: string) {
  return `${name}(${base}) 롱숏 추세 확률 · 롱숏 비율 · 청산맵 | ${SITE.name}`
}
