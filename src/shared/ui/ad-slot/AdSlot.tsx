import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT } from '@/shared/config'
import { cn } from '@/shared/lib'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

interface AdSlotProps {
  slot?: string // 애드센스 광고 단위 ID. 없으면 렌더링하지 않음
  className?: string
}

// 반응형 디스플레이 광고 단위. VITE_ADSENSE_CLIENT 와 slot 이 모두 있을 때만 표시
export function AdSlot({ slot, className }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null)

  useEffect(() => {
    const el = ref.current
    // StrictMode 이중 실행·재마운트 시 같은 ins 에 중복 push 하지 않도록 확인
    if (!el || el.dataset.adsbygoogleStatus) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // 광고 차단기 등으로 실패해도 페이지에는 영향 없음
    }
  }, [slot])

  if (!ADSENSE_CLIENT || !slot) return null

  return (
    <aside aria-label="광고" className={cn('overflow-hidden', className)}>
      <p className="mb-1 text-[11px] text-muted-soft">광고</p>
      <ins
        ref={ref}
        className="adsbygoogle block"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
