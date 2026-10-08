import type { TrendBias } from './computeTrend'

// 롱/숏/관망 공통 색상 (테두리 + 옅은 그라데이션 배경 + 글자)
export const BIAS_TONE: Record<TrendBias, { border: string; tint: string; text: string }> = {
  long: { border: 'border-up/70', tint: 'from-up/15', text: 'text-up' },
  short: { border: 'border-down/70', tint: 'from-down/15', text: 'text-down' },
  neutral: { border: 'border-muted-soft/40', tint: 'from-muted-soft/10', text: 'text-muted-soft' },
}
