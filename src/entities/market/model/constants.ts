import type { BinanceInterval } from '@/shared/api'

export interface MarketSymbol {
  id: string // Binance 심볼 (BTCUSDT)
  base: string
  name: string
  nameKo?: string // 한국어 화면·검색용 이름 (없으면 name)
  tradingView: string // TradingView 심볼 (USDT 무기한 선물)
}

export const SYMBOLS: readonly MarketSymbol[] = [
  { id: 'BTCUSDT', base: 'BTC', name: 'Bitcoin', tradingView: 'BINANCE:BTCUSDT.P' },
  { id: 'ETHUSDT', base: 'ETH', name: 'Ethereum', tradingView: 'BINANCE:ETHUSDT.P' },
  { id: 'SOLUSDT', base: 'SOL', name: 'Solana', tradingView: 'BINANCE:SOLUSDT.P' },
  { id: 'XRPUSDT', base: 'XRP', name: 'XRP', tradingView: 'BINANCE:XRPUSDT.P' },
  { id: 'BNBUSDT', base: 'BNB', name: 'BNB', tradingView: 'BINANCE:BNBUSDT.P' },
  { id: 'DOGEUSDT', base: 'DOGE', name: 'Dogecoin', tradingView: 'BINANCE:DOGEUSDT.P' },
  // 한국 주식 무기한 선물. 코스피는 지수 계약이 없어 3배 레버리지 ETF(KORU) 계약으로 대신한다
  { id: 'KORUUSDT', base: 'KOSPI', name: 'KOSPI 3x (KORU)', nameKo: '코스피 3배(KORU)', tradingView: 'BINANCE:KORUUSDT.P' },
  { id: 'SKHYNIXUSDT', base: 'SKHYNIX', name: 'SK hynix', nameKo: 'SK하이닉스', tradingView: 'BINANCE:SKHYNIXUSDT.P' },
  { id: 'SAMSUNGUSDT', base: 'SAMSUNG', name: 'Samsung Electronics', nameKo: '삼성전자', tradingView: 'BINANCE:SAMSUNGUSDT.P' },
  { id: 'HYUNDAIUSDT', base: 'HYUNDAI', name: 'Hyundai Motor', nameKo: '현대차', tradingView: 'BINANCE:HYUNDAIUSDT.P' },
]

export const DEFAULT_SYMBOL = SYMBOLS.find((s) => s.id === 'SKHYNIXUSDT')!

// 표시 이름은 i18n 키 timeframe.<id>
export interface Timeframe {
  id: BinanceInterval
  tradingView: string // TradingView interval 값
}

export const TIMEFRAMES: readonly Timeframe[] = [
  { id: '5m', tradingView: '5' },
  { id: '15m', tradingView: '15' },
  { id: '1h', tradingView: '60' },
  { id: '4h', tradingView: '240' },
  { id: '1d', tradingView: 'D' },
]

// 짧은 봉일수록 자주 갱신
export const REFRESH_MS: Record<BinanceInterval, number> = {
  '5m': 30_000,
  '15m': 60_000,
  '1h': 60_000,
  '4h': 120_000,
  '1d': 300_000,
}
