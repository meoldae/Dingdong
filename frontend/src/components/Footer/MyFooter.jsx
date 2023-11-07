// 라이브러리
import { useRecoilState } from "recoil"

// 컴포넌트
import RoomBtn from "../Button/Room/RoomBtn"
import PostBox from "../Modal/Post/PostBox"
import ReceiveLetter from "../Modal/Post/ReceiveLetter"

// 스타일
import style from "./Footer.module.css"

// 아톰
import {
  isPostBoxVisibleAtom,
  isReceiveLetterVisibleAtom,
} from "../../atom/PostAtom"
import { popUpStatusAtom } from "../../atom/RoomCustomTabAtom"
import { ItemsState, buildModeState } from "../Room/Atom"

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

  return (
    <div className={style.wrap}>
      <div className={style.secondFooter}>
        <div className={style.background}>
          <RoomBtn img={"roomEdit"} onClick={() => roomEditClickEvent()} />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.background}>
          <RoomBtn
            img={"worldMap"}
            onClick={() => {
              goSingleMap()
            }}
          />
        </div>
        <div className={style.background}>
          <RoomBtn img={"postBox"} onClick={() => setIsPostBoxVisible(true)} />
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

      {}
    </div>
  )
}

export default MyFooter
