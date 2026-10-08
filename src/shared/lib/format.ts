export function formatPrice(v: number): string {
  if (!Number.isFinite(v)) return '-'
  const digits = v >= 1000 ? 1 : v >= 1 ? 3 : 5
  return v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

export function formatPercent(v: number, digits = 2, signed = false): string {
  if (!Number.isFinite(v)) return '-'
  const s = v.toFixed(digits) + '%'
  return signed && v > 0 ? '+' + s : s
}

export function formatCompactUsd(v: number): string {
  if (!Number.isFinite(v)) return '-'
  return '$' + Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(v)
}
