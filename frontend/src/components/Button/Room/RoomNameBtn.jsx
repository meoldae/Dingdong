import React from "react"
import styles from "./RoomNameBtn.module.css"

const RoomNameBtn = (props) => {
  return (
    <div className={styles.RoomNameBtn}>
      {props.children === "딩동 마을" ? (<>{props.children}</>) : props.children === "딩동 광장" ? (<>{props.children}</>) : (<>{props.children}의 방</>)}
    </div>
  )
}

export default RoomNameBtn
