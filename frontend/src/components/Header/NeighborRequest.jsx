import style from "./Header.module.css"
import RoomBtn from "../Button/Room/RoomBtn"

const NeighborRequest = () => {
  const icon = "assets/icons/"
  return (
    <div className={style.wrap}>
      <div className={style.share}>
        <div className={style.shareImg}>
          <RoomBtn img={"addUser"} />
        </div>
      </div>
    </div>
  )
}

export default NeighborRequest
