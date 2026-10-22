import { Link } from 'react-router-dom'
import { parseInline } from '../model/inline'
import type { GuideBlock } from '../model/types'

function Inline({ text }: { text: string }) {
  return parseInline(text).map((t, i) =>
    t.type === 'strong' ? (
      <strong key={i}>{t.text}</strong>
    ) : t.type === 'link' ? (
      <Link key={i} to={t.href}>
        {t.text}
      </Link>
    ) : (
      t.text
    ),
  )
}

// 가이드 본문 블록 렌더러. 스타일은 DocPage 의 본문 규칙을 따른다
export function GuideBody({ blocks }: { blocks: GuideBlock[] }) {
  return blocks.map((b, i) => {
    if ('h2' in b) return <h2 key={i}><Inline text={b.h2} /></h2>
    if ('h3' in b) return <h3 key={i}><Inline text={b.h3} /></h3>
    if ('p' in b) return <p key={i}><Inline text={b.p} /></p>
    if ('note' in b)
      return (
        <p key={i} className="rounded-md bg-surface-soft px-4 py-3 text-[14px] text-ink">
          <Inline text={b.note} />
        </p>
      )
    if ('ul' in b)
      return (
        <ul key={i}>
          {b.ul.map((item, j) => (
            <li key={j}><Inline text={item} /></li>
          ))}
        </ul>
      )
    if ('ol' in b)
      return (
        <ol key={i}>
          {b.ol.map((item, j) => (
            <li key={j}><Inline text={item} /></li>
          ))}
        </ol>
      )
    return (
      <div key={i} className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {b.table.head.map((h, j) => (
                <th key={j}><Inline text={h} /></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((row, j) => (
              <tr key={j}>
                {row.map((cell, k) => (
                  <td key={k}><Inline text={cell} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  })
}
