import { APP_NAME } from '@/shared/config'

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px] space-y-3 px-4 py-12 text-[13px] leading-relaxed text-muted lg:px-6">
        <p>
          {APP_NAME} 는 레퍼럴 코드·유료 멤버십·리딩방을 운영하지 않습니다. 제공되는 모든 정보는 기술적 지표와 공개
          시장 데이터를 기반으로 한 참고 자료이며, 투자 권유나 수익을 보장하지 않습니다.
        </p>
        <p>
          차트 제공: TradingView · 시장 데이터: Binance Futures 공개 API · 청산 맵은 미결제약정 기반 추정치입니다.
        </p>
      </div>
    </footer>
  )
}
