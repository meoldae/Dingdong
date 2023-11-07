// 라이브러리
import { useRecoilValue } from "recoil"

// Atom
import { guestBookDetailContentAtom } from '../../../atom/GuestBookAtom'
import { roomInfoAtom } from "../../../atom/RoomInfoAtom"

// 스타일
import styles from './DetailGuestBookModal.module.css'

// 컴포넌트
import { successMsg } from "../../../utils/customToast"

const DetailGuestBookModal = () => {
  // 현재 방 번호
  const nowRoomId = window.location.pathname.match(/\d+/g)[0]
  const nowUserId = JSON.parse(localStorage.getItem("userAtom")).roomId
  console.log(nowRoomId, nowUserId)

  // 리코일 상태관리
  const guestBookDetailContent = useRecoilValue(guestBookDetailContentAtom)
  const roomInfo = useRecoilValue(roomInfoAtom)

  // 컬러 리스트
  const colorList = [
    "linear-gradient(180deg, #FFFFFF 0%, #FF6E8A 100%)", // 0: 빨간색
    "linear-gradient(180deg, #FFFFFF 0%, #FF9E2C 100%)", // 1: 주황색
    "linear-gradient(180deg, #FFFFFF 0%, #FFC745 100%)", // 2: 노란색
    "linear-gradient(180deg, #FFFFFF 0%, #27D674 100%)", // 3: 초록색
    "linear-gradient(180deg, #FFFFFF 0%, #64B1FF 100%)", // 4: 파란색
    "linear-gradient(180deg, #FFFFFF 0%, #CB9DFF 100%)", // 5: 보라색
    "linear-gradient(180deg, #FFFFFF 0%, #696969 100%)", // 6: 검정색
  ]

  // 시간 변경 함수
  const changeTimeHandler = (time) => {
    const writedTime = new Date(time)
    const nowTime = new Date()

    const diffTime = nowTime - writedTime
    const hoursDiff = diffTime / (1000 * 60 * 60)

    return `${Math.floor(hoursDiff)}시간 전 작성`
  }

  // 방명록 신고하기 함수
  const reportHandler = () => {
    successMsg("⛔ 준비 중인 기능입니다.")
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. {roomInfo}</div>
        <div className={styles.ContentContainer}>
          <div
            className={styles.Content}
            style={{ fontFamily: "GangwonEduAll-Light", background: `${colorList[guestBookDetailContent.color]}` }}
          >
            {guestBookDetailContent.description}
          </div>
        </div>
        <div className={styles.TimeContainer}>
          <div className={styles.Time}>{changeTimeHandler(guestBookDetailContent.writeTime)}</div>
        </div>
        <div className={styles.FooterContainer}>
          {nowRoomId == nowUserId && <div className={styles.Report} onClick={() => reportHandler()}>신고하기</div>}
          <div className={styles.Footer}>From. {guestBookDetailContent.nickname}</div>
        </div>
      </div>
    </>
  )
}

export default DetailGuestBookModal