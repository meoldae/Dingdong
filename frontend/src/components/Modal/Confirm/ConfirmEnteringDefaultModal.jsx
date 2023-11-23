// 라이브러리
import React, { useState, useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"

// Atom
import { ArriveAtom } from "../../../atom/SinglePlayAtom"
import { DefaultPosition, DefaultZoom } from "../../../atom/DefaultSettingAtom"
import { userAtom } from "../../../atom/UserAtom"
import {
  isPostOfficeVisibleAtom,
  selectedUserListAtom,
  selectedUserNicknameListAtom,
} from "../../../atom/PostOfficeAtom"
import {
  isPostBoxVisibleAtom,
  selectedPostCardAtom,
} from "../../../atom/PostAtom"
import { lastUrlPathAtom } from "../../../atom/UrlAtom"

// 스타일
import styles from "./ConfirmEnteringDefaultModal.module.css"

// API
import { getRandomRoom } from "@/api/Room"
import { RoomModalOpen, userPositionAtom } from "../../../atom/MultiAtom"

const ConfirmEnteringDefaultModal = ({
  modalContent,
  setConfirmEnteringLocation,
  location,
  flag,
}) => {
  const navigate = useNavigate()

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    }
  }, [isInitialRender])

  // 기본 카메라 설정
  const setDefaultCameraPosition = useSetRecoilState(DefaultPosition)
  const setDefaultCameraZoom = useSetRecoilState(DefaultZoom)

  // 도착 여부
  const setIsArrived = useSetRecoilState(ArriveAtom)

  // 사용자 정보
  const userInfo = useRecoilValue(userAtom)

  // 우체국 상태 관리
  const setIsPostOfficeVisible = useSetRecoilState(isPostOfficeVisibleAtom)
  const setSelectedUserList = useSetRecoilState(selectedUserListAtom)
  const setSelectUserNicknameList = useSetRecoilState(
    selectedUserNicknameListAtom
  )
  const setSelectPostCard = useSetRecoilState(selectedPostCardAtom)

  // 우체통 상태 관리
  const setIsPostBoxVisible = useSetRecoilState(isPostBoxVisibleAtom)

  // 멀티 상태 관리
  const p = useRecoilValue(userPositionAtom)

  // 이전 URL 상태 관리
  const setLastURL = useSetRecoilState(lastUrlPathAtom)

  // 마이룸으로 이동
  const onConfirm = () => {
    // 기본 값 설정
    setDefaultCameraPosition([2, 10, 10])
    setDefaultCameraZoom(0.18)

    // 초기화
    setIsInitialRender(true)
    if (location === "house") {
      setLastURL(window.location.pathname)
      const roomId = userInfo.roomId
      navigate(`${urlPath}/room/${roomId}`)
      // 우체국으로 이동
    } else if (location === "postOffice") {
      setSelectedUserList([])
      setSelectUserNicknameList([])
      setSelectPostCard(null)
      setIsPostOfficeVisible(true)
      setConfirmEnteringLocation(false)
      setIsArrived(false)
    } else if (location === "otherRoom") {
      setLastURL(window.location.pathname)
      let randRoomId
      getRandomRoom(
        (response) => {
          randRoomId = response.data.data
          navigate(`${urlPath}/random/${randRoomId}`)
        },
        (error) => {
          console.log("Error with Random Room...", error)
        }
      )
    } else if (location === "Test") {
      navigate(`${urlPath}/yourstamp`)
      setIsArrived(false)
    } else if (location === "Insta") {
      window.open("https://www.instagram.com/dingdong_letter/")
      setIsArrived(false)
    } else if (location === "Twitter") {
      window.open("https://twitter.com/dingdong_letter")
      setIsArrived(false)
    }
    // 편지함 확인 로직
    else if (location === "PostBox") {
      setIsPostBoxVisible(true)
      setIsArrived(false)
    } else if (location === "world") {
      navigate(`${urlPath}/multiPage`)
      setIsArrived(false)
    }

    setConfirmEnteringLocation(false)
  }

  // 모달 취소
  const onCancle = () => {
    setConfirmEnteringLocation(false)
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
  const [ok, setOk] = useState("")

  // 내용
  const letters = modalContent
  const yesText = ["▶", " ", "예"]
  const noText = ["▶", " ", "아니오"]
  const okText = ["▶", " ", "확인"]

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
    // 확인 선택버튼 함수
    const typeOk = async () => {
      for (let char of okText) {
        setOk((prevText) => prevText + char)
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
      if (flag === "0") {
        await typeOk()
      } else {
        await typeYes()
        await typeNo()
      }
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
            {flag !== "0" && (
              <>
                <div className={styles.Confirm} onClick={onConfirm}>
                  {yes}
                </div>
                <div className={styles.Confirm} onClick={onCancle}>
                  {no}
                </div>
              </>
            )}

            <div className={styles.Confirm} onClick={onCancle}>
              {ok}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmEnteringDefaultModal
