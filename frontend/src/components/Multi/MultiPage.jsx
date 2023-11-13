import { Canvas } from "@react-three/fiber"
import { MultiRender } from "./MultiRender"
import styles from "./MultiPage.module.css"
import { useRef, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { RoomModalOpen } from "../../atom/MultiAtom"
import { motion } from "framer-motion"
import ConfirmEnteringDefaultModal from "../Modal/Confirm/ConfirmEnteringDefaultModal"

export const MultiPage = () => {
  const [chatInput, setChatInput] = useState("")
  const [roomModalOpen, setRoomModalOpen] = useRecoilState(RoomModalOpen)
  const multiRenderRef = useRef()

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
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      // 엔터 키를 눌렀을 때 메시지 전송
      chatButtonClick()
    }
  }
  return (
    <div className={styles.container}>
      {roomModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className={styles.confirmModal}>
            {/* 준비중인 곳은 "준비중"으로 넣을 것!  그 외에는 들어가는 곳의 장소명을 넣을 것! */}
            <ConfirmEnteringDefaultModal
              modalContent={"~ 방에 입장하기"}
              setConfirmEnteringLocation={setRoomModalOpen}
              location={"multiRoom"}
              flag={"1"}
            />
          </div>
        </motion.div>
      )}
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={chatButtonClick}>Send</button>
      </div>
      <div className={styles.BtnList}>
        <div className={styles.actionsBtn} onClick={() => handleButtonClick(1)}>
          기뻐하기
        </div>
        <div className={styles.actionsBtn} onClick={() => handleButtonClick(2)}>
          슬퍼하기
        </div>
        <div className={styles.actionsBtn} onClick={() => handleButtonClick(3)}>
          춤추기
        </div>
      </div>
      <Canvas shadows camera={{ position: [2, 8, 15], fov: 30, zoom: 0.72 }}>
        <MultiRender ref={multiRenderRef} />
      </Canvas>
    </div>
  )
}
