import { BINANCE_FAPI_URL, USE_MOCK } from '@/shared/config'
import { getJson } from './base'
import * as mock from './mock'

export type BinanceInterval = '5m' | '15m' | '1h' | '4h' | '1d'

export interface Kline {
  openTime: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  takerBuyVolume: number
}

export interface Ticker24h {
  lastPrice: number
  priceChangePercent: number
  highPrice: number
  lowPrice: number
  quoteVolume: number
}

export interface RatioPoint {
  timestamp: number
  long: number // 0..1
  short: number // 0..1
  ratio: number
}

export interface OpenInterestPoint {
  timestamp: number
  openInterest: number // 코인 수량
  openInterestValue: number // USDT
}

export type RatioKind = 'globalAccount' | 'topPosition' | 'taker'

type RawKline = [number, string, string, string, string, string, number, string, number, string, string, string]

const ratioPaths: Record<Exclude<RatioKind, 'taker'>, string> = {
  globalAccount: '/futures/data/globalLongShortAccountRatio',
  topPosition: '/futures/data/topLongShortPositionRatio',
}

const byTime = <T extends { timestamp: number }>(a: T, b: T) => a.timestamp - b.timestamp

export async function fetchKlines(symbol: string, interval: BinanceInterval, limit = 500): Promise<Kline[]> {
  if (USE_MOCK) return mock.klines(symbol, interval, limit)
  const raw = await getJson<RawKline[]>(`${BINANCE_FAPI_URL}/fapi/v1/klines`, { symbol, interval, limit })
  return raw.map((k) => ({
    openTime: k[0],
    open: +k[1],
    high: +k[2],
    low: +k[3],
    close: +k[4],
    volume: +k[5],
    takerBuyVolume: +k[9],
  }))
}

export async function fetchTicker24h(symbol: string): Promise<Ticker24h> {
  if (USE_MOCK) return mock.ticker(symbol)
  const t = await getJson<Record<string, string>>(`${BINANCE_FAPI_URL}/fapi/v1/ticker/24hr`, { symbol })
  return {
    lastPrice: +t.lastPrice,
    priceChangePercent: +t.priceChangePercent,
    highPrice: +t.highPrice,
    lowPrice: +t.lowPrice,
    quoteVolume: +t.quoteVolume,
  }
}

// 롱/숏 비율 (Binance 는 최근 30일, 5m~1d 주기만 제공)
export async function fetchLongShortRatio(
  kind: RatioKind,
  symbol: string,
  period: BinanceInterval,
  limit = 60,
): Promise<RatioPoint[]> {
  if (USE_MOCK) return mock.ratio(kind, symbol, period, limit)

  if (kind === 'taker') {
    const raw = await getJson<{ buySellRatio: string; buyVol: string; sellVol: string; timestamp: number }[]>(
      `${BINANCE_FAPI_URL}/futures/data/takerlongshortRatio`,
      { symbol, period, limit },
    )
    return raw
      .map((r) => {
        const buy = +r.buyVol
        const sell = +r.sellVol
        return { timestamp: r.timestamp, long: buy / (buy + sell), short: sell / (buy + sell), ratio: +r.buySellRatio }
      })
      .sort(byTime)
  }

  const raw = await getJson<{ longAccount: string; shortAccount: string; longShortRatio: string; timestamp: number }[]>(
    BINANCE_FAPI_URL + ratioPaths[kind],
    { symbol, period, limit },
  )
  return raw
    .map((r) => ({ timestamp: r.timestamp, long: +r.longAccount, short: +r.shortAccount, ratio: +r.longShortRatio }))
    .sort(byTime)
}

export async function fetchOpenInterestHist(
  symbol: string,
  period: BinanceInterval,
  limit = 500,
): Promise<OpenInterestPoint[]> {
  if (USE_MOCK) return mock.openInterest(symbol, period, limit)
  const raw = await getJson<{ sumOpenInterest: string; sumOpenInterestValue: string; timestamp: number }[]>(
    `${BINANCE_FAPI_URL}/futures/data/openInterestHist`,
    { symbol, period, limit },
  )
  return raw
    .map((r) => ({
      timestamp: r.timestamp,
      openInterest: +r.sumOpenInterest,
      openInterestValue: +r.sumOpenInterestValue,
    }))
    .sort(byTime)
}
