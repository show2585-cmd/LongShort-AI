import { useState } from 'react'
import { Coffee, X } from 'lucide-react'
import { KAKAOPAY_QR_IMAGE, KAKAOPAY_URL } from '@/shared/config'
import { Modal } from '@/shared/ui'

interface SupportModalProps {
  open: boolean
  onClose: () => void
}

const kakaoClass =
  'inline-flex h-12 w-full items-center justify-center rounded-pill bg-[#fee500] text-base font-semibold text-[#191919]'

export function SupportModal({ open, onClose }: SupportModalProps) {
  // QR 이미지 파일이 없으면 영역을 숨기고 송금 버튼만 표시
  const [qrError, setQrError] = useState(false)

  return (
    <Modal open={open} onClose={onClose} labelledBy="support-title" className="relative max-w-md text-center">
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

      {!qrError && (
        <figure className="mx-auto mt-6 w-fit rounded-lg border border-hairline p-3">
          <img
            src={KAKAOPAY_QR_IMAGE}
            alt="카카오페이 송금 QR 코드"
            width={576}
            height={576}
            onError={() => setQrError(true)}
            className="block aspect-square w-72 max-w-full"
          />
          <figcaption className="mt-2 text-xs text-muted">휴대폰 카메라로 스캔하세요</figcaption>
        </figure>
      )}

      <div className={qrError ? 'mt-6' : 'mt-4'}>
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
