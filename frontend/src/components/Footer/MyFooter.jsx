import { useState } from "react"
import RoomBtn from "../Button/Room/RoomBtn"
import PostCardBox from "../Modal/Post/PostCardBox"
import style from "./Footer.module.css"

const MyFooter = () => {
  const [isPostBoxModalVisible, setIsPostBoxModalVisible] = useState(false)

  const closeModal = () => {
    setIsPostBoxModalVisible(false)
  }

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
          <RoomBtn
            img={"postBox"}
            onClick={() => setIsPostBoxModalVisible(true)}
          />
        </div>
      </div>
      {isPostBoxModalVisible && (
        <PostCardBox
          cancelClick={closeModal}
          onSelectButtonClick={handleSelectButtonClick}
          checker={"MyFooter"}
        />
      )}
    </div>
  )
}

export default MyFooter
