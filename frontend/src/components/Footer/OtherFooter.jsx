// 라이브러리
import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"

// 컴포넌트
import PostCardBox from "../Modal/Post/PostCardBox"
import RoomBtn from "../Button/Room/RoomBtn"
import SendLetter from "../Modal/Post/SendLetter"
import GuestBookModal from "../Modal/GuestBook/GuestBookModal"
import WriteGuestBookModal from "../Modal/GuestBook/WriteGuestBookModal"
import DefaultModal from "../Modal/Default/DefaultModal"
import DetailGuestBookModal from "../Modal/GuestBook/DetailGuestBookModal"

// 스타일
import styles from "./Footer.module.css"

// API
import { isHeartCheck, updateHeart } from "@/api/Room"

// Atom
import {
  isGuestBookVisibleAtom,
  isWriteGuestBookVisibleAtom,
  isFinishGuestBookVisibleAtom,
  isFinishWriteGuestBookVisibleAtom,
  isDetailGuestBookVisibleAtom,
  isFinishDetailGuestBookVisibleAtom
}  from "../../atom/GuestBookAtom"
import { roomHeartAtom } from "../../atom/RoomInfoAtom"
import { lastUrlPathAtom } from "../../atom/UrlAtom"

const OtherFooter = (props) => {
  // 상태관리
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSendLetterModalVisible, setIsSendLetterModalVisible] =
    useState(false)
  const [selectedPostCard, setSelectedPostCard] = useState(null)
  const [isHeart, setIsHeart] = useState(false)
  const setHeartCount = useSetRecoilState(roomHeartAtom)

  // 리코일 상태관리
  const [isGuestBookVisible, setIsGuestBookVisible] = useRecoilState(isGuestBookVisibleAtom)
  const [isFinishGuestBookVisible, setIsFinishGuestBookVisible] = useRecoilState(isFinishGuestBookVisibleAtom)
  const [isWriteGuestBookVisible, setIsWriteGuestBookVisible] = useRecoilState(isWriteGuestBookVisibleAtom)
  const [isFinishWriteGuestBookVisible, setIsFinishWriteGuestBookVisible] = useRecoilState(isFinishWriteGuestBookVisibleAtom)
  const [isDetailGuestBookVisible, setIsDetailGuestBookVisible] = useRecoilState(isDetailGuestBookVisibleAtom)
  const [isFinishDetailGuestBookVisible, setIsFinishDetailGuestBookVisible] = useRecoilState(isFinishDetailGuestBookVisibleAtom)
  const lastURL = useRecoilValue(lastUrlPathAtom)

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

  // 편지 들어내면 삭제할 함수 ---
  const closeModal = () => {
    setIsModalVisible(false)
  }

  const openSendLetterModal = () => {
    setIsSendLetterModalVisible(true)
  }

  const closeSendLetterModal = () => {
    setIsSendLetterModalVisible(false)
  }
  
  const handleSelectButtonClick = (selectedCard) => {
    setSelectedPostCard(selectedCard)
    closeModal()
    openSendLetterModal()
  }
  // ---

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

  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 싱글맵 이동 함수
  const goSingleMap= () =>{
    console.log(lastURL)
    if (lastURL === "/multiPage") {
      window.location.replace(`${urlPath}${lastURL}`)
    } else {
      window.location.replace(`${urlPath}/`)
    }
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

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.secondFooter}>
          <div className={styles.background}>
            <RoomBtn
              img={isHeart ? "fullHeart" : "emptyheart"}
              onClick={updateHeartStatus}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.background}>
            <RoomBtn img={"worldMap"} onClick={goSingleMap} />
          </div>

          {/* 방명록 */}
          <div className={styles.background}>
            <RoomBtn img={"guestbook"} onClick={() => setIsGuestBookVisible(true)} />
          </div>
        </div>
        {isModalVisible && (
          <PostCardBox
            cancelClick={closeModal}
            onSelectButtonClick={handleSelectButtonClick}
          />
        )}
        {isSendLetterModalVisible && (
          <SendLetter onClose={closeSendLetterModal} card={selectedPostCard} />
        )}
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
    </>
  )
}

export default OtherFooter
