// 라이브러리
import { useState } from "react"

// 스타일
import styles from "./Header.module.css"

// 컴포넌트
import RoomBtn from "../Button/Room/RoomBtn"

// API
import { fetchNeighrborAdd } from "@/api/Neighbor"

const NeighborRequest = () => {
  const [isAddNeighbor, setIsAddNeighbor] = useState(true)

  // 이웃 추가하는 함수
  // targetId = roomId로 변경될 예정..! 수정되면 해당 주석 지워주세요.
  const isNeighbor = () => {
    fetchNeighrborAdd(
      targetId,
      (response) => {
        console.log(response.data.data)
      },
      (error) => {
        console.log("Error at fetching Neighbor Add...", error)
      }
    )
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.share}>
          <div className={styles.shareImg}>
            <RoomBtn img={"addUser"} onClick={isNeighbor} />
          </div>
        </div>
      </div>
      {isAddNeighbor && <div className={styles.AddNeighbor}>모달</div>}
    </>
  )
}

export default NeighborRequest
