import type { TrendBias } from './computeTrend'

// 다크 히어로용 롱/숏/관망 색상 (테두리 + 옅은 그라데이션 배경 + 글자)
export const BIAS_TONE: Record<TrendBias, { border: string; tint: string; text: string }> = {
  long: { border: 'border-up/70', tint: 'from-up/15', text: 'text-up' },
  short: { border: 'border-down-on-dark/70', tint: 'from-down-on-dark/15', text: 'text-down-on-dark' },
  neutral: { border: 'border-muted-soft/40', tint: 'from-muted-soft/10', text: 'text-muted-soft' },
}

// 밝은 배경용 글자색 (muted-soft 는 흰 배경 위 대비가 낮아 body 사용)
export const BIAS_TEXT_LIGHT: Record<TrendBias, string> = {
  long: 'text-up',
  short: 'text-down',
  neutral: 'text-body',
}
