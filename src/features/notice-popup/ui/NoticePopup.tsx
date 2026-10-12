import { useTranslation } from 'react-i18next'
import { Button, Modal } from '@/shared/ui'
import { useNoticeVisibility } from '../model/useNoticeVisibility'

export function NoticePopup() {
  const { t } = useTranslation()
  const { open, close, hideToday } = useNoticeVisibility()

  return (
    <Modal
      open={open}
      onClose={close}
      label={t('notice.label')}
      className="max-w-[720px] overflow-hidden bg-surface-dark p-0"
    >
      <div className="relative">
        <img
          src="/popup_img.jpg"
          alt={t('notice.alt')}
          width={1536}
          height={1024}
          decoding="async"
          className="block h-auto w-full"
        />
        {/* 이미지에 그려진 X 표시 위치에 실제 닫기 버튼을 겹친다 */}
        <button
          onClick={close}
          aria-label={t('common.close')}
          className="absolute top-[4%] right-[2.5%] size-[9%] cursor-pointer rounded-full"
        />
      </div>
      <div className="flex justify-center px-5 py-4">
        <Button variant="secondary-dark" size="sm" onClick={hideToday}>
          {t('notice.hideToday')}
        </Button>
      </div>
    </Modal>
  )
}
