import style from "./Header.module.css"
import RoomBtn from "../Button/Room/RoomBtn"

const NeighborRequest = () => {
  const isNeighbor = () => {
    console.log("이웃추가?")
  }

  return (
    <div className={style.wrap}>
      <div className={style.share}>
        <div className={style.shareImg}>
          <RoomBtn img={"addUser"} onClick={isNeighbor} />
        </div>
      </div>
    </div>
  )
}

export default NeighborRequest
