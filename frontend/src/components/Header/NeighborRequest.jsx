// 라이브러리
import { useEffect, useState } from "react"

// 스타일
import styles from "./Header.module.css"

// 컴포넌트
import RoomBtn from "../Button/Room/RoomBtn"
import DefaultModal from "../Modal/Default/DefaultModal"

// API
import {
  fetchNeighrborAdd,
  neighborCheck,
  deleteNeighbor,
} from "@/api/Neighbor"

// 토스트
import { successMsg } from "@/utils/customToast"

const NeighborRequest = () => {
  const [roomId, setRoomId] = useState(window.location.pathname.match(/\d+/g))
  const [neighborFlag, setNeighborFlag] = useState(false)
  const [isAddNeighbor, setIsAddNeighbor] = useState(false)

  useEffect(() => {
    neighborCheck(
      roomId,
      (response) => {
        if (response.data.data == "Y") {
          setNeighborFlag(true)
        }
      },
      (error) => {
        console.log("Error in Neighbor Health Check... ", error)
      }
    )
  })

  // 이웃 추가하는 함수
  const isNeighbor = () => {
    fetchNeighrborAdd(
      roomId,
      (response) => {
        setIsAddNeighbor(false)
        successMsg("✅ 요청에 성공했습니다!")
      },
      (error) => {
        setIsAddNeighbor(false)
        // 1. "이미 요청을 보냈습니다."
        // 2. "이미 이웃입니다."
        console.log(error.response.data.message)
        successMsg(`❌ ${error.response.data.message}`)
      }
    )
  }

  const deleteNeighborByRoomId = () => {
    const input = { roomId: roomId[0] }
    deleteNeighbor(
      input,
      (response) => {
        successMsg("✅ 요청에 성공했습니다!")
      },
      (error) => {
        console.log("Error in delete Neighbor Method ...", error)
      }
    )
  }

  return (
    <>
      <div className={styles.ShareOther}>
        {!neighborFlag ? (
          <RoomBtn img={"addUser"} onClick={() => setIsAddNeighbor(true)} />
        ) : (
          <RoomBtn img={"Neighbor"} onClick={() => setIsAddNeighbor(true)} />
        )}
      </div>

      {isAddNeighbor && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsAddNeighbor(false)}
          />
          <div className={styles.AddNeighbor}>
            {neighborFlag ? (
              <>
                <DefaultModal
                  content={"이웃을 끊으시겠습니까?"}
                  ok={"확인"}
                  cancel={"취소"}
                  okClick={() => deleteNeighborByRoomId()}
                  cancelClick={() => setIsAddNeighbor(false)}
                />
              </>
            ) : (
              <>
                <DefaultModal
                  content={"이웃 요청을 하시겠습니까?"}
                  ok={"확인"}
                  cancel={"취소"}
                  okClick={() => isNeighbor()}
                  cancelClick={() => setIsAddNeighbor(false)}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default NeighborRequest