// 라이브러리
import { useRecoilState, useRecoilValue } from "recoil"
import { useEffect, useState } from "react"

// 컴포넌트
import RoomBtn from "../Button/Room/RoomBtn"
import PostBox from "../Modal/Post/PostBox"
import ReceiveLetter from "../Modal/Post/ReceiveLetter"
import GuestBookModal from "../Modal/GuestBook/GuestBookModal"
import WriteGuestBookModal from "../Modal/GuestBook/WriteGuestBookModal"
import DefaultModal from "../Modal/Default/DefaultModal"
import DetailGuestBookModal from "../Modal/GuestBook/DetailGuestBookModal"
import { successMsg } from "../../utils/customToast"

// 스타일
import styles from "./Footer.module.css"

// API
import { isHeartCheck, updateHeart } from "@/api/Room"

// 아톰
import { roomHeartAtom } from "../../atom/RoomInfoAtom"
import {
  isPostBoxVisibleAtom,
  isReceiveLetterVisibleAtom,
} from "../../atom/PostAtom"
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

// API
import { fetchReportGuestBook } from "../../api/GuestBook"


const MyFooter = (props) => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 리코일 상태관리
  const [isHeart, setIsHeart] = useState(false)
  const [editMode, setEditMode] = useRecoilState(buildModeState)
  const [items, setItems] = useRecoilState(ItemsState)
  const [isPostBoxVisible, setIsPostBoxVisible] =
    useRecoilState(isPostBoxVisibleAtom)
  const [isReceiveLetterVisible, setIsReceiveLetterVisible] = useRecoilState(
    isReceiveLetterVisibleAtom
  )
  const [popUpStatus, setPopUpStatus] = useRecoilState(popUpStatusAtom)
 
  const [heartCount, setHeartCount] = useRecoilState(roomHeartAtom)

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

    // 방 좋아요 업데이트 함수
    const updateHeartStatus = () => {
      updateHeart(
        props.props,
        (response) => { 
          const isHeartNow = response.data.data === "Y";
          setIsHeart(isHeartNow);
          setHeartCount(prevCount => isHeartNow ? prevCount + 1 : prevCount - 1);
        },
        (error) => {
          console.log("Error with Room Heart... ", error)
        }
      )
    }

  const handleSelectButtonClick = () => {
    // console.log(1)
  }
  const roomEditClickEvent = () => {
    setItems(items)
    setPopUpStatus(!popUpStatus)
    setEditMode(true)
  }
  const goSingleMap = () => {
    window.location.replace(`${urlPath}/`)
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
        <div className={styles.thirdFooter}>
          <div className={styles.background}>
            <RoomBtn img={"roomEdit"} onClick={() => roomEditClickEvent()} />
          </div> 
        </div>
        <div className={styles.secondFooter}>
          <div className={styles.background}>
            <RoomBtn 
                img={isHeart ? "fullHeart" : "emptyheart"}
                onClick={updateHeartStatus}
                heartCount={heartCount}
              />
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

          {/* 편지함선택버튼 */}
          {/* <div className={style.background}>
            <RoomBtn img={"postBox"} onClick={() => setIsPostBoxVisible(true)} />
          </div> */}

          {/* 방명록 */}
          <div className={styles.background}>
            <RoomBtn img={"postBox"} onClick={() => setIsGuestBookVisible(true)} />
          </div>
        </div>

        {isPostBoxVisible && (
          <PostBox
            cancelClick={() => setIsPostBoxVisible(false)}
            onSelectButtonClick={handleSelectButtonClick}
          />
        )}

        {isReceiveLetterVisible && (
          <ReceiveLetter cancelClick={() => setIsReceiveLetterVisible(false)} />
        )}
      </div>

      {/* 방명록 리스트 모달 */}
      {isGuestBookVisible && (
        <>
          <div className={styles.Overlay} onClick={() => setIsFinishGuestBookVisible(true)} />
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
          <div className={styles.Overlay} onClick={() => setIsFinishDetailGuestBookVisible(true)} />
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
