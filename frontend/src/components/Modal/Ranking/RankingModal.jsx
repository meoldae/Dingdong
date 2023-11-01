// 라이브러리
import { useEffect, useState } from "react"

// API
import { fetchScore } from "../../../api/Score"

// 스타일
import styles from "./RankingModal.module.css"

const RankingModal = () => {
  // 기준시간 상태관리
  const [standardTime, setStandardTime] = useState("")

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
        console.log(success.data.data)
        setStandardTime(success.data.data.recordTime)
      },
      (error) => {
        "Error at Scoreboard...", error
      }
    )
  }, [])
  

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.TitleContainer}>
          <div className={styles.Title}>랭킹</div>
        </div>
        <div className={styles.Time}>기준시간 : {changeTime(standardTime)}</div>
        <div className={styles.ContentContainer}>
          <div className={styles.MostLikeRoomContainer}>
            <div className={styles.MostLikeRoomTitle}>
              방 꾸미기 전문가
            </div>
            {/* 컨텐츠 자리 */}
            <div className={styles.TitleLine} />
          </div>
          <div className={styles.MostReceiveLetterContainer}>
            <div className={styles.MostReceiveLetterTitle}>
              인기왕
            </div>
            {/* 컨텐츠 자리 */}
            <div className={styles.TitleLine} />
          </div>
          <div className={styles.MostSendLetterContainer}>
            <div className={styles.MostSendLetterTitle}>
              소통왕
            </div>
            {/* 컨텐츠 자리 */}
            <div className={styles.TitleLine} />
          </div>
        </div>
      </div>
    </>
  )
}

export default RankingModal