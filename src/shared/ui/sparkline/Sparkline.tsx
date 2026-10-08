import { useId } from 'react'

interface SparklineProps {
  values: number[]
  baseline?: number // 이 값 위는 up, 아래는 down 색
  width?: number
  height?: number
  className?: string
}

export function Sparkline({ values, baseline, width = 120, height = 32, className }: SparklineProps) {
  const id = useId()
  if (values.length < 2) return null
  const min = Math.min(...values, baseline ?? Infinity)
  const max = Math.max(...values, baseline ?? -Infinity)
  const span = max - min || 1
  const x = (i: number) => (i / (values.length - 1)) * width
  const y = (v: number) => height - 2 - ((v - min) / span) * (height - 4)
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('')
  const by = baseline === undefined ? undefined : y(baseline)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className={className} aria-hidden>
      {by !== undefined && (
        <>
          <defs>
            <clipPath id={`${id}a`}>
              <rect x="0" y="0" width={width} height={by} />
            </clipPath>
            <clipPath id={`${id}b`}>
              <rect x="0" y={by} width={width} height={height - by} />
            </clipPath>
          </defs>
          <line x1="0" x2={width} y1={by} y2={by} stroke="var(--color-hairline)" strokeDasharray="2 3" />
          <path d={d} fill="none" stroke="var(--color-up)" strokeWidth="1.5" clipPath={`url(#${id}a)`} />
          <path d={d} fill="none" stroke="var(--color-down)" strokeWidth="1.5" clipPath={`url(#${id}b)`} />
        </>
      )}
      {by === undefined && <path d={d} fill="none" stroke="var(--color-primary)" strokeWidth="1.5" />}
    </svg>
  )
}
