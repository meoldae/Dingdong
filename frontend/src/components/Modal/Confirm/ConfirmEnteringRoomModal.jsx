import React, { useState, useEffect } from "react"
import { useSetRecoilState } from "recoil"
import {
  ArriveAtom,
  ConfirmEnteringRoomAtom,
} from "../../../atom/SinglePlayAtom"
import { DefaultPosition, DefaultZoom } from "../../../atom/DefaultSettingAtom"
import styles from "./ConfirmEnteringRoomModal.module.css"

const ConfirmEnteringRoomModal = () => {
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    if (isInitialRender) {
      console.log(1)
      setIsInitialRender(false)
    }
  }, [isInitialRender])

  // 기본 카메라 설정
  const setDefaultCameraPosition = useSetRecoilState(DefaultPosition)
  const setDefaultCameraZoom = useSetRecoilState(DefaultZoom)

  // 입장 여부
  const setConfirmEnteringHouse = useSetRecoilState(ConfirmEnteringRoomAtom)

  // 도착 여부
  const setIsArrived = useSetRecoilState(ArriveAtom)

  // 마이룸으로 이동
  const onConfirm = () => {
    setConfirmEnteringHouse(false)
  }

  // 모달 취소
  const onCancle = () => {
    setConfirmEnteringHouse(false)
    setIsArrived(false)

    // 기본 값 설정
    setDefaultCameraPosition([2, 10, 10])
    setDefaultCameraZoom(0.18)

    // 초기화
    setIsInitialRender(true)
  }

  return (
    <div className={styles.MainModal}>
      <div className={styles.ContentBox}>
        <div className={styles.ContentContainer}>
          <div className={styles.Title}>딩동!</div>
          <div className={styles.Content}>마이룸에 입장하시겠습니까?</div>
          <div className={styles.ConfirmContainer}>
            <div className={styles.Confirm} onClick={onConfirm}>
              ▶&nbsp;&nbsp;&nbsp;예
            </div>
            <div className={styles.Confirm} onClick={onCancle}>
              ▶&nbsp;&nbsp;&nbsp;아니오
            </div>
            {/* &nbsp; = 띄어쓰기 */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEnteringRoomModal
