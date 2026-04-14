import { HiOutlineUsers, HiUsers } from 'react-icons/hi'

const variant = process.env.NEXT_PUBLIC_HOME_ACTION_VARIANT ?? process.env.HOME_ACTION_VARIANT ?? 'intervention'

export function FurtherProcessGroup() {
  if (variant === 'sham') {
    return (
      <div className="mt-4 mb-6">
        <div className="flex flex-col p-4 border rounded-lg shadow-sm">
          <HiOutlineUsers size={32} />
          <h3 className="text-lg font-semibold mt-2">『일상코치』 테마 읽기 프로그램 사용자</h3>
          <p className="mt-1 text-sm text-gray-600">
            실험 집단을 배정받은 참가자분에게는 연구원이 개별 연락을 통해 『일상코치』의 이용 방법을 안내할
            것입니다.
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-600">
            하나의 주제문 읽기는 5-10분 정도 소요되며, 주 2-3회, 한 번에 하나의 주제문을 끝까지 읽으시는
            것을 권장드립니다.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 mb-6">
      <div className="flex flex-col p-4 border rounded-lg shadow-sm">
        <HiUsers size={32} />
        <h3 className="text-lg font-semibold mt-2">『일상코치』 챗봇 프로그램 사용자</h3>
        <p className="mt-1 text-sm text-gray-600">
          실험 집단을 배정받은 참가자분에게는 연구원이 개별 연락을 통해 『일상코치』의 이용 방법을 안내할
          것입니다.
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-600">
          하나의 상담 세션은 10-20분 정도 소요되며, 주 2-3회, 한 번에 한 상담 세션을 완료하시는 것을
          권장드립니다.
        </p>
      </div>
    </div>
  )
}
