import { Coffee, X } from 'lucide-react'
import { KAKAOPAY_URL } from '@/shared/config'
import { Modal } from '@/shared/ui'

interface SupportModalProps {
  open: boolean
  onClose: () => void
}

const kakaoClass =
  'inline-flex h-12 w-full items-center justify-center rounded-pill bg-[#fee500] text-base font-semibold text-[#191919]'

export function SupportModal({ open, onClose }: SupportModalProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="support-title" className="relative max-w-sm text-center">
      <button
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-muted hover:bg-surface-strong hover:text-ink"
      >
        <X className="size-5" />
      </button>

      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Coffee className="size-7" />
      </div>
      <h2 id="support-title" className="mt-5 text-xl font-semibold text-ink">
        수익이 나셨을지요??
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-body">
        기분 좋은 날 커피 한 잔으로 응원해 주시면
        <br />
        서버 운영과 개발에 큰 힘이 됩니다.
      </p>

      <div className="mt-6">
        {KAKAOPAY_URL ? (
          <a href={KAKAOPAY_URL} target="_blank" rel="noopener noreferrer" className={kakaoClass}>
            카카오페이로 응원하기
          </a>
        ) : (
          <button disabled className={`${kakaoClass} cursor-not-allowed opacity-50`}>
            카카오페이 송금 준비 중
          </button>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted">
        커피 한 잔은 개발자의 야근을 거뜬하게 합니다....
      </p>
    </Modal>
  )
}
