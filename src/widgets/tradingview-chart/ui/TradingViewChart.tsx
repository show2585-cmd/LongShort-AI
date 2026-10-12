import { LineChart } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale, type Locale } from '@/shared/i18n'

interface TradingViewChartProps {
  symbol: string // 예: BINANCE:BTCUSDT.P
  interval: string // 예: 5, 15, 60, 240, D
}

const WIDGET_LOCALE: Record<Locale, string> = { ko: 'kr', en: 'en' }

const SCRIPT_SRC = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'

// TradingView Advanced Chart 무료 위젯. 위젯 로고/저작권 표기는 라이선스상 제거하면 안 됩니다.
export function TradingViewChart({ symbol, interval }: TradingViewChartProps) {
  const { t } = useTranslation()
  const locale = useLocale()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    container.innerHTML = '<div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div>'

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: 'Asia/Seoul',
      theme: 'light',
      style: '1',
      locale: WIDGET_LOCALE[locale],
      allow_symbol_change: false,
      hide_volume: false,
      withdateranges: true,
      save_image: false,
      backgroundColor: '#ffffff',
      gridColor: 'rgba(222, 225, 230, 0.6)',
      studies: ['STD;EMA', 'STD;Supertrend'],
      support_host: 'https://www.tradingview.com',
    })
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [symbol, interval, locale])

  return (
    <div className="relative h-[420px] overflow-hidden rounded-xl border border-hairline bg-canvas sm:h-[560px]">
      {/* 위젯이 로드되면 이 안내 위를 덮는다 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-sm text-muted">
        <LineChart className="size-6 text-muted-soft" />
        <p>{t('chart.loading')}</p>
        <p className="text-xs text-muted-soft">{t('chart.blocked')}</p>
      </div>
      <div ref={ref} className="tradingview-widget-container relative h-full w-full" />
    </div>
  )
}
