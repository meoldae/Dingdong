import RoomBtn from "../Button/Room/RoomBtn"
import PostBox from "../Modal/Post/PostBox"
import style from "./Footer.module.css"
import { useRecoilState } from "recoil"
import { isPostBoxVisibleAtom } from "../../atom/PostAtom"

const MyFooter = () => {
  const [isPostBoxVisible, setIsPostBoxVisible] =
    useRecoilState(isPostBoxVisibleAtom)

  const handleSelectButtonClick = () => {
    console.log(1)
  }

  return (
    <div className={style.wrap}>
      <div className={style.secondFooter}>
        <div className={style.background}>
          <RoomBtn img={"roomEdit"} />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.background}>
          <RoomBtn img={"worldMap"} />
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
    </div>
  )
}

export default MyFooter
