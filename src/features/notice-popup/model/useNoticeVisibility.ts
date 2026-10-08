import { useCallback, useState } from 'react'

const STORAGE_KEY = 'notice:hideUntil'

function readHidden(): boolean {
  try {
    return Number(localStorage.getItem(STORAGE_KEY) ?? 0) > Date.now()
  } catch {
    return false
  }
}

export function useNoticeVisibility() {
  const [open, setOpen] = useState(() => !readHidden())

  const close = useCallback(() => setOpen(false), [])

  // 오늘 자정까지 숨김
  const hideToday = useCallback(() => {
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    try {
      localStorage.setItem(STORAGE_KEY, String(midnight.getTime()))
    } catch {
      // 저장 불가 환경에서는 이번 세션만 닫는다
    }
    setOpen(false)
  }, [])

  return { open, close, hideToday }
}
