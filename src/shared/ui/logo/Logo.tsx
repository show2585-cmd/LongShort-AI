import { useId } from 'react'
import { cn } from '@/shared/lib'

// popup_img.png 의 LongShort AI 로고를 SVG 로 재구성 (육각형을 오른쪽 위만 비운 입체 'L' 심볼)
export function LogoMark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 32 32" className={cn('size-8', className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}side`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6d7dff" />
          <stop offset="1" stopColor="#3445e6" />
        </linearGradient>
        <linearGradient id={`${id}top`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9d0ff" />
          <stop offset="1" stopColor="#8e9bff" />
        </linearGradient>
      </defs>
      {/* 몸통 */}
      <path
        d="M12.5 3.6 5 7.9v16.2L16 30.4l11-6.3v-6.6l-5.2 3v.6L16 24.4l-5.8-3.3V11.1l5-2.9z"
        fill={`url(#${id}side)`}
      />
      {/* 윗면 하이라이트 */}
      <path d="M12.5 3.6 5 7.9l5.2 3.2 5-2.9z" fill={`url(#${id}top)`} />
      {/* 아래 오른쪽 면 음영 */}
      <path d="M16 30.4V24.4l5.8-3.3v-.6l5.2-3v6.6z" fill="#2a37c4" opacity="0.55" />
    </svg>
  )
}

interface LogoProps {
  tone?: 'light' | 'dark'
  className?: string
}

export function Logo({ tone = 'light', className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark />
      <span
        className={cn(
          'text-[19px] leading-none font-semibold tracking-[-0.02em]',
          tone === 'light' ? 'text-ink' : 'text-on-dark',
        )}
      >
        LongShort <span className="text-[#4a5cf5]">AI</span>
      </span>
    </span>
  )
}
