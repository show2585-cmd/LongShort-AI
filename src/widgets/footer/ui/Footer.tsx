import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { APP_NAME, CONTACT_EMAIL } from '@/shared/config'
import { Logo } from '@/shared/ui'

const LINKS = [
  { to: '/about', label: '서비스 소개' },
  { to: '/terms', label: '이용약관' },
  { to: '/privacy', label: '개인정보처리방침', strong: true },
] as const

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <nav aria-label="정책" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={'strong' in l ? 'font-semibold text-ink hover:underline' : 'text-body hover:text-ink hover:underline'}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 space-y-3 border-t border-hairline-soft pt-6 text-[13px] leading-relaxed text-muted">
          <p>
            {APP_NAME} 는 레퍼럴 코드·유료 멤버십·리딩방을 운영하지 않습니다. 제공되는 모든 정보는 기술적 지표와 공개
            시장 데이터를 기반으로 한 참고 자료이며, 투자 권유나 수익을 보장하지 않습니다.
          </p>
          <p>
            차트 제공: TradingView · 시장 데이터: Binance Futures 공개 API · 청산 맵은 미결제약정 기반 추정치입니다.
          </p>
          <p className="flex items-center gap-1.5">
            <Mail className="size-3.5" />
            문의{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-body underline-offset-2 hover:text-ink hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p>© 2026 {APP_NAME}</p>
        </div>
      </div>
    </footer>
  )
}
