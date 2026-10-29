import { useLocale } from '@/shared/i18n'
import type { MarketSymbol } from './constants'

// 한국어 화면에서는 한글 종목명(있으면), 그 외에는 영문명
export function useSymbolName(symbol: MarketSymbol) {
  const locale = useLocale()
  return locale === 'ko' ? (symbol.nameKo ?? symbol.name) : symbol.name
}
