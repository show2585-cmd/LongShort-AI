import { useQueries } from '@tanstack/react-query'
import { klinesQueryOptions, TIMEFRAMES, type Timeframe } from '@/entities/market'
import { computeTrend, type TrendBias, type TrendResult } from '@/entities/trend'

// 종합 판단 시 상위 타임프레임에 더 큰 가중치
const CONSENSUS_WEIGHT: Record<Timeframe['id'], number> = {
  '5m': 0.1,
  '15m': 0.15,
  '1h': 0.25,
  '4h': 0.25,
  '1d': 0.25,
}

export interface TimeframeTrend {
  timeframe: Timeframe
  result: TrendResult | null
  isLoading: boolean
  isError: boolean
  updatedAt: number
}

export function useTrends(symbol: string) {
  const queries = useQueries({
    queries: TIMEFRAMES.map((tf) => ({
      ...klinesQueryOptions(symbol, tf.id),
      select: computeTrend,
    })),
  })

  const trends: TimeframeTrend[] = TIMEFRAMES.map((timeframe, i) => ({
    timeframe,
    result: queries[i].data ?? null,
    isLoading: queries[i].isLoading,
    isError: queries[i].isError,
    updatedAt: queries[i].dataUpdatedAt,
  }))

  const consensus = (() => {
    const ready = trends.filter((t) => t.result)
    if (ready.length === 0) return null
    const wSum = ready.reduce((s, t) => s + CONSENSUS_WEIGHT[t.timeframe.id], 0)
    const probLong = ready.reduce((s, t) => s + t.result!.probLong * CONSENSUS_WEIGHT[t.timeframe.id], 0) / wSum
    const bias: TrendBias = probLong >= 60 ? 'long' : probLong <= 40 ? 'short' : 'neutral'
    const agree = ready.filter((t) => t.result!.bias === bias).length
    return { probLong: Math.round(probLong), bias, agree, total: ready.length }
  })()

  return { trends, consensus }
}
