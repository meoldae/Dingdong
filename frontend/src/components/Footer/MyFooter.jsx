import RoomBtn from "../Button/Room/RoomBtn"
import style from "./Footer.module.css"

const MyFooter = () => {
  const icon = "assets/icons/"

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
          <RoomBtn img={"postBox"} />
        </div>
      </div>
    </div>
  )
}

export default MyFooter
