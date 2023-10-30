// 라이브러리
import { useEffect, useState } from "react"

// 스타일
import styles from "./Header.module.css"

// 컴포넌트
import RoomBtn from "../Button/Room/RoomBtn"

// API
import { fetchNeighrborAdd } from "@/api/Neighbor"


useEffect(() => {
  // 이웃 여부 헬스체크


}, [])

const NeighborRequest = () => {
  const [isAddNeighbor, setIsAddNeighbor] = useState(false)

  // 이웃 추가하는 함수
  const isNeighbor = () => {
    const roomId = window.location.pathname.match(/\d+/g)
    fetchNeighrborAdd(roomId,
      (response) => {        
      },
      (error) => {
        // 1. "이미 요청을 보냈습니다."
        // 2. "이미 이웃입니다."
        console.log(error.response.data.message);
      }
    ) 
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.share}>
          <div className={styles.shareImg}>
            <RoomBtn img={"addUser"} onClick={() => setIsAddNeighbor(true)} />
          </div>
        </div>
      </div>

      {isAddNeighbor && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsAddNeighbor(false)}
          />
          <div className={styles.AddNeighbor}>
            <div className={styles.MainContainer}>
              <div className={styles.TitleContainer}>
                <div style={{ color: "#2C2C2C" }}>
                  이웃 요청을 하시겠습니까?
                </div>
              </div>
              <div className={styles.HorizontalLine} />
              <div className={styles.VerticalLine} />
              <div className={styles.ButtonContainer}>
                <div className={styles.Button} style={{ color: "#049463" }} onClick={() => isNeighbor()}>
                  수락
                </div>
                <div
                  className={styles.Button}
                  style={{ color: "#2C2C2C" }}
                  onClick={() => setIsAddNeighbor(false)}
                >
                  취소
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default NeighborRequest
