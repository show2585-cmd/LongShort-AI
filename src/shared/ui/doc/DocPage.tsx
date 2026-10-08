import type { ReactNode } from 'react'

interface DocPageProps {
  eyebrow?: string
  title: string
  updatedAt?: string
  children: ReactNode
}

// 정책·소개 등 텍스트 위주 페이지 공통 레이아웃
export function DocPage({ eyebrow, title, updatedAt, children }: DocPageProps) {
  return (
    <article className="mx-auto max-w-[760px] px-4 py-16 lg:py-24">
      {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
      <h1 className="mt-2 text-[36px] leading-tight font-normal tracking-tight sm:text-[44px]">{title}</h1>
      {updatedAt && <p className="mt-3 text-sm text-muted">시행일 {updatedAt}</p>}
      <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-body [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-ink [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:border-hairline [&_td]:py-2.5 [&_td]:pr-4 [&_td]:align-top [&_th]:py-2.5 [&_th]:pr-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </article>
  )
}
