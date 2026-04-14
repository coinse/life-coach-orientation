import { ConfirmButton } from '@/components/confirm-button'

const variant = process.env.NEXT_PUBLIC_HOME_ACTION_VARIANT ?? process.env.HOME_ACTION_VARIANT ?? 'intervention'

export function HomeStartAction() {
  if (variant === 'sham') {
    return (
      <>
        <p>카드뉴스로 안내를 확인한 뒤 사전 평가를 시작합니다.</p>
        <ConfirmButton href="/docs" label="카드뉴스 보고 시작하기 ->" />
      </>
    )
  }

  else {
    return <ConfirmButton href="/docs" label="동영상 보고 시작하기 ->" />
  }
}
