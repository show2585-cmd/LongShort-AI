import type { Kline } from '@/shared/api'
import { ta } from '@/shared/lib'

export type TrendBias = 'long' | 'short' | 'neutral'

export interface TrendFactor {
  key: string
  name: string
  weight: number
  value: number // -1(숏) ~ +1(롱)
  detail: string
}

export interface TrendResult {
  probLong: number // 0~100
  probShort: number
  score: number // 가중합 -1~+1
  bias: TrendBias
  adx: number
  ranging: boolean // ADX < 20 → 추세 약함(횡보)
  factors: TrendFactor[]
}

// 점수 → 확률 변환 기울기. 점수 ±0.5 ≈ 82/18%, ±1 ≈ 95/5%
const LOGISTIC_K = 3
export const MIN_CANDLES = 210

const fmt = (v: number, d = 1) => (Number.isFinite(v) ? v.toFixed(d) : '-')

export function computeTrend(klines: Kline[]): TrendResult | null {
  if (klines.length < MIN_CANDLES) return null

  const close = klines.map((k) => k.close)
  const high = klines.map((k) => k.high)
  const low = klines.map((k) => k.low)
  const volume = klines.map((k) => k.volume)
  const hlc = { high, low, close }

  const { last, clamp } = ta
  const price = last(close)
  const atr = last(ta.atr(hlc, 14))

  // 1. EMA 배열 (20/50/200)
  const e20 = ta.ema(close, 20)
  const e50 = ta.ema(close, 50)
  const e200 = ta.ema(close, 200)
  const emaAlign =
    (Math.sign(price - last(e20)) + Math.sign(last(e20) - last(e50)) + Math.sign(last(e50) - last(e200))) / 3

  // 2. EMA50 기울기 (최근 10봉, ATR 대비)
  const e50Slope = ta.slope(e50.slice(-10))
  const emaSlope = Math.tanh((e50Slope * 10) / atr)

  // 3. MACD 히스토그램 (ATR 대비 크기 + 증감)
  const { hist } = ta.macd(close)
  const h = last(hist)
  const hPrev = hist[hist.length - 2]
  const macdVal = clamp(Math.tanh(h / (atr * 0.15)) * 0.7 + Math.sign(h - hPrev) * 0.3)

  // 4. RSI(14) 50 기준 모멘텀
  const rsi = last(ta.rsi(close, 14))
  const rsiVal = clamp((rsi - 50) / 20)

  // 5. DMI 방향 × ADX 강도
  const { plusDI, minusDI, adx: adxArr } = ta.dmi(hlc, 14)
  const pdi = last(plusDI)
  const mdi = last(minusDI)
  const adx = last(adxArr)
  const dmiVal = ((pdi - mdi) / (pdi + mdi || 1)) * Math.min(1, adx / 25) * 2
  const dmiClamped = clamp(dmiVal)

  // 6. 슈퍼트렌드(10, 3)
  const st = last(ta.supertrend(hlc, 10, 3))

  // 7. 시장 구조 (스윙 고점·저점의 HH/HL vs LH/LL)
  const { highs, lows } = ta.swings(high.slice(-120), low.slice(-120), 3)
  let structure = 0
  if (highs.length >= 2 && lows.length >= 2) {
    const hh = Math.sign(highs[highs.length - 1] - highs[highs.length - 2])
    const hl = Math.sign(lows[lows.length - 1] - lows[lows.length - 2])
    structure = (hh + hl) / 2
  }

  // 8. OBV 기울기 (거래량 동반 여부)
  const obvArr = ta.obv(close, volume).slice(-20)
  const avgVol = volume.slice(-20).reduce((a, b) => a + b, 0) / 20
  const obvVal = Math.tanh(ta.slope(obvArr) / (avgVol * 0.3))

  const factors: TrendFactor[] = [
    {
      key: 'ema',
      name: 'EMA 배열 (20/50/200)',
      weight: 0.2,
      value: emaAlign,
      detail: `종가 ${price > last(e20) ? '>' : '<'} EMA20 · EMA20 ${last(e20) > last(e50) ? '>' : '<'} EMA50 · EMA50 ${last(e50) > last(e200) ? '>' : '<'} EMA200`,
    },
    { key: 'slope', name: 'EMA50 기울기', weight: 0.1, value: emaSlope, detail: `10봉 기울기 ${fmt(emaSlope, 2)} (ATR 정규화)` },
    { key: 'macd', name: 'MACD 히스토그램', weight: 0.15, value: macdVal, detail: `히스토그램 ${h > 0 ? '양수' : '음수'}, ${h > hPrev ? '증가' : '감소'} 중` },
    { key: 'rsi', name: 'RSI(14)', weight: 0.1, value: rsiVal, detail: `RSI ${fmt(rsi)}` },
    { key: 'dmi', name: 'DMI / ADX', weight: 0.15, value: dmiClamped, detail: `+DI ${fmt(pdi)} / −DI ${fmt(mdi)} · ADX ${fmt(adx)}` },
    { key: 'supertrend', name: '슈퍼트렌드 (10, 3)', weight: 0.15, value: st, detail: st > 0 ? '상승 추세 유지' : '하락 추세 유지' },
    {
      key: 'structure',
      name: '시장 구조 (HH/HL)',
      weight: 0.1,
      value: structure,
      detail: structure > 0 ? '고점·저점 상승' : structure < 0 ? '고점·저점 하락' : '혼조',
    },
    { key: 'obv', name: 'OBV 거래량 흐름', weight: 0.05, value: obvVal, detail: obvVal > 0 ? '매수 거래량 우위' : '매도 거래량 우위' },
  ].map((f) => ({ ...f, value: Number.isFinite(f.value) ? f.value : 0 }))

  const score = factors.reduce((s, f) => s + f.value * f.weight, 0)
  const probLong = Math.round(100 / (1 + Math.exp(-LOGISTIC_K * score)))
  const ranging = adx < 20

  return {
    probLong,
    probShort: 100 - probLong,
    score,
    bias: probLong >= 60 ? 'long' : probLong <= 40 ? 'short' : 'neutral',
    adx,
    ranging,
    factors,
  }
}
