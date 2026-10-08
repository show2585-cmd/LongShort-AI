import type { Kline, OpenInterestPoint } from '@/shared/api'

// 미결제약정(OI) 증감으로 신규 포지션을 추정하고, 레버리지 분포를 가정해 청산 가격대를 계산한다.
// 거래소는 개별 포지션의 청산가를 공개하지 않으므로 Coinglass 등 모든 청산 히트맵은 이와 같은 '추정 모델'이다.

export const LEVERAGE_MIX: readonly { leverage: number; share: number }[] = [
  { leverage: 10, share: 0.3 },
  { leverage: 25, share: 0.3 },
  { leverage: 50, share: 0.25 },
  { leverage: 100, share: 0.15 },
]
const MAINT_MARGIN = 0.005

interface Position {
  side: 'long' | 'short'
  liqPrice: number
  notional: number // USDT
}

export interface LiquidationBin {
  low: number
  high: number
  long: number // 이 가격대에서 청산될 롱 포지션 규모(USDT)
  short: number
}

export interface LiquidationEstimate {
  price: number
  bins: LiquidationBin[]
  maxValue: number
  topLong: LiquidationBin | null // 현재가 아래 최대 롱 청산 구간
  topShort: LiquidationBin | null // 현재가 위 최대 숏 청산 구간
  totalLong: number
  totalShort: number
}

export function estimateLiquidations(
  klines: Kline[],
  oi: OpenInterestPoint[],
  stepMs: number,
  rangePct = 0.1,
  binCount = 36,
): LiquidationEstimate | null {
  if (klines.length === 0 || oi.length < 2) return null
  const barByTime = new Map(klines.map((k) => [k.openTime, k]))
  let positions: Position[] = []

  for (let i = 1; i < oi.length; i++) {
    // OI 스냅샷 시점이 속한(또는 직전에 끝난) 봉
    const bar = barByTime.get(Math.floor((oi[i].timestamp - 1) / stepMs) * stepMs)
    if (!bar) continue

    // 1) 이번 봉에서 청산가에 닿은 포지션 제거
    positions = positions.filter((p) => (p.side === 'long' ? bar.low > p.liqPrice : bar.high < p.liqPrice))

    const delta = oi[i].openInterestValue - oi[i - 1].openInterestValue
    if (delta > 0) {
      // 2) 신규 진입: 테이커 매수 비중으로 롱/숏 분배, 평균가로 진입가 추정
      const entry = (bar.high + bar.low + bar.close) / 3
      const longShare = Math.min(0.7, Math.max(0.3, bar.volume ? bar.takerBuyVolume / bar.volume : 0.5))
      for (const { leverage, share } of LEVERAGE_MIX) {
        positions.push({
          side: 'long',
          liqPrice: entry * (1 - 1 / leverage + MAINT_MARGIN),
          notional: delta * longShare * share,
        })
        positions.push({
          side: 'short',
          liqPrice: entry * (1 + 1 / leverage - MAINT_MARGIN),
          notional: delta * (1 - longShare) * share,
        })
      }
    } else if (delta < 0) {
      // 3) 포지션 감소: 남은 포지션을 비례 축소
      const total = positions.reduce((s, p) => s + p.notional, 0)
      const keep = total > 0 ? Math.max(0, 1 + delta / total) : 0
      positions.forEach((p) => (p.notional *= keep))
    }
  }

  const price = klines[klines.length - 1].close
  const lowBound = price * (1 - rangePct)
  const width = (price * rangePct * 2) / binCount
  const bins: LiquidationBin[] = Array.from({ length: binCount }, (_, i) => ({
    low: lowBound + i * width,
    high: lowBound + (i + 1) * width,
    long: 0,
    short: 0,
  }))
  for (const p of positions) {
    const idx = Math.floor((p.liqPrice - lowBound) / width)
    if (idx < 0 || idx >= binCount) continue
    bins[idx][p.side] += p.notional
  }

  const below = bins.filter((b) => b.high <= price)
  const above = bins.filter((b) => b.low >= price)
  const maxBy = (arr: LiquidationBin[], key: 'long' | 'short') =>
    arr.reduce<LiquidationBin | null>((m, b) => (b[key] > 0 && (!m || b[key] > m[key]) ? b : m), null)

  return {
    price,
    bins,
    maxValue: Math.max(1, ...bins.map((b) => Math.max(b.long, b.short))),
    topLong: maxBy(below, 'long'),
    topShort: maxBy(above, 'short'),
    totalLong: bins.reduce((s, b) => s + b.long, 0),
    totalShort: bins.reduce((s, b) => s + b.short, 0),
  }
}
