import { Button, Modal } from '@/shared/ui'
import { useNoticeVisibility } from '../model/useNoticeVisibility'

const ALT =
  '레퍼럴·멤버십을 운영하지 않습니다. LongShort AI 는 거래소 레퍼럴(추천인) 코드, 유료 멤버십, 리딩방을 일절 운영하지 않습니다.'

export function NoticePopup() {
  const { open, close, hideToday } = useNoticeVisibility()

  return (
    <Modal
      open={open}
      onClose={close}
      label="레퍼럴·멤버십 미운영 안내"
      className="max-w-[720px] overflow-hidden bg-surface-dark p-0"
    >
      <div className="relative">
        <img src="/popup_img.png" alt={ALT} width={1536} height={1024} className="block h-auto w-full" />
        {/* 이미지에 그려진 X 표시 위치에 실제 닫기 버튼을 겹친다 */}
        <button
          onClick={close}
          aria-label="닫기"
          className="absolute top-[4%] right-[2.5%] size-[9%] cursor-pointer rounded-full"
        />
      </div>
      <div className="flex justify-center px-5 py-4">
        <Button variant="secondary-dark" size="sm" onClick={hideToday}>
          오늘 하루 보지 않기
        </Button>
      </div>
    </Modal>
  )
}
