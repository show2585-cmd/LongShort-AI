import { useQuery } from '@tanstack/react-query'
import {
  fetchKlines,
  fetchLongShortRatio,
  fetchOpenInterestHist,
  fetchTicker24h,
  type BinanceInterval,
  type RatioKind,
} from '@/shared/api'
import { REFRESH_MS } from '../model/constants'

export const klinesQueryOptions = (symbol: string, interval: BinanceInterval, limit = 500) => ({
  queryKey: ['klines', symbol, interval, limit] as const,
  queryFn: () => fetchKlines(symbol, interval, limit),
  refetchInterval: REFRESH_MS[interval],
})

export function useKlines(symbol: string, interval: BinanceInterval, limit = 500) {
  return useQuery(klinesQueryOptions(symbol, interval, limit))
}

export function useTicker24h(symbol: string) {
  return useQuery({
    queryKey: ['ticker24h', symbol],
    queryFn: () => fetchTicker24h(symbol),
    refetchInterval: 15_000,
  })
}

export function useLongShortRatio(kind: RatioKind, symbol: string, period: BinanceInterval, limit = 60) {
  return useQuery({
    queryKey: ['longShortRatio', kind, symbol, period, limit],
    queryFn: () => fetchLongShortRatio(kind, symbol, period, limit),
    refetchInterval: REFRESH_MS[period],
  })
}

export function useOpenInterestHist(symbol: string, period: BinanceInterval, limit = 500) {
  return useQuery({
    queryKey: ['openInterestHist', symbol, period, limit],
    queryFn: () => fetchOpenInterestHist(symbol, period, limit),
    refetchInterval: REFRESH_MS[period],
  })
}
