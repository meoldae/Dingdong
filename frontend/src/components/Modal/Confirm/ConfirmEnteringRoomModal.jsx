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

  // 글자가 작성되는 JS -----------
  const [content, setContent] = useState("")
  const [yes, setYes] = useState("")
  const [no, setNo] = useState("")

  // 내용
  const letters = "마이룸에 입장하시겠습니까?"
  const yesText = ["▶", " ", "예"]
  const noText = ["▶", " ", "아니오"]

  // 글자 나오는 속도
  const speed = 50
  // 각 파트별 딜레이 속도
  const delay = 200

  // 대기함수
  const wait = (ms) => new Promise((res) => setTimeout(res, ms))

  useEffect(() => {
    // 예 선택버튼 함수
    const typeYes = async () => {
      for (let char of yesText) {
        setYes((prevText) => prevText + char)
        await wait(speed)
      }
      await wait(delay)
    }

    // 아니오 선택버튼 함수
    const typeNo = async () => {
      for (let char of noText) {
        setNo((prevText) => prevText + char)
        await wait(speed)
      }
    }

    // 모달 내용 및 예/아니오 버튼 함수
    const typeWords = async () => {
      for (let char of letters) {
        setContent((prevText) => prevText + char)
        await wait(speed)
      }
      await wait(delay)
      await typeYes()
      await typeNo()
    }

    // 함수 실행
    typeWords()
  }, [])
  // -----------

  return (
    <div className={styles.MainModal}>
      <div className={styles.ContentBox}>
        <div className={styles.ContentContainer}>
          <div className={styles.Title}>딩동!</div>
          <div className={styles.Content}>{content}</div>
          <div className={styles.ConfirmContainer}>
            <div className={styles.Confirm} onClick={onConfirm}>
              {yes}
            </div>
            <div className={styles.Confirm} onClick={onCancle}>
              {no}
            </div>
            {/* &nbsp; = 띄어쓰기 */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEnteringRoomModal
