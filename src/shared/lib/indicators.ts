// 기술적 지표 (입력 배열과 같은 길이를 반환, 계산 불가 구간은 NaN)

export function ema(values: number[], period: number): number[] {
  const out = new Array<number>(values.length).fill(NaN)
  const k = 2 / (period + 1)
  let start = values.findIndex((v) => !Number.isNaN(v))
  if (start < 0 || values.length - start < period) return out
  let prev = values.slice(start, start + period).reduce((a, b) => a + b, 0) / period
  start += period - 1
  out[start] = prev
  for (let i = start + 1; i < values.length; i++) {
    prev = values[i] * k + prev * (1 - k)
    out[i] = prev
  }
  return out
}

// Wilder 평활 (RSI, ATR, ADX 에서 사용)
function wilder(values: number[], period: number, from = 0): number[] {
  const out = new Array<number>(values.length).fill(NaN)
  if (values.length - from < period) return out
  let prev = values.slice(from, from + period).reduce((a, b) => a + b, 0) / period
  out[from + period - 1] = prev
  for (let i = from + period; i < values.length; i++) {
    prev = (prev * (period - 1) + values[i]) / period
    out[i] = prev
  }
  return out
}

export function rsi(closes: number[], period = 14): number[] {
  const gains = closes.map((c, i) => (i === 0 ? 0 : Math.max(c - closes[i - 1], 0)))
  const losses = closes.map((c, i) => (i === 0 ? 0 : Math.max(closes[i - 1] - c, 0)))
  const ag = wilder(gains, period, 1)
  const al = wilder(losses, period, 1)
  return ag.map((g, i) => (Number.isNaN(g) ? NaN : al[i] === 0 ? 100 : 100 - 100 / (1 + g / al[i])))
}

interface HLC {
  high: number[]
  low: number[]
  close: number[]
}

function trueRange({ high, low, close }: HLC): number[] {
  return high.map((h, i) =>
    i === 0 ? h - low[i] : Math.max(h - low[i], Math.abs(h - close[i - 1]), Math.abs(low[i] - close[i - 1])),
  )
}

export function atr(hlc: HLC, period = 14): number[] {
  return wilder(trueRange(hlc), period)
}

export function macd(closes: number[], fast = 12, slow = 26, signal = 9) {
  const f = ema(closes, fast)
  const s = ema(closes, slow)
  const line = f.map((v, i) => v - s[i])
  const sig = ema(line, signal)
  return { line, signal: sig, hist: line.map((v, i) => v - sig[i]) }
}

export function dmi(hlc: HLC, period = 14) {
  const { high, low } = hlc
  const plusDM = high.map((h, i) => {
    if (i === 0) return 0
    const up = h - high[i - 1]
    const down = low[i - 1] - low[i]
    return up > down && up > 0 ? up : 0
  })
  const minusDM = low.map((l, i) => {
    if (i === 0) return 0
    const up = high[i] - high[i - 1]
    const down = low[i - 1] - l
    return down > up && down > 0 ? down : 0
  })
  const tr = wilder(trueRange(hlc), period, 1)
  const pdm = wilder(plusDM, period, 1)
  const mdm = wilder(minusDM, period, 1)
  const plusDI = pdm.map((v, i) => (100 * v) / tr[i])
  const minusDI = mdm.map((v, i) => (100 * v) / tr[i])
  const dx = plusDI.map((p, i) => {
    const sum = p + minusDI[i]
    return sum === 0 ? 0 : (100 * Math.abs(p - minusDI[i])) / sum
  })
  const firstValid = dx.findIndex((v) => !Number.isNaN(v))
  const adx = firstValid < 0 ? dx.map(() => NaN) : wilder(dx, period, firstValid)
  return { plusDI, minusDI, adx }
}

// 슈퍼트렌드: 1 = 상승, -1 = 하락
export function supertrend(hlc: HLC, period = 10, multiplier = 3): number[] {
  const { high, low, close } = hlc
  const a = atr(hlc, period)
  const dir = new Array<number>(close.length).fill(NaN)
  let upper = NaN
  let lower = NaN
  let trend = 1
  for (let i = 0; i < close.length; i++) {
    if (Number.isNaN(a[i])) continue
    const mid = (high[i] + low[i]) / 2
    const bu = mid + multiplier * a[i]
    const bl = mid - multiplier * a[i]
    upper = Number.isNaN(upper) || bu < upper || close[i - 1] > upper ? bu : upper
    lower = Number.isNaN(lower) || bl > lower || close[i - 1] < lower ? bl : lower
    if (trend === 1 && close[i] < lower) trend = -1
    else if (trend === -1 && close[i] > upper) trend = 1
    dir[i] = trend
  }
  return dir
}

export function obv(closes: number[], volumes: number[]): number[] {
  let acc = 0
  return closes.map((c, i) => {
    if (i > 0) acc += c > closes[i - 1] ? volumes[i] : c < closes[i - 1] ? -volumes[i] : 0
    return acc
  })
}

// 최소자승 기울기
export function slope(values: number[]): number {
  const n = values.length
  const mx = (n - 1) / 2
  const my = values.reduce((a, b) => a + b, 0) / n
  let num = 0
  let den = 0
  values.forEach((v, i) => {
    num += (i - mx) * (v - my)
    den += (i - mx) ** 2
  })
  return den === 0 ? 0 : num / den
}

// 좌우 width 개 봉보다 높은/낮은 스윙 고점·저점
export function swings(high: number[], low: number[], width = 3) {
  const highs: number[] = []
  const lows: number[] = []
  for (let i = width; i < high.length - width; i++) {
    const win = (arr: number[]) => arr.slice(i - width, i + width + 1)
    if (high[i] === Math.max(...win(high))) highs.push(high[i])
    if (low[i] === Math.min(...win(low))) lows.push(low[i])
  }
  return { highs, lows }
}

export const last = (arr: number[]) => arr[arr.length - 1]
export const clamp = (v: number, min = -1, max = 1) => Math.min(max, Math.max(min, v))
