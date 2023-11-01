// 라이브러리
import { useEffect } from "react"

// API
import { fetchScore } from "../../../api/Score"

// 스타일
import styles from "./RankingModal.module.css"

const RankingModal = () => {
  // 스코어보드 정보 가져오기
  useEffect(() => {
    fetchScore(
      (success) => {
        console.log(success.data.data)
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
        <div className={styles.Time}></div>
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