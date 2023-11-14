import { Canvas } from "@react-three/fiber"
import { MultiRender } from "./MultiRender"
import styles from "./MultiPage.module.css"
import {
  MultiUsers,
  isFloatingButtonVisibleAtom,
  otherRoomId,
} from "../../atom/MultiAtom"
import { useRef, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { RoomModalOpen } from "../../atom/MultiAtom"
import DefaultModal from "../Modal/Default/DefaultModal"
import { useNavigate } from "react-router-dom"
import MultiRoomModal from "./MultiRoomModal"

export const MultiPage = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const navigate = useNavigate()
  const multiRenderRef = useRef()

  const [chatInput, setChatInput] = useState("")
  const [roomModalOpen, setRoomModalOpen] = useRecoilState(RoomModalOpen)

  const users = useRecoilValue(MultiUsers)
  const otherRoom = useRecoilValue(otherRoomId)

  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useRecoilState(
    isFloatingButtonVisibleAtom
  )

  const chatButtonClick = () => {
    if (multiRenderRef.current?.publishChat) {
      multiRenderRef.current.publishChat(chatInput)
      setChatInput("")
    }
  }

  const handleButtonClick = (action) => {
    if (multiRenderRef.current?.publishActions) {
      multiRenderRef.current.publishActions(action)
    }

    setIsFloatingButtonVisible(false)
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      // 엔터 키를 눌렀을 때 메시지 전송
      chatButtonClick()
    }
  }

  const okClick = () => {
    setRoomModalOpen(false)
    navigate(`${urlPath}/room/${otherRoom}`)
  }

  const cancelClick = () => {
    setRoomModalOpen(false)
  }

  return (
    <div className={styles.container}>
      {roomModalOpen && (
        <div className={styles.confirmModal}>
          <MultiRoomModal
            content={`${users[otherRoom].nickname}의 방으로 이동하시겠습니까?`}
            ok={"확인"}
            cancel={"취소"}
            okClick={okClick}
            cancelClick={cancelClick}
          />
        </div>
      )}
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          placeholder="채팅을 입력하세요"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <div onClick={chatButtonClick} className={styles.SendButton}>
          <img src={`${urlPath}/assets/icons/white_paperplane.png`} />
        </div>
      </div>
      <div
        className={styles.FloatingButton}
        onClick={() => setIsFloatingButtonVisible(true)}
      >
        <img
          src={`${urlPath}/assets/icons/white_plus.png`}
          className={`${styles.PlusButton} ${
            isFloatingButtonVisible ? styles.Rotate : styles.RotateBack
          }`}
        />
      </div>
      {isFloatingButtonVisible && (
        <>
          <div
            className={styles.Overlay}
            onClick={() => setIsFloatingButtonVisible(false)}
          />
          <div className={styles.BtnList}>
            <div
              className={styles.actionsBtn}
              onClick={() => handleButtonClick(1)}
            >
              <div className={styles.FloatContent}>기뻐하기</div>
              <div className={styles.IconButton}>
                <img
                  src={`${urlPath}/assets/icons/smile.png`}
                  className={styles.FloatIcon}
                />
              </div>
            </div>
            <div
              className={styles.actionsBtn}
              onClick={() => handleButtonClick(2)}
            >
              <div className={styles.FloatContent}>슬퍼하기</div>
              <div className={styles.IconButton}>
                <img
                  src={`${urlPath}/assets/icons/sad.png`}
                  className={styles.FloatIcon}
                />
              </div>
            </div>
            <div
              className={styles.actionsBtn}
              onClick={() => handleButtonClick(3)}
            >
              <div className={styles.FloatContent}>춤추기</div>
              <div className={styles.IconButton}>
                <img
                  src={`${urlPath}/assets/icons/dance.png`}
                  className={styles.FloatIcon}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <Canvas shadows camera={{ position: [2, 8, 15], fov: 30, zoom: 0.72 }}>
        <MultiRender ref={multiRenderRef} />
      </Canvas>
    </div>
  )
}
