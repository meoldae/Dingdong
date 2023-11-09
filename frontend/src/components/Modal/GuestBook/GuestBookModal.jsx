// 라이브러리
import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

// Atom
import {
  isGuestBookVisibleAtom,
  isWriteGuestBookVisibleAtom,
  isDetailGuestBookVisibleAtom,
  guestBookDetailContentAtom
}  from "../../../atom/GuestBookAtom"
import { roomInfoAtom } from "../../../atom/RoomInfoAtom"

// API
import { fetchListGuestBook, fetchDetailGuestBook } from "../../../api/GuestBook"

// 스타일
import styles from "./GuestBookModal.module.css"

// 컴포넌트
import { successMsg } from "../../../utils/customToast"

const GuestBookModal = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL
  // 방 사용자 정보
  const roomInfo = useRecoilValue(roomInfoAtom)

  // 방명록 리스트 상태관리
  const [guestBookList, setGuestBookList] = useState([])

  // 리코일 상태관리
  const setIsGuestBookVisible = useSetRecoilState(isGuestBookVisibleAtom)
  const setIsWriteGuestBookVisible = useSetRecoilState(isWriteGuestBookVisibleAtom)
  const setIsDetailGuestBookVisible = useSetRecoilState(isDetailGuestBookVisibleAtom)
  const setGuestBookDetailContent = useSetRecoilState(guestBookDetailContentAtom)

  // 방명록 리스트 가져오기
  useEffect(() => {
    const nowRoomId = window.location.pathname.match(/\d+/g)[0]

    fetchListGuestBook(
      nowRoomId,
      (success) => {
        setGuestBookList(success.data.data)
      },
      (error) => {
        successMsg("❌ 방명록 리스트를 가져오는데 실패했습니다.")
        console.log('Error at ListGuestBook...', error)
      }
    )
  }, [])

  // 색상 아이템
  const colorList = [
    "linear-gradient(180deg, #FFFFFF 0%, #FF6E8A 100%)", // 0: 빨간색
    "linear-gradient(180deg, #FFFFFF 0%, #FF9E2C 100%)", // 1: 주황색
    "linear-gradient(180deg, #FFFFFF 0%, #FFC745 100%)", // 2: 노란색
    "linear-gradient(180deg, #FFFFFF 0%, #27D674 100%)", // 3: 초록색
    "linear-gradient(180deg, #FFFFFF 0%, #64B1FF 100%)", // 4: 파란색
    "linear-gradient(180deg, #FFFFFF 0%, #CB9DFF 100%)", // 5: 보라색
    "linear-gradient(180deg, #FFFFFF 0%, #696969 100%)", // 6: 검정색
  ]

  // 콘텐츠 아이템
  const ContentItem = ({ content, rotate, colorNum }) => {
    return (
      <div className={styles.Item}>
        <div
          className={styles.Content}
          style={{ transform: `rotate(${rotate}deg)`, background: `url(${urlPath}/assets/icons/postit.png)`, backgroundSize: "80px 80px" }}
        >
          <div className={styles.temp}>
            {content}
          </div>
        </div>
      </div>
    )
  }

  // 방명록 작성 상태관리
  const isWriteGuestBookHandler = () => {
    setIsGuestBookVisible(false)
    setIsWriteGuestBookVisible(true)
  }

  // 방명록 상세 함수
  const detailGuestBookHandler = (id) => {
    fetchDetailGuestBook(
      id,
      (success) => {
        setGuestBookDetailContent(success.data.data)
        setIsGuestBookVisible(false)
        setIsDetailGuestBookVisible(true)
      },
      (error) => {
        console.log("Error at Detail GuestBook...", error)
      }
    )
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Title}>To. {roomInfo}</div>
        <div className={styles.ContentContainer}>
          {guestBookList.length === 0  ? (
            <div
              style={{ width: "300px", height: "290px", textAlign: "center", lineHeight: "290px" }}
            >
              방명록이 비어있습니다.
            </div>
          ) : (
            guestBookList.map((item) => (
              <div key={item.id} style={{ width: "100px", height: "100px" }} onClick={() => detailGuestBookHandler(item.id)}>
                <ContentItem
                  content={item.description}
                  rotate={item.rotate}
                  colorNum={item.color}
                />
              </div>
            ))
          )}
        </div>
        <div className={styles.FooterContainer}>
          <div className={styles.WriteButton} onClick={() => isWriteGuestBookHandler()}>
            <img src={`${urlPath}/assets/icons/writeGuestBook.png`} style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestBookModal