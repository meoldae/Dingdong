// 라이브러리
import { useRecoilState } from "recoil"

// 컴포넌트
import RoomBtn from "../Button/Room/RoomBtn"
import PostBox from "../Modal/Post/PostBox"
import ReceiveLetter from "../Modal/Post/ReceiveLetter"
import GuestBookModal from "../Modal/GuestBook/GuestBookModal"
import WriteGuestBookModal from "../Modal/GuestBook/WriteGuestBookModal"
import DefaultModal from "../Modal/Default/DefaultModal"

// 스타일
import styles from "./Footer.module.css"

// 아톰
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
  isFinishDetailGuestBookVisibleAtom
}  from "../../atom/GuestBookAtom"


const MyFooter = () => {
  // url 경로
  const urlPath = import.meta.env.VITE_APP_ROUTER_URL

  // 리코일 상태관리
  const [editMode, setEditMode] = useRecoilState(buildModeState)
  const [items, setItems] = useRecoilState(ItemsState)
  const [isPostBoxVisible, setIsPostBoxVisible] =
    useRecoilState(isPostBoxVisibleAtom)
  const [isReceiveLetterVisible, setIsReceiveLetterVisible] = useRecoilState(
    isReceiveLetterVisibleAtom
  )
  const [popUpStatus, setPopUpStatus] = useRecoilState(popUpStatusAtom)
  // 방명록
  const [isGuestBookVisible, setIsGuestBookVisible] = useRecoilState(isGuestBookVisibleAtom)
  const [isFinishGuestBookVisible, setIsFinishGuestBookVisible] = useRecoilState(isFinishGuestBookVisibleAtom)
  const [isWriteGuestBookVisible, setIsWriteGuestBookVisible] = useRecoilState(isWriteGuestBookVisibleAtom)
  const [isFinishWriteGuestBookVisible, setIsFinishWriteGuestBookVisible] = useRecoilState(isFinishWriteGuestBookVisibleAtom)
  const [isDetailGuestBookVisible, setIsDetailGuestBookVisible] = useRecoilState(isDetailGuestBookVisibleAtom)
  const [isFinishDetailGuestBookVisible, setIsFinishDetailGuestBookVisible] = useRecoilState(isFinishDetailGuestBookVisibleAtom)

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
  
  // 방명록 작성 모달 종료함수
  const closeWriteGuestBookModalHandler = () => {
    setIsWriteGuestBookVisible(false)
    setIsGuestBookVisible(true)
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

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.secondFooter}>
          <div className={styles.background}>
            <RoomBtn img={"roomEdit"} onClick={() => roomEditClickEvent()} />
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
    </>
  )
}

export default MyFooter
