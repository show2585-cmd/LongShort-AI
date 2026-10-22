export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'strong'; text: string }
  | { type: 'link'; text: string; href: string }

const INLINE_RE = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g

// "**굵게** 와 [링크](/guide)" → 토큰 배열
export function parseInline(src: string): InlineToken[] {
  const out: InlineToken[] = []
  let last = 0
  for (const m of src.matchAll(INLINE_RE)) {
    if (m.index > last) out.push({ type: 'text', text: src.slice(last, m.index) })
    if (m[1] !== undefined) out.push({ type: 'strong', text: m[1] })
    else out.push({ type: 'link', text: m[2], href: m[3] })
    last = m.index + m[0].length
  }
  if (last < src.length) out.push({ type: 'text', text: src.slice(last) })
  return out
}

// 본문 글자 수 기준 읽는 시간(분). 한국어 약 500자/분, 영어 약 1,100자(≈220단어)/분
export function readMinutes(chars: number, locale: 'ko' | 'en') {
  return Math.max(1, Math.round(chars / (locale === 'en' ? 1100 : 500)))
}
