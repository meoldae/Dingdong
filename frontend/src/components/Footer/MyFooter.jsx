import { useState } from "react"
import RoomBtn from "../Button/Room/RoomBtn"
import PostBox from "../Modal/Post/PostBox"
import style from "./Footer.module.css"
import { usesetRecoilState } from "recoil"
import { isPostBoxVisibleAtom } from "../../atom/PostAtom"

const MyFooter = () => {
  const [isPostBoxModalVisible, setIsPostBoxModalVisible] = useState(false)
  const setIsPostBoxVisible = usesetRecoilState(isPostBoxVisibleAtom)

  const closeModal = () => {
    setIsPostBoxModalVisible(false)
  }

  const handleSelectButtonClick = () => {
    console.log(1)
  }

  const openPostBoxModal = () => {
    setIsPostBoxModalVisible(true)
    setIsPostBoxVisible(true)
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
          <RoomBtn img={"postBox"} onClick={openPostBoxModal} />
        </div>
      </div>
      {isPostBoxModalVisible && (
        <PostBox
          cancelClick={closeModal}
          onSelectButtonClick={handleSelectButtonClick}
        />
      )}
    </div>
  )
}

export default MyFooter
