import { Canvas } from "@react-three/fiber"
import { MultiRender } from "./MultiRender"
import styles from "./MultiPage.module.css"
import {
  MultiUsers,
  isFloatingButtonVisibleAtom,
  otherRoomId,
} from "../../atom/MultiAtom"
import { useRef, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { RoomModalOpen } from "../../atom/MultiAtom"
import { useNavigate } from "react-router-dom"
import MultiRoomModal from "./MultiRoomModal"
import SingleHeader from "../../pages/SinglePlay/SingleHeader"
import ModeChangeModal from "./ModeChangeModal"
import { lastUrlPathAtom } from "../../atom/UrlAtom"

export const MultiPage = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const navigate = useNavigate()
  const multiRenderRef = useRef()

  const [chatInput, setChatInput] = useState("")
  const [roomModalOpen, setRoomModalOpen] = useRecoilState(RoomModalOpen)
  const setLastURL = useSetRecoilState(lastUrlPathAtom)

  const users = useRecoilValue(MultiUsers)
  const otherRoom = useRecoilValue(otherRoomId)
  const [changeModalOpen, setChangeModalOpen] = useState(false)

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
    setLastURL(window.location.pathname)
    setRoomModalOpen(false)
    navigate(`${urlPath}/room/${otherRoom}`)
  }

  const cancelClick = () => {
    setRoomModalOpen(false)
  }

  const onSingleMap = () => {
    setChangeModalOpen(true)
  }

  const okClick2 = () => {
    setChangeModalOpen(false)
    navigate(`${urlPath}/`)
  }

  const cancelClick2 = () => {
    setChangeModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <SingleHeader checkMyRoom={"multi"} />
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
      {changeModalOpen && (
        <div className={styles.confirmModal}>
          <ModeChangeModal
            content={"딩동 마을로 이동하시겠습니까?"}
            ok={"확인"}
            cancel={"취소"}
            okClick={okClick2}
            cancelClick={cancelClick2}
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
      <div className={styles.leftFloatingButton} onClick={onSingleMap}>
        <img
          src={`${urlPath}/assets/icons/worldMap.png`}
          className={styles.FloatIcon}
        />
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

useGLTF.preload(`${urlPath}/assets/models/characters/1.glb`)
useGLTF.preload(`${urlPath}/assets/models/characters/2.glb`)
useGLTF.preload(`${urlPath}/assets/models/characters/3.glb`)
useGLTF.preload(`${urlPath}/assets/models/characters/4.glb`)
useGLTF.preload(`${urlPath}/assets/models/characters/5.glb`)
useGLTF.preload(`${urlPath}/assets/models/characters/6.glb`)
