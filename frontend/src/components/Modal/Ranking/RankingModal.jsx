// 라이브러리
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"

// API
import { fetchScore } from "../../../api/Score"

// 스타일
import styles from "./RankingModal.module.css"

// Atom
import { lastUrlPathAtom } from "../../../atom/UrlAtom"

const RankingModal = () => {
  // URL 이동경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 기준시간 상태관리
  const [standardTime, setStandardTime] = useState("")
  // 방좋아요 순위 상태관리
  const [mostLikeRoomList, setMostLikeRoomList] = useState([])
  // 편지 많이받은 순위 상태관리
  const [mostReceiveLetterList, setMostReceiveLetterList] = useState([])
  // 편지 많이보낸 순위 상태관리
  const [mostSendLetterList, setMostSendLetterList] = useState([])
  // 랭킹 탭 상태관리
  const [rankingTab, setRankingTab] = useState(1)

  // 리코일 상태관리
  const setLastURL = useSetRecoilState(lastUrlPathAtom)

  // 시간변경함수
  const changeTime = (inputTime) => {
    const date = new Date(inputTime)

    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')

    return `${year}.${month}.${day} ${hours}시`
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
    setLastURL(window.location.pathname)
    window.location.replace(`${urlPath}/room/${roomId}`)
  }

  const RankingSection = ({ rankingList }) => (
    <>
      {rankingList.map((item, index) => (
        <div key={item.memberId} className={styles.ContentContainer} onClick={() => navigateRoom(item.roomId)}>
          <div className={index === 0 ? styles.IndexFirst : index === 1 ? styles.IndexSecond : styles.IndexThird}>{index + 1}등</div>
          <div className={styles.Content}>{item.nickname}</div>
          <div className={styles.Content}>{item.recordCount}</div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.TitleContainer}>
          <div className={styles.Title}>실시간 순위👑</div>
        </div>
        <div className={styles.ButtonContainer}>
          <div
            className={rankingTab === 1 ? styles.SelectButton : styles.Button}
            onClick={() => setRankingTab(1)}
          >
            방꾸왕
          </div>
          <div
            className={rankingTab === 2 ? styles.SelectButton : styles.Button}
            onClick={() => setRankingTab(2)}
          >
            인기왕
          </div>
          <div
            className={rankingTab === 3 ? styles.SelectButton : styles.Button}
            onClick={() => setRankingTab(3)}
          >
            소통왕
          </div>
        </div>
        <div className={styles.TimeContainer}>
          <div className={styles.Time}>{changeTime(standardTime)} 기준</div>
        </div>
        <div className={styles.TypeContainer}>
          <div className={styles.Type}>순위</div>
          <div className={styles.Type}>닉네임</div>
          <div className={styles.Type}>포인트</div>
        </div>
        {rankingTab === 1 && <RankingSection rankingList={mostLikeRoomList} />}
        {rankingTab === 2 && <RankingSection rankingList={mostReceiveLetterList} />}
        {rankingTab === 3 && <RankingSection rankingList={mostSendLetterList} />}
      </div>
    </>
  )
}

export default RankingModal