import type { BinanceInterval } from '@/shared/api'

export interface MarketSymbol {
  id: string // Binance 심볼 (BTCUSDT)
  base: string
  name: string
  tradingView: string // TradingView 심볼 (USDT 무기한 선물)
}

export const SYMBOLS: readonly MarketSymbol[] = [
  { id: 'BTCUSDT', base: 'BTC', name: 'Bitcoin', tradingView: 'BINANCE:BTCUSDT.P' },
  { id: 'ETHUSDT', base: 'ETH', name: 'Ethereum', tradingView: 'BINANCE:ETHUSDT.P' },
  { id: 'SOLUSDT', base: 'SOL', name: 'Solana', tradingView: 'BINANCE:SOLUSDT.P' },
  { id: 'XRPUSDT', base: 'XRP', name: 'XRP', tradingView: 'BINANCE:XRPUSDT.P' },
  { id: 'BNBUSDT', base: 'BNB', name: 'BNB', tradingView: 'BINANCE:BNBUSDT.P' },
  { id: 'DOGEUSDT', base: 'DOGE', name: 'Dogecoin', tradingView: 'BINANCE:DOGEUSDT.P' },
]

export interface Timeframe {
  id: BinanceInterval
  label: string
  tradingView: string // TradingView interval 값
}

export const TIMEFRAMES: readonly Timeframe[] = [
  { id: '5m', label: '5분', tradingView: '5' },
  { id: '15m', label: '15분', tradingView: '15' },
  { id: '1h', label: '1시간', tradingView: '60' },
  { id: '4h', label: '4시간', tradingView: '240' },
  { id: '1d', label: '1일', tradingView: 'D' },
]

// 짧은 봉일수록 자주 갱신
export const REFRESH_MS: Record<BinanceInterval, number> = {
  '5m': 30_000,
  '15m': 60_000,
  '1h': 60_000,
  '4h': 120_000,
  '1d': 300_000,
}
