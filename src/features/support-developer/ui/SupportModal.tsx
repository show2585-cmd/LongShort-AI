import { useState } from 'react'
import { Coffee, X } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { KAKAOPAY_QR_IMAGE, KAKAOPAY_URL } from '@/shared/config'
import { Modal } from '@/shared/ui'

interface SupportModalProps {
  open: boolean
  onClose: () => void
}

const kakaoClass =
  'inline-flex h-12 w-full items-center justify-center rounded-pill bg-[#fee500] text-base font-semibold text-[#191919]'

export function SupportModal({ open, onClose }: SupportModalProps) {
  const { t } = useTranslation()
  // QR 이미지 파일이 없으면 영역을 숨기고 송금 버튼만 표시
  const [qrError, setQrError] = useState(false)

  return (
    <Modal open={open} onClose={onClose} labelledBy="support-title" className="relative max-w-md text-center">
      <button
        onClick={onClose}
        aria-label={t('common.close')}
        className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-muted hover:bg-surface-strong hover:text-ink"
      >
        <X className="size-5" />
      </button>

      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Coffee className="size-7" />
      </div>
      <h2 id="support-title" className="mt-5 text-xl font-semibold text-ink">
        {t('support.title')}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-body">
        <Trans i18nKey="support.body" />
      </p>

      {!qrError && (
        <figure className="mx-auto mt-6 w-fit rounded-lg border border-hairline p-3">
          <img
            src={KAKAOPAY_QR_IMAGE}
            alt={t('support.qrAlt')}
            width={576}
            height={576}
            onError={() => setQrError(true)}
            className="block aspect-square w-72 max-w-full"
          />
          <figcaption className="mt-2 text-xs text-muted">{t('support.qrCaption')}</figcaption>
        </figure>
      )}

      <div className={qrError ? 'mt-6' : 'mt-4'}>
        {KAKAOPAY_URL ? (
          <a href={KAKAOPAY_URL} target="_blank" rel="noopener noreferrer" className={kakaoClass}>
            {t('support.kakao')}
          </a>
        ) : (
          <button disabled className={`${kakaoClass} cursor-not-allowed opacity-50`}>
            {t('support.kakaoPending')}
          </button>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted">
        {t('support.footnote')}
      </p>
    </Modal>
  )
}
