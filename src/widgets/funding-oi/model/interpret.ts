import type { FundingPoint, OpenInterestPoint } from '@/shared/api'

const HOUR = 3_600_000

export type FundingState = 'longHot' | 'neutral' | 'shortLean' | 'shortHot'

// 정산 주기(시간). 이력 간격으로 추정하고, 이력이 부족하면 Binance 기본값 8h
export function fundingIntervalHours(history: FundingPoint[]): number {
  if (history.length < 2) return 8
  const gap = history[history.length - 1].fundingTime - history[history.length - 2].fundingTime
  return Math.max(1, Math.round(gap / HOUR))
}

// 기준선은 Binance 기본 금리 0.01%/8h. 정산 주기가 달라도 8시간 기준으로 환산해 판단
export function fundingState(rate: number, intervalHours: number): FundingState {
  const per8h = rate * (8 / intervalHours)
  if (per8h >= 0.0003) return 'longHot'
  if (per8h <= -0.0003) return 'shortHot'
  if (per8h < 0) return 'shortLean'
  return 'neutral'
}

export const annualize = (rate: number, intervalHours: number) => rate * (24 / intervalHours) * 365

export type OiFlow = 'newLong' | 'shortCover' | 'newShort' | 'longExit'

export interface OiChange {
  oiPct: number // 계약 수량 기준 증감 (%)
  pricePct: number
  valueNow: number // USDT
  flow: OiFlow
}

// 1시간 간격 OI 이력에서 최근 hours 시간 변화. 가격은 OI 가치 ÷ 수량으로 역산
export function oiChange(points: OpenInterestPoint[], hours = 24): OiChange | null {
  if (points.length <= hours) return null
  const now = points[points.length - 1]
  const prev = points[points.length - 1 - hours]
  const oiPct = (now.openInterest / prev.openInterest - 1) * 100
  const pricePct = (now.openInterestValue / now.openInterest / (prev.openInterestValue / prev.openInterest) - 1) * 100
  const flow: OiFlow =
    pricePct >= 0 ? (oiPct >= 0 ? 'newLong' : 'shortCover') : oiPct >= 0 ? 'newShort' : 'longExit'
  return { oiPct, pricePct, valueNow: now.openInterestValue, flow }
}
