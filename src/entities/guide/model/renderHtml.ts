import { parseInline } from './inline'
import type { GuideBlock } from './types'

// 빌드 시 정적 HTML 생성용 (vite-plugin-seo.ts). 화면 렌더링은 ui/GuideBody.tsx 가 담당
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function inlineToHtml(src: string) {
  return parseInline(src)
    .map((t) =>
      t.type === 'strong'
        ? `<strong>${esc(t.text)}</strong>`
        : t.type === 'link'
          ? `<a href="${esc(t.href)}">${esc(t.text)}</a>`
          : esc(t.text),
    )
    .join('')
}

export function blocksToHtml(blocks: GuideBlock[]) {
  return blocks
    .map((b) => {
      if ('h2' in b) return `<h2>${inlineToHtml(b.h2)}</h2>`
      if ('h3' in b) return `<h3>${inlineToHtml(b.h3)}</h3>`
      if ('p' in b) return `<p>${inlineToHtml(b.p)}</p>`
      if ('note' in b) return `<blockquote>${inlineToHtml(b.note)}</blockquote>`
      if ('ul' in b) return `<ul>${b.ul.map((i) => `<li>${inlineToHtml(i)}</li>`).join('')}</ul>`
      if ('ol' in b) return `<ol>${b.ol.map((i) => `<li>${inlineToHtml(i)}</li>`).join('')}</ol>`
      const head = b.table.head.map((h) => `<th>${inlineToHtml(h)}</th>`).join('')
      const rows = b.table.rows.map((r) => `<tr>${r.map((c) => `<td>${inlineToHtml(c)}</td>`).join('')}</tr>`).join('')
      return `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`
    })
    .join('\n')
}

// 읽는 시간 계산용 본문 글자 수
export function blocksText(blocks: GuideBlock[]) {
  return blocks
    .map((b) =>
      'h2' in b ? b.h2
      : 'h3' in b ? b.h3
      : 'p' in b ? b.p
      : 'note' in b ? b.note
      : 'ul' in b ? b.ul.join(' ')
      : 'ol' in b ? b.ol.join(' ')
      : [...b.table.head, ...b.table.rows.flat()].join(' '),
    )
    .join(' ')
}
