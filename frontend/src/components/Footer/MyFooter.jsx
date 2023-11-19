// 라이브러리
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useEffect, useState } from "react"

// 컴포넌트
import RoomBtn from "../Button/Room/RoomBtn"
import GuestBookModal from "../Modal/GuestBook/GuestBookModal"
import WriteGuestBookModal from "../Modal/GuestBook/WriteGuestBookModal"
import DefaultModal from "../Modal/Default/DefaultModal"
import DetailGuestBookModal from "../Modal/GuestBook/DetailGuestBookModal"
import { successMsg } from "../../utils/customToast"

// 스타일
import styles from "./Footer.module.css"

// API
import { isHeartCheck } from "@/api/Room"

// 아톰
import { roomHeartAtom } from "../../atom/RoomInfoAtom"
import { popUpStatusAtom } from "../../atom/RoomCustomTabAtom"
import { ItemsState, buildModeState } from "../Room/Atom"
import {
  isGuestBookVisibleAtom,
  isWriteGuestBookVisibleAtom,
  isFinishGuestBookVisibleAtom,
  isFinishWriteGuestBookVisibleAtom,
  isDetailGuestBookVisibleAtom,
  isFinishDetailGuestBookVisibleAtom,
  reportGuestBookAtom,
  guestBookDetailContentAtom
}  from "../../atom/GuestBookAtom"
import { lastUrlPathAtom } from "../../atom/UrlAtom"

// API
import { fetchReportGuestBook } from "../../api/GuestBook"


const MyFooter = (props) => {
  // 리코일 상태관리
  const [isHeart, setIsHeart] = useState(false)
  const setEditMode = useSetRecoilState(buildModeState)
  const [items, setItems] = useRecoilState(ItemsState)
  const [popUpStatus, setPopUpStatus] = useRecoilState(popUpStatusAtom)
  const lastURL = useRecoilValue(lastUrlPathAtom)

  // 방명록
  const [isGuestBookVisible, setIsGuestBookVisible] = useRecoilState(isGuestBookVisibleAtom)
  const [isFinishGuestBookVisible, setIsFinishGuestBookVisible] = useRecoilState(isFinishGuestBookVisibleAtom)
  const [isWriteGuestBookVisible, setIsWriteGuestBookVisible] = useRecoilState(isWriteGuestBookVisibleAtom)
  const [isFinishWriteGuestBookVisible, setIsFinishWriteGuestBookVisible] = useRecoilState(isFinishWriteGuestBookVisibleAtom)
  const [isDetailGuestBookVisible, setIsDetailGuestBookVisible] = useRecoilState(isDetailGuestBookVisibleAtom)
  const [isFinishDetailGuestBookVisible, setIsFinishDetailGuestBookVisible] = useRecoilState(isFinishDetailGuestBookVisibleAtom)
  const [isReportGuestBook, setIsReportGuestBook] = useRecoilState(reportGuestBookAtom)
  const guestBookDetailContent = useRecoilValue(guestBookDetailContentAtom)
  
  // 방 좋아요 체크 함수
  useEffect(() => {
    isHeartCheck(
      props.props,
      (response) => {
        setIsHeart(response.data.data == "Y")
      },
      (error) => {
        console.log("Error with HeartFlag... ", error)
      }
    )
  }, [isHeart])

  const roomEditClickEvent = () => {
    setItems(items)
    setPopUpStatus(!popUpStatus)
    setEditMode(true)
  }

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  const goSingleMap = () => {
    window.location.replace(`${urlPath}${lastURL}`)
  }

  // 방명록 리스트 종료 모달 함수
  const finishGuestBookListHandler = () => {
    setIsFinishGuestBookVisible(false)
    setIsGuestBookVisible(false)
  }

  // 방명록 작성 종료 모달 함수
  const finishWriteGuestBookHandler = () => {
    setIsFinishWriteGuestBookVisible(false)
    setIsWriteGuestBookVisible(false)
    setIsGuestBookVisible(true)
  }

  // 방명록 상세 작성 모달 함수
  const finishDetailGuestBookHandler = () => {
    setIsFinishDetailGuestBookVisible(false)
    setIsDetailGuestBookVisible(false)
    setIsGuestBookVisible(true)
  }

  // 방명록 신고하기 함수
  const reportGuestBookHandler = () => {
    fetchReportGuestBook(
      guestBookDetailContent.id,
      (success) => {
        setIsReportGuestBook(false)
        setIsDetailGuestBookVisible(false)
        setIsGuestBookVisible(true)
        successMsg("✅ 신고하기가 완료됐습니다!")
      },
      (error) => {
        successMsg("❌ 신고하기에 실패했습니다!")
        console.log('Error at Report GuestBook...', error)
      }
    )
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.secondFooter}>
          <div className={styles.background}>
            <RoomBtn img={"HomeEdit"} onClick={() => roomEditClickEvent()} />
          </div> 
        </div>
        <div className={styles.footer}>
          <div className={styles.background}>
            <RoomBtn
              img={"worldMap"}
              onClick={() => {
                goSingleMap()
              }}
            />
          </div>

          {/* 방명록 */}
          <div className={styles.background}>
            <RoomBtn img={"guestbook"} onClick={() => setIsGuestBookVisible(true)} />
          </div>
        </div>
      </div>

      {/* 방명록 리스트 모달 */}
      {isGuestBookVisible && (
        <>
          <div className={styles.Overlay} onClick={() => setIsGuestBookVisible(false)} />
          <div className={styles.GuestBookContainer}>
            <GuestBookModal />
          </div>
        </>
      )}

      {/* 방명록 리스트 종료 모달 */}
      {isFinishGuestBookVisible && (
        <>
          <div className={styles.OverOverlay} onClick={() => setIsFinishGuestBookVisible(false)} />
          <div className={styles.OverGuestBookContainer}>
            <DefaultModal
              content={"방명록을 종료하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => finishGuestBookListHandler()}
              cancelClick={() => setIsFinishGuestBookVisible(false)}
            />
          </div>
        </>
      )}

      {/* 방명록 작성 모달 */}
      {isWriteGuestBookVisible && (
        <>
          <div className={styles.Overlay} onClick={() => setIsFinishWriteGuestBookVisible(true)} />
          <div className={styles.GuestBookContainer}>
            <WriteGuestBookModal />
          </div>
        </>
      )}

      {/* 방명록 작성 종료 모달 */}
      {isFinishWriteGuestBookVisible && (
        <>
          <div className={styles.OverOverlay} onClick={() => setIsFinishWriteGuestBookVisible(false)} />
          <div className={styles.OverGuestBookContainer}>
            <DefaultModal
              content={"방명록 작성을 종료하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => finishWriteGuestBookHandler()}
              cancelClick={() => setIsFinishWriteGuestBookVisible(false)}
            />
          </div>
        </>
      )}

      {/* 방명록 상세 모달 */}
      {isDetailGuestBookVisible && (
        <>
          <div className={styles.Overlay} onClick={() => {setIsDetailGuestBookVisible(false)
          setIsGuestBookVisible(true)}} />
          <div className={styles.GuestBookContainer}>
            <DetailGuestBookModal />
          </div>
        </>
      )}

      {/* 방명록 상세 종료 모달 */}
      {isFinishDetailGuestBookVisible && (
        <>
          <div className={styles.OverOverlay} onClick={() => setIsFinishDetailGuestBookVisible(false)} />
          <div className={styles.OverGuestBookContainer}>
            <DefaultModal
              content={"방명록 상세를 그만 보시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => finishDetailGuestBookHandler()}
              cancelClick={() => setIsFinishDetailGuestBookVisible(false)}
            />
          </div>
        </>
      )}

      {/* 신고하기 모달 */}
      {isReportGuestBook &&  (
        <>
          <div className={styles.OverOverlay} onClick={() => setIsReportGuestBook(false)} />
          <div className={styles.OverGuestBookContainer}>
            <DefaultModal
              content={"정말 신고하시겠습니까?"}
              ok={"네"}
              cancel={"아니오"}
              okClick={() => reportGuestBookHandler()}
              cancelClick={() => setIsReportGuestBook(false)}
            />
          </div>
        </>
      )}
    </>
  )
}

export default MyFooter
