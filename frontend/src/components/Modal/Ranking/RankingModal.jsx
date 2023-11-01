// 라이브러리
import { useEffect, useState } from "react"

// API
import { fetchScore } from "../../../api/Score"

// 스타일
import styles from "./RankingModal.module.css"

const RankingModal = () => {
  // 기준시간 상태관리
  const [standardTime, setStandardTime] = useState("")
  // 방좋아요 순위 상태관리
  const [mostLikeRoomList, setMostLikeRoomList] = useState([])
  // 편지 많이받은 순위 상태관리
  const [mostReceiveLetterList, setMostReceiveLetterList] = useState([])
  // 편지 많이보낸 순위 상태관리
  const [mostSendLetterList, setMostSendLetterList] = useState([])

  // 시간변경함수
  const changeTime = (inputTime) => {
    const date = new Date(inputTime)

    const year = date.getFullYear().toString().substr(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

  // 스코어보드 정보 가져오기
  useEffect(() => {
    fetchScore(
      (success) => {
        setStandardTime(success.data.data.recordTime)
        setMostLikeRoomList(success.data.data.scores.ROOM_LIKE_COUNT)
        setMostSendLetterList(success.data.data.scores.LETTER_SEND_COUNT)
        setMostReceiveLetterList(success.data.data.scores.LETTER_RECEIVE_COUNT)
      },
      (error) => {
        "Error at Scoreboard...", error
      }
    )
  }, [])

  // 방 이동 함수
  const navigateRoom = (roomId) => {
    window.location.replace(`/room/${roomId}`)
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.TitleContainer}>
          <div className={styles.Title}>랭킹</div>
        </div>
        <div className={styles.Time}>기준시간 : {changeTime(standardTime)}</div>
        <div className={styles.ContentContainer}>
          <div className={styles.MostContainer}>
            <div className={styles.MostTitle}>
              방 꾸미기 전문가
            </div>
            <div className={styles.TitleLine} />
            <div className={styles.MostContent}>
              <div className={styles.Content} onClick={() => navigateRoom(mostLikeRoomList[0].roomId)}>
                1등 {mostLikeRoomList[0].nickname}
              </div>
              <div className={styles.Content} onClick={() => navigateRoom(mostLikeRoomList[1].roomId)}>
                2등 {mostLikeRoomList[1].nickname}
              </div>
              <div className={styles.Content} onClick={() => navigateRoom(mostLikeRoomList[2].roomId)}>
                3등 {mostLikeRoomList[2].nickname}
              </div>
            </div>
          </div>
          <div className={styles.MostContainer}>
            <div className={styles.MostTitle}>
              인기왕
            </div>
            <div className={styles.TitleLine} />
            <div className={styles.MostContent}>
              <div className={styles.Content} onClick={() => navigateRoom(mostReceiveLetterList[0].roomId)}>
                1등 {mostReceiveLetterList[0].nickname}
              </div>
              <div className={styles.Content} onClick={() => navigateRoom(mostReceiveLetterList[1].roomId)}>
                2등 {mostReceiveLetterList[1].nickname}
              </div>
              <div className={styles.Content} onClick={() => navigateRoom(mostReceiveLetterList[2].roomId)}>
                3등 {mostReceiveLetterList[2].nickname}
              </div>
            </div>
          </div>
          <div className={styles.MostContainer}>
            <div className={styles.MostTitle}>
              소통왕
            </div>
            <div className={styles.TitleLine} />
            <div className={styles.MostContent}>
              <div className={styles.Content} onClick={() => navigateRoom(mostSendLetterList[0].roomId)}>
                1등 {mostSendLetterList[0].nickname}
              </div>
              <div className={styles.Content} onClick={() => navigateRoom(mostSendLetterList[1].roomId)}>
                2등 {mostSendLetterList[1].nickname}
              </div>
              <div className={styles.Content} onClick={() => navigateRoom(mostSendLetterList[2].roomId)}>
                3등 {mostSendLetterList[2].nickname}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RankingModal