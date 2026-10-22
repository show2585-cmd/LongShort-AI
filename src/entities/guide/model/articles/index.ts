import type { GuideArticle } from '../types'
import { adxSupertrend } from './adx-supertrend'
import { emaTrend } from './ema-trend'
import { howToUse } from './how-to-use'
import { liquidationMap } from './liquidation-map'
import { longShortRatio } from './long-short-ratio'
import { macdRsi } from './macd-rsi'
import { marketStructureObv } from './market-structure-obv'
import { multiTimeframeAnalysis } from './multi-timeframe-analysis'
import { openInterestFunding } from './open-interest-funding'
import { riskManagement } from './risk-management'

// 목록 · sitemap 노출 순서. 새 글은 여기에 추가하면 라우트 · 정적 HTML · sitemap 에 자동 반영된다
export const GUIDES: readonly GuideArticle[] = [
  howToUse,
  longShortRatio,
  liquidationMap,
  multiTimeframeAnalysis,
  openInterestFunding,
  emaTrend,
  macdRsi,
  adxSupertrend,
  marketStructureObv,
  riskManagement,
]

export const findGuide = (slug: string | undefined) => GUIDES.find((g) => g.slug === slug)
