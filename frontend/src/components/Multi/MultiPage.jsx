import { Canvas } from "@react-three/fiber"
import { MultiRender } from "./MultiRender"
import styles from "./MultiPage.module.css"
import {
  MultiUsers,
  isFloatingButtonVisibleAtom,
  otherRoomId,
} from "../../atom/MultiAtom"
import { useEffect, useRef, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { RoomModalOpen, chatLogVisibleAtom } from "../../atom/MultiAtom"
import { useNavigate } from "react-router-dom"
import MultiRoomModal from "./MultiRoomModal"
import SingleHeader from "../../pages/SinglePlay/SingleHeader"
import ModeChangeModal from "./ModeChangeModal"
import { lastUrlPathAtom } from "../../atom/UrlAtom"
import { useGLTF } from "@react-three/drei"

const urlPath = import.meta.env.VITE_APP_ROUTER_URL

export const MultiPage = () => {
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  const navigate = useNavigate()
  const multiRenderRef = useRef()

  // 채팅 리스트
  const [chatList, setChatList] = useState([])

  const chatListRef = useRef()

  useEffect(() => {
    // chatList가 변경될 때마다 채팅 컨테이너를 맨 아래로 스크롤
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight
  }, [chatList])

  const [chatInput, setChatInput] = useState("")
  const [roomModalOpen, setRoomModalOpen] = useRecoilState(RoomModalOpen)
  const setLastURL = useSetRecoilState(lastUrlPathAtom)

  const users = useRecoilValue(MultiUsers)
  const otherRoom = useRecoilValue(otherRoomId)
  const [changeModalOpen, setChangeModalOpen] = useState(false)

  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useRecoilState(
    isFloatingButtonVisibleAtom
  )

  const updatedChatLog = (multiChat) => {
    const chatLog = [multiChat[0], multiChat[1]]
    setChatList((currentArray) => [...currentArray, chatLog])
  }

  // 채팅로그 모달 상태관리
  // const [chatLogVisible, setChatLogVisible] = useRecoilState(chatLogVisibleAtom)

  const chatButtonClick = () => {
    if (multiRenderRef.current?.publishChat) {
      if (chatInput.trim().length >= 1) {
        multiRenderRef.current.publishChat(chatInput.trim())
      }
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
      <div className={styles.bottomFix}>
        <div className={styles.circleBtnList}>
          <div className={styles.leftFloatingButton} onClick={onSingleMap}>
            <img
              src={`${urlPath}/assets/icons/worldMap.png`}
              className={styles.FloatIcon}
            />
          </div>

          <div
            className={styles.FloatingButton}
            onClick={() =>
              setIsFloatingButtonVisible((prevState) => !prevState)
            }
          >
            <img
              src={`${urlPath}/assets/icons/GreenPlus.png`}
              className={`${styles.PlusButton} ${
                isFloatingButtonVisible ? styles.Rotate : styles.RotateBack
              }`}
            />
            {isFloatingButtonVisible && (
              <>
                <div className={styles.BtnList}>
                  <div
                    className={styles.actionsBtn}
                    onClick={() => handleButtonClick(4)}
                  >
                    <div className={styles.FloatContent}>주사위</div>
                    <div className={styles.IconButton}>
                      <img
                        src={`${urlPath}/assets/icons/dice.png`}
                        style={{ width: "65px", height: "40px" }}
                      />
                    </div>
                  </div>
                  <div
                    className={styles.actionsBtn}
                    onClick={() => {
                      handleButtonClick(1)
                    }}
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
          </div>
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.chatList} ref={chatListRef}>
            {chatList.map((chat, idx) => (
              <div key={idx}>
                <span>{chat[0]} : </span>
                <span>{chat[1]}</span>
              </div>
            ))}
          </div>
          <div className={styles.chatInputContainer}>
            <input
              type="text"
              placeholder="채팅을 입력하세요"
              value={chatInput}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setChatInput(e.target.value)
                }
              }}
              onKeyDown={handleInputKeyDown}
            />
            <div onClick={chatButtonClick} className={styles.SendButton}>
              <img src={`${urlPath}/assets/icons/white_paperplane.png`} />
            </div>
          </div>
        </div>
      </div>

      <Canvas shadows camera={{ position: [2, 8, 15], fov: 30, zoom: 0.72 }}>
        <MultiRender ref={multiRenderRef} updatedChatLog={updatedChatLog} />
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
useGLTF.preload(`${urlPath}/assets/models/tempGlb/dice2.glb`)
