// 가이드 본문은 JSX 대신 데이터로 둔다. 앱(React)과 빌드 플러그인(정적 HTML 생성)이 같은 원본을 쓰기 위함이므로
// 이 폴더에서는 '@/' 별칭이나 브라우저 전용 API 를 쓰지 않는다.

// 문자열 안에서 **굵게**, [링크](/path) 인라인 표기를 지원한다
export type GuideBlock =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string } // 강조 상자 (요약 · 주의)

export interface GuideContent {
  title: string
  description: string // 목록 카드 · meta description
  body: GuideBlock[]
}

export interface GuideArticle {
  slug: string
  publishedAt: string // YYYY-MM-DD
  updatedAt: string
  ko: GuideContent
  en: GuideContent
}
