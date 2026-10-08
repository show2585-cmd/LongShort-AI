// 개발/데모용 합성 데이터. VITE_USE_MOCK=true 일 때만 사용됩니다.
import type { BinanceInterval, Kline, OpenInterestPoint, RatioKind, RatioPoint, Ticker24h } from './binance'

const BASE_PRICE: Record<string, number> = {
  BTCUSDT: 100000,
  ETHUSDT: 3500,
  SOLUSDT: 180,
  XRPUSDT: 2.5,
  DOGEUSDT: 0.2,
  BNBUSDT: 650,
}

const INTERVAL_MS: Record<BinanceInterval, number> = {
  '5m': 300_000,
  '15m': 900_000,
  '1h': 3_600_000,
  '4h': 14_400_000,
  '1d': 86_400_000,
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const gauss = (r: () => number) => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r())

export function klines(symbol: string, interval: BinanceInterval, limit: number): Kline[] {
  const r = rng(hash(symbol + interval))
  const step = INTERVAL_MS[interval]
  const vol = 0.002 * Math.sqrt(step / 300_000)
  const end = Math.floor(Date.now() / step) * step
  let price = BASE_PRICE[symbol] ?? 100
  let drift = 0
  const out: Kline[] = []
  for (let i = limit - 1; i >= 0; i--) {
    if (r() < 0.03) drift = (r() - 0.5) * vol * 0.8
    const open = price
    const close = open * (1 + drift + gauss(r) * vol)
    const high = Math.max(open, close) * (1 + r() * vol)
    const low = Math.min(open, close) * (1 - r() * vol)
    const volume = 1000 * (0.5 + r())
    const buyShare = 0.5 + (close > open ? 0.08 : -0.08) + (r() - 0.5) * 0.1
    out.push({ openTime: end - i * step, open, high, low, close, volume, takerBuyVolume: volume * buyShare })
    price = close
  }
  // 마지막 종가를 기준가 근처로 맞춘다
  const scale = (BASE_PRICE[symbol] ?? 100) / price
  return out.map((k) => ({ ...k, open: k.open * scale, high: k.high * scale, low: k.low * scale, close: k.close * scale }))
}

export function ticker(symbol: string): Ticker24h {
  const ks = klines(symbol, '1h', 24)
  const last = ks[ks.length - 1].close
  return {
    lastPrice: last,
    priceChangePercent: ((last - ks[0].open) / ks[0].open) * 100,
    highPrice: Math.max(...ks.map((k) => k.high)),
    lowPrice: Math.min(...ks.map((k) => k.low)),
    quoteVolume: ks.reduce((s, k) => s + k.volume * k.close, 0),
  }
}

export function ratio(kind: RatioKind, symbol: string, period: BinanceInterval, limit: number): RatioPoint[] {
  const r = rng(hash(kind + symbol + period))
  const step = INTERVAL_MS[period]
  const end = Math.floor(Date.now() / step) * step
  let long = kind === 'globalAccount' ? 0.62 : kind === 'topPosition' ? 0.52 : 0.5
  return Array.from({ length: limit }, (_, i) => {
    long = Math.min(0.8, Math.max(0.2, long + (r() - 0.5) * 0.02))
    return { timestamp: end - (limit - 1 - i) * step, long, short: 1 - long, ratio: long / (1 - long) }
  })
}

export function openInterest(symbol: string, period: BinanceInterval, limit: number): OpenInterestPoint[] {
  const ks = klines(symbol, period, limit)
  const r = rng(hash('oi' + symbol + period))
  const step = INTERVAL_MS[period]
  let oi = (2e9 / (BASE_PRICE[symbol] ?? 100)) * 0.8
  return ks.map((k) => {
    oi = Math.max(oi * 0.5, oi * (1 + (r() - 0.45) * 0.01))
    return { timestamp: k.openTime + step, openInterest: oi, openInterestValue: oi * k.close }
  })
}
